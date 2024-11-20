sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("flightcdsdc.controller.View1", {
        onInit() {
        },
        onPress: function () {
            var oModel = this.getOwnerComponent().getModel();

            var context = oModel.sServiceUrl

            var url = context + '/zfetch_sflight_v'
            var that = this;
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: function (oData, response) {
                    if (response === 'success') {
                        var oModel = new JSONModel(oData);
                        var oArray = oModel['oData']['d']['results']
                        oArray.forEach(element => {
                            element['Order_Date'] = onDateChange(element['Order_Date'])
                            element['Flight_Date'] = onDateChange(element['Flight_Date'])
                        });
                        that.getView().setModel(oModel, "dc")
                    }
                }
            })

        },
        onRowSelect : function(oAction){
                var rowContextPath = oAction.getParameter("rowContext").sPath
                var path = `dc>${rowContextPath}`
                var oForm = this.getView().byId("sform")

                // console.log(oForm);
                oForm.bindElement(path)
        }
    });

    function onDateChange(element) {

        if (element === null  || element === undefined) {
            return "N/A"
        }
        else {
            let timestamp1 = parseInt(element.replace("/Date(", "").replace(")/", ""));

            let date1 = new Date(timestamp1);


            let formattedDate1 = date1.toLocaleDateString('en-GB', {
                weekday: 'short', // "Mon"
                day: '2-digit',   // "01"
                month: 'short',   // "Jan"
                year: 'numeric'   // "2003"
            });

            return formattedDate1

        }


    }

});