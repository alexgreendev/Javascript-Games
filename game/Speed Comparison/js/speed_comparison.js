resize_iframe();
var date = new Date();
var color_arr = new Array();
color_arr[0] = '#af81f5';
color_arr[1] = '#ffc600';
color_arr[2] = '#a9d457';
color_arr[3] = '#7d00bb';
color_arr[4] = '#c7546e';
color_arr[5] = '#ff7d00';
var score = 0;
var cur_time = 120;
var timer_interval;
var start = false;

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
	    class: 'speed_comparison_card'
	});
}
function click_cel(el, palec)
{
	var freqSecs = 0.01;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var angle_cel = 0;
	var posX = 0;
	el.css('z-index', 99);
	var remove_old = $('.card_old');

	if(palec)
	{
		if($(remove_old[remove_old.length-1]).find('span').html() == el.find('span').html())
		{
			score += 1;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');
		}
		else
		{
			if(score)
			{
				score -= 1;
				$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			}
		}
	}
	else
	{
		if($(remove_old[remove_old.length-1]).find('span').html() != el.find('span').html())
		{
			score += 1;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');
		}
		else
		{
			if(score)
			{
				score -= 1;
				$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			}
		}
	}	
	create_table();
	function blink() 
	{
		if(angle_cel != 180)
		{
			angle_cel += 15;
			posX += 23;
			if(angle_cel > 90)
			{
				el.addClass('speed_comparison_card_shirt');
			}	
		}
		else
		{
			remove_old.remove();
			el.addClass('card_old');
			clearInterval(interval);						
		}

		el.css('transform', 'rotate3d(0, 1, 0,'+angle_cel+'deg) '+'translateX('+posX+'px)');
	}	
}
function first_card(el)
{
	create_table();
	var freqSecs = 0.01;
	var right = false;
	var interval = setInterval (blink, freqSecs*1000 );
	var angle_cel = 0;
	var posX = 0;
	el.css('z-index', 99);
	el.addClass('card_old');
	function blink() 
	{
		if(angle_cel != 180)
		{
			angle_cel += 15;
			posX += 23;
			if(angle_cel > 90)
			{
				el.addClass('speed_comparison_card_shirt');
			}	
		}
		else
		{
			clearInterval(interval);			
		}

		el.css('transform', 'rotate3d(0, 1, 0,'+angle_cel+'deg) '+'translateX('+posX+'px)');
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
	if(eventObject.which == 37 && start)
	{
		click_cel($('div.cure_face'), false);
		
	}	
	if(eventObject.which == 39 && start)
	{
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
	if(eventObject.which == 37 && start)
	{
		click_cel($('div.cure_face'), false);
		
	}	
	if(eventObject.which == 39 && start)
	{
		click_cel($('div.cure_face'), true);
	}
});

function create_table()
{
	$('.speed_comparison_com').html(parent.window._t('Compare the card you see now with the previous one (ignoring the color). If they match then press the right key. If not match, press the key to the left.'));
	
	$('.param_score').html(score);
	var cells_count;

	cards[0] = card_el();

	$('.speed_comparison_scene_cards').append(cards[0]);
	var figur_cur = figur_ar[Math.floor(Math.random()*10)];
	var remove_old = $('.cure_face');
	if(Math.floor(Math.random()*2) && start)
	{
		figur_cur = $(remove_old[remove_old.length-1]).find('span').html();
	}
	$('.cure_face').removeClass('cure_face');
	cards[0].html('<span>'+figur_cur+'</span>');
	cards[0].find("span").css('color', color_arr[Math.floor(Math.random()*6)]);
	cards[0].addClass('cure_face');

	var scene_color = color_arr[Math.floor(Math.random()*6)];
	$('.speed_comparison_card').css('border-color', scene_color);
	resize_iframe();
}

function return_res()
{
	clearInterval(timer_interval);
	$('.speed_comparison_card').remove();
	if(!cur_time)
	{
		cur_time =120;
	}
	else
	{
		cur_time = 120-cur_time;
	}
	if(Number(localStorage.getItem("stats_speed_comparison_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		//localStorage.setItem("stats_speed_comparison_time"+date.getDate()+"/"+date.getMonth(), cur_time);
		localStorage.setItem("stats_speed_comparison_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_speed_comparison_best_score"))<score)
	{
		//localStorage.setItem("stats_speed_comparison_best_time", cur_time);
		localStorage.setItem("stats_speed_comparison_best_score", score);		
	}

	parent.window.save_result("speed_comparison", score);

	$('#results_score td:nth-child(1)').html(parent.window._t('Score:'));
	$('#results_score td:nth-child(2)').html(score);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =120;
	score = 0;

	start = false;


	$('.speed_comparison_table>tbody').css('transform', 'rotate(0deg)');
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});
