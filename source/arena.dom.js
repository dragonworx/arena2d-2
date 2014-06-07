/**
 * A arena.dom
 * @class
 */
arena.dom = function dom(selector) {
	/** wrap jQuery */
	return jQuery(selector);
};

/** define arena.dom instance methods */
arena.dom.ready = function(fn) {
	jQuery(document).ready(fn);
	return arena.dom;
};

arena.dom.offset = function(element) {
	var element = jQuery(element);
	var offset = element.offset();
	return arena.geometry.Point.temp.set(offset.left, offset.top);
};

arena.dom.scroll = function(element) {
	var element = jQuery(element);
	var scrollTop = element.scrollTop();
	var scrollLeft = element.scrollLeft();
	return arena.geometry.Point.temp.set(scrollLeft, scrollTop);
};

arena.dom.size = function(element) {
	var element = jQuery(element);
	var outerWidth = element.outerWidth();
	var outerHeight = element.outerHeight();
	return arena.geometry.Size.temp.set(outerWidth, outerHeight);
};

arena.dom.trackMouseEvent = function(event) {
	var element = jQuery(event.currentTarget);
	var offset = arena.dom.offset(element);
	if (!element.data('mousepoint'))
		element.data('mousepoint', new arena.geometry.Point());
	element.data('mousepoint').x = event.pageX - offset.x;
	element.data('mousepoint').y = event.pageY - offset.y;
	return element.data('mousepoint');
};

arena.dom.mousepoint = function(event) {
	arena.dom.trackMouseEvent(event);
	var element = jQuery(event.currentTarget);
	if (!element.data('mousepoint'))
		element.data('mousepoint', new arena.geometry.Point());
	return element.data('mousepoint');
};


arena.dom.bind = function(element, type, fn) {
	jQuery(element).bind(type, fn);
};

arena.dom.unbind = function(element, type, fn) {
	jQuery(element).unbind(type, fn);
};