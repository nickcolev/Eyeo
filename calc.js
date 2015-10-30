var jsc = {
  memory: 0,
  number: function(o) {
	var c = o.innerText ? o.innerText : o;
	document.getElementById("display").value += c;
	this.release();
  },
  calc: function() {
    var o = this.getDisplay();
    if (o.value) {
      try {
        o.value = eval (o.value);
      } catch (e) { alert ("Bad expression"); }
    }
    return false;
  },
  clear: function(oTarget) {
    var oDisplay = document.getElementById("display"),
        l = oDisplay.value.length;
    if (l > 0) oDisplay.value = oDisplay.value.substr(0, --l);
    this.release(oTarget);
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
  press: function(o) {
	this.target = o;
	o.style.backgroundColor = '#888';
  },
  release: function(o) {
    if (!o) o = this.target;
	o.style.backgroundColor = '';
  }
};

document.addEventListener('mousedown', function(e) {
  if (e.target.className.match(/^click/))		// Only objects having class 'click'
    jsc.press(e.target);
},false);

document.addEventListener('mouseup', function(e) {
	//e.preventDefault();
	//e.stopPropagation();
	jsc.release(e.target);
  if (e.target.className.match(/^click/)) {		// Process only objects having class 'click'
    // Dispatch
	switch(e.target.innerText) {				// Button letter(s)
      case 'C':
        jsc.clear(e.target);
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
        jsc.number(e.target);
        break;
	}
  }
},false);
