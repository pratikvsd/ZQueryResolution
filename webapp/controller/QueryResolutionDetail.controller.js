sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	'sap/m/MessageToast',
	'sap/m/UploadCollectionParameter',
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/ui/core/Fragment',
], function (Controller, MessageBox, MessageToast, UploadCollectionParameter, Dialog, Button, Fragment) {
	"use strict";

	return Controller.extend("QueryResolution.ZQueryResolution.controller.QueryResolutionDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionDetail
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("QueryResolutionDetail").attachPatternMatched(this._onEditMatched, this);

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("QueryResolutionDetail").attachPatternMatched(this._onPatternMatched, this);

			var oModel = this.getOwnerComponent().getModel("MyQuerySet");
			this.getView().setModel(oModel, "oModelQuerySet");
			var oModel = this.getOwnerComponent().getModel("QueryAlreadyRaisedSet");
			this.getView().setModel(oModel, "oModelQueryRaised");

			var oModel = this.getOwnerComponent().getModel("AttachmentItemsSet");
			this.getView().setModel(oModel, "oModelAttachment");

			var oHtml = this.getView().byId("idFrame");
			oHtml.setContent(
				"<iframe  src='https://docs.google.com/viewer?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy&embedded=true' height='600px' width='100%' ></iframe>"
			);
		},

	getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleNavButtonPress: function (oEvent) {
		//	debugger;
		/*	var oSplitApp = this.getView().getParent().getParent();
			var oMaster = oSplitApp.getMasterPages()[0];
			oSplitApp.toMaster(oMaster, "flip");*/	
		//	debugger;
			this.getRouter().navTo("FirstPage", {}, true);

			
		},

		_onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oModel = this.getView().getModel("oModelQuerySet");

			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//		var txtPONO = this.getView().byId("txtPONO");
			var txtPurOrdNo = this.getView().byId("PurOrdNo");
			var txtQueryID = this.getView().byId("idQuery");
			var txtPODesc = this.getView().byId("PurOrdDesc");
			var txtPurOrdInt = this.getView().byId("PurOrdInt");
			var txtPurOrdVendor = this.getView().byId("PurOrdVendor");
			var txtPurOrdDocType = this.getView().byId("PurDocType");
			var txtPurOrdDt = this.getView().byId("PurOrdDt");
			var txtPurOrdSts = this.getView().byId("PurOrdSts");
			var txtPossPOSts = this.getView().byId("PossPOSts");
			var txtPONOOB = this.getView().byId("objcmp");
			var txtObjPrice = this.getView().byId("objcmp");
			var txtObjQuery = this.getView().byId("objQueryAttr");

			if (oParameters.arguments.PurchaseOrderNo !== "" || oParameters.arguments.PurchaseOrderNo !== null) {

				this.PurchaseOrderNo = oParameters.arguments.PurchaseOrderNo;

				for (var i = 0; i < oModel.getData().QueryList.length; i++) {
					if (oModel.getData().QueryList[i].PurchaseOrderNo.toString() === this.PurchaseOrderNo) {
						txtPurOrdNo.setText(this.PurchaseOrderNo);
						//	txtPurOrdNo.setText(oModel.getData().PurchaseOrder[i].PurchaseOrderNo);
						txtPODesc.setText(oModel.getData().QueryList[i].PODescription);
						txtQueryID.setText(oModel.getData().QueryList[i].QueryID);

						txtPurOrdInt.setText(oModel.getData().QueryList[i].POInitiator);
						txtPurOrdVendor.setText(oModel.getData().QueryList[i].Vendor);
						txtPurOrdDocType.setText(oModel.getData().QueryList[i].DocumentType);
						txtPurOrdDt.setText(oModel.getData().QueryList[i].PODate);
						txtPurOrdSts.setText(oModel.getData().QueryList[i].Status);
						//		txtPossPOSts.setText(oModel.getData().PurchaseOrder[i].PossiblePOStatus);
					//	txtPONOOB.setText(oModel.getData().QueryList[i].PurchaseOrderNo);
						txtPONOOB.setTitle(oModel.getData().QueryList[i].QueryID);
						txtObjPrice.setNumber(oModel.getData().QueryList[i].Amount);
						txtObjPrice.setNumberUnit(oModel.getData().QueryList[i].CurrencyCode);

						return false;
					}
				}

			} else {
				MessageBox.error("Incorrect Data");
			}
		},

		_onPatternMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oModel = this.getView().getModel("oModelQueryRaised");

			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//		var txtPONO = this.getView().byId("txtPONO");
			var txtPurOrdNo = this.getView().byId("PurOrdNo");
			var txtQueryID = this.getView().byId("idQuery");
			var txtPODesc = this.getView().byId("PurOrdDesc");
			var txtPurOrdInt = this.getView().byId("PurOrdInt");
			var txtPurOrdVendor = this.getView().byId("PurOrdVendor");
			var txtPurOrdDocType = this.getView().byId("PurDocType");
			var txtPurOrdDt = this.getView().byId("PurOrdDt");
			var txtPurOrdSts = this.getView().byId("PurOrdSts");
			var txtPossPOSts = this.getView().byId("PossPOSts");
			var txtPONOOB = this.getView().byId("objcmp");
			var txtObjPrice = this.getView().byId("objcmp");
			var txtObjQuery = this.getView().byId("objQueryAttr");

			if (oParameters.arguments.PurchaseOrderNo !== "" || oParameters.arguments.PurchaseOrderNo !== null) {

				this.PurchaseOrderNo = oParameters.arguments.PurchaseOrderNo;

				for (var i = 0; i < oModel.getData().QueryListAlreadyRaised.length; i++) {
					if (oModel.getData().QueryListAlreadyRaised[i].PurchaseOrderNo.toString() === this.PurchaseOrderNo) {
						txtPurOrdNo.setText(this.PurchaseOrderNo);
						//	txtPurOrdNo.setText(oModel.getData().PurchaseOrder[i].PurchaseOrderNo);
						txtPODesc.setText(oModel.getData().QueryListAlreadyRaised[i].PODescription);
						txtQueryID.setText(oModel.getData().QueryListAlreadyRaised[i].QueryID);

						txtPurOrdInt.setText(oModel.getData().QueryListAlreadyRaised[i].POInitiator);
						txtPurOrdVendor.setText(oModel.getData().QueryListAlreadyRaised[i].Vendor);
						txtPurOrdDocType.setText(oModel.getData().QueryListAlreadyRaised[i].DocumentType);
						txtPurOrdDt.setText(oModel.getData().QueryListAlreadyRaised[i].PODate);
						txtPurOrdSts.setText(oModel.getData().QueryListAlreadyRaised[i].Status);
						//		txtPossPOSts.setText(oModel.getData().PurchaseOrder[i].PossiblePOStatus);
						txtPONOOB.setTitle(oModel.getData().QueryListAlreadyRaised[i].QueryID);
					//	txtPONOOB.setTitle(oModel.getData().QueryListAlreadyRaised[i].icon);
						txtObjPrice.setNumber(oModel.getData().QueryListAlreadyRaised[i].Amount);
						txtObjPrice.setNumberUnit(oModel.getData().QueryListAlreadyRaised[i].CurrencyCode);

						return false;
					}
				}

			} else {
				MessageBox.error("Incorrect Data");
			}
		},

		//Upload Attachments
		onUploadComplete: function (oEvent) {
			var oData = this.getView().byId("UploadCollection").getModel("oModelAttachment").getData();
			var aItems = jQuery.extend(true, {}, oData).items;
			var oItem = {};
			var sUploadedFile = oEvent.getParameter("files")[0].fileName;
			// at the moment parameter fileName is not set in IE9
			if (!sUploadedFile) {
				var aUploadedFile = (oEvent.getParameters().getSource().getProperty("value")).split(/\" "/);
				sUploadedFile = aUploadedFile[0];
			}
			oItem = {
				"documentId": jQuery.now().toString(), // generate Id,
				"fileName": sUploadedFile,
				"mimeType": "",
				"thumbnailUrl": "",
				"url": "",

			};

			aItems.unshift(oItem);
			this.getView().byId("UploadCollection").getModel("oModelAttachment").setData({
				"items": aItems
			});
			// Sets the text to the label
			this.getView().byId("attachmentTitle").setText(this.getAttachmentTitleText());
			// delay the success message for to notice onChange message
			setTimeout(function () {
				MessageToast.show("UploadComplete event triggered.");
			}, 4000);
		},

		// Before Upload Attachments
		onBeforeUploadStarts: function (oEvent) {
			// Header Slug
			var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
				name: "slug",
				value: oEvent.getParameter("fileName")
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
			MessageToast.show("BeforeUploadStarts event triggered.");
		},

		onUploadTerminated: function (oEvent) {
			// get parameter file name
			var sFileName = oEvent.getParameter("fileName");
			// get a header parameter (in case no parameter specified, the callback function getHeaderParameter returns all request headers)
			var oRequestHeaders = oEvent.getParameters().getHeaderParameter();
		},

		//Delete Attachment
		onFileDeleted: function (oEvent) {
			this.deleteItemById(oEvent.getParameter("documentId"));
			MessageToast.show("FileDeleted event triggered.");
		},

		deleteItemById: function (sItemToDeleteId) {
			var oData = this.getView().byId("UploadCollection").getModel("oModelAttachment").getData();
			var aItems = jQuery.extend(true, {}, oData).items;
			jQuery.each(aItems, function (index) {
				if (aItems[index] && aItems[index].documentId === sItemToDeleteId) {
					aItems.splice(index, 1);
				};
			});
			this.getView().byId("UploadCollection").getModel("oModelAttachment").setData({
				"items": aItems
			});
			this.getView().byId("attachmentTitle").setText(this.getAttachmentTitleText());
		},

		getAttachmentTitleText: function () {
			var aItems = this.getView().byId("UploadCollection").getItems();
			return "Uploaded (" + aItems.length + ")";
		},

		SelectDialogPressAnswer: function (oEvent) {

			var oButton = oEvent.getSource();
			if (!this._AnsweroDialog) {
				this._AnsweroDialog = sap.ui.xmlfragment("QueryResolution.ZQueryResolution.fragments.AnswerQuery", this);
				this._AnsweroDialog.setModel(this.getView().getModel());
			}

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._AnsweroDialog);
			this._AnsweroDialog.open();
debugger;
			var oUser = this.getView().byId("PurOrdInt").getText();
			var oText = sap.ui.getCore().byId("iUser").setValue(oUser).setEnabled(false);
			//	var oTextN = this._RejectoDialog.setTitle(oUser);

		},

		OnSubmitQuery: function (oEvent) {
			this._AnsweroDialog.close();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf QueryResolution.ZQueryResolution.view.QueryResolutionDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});