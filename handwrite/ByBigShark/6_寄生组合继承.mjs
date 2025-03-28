/**
 * 实现寄生组合继承
 *
 */

const Parent = function (name) {
  this.name = name;
  this.say = function () {
    console.log('parent say');
  };
};
Parent.prototype.play = function () {
  console.log('play!!!');
};

const Child = function (name) {
  Parent.call(this);
  this.name = name;  
}; 

Child.prototype = Object.create(Parent.prototype);
Child.prototype.construstor = Child;
