// var realcount;
var stress;

// function updateCount(){
// 	$.get( "https://foosie.herokuapp.com/count", function(data){
// 	  console.log(data["doc_count"]);
// 	  realcount = data["doc_count"];
// 	  $( "#counter" ).html(realcount);
// 	});
// }

var stressSocket = io('https://foosie.herokuapp.com/stress');
  stressSocket.on('connect', function(socket){
  	console.log('client has connected')
  });
  
  stressSocket.on('stress', function(data){
  	console.log(data);
  	$( "#stress" ).html(data);
  	//update stress in heart
  });

var clickSocket = io('https://foosie.herokuapp.com/click');
	clickSocket.on('connect', function(socket){
  	console.log('click client has connected')
  });

$('#heart1').click(
	clickSocket.emit('clicked', '1')
);


 //  socket.on('news', function (data) {
 //    console.log(data);
 //    console.log(typeof data);

 //    var pressure = parseFloat(data);
 //    console.log(pressure);
 // //    if (pressure>3 ) {
	// //     $("#what").setActive();
	// // }
	// // else{
	// // 	$("#what").addClass("heart");
	// //     $("#what").removeClass("active");
	// // };
 //    if (pressure>3 ) {
	//     $("#what").addClass("active");
	//     $("#what").removeClass("heart");
	//     console.log("YO!");
	//     sendsqueeze();
	// }else{
	// 	$("#what").addClass("heart");
	//     $("#what").removeClass("active");
	// };

// }

$(function() {
    // setTimeout() function will be fired after page is loaded
    // it will wait for 5 sec. and then will fire
    // $("#successMessage").hide() function
    setTimeout(function() {
        $("#instru").hide('blind', {}, 500)
    }, 5000);
});

