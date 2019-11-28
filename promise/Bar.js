import Foo from './Foo';

class Bar extends Foo {
  test2() {
    console.log(this[Bar.PROPERTY]);
  }
}

export default Bar;