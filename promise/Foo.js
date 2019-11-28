class Foo {
  constructor() {
      this[Foo.PROPERTY] = 'hello';
  }

  test() {
    console.log(this[Foo.PROPERTY]);
  }
}

Foo.PROPERTY = Symbol();

export default Foo;