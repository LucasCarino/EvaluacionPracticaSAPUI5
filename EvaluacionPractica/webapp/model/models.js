sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
        },
        createSuppliesModel: function () {
            let oData = [
                {
                    name: "Titanium"
                },
                {
                    name: "Ultrasonic United"
                },
                {
                    name: "Technocom"
                },
                {
                    name: "Speaker experts"
                }
            ]
            let oModel = new JSONModel(oData);
            oModel.setDefaultBindingMode("TwoWay");
            return oModel;
        },
        createSearchModel: function () {
            let oData = {
                country: "",
                supplier: "",
                date: ""
            }
            let oModel = new JSONModel(oData);
            oModel.setDefaultBindingMode("TwoWay");
            return oModel;
        },
        createDetailModel: function () {
            let oData = {
                product: "",
                supplier: "",
                dimensions: "",
                weight: "",
                price: ""
            }
            let oModel = new JSONModel(oData);
            oModel.setDefaultBindingMode("TwoWay");
            return oModel;
        }
	};
});