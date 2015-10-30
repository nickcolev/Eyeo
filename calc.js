/*
 * Simple Calculator logic
 * (please check inline comments for details)
 */

// Our namespace object
var jsc = {

	memory: 0,		// Memory accumulator (M+/M- buttons)

	// Number/Arithmetic button click
	number: function(o) {
		this.getDisplay().value += o.innerHTML;
	},

	// [=] button clicked
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
	},

	// [C] button clicked
	clear: function() {
		var o = this.getDisplay(),
			l = o.value.length;
		if (l > 0) o.value = o.value.substr(0,--l);
	},

	// [M+/M-] button
	// Note: We use the same fn for M+ and M-
	//       The logic is controlled by the argument
	//       true => M+, false => M-
	toMemory: function(add) {
		this.calc();
		// Invert the sign if M-
		this.memory += (add ? '1' : '-1') * this.getValue();
		this.memFeedback();
	},

	// Memory feedback, i.e. change color/title if something in the memory
	memFeedback: function() {
		var o = document.getElementById("m");
		if (this.memory === 0) {
			o.style.color = o.title = '';
		} else {
			o.style.color = "#F00";
			o.title = jsc.memory;
		}
	},

	// Clear display
	reset: function() {
		this.getDisplay().value = '';
	},

	// Helpers below
	// Get display object (DOM)
	getDisplay: function() {
		return document.getElementById("display");
	},

	// Get display value
	getValue: function() {
		return parseFloat(this.getDisplay().value);
	}

};

// Listen to all click events (instead of 'onClick' to every button)...
document.addEventListener('click', function(e) {
	var o = e.target ? e.target : e.srcElement;	// Browser compatibility issue:
												// - Old browsers, like IE6 use 'srcElement'
												// - Mobile browsers may use 'TouchEvent', 'Touch', 'TouchList', 'touches[]'
	// ... but process only button clicks
	if (o.type == 'submit') {
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
}, false);
