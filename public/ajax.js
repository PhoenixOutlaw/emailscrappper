$(function () {
  $(".rcnt").hide();
  $("#load").hide();
  $(".success").hide();
  $(".failed").hide();

  var $urls = $("#url1");
  $("#submit").on("click", function () {
    if($urls.val()){
    $("#load").show();
    $("#submit").hide();
    console.log($urls.val())
      $.ajax({
        url: "/find",
        type: "POST",
        data: {
          url: $urls.val(),
        },
        success: function (data) {
          $(".fcnt").hide();
          $(".rcnt").show();
          $("#load").hide();
          $("#about p").hide();
          data.e1.map((d) => {
            $(".failed").show();
            $("#urli").append(`<li>${d}</li>`);
          });
          data.e2.map((d) => {
            $(".failed").show();
            $("#nli").append(`<li>${d}</li>`);
          });
          data.success.map((d) => {
            $(".success").show();
            $("#sli").append(`<li>${d}</li>`);
          });
          console.log(data.success);
        },
        error: function (data) {
          console.log(data);
        },
      });
    }
    else alert("Please Provide With Atleast 1 URL")
   
  });
});
