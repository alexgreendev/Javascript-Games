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
	    class: 'math_match_left'
	});
}
var card_el_right = function()
{
	return jQuery('<div/>', {
	    class: 'math_match_right'
	});
}
function click_cel(palec)
{

	var answer_match = $('.math_match_scene_cards').attr('answer_match');
	if(palec == answer_match)
	{
		score += 1;
		$('.answer_chech').css('background-image', 'url(../../img/palec_up_white.png)');
		$('.answer_chech').css('transform', 'rotate3d(1, 0, 0, 0deg)');
	}
	else
	{
		if(score > 0)
		{
			score -= 2;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up_white.png)');
			$('.answer_chech').css('transform', 'rotate3d(1, 0, 0, 180deg)');
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
	eventObject.preventDefault();
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
		click_cel(0);
		
	}	
	if(eventObject.which == 40 && start)
	{
		click_cel(1);
		
	}	
	if(eventObject.which == 39 && start)
	{
		click_cel(2);
	}
});
$(document).keydown(function(eventObject){
	eventObject.preventDefault();
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
		click_cel(0);
		
	}	
	if(eventObject.which == 40 && start)
	{
		click_cel(1);
		
	}	
	if(eventObject.which == 39 && start)
	{
		click_cel(2);
	}
});

function create_table()
{
	var cards_left = card_el_left();
	var cards_right = card_el_right();
	$('.math_match_com').html(parent.window._t('Which number is bigger?'));
	
	$('.param_score').html(score);

	$('.math_match_scene_cards').html("");

	$('.math_match_scene_cards').append(cards_left);
	$('.math_match_scene_cards').append(cards_right);

	var int_f = Math.floor(Math.random()*99)+1;
	var int_s = Math.floor(Math.random()*99)+1;
	var int_z = 0; 
	var string_z = '';

	if(Math.floor(Math.random()*2))
	{
		int_z = -1;
		string_z = ' - ';
	}
	else
	{
		int_z = 1;
		string_z = ' + ';		
	}

	cards_left.html('<span>'+int_f+string_z+int_s+'</span>');

	switch(Math.floor(Math.random()*3))
	{
		case 0:
			cards_right.html('<span>'+Number(int_f+int_z*int_s-1)+'</span>');
			$('.math_match_scene_cards').attr('answer_match', 0);
		break;
		case 1:
			cards_right.html('<span>'+Number(int_f+int_z*int_s)+'</span>');
			$('.math_match_scene_cards').attr('answer_match', 1);
		break;
		case 2:
			cards_right.html('<span>'+Number(int_f+int_z*int_s+1)+'</span>');
			$('.math_match_scene_cards').attr('answer_match', 2);
		break;
	}

	resize_iframe();
}

function return_res()
{
	clearInterval(timer_interval);
	$('.math_match_scene_cards').html("");
	$('.answer_chech').css('background-image', '');
	if(!cur_time)
	{
		cur_time =120;
	}
	else
	{
		cur_time = 120-cur_time;
	}
	if(Number(localStorage.getItem("stats_math_match_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		localStorage.setItem("stats_math_match_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_math_match_best_score"))<score)
	{
		localStorage.setItem("stats_math_match_best_score", score);		
	}

	parent.window.save_result("math_match", score);
	
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
