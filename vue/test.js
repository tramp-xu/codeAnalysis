var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
var noop = function(){}

function proxy (target, sourceKey, key) {
  console.log(12345)
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    console.log(val)
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function observe (value) {
  var ob = new Observer(value);
  return ob
}

var Observer = function Observer (value) {
  this.value = value;
  this.walk(value);
};

Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

function defineReactive$$1 (
  obj,
  key,
  val
) {
  val = obj[key];
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return
      }
      val = newVal;
      return newVal
    }
  });
}

function Vue(options) {
  var data = this._data = options.data
  var keys = Object.keys(data)
  var i = keys.length
  while (i--) {
    var key = keys[i]
    proxy(this, "_data", key)
    observe(data)
  }
}

var options = {
  data: {
    count: 1,
    message: 'me'
  }
}

var vue = new Vue(options)
console.log(vue)

console.log(vue.message)
setTimeout(function(){
  vue.message = 'you'
  console.log(vue)
}, 5000)

