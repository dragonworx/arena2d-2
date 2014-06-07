var Javascript = window['Javascript'] = {
	versions: ['1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.8.1', '1.8.2', '1.8.5', '2.0'],
	version: function() {
		for (var i = 0; i < Javascript.versions.length; i++) {
			var s = document.createElement("script");
			s.setAttribute('language', 'Javascript' + Javascript.versions[i]);
			s.innerText = "Javascript.versionValue = '" + Javascript.versions[i] + "'";
			document.body.appendChild(s);
			document.body.removeChild(s);
		}
		return Javascript.versionValue;
	},
	versionValue: '?',
	definedProperty: undefined,
	isEcma5Ready: function() {
		// Object.keys test
		if (typeof Object.keys != "function") return false;
		// Object.defineProperty test
		if (typeof Object.defineProperty != "function") return false;
		try {
			Object.defineProperty(Javascript, 'definedProperty', {
				value: true
			})
		} catch (e) {
			return false;
		}
		if (!Javascript.definedProperty) return false;
		// Array.prototype.forEach test
		if (typeof Array.prototype.forEach != "function") return false;
		// basic Ecma5Script support found
		return true;
	}
};

console.dump = function(name, obj) {
	console.group(name);
	console.log(obj);
	console.groupEnd();
}

jQuery(document).ready(
	function() {
		if (!Javascript.isEcma5Ready()) {
			var msg = 'Javascript is not ECMA5Script ready. Program aborted!';
			console.error(msg);
			return alert(msg);
		}
	});