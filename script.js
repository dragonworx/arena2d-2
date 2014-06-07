/**
 * Created by Ali Chamas.
 * Date: 2/02/12
 * Time: 1:52 PM
 */

arena.dom.ready(function() {

	console.log("** script begin");

	var pool = new arena.resource.Pool();
	var img = pool.resource('http://www.musicartscience.com.au/img/iosandroid.png');
	var snd = pool.resource('http://www.pacdv.com/sounds/machine_sound_effects/mixer_1.wav');
	pool.addEvent(arena.resource.READY, function() {
		sprite1.dom.css('background-image', 'url(%1)'.args(img.url.toString()));
	});

	var sprite1 = new arena.Sprite('sprite1');
	var sprite2 = new arena.Sprite('sprite2');
	sprite1.add(sprite2);
	sprite1.addToDom(document.body);

	sprite1.location(100,100);

	sprite2.location(100, 100);
	sprite2.tilt(1, 0.2);
	sprite2.origin(0.5, 0.5);

	var transition = new arena.motion.Transition(sprite1);


	sprite2.mousemove(function(e) {
		var p = arena.dom.mousepoint(e);
		sprite1.move(0.5, 0.25);
		sprite2.rotate(1);
		sprite1.rotate(0.5);
		snd.play(1);
	});

	pool.download();

	//window.scene = scene;
	window.globalVars({
		'sprite1': sprite1,
		'img': img,
		'snd': snd
	});
});