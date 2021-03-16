sap.ui.define([
], function () {
    "use strict";
    return{
        MODELS: {
            modelSupplies: "modelSupplies",
            modelSearch: "modelSearch",
            modelDetail: "modelDetail",
            modelProducts: "modelProducts"
        },
        properties: {
            SEARCH_MODEL: {
               country: "/country",
               supplier: "/supplier",
               date: "/date",
            }
        },
        ids: {
            FRAGMENTS: {
                SearchResume: "SearchResume",
                DetailDialog: "DetailDialog",
                Table: "fragmentTable"
            },
            SearchTable: "searchTable",
            TableProducts: "tableProducts"
        },
        routes: {
            main: "Main",
            FRAGMENTS: {
                SearchResume: "EvaluacionPractica.EvaluacionPractica.fragments.SearchResume",
                DetailDialog: "EvaluacionPractica.EvaluacionPractica.fragments.DetailDialog"
            },
        },
        JSON: {
            Products: "Products.json"
        },
        filters: {
            product: "product",
            supplier: "supplier",
        }
    };
}, true);