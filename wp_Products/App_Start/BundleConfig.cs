using System.Web;
using System.Web.Optimization;

namespace wb_Productos
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                       ));

            bundles.Add(new ScriptBundle("~/bundles/pnotify").Include(
 "~/Scripts/pnotify.min.js"
                      ));


            bundles.Add(new ScriptBundle("~/bundles/jq").Include(
                 "~/Scripts/jquery.js"
                     ));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información sobre los formularios. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/Categorias.js",
                      "~/Scripts/Productos.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                   
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/boot").Include(
           "~/Content/bootstrap.css",
           "~/Content/datatable.bootstrap.min.css"
              ));


            bundles.Add(new StyleBundle("~/Content/pnotify").Include(
           "~/Content/pnotify.custom.min.css"          
              ));

            bundles.Add(new ScriptBundle("~/bundles/datascript").Include(
                
                     "~/Scripts/jquery.datatable.min.js",
                      "~/Scripts/datatable.bootstrap.min.js"
                      ));
        }
    }
}
