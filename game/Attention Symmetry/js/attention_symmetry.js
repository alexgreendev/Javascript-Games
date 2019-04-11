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

var level = 1;
var cur_time = 60;
var timer_interval;
var start = false;
var raund = 0;

var size_image = 4;
var attention_symmetry_ask = false;

function click_cel(palec)
{

	var answer_match = $('.attention_symmetry_scene_cards').attr('answer_match');


	if(palec)
	{
		if(attention_symmetry_ask)
		{
			raund += 1;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');
			if(raund > 2)
			{
				size_image += 2;
				raund = 0;
				level += 1;
			}
		}
		else
		{
			$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			if(size_image > 4)
			{
				size_image -= 2;
				raund = 0;
				level -= 1;
			}
		}
	}
	else
	{
		if(!attention_symmetry_ask)
		{
			raund += 1;
			$('.answer_chech').css('background-image', 'url(../../img/palec_up.png)');
			if(raund > 2)
			{
				size_image += 2;
				raund = 0;
				level += 1;
			}
		}
		else
		{
			$('.answer_chech').css('background-image', 'url(../../img/palec_down.png)');
			if(size_image > 4)
			{
				size_image -= 2;
				raund = 0;
				level -= 1;
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
	$('.attention_symmetry_scene_cards>table>tbody').html("");
	$('.answer_chech').css('background-image', '');
	if(!cur_time)
	{
		cur_time =60;
	}
	else
	{
		cur_time = 60-cur_time;
	}
	if(Number(localStorage.getItem("stats_attention_symmetry_level"+date.getDate()+"/"+date.getMonth()))<level)
	{
		localStorage.setItem("stats_attention_symmetry_level"+date.getDate()+"/"+date.getMonth(), level);
	}
	if(Number(localStorage.getItem("stats_attention_symmetry_best_level"))<level)
	{
		localStorage.setItem("stats_attention_symmetry_best_level", level);		
	}

	parent.window.save_result("attention_symmetry", level);

	$('#results_level td:nth-child(1)').html(parent.window._t('Level:'));
	$('#results_level td:nth-child(2)').html(level);	

	$('#resultswindow').show();
	$('.game_scene').hide();

	cur_time =60;
	level = 1;

	start = false;

	raund = 0;

	size_image = 4;
	attention_symmetry_ask = false; 
	
	resize_iframe();
}
$(window).resize(function() {
	$('.cover_scene').css('width', $('.cover_scene').parent().width()+'px');
	$('.cover_scene').css('height', $('.cover_scene').parent().height()+'px');
});



function generat_image()
{
	$('.param_level').html(level);	

	var image_table = $('.image-table>tbody');
	image_table.html("");
	var td_color = color_arr[Math.floor(Math.random()*8)];
	var index_td = 1;
	for(var i = 1; i<size_image+1;i++)
	{
		image_table.append('<tr></tr>');
		var attention_symmetry_td = index_td;
		for(var x = 1; x<size_image+1;x++)
		{
			var tr = $('.image-table>tbody>tr').filter( ':last' );
			
			if(x<(size_image/2)+1)
			{

				tr.append('<td class="td'+index_td+'"');
				index_td++;
				attention_symmetry_td = index_td;

			}
			else
			{
				if(x == (size_image/2)+1)
				{
					attention_symmetry_td--;
				}
				tr.append('<td class="td'+attention_symmetry_td+'"');
				attention_symmetry_td -=1;
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
		attention_symmetry_ask = false;
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
		attention_symmetry_ask = true;
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
	size_image
	$('.image-table').css('background-color', scene_color);
	$('.image-table').css('border-color', scene_color);

	if(($('.image-table td').width()-level) > 5)
	{
		$('.image-table td').width($('.image-table td').width()-level);
		$('.image-table td').height($('.image-table td').height()-level);		
	}
	else
	{
		$('.image-table td').width(5);
		$('.image-table td').height(5);		
	}

	resize_iframe();
}
