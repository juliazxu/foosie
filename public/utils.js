// var realcount;
var stress;
var w = window.innerWidth;
var h = window.innerHeight;
var time1 = Date.now();

// function updateCount(){
// 	$.get( "https://foosie.herokuapp.com/count", function(data){
// 	  console.log(data["doc_count"]);
// 	  realcount = data["doc_count"];
// 	  $( "#counter" ).html(realcount);
// 	});
// }
var stressSocket = io('http://foosie.herokuapp.com/stress');
// var stressSocket = io('https://foosie.herokuapp.com/stress');
  stressSocket.on('connect', function(socket){
  	console.log('client has connected')
  });
  
  stressSocket.on('stress', function(data){
  	console.log(data);
  	$( "#stress" ).html(data);
  	//update stress in heart
  });

var clickSocket = io('http://foosie.herokuapp.com/click');
	clickSocket.on('connect', function(socket){
  	console.log('click client has connected');
  });

$('#heart').click(function(){
		console.log("clicked");
		clickSocket.emit('clicked', '1');
		});

if(stress = 1000){
	('#heart').html(brokenheart.gif);
}

$('#areaChartData').epoch({
  type: 'time.line',
  data: stress,
  pixelRatio: 1
})

var areaChartData = [
  // The first layer
  {
    label: "Stress level",
    values: [ {time: time1, y: stress} ]
  },
];

areaChartData.push(nextDataPoint);

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

