var comparison_zone;
var overview_zone;

function toggleZone(object,mode)
{
  var t_map = {};
  if (mode)
  {
    t_map[object.id] = tableau.ZoneVisibilityType.Show;
  }
  else{
    t_map[object.id] = tableau.ZoneVisibilityType.Hide;
  }
  tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(t_map).then(() => {
        console.log("Done");
      })
}


function my_init()
{
  $(document).ready(function () {
    tableau.extensions.initializeAsync().then(function () {
      const dashboard = tableau.extensions.dashboardContent.dashboard;

      dashboard.objects.forEach(function(object){
        if(object.name=="Comparison Filters") { comparison_zone=object; }
        else if(object.name=="Overview Filters") { overview_zone=object; }
        else if(object.name=="Extension")
        {
          toggleZone(object,false);
        }
      });

      dashboard.findParameterAsync("Sheet Mode").then(function(param){
        param.addEventListener(tableau.TableauEventType.ParameterChanged,function(eventChanged){
          eventChanged.getParameterAsync().then(function(result){
            var ob_map = {};
            if(result.currentValue.value=="Overview"){
              toggleZone(comparison_zone,false);
              toggleZone(overview_zone,true);
            }
            else{
              toggleZone(overview_zone,false);
              toggleZone(comparison_zone,true);
            }
          });
        });
      }); //Parameter Stuff Ends

    });
    }, function (err) {
      // Something went wrong in initialization.
      console.log('Error while Initializing: ' + err.toString());
    });
}

my_init();
