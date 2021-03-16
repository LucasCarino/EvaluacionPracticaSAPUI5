jQuery.sap.require("sap.ui.core.format.DateFormat");
sap.ui.define([ 
    "EvaluacionPractica/EvaluacionPractica/util/Constants"
], function (Constants) {
    "use strict";
    return{
        formatDate: function (sDate) {
            if (!sDate) {
                return;
            }
            var date = new Date(sDate);
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: Constants.formatterDate.DATE
            });
            return dateFormat.format(date);
        },
        formatPrice: function (sPrice) {
            let priceEUR = parseInt(sPrice) / 160
            return Math.round(priceEUR)
        },
        formatWeight: function(sWeight) {
            let weight = parseInt(sWeight);
            if(weight < 1) {
                return 'Success';
            } else  if (weight < 2) {
                return 'Warning'
            } else {
                return 'Error'
            }
        }
    }
}, true);