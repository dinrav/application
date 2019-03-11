sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/m/MessageToast'
], function (Controller, Dialog, Button, MessageToast) {
	"use strict";

	return Controller.extend("com.sap.build.standard.untitledPrototype.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.build.standard.untitledPrototype.view.Detail
		 */
		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_i18n: function(oText)
		{
			return this.getView().getModel("i18n").getResourceBundle().getText(oText);
		},
		_onModelSavePress: function(oEvent)
		{	
			var Saved=this._i18n("Saved");
			var SaveText=this._i18n("SaveText");
			var dialog = new Dialog({
				title: this._i18n("Saving"),
				type: 'Message',
				content: new Text({ text: SaveText }), 
				beginButton: new Button({
					text: this._i18n("Save"),
					press: function () { 
						dialog.close();
						MessageToast.show(Saved);
						var oView=this.getView();
						var oModel=oView.getModel();
						var ID=oView.byId("ID").getText();
						var newMin=oView.byId("ID").getValue("MIN");
						var newMax=oView.byId("ID").getValue("MAX");
						oModel.update(oModel.createKey("/MyDataSet", {"ID": ID}), {"Min": newMin}, {"Max": newMax});
						// this._oModelSave(oEvent);
					}
				}),
				endButton: new Button({
					text: this._i18n("Cancel"),
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		// _oModelSave: function(oEvent) {
		// 	var oView=this.getView();
		// 	var oModel=oView.getModel();
		// 	var ID=oView.byId("ID").getText();
		// 	var newMin=oView.byId("ID").getValue("MIN");
		// 	var newMax=oView.byId("ID").getValue("MAX");
		// 	oModel.update(oModel.createKey("/MyDataSet", {"ID": ID}), {"Min": newMin}, {"Max": newMax});
		// },
		_onModelRemovePress: function(oEvent)
		{
			var oView=this.getView();
			var oModel=oView.getModel();
			var ID=oView.byId("ID").getText();
			var Deleted=this._i18n("Deleted");
			var DeleteText=this._i18n("DeleteText");
			var dialog = new Dialog({
				title: this._i18n("Deleting"),
				type: 'Message',
				content: new Text({ text: DeleteText }),
				beginButton: new Button({
					text: this._i18n("Delete"),
					press: function () { 
						dialog.close();
						MessageToast.show(Deleted);
						oModel.remove(oModel.createKey("/MyDataSet", {"ID": ID}));
						// this._oModelRemove(oEvent);
					}
				}),
				endButton: new Button({
					text: this._i18n("Cancel"),
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		// _oModelRemove: function(oEvent) {
		// 	var oView=this.getView();
		// 	var oModel=oView.getModel();
		// 	var ID=oView.byId("ID").getText();
		// 	oModel.remove(oModel.createKey("/MyDataSet", {"ID": ID}));
		// },
		_onObjectMatched: function(oEvent)
		{
			var oView=this.getView();
			var oModel=oView.getModel();
			var oArgs=oEvent.getParameter("arguments");
			oModel.metadataLoaded().then(function(){
				oView.bindElement({
					path: oModel.createKey("/MyDataSet", {"ID": oArgs.objectID})
					// events
				});
			});
		},
		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.build.standard.untitledPrototype.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.build.standard.untitledPrototype.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.build.standard.untitledPrototype.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});