resize_iframe();
var date = new Date();
var color_arr = new Array();
color_arr[0] = '#a4ddff';
color_arr[1] = '#ffc600';
color_arr[2] = '#a9d457';
color_arr[3] = '#7d00bb';
color_arr[4] = '#d4274e';
color_arr[5] = '#ff7d00';
color_arr[6] = "#f989f0";
color_arr[7] = "#bb6b24";

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

var color_name = new Array();
color_name[0] = parent.window._t('blue');
color_name[1] = parent.window._t('yellow');
color_name[2] = parent.window._t('green');
color_name[3] = parent.window._t('purple');
color_name[4] = parent.window._t('red');
color_name[5] = parent.window._t('orange');
color_name[6] = parent.window._t('pink');
color_name[7] = parent.window._t('brown');

var card_el_left = function()
{
	return jQuery('<div/>', {
	    class: 'color_comparison_left'
	});
}
var card_el_right = function()
{
	return jQuery('<div/>', {
	    class: 'color_comparison_right'
	});
}
function click_cel(palec)
{

	var answer_match = $('.color_comparison_scene_cards').attr('answer_match');


	if(palec)
	{
		if(answer_match == 'true')
		{
			score += 1;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');
		}
		else
		{
			if(score > 0)
			{
				score -= 2;
				$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			}
		}
	}
	else
	{
		if(answer_match == 'false')
		{
			score += 1;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');
		}
		else
		{
			if(score > 0)
			{
				score -= 2;
				$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			}
		}
	}	
	create_table();	
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
		click_cel(false);
		
	}	
	if(eventObject.which == 39 && start)
	{
		click_cel(true);
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
		click_cel(false);
		
	}	
	if(eventObject.which == 39 && start)
	{
		click_cel(true);
	}
});

function create_table()
{
	var cards_left = card_el_left();
	var cards_right = card_el_right();
	$('.color_comparison_com').html(parent.window._t('Does the text color on the right match the color name on the left?'));
	
	$('.param_score').html(score);

	$('.color_comparison_scene_cards').html("");

	$('.color_comparison_scene_cards').append(cards_left);
	$('.color_comparison_scene_cards').append(cards_right);

	var int_color_left = Math.floor(Math.random()*8);
	var int_color_right = Math.floor(Math.random()*8);
	var int_color_right_rand = Math.floor(Math.random()*8);

	var name_color_left = color_name[int_color_left];

	cards_right.html('<span>'+color_name[int_color_right]+'</span>');
	if(Math.floor(Math.random()*2))
	{
		
		cards_right.find("span").css('color', color_arr[int_color_left]);
		int_color_right_rand = int_color_left;
	}
	else
	{
		cards_right.find("span").css('color', color_arr[int_color_right_rand]);
	}
	if(int_color_right_rand == int_color_left)
	{
		$('.color_comparison_scene_cards').attr('answer_match', true);
	}
	else
	{
		$('.color_comparison_scene_cards').attr('answer_match', false);
	}
	cards_left.html('<span>'+name_color_left+'</span>');
	cards_left.find("span").css('color', color_arr[Math.floor(Math.random()*8)]);

	var scene_color = color_arr[Math.floor(Math.random()*8)];
	$('.color_comparison_left').css('border-color', scene_color);
	$('.color_comparison_right').css('border-color', scene_color);
	resize_iframe();
}

function return_res()
{
	clearInterval(timer_interval);
	$('.color_comparison_scene_cards').html("");
	$('.answer_chech').css('background-image', '');
	if(!cur_time)
	{
		cur_time =120;
	}
	else
	{
		cur_time = 120-cur_time;
	}
	if(Number(localStorage.getItem("stats_color_comparison_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		localStorage.setItem("stats_color_comparison_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_color_comparison_best_score"))<score)
	{
		localStorage.setItem("stats_color_comparison_best_score", score);		
	}

	parent.window.save_result("color_comparison", score);
	
	$('#results_score td:nth-child(1)').html(parent.window._t('Score:'));
	$('#results_score td:nth-child(2)').html(score);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =120;
	score = 0;

	start = false;

	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});
