webiopi().ready( function()
{	// Initialize
} );

var R_duty_array = {"-4":"080","-3":"070", "-2":"060", "-1":"050","0":"000", "1":"050", "2":"060","3":"070", "4":"080"};
var L_duty_array = {"-4":"080","-3":"070", "-2":"060", "-1":"050","0":"000", "1":"050", "2":"060","3":"070", "4":"080"};
var V_array = {"-7":"170","-6":"160","-5":"150","-4":"140","-3":"130","-2":"120","-1":"110","0":"100","1":"090","2":"080","3":"070","4":"060","5":"050","6":"040"};
var H_array = {"-8":"170","-7":"160","-6":"150","-5":"140","-4":"130","-3":"120","-2":"110","-1":"100","0":"090","1":"080","2":"070","3":"060","4":"050","5":"040","6":"030","7":"020","8":"010"};

function Motor(direction, L_Level, R_Level)
{
	var arg = String(direction) + String(L_Level) + String(R_Level) + ";";
	console.log(arg);
	//alert(arg);
	webiopi().callMacro( "serial_send", arg);
}

function V_Tilt(s_direction, V_tilt)
{	// Change drive mode. 0 : Stop, 1 : Forward, 2 : Backward, 3 : CW, 4 : CCW
	//alert('V_Tilt ==> ' + String(VT));
	var arg = String(s_direction) + String(V_tilt) + ";";
	console.log(arg);
	//alert(arg);
	webiopi().callMacro( "serial_send", arg);
}

function H_Tilt(s_direction, H_tilt)
{	// Change drive mode. 0 : Stop, 1 : Forward, 2 : Backward, 3 : CW, 4 : CCW
	var arg = String(s_direction) + String(H_tilt) + ";";
	console.log(arg);
	//alert(arg);
	webiopi().callMacro( "serial_send", arg);
}

function light_LED(light_status)
{	// Change drive mode. 0 : Stop, 1 : Forward, 2 : Backward, 3 : CW, 4 : CCW
	var arg = "X" + String(light_status) + ";";
	console.log(arg);
	//alert(arg);
	webiopi().callMacro( "serial_send", arg);
}

function range_finder()
{	// Change drive mode. 0 : Stop, 1 : Forward, 2 : Backward, 3 : CW, 4 : CCW
	console.log("range_finder");
	//alert("range_finder");
  webiopi().callMacro("serial_send","S000000;")
	webiopi().callMacro("range_finder");
}

function shoot()
{ 
  console.log("shoot");
  webiopi().callMacro("shoot");
}

function room_lon()
{ 
  console.log("room_lon");
  webiopi().callMacro("room_lon");
}

function room_loff()
{ 
  console.log("room_loff");
  webiopi().callMacro("room_loff");
}


window.onload = function(){
	document.getElementById("L-Morter").textContent = 0;
	document.getElementById("R-Morter").textContent = 0;
	document.getElementById("V-Tilt").textContent = 0;
	document.getElementById("H-Tilt").textContent = 0;
}

$(document).ready(function () {
	$("#button_F").on('click', function () {
		l=document.getElementById("L-Morter").textContent;
		r=document.getElementById("R-Morter").textContent;
		if(r!=l){
			i=0;
			}else{
				i=r;
			}
		i++;
		if (i > 3){
			i=4;
			}else {
			}
		L_level = document.getElementById("L-Morter").textContent = i;
		R_level = document.getElementById("R-Morter").textContent = i;
		if(i>0){
			direction ="F"
		}else {
			direction ="B"
		}
		Motor(direction, L_duty_array[L_level], R_duty_array[R_level]);
		return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 38)  // Key[↑]
 	{
		$("#button_F").trigger("click");
	}
});

$("#button_LL").on('click', function () {
	L_level = document.getElementById("L-Morter").textContent = -1;
	R_level = document.getElementById("R-Morter").textContent = 1;
	direction ="L"
	Motor(direction, L_duty_array[L_level], R_duty_array[R_level]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 90)  // Key[Z]
 	{
		$("#button_LL").trigger("click");
	}
});

$("#button_L").on('click', function () {
	i=document.getElementById("L-Morter").textContent;
	i--;
	if (i < 0){
		i=0;
	}else {
	}
	L_level = document.getElementById("L-Morter").textContent = i;
	R_level = document.getElementById("R-Morter").textContent;

	direction ="F"
	Motor(direction, L_duty_array[L_level], R_duty_array[R_level]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 37)  // Key[←]
 	{
		$("#button_L").trigger("click");
}});

$("#button_STOP").on('click', function () {
	L_level = document.getElementById("L-Morter").textContent = 0;
	R_level = document.getElementById("R-Morter").textContent = 0;
	direction ="K"
	Motor(direction, L_duty_array[L_level], R_duty_array[R_level]);
	i=0
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 32)  // Key[Space]
	{
 		$("#button_STOP").trigger("click");
	}
});

$("#button_R").on('click', function () {
	i=document.getElementById("R-Morter").textContent;
	i--;
	if (i < 0){
		i=0;
	}else {
	}
	L_level = document.getElementById("L-Morter").textContent;
	R_level = document.getElementById("R-Morter").textContent = i;
	direction ="F"
	Motor(direction, L_duty_array[L_level], R_duty_array[R_level]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 39)  // Key[→]
	{
		$("#button_R").trigger("click");
	}
});

$("#button_RR").on('click', function () {
	L_level = document.getElementById("L-Morter").textContent = 1;
	R_level = document.getElementById("R-Morter").textContent = -1;
	direction ="R"
	Motor(direction, L_duty_array[L_level], R_duty_array[R_level]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 88)  // Key[X]
	{
		$("#button_RR").trigger("click");
	}
});

$("#button_B").on('click', function () {
	l=document.getElementById("L-Morter").textContent;
	r=document.getElementById("R-Morter").textContent;
	if(r!=l){
		i=-1;
		}else{
			i=r;
		}
	i--;
	if (i < -3){
		i=-4;
		}else {
		}
	L_level = document.getElementById("L-Morter").textContent = i;
	R_level = document.getElementById("R-Morter").textContent = i;
	if(i>0){
		direction ="F"
	}else {
		direction ="B"
	}

	Motor(direction, L_duty_array[L_level], R_duty_array[R_level]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 40)  // Key[↓]
	{
		$("#button_B").trigger("click");
	}
});

//camera tilt
$("#button_CUP").on('click', function () {
	var v;
	v = document.getElementById("V-Tilt").textContent;
	if (v < 6){
		v++;
		}else {
			}
	vtilt = document.getElementById("V-Tilt").textContent = v;
	s_direction ="V"
	V_Tilt(s_direction, V_array[vtilt]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 187)  // Key[+]
 	{
		$("#button_CUP").trigger("click");
	}
});

$("#button_CDOWN").on('click', function () {
	var v;
	v = document.getElementById("V-Tilt").textContent;
	if (v > -7){
		v--;
		}else {
		}
	vtilt = document.getElementById("V-Tilt").textContent = v;
	s_direction ="V"
	V_Tilt(s_direction, V_array[vtilt]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 189)  // Key[+]
	{
		$("#button_CDOWN").trigger("click");
	}
});

$("#button_CR").on('click', function () {
	var h;
	h = document.getElementById("H-Tilt").textContent;
	if (h < 8){
		h++;
		}else {
			}
	htilt = document.getElementById("H-Tilt").textContent = h;
	s_direction ="H"
	H_Tilt(s_direction, H_array[htilt]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 190)  // Key[>]
	{
		$("#button_CR").trigger("click");
	}
});


$("#button_CL").on('click', function () {
	var h;
	h = document.getElementById("H-Tilt").textContent;
	if (h > -8){
		h--;
		}else {
		}
	htilt = document.getElementById("H-Tilt").textContent = h;
	s_direction ="H";
	H_Tilt(s_direction, H_array[htilt]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 188)  // Key[>]
	{
		$("#button_CL").trigger("click");
	}
});

$("#button_CENTER").on('click', function () {
	vtilt = document.getElementById("V-Tilt").textContent = 0;
	htilt = document.getElementById("H-Tilt").textContent = 0;
	s_direction ="V";
	V_Tilt(s_direction, V_array[vtilt]);
	s_direction ="H";
	H_Tilt(s_direction, H_array[htilt]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 83)  // Key[s]
	{
		$("#button_CENTER").trigger("click");
	}
});

$("#button_CRR").on('click', function () {
	htilt = document.getElementById("H-Tilt").textContent = 8;
	s_direction ="H"
	H_Tilt(s_direction, H_array[htilt]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 191)  // Key[/]
	{
		$("#button_CRR").trigger("click");
	}
});

$("#button_CLL").on('click', function () {
	htilt = document.getElementById("H-Tilt").textContent = -8;
	s_direction ="H"
	H_Tilt(s_direction, H_array[htilt]);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 77)  // Key[m]
 	{
		$("#button_CLL").trigger("click");
	}
});

$("#light_on").on('click', function () {
	flag = '1'
	light_LED(flag);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 49)  // Key[m]
 	{
		$("#light_on").trigger("click");
	}
});

$("#light_off").on('click', function () {
	flag = '0'
	light_LED(flag);
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 50)  // Key[m]
 	{
		$("#light_off").trigger("click");
	}
});

$("#button_RF").on('click', function () {
  //alert('send');
	range_finder();
	return;
});

$(window).keydown(function(e){
	var key = e.which;
	if(key == 81)  // Key[m]
 	{
		$("#button_RF").trigger("click");
	}
});


$("#button_CAM").on('click', function () {
  shoot();
  return;
});

$(window).keydown(function(e){
  var key = e.which;
  if(key == 87)  // Key[w]
  {
    $("#button_CAM").trigger("click");
  }
});

$("#room_lon").on('click', function () {
  room_lon();
  return;
});

$(window).keydown(function(e){
  var key = e.which;
  if(key == 79)  // Key[o]
  {
    $("#room_lon").trigger("click");
  }
});

$("#room_loff").on('click', function () {
  room_loff();
  return;
});

$(window).keydown(function(e){
  var key = e.which;
  if(key == 80)  // Key[p]
  {
    $("#room_loff").trigger("click");
  }
});

})
