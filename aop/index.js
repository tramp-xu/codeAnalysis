// 最近看到个消息，ES2017已经定稿了，心想，我去，还完全没了解ES2016呢，ES8就定稿了，out了，这可咋办，赶紧Google（Baidu）去！
// 不过从ES6（2015）之后，tc39的规划是一年一个版本，所以ES7跟ES8也不会像ES6那么大的步子。粗略瞟了一眼，咦，装饰器（Decorator）还没到 Stage 3啊，好吧不过已经到了2了，想必之后还是会慢慢纳入的，就先了解一下吧。与之相关的，就是AOP（面向切面编程）和装饰器模式了。
// AOP是对OOP（面向对象编程）的一个横向的补充，主要作用就是把一些业务无关的功能抽离出来，例如日志打印、统计数据、数据验证、安全控制、异常处理等等。这些功能都与某些核心业务无关，但又随处可见，如果都是复制粘贴未免太没逼格，而且难以维护，不优雅。把它们抽离出来，用“动态”插入的方式嵌到各业务逻辑中。这样的好处是业务模块可以变得比较干净，不受污染，同时这些功能点能够得到很好的复用，给模块解耦。
// 由于语言的特性，在JavaScript中可以轻松地实现AOP技术。
// 让我们假设一个业务无关的功能--绑定变量：
// 有三个变量a、b、c，要保证b、c在修改前后，a一直等于b与c的和。
// 先分析一下，此处的业务无关功能点（即切面）应该就是“a一直等于b与c的和”。即在业务逻辑走完之后，需要重新将b+c赋值给a；同时，我们还应该保证赋给b与c的值应该都是Number类型。
// 首先，我们先来个ES3版本都可以兼容的办法，使用装饰器模式来实现AOP。什么叫装饰器模式？即提供一个和原功能一样调用方法的装饰器，装饰器里边植入了切面。由于在JS中函数是一等公民，所以我们可以提供一个装饰器函数来实现AOP。
let a = 0
let b = 0
let c = 0

function setA(action) {
  return function (value) {
    action(value)
    a = b + c
    console.log(a)
  }
}

function validateValue(action) {
  return function (value) {
    if (typeof value !== 'number') {
      throw new Error('只能传 number 类型')
    }
    action(value)
  }
}

let setB = validateValue(setA(function (value) {
  b = value
}))

let setC = validateValue(setA(function (value) {
  c = value
}))

// 用装饰器函数来实现AOP在实际的编程中还是挺有用的，有利于把逻辑划分成更小粒度的模块，同时也符合函数式编程（FP）的思想。




// 可是这个方法其实有个恶心的地方，我不想把赋值的“=”用函数来代替啊，肿么破？难（tao）过（yan）的是，JS中没有提供运算符重载的功能。不过ES5中提供了一个新的API可以让我们实现重载“=”运算符-- Object.defineProperty 以及 Object.defineProperties ，相关用法可以点击链接查看。由于这个API的操作对象是一个Object，所以我们可以把a、b、c三个变量包在一个对象中。

var accessorDecorator = (function () {
  var context = {
    b: 0,
    c: 0
  };
  return {
    set: function (action) {
      return function (value) {
        action.call(this, value);
        wrapper.a = this.b + this.c;
      }.bind(this);
    }.bind(context),
    get: function (action) {
      return action.bind(context);
    }
  };
})();

var wrapper = Object.defineProperties({}, {
  a: {
    value: 0,
    writable: true
  },
  b: {
    set: validateValue(accessorDecorator.set(function (value) {
      this.b = value;
    })),
    get: accessorDecorator.get(function () {
      return this.b;
    })
  },
  c: {
    set: validateValue(accessorDecorator.set(function (value) {
      this.c = value;
    })),
    get: accessorDecorator.get(function () {
      return this.c;
    })
  }
});

function validateValue(action) {
  return function (value) {
    if (typeof value !== 'number') {
      throw new Error('你传了个什么鬼进来');
    }
    action(value);
  };
}

wrapper.b = 10; // wrapper.a === 10;
wrapper.c = 1; // wrapper.a === 11;
wrapper.c = '什么鬼'; // Uncaught Error: 你传了个什么鬼进来
// 需要提及的一点是，现在非常流行火热的Vue.js的数据绑定原理就是通过这个实现的。



// 在文章的开头，还提到了新的ES草案--装饰器语法（Decorator），事实上，这也算是 Object.defineProperty 的一个语法糖。使用装饰器，可以让我们上面的代码变得更简洁（好吧这很JAVA）。

class Wrapper {
  a = 0;

  @validateValue
  @setA
  b = 0;

  @validateValue
  @setA
  c = 0;
}

function validateValue(target, key, descriptor) {
  const action = descriptor.set;
  descriptor.set = (value) => {
    if (typeof value !== 'number') {
      throw new Error('你传了个什么鬼进来');
    }
    action(value);
  };
}

function setA(target, key, descriptor) {
  const action = descriptor.set;
  descriptor.set = (value) => {
    action(value);
    target.a = target.b + target.c;
  };
}

let wrapper = new Wrapper;
// 更JAVA的是，ES6中提供了 Proxy 与 Reflect 对象。所以我们的这段代码现在可以这么写：

let validateProxy = new Proxy({
  a: 0,
  b: 0,
  c: 0
}, {
  set(target, key, value, receiver) {
    if (key in target && typeof value !== 'number') {
      throw new Error('你传了个什么鬼进来');
    }
    return Reflect.set(target, key, value, receiver);
  }
});

let setProxy = new Proxy(validateProxy, {
  set(target, key, value, receiver) {
    let done = Reflect.set(target, key, value, receiver);
    if (key === 'b' || key === 'c') {
      Reflect.set(target, 'a', target.b + target.c, receiver);
    }
    return done;
  }
});
// 随着ECMAScript的新标准的定稿，AOP的实现在JavaScript中是越来越容易了。在实际编码中使用AOP和装饰器模式，可以将一些业务无关的代码从业务逻辑中抽离出来，使得业务逻辑更加清晰，不受污染，同时也有利于这些业务无关代码的复用与维护。