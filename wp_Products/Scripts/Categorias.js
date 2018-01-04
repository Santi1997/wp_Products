var categoria = {

    //Funcion para cargar las categorias en el SELECTLIST
    cargar: function () {
        $.ajax({
            type: "GET",
            url: " /api/Categorias",
            datatype: "json"
        }).success(function (data) {
            data.forEach(function (datos, index) {           
                index++;
                $("#categoria").append("<option value='" + index + "' >"+datos.Nombre+"</option>");
            })
            });
        
    },




}