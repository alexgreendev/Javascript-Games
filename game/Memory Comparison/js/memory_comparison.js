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
var raund = 0;
var raund_mis = 0;
var cur_time = 60;
var timer_interval;
var start = false;
var click_flag = true;
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

var cards = {};
var card_el = function()
{
	return jQuery('<div/>', {
	    class: 'memory_comparison_card'
	});
}
function click_cel(el, palec)
{
	var freqSecs = 0.01;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var angle_cel = 0;
	el.css('z-index', 99);
	var remove_old = $('.memory_comparison_card');

	if(palec)
	{

		if($(remove_old[0]).find('span').html() == el.find('span').html())
		{
			raund += 1;
			raund_mis = 0;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');

		}
		else
		{
			if(raund)
			{
				raund -= 1;
				raund_mis++;
				$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			}
			if(raund_mis && level>1)
			{
				raund = 0;
				raund_mis = 0;
				level--;
			}
		}
		if(raund == 3)
		{
			raund = 0;
			level++;
		}
	}
	else
	{
		if($(remove_old[0]).find('span').html() != el.find('span').html())
		{
			raund += 1;
			raund_mis = 0;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');
		}
		else
		{
			if(raund)
			{
				raund -= 1;
				raund_mis++;
				$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			}
			if(raund_mis && level>1)
			{
				raund = 0;
				raund_mis = 0;
				level--;
			}
		}
		if(raund == 3)
		{
			raund = 0;
			level++;
		}
	}	
	
	function blink() 
	{
		if(angle_cel != 180)
		{
			angle_cel += 5;
			if(angle_cel > 90)
			{
				el.addClass('memory_comparison_card_shirt');
			}	
		}
		else
		{
			var iterat = 1;
			for(var i=remove_old.length; i > -1;i--)
			{
				
				if(level+1 < iterat)
				{
					$(remove_old[i]).hide(500).fadeOut(0, function(){$(this).remove();});
					$(remove_old[i+1]).addClass('memory_comparison_card_rememb');

				}
				iterat++;
			}

			el.addClass('card_old');
			clearInterval(interval);						
		}

		el.css('transform', 'rotate3d(0, 1, 0,'+angle_cel+'deg)');
	}
	setTimeout(function()
	{
		create_table();
	}, 1000);	
}
function first_card(el)
{
	create_table();
	var freqSecs = 0.01;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var angle_cel = 0;
	el.css('z-index', 99);
	el.addClass('card_old');
	function blink() 
	{
		if(angle_cel != 180)
		{
			angle_cel += 5;
			if(angle_cel > 90)
			{
				el.addClass('memory_comparison_card_shirt');
			}	
		}
		else
		{
			clearInterval(interval);			
		}

		el.css('transform', 'rotate3d(0, 1, 0,'+angle_cel+'deg)');
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
			setTimeout(function()
			{
				first_card($('div.cure_face'));
				start = true;

				timer_shulte();
			}, 500);

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
	if(eventObject.which == 37 && start && click_flag)
	{
		click_flag = false;
		click_cel($('div.cure_face'), false);
		
	}	
	if(eventObject.which == 39 && start && click_flag)
	{
		click_flag = false;
		click_cel($('div.cure_face'), true);
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
	if(eventObject.which == 37 && start && click_flag)
	{
		click_flag = false;
		click_cel($('div.cure_face'), false);
		
	}	
	if(eventObject.which == 39 && start && click_flag)
	{
		click_flag = false;
		click_cel($('div.cure_face'), true);
	}
});

function create_table()
{
	$('.memory_comparison_com').html(parent.window._t('Compare the card you see now with the one indicated by the green arrow (ignoring the color). If they match then press the right key. If not match, press the key to the left.'));
	
	$('.param_level').html(level);
	var cells_count;

	cards[0] = card_el();

	$('.memory_comparison_scene_cards').append(cards[0]);
	var figur_cur = figur_ar[Math.floor(Math.random()*10)];
	var remove_old = $('.memory_comparison_card');
	if(Math.floor(Math.random()*2) && start)
	{
		figur_cur = $(remove_old[0]).find('span').html();
	}
	$('.cure_face').removeClass('cure_face');
	cards[0].html('<span>'+figur_cur+'</span>');
	cards[0].find("span").css('color', color_arr[Math.floor(Math.random()*6)]);
	cards[0].addClass('cure_face');
	$('.cure_face').hide();
	$('.cure_face').show(500, function(){click_flag = true; resize_iframe();});

	var scene_color = color_arr[Math.floor(Math.random()*6)];

	$('.memory_comparison_card').css('border-color', scene_color);
	resize_iframe();
}

function return_res()
{
	clearInterval(timer_interval);
	$('.memory_comparison_card').remove();
	if(!cur_time)
	{
		cur_time =300;
	}
	else
	{
		cur_time = 300-cur_time;
	}

	if(Number(localStorage.getItem("stats_memory_comparison_level"+date.getDate()+"/"+date.getMonth()))<level)
	{
		localStorage.setItem("stats_memory_comparison_level"+date.getDate()+"/"+date.getMonth(), level);
	}
	if(Number(localStorage.getItem("stats_memory_comparison_best_level"))<level)
	{
		localStorage.setItem("stats_memory_comparison_best_level", level);		
	}	

	parent.window.save_result("memory_comparison", level);
	
	$('#results_level td:nth-child(1)').html(parent.window._t('Level:'));
	$('#results_level td:nth-child(2)').html(level);

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =300;

	start = false;

	level = 1;
	raund = 0;
	raund_mis = 0;

	click_flag = true;
	$('.memory_comparison_table>tbody').css('transform', 'rotate(0deg)');
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});
