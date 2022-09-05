sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/ui/integration/library"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment,JSONModel,MessageToast,integrationLibrary) {
        "use strict";

        return Controller.extend("idmco2popoverdemo.controller.Main", {
            onInit: function () {

            },

            onAfterRendering: function (){
                setTimeout(()=> this.onOpenDialog(),500)
            },

            onOpenDialog : function () {

                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "idmco2popoverdemo.view.C02PopoverDialog"
                    });

                    //Load card configurations
                    let cardManifests = new JSONModel()
                    cardManifests.loadData(sap.ui.require.toUrl("idmco2popoverdemo/model/cardManifests.json"));
                    this.getView().setModel(cardManifests, "manifests");

                } 
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },
            
            onCloseDialog: function () {
                this.pDialog.then(function(oDialog) {
                    oDialog.close();
                });
            },

            onAction: function (oEvent) {
                //possibly used by cards
                if (oEvent.getParameter("type") === integrationLibrary.CardActionType.Navigation) {
                    MessageToast.show("URL: " + oEvent.getParameter("parameters").url);
                }
            },
    
        });
    });