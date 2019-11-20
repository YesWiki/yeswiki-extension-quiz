function defer(method) 
    {if (window.jQuery) {  method(); } 
    else { setTimeout(function() 
        { defer(method) }, 50); }
    }; 
defer(function () {
    $("#bf_total").prop("readonly", true);
    $("#bf_reference").prop("readonly", true);

    $("#bf_nom").change(function(){
        compute_ref();
      }); 
    
      

    $("#listeListeJour1").change(function(){
        $("#bf_total").val(somme());
      }); 

    $("#bf_don_somme").prop("type", "number");

    $("#listeListeJour1").change(function(){
        $("#bf_total").val(somme());
      });    
    $("#listeListeJour2").change(function(){
        $("#bf_total").val(somme());
      });   
    $("#listeListeJour3").change(function(){
        $("#bf_total").val(somme());
      });
    $("#listeListeRepassoir1").change(function(){
        $("#bf_total").val(somme());
      });  
    $("#listeListeRepassoir2").change(function(){
        $("#bf_total").val(somme());
      });
    $("#listeListeNuitveille").change(function(){
        $("#bf_total").val(somme());
      });  
    $("#listeListeNuit1").change(function(){
        $("#bf_total").val(somme());
      }); 
    $("#listeListeNuit2").change(function(){
        $("#bf_total").val(somme());
      });    
    $("#listeListeDons").change(function(){
        $("#bf_total").val(somme());
      });               
    $("#bf_don_somme").keyup(function(){
        $("#bf_total").val(somme());
      }); 
    $("#bf_don_somme").change(function(){
        $("#bf_total").val(somme());
      });               

    });

function compute_ref() {    
    let reference;
    ref=guid();
    nom=$("#bf_nom").val();
    reference=nom+"-"+ref;
    $("#bf_reference").val(reference);
    }

function guid() {
    function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + '-' + s4();
      }

function somme() {
    let totaldon;
    //console.log("val",$("#bf_don_somme").val(),$.isNumeric($("#bf_don_somme").val()),
    $("#listeListeDons").children("option:selected").val(), ($("#listeListeDons").children("option:selected").val()=="autre")); 
    if(($("#listeListeDons").children("option:selected").val()) && $.isNumeric($("#listeListeDons").children("option:selected").val()))
        {
        totaldon = $("#listeListeDons").children("option:selected").val()
        }
    else if (($("#listeListeDons").children("option:selected").val()) && ($("#listeListeDons").children("option:selected").val()=="autre"))
        {
       
        totaldon = +($("#bf_don_somme").val() && $.isNumeric($("#bf_don_somme").val())?$("#bf_don_somme").val():0)    
        }
    else {
        totaldon=0
    }
    //console.log("DON",totaldon);
    total = +($("#listeListeJour1").children("option:selected").val()?$("#listeListeJour1").children("option:selected").val():0)
    + +($("#listeListeJour2").children("option:selected").val()?$("#listeListeJour2").children("option:selected").val():0)
    + +($("#listeListeJour3").children("option:selected").val()?$("#listeListeJour3").children("option:selected").val():0)
    + +($("#listeListeRepassoir1").children("option:selected").val()?$("#listeListeRepassoir1").children("option:selected").val():0)
    + +($("#listeListeRepassoir2").children("option:selected").val()?$("#listeListeRepassoir2").children("option:selected").val():0)
    + +($("#listeListeNuitveille").children("option:selected").val()?$("#listeListeNuitveille").children("option:selected").val():0)
    + +($("#listeListeNuit1").children("option:selected").val()?$("#listeListeNuit1").children("option:selected").val():0)
    + +($("#listeListeNuit2").children("option:selected").val()?$("#listeListeNuit2").children("option:selected").val():0)
    + +totaldon;

    j1=($("#listeListeJour1").children("option:selected").val()?$("#listeListeJour1").children("option:selected").val():0);
    j2=($("#listeListeJour2").children("option:selected").val()?$("#listeListeJour2").children("option:selected").val():0);
    j3=($("#listeListeJour3").children("option:selected").val()?$("#listeListeJour3").children("option:selected").val():0);
    // console.log('j1 => ',j1,'  j2 => ',j2,  '  j3 => ',j3, (j1==10 && j2==10 && j3==10), (j1==22 && j2==22 && j3==22))
    if (j1==10 && j2==10 && j3==10){
        total2 = +total -5;
        total = total2 + " (prime d'assidutité de 5 €)";
    }
    if (j1==22 && j2==22 && j3==22){
        total2 = +total -6;
        total = total2 + " (prime d'assidutité de 6 €)";
    }
        

    return total;
    }