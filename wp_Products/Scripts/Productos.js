/*re:function(){
puede recargar la tabla
tabla.ajax.reload();

	},*/
var table = null;
//Funcion para abrir el modal para registrar
$("#registrar").click(function () {
    $("#mod_product").modal();
});

$("#cerrar").click(function () {
    $("#nombre").parent().removeClass('has-error');
    $("#descripcion").parent().removeClass('has-error');
})

var producto = {     
    table_producto: function () {
        $(function () {
            table = $('#tablaList').DataTable({               
                
               order: [0, 'asc'],
                ajax: {
                    type: 'get',
                    url: '/api/Productos/',
                    dataSrc: "",
                    dataType: "json",                   
                },

                columnDefs: [                   
                    {
                        targets: [0],
                        visible:false
                       
                    },
                    {
                        targets: [4],
                        data:false,
                        width: "10%"
                    },
                    {
                        targets: [3],
                        width:"10%"
                    }
                ],
                columns: [
                    {
                        data: 'Identificador', name: 'Identificador', render: function (data) {
                            producto.cambiar_estado(data);
                        }
                    },
                    { data: 'Nombre', name: 'Nombre'},
                    { data: 'Descripcion', name: 'Descripcion'},
                    { data: 'Estado', name: 'Estado', render: function (data) {
                            if (data == 1) { 
                                return "<button id='estado' class='btn btn-success center-block' onclick='producto.cambiar_estado("+ data +")' >  <span class='glyphicon glyphicon-ok-circle'></span>  Activo</button>"

                            } else if (data == 2) {
                                return "<button id='estado'  class='btn btn-danger center-block' onclick='producto.cambiar_estado(" + data + ")' >  <span class='glyphicon glyphicon-ban-circle'></span>  Inactivo</button>"

                            }
                        }
                            
                    },
                   
                    { data: 'Identificador',orderable: false, searchable: false,render: function (data) {
                        return "<button id='editar'   class='btn btn-primary btn-sm'  onclick='producto.editar(" + data + ")' ><span class='glyphicon glyphicon-edit'></span></button>    <button id='eliminar' class='btn btn-danger btn-sm' onclick='producto.eliminar(" + data +")' ><span class='glyphicon glyphicon-trash'></span></button>"
                        }
                    },

                ],
                'language': traduccion
            });

        });
        var traduccion = {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    },
    //Funcion para agregar los datos de un producto a la DB
    add: function () {
        
            if ($("#nombre").val() == "") {
                new PNotify({ title: 'Noticia', text: "Campos vacios, por favor completa los campos faltantes", type: "error", delay: 2500 });
                $("#nombre").parent().removeClass('has-success').addClass('has-error');
                return false

            } else if ($("#descripcion").val() == "") {
                new PNotify({ title: 'Noticia', text: "Campos vacios, por favor completa los campos faltantes", type: "error", delay: 2500 });

                $("#descripcion").parent().removeClass('has-success').addClass('has-error');
                return false;
            }  else {
            $("#nombre").parent().removeClass('has-error');
            $("#descripcion").parent().removeClass('has-error');
            
        }
        var datos = {
            Nombre: $("#nombre").val(),
            Descripcion: $("#descripcion").val(),
            Estado:1,        
        }   
        
        $.ajax({
            type: "POST",
            url: "/api/Productos",
            data: datos,
            dataType: "json"
        }).success(function () {
            new PNotify({
                title: "Noticia", text: "Producto registrado con exito", type: "success", delay: 2500 });           
            $("#mod_product").modal("toggle");
            $("#nombre").val("");
            $("#descripcion").val('');
            table.ajax.reload();
        }).error(function () {
            new PNotify({
                title: "Noticia", text: "Error al registrar, intente de nuevo", type: "error",delay: 2500, });
        })


    },

    //Funcion para editar un producto por ID
      editar: function (d) {            
          //Se recibe en una variable el ID para editar
          var id = d;
          //Abrir modal
          $("#mod_edit").modal();

              $.ajax({
              type: 'GET',
              url: '/api/Productos/'+id,  
          }).success(function (data) {
              $("#edit_nombre").val(data.Nombre);             
              $("#edit_descrip").val(data.Descripcion);
              $("#btn_crear").val(data.Identificador);   
              if (data.Estado == 1) {
                  $("#edit_estado").append("<option value='1' selected>Activo</option>");
                  $("#edit_estado").append("<option value='2'>Inactivo</option>");
              } else if (data.Estado == 2) {
                  $("#edit_estado").append("<option value='1'>Activo</option>");
                  $("#edit_estado").append("<option value='2' selected>Inactivo</option>");
              }
                
              });         

    },

      actualizar: function () {

          if ($("#edit_nombre").val() == "") {
              new PNotify({ title: 'Noticia', text: "Campos vacios, por favor completa los campos faltantes", type: "error", delay: 2500 });
              $("#edit_nombre").parent().removeClass('has-success').addClass('has-error');
              return false

          } else if ($("#edit_descrip").val() == "") {
              new PNotify({ title: 'Noticia', text: "Campos vacios, por favor completa los campos faltantes", type: "error", delay: 2500 });
              $("#edit_descrip").parent().removeClass('has-success').addClass('has-error');
              return false;

          } else if ($("#edit_estado selected").val()==0) {
              new PNotify({ title: 'Noticia', text: "Campos vacios, por favor completa los campos faltantes", type: "error", delay: 2500 });
              $("#edit_estado").parent().removeClass('has-success').addClass('has-error');
              return false;

          } else {
              $("#edit_nombre").parent().removeClass('has-error');
              $("#edit_descrip").parent().removeClass('has-error');
              $("#edit_estado").parent().removeClass('has-error');
          }
          var p= {
              Nombre: $("#edit_nombre").val(),
              Descripcion: $("#edit_descrip").val(),
              Estado: $("#edit_estado").val(),
              Identificador: $("#btn_crear").val()             
          }          
          var id = $("#btn_crear").val()
          $.ajax({
              'url': '/api/Productos/' + id,
              'type': 'put',
              'dataType': 'json',
              'data': p
          }).success(function (data) {
              new PNotify({
                  title: "Noticia", text: "Producto actualizado con exito", type: "success", delay: 2500
              });
              table.ajax.reload();
              $("#mod_edit").modal("toggle");
              $("edit_nombre").val(""),
              $("#edit_descrip").val(""),
              $("#edit_estado option").remove();
              }).error(function (data) {
                  new PNotify({
                      title: "Noticia", text: "Error al actualizar el producto, intente de nuevo", type: "error", delay: 2500
                  });
          });


      },

     
   
      //Funcion para eliminar un producto
      eliminar: function (id) {
          var d = id;
          (new PNotify({
              title: 'Eliminar',
              text: '¿Desea eliminar esta producto?',
              icon: 'glyphicon glyphicon-question-sign',
              type: 'info',
              hide: false,
              confirm: {
                  confirm: true
              },
              buttons: {
                  closer: false,
                  sticker: false
              },
              history: {
                  history: false
              }
             
          })).get().on('pnotify.confirm', function () {                  
              $.ajax({
                  type: 'DELETE',
                  url: '/api/Productos/' + d,
                  dataType: 'json'

              }).done(function () {                     
                  new PNotify({
                      title: "Noticia", text: "Producto eliminado correctamente", type: "success", delay: 2500});
                  table.ajax.reload();
                    
                  });

          }).on('pnotify.cancel', function () {
              
          });



      },

     
}