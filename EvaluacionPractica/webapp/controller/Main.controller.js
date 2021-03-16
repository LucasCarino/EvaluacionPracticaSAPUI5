sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "EvaluacionPractica/EvaluacionPractica/model/models",
        "sap/ui/core/Fragment",
        "EvaluacionPractica/EvaluacionPractica/util/Common",
        "EvaluacionPractica/EvaluacionPractica/util/Constants",
        "EvaluacionPractica/EvaluacionPractica/util/Formatter",
        "EvaluacionPractica/EvaluacionPractica/util/Services",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/MessageBox",
	    "sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Model, Fragment, Common, Constants, Formatter, Services, Filter, FilterOperator, MessageBox, MessageToast) {
		"use strict";

		return Controller.extend("EvaluacionPractica.EvaluacionPractica.controller.Main", {
            Formatter: Formatter,
			onInit: function () {
                let oModelSupplies = Model.createSuppliesModel();
                this.getView().setModel(oModelSupplies, Constants.MODELS.modelSupplies);
                let oModelSearch = Model.createSearchModel();
                this.getView().setModel(oModelSearch, Constants.MODELS.modelSearch);
                let oModelDetail = Model.createDetailModel();
                this.getView().setModel(oModelDetail, Constants.MODELS.modelDetail);
            },
            loadModel: async function () {
                let oComponent = this.getOwnerComponent();
                let oResponse = await Services.getLocalJSON(Constants.JSON.Products);
                let oData = oResponse[0];
                var oProducts = new JSONModel();
                oProducts.setData(oData);
                oComponent.setModel(oProducts, Constants.MODELS.modelProducts);
            },
            onPressSearch: function () {
                let oBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle();
                let oModelSearch = this.getView().getModel(Constants.MODELS.modelSearch);
                let country = oModelSearch.getProperty(Constants.properties.SEARCH_MODEL.country);
                let supplier = oModelSearch.getProperty(Constants.properties.SEARCH_MODEL.supplier);
                let date = oModelSearch.getProperty(Constants.properties.SEARCH_MODEL.date);

                if(country != '' && supplier != '' && date != '') {
                    MessageBox.success(oBundle.getText('MessageBoxCountry') + country + oBundle.getText('MessageBoxSupplier') + supplier + oBundle.getText('MessageBoxDate') + date)
                    let fragmentTable = this.getView().createId(Constants.ids.FRAGMENTS.Table)
                    sap.ui.core.Fragment.byId(fragmentTable, Constants.ids.SearchTable).setVisible(true);
                    this.loadModel();
                } else {
                    MessageToast.show(oBundle.getText('MessageToastAlert'))
                }
            },
            onSearch: function(oEvent){
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0){
                    var oFilter = new Filter (Constants.filters.product, FilterOperator.Contains, sQuery);
                    aFilters.push(oFilter);
                    var oFilter = new Filter (Constants.filters.supplier, FilterOperator.Contains, sQuery);
                    aFilters.push(oFilter);
                    var oFilters = new Filter (aFilters);
                }
                let fragmentTable = this.getView().createId(Constants.ids.FRAGMENTS.Table)
                let oTable = sap.ui.core.Fragment.byId(fragmentTable, Constants.ids.TableProducts);
                var oBindingInfo = oTable.getBinding("items");
                oBindingInfo.filter(oFilters, "Application");
            },
            getDetail: function(oEvent) {
                var oItem = oEvent.getSource();
                var oBindingContext = oItem.getBindingContext(Constants.MODELS.modelProducts);
                var oModel = this.getView().getModel(Constants.MODELS.modelProducts);
                var oProductoSeleccionado = oModel.getProperty(oBindingContext.getPath());
                let oModelDetail = this.getView().getModel(Constants.MODELS.modelDetail);
                oModelDetail.setData(oProductoSeleccionado);
                const oView = this.getView();
                    if(!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: oView.getId(),
                        name: Constants.routes.FRAGMENTS.DetailDialog,
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    })
                }
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                })
            },
            closeDialog: function () {
                this.byId(Constants.ids.FRAGMENTS.DetailDialog).close();
            },
            changeLanguage: function (oEvent) {
                if (oEvent.getSource().getPressed()) {
				    sap.ui.getCore().getConfiguration().setLanguage("EN");
			    } else {
				    sap.ui.getCore().getConfiguration().setLanguage("ES");
			    }
            }
		});
	});