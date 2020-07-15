/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"QueryResolution/ZQueryResolution/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"QueryResolution/ZQueryResolution/test/integration/pages/SApp",
	"QueryResolution/ZQueryResolution/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "QueryResolution.ZQueryResolution.view.",
		autoWait: true
	});
});