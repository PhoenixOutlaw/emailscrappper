$(function () {
  $(".rcnt").hide();
  $("#load").hide();

  var $urls = $("#url1");
  $("#submit").on("click", function () {
    $("#load").show();
    $("#submit").hide();
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
          $("#urli").append(`<li>${d}</li>`);
        });
        data.e2.map((d) => {
          $("#nli").append(`<li>${d}</li>`);
        });
        data.success.map((d) => {
          $("#sli").append(`<li>${d}</li>`);
        });
      },
      error: function (data) {
        console.log(data);
      },
    });
  });
});
