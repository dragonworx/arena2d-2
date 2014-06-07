/**
 * Created by Ali Chamas.
 * Date: 2/02/12
 * Time: 1:52 PM
 */

arena.Class1 = function Class1() {
	arena.Object.call(this);
	//this.createAccessors('foo1');
	//this.createAccessors('foo2');
};

arena.Class1.toClass(
	'arena.Class1',
	arena.Object,
	['foo1', 'foo2']
);

/**
 * @constructor
 * @augments Class1
 */
arena.Class2 = function Class2() {
	arena.Class1.call(this)
};

arena.Class2.toClass(
	'arena.Class2',
	arena.Class1,
	[]
);

var a = new arena.Class1();
var b = new arena.Class2();

b.addEvent(arena.Object.CHANGED, function() {
	console.log('CHANGED!');
});

b.addEvent('foo1Changed', function(a, b) {
	console.log('foo1Changed! ' + a + ',' + b);
});

console.log('start...');
b.foo1 = 5;
console.log('disabling...');
b.disableEvent('foo1Changed', arena.Object.CHANGED);
b.foo1 = 6;
b.foo1 = 7;
console.log('enabling...');
b.enableEvent('foo1Changed', arena.Object.CHANGED);
b.foo1 = 8;
console.log('end...');