/**
 * A arena.motion.Transition
 * @class
 */
arena.motion.Transition = function Transition(sprite, properties) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.timer = null;
	this.properties = properties || {};

};

/** define arena.motion.Transition instance methods */
arena.motion.Transition.prototype = {
};

/***************************
 * arena.motion.Transition *
 ***************************/
arena.motion.Transition.toClass(
	/*domainName*/ 'arena.motion.Transition',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['timer', 'properties']
).temporary();