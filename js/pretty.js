var PrettyLockScreen = {
  init: function() {
    var that = this;
    var settings = navigator.mozSettings;

    this.setPoints(35);
    // by default lockscreen.enabled is true
    // https://github.com/mozilla-b2g/gaia/blob/master/apps/system/js/lockscreen.js#L48
    this.setLockState(false);
    settings.addObserver('lockscreen.enabled', function(event) {
      var state = event.settingValue;
      console.log('current state is ' + state);
      that.updateScreen(state);
      console.log('[settingObserver] toggleState is ' + that.toggleState);
    });

    var toggle = document.getElementById("lockscreen-toggle");
    toggle.addEventListener('click', that.toggleLock);
  },

  showPoints: function() {
    console.log('showing points');
    var wrap = document.getElementById("toggle-wrap");
    wrap.style.display = 'none';
    var points = document.getElementsByClassName('point');
    for (var i=0; i < points.length; i++) {
      points[i].style.display = 'block';
    }
  },

  hidePoints: function() {
    var wrap = document.getElementById("toggle-wrap");
    wrap.style.display = 'block';
    var points = document.getElementsByClassName('point');
    console.log('hide points');
    for (var i = 0; i < points.length; i++) {
      points[i].style.display = 'none';
    }
  },

  updateScreen: function(state) {
    var that = this;
    this.toggleState = state;
    console.log('[updateScreen] set toggleState to ' + state);
    console.log('[updateScreen] toggleState is ' + this.toggleState);

    if (this.toggleState === true) {
      that.showPoints();
    } else {
      that.hidePoints();
    }
  },

  toggleLock: function() {
    var that = this;

    console.log('[toggleLock] toggleState is ' + this.toggleState);
    // toggleState is undefined, but not sure why!?
    // locks a problem with 'this'
    this.getLockState();
    if (this.toggleState === false) {
      that.setLockState(true);
    } else {
      that.setLockState(false);
    }
  },

  getLockState: function() {
    var that = this;
    var lock = navigator.mozSettings.createLock();
    var req = lock.get('lockscreen.enabled');
    req.onsuccess = function() {
      that.toggleState = req.result['lockscreen.enabled'];
    };
  },


  setLockState: function(state) {
    var lock = navigator.mozSettings.createLock();
    var req = lock.set({ 'lockscreen.enabled': state });
    req.onsuccess = function() {
      console.log('[setLockState] set lockscreen to ' + state);
    };
    req.onerror = function() {
      console.log('a problem ocurred need to check');
    };
  },

  setPoints: function(npoints) {
    var parentDiv = document.querySelector('#app');
    for (var i=0; i < npoints; i++){
      this.createPoint(parentDiv, i);
    }
  },

  createPoint: function(parentEl, i) {
    var point = document.createElement("div");

    point.setAttribute('class', 'point');
    parentEl.appendChild(point);
  },

  updateLockScreen: function() {
  },

  setPasscode: function() {
  }
};

PrettyLockScreen.init();
