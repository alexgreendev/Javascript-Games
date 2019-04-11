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
var angle_div = 0;
var size = 3;
function rotate_table(deg, cicle)
{
	var elem = $('.rotation_table_table>tbody');
	var freqSecs = 0.01;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	angle_div = 0;
	function blink() 
	{
		if(angle_div != 90*cicle*deg)
		{
			angle_div += 2*deg;	
			
		}
		else
		{
			clearInterval(interval);
			clack_flag = true;
		}
		elem.css('transform', 'rotate('+angle_div+'deg)');
	}
}
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
					},500);
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
						$('.rotation_table_com').html(parent.window._t('Find the orange cells and click on them with the left mouse button.'));
						clearInterval(interval);
						setTimeout(function()
						{
							var plus_or_minus;
							if(Boolean(Math.round(Math.random())))
							{
								plus_or_minus = 1;
							}
							else
							{
								plus_or_minus = -1
							}
							rotate_table(plus_or_minus,  Math.floor(Math.random() * 3) + 1);
						},100);
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
		var deg_y = 1;
		if(angle_div == 180 || angle_div == -180)
		{
			deg_y = 0;
		}
		if(angle_div == 270 || angle_div == -90)
		{
			deg_y = -1;
		}
		el.css('transform', 'rotate3d(1, '+deg_y+', 0,'+angle_cel+'deg)');
	}	
}
function hide_lamps()
{
	var freqSecs = 0.01;
	var angle_t = 0;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var elem = $('.rotation_table_table');
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
			$('.rotation_table_table>tbody').css('transform', 'rotate(0deg)');
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
var rotation_table_table = $('.rotation_table_table>tbody');


	
var class_div = 'rotation_table_div1';
var tr_table = 1;

function create_table()
{
	click_i = 1;
	$('.rotation_table_com').html(parent.window._t('Remember the location of the orange cells.'));
	clack_flag = false;
	for(var si=0; si<stor_interval.length;si++)
	{
		clearInterval(stor_interval[si]);
		delete  stor_interval[si];
	}
	$('.param_level').html(level);
	$('.param_score').html(score);
	rotation_table_table.html('');
	var cells_count;

	if(Math.ceil(Math.pow(size,2)/2) < level)
	{
		size++;
	}
	else
	{
		if(Math.ceil(Math.pow(size,2)/3) > level && size>3)
		{
			size--;
		}		
	}
	var number_min = 1;
	var number_max = Math.pow(size,2);
	cells_count = Math.pow(size,2);	
	var cells_obj = {};
	switch(size)
	{
		case 3:
		class_div = "rotation_table_div1";
		break;
		case 4:
		class_div = "rotation_table_div1";
		break;
		case 5:
		class_div = "rotation_table_div2";
		break;
		case 11:
		class_div = "rotation_table_div2";
		break;
		case 12:
		class_div = "rotation_table_div3";
		break;
		case 15:
		class_div = "rotation_table_div3";
		break;
		case 16:
		class_div = "rotation_table_div4";
		break;
	}
	for(var i=number_min; i<number_max+1; i++)
	{
		cells_obj[i] = i;
	}
	
	for(var i = 1; i<size+tr_table; i++)
	{
		rotation_table_table.append('<tr></tr>');
		for(var x = 1; x<size+1; x++)
		{
			var numbers = Object.keys(cells_obj);
			var cur_number = numbers[Math.floor(Math.random() * (numbers.length))];
			$('.rotation_table_table>tbody>tr').filter( ':last' ).append('<td data-id="'
				+cells_obj[cur_number]+
				'" class="enable big"><div class="rotation_table_div '
				+class_div+'" data-id="'
				+cells_obj[cur_number]+'">'
				+'</div></td>');				
			delete  cells_obj[cur_number];	
		}
	}
	cur_number_finde_i = Math.floor(Math.random() * ($('.rotation_table_div').length));


	rotation_table_table_cells = $('.rotation_table_table td.big div');
	rotation_table_table_cells.click(function()
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
	if(Number(localStorage.getItem("stats_rotation_table_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		//localStorage.setItem("stats_rotation_table_time"+date.getDate()+"/"+date.getMonth(), cur_time);
		localStorage.setItem("stats_rotation_table_level"+date.getDate()+"/"+date.getMonth(), level);
		localStorage.setItem("stats_rotation_table_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_rotation_table_best_score"))<score)
	{
		//localStorage.setItem("stats_rotation_table_best_time", cur_time);
		localStorage.setItem("stats_rotation_table_best_level", level);
		localStorage.setItem("stats_rotation_table_best_score", score);		
	}

	parent.window.save_result("rotation_table", level);

	$('#results_level td:nth-child(1)').html(parent.window._t('Level:'));
	$('#results_level td:nth-child(2)').html(level);

	$('#results_score td:nth-child(1)').html(parent.window._t('Score:'));
	$('#results_score td:nth-child(2)').html(score);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =120;
	level = 1;
	score = 0;
	angle_div = 0;

	start = false;
	click_i = 1;
	clack_flag = false;
 	size = 3;
	$('.rotation_table_table>tbody').css('transform', 'rotate(0deg)');
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});