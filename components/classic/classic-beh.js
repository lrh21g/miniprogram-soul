// behaviors 是用于组件间代码共享的特性
// >>> 每个 behavior 可以包含一组属性、数据、生命周期函数和方法.
// >>> 组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。
// >>> 每个组件可以引用多个 behavior 。 behavior 也可以引用其他 behavior 。
// behavior 需要使用 Behavior() 构造器定义。

// behaviors 覆盖和组合规则
// >>> 如果有同名的属性或方法，组件本身的属性或方法会覆盖 behavior 中的属性或方法
// >>> 如果引用了多个 behavior ，在定义段中靠后 behavior 中的属性或方法会覆盖靠前的属性或方法
// >>> 如果有同名的数据字段，如果数据是对象类型，会进行对象合并，如果是非对象类型则会进行相互覆盖
// >>> 生命周期函数不会相互覆盖，而是在对应触发时机被逐个调用。
// >>> 如果同一个 behavior 被一个组件多次引用，它定义的生命周期函数只会被执行一次。
let classicBeh = Behavior({
  properties: {
    img: String,
    content: String
  }
})

export { classicBeh }