// var realcount;
var stress;
var w = window.innerWidth;
var h = window.innerHeight;
function utsConverter(jsdate){
	return Math.round(jsdate.getTime() / 1000);
}
function jtsConverter(uxdate){
	return new Date(uxdate*1000);
}
var areaChartData = [
  // The first layer
  {
    label: "Stress level",
    values: []
  },
];

// function updateCount(){
// 	$.get( "https://foosie.herokuapp.com/count", function(data){
// 	  console.log(data["doc_count"]);
// 	  realcount = data["doc_count"];
// 	  $( "#counter" ).html(realcount);
// 	});
// }
// var stressSocket = io('http://localhost:3000/stress');
var stressSocket = io('https://foosie.herokuapp.com/stress');
  stressSocket.on('connect', function(socket){
  	console.log('client has connected')
  });
  
  stressSocket.on('stress', function(data){
  	console.log(data);
  	$( "#stress" ).html(data);
  	stress = data;
  	//update stress in heart
  });
var clickSocket = io('http://foosie.herokuapp.com/destress');
// var clickSocket = io('http://localhost:3000/destress');
	clickSocket.on('connect', function(socket){
  	console.log('destress client has connected');
  });

$('#heart').click(function(){
		console.log("destressed");
		clickSocket.emit('destressed', '1');

		});

if(stress == 1000){
	$('#heart').html("brokenheart.gif");
}

// valuesarray = [];

// valuesarray.push(
// 	);

//Update realtime chart
chart = $('#areaChart').epoch({
  type: 'time.area',
  data: areaChartData,
 // pixelRatio: 1
});

setInterval(function(){
	console.log(utsConverter(new Date()));
	chart.push([{
			time: utsConverter(new Date()), 
			y: parseInt(stress)
		}]);
	console.log("Pushed data!");
}, 1000);
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

