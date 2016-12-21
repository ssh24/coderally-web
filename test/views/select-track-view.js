'use strict';

/* select track views file */

function SelecTrack() {}

// open login view
SelecTrack.prototype.openSelectView = function() {
  return browser.get('/#/select-track');
};

module.exports = SelecTrack;
