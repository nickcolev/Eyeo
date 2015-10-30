var jsc = {

	memory: 0,

	number: function(o) {
		this.getDisplay().value += o.innerHTML;
	},

	calc: function() {
		var o = this.getDisplay();
		if (o.value) {
			// Process exponent (if any)
			var v = o.value.replace(/(.*)\*\*(.*)/, 'Math.pow($1,$2)');
			try {
				o.value = eval (v);
			} catch (e) {
				alert ("Bad expression");
			}
		}
		return false;
	},

	clear: function() {
		var o = this.getDisplay(),
			l = o.value.length;
		if (l > 0) o.value = o.value.substr(0,--l);
	},

	toMemory: function(add) {		// Same fn for add(true)/substract(false)
		this.calc();
		// TODO Comment the logic below
		this.memory += (add ? '1' : '-1') * this.getValue();
		this.memFeedback();
	},

	memFeedback: function() {
		var o = document.getElementById("m");
		if (this.memory === 0) {
			o.style.color = o.title = '';
		} else {
			o.style.color = "#F00";
			o.title = jsc.memory;
	}
	},

	reset: function() {
		this.getDisplay().value = '';
	},

	// Helpers
	getDisplay: function() {
		return document.getElementById("display");
	},

	getValue: function() {
		return parseFloat(this.getDisplay().value);
	},

	click: function(e) {
		var o = e.target;
		if (o.type == 'submit') {		// Process only objects having class 'click'
			// Dispatch
			switch(o.innerHTML) {				// Button letter(s)
				case 'C':
					jsc.clear(o);
					break;
				case '=':
					jsc.calc();
					break;
				case 'M':
					jsc.reset();
					jsc.getDisplay().value = jsc.memory;
					break;
				case 'MC':
					jsc.memory = 0;
					document.getElementById("m").style.color = '';
					break;
				case 'M+':
					jsc.toMemory(true);
					break;
				case 'M-':
					jsc.toMemory(false);
					break;
				default:		// Number or arithmentic button
					jsc.number(o);
					break;
			}
		}
	}

};

document.addEventListener('click', jsc.click, false);
