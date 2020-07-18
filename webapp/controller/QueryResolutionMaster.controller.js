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

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);
			this.getView().setModel(oModel);

				this._UserID = sap.ushell.Container.getService("UserInfo").getId();
		//	this._UserID = "FIN_RELEASE1";

			var oUserID = new sap.ui.model.Filter("UserID", "EQ", this._UserID);
			var oList = this.getView().byId("listToBeAns");
			var oListAlRaised = this.getView().byId("listAlrdRaised");
			var filters = [];
			filters.push(oUserID);

			oModel.read("/QueryToAnswerSet", {
				filters: filters,
				success: function (odata, oResponse) {
					var oModelData = new sap.ui.model.json.JSONModel();
					oModelData.setData(odata);
					oList.setModel(oModelData);

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

			oModel.read("/QueryRaisedSet", {
				filters: filters,
				success: function (odata, oResponse) {
					var oModelData = new sap.ui.model.json.JSONModel();
					oModelData.setData(odata);
					oListAlRaised.setModel(oModelData);

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});
			var oTabSelect = this.getView().byId("idIconTabBarNoIcons").getSelectedKey();
		
				oList.attachUpdateFinished(function (oEvent) {

					var aItems = oEvent.getSource().getItems();
					if (aItems.length > 0) {
						oEvent.getSource().getItems()[0].setSelected(true);
						oEvent.getSource().getItems()[0].firePress();
					}
				});
		

		},
		onSelectionChange: function (e) {

			var oList = this.getView().byId("listPO");

			var PurchaseOrderNo = e.getParameters().listItem.getAttributes()[0].getText();
			var QueryId = e.getParameters().listItem.getTitle();
			var QueryStatus = e.getParameters().listItem.getSecondStatus().getText();
			var itemN = {};
			itemN.QueryID = QueryId;
			itemN.QueryStatusText = QueryStatus;
			itemN.ToBeAns = "A";

			var itemR = {};
			itemR.QueryID = QueryId;
			itemR.QueryStatusText = QueryStatus;
			itemR.ToBeAns = "R";

			var oTabSelect = this.getView().byId("idIconTabBarNoIcons").getSelectedKey();
			if (oTabSelect === "ToBeAns") {
				this.getRouter().navTo("QueryResolutionDetail", {
					PurchaseOrderNo: PurchaseOrderNo,
					reviewData: JSON.stringify(itemN)
				});

			} else if (oTabSelect === "AlrdRaised") {
				this.getRouter().navTo("QueryResolutionDetail", {
					PurchaseOrderNo: PurchaseOrderNo,
					reviewData: JSON.stringify(itemR)
				});

			}

			if (this._prevSelect) {
				this._prevSelect.$().css('background-color', '');

			}
			var item = e.getParameter('listItem');
			item.$().css('background-color', '#D3D3D3');

			this._prevSelect = item;

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
			if (oTabSelect === "ToBeAns") {
				var oBinding = this.byId("listToBeAns").getBinding("items");
				oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
			} else if (oTabSelect === "AlrdRaised") {
				var oBindingR = this.byId("listAlrdRaised").getBinding("items");
				oBindingR.filter(oFilter, sap.ui.model.FilterType.Application);
			}

		},

		onListItemPress: function (oEvent) {
			var oTabSelect = this.getView().byId("idIconTabBarNoIcons").getSelectedKey();
			var objEdit = oEvent.getSource().getBindingContext().getObject();
			
			var itemN = {};
			itemN.QueryID = objEdit.QueryID;
			itemN.QueryStatusText = objEdit.QueryStatusText;
			itemN.ToBeAns = "A";
			
			var itemR = {};
			itemR.QueryID = objEdit.QueryID;
			itemR.QueryStatusText = objEdit.QueryStatusText;
			itemR.ToBeAns = "R";
			
			if (oTabSelect === "ToBeAns"){
				this.getRouter().navTo("QueryResolutionDetail", {
				PurchaseOrderNo: objEdit.PO_NO,
				reviewData: JSON.stringify(itemN)
			});
			}else if (oTabSelect === "AlrdRaised"){
				this.getRouter().navTo("QueryResolutionDetail", {
				PurchaseOrderNo: objEdit.PO_NO,
				reviewData: JSON.stringify(itemR)
			});
			}

			
			


			

		},

		onListAlreadyRaised: function (oEvent) {
			var objEdit = oEvent.getSource().getBindingContext().getObject();
			var item = {};
			item.QueryID = objEdit.QueryID;
			item.QueryStatusText = objEdit.QueryStatusText;

			this.getRouter().navTo("QueryResolutionDetail", {
				PO_No: objEdit.PO_No
					//	PurchaseOrderNo: objEdit.PurchaseOrderNo
			});

		},

		/*	OnSelectTab: function (oEvent) {
 
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

		},*/

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

		OnSelectTab: function (oEvent) {

			var oModel = this.getView().getModel();
			var sKey = oEvent.getParameter("key");
			var oUserID = new sap.ui.model.Filter("UserID", "EQ", this._UserID);
			var oListAnswer = this.getView().byId("listToBeAns");
			var oListRaised = this.getView().byId("listAlrdRaised");
			
			var filters = [];
			filters.push(oUserID);

			if (sKey === "ToBeAns") {
				oModel.read("/QueryToAnswerSet", {
					filters: filters,
					success: function (odata, oResponse) {
						var oModelData = new sap.ui.model.json.JSONModel();
						oModelData.setData(odata);
						oListAnswer.setModel(oModelData);
							oListRaised.getItems()[0].setSelected(true);
							oListRaised.getItems()[0].firePress();

					},
					error: function () {
						//	MessageBox.error("error");
					}
				});

			} else if (sKey === "AlrdRaised") {
			
				oModel.read("/QueryRaisedSet", {
					filters: filters,
					success: function (odata, oResponse) {
						var oModelData = new sap.ui.model.json.JSONModel();
						oModelData.setData(odata);
						oListRaised.setModel(oModelData);
							oListRaised.getItems()[0].setSelected(true);
							oListRaised.getItems()[0].firePress();

					},
					error: function () {
						//	MessageBox.error("error");
					}
				});

			}

		},

		handleConfirm: function (oEvent) {
			var oModel = this.getView().getModel();
			var that = this;
			var query = oEvent.getSource().getSelectedFilterItems();
			var oList = this.byId("listToBeAns");
			var oListAlRaised = this.getView().byId("listAlrdRaised");
			var oBinding = oList.getBinding("items");
			var oBindingR = oListAlRaised.getBinding("items");
			var oTabSelect = this.getView().byId("idIconTabBarNoIcons").getSelectedKey();
			if (query.length > 0) {
				var oFilter = new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("QueryStatusText", sap.ui.model.FilterOperator.EQ, query[0].getText()), // filter for value 1
					]
				});
				if (oTabSelect === "ToBeAns") {
					oBinding.filter(oFilter);
				} else if (oTabSelect === "AlrdRaised") {
					oBindingR.filter(oFilter);

				} else {
					oBinding.filter([]);
				}

			}
		},
	});

});