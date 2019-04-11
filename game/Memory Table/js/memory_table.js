resize_iframe();
var date = new Date();
var color_arr = new Array();
color_arr[0] = '#af81f5';
color_arr[1] = '#af81f5';
color_arr[2] = '#a9d457';
color_arr[3] = '#7d00bb';
color_arr[4] = '#c7546e';
color_arr[5] = '#c7546e';
var level = 1;
var score = 0;
var cur_time = 120;
var timer_interval;
var stor_interval = new Array();
var div_anim_arr = {};
var start = false;
var click_i = 1;
var clack_flag = false;
var size = 8;

function show_cels(back)
{

	var freqSecs = 0.01;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var angle_cel = 0;
	if(back)
	{
		angle_cel = 180;
	}
	function blink() 
	{
		for(var i=1; i<level+2; i++)
		{

			var el = $('[data-id="'+i+'"]>div');
			if(angle_cel != 180 && !back)
			{
				angle_cel += 3;
				if(angle_cel > 90)
				{
					el.css('background-color', '#ff7d00');
				}	
			}
			else
			{
				
				if(!back)
				{
					clearInterval(interval);
					setTimeout(function()
					{
						if(start)
						show_cels(true);
					},1000);
					break;				
				}
				else
				{
					if(angle_cel != 0)
					{
						angle_cel -= 3;
						if(angle_cel < 90)
						{
							el.css('background-color', '#d4d4d4');
						}	
					}
					else
					{
						$('.memory_table_com').html(parent.window._t('Find the orange cells and click on them with the left mouse button.'));
						clearInterval(interval);
						clack_flag = true;
						break;
					}
				}

			}
			el.css('transform', 'rotate3d(1, 1, 0,'+angle_cel+'deg)');
		}

	}
}
function click_cel(el, palec, show)
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
					el.css('background-color', '#ff7d00');
					if(!show)
					el.css('background-image', 'url(../../img/palec_up.png');
				}
				else
				{
					el.css('background-image', 'url(../../img/palec_down.png');
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
	var elem = $('.memory_table_table');
	show_i = 1;
	function blink() {
	if(angle_t<(50+elem.parent().width()/2+elem.width()/2))
	{
		angle_t += 40;
		if(right && angle_t<20 && angle_t>-20)
		{
			clearInterval(interval);
			if(start)
			{
				show_cels();
			}
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
			$('.memory_table_table>tbody').css('transform', 'rotate(0deg)');
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
			show_cels(false);
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
var memory_table_table = $('.memory_table_table>tbody');


	
var class_div = 'memory_table_div2';
var tr_table = 1;

function create_table()
{
	click_i = 1;
	$('.memory_table_com').html(parent.window._t('Remember the location of the orange cells.'));
	clack_flag = false;
	for(var si=0; si<stor_interval.length;si++)
	{
		clearInterval(stor_interval[si]);
		delete  stor_interval[si];
	}
	$('.param_level').html(level);
	$('.param_score').html(score);
	memory_table_table.html('');
	var cells_count;

	var number_min = 1;
	var number_max = Math.pow(size,2);
	cells_count = Math.pow(size,2);	
	var cells_obj = {};

	for(var i=number_min; i<number_max+1; i++)
	{
		cells_obj[i] = i;
	}
	
	for(var i = 1; i<size+tr_table; i++)
	{
		memory_table_table.append('<tr></tr>');
		for(var x = 1; x<size+1; x++)
		{
			var numbers = Object.keys(cells_obj);
			var cur_number = numbers[Math.floor(Math.random() * (numbers.length))];
			$('.memory_table_table>tbody>tr').filter( ':last' ).append('<td data-id="'
				+cells_obj[cur_number]+
				'" class="enable big"><div class="memory_table_div '
				+class_div+'" data-id="'
				+cells_obj[cur_number]+'">'
				+'</div></td>');				
			delete  cells_obj[cur_number];	
		}
	}
	cur_number_finde_i = Math.floor(Math.random() * ($('.memory_table_div').length));


	memory_table_table_cells = $('.memory_table_table td.big div');
	memory_table_table_cells.click(function()
	{
		if(clack_flag && $(this).attr('check_click') != 'true')
		{
			if(Number($(this).attr('data-id'))<level+2)
			{

				score += level*10;
				$('.param_level').html(level);
				$('.param_score').html(score);

				click_i++;
				$(this).attr('check_click', 'true');
				click_cel($(this), true);
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
				
				click_i = 1;
				clack_flag = false;
				$(this).attr('check_click', 'true');
				click_cel($(this), false);

				for(var i=0; i<level+2; i++)
				{
					var el = $('[data-id="'+i+'"]>div');
					if(el.attr('check_click') != 'true')
					{
						click_cel(el, true, true);
					}
				}
				setTimeout(function()
				{
					if(start)
					hide_lamps();
				},1500);	
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
					if(start)
					hide_lamps();
				},700);	
			}			
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
	if(Number(localStorage.getItem("stats_memory_table_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		//localStorage.setItem("stats_memory_table_time"+date.getDate()+"/"+date.getMonth(), cur_time);
		localStorage.setItem("stats_memory_table_level"+date.getDate()+"/"+date.getMonth(), level);
		localStorage.setItem("stats_memory_table_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_memory_table_best_score"))<score)
	{
		//localStorage.setItem("stats_memory_table_best_time", cur_time);
		localStorage.setItem("stats_memory_table_best_level", level);
		localStorage.setItem("stats_memory_table_best_score", score);		
	}

	parent.window.save_result("memory_table", level);
	
	$('#results_level td:nth-child(1)').html(parent.window._t('Level:'));
	$('#results_level td:nth-child(2)').html(level);

	$('#results_score td:nth-child(1)').html(parent.window._t('Score:'));
	$('#results_score td:nth-child(2)').html(score);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =120;
	level = 1;
	score = 0;


	start = false;
	click_i = 1;
	clack_flag = false;

	$('.memory_table_table>tbody').css('transform', 'rotate(0deg)');
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});