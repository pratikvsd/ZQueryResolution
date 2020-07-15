sap.ui.define(function() {
	"use strict";

	var Formatter = {

		status :  function (sStatus) {
				if (sStatus === "Open") {
					return "Success";
				} else if (sStatus === "Closed") {
					return "Error";
				} 
				else {
					return "None";
				}
		}
	};

	return Formatter;

},  /* bExport= */ true);
