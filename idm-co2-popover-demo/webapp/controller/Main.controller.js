sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
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
                } 
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },
            
            onCloseDialog: function () {
                this.pDialog.then(function(oDialog) {
                    oDialog.close();
                });
            }
        });
    });