let PrettyLockScreen = {
  init: function() {
    this.setPoints(35);
  },

  setPoints: function(npoints) {
    var parentDiv = document.querySelector('#app');
    for (var i=0; i < npoints;i++){
      this.createPoint(parentDiv, i);
    }
  },

  createPoint: function(parentEl, i) {
    var point = document.createElement("div");

    point.setAttribute('class', 'point');
    parentEl.appendChild(point);
  }
}

PrettyLockScreen.init();
