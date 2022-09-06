sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/ui/integration/library",
        "sap/m/BusyDialog"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel, MessageToast, integrationLibrary, BusyDialog) {
        "use strict";

        return Controller.extend("idmco2popoverdemo.controller.Main", {
            onInit: function () {

            },

            onAfterRendering: function () {
                setTimeout(() => this.onOpenDialog(), 500)
            },

            onOpenDialog: function () {
                //Open a busy dialog asap
                this.oBusyDialog = this.oBusyDialog ? this.oBusyDialog : new BusyDialog();
                this.oBusyDialog.open()

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

                //set oModelCO2popover for mockdata
                //TODO this would be read from Backend for single entity
                let oModelCO2popover = new JSONModel()
                oModelCO2popover.loadData(sap.ui.require.toUrl("idmco2popoverdemo/model/mockdata.json"));
                this.getView().setModel(oModelCO2popover, "co2popover");

                this.pDialog.then(oDialog => {
                    oDialog.open();
                    this.oBusyDialog.close();
                });
            },

            onCloseDialog: function () {
                this.pDialog.then(function (oDialog) {
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