arena.geometry = {
	radians: function(deg) {
		return deg * (Math.PI / 180);
	},
	degrees: function(rad) {
		return rad * (180 / Math.PI);
	},
	angle: function(x1, y1, x2, y2) {
		var deg = arena.geometry.degrees(Math.atan2(y2 - y1, x2 - x1));
		if (deg < 0) deg = 180 + (180 - Math.abs(deg));
		return deg;
	},
	length: function (x1, y1, x2, y2) {
		var x = Math.abs(x2 - x1);
		var y = Math.abs(y2 - y1);
		return Math.sqrt((y * y) + (x * x));
	},
	polarPoint: function (deg, length) {
		var x = length * Math.cos(arena.geometry.radians(deg));
		var y = length * Math.sin(arena.geometry.radians(deg));
		return arena.geometry.Point.temp.set(x, y);
	}
};