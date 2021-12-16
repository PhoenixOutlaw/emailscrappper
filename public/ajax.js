$(function() {


    var $urls=$("#url1");
    $("#submit").on("click",function() {
        console.log($urls.val())
        $.ajax({
            url:"/find",
            type:"POST",
            data:{
                url: $urls.val(),
            },
            success: function(data){
                console.log("hogaya")
            },          
    })
        
    })
})