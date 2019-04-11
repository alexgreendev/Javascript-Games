resize_iframe();
var date = new Date();
var color_arr = new Array();
color_arr[0] = '#af81f5';
color_arr[1] = '#ffc600';
color_arr[2] = '#a9d457';
color_arr[3] = '#7d00bb';
color_arr[4] = '#c7546e';
color_arr[5] = '#ff7d00';
var level = 1;
var raund = 1;
var score = 0;
var cur_time = 120;
var timer_interval;
var stor_interval = new Array();
var div_anim_arr = {};
var start = false;
var click_i = 1;
var clack_flag = false;
var size = 3;
var figur_ar = new Array();
figur_ar[0] = "◆";
figur_ar[1] = "▲";
figur_ar[2] = "●";
figur_ar[3] = "◕";
figur_ar[4] = "◭";
figur_ar[5] = "◩";
figur_ar[6] = "◗";
figur_ar[7] = "◓";
figur_ar[8] = "◒";
figur_ar[9] = "▧";

function click_cel(el, palec)
{
	var freqSecs = 0.01;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var angle_cel = 0;

	function blink() 
	{
		if(angle_cel != 180)
		{
			angle_cel += 5;
			if(angle_cel > 90)
			{
				
				if(palec)
				{
					el.css('background-image', 'url(../../img/palec_up.png');
					el.css('height', el.height());
					el.css('width', el.width());
					el.html('');
				}
				else
				{
					el.css('background-image', 'url(../../img/palec_down.png');
					el.css('height', el.height());
					el.css('width', el.width());
					el.html('');
				}
				
			}	
		}
		else
		{
			clearInterval(interval);			
		}

		el.css('transform', 'rotate3d(0, -1, 0,'+angle_cel+'deg)');
	}	
}
function hide_lamps()
{
	var freqSecs = 0.01;
	var angle_t = 0;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var elem = $('.find_unique_table');

	function blink() {
	if(angle_t<(50+elem.parent().width()/2+elem.width()/2))
	{
		angle_t += 40;
		if(right && angle_t<20 && angle_t>-20)
		{
			clearInterval(interval);
		}
	}
	else 
	{
		if(!right)
		{
			angle_t = -1*angle_t;
			elem.css('transform', 'translateX('+angle_t+'px)');
			right = true;
			create_table();
			$('.find_unique_table>tbody').css('transform', 'rotate(0deg)');
		}
	}
	elem.css('transform', 'translateX('+angle_t+'px)');
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
	start = true;
	timer_interval = setInterval(function()
	{
		cur_time--;
		$('.param_time').html(Math.floor(cur_time/60)+':'+sec());
		if(!cur_time)
		{
			clearInterval(timer_interval);
			start = false;
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
	$('.cover_scene_int').html(prestart_int);
	var prestart_func = setInterval(function()
	{
		prestart_int--;
		if(!prestart_int)
		{
			clearInterval(prestart_func);
			
			$('.cover_scene').hide();
			$('.cover_scene_int').hide();
			timer_shulte();
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
		if($('#resultswindow').is(":visible"))
		{
			$('#resultswindow').hide();
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
		if($('#resultswindow').is(":visible"))
		{
			$('#resultswindow').hide();
			$('.game_scene').show();
			prestart();
		}
  }
});
var find_unique_table = $('.find_unique_table>tbody');


	
var class_div = 'find_unique_div1';
var tr_table = 1;

function create_table()
{
	click_i = 1;
	$('.find_unique_com').html(parent.window._t('Find the unique element and click on it with the left mouse button.'));
	clack_flag = false;
	for(var si=0; si<stor_interval.length;si++)
	{
		clearInterval(stor_interval[si]);
		delete  stor_interval[si];
	}
	
	$('.param_score').html(score);
	find_unique_table.html('');
	var cells_count;



	if(Math.ceil(Math.pow(size,2)/2) < raund)
	{
		size++;
		level++;
	}
	else
	{
		if(Math.ceil(Math.pow(size,2)/3) > raund && size>3)
		{
			size--;
			level--;
		}		
	}
	$('.param_level').html(level);
	var number_min = 1;
	var number_max = Math.pow(size,2);
	cells_count = Math.pow(size,2);	
	var cells_obj = {};
	switch(size)
	{
		case 3:
		class_div = "find_unique_div1";
		break;
		case 4:
		class_div = "find_unique_div1";
		break;
		case 5:
		class_div = "find_unique_div2";
		break;
		case 11:
		class_div = "find_unique_div2";
		break;
		case 12:
		class_div = "find_unique_div3";
		break;
		case 15:
		class_div = "find_unique_div3";
		break;
		case 16:
		class_div = "find_unique_div4";
		break;
	}
	for(var i=number_min; i<number_max+1; i++)
	{
		cells_obj[i] = i;
	}

	for(var i = 1; i<size+tr_table; i++)
	{
		find_unique_table.append('<tr></tr>');
		for(var x = 1; x<size+1; x++)
		{
			var numbers = Object.keys(cells_obj);
			var cur_number = numbers[Math.floor(Math.random() * (numbers.length))];
			$('.find_unique_table>tbody>tr').filter( ':last' ).append('<td data-id="'
				+cells_obj[cur_number]+
				'" class="enable big"><div class="find_unique_div '
				+class_div+'" data-id="'
				+cells_obj[cur_number]+'">'
				+'</div></td>');	
			
			delete  cells_obj[cur_number];	
		}
	}
	var figur_int = 0;
	var figur_count = 1;
	var color_obj = {};
	for(var i=0; i<color_arr.length; i++)
	{
		color_obj[i] = color_arr[i];
	}
	var figur_color = Math.floor(Math.random()*6);
	for(var i=1; i<$('.find_unique_div').length+1; i++)
	{
		$('[data-id="'+i+'"]>div').html(figur_ar[figur_int]);
		$('[data-id="'+i+'"]>div').css('color', color_obj[figur_color]);
		$('[data-id="'+i+'"]>div').attr('figur_int', figur_int);

		if(figur_count == size)
		{
			if(figur_int < 9)
			{
				figur_int++;
			}
			else
			{
				figur_int = 0;
			}
			
			figur_count = 1;
			delete  color_obj[figur_color];
			if(Object.keys(color_obj).length < 1)
			{
				color_obj = {};
				for(var c=0; c<color_arr.length; c++)
				{
					color_obj[c] = color_arr[c];
				}				
			}
			else
			{
				var color_obj_hold = {};
				var index_color = 0;
				for(key in color_obj)
				{
					color_obj_hold[index_color] = color_obj[key];
					index_color++;
				}	
				color_obj = color_obj_hold;	
			}
			figur_color = Math.floor(Math.random()*Object.keys(color_obj).length);
		}
		else
		{
			figur_count++;
		}
	}
	var unique_item = Math.floor(Math.random()*$('.find_unique_div').length)+1;
	var abort_cicle = false;
	var unique_color;
	var unique_index_figur;
	for(var i=1; i<$('.find_unique_div').length+1; i++)
	{
		if(i == unique_item)
		{
			for(var x=0; x<color_arr.length;x++)
			{
				if(getHexRGBColor($('[data-id="'+i+'"]>div').css('color')) != color_arr[x])
				{
					for(var y=1; y<$('.find_unique_div').length+1; y++)
					{
						if(getHexRGBColor($('[data-id="'+y+'"]>div').css('color')) == color_arr[x] && $('[data-id="'+y+'"]>div').attr('figur_int') != $('[data-id="'+i+'"]>div').attr('figur_int'))
						{
							$('[data-id="'+i+'"]>div').css('color', color_arr[x]);
							$('[data-id="'+i+'"]>div').attr('unique', 'true');
							abort_cicle = true;
							unique_color = color_arr[x];
							unique_index_figur = $('[data-id="'+i+'"]>div').attr('figur_int');
						}
						if(abort_cicle) break;
					}
				}
				if(abort_cicle) break;
			}
		}
		if(abort_cicle) break;
	}
	
	if(size>3)
	{
		var check_change = {};
		for(var i=1; i<$('.find_unique_div').length+1; i++)
		{
			var cur_figur_int = $('[data-id="'+i+'"]>div').attr('figur_int');
			if(cur_figur_int != unique_index_figur && typeof check_change[cur_figur_int] == "undefined")
			{
				check_change[cur_figur_int] = " ";
				var cur_figur_int_ = $('[figur_int="'+cur_figur_int+'"]');
				var new_color = color_arr[Math.floor(Math.random()*6)];
				for(var x=0; x<cur_figur_int_.length; x++)
				{
					$(cur_figur_int_[x]).css('color', new_color);
					if(x>0) break;
				}
			}
		}
		check_change = {};
	}

	cur_number_finde_i = Math.floor(Math.random() * ($('.find_unique_div').length));


	find_unique_table_cells = $('.find_unique_table td.big div');
	find_unique_table_cells.click(function()
	{
		if(clack_flag)
		{
			if($(this).attr('unique') == 'true')
			{

				score += level*100;
				raund++;
				$('.param_level').html(level);
				$('.param_score').html(score);
				clack_flag = false;
				click_cel($(this), true);
				setTimeout(function()
				{
					if(start)
					hide_lamps();
				},1000);
			}
			else
			{
				if(level>1)
				{
					score -= level*100;
					raund--;
				}
				$('.param_level').html(level);
				$('.param_score').html(score);
				
				clack_flag = false;
				click_cel($(this), false);

				setTimeout(function()
				{
					if(start)
					hide_lamps();
				},1000);	
			}			
		}

	});
	var scene_color = color_arr[Math.floor(Math.random()*6)];
	clack_flag = true;
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
	if(Number(localStorage.getItem("stats_find_unique_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		//localStorage.setItem("stats_find_unique_time"+date.getDate()+"/"+date.getMonth(), cur_time);
		localStorage.setItem("stats_find_unique_level"+date.getDate()+"/"+date.getMonth(), level);
		localStorage.setItem("stats_find_unique_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_find_unique_best_score"))<score)
	{
		//localStorage.setItem("stats_find_unique_best_time", cur_time);
		localStorage.setItem("stats_find_unique_best_level", level);
		localStorage.setItem("stats_find_unique_best_score", score);		
	}
	parent.window.save_result("find_unique", score);
	$('#results_level td:nth-child(1)').html(parent.window._t('Level:'));
	$('#results_level td:nth-child(2)').html(level);

	$('#results_score td:nth-child(1)').html(parent.window._t('Score:'));
	$('#results_score td:nth-child(2)').html(score);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =120;
	level = 1;
	score = 0;
	raund = 1;
	start = false;
	click_i = 1;
	clack_flag = false;
	size = 3;
	$('.find_unique_table>tbody').css('transform', 'rotate(0deg)');
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});