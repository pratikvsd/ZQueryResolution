sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'QueryResolution/ZQueryResolution/utils/Formatter',
], function (Controller, Formatter) {
	"use strict";

	return Controller.extend("QueryResolution.ZQueryResolution.controller.QueryResolutionMaster", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionMaster
		 */
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("MyQuerySet");
			this.getView().setModel(oModel);
			var oModel = this.getOwnerComponent().getModel("QueryAlreadyRaisedSet");
			this.getView().setModel(oModel, "oModelQueryRaised");
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onSearch: function (oEvent) {
	
			var sQuery = oEvent.getParameter("query");
			var oFilter = new sap.ui.model.Filter({
				// two filters
				filters: [
					new sap.ui.model.Filter("QueryID", sap.ui.model.FilterOperator.Contains, sQuery), // filter for value 1
				]
			});

			var oTabSelect = this.getView().byId("idIconTabBarNoIcons").getSelectedKey();
			if (oTabSelect == "ToBeAns") {
				var oBinding = this.byId("listToBeAns").getBinding("items");
				oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
			} else if (oTabSelect == "AlrdRaised") {
				var oBinding = this.byId("listAlrdRaised").getBinding("items");
				oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
			}

		},

		onListItemPress: function (oEvent) {
			var objEdit = oEvent.getSource().getBindingContext().getObject();
			this.getRouter().navTo("QueryResolutionDetail", {
				PurchaseOrderNo: objEdit.PurchaseOrderNo
			});

		},

		onListAlreadyRaised: function (oEvent) {
			var objEdit = oEvent.getSource().getBindingContext("oModelQueryRaised").getObject();
			this.getRouter().navTo("QueryResolutionDetail", {
				PurchaseOrderNo: objEdit.PurchaseOrderNo
			});

		},

		OnSelectTab: function (oEvent) {
 
			var oTab = this.getView().byId("idIconTabBarNoIcons").getSelectedKey();
			var oButton = sap.ui.getCore().byId("__xmlview2--btnAnsQry");
				var oBtnUpload = sap.ui.getCore().byId("__xmlview2--myId");
			if (oTab == "ToBeAns") {

				oButton.setVisible(true);
				oBtnUpload.setVisible(true);
			} else if (oTab == "AlrdRaised") {
				oButton.setVisible(false);
				oBtnUpload.setVisible(false);

			}

		},

		handleOpenDialog: function (oEvent) {

			var oButton = oEvent.getSource();
			if (!this._oDialogFilter) {
				this._oDialogFilter = sap.ui.xmlfragment("QueryResolution.ZQueryResolution.fragments.Filter", this);
				this._oDialogFilter.setModel(this.getView().getModel());
			}

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialogFilter);
			this._oDialogFilter.open();

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionMaster
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionMaster
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionMaster
		 */
		//	onExit: function() {
		//
		//	}

	});

});