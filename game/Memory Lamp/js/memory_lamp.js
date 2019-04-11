resize_iframe();
var date = new Date();
var color_arr = new Array();
color_arr[0] = '#af81f5';
color_arr[1] = '#af81f5';
color_arr[2] = '#a9d457';
color_arr[3] = '#7d00bb';
color_arr[4] = '#c7546e';
color_arr[5] = '#de6d00';
var level = 1;
var score = 0;
var div_anim = false;
var cur_time = 120;
var timer_interval;
var stor_interval = new Array();
var div_anim_arr = {};
var show_i = 1;
var click_i = 1;
var clack_flag = false;
function show_lamps()
{ 
	if(show_i<level+2)
	{
		var el = $('[data-id="'+show_i+'"]>div');
		el.css('background-image', 'url(../../img/yellow_lamp.png');
		setTimeout(function()
		{
			el.css('background-image', 'url(../../img/white_lamp.png');
		},500);
		setTimeout(function()
		{
			el.css('background-image', 'url(../../img/white_lamp.png');
			show_i++;
			show_lamps();
		},700);		
	}
	else
	{
		show_i = 1;
		clack_flag = true;
	}
}
function hide_lamps()
{
	var freqSecs = 0.01;
	var angle_div = 0;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var elem = $('.memory_lamp_table');
	function blink() {
	if(angle_div<(50+elem.parent().width()/2+elem.width()/2))
	{
		angle_div += 40;
		if(right && angle_div<20 && angle_div>-20)
		{
			clearInterval(interval);
			show_lamps();
		}
	}
	else 
	{
		if(!right)
		{
			angle_div = -1*angle_div;
			elem.css('transform', 'translateX('+angle_div+'px)');
			right = true;
			create_table();
		}
	}
	elem.css('transform', 'translateX('+angle_div+'px)');
	}	
}

var sec = function()
{
	var res = cur_time;
	if(cur_time>59)
	{
		res = cur_time-(60*Math.floor(cur_time/60));
	}
	if(res<10)
	{
		return '0'+res;
	}
	else
	{
		return res;
	}	
}
var timer_shulte = function()
{
	timer_interval = setInterval(function()
	{
		cur_time--;
		$('.param_time').html(Math.floor(cur_time/60)+':'+sec());
		if(!cur_time)
		{
			clearInterval(timer_interval);
			return_res();
		}
	},1000);	
}
function prestart()
{
	create_table();
	resize_iframe();
	$('.cover_scene').show();
	$('.cover_scene_int').show();
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');

	var prestart_int = 3;
	var prestart_func = setInterval(function()
	{
		prestart_int--;
		if(!prestart_int)
		{
			clearInterval(prestart_func);
			$('.cover_scene').hide();
			$('.cover_scene_int').hide();
			timer_shulte();
			show_lamps();
		}
		$('.cover_scene_int').html(prestart_int);
	},1000);
}
$('#begin').click(function()
{
	$('.game_menu').hide();
	$('.game_scene').show();

	prestart();

});
$('#resultclose').click(function()
{
	$('#resultswindow').hide();
	$('.game_scene').show();
	prestart();

});
$(parent.document).keydown(function(eventObject){
  if(eventObject.which == 32)
  {
		if($('.game_menu').is(":visible"))
		{
			$('.game_menu').hide();
			$('.game_scene').show();
			prestart();
		}
  }
});
$(document).keydown(function(eventObject){
  if(eventObject.which == 32)
  {
		if($('.game_menu').is(":visible"))
		{
			$('.game_menu').hide();
			$('.game_scene').show();
			prestart();
		}
  }
});
var memory_lamp_table = $('.memory_lamp_table>tbody');

var size = 3;
var number_min = 1;
var number_max = Math.pow(size,2);	
var class_div = 'memory_lamp_div1';
var tr_table = 1;

function create_table()
{
	for(var si=0; si<stor_interval.length;si++)
	{
		clearInterval(stor_interval[si]);
		delete  stor_interval[si];
	}
	$('.param_level').html(level);
	$('.param_score').html(score);
	memory_lamp_table.html('');
	var cells_count;

	switch(level)
	{
		case 4:
			size = 3;
		break;
		case 5:
			size = 4;
		break;
		case 9:
			size = 4;
		break;
		case 10:
			size = 5;
		break;
	}

	cells_count = Math.pow(size,2);	
	var cells_obj = {};
	
	for(var i=number_min; i<number_max+1; i++)
	{
		cells_obj[i] = i;
	}
	var color_table = color_arr[Math.floor(Math.random()*6)];
	memory_lamp_table.css('background-color', color_table);
	for(var i = 1; i<size+tr_table; i++)
	{
		memory_lamp_table.append('<tr></tr>');
		for(var x = 1; x<size+1; x++)
		{
			var numbers = Object.keys(cells_obj);
			var cur_number = numbers[Math.floor(Math.random() * (numbers.length))];
			
			$('.memory_lamp_table>tbody>tr').filter( ':last' ).append('<td data-id="'
				+cells_obj[cur_number]+
				'" class="enable big"><div class="memory_lamp_div '
				+class_div+'" data-id="'
				+cells_obj[cur_number]+
				'" style="background-color:'
				+color_table+';">'
				+'</div></td>');				
			delete  cells_obj[cur_number];	
		}
	}
	cur_number_finde_i = Math.floor(Math.random() * ($('.memory_lamp_div').length));


	memory_lamp_table_cells = $('.memory_lamp_table td.big div');
	memory_lamp_table_cells.click(function()
	{
		if(clack_flag)
		{
			if(Number($(this).attr('data-id')) == click_i)
			{

				score += level*10;
				$('.param_level').html(level);
				$('.param_score').html(score);

				$(this).css('background-image', 'url(../../img/yellow_lamp.png');
				click_i++;
			}
			else
			{
				if(level>1)
				{
					score -= level*100;
					level--;
				}
				$('.param_level').html(level);
				$('.param_score').html(score);
				
				$(this).css('background-image', 'url(../../img/red_lamp.png');
				click_i = 1;
				clack_flag = false;
				setTimeout(function()
				{
					hide_lamps();
				},500);	
			}
			if(click_i-2 == level)
			{
				score += level*100;
				$('.param_level').html(level);
				$('.param_score').html(score);
				level++;
				click_i = 1;
				clack_flag = false;
				$('.param_level').html(level);
				$('.param_score').html(score);

				setTimeout(function()
				{
					hide_lamps();
				},200);	
			}
			
			console.log(level+" "+click_i);			
		}

	});
	resize_iframe();
}

function return_res()
{
	clearInterval(timer_interval);
	if(!cur_time)
	{
		cur_time =120;
	}
	else
	{
		cur_time = 120-cur_time;
	}
	if(Number(localStorage.getItem("stats_memory_lamp_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		//localStorage.setItem("stats_memory_lamp_time"+date.getDate()+"/"+date.getMonth(), cur_time);
		localStorage.setItem("stats_memory_lamp_level"+date.getDate()+"/"+date.getMonth(), level);
		localStorage.setItem("stats_memory_lamp_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_memory_lamp_best_score"))<score)
	{
		//localStorage.setItem("stats_memory_lamp_best_time", cur_time);
		localStorage.setItem("stats_memory_lamp_best_level", level);
		localStorage.setItem("stats_memory_lamp_best_score", score);		
	}

	parent.window.save_result("memory_lamp", score);

	$('#results_level td:nth-child(1)').html(parent.window._t('Level:'));
	$('#results_level td:nth-child(2)').html(level);

	$('#results_score td:nth-child(1)').html(parent.window._t('Score:'));
	$('#results_score td:nth-child(2)').html(score);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =120;
	level = 1;
	score = 0;
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});