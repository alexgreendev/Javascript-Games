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
var cur_time = 60;
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

var symmetry_ask = false;

function click_cel(palec)
{

	var answer_match = $('.symmetry_scene_cards').attr('answer_match');


	if(palec)
	{
		if(symmetry_ask)
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
		if(!symmetry_ask)
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
	generat_image();
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
	generat_image();
	prestart();

});
$('#resultclose').click(function()
{
	$('#resultswindow').hide();
	$('.game_scene').show();
	generat_image();
	prestart();

});
$(parent.document).keydown(function(eventObject){
	if(eventObject.which == 32)
	{
		if($('.game_menu').is(":visible"))
		{
			$('.game_menu').hide();
			$('.game_scene').show();
			generat_image();
			prestart();
		}
		if($('#resultswindow').is(":visible"))
		{
			$('#resultswindow').hide();
			$('.game_scene').show();
			generat_image();
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
			generat_image();
			prestart();
		}
		if($('#resultswindow').is(":visible"))
		{
			$('#resultswindow').hide();
			$('.game_scene').show();
			generat_image();
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

function return_res()
{
	clearInterval(timer_interval);
	$('.symmetry_scene_cards>table>tbody').html("");
	$('.answer_chech').css('background-image', '');
	if(!cur_time)
	{
		cur_time =60;
	}
	else
	{
		cur_time = 60-cur_time;
	}
	if(Number(localStorage.getItem("stats_symmetry_score"+date.getDate()+"/"+date.getMonth()))<score)
	{
		localStorage.setItem("stats_symmetry_score"+date.getDate()+"/"+date.getMonth(), score);
	}
	if(Number(localStorage.getItem("stats_symmetry_best_score"))<score)
	{
		localStorage.setItem("stats_symmetry_best_score", score);		
	}

	parent.window.save_result("speed_symmetry", score);

	$('#results_score td:nth-child(1)').html(parent.window._t('Score:'));
	$('#results_score td:nth-child(2)').html(score);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =60;
	score = 0;

	start = false;
	symmetry_ask = false;
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});
var size_image = 6;


function generat_image()
{
	$('.param_score').html(score);	

	var image_table = $('.image-table>tbody');
	image_table.html("");
	var td_color = color_arr[Math.floor(Math.random()*8)];
	var index_td = 1;
	for(var i = 1; i<size_image+1;i++)
	{
		image_table.append('<tr></tr>');
		var symmetry_td = index_td;
		for(var x = 1; x<size_image+1;x++)
		{
			var tr = $('.image-table>tbody>tr').filter( ':last' );
			
			if(x<(size_image/2)+1)
			{

				tr.append('<td class="td'+index_td+'"');
				index_td++;
				symmetry_td = index_td;

			}
			else
			{
				if(x == (size_image/2)+1)
				{
					symmetry_td--;
				}
				tr.append('<td class="td'+symmetry_td+'"');
				symmetry_td -=1;
			}
		}
	}

	for(var i = 1; i<(size_image*size_image/2)+1;i++)
	{
		$('td.td'+i).css('background', '');
		if(Math.floor(Math.random()*2))
		$('td.td'+i).css('background', td_color);
	}
	if(Math.floor(Math.random()*2))
	{
		symmetry_ask = false;
		var r_c = Math.floor(Math.random()*((size_image*size_image)/2))+1;
		var r_r = Math.floor(Math.random()*2);
		var curent_px_image = $('td.td'+r_c);
		if(curent_px_image.attr('style') != undefined && curent_px_image.attr('style') != "")
		{
			$.each( curent_px_image, function( key, value ) {
				if(key == r_r)
				{
					$(this).css('background', '');
				}
			});

		}
		else
		{
			$.each( curent_px_image, function( key, value ) {
				if(key == r_r)
				{
					$(this).css('background', td_color);
				}
			});
		}
	}
	else
	{
		symmetry_ask = true;
	}

	var scene_color = color_arr[Math.floor(Math.random()*8)];
	if(td_color == scene_color)
	{
		scene_color = color_arr[Math.floor(Math.random()*8)];
	}
	if(td_color == scene_color)
	{
		scene_color = color_arr[Math.floor(Math.random()*8)];
	}
	if(td_color == scene_color)
	{
		scene_color = color_arr[Math.floor(Math.random()*8)];
	}
	if(td_color == scene_color)
	{
		scene_color = color_arr[Math.floor(Math.random()*8)];
	}
	$('.image-table').css('background-color', scene_color);
	$('.image-table').css('border-color', scene_color);
	resize_iframe();
}
