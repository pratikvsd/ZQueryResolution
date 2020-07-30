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
	//	this._UserID = sap.ushell.Container.getService("UserInfo").getId();
			this._UserID = "FIN_RELEASE1";

			/*	var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);
				this.getView().setModel(oModel);*/
			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);
			this.getView().setModel(oModelQ);

			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_APPROVAL_SRV/", true);
			this.getView().setModel(oModel);

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("QueryResolutionDetail").attachPatternMatched(this._onEditMatched, this);

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("queryresolutiondetail").attachPatternMatched(this._onPatternMatched, this);

			var oUserID = new sap.ui.model.Filter("UserID", "EQ", this._UserID);
			var filters = [];
			filters.push(oUserID);
			var Pocount;
			var oModelData = new sap.ui.model.json.JSONModel();
			var oAnswerQueryBtn = this.getView().byId("btnAnsQry");
			var txtPONOOB = this.getView().byId("objcmp");
			oModelQ.read("/QueryToAnswerSet", {
				filters: filters,
				success: function (odata, oResponse) {
					Pocount = odata.results.length;
					if (Pocount > 0) {

						oAnswerQueryBtn.setVisible(true);
					} else {
						//	txtPONOOB.setTitle("");
						oAnswerQueryBtn.setVisible(false);
					}

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

			oModelQ.read("/QueryRaisedSet", {
				filters: filters,
				success: function (odata, oResponse) {
					Pocount = odata.results.length;
					if (Pocount > 0) {

						oAnswerQueryBtn.setVisible(false);
					} else {
						txtPONOOB.setTitle("");
						//	oAnswerQueryBtn.setVisible(false);
					}

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleNavButtonPress: function (oEvent) {

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

			var POCoverNote = this.getView().byId("idFrame");
			var POQueryHistory = this.getView().byId("tblQueryHistory");
			var oAnswerQueryBtn = this.getView().byId("btnAnsQry");

			var QueryId = this.getView().byId("idQuery");
			var PurchaseNo = this.getView().byId("PurOrdNo");
			var PODescription = this.getView().byId("PurOrdDesc");
			var POOrderInti = this.getView().byId("PurOrdInt");

			var vendor = this.getView().byId("PurOrdVendor");
			var DocType = this.getView().byId("PurDocType");

			var orderdate = this.getView().byId("PurOrdDt");
			var PoStatus = this.getView().byId("PurOrdSts");
			var oHtml = this.getView().byId("idFrame");

			var Pocount;
			var txtPONOOB = this.getView().byId("objcmp");
			oModelQ.read("/QueryToAnswerSet", {
				filters: filters,
				success: function (odata, oResponse) {
					//	Pocount = odata.results.length;
					if (oList1 !== undefined) {
						if (Pocount > 0) {
							oModelData.setData(odata);
							oList1.setModel(oModelData);
							oHtml.setVisible(true);
						} else {
							oModelData.setData(odata);
							oList1.setModel(oModelData);
							txtPONOOB.setTitle("");
							oHtml.setVisible(false);
							//	POCoverNote.setContent(null);
							POQueryHistory.setModel(null);
							QueryId.setText("");
							PurchaseNo.setText("");
							PODescription.setText("");
							POOrderInti.setText("");
							vendor.setText("");
							DocType.setText("");
							orderdate.setText("");
							PoStatus.setText("");
							//	oAnswerQueryBtn.setEnabled(false);

						}

					} else if (oList2 !== undefined) {
						if (Pocount > 0) {
							oModelData.setData(odata);
							oList2.setModel(oModelData);
							oHtml.setVisible(true);
						} else {
							oModelData.setData(odata);
							oList2.setModel(oModelData);
							txtPONOOB.setTitle("");
							oHtml.setVisible(false);
							//	POCoverNote.setContent(null);
							POQueryHistory.setModel(null);
							QueryId.setText("");
							PurchaseNo.setText("");
							PODescription.setText("");
							POOrderInti.setText("");
							vendor.setText("");

							DocType.setText("");
							orderdate.setText("");
							PoStatus.setText("");
							//	oAnswerQueryBtn.setEnabled(false);

						}
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

				this.ListId = oParameters.arguments.oViewID;
				txtPONOOB.setTitle(this.PurchaseOrderNo);
				txtQueryID.setText(a.QueryID);
				//	txtPurOrdSts.setText(a.QueryStatusText);
				txtPONOOB.setNumber(a.ToBeAns);

				if (txtStatusectedTab.getNumber() === "A") {
					txtAnsQueryButton.setVisible(true);
					//	txtAnsQueryButton.setEnabled(true);

				} else if (txtStatusectedTab.getNumber() === "R") {

					txtAnsQueryButton.setVisible(false);

				}
				that.handleIconTabBarSelect();

				/*	var DocumentDate, day, month, year, final;

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

					var POHistory = this.getView().byId("objcmp").getTitle();
					var oTableHistory = this.getView().byId("tblQueryHistory");
					var filters = [];

					var oPOH = new sap.ui.model.Filter("PO_NO", "EQ", POHistory);
					filters.push(oPOH);

					oModel.read("/POQueryHistorySet", {
						filters: filters,
						success: function (odata, oResponse) {

							var oModelData = new sap.ui.model.json.JSONModel();
							oModelData.setData(odata);
							oTableHistory.setModel(oModelData);

						},
						error: function () {
							//	MessageBox.error("error");
						}
					});

					oModel.read("/PurchaseOrderGeneralSet('" + this.PurchaseOrderNo + "')", {
						success: function (odata, oResponse) {

							txtPurOrdNo.setText(oResponse.data.PO_NO);
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

							txtPurOrdSts.setText(oResponse.data.PO_Status);

						},

						error: function (e) {
							//	MessageBox.error("error");
						}

					});

					var tblQueryDetails = this.getView().byId("tblQueryDetails");
					var QueryAsked = this.getView().byId("tblQueryAsked");
					var QueryAskedDate = this.getView().byId("tblQueryDate");
					var tblQueryTime = this.getView().byId("tblQueryTime");
					var tblQueryDateTime = this.getView().byId("tblQueryDateTime");

					var QueryAnswered = this.getView().byId("tblQueryanswered");
					var QueryAnswerDate = this.getView().byId("tblQueryanswerDate");
					var tblQueryAnswerTime = this.getView().byId("tblQueryanswerTime");
					var tblQueryAnswerDateTime = this.getView().byId("tblQueryansweredDateTime");
					oModelQ.read("/QueryRaisedDetailsSet('" + txtQueryID.getText() + "')", {

						success: function (odata, oResponse) {
							QueryAsked.setText(odata.QueryAsked);
							QueryAskedDate.setText(odata.QueryAskedDate);
							tblQueryTime.setText(odata.QueryAskedTime);
							var QueryDateTime = QueryAskedDate.getText() + " " + tblQueryTime.getText();
							tblQueryDateTime.setText(QueryDateTime);

							QueryAnswered.setText(odata.QueryAnswered);
							QueryAnswerDate.setText(odata.QueryAnsweredDate);
							tblQueryAnswerTime.setText(odata.QueryAnsweredTime);
							var AnswerDateTime = QueryAnswerDate.getText() + " " + tblQueryAnswerTime.getText();
							tblQueryAnswerDateTime.setText(AnswerDateTime);

						},
						error: function () {
							//	MessageBox.error("error");
						}
					});*/
			} else {
				MessageBox.error("Incorrect Data");
			}
		},
		_onPatternMatched: function (oEvent) {
			debugger;
			var oParameters = oEvent.getParameters();
			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);

			var oUserID = new sap.ui.model.Filter("UserID", "EQ", this._UserID);
			var filters = [];
			filters.push(oUserID);
			var Pocount;
			var oAnswerQueryBtn = this.getView().byId("btnAnsQry");

			var POCoverNote = this.getView().byId("idFrame");
			var POQueryHistory = this.getView().byId("tblQueryHistory");

			var PurchaseNo = this.getView().byId("PurOrdNo");
			var PODescription = this.getView().byId("PurOrdDesc");
			var POOrderInti = this.getView().byId("PurOrdInt");

			var vendor = this.getView().byId("PurOrdVendor");
			var Plant = this.getView().byId("idPlant");
			var DocType = this.getView().byId("PurDocType");

			var orderdate = this.getView().byId("PurOrdDt");
			var PoStatus = this.getView().byId("PurOrdSts");

			var PoNo = this.getView().byId("objcmp");
			var txtQueryID = this.getView().byId("idQuery");

			var QueryAsked = this.getView().byId("tblQueryAsked");
			var tblQueryDateTime = this.getView().byId("tblQueryDateTime");

			var QueryAnswered = this.getView().byId("tblQueryanswered");
			var tblQueryAnswerDateTime = this.getView().byId("tblQueryansweredDateTime");

			var oHtml = this.getView().byId("idFrame");
			var that = this;
			oModelQ.read("/QueryToAnswerSet", {
				filters: filters,
				success: function (odata, oResponse) {
					Pocount = odata.results.length;
					if (Pocount > 0) {
						that.handleIconTabBarSelect();
						//	oAnswerQueryBtn.setVisible(true);
					} else {
						oAnswerQueryBtn.setVisible(false);
					}

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

			oModelQ.read("/QueryRaisedSet", {
				filters: filters,
				success: function (odata, oResponse) {
					Pocount = odata.results.length;
					if (Pocount > 0) {
						that.handleIconTabBarSelect();
					} else {
						oAnswerQueryBtn.setVisible(false);
						oHtml.setVisible(false);
						//	POCoverNote.setContent(null);
						oHtml.setVisible(false);
						POQueryHistory.setModel(null);
						PoNo.setTitle("");
						txtQueryID.setText("");
						PurchaseNo.setText("");
						PODescription.setText("");
						POOrderInti.setText("");
						vendor.setText("");
						DocType.setText("");
						orderdate.setText("");
						PoStatus.setText("");
						QueryAsked.setText("");
						tblQueryDateTime.setText("");
						QueryAnswered.setText("");
						tblQueryAnswerDateTime.setText("");
					}

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

		},

		onUploadComplete: function (oEvent) {
			//var oModel = this.getView().getModel();
		//	this.getView().getModel().refresh();
			//var Attachments = this.getView().byId("UploadCollection");
			var that = this;
			that.OnPressAttachments();
		},

		// Before Upload Attachments
		onBeforeUploadStarts: function (oEvent) {
			debugger;

			var Attachments = this.getView().byId("UploadCollection");

			var PO = this.getView().byId("objcmp").getTitle();
			// Header Slug

			var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
				name: "slug",
				value: oEvent.getParameter("fileName")
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);

			var oCustomerHeaderPONo = new sap.m.UploadCollectionParameter({
				name: "PO_NO",
				value: PO
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderPONo);

			var oModel = this.getView().getModel();
			oModel.refreshSecurityToken();
			var oHeaders = oModel.oHeaders;

			var sToken = oHeaders['x-csrf-token'];
			var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
				name: "x-csrf-token",
				value: sToken
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderToken);
			Attachments.setBusy(true);

		},

		onFilenameLengthExceed: function (oEvent) {
			var smsg = "Filename Length should be less than 35 characters";
				MessageBox.confirm(smsg, {
							icon: sap.m.MessageBox.Icon.INFORMATION,
							title: "Confirm",
							actions: [sap.m.MessageBox.Action.OK],
							onClose: function (sAction) {
								if (sAction === "OK") {
								}
							}
						});
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
		var that = this;
			var oModel = this.getView().getModel();
			var oPONo = this.getView().byId("objcmp").getTitle();
			oModel.remove("/POAttachmentsSet(PO_NO='" + oPONo + "',DocumentID='" + sItemToDeleteId + "')", {

				method: "DELETE",
				success: function (res) {
					MessageBox.success("Attachment Delete Successfully", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Success",
						onClose: function (oAction) {
						that.OnPressAttachments();
						}
					});

				},

				error: function (err) {
					MessageBox.error("error");
				}
			});
		
	
		//	this.getView().byId("attachmentTitle").setText(this.getAttachmentTitleText());
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
			var oQueryTo = sap.ui.getCore().byId("IdQueryTo");

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
							oQueryTo.setText(oModelData.getData().results[i].QueryFromID);
							DateTime = txtDate.getText() + "," + txtTime.getText();
							txtDateTime.setValue(DateTime);
						}
					}
				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

			var TitleAnswer = oQueryId + " - Answer Query";

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

			var QueryTo = sap.ui.getCore().byId("IdQueryTo");

			if (QueryAns.getValue() === "") {
				MessageToast.show(" Please Answer Query ");
				return false;
			} else {

				var oItems = {};

				oItems.QueryID = QueryID;
				oItems.QueryFromID = this._UserID;
				oItems.QueryToID = QueryTo.getText();
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

		handleIconTabBarSelect: function () {
			debugger;
			var that = this;
			var iconTab = this.getView().byId("idIconTabBarNoIconsD");
			if (iconTab.getSelectedKey() === "QueryDetails") {
				that.OnPressQueryDetails();
			} else if (iconTab.getSelectedKey() === "CoverNote") {
				that.OnPressCoverNote();
			} else if (iconTab.getSelectedKey() === "Attachments") {
				that.OnPressAttachments();

			} else if (iconTab.getSelectedKey() === "POQueries") {
				that.OnPressQueryHistory();
			} else if (iconTab.getSelectedKey() === "General") {
				that.OnPressGeneralTab();
			}

		},
		OnPressQueryDetails: function () {
			var oModelQ = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZVECV_PURCHASE_ORDER_QUERY_SRV/", true);

			var PONo = this.getView().byId("objcmp").getTitle();

			var OUserId = this._UserID;

			var filters = [];

			var oPOH = new sap.ui.model.Filter("PO_NO", "EQ", PONo);
			filters.push(oPOH);
			var txtQueryID = this.getView().byId("idQuery");
			var tblQueryDetails = this.getView().byId("tblQueryDetails");
			var QueryAsked = this.getView().byId("tblQueryAsked");
			var QueryAskedDate = this.getView().byId("tblQueryDate");
			var tblQueryTime = this.getView().byId("tblQueryTime");
			var tblQueryDateTime = this.getView().byId("tblQueryDateTime");

			var QueryAnswered = this.getView().byId("tblQueryanswered");
			var QueryAnswerDate = this.getView().byId("tblQueryanswerDate");
			var tblQueryAnswerTime = this.getView().byId("tblQueryanswerTime");
			var tblQueryAnswerDateTime = this.getView().byId("tblQueryansweredDateTime");
			oModelQ.read("/QueryRaisedDetailsSet('" + txtQueryID.getText() + "')", {

				success: function (odata, oResponse) {
					QueryAsked.setText(odata.QueryAsked);
					QueryAskedDate.setText(odata.QueryAskedDate);
					tblQueryTime.setText(odata.QueryAskedTime);
					var QueryDateTime = QueryAskedDate.getText() + " " + tblQueryTime.getText();
					tblQueryDateTime.setText(QueryDateTime);

					QueryAnswered.setText(odata.QueryAnswered);
					QueryAnswerDate.setText(odata.QueryAnsweredDate);
					tblQueryAnswerTime.setText(odata.QueryAnsweredTime);
					var AnswerDateTime = QueryAnswerDate.getText() + " " + tblQueryAnswerTime.getText();
					tblQueryAnswerDateTime.setText(AnswerDateTime);

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

		},
		OnPressCoverNote: function () {

			var oModel = this.getView().getModel();
			var PONo = this.getView().byId("objcmp").getTitle();
			var oHtml = this.getView().byId("idFrame");
			oHtml.setVisible(true);
			var sRead = "/SelectedPOContentSet(PoNo='" + PONo + "')/$value";

			oModel.read(sRead, {
				
				success: function (oData, oResponse) {
					debugger;
					var pdfURL = oResponse.requestUri;
					oHtml.setContent("<iframe src=" + pdfURL + " width='100%' height='600px'></iframe>");

				},
				error: function () {
					//	MessageBox.error("Cover Note Read Failed");
				}
			});
		},
		OnPressAttachments: function () {
			debugger;
			var oModel = this.getView().getModel();
			var PONo = this.getView().byId("objcmp").getTitle();
			var that = this;
			var Attachments = this.getView().byId("UploadCollection");
			var OUserId = this._UserID;
			var oText, oDocumentDate, day, month, year, Hours, Minutes, Seconds, final;
			var attachmentTitle = this.getView().byId("attachmentTitle");
			var filters = [];

			var oPOH = new sap.ui.model.Filter("PO_NO", "EQ", PONo);
			filters.push(oPOH);
			Attachments.setBusy(true);
		
			if (PONo !== "") {
				oModel.read("/POAttachmentsSet", {
					filters: filters,
					success: function (odata, oResponse) {
						var oModelData = new sap.ui.model.json.JSONModel();
						oModelData.setData(odata);
						Attachments.setModel(oModelData);
						Attachments.setBusy(false);

						if (Attachments.getItems().length > 0) {
							for (var i = 0; i < Attachments.getItems().length; i++) {
								if (Attachments.getItems()[i].getAttributes()[0].getTitle() !== OUserId) {
									Attachments.getItems()[i].setEnableDelete(false);
								}
								// Attachments.getItems()[i].getStatuses()[0].getText();
								oText = Attachments.getItems()[i].getStatuses()[0].getText().substring(0, 13);
								year = Attachments.getItems()[i].getStatuses()[0].getText().substring(13, 17);
								month = Attachments.getItems()[i].getStatuses()[0].getText().substring(17, 19);
								day = Attachments.getItems()[i].getStatuses()[0].getText().substring(19, 21);

								Hours = Attachments.getItems()[i].getStatuses()[0].getText().substring(21, 24);
								Minutes = Attachments.getItems()[i].getStatuses()[0].getText().substring(24, 26);
								Seconds = Attachments.getItems()[i].getStatuses()[0].getText().substring(26, 28);

								final = oText + day + "-" + month + "-" + year + " " + Hours + ":" + Minutes + ":" + Seconds;
								Attachments.getItems()[i].getStatuses()[0].setText(final);
							}
						}
							attachmentTitle.setText(that.getAttachmentTitleText());

					},
					error: function () {
						//	MessageBox.error("error");
					}
				});
			} else {
				Attachments.setModel(null);
				Attachments.setBusy(false);
			}
		},
		OnPressQueryHistory: function () {
			var oModel = this.getView().getModel();
			var PONo = this.getView().byId("objcmp").getTitle();
			var oTableHistory = this.getView().byId("tblQueryHistory");
			var filters = [];

			var oPOH = new sap.ui.model.Filter("PO_NO", "EQ", PONo);
			filters.push(oPOH);

			oModel.read("/POQueryHistorySet", {
				filters: filters,
				success: function (odata, oResponse) {

					var oModelData = new sap.ui.model.json.JSONModel();
					oModelData.setData(odata);
					oTableHistory.setModel(oModelData);

				},
				error: function () {
					//	MessageBox.error("error");
				}
			});

		},

		OnPressGeneralTab: function () {
			var oModel = this.getView().getModel();
			var PONo = this.getView().byId("objcmp").getTitle();

			var oApproveButton = this.getView().byId("btnApprove");
			var oApproveReject = this.getView().byId("btnReject");

			var txtPurOrdNo = this.getView().byId("PurOrdNo");
			var txtQueryID = this.getView().byId("idQuery");
			var txtPODesc = this.getView().byId("PurOrdDesc");
			var txtPurOrdInt = this.getView().byId("PurOrdInt");
			var txtPurOrdVendor = this.getView().byId("PurOrdVendor");
			var txtPurOrdDocType = this.getView().byId("PurDocType");
			var txtPurOrdDt = this.getView().byId("PurOrdDt");
			var txtPurOrdSts = this.getView().byId("PurOrdSts");

			var DocumentDate, day, month, year, final;

			oModel.read("/PurchaseOrderGeneralSet(PO_NO='" + PONo + "')", {
				success: function (odata, oResponse) {

					txtPurOrdNo.setText(oResponse.data.PO_NO);
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

					txtPurOrdSts.setText(oResponse.data.PO_Status);

				},

				error: function (e) {
					//	MessageBox.error("error");
				}

			});
		},

	});

});