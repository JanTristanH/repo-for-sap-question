/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"idm-co2-popover-demo/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
