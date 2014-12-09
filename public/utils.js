var realcount;

function updateCount(){
	$.get( "https://foosie.herokuapp.com/count", function(data){
	  console.log(data["doc_count"]);
	  realcount = data["doc_count"];
	  $( "#counter" ).html(realcount);
	});
}

var socket = io('https://foosie.herokuapp.com');
  socket.on('news', function (data) {
    console.log(data);
    console.log(typeof data);

    var pressure = parseFloat(data);
    console.log(pressure);
 //    if (pressure>3 ) {
	//     $("#what").setActive();
	// }
	// else{
	// 	$("#what").addClass("heart");
	//     $("#what").removeClass("active");
	// };
    if (pressure>3 ) {
	    $("#what").addClass("active");
	    $("#what").removeClass("heart");
	    console.log("YO!");
	    updateCount();
	}else{
		$("#what").addClass("heart");
	    $("#what").removeClass("active");
	};

// }
  });

$(function() {
    // setTimeout() function will be fired after page is loaded
    // it will wait for 5 sec. and then will fire
    // $("#successMessage").hide() function
    setTimeout(function() {
        $("#instru").hide('blind', {}, 500)
    }, 5000);
});