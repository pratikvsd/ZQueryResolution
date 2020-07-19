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
				this._UserID = sap.ushell.Container.getService("UserInfo").getId();
		//	this._UserID = "FIN_RELEASE1";

			/*	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);
				this.getView().setModel(oModel);*/
			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);
			this.getView().setModel(oModelQ);

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_APPROVAL_SRV/", true);
			this.getView().setModel(oModel);

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("QueryResolutionDetail").attachPatternMatched(this._onEditMatched, this);

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("QueryResolutionDetail").attachPatternMatched(this._onPatternMatched, this);

			var oModel = this.getOwnerComponent().getModel("AttachmentItemsSet");
			this.getView().setModel(oModel, "oModelAttachment");

			/*var oHtml = this.getView().byId("idFrame");
			oHtml.setContent(
				"<iframe  src='https://docs.google.com/viewer?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy&embedded=true' height='600px' width='100%' ></iframe>"
			);*/
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

		RefreshMasterList: function () {
			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);

			var that = this;
			var oModel = this.getView().getModel();

			var oList1 = sap.ui.getCore().byId("__xmlview2--listToBeAns");
			var oList2 = sap.ui.getCore().byId("__xmlview1--listToBeAns");

			var filters = [];

			var oUserID = new sap.ui.model.Filter("UserID", "EQ", this._UserID);
			filters.push(oUserID);
			var oModelData = new sap.ui.model.json.JSONModel();

		//	var Pocount;
			var txtPONOOB = this.getView().byId("objcmp");
			oModelQ.read("/QueryToAnswerSet", {
				filters: filters,
				success: function (odata, oResponse) {
				//	Pocount = odata.results.length;
					if (oList1 !== undefined) {
					
							oModelData.setData(odata);
							oList1.setModel(oModelData);
						
					}else if(oList2 !== undefined){
							oModelData.setData(odata);
							oList2.setModel(oModelData);
					}

				},
				error: function () {
					//	MessageBox.error("error");
				},

			});

		},

		_onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var sObjectId = oEvent.getParameter("arguments").reviewData;
			var a = JSON.parse(sObjectId);
			var oHtml = this.getView().byId("idFrame");
			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_APPROVAL_SRV/", true);
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

			var txtPONOOB = this.getView().byId("objcmp");
			var txtStatusectedTab = this.getView().byId("objcmp");
			var txtAnsQueryButton = this.getView().byId("btnAnsQry");

			if (oParameters.arguments.PurchaseOrderNo !== "" || oParameters.arguments.PurchaseOrderNo !== null) {

				this.PurchaseOrderNo = oParameters.arguments.PurchaseOrderNo;

				this.PurchaseOrderNo = oParameters.arguments.PurchaseOrderNo;
				this.ListId = oParameters.arguments.oViewID;
				txtPONOOB.setTitle(this.PurchaseOrderNo);
				txtQueryID.setText(a.QueryID);
				txtPurOrdSts.setText(a.QueryStatusText);
				txtPONOOB.setNumber(a.ToBeAns);

				if (txtStatusectedTab.getNumber() === "A") {

					txtAnsQueryButton.setVisible(true);
				} else if (txtStatusectedTab.getNumber() === "R") {

					txtAnsQueryButton.setVisible(false);
				}

				var DocumentDate, day, month, year, final;

				var sRead = "/SelectedPOContentSet(PoNo='" + this.PurchaseOrderNo + "')/$value";
				oModel.read(sRead, {
					success: function (oData, oResponse) {

						var pdfURL = oResponse.requestUri;
						oHtml.setContent("<iframe src=" + pdfURL + " width='100%' height='600px'></iframe>");

					},
					error: function () {
						//	MessageBox.error("Cover Note Read Failed");
					}
				});

				oModel.read("/PurchaseOrderGeneralSet('" + this.PurchaseOrderNo + "')", {
					success: function (odata, oResponse) {

						txtPurOrdNo.setText(oResponse.data.PO_No);
						txtPODesc.setText(oResponse.data.PO_Description);
						txtPurOrdInt.setText(oResponse.data.PO_Initiator);
						txtPurOrdVendor.setText(oResponse.data.Vendor);
						//	txtPlant.setText(oResponse.data.Plant);
						txtPurOrdDocType.setText(oResponse.data.Document_Type);
						if (oResponse.data.Document_Date !== null) {
							DocumentDate = oResponse.data.Document_Date;
							year = DocumentDate.substring(0, 4);
							month = DocumentDate.substring(4, 6);
							day = DocumentDate.substring(6, 8);

							final = day + "-" + month + "-" + year;
							txtPurOrdDt.setText(final);

						} else {
							txtPurOrdDt.setText("");
						}

						//	txtPurOrdSts.setText(oResponse.data.PO_Status);

					},

					error: function (e) {
						//	MessageBox.error("error");
					}

				});

			} else {
				MessageBox.error("Incorrect Data");
			}
		},

	/*	_onPatternMatched: function (oEvent) {
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
		},*/

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
			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);

			var oButton = oEvent.getSource();
			if (!this._AnsweroDialog) {
				this._AnsweroDialog = sap.ui.xmlfragment("QueryResolution.ZQueryResolution.fragments.AnswerQuery", this);
				this._AnsweroDialog.setModel(this.getView().getModel());
			}

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._AnsweroDialog);
			this._AnsweroDialog.open();
			
			var oUserID = new sap.ui.model.Filter("UserID", "EQ", this._UserID);
			var oList = this.getView().byId("listToBeAns");
			//	var oListAlRaised = this.getView().byId("listAlrdRaised");
			var filters = [];
			filters.push(oUserID);
			var Pocount;

			var txtQuery = sap.ui.getCore().byId("iQuery").setEnabled(false);
			var txtUser = sap.ui.getCore().byId("iUser").setEnabled(false);
			var txtDateTime = sap.ui.getCore().byId("idDateTime").setEnabled(false);
			var txtDate = sap.ui.getCore().byId("lblDate");
			var txtTime = sap.ui.getCore().byId("lblTime");
			var oPoNo = this.getView().byId("objcmp").getTitle();
			var oQueryId = this.getView().byId("idQuery").getText();
			
			var DateTime;

			oModelQ.read("/QueryToAnswerSet", {
				filters: filters,
				success: function (odata, oResponse) {
					var oModelData = new sap.ui.model.json.JSONModel();
					oModelData.setData(odata);
					for (var i = 0; i < oModelData.getData().results.length; i++) {
						if (oModelData.getData().results[i].QueryID.toString() === oQueryId) {
							txtQuery.setValue(oModelData.getData().results[i].Query);
							txtUser.setValue(oModelData.getData().results[i].QueryFrom);
							txtDate.setText(oModelData.getData().results[i].QueryDate);
							txtTime.setText(oModelData.getData().results[i].QueryTime);
							DateTime = txtDate.getText() + "," + txtTime.getText();
							txtDateTime.setValue(DateTime);
						}
					}
				},
				error: function () {
					//	MessageBox.error("error");
				}
			});
			
			var TitleAnswer = "QueryId - " + " Answer Query";

			var oTitle = this._AnsweroDialog.setTitle(TitleAnswer);


		},
		_GetCuurentDate: function (CurrDate) {
			var currentDate = new Date();
			var day = currentDate.getDate();
			var month = currentDate.getMonth() + 1;
			var year = currentDate.getFullYear();
			if (day < 10) {
				day = "0" + parseInt(currentDate.getDate());
			}
			if (month < 10) {
				month = "0" + parseInt(currentDate.getMonth() + 1);
			}
			CurrDate = day + "-" + month + "-" + year;
			//	CurrDate = day + "-" + month + "-" + year;
			return CurrDate;
		},
		GetClock24hrs: function () {

			var result = "";

			var d = new Date();
			/*var nday = d.getDay(),
				nmonth = d.getMonth(),
				ndate = d.getDate(),
				nyear = d.getYear();*/
			var nhour = d.getHours(),
				nmin = d.getMinutes(),
				nsec = d.getSeconds(),
				ap;
			if (nhour === 0) {
				ap = " AM";
				nhour = 24;
			} else if (nhour < 24) {
				ap = " AM";
			} else if (nhour === 24) {
				ap = " PM";
			} else if (nhour > 24) {
				ap = " PM";
				nhour -= 24;
			}
			/*if (nyear < 1000) {
				nyear += 1900;
			}*/
			if (nmin <= 9) {
				nmin = "0" + nmin;
			}
			if (nsec <= 9) {
				nsec = "0" + nsec;
			}
			result = nhour + ":" + nmin + ":" + nsec;
			return result;

		},

		OnSubmitAnswer: function (oEvent) {
		

			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);

			var that = this;
			var QueryID = this.getView().byId("idQuery").getText();
			var PO = this.getView().byId("objcmp").getTitle();

			var QueryAns = sap.ui.getCore().byId("iQueryAns");
			var QueryFrom = sap.ui.getCore().byId("iUser");
			var Query = sap.ui.getCore().byId("iUser");

			if (QueryAns.getValue() === "") {
				MessageToast.show(" Please Answer Query ");
				return false;
			} else {

				var oItems = {};

				oItems.QueryID = QueryID;
				oItems.QueryFromID = this._UserID;
				oItems.QueryToID = QueryFrom.getValue();
				oItems.QueryDate = that._GetCuurentDate();
				oItems.QueryTime = that.GetClock24hrs();
				oItems.Query = QueryAns.getValue();
				oItems.PO_NO = PO;

				oModelQ.create("/AnswerQuerySet", oItems, {

					success: function (odata, oResponse) {

						var smsg = "Query for PO " + PO + " has been Answered";
						that.OnCancelAnswer();
						MessageBox.confirm(smsg, {
							icon: sap.m.MessageBox.Icon.INFORMATION,
							title: "Confirm",
							actions: [sap.m.MessageBox.Action.OK],
							onClose: function (sAction) {
								if (sAction === "OK") {

									//	that.RefreshQueryHistoryTable();
										that.RefreshMasterList();

								}
							}
						});

					},
					error: function (oError) {
						//	MessageBox.error("Error : " + oError);
					}

				});
			}

		},

		OnCancelAnswer: function (oEvent) {
			this._AnsweroDialog.close();
			if (this._AnsweroDialog) {
				this._AnsweroDialog.destroy();
				this._AnsweroDialog = null; // make it falsy so that it can be created next time
			}
		},

		handleIconTabBarSelect: function (oEvent) {
			var oModel = this.getView().getModel();
			var PONo = this.getView().byId("objcmp").getTitle();

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

			var filters = [];

			var sKey = oEvent.getParameter("key");
			if (sKey === "General") {

				var DocumentDate, day, month, year, final;
				var POStatus = this.getView().byId("objPrice");
				oModel.read("/PurchaseOrderGeneralSet('" + PONo + "')", {
					success: function (odata, oResponse) {

						txtPurOrdNo.setText(oResponse.data.PO_No);
						txtPODesc.setText(oResponse.data.PO_Description);
						txtPurOrdInt.setText(oResponse.data.PO_Initiator);
						txtPurOrdVendor.setText(oResponse.data.Vendor);
						//	txtPlant.setText(oResponse.data.Plant);
						txtPurOrdDocType.setText(oResponse.data.Document_Type);
						if (oResponse.data.Document_Date !== null) {
							DocumentDate = oResponse.data.Document_Date;
							year = DocumentDate.substring(0, 4);
							month = DocumentDate.substring(4, 6);
							day = DocumentDate.substring(6, 8);

							final = day + "-" + month + "-" + year;
							txtPurOrdDt.setText(final);

						} else {
							txtPurOrdDt.setText("");
						}

						//	txtPurOrdSts.setText(oResponse.data.PO_Status);

					},

					error: function (e) {
						//	MessageBox.error("error");
					}

				});
			}

		},

	});

});