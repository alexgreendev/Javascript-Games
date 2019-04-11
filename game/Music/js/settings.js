
Date.prototype.daysInMonth = function(month) {
	return 33 - new Date(this.getFullYear(), month, 33).getDate();
};
var training_var = {};
training_var.workout = {};

training_var.workout.corsi = {}
training_var.workout.corsi.attempts = 0;

training_var.workout.math = {}
training_var.workout.math.attempts = 0;

training_var.workout.fastest = {}
training_var.workout.fastest.attempts = 0;

training_var.workout.nback = {}
training_var.workout.nback.attempts = 0;

training_var.workout.cwm = {}
training_var.workout.cwm.attempts = 0;

/*
var nex_game;
training_var.corsi_raund = function()
{
		//localStorage.setItem('corsi_raund', Number(localStorage.getItem('corsi_raund'))+1);
		//localStorage.setItem('corsi_raund', 0);
		nex_game = 'game/mental math/game.html';
		$('.train_ifarme>iframe').attr('src', nex_game);
		$('.train_corsi').removeClass('train_active');
		$('.train_math').addClass('train_active');
}

training_var.math_raund = function()
{
	nex_game = 'game/fastest/game.html';
	$('.train_ifarme>iframe').attr('src', nex_game);
	$('.train_math').removeClass('train_active');
	$('.train_fastest').addClass('train_active');
}

training_var.fastest_raund = function()
{
	nex_game = 'game/dual n-back/game.html';
	$('.train_ifarme>iframe').attr('src', nex_game);
	$('.train_fastest').removeClass('train_active');
	$('.train_nback').addClass('train_active');
}*/

var months=new Array(12);
months[0]=parent.window._t("Jan.");
months[1]=parent.window._t("Feb.");
months[2]=parent.window._t("Mar.");
months[3]=parent.window._t("Apr.");
months[4]=parent.window._t("May");
months[5]=parent.window._t("June");
months[6]=parent.window._t("July");
months[7]=parent.window._t("Aug.");
months[8]=parent.window._t("Sept.");
months[9]=parent.window._t("Oct.");
months[10]=parent.window._t("Nov.");
months[11]=parent.window._t("Dec.");
var months_fool=new Array(12);
months_fool[0]="January";
months_fool[1]="February";
months_fool[2]="March";
months_fool[3]="April";
months_fool[4]="May";
months_fool[5]="June";
months_fool[6]="July";
months_fool[7]="August";
months_fool[8]="September";
months_fool[9]="October";
months_fool[10]="November";
months_fool[11]="December";

var time=new Date();
var thismonth=months[time.getMonth() + 1];
var date=time.getDate();
var thisyear=time.getFullYear();

	training_var.workout.curent_day = date;
	training_var.workout.curent_month = time.getMonth();
	training_var.workout.curent_thismonth = months[training_var.workout.curent_month];
$("#month_train").change(function () {
	for(var i = 0; months_fool.length > i; i++)
	{		
		var month = $(this).val().split('"')[1].split('"')[0];

		if(months_fool[i] == month)
		{
			training_var.workout.curent_month = i;
			training_var.workout.curent_thismonth = months[training_var.workout.curent_month];
			training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
		}
	}

  });
$("#slide_train_day_left").click(function(e)
{
	if((training_var.workout.curent_day-1)>0)
	{
		training_var.workout.curent_day--;
	}
	else
	{
		training_var.workout.curent_day = time.daysInMonth(training_var.workout.curent_month-1);
		if(training_var.workout.curent_month>0)
		{
			training_var.workout.curent_month--;
		}
		else
		{
			training_var.workout.curent_month = 0;
		}
	}
	training_var.workout.curent_thismonth = months[training_var.workout.curent_month];
	training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
});	
$("#slide_train_day_right").click(function(e)
{
	if((training_var.workout.curent_day+1)<(time.daysInMonth(training_var.workout.curent_month))+1)
	{
		training_var.workout.curent_day++;
	}
	else
	{
		training_var.workout.curent_day = 1;
		if(training_var.workout.curent_month<11)
		{
			training_var.workout.curent_month++;
		}
		else
		{
			training_var.workout.curent_month = 0;
		}
	}
	training_var.workout.curent_thismonth = months[training_var.workout.curent_month];
	training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
});	
training_var.rezet_result_info = function(curent_day, curent_month, curent_thismonth)
{
	$("#month_train").val("document.write(parent.window._t(\""+months_fool[curent_month]+"\"));"+parent.window._t(months_fool[curent_month]));
	$('ul>li.current_day>div>span:nth-child(1)').html(training_var.workout.curent_day+'</br>');
	$('ul>li.current_day>div>span:nth-child(2)').html(training_var.workout.curent_thismonth);
	training_var.rezet_result_info_train(training_var.workout.curent_day, training_var.workout.curent_month);
	if((curent_day-2)>0)
	{
		$('ul>li.train_day:nth-child(1)>div>span:nth-child(1)').html((curent_day-2)+'</br>');
		$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(curent_thismonth);		
	}
	else
	{
		if(curent_day == 1)
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(1)').html(time.daysInMonth(curent_month-1)-1+'</br>');
		}
		else
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(1)').html(time.daysInMonth(curent_month-1)+'</br>');
		}
		$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(months[curent_month]);
		if(curent_month>0)
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(months[curent_month-1]);			
		}
		else
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(months[11]);
		}
	}
	
	if((curent_day-1)>0)
	{
		$('ul>li.train_day:nth-child(2)>div>span:nth-child(1)').html((curent_day-1)+'</br>');
		$('ul>li.train_day:nth-child(2)>div>span:nth-child(2)').html(curent_thismonth);	
	}
	else
	{
		$('ul>li.train_day:nth-child(2)>div>span:nth-child(1)').html(time.daysInMonth(curent_month-1)+'</br>');
		if(curent_month>0)
		{
			$('ul>li.train_day:nth-child(2)>div>span:nth-child(2)').html(months[curent_month-1]);			
		}
		else
		{
			$('ul>li.train_day:nth-child(2)>div>span:nth-child(2)').html(months[11]);
		}
			
	}
	
	if((curent_day+1)<(time.daysInMonth(curent_month)+1))
	{
		$('ul>li.train_day:nth-child(4)>div>span:nth-child(1)').html((curent_day+1)+'</br>');
		$('ul>li.train_day:nth-child(4)>div>span:nth-child(2)').html(curent_thismonth);	
	}
	else
	{
		$('ul>li.train_day:nth-child(4)>div>span:nth-child(1)').html(1+'</br>');
		if(curent_month<11)
		{
			$('ul>li.train_day:nth-child(4)>div>span:nth-child(2)').html(months[curent_month+1]);			
		}
		else
		{
			$('ul>li.train_day:nth-child(4)>div>span:nth-child(2)').html(months[0]);
		}		
	}
	
	if((curent_day+2)<(time.daysInMonth(curent_month)+1))
	{
		$('ul>li.train_day:nth-child(5)>div>span:nth-child(1)').html((curent_day+2)+'</br>');
		$('ul>li.train_day:nth-child(5)>div>span:nth-child(2)').html(curent_thismonth);	
	}
	else
	{
		if(time.daysInMonth(curent_month) == curent_day)
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(1)').html(2+'</br>');
		}
		else
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(1)').html(1+'</br>');
		}
			
		if(curent_month<11)
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(2)').html(months[curent_month+1]);				
		}
		else
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(2)').html(months[0]);
		}		
	}
}
training_var.rezet_result_info_train = function(day, month)
{
	if(localStorage.getItem("stats_math_score_total"+day+"/"+month))
	{
		$("#results_math>td:nth-child(2)").html(parent.window._t('Over time')+" "+localStorage.getItem("stats_math_score_time"+day+"/"+month)+" "+parent.window._t("minutes.")+" ");
		$("#results_math>td:nth-child(2)").append(parent.window._t("you have solved")+" "+localStorage.getItem("stats_math_score_total"+day+"/"+month)+" "+parent.window._t("tasks")+", ");
		$("#results_math>td:nth-child(2)").append(parent.window._t('skipped')+" "+localStorage.getItem("stats_math_score_skipped"+day+"/"+month)+", ");
		$("#results_math>td:nth-child(2)").append(parent.window._t("In the range:")+" "+localStorage.getItem("stats_math_range"+day+"/"+month));
		console.log(localStorage.getItem("stats_math_range"+day+"/"+month));
	}
	else
	$("#results_math>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_corsi"+day+"/"+month))
	$("#results_corsi>td:nth-child(2)").html(localStorage.getItem("stats_corsi"+day+"/"+month));
	else
	$("#results_corsi>td:nth-child(2)").html("");

	if(localStorage.getItem("memchimp.personal_best"))
	$("#results_corsi>td:nth-child(3)").html(localStorage.getItem("memchimp.personal_best"));
	else
	$("#results_corsi>td:nth-child(3)").html("");
	
	if(localStorage.getItem("stats_fastest"+day+"/"+month))
	$("#results_fastest>td:nth-child(2)").html(localStorage.getItem("stats_fastest"+day+"/"+month)+" "+parent.window._t("ms"));
	else
	$("#results_fastest>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_fastest_best"))
	$("#results_fastest>td:nth-child(3)").html(localStorage.getItem("stats_fastest_best")+" "+parent.window._t("ms"));
	else
	$("#results_fastest>td:nth-child(3)").html("");

	if(localStorage.getItem("stats_space_task_rate"+day+"/"+month))
	$("#results_space_task>td:nth-child(2)").html(localStorage.getItem("stats_space_task_rate"+day+"/"+month)+" %");
	else
	$("#results_space_task>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_space_task_rate_best"))
	$("#results_space_task>td:nth-child(3)").html(localStorage.getItem("stats_space_task_rate_best")+" %");
	else
	$("#results_space_task>td:nth-child(3)").html("");
/////////////

	if(localStorage.getItem("stats_schulte_table_time"+day+"/"+month))
	{
		var cur_time = localStorage.getItem("stats_schulte_table_time"+day+"/"+month);
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
		$("#results_schulte_table_size>td:nth-child(2)").html(localStorage.getItem("stats_schulte_table_size"+day+"/"+month)+"x"+localStorage.getItem("stats_schulte_table_size"+day+"/"+month));
		$("#results_schulte_table_time>td:nth-child(2)").html(Math.floor(cur_time/60)+':'+sec());
	}
	else
	{
		$("#results_schulte_table_size>td:nth-child(2)").html("");
		$("#results_schulte_table_time>td:nth-child(2)").html("");
	}
	if(localStorage.getItem("stats_schulte_table_best_time"))
	{
		var cur_time = localStorage.getItem("stats_schulte_table_best_time");
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
		$("#results_schulte_table_size>td:nth-child(3)").html(localStorage.getItem("stats_schulte_table_best_size")+"x"+localStorage.getItem("stats_schulte_table_best_size"));
		$("#results_schulte_table_time>td:nth-child(3)").html(Math.floor(cur_time/60)+':'+sec());
	}
	else
	{
		$("#results_schulte_table_size>td:nth-child(3)").html("");
		$("#results_schulte_table_time>td:nth-child(3)").html("");
	}
/////////////////

	if(localStorage.getItem("stats_anagram"+day+"/"+month))
	$("#results_anagrams>td:nth-child(2)").html(localStorage.getItem("stats_anagram"+day+"/"+month));
	else
	$("#results_anagrams>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_anagram_best"))
	$("#results_anagrams>td:nth-child(3)").html(localStorage.getItem("stats_anagram_best"));
	else
	$("#results_anagrams>td:nth-child(3)").html("");
//////////
	if(localStorage.getItem("stats_snapshot_mind_level"+day+"/"+month))
	$("#results_snapshot_mind>td:nth-child(2)").html(localStorage.getItem("stats_snapshot_mind_level"+day+"/"+month));
	else
	$("#results_snapshot_mind>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_snapshot_mind_best_level"))
	$("#results_snapshot_mind>td:nth-child(3)").html(localStorage.getItem("stats_snapshot_mind_best_level"));
	else
	$("#results_snapshot_mind>td:nth-child(3)").html("");
///////////
	if(localStorage.getItem("stats_find_number_time"+day+"/"+month))
	$("#results_find_number_time>td:nth-child(2)").html(localStorage.getItem("stats_find_number_time"+day+"/"+month));
	else
	$("#results_find_number_time>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_find_number_best_time"))
	$("#results_find_number_time>td:nth-child(3)").html(localStorage.getItem("stats_find_number_best_time"));
	else
	$("#results_find_number_time>td:nth-child(3)").html("");

	if(localStorage.getItem("stats_find_number_level"+day+"/"+month))
	$("#results_find_number_level>td:nth-child(2)").html(localStorage.getItem("stats_find_number_level"+day+"/"+month));
	else
	$("#results_find_number_level>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_find_number_best_level"))
	$("#results_find_number_level>td:nth-child(3)").html(localStorage.getItem("stats_find_number_best_level"));
	else
	$("#results_find_number_level>td:nth-child(3)").html("");

	if(localStorage.getItem("stats_find_number_score"+day+"/"+month))
	$("#results_find_number_score>td:nth-child(2)").html(localStorage.getItem("stats_find_number_score"+day+"/"+month));
	else
	$("#results_find_number_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_find_number_best_score"))
	$("#results_find_number_score>td:nth-child(3)").html(localStorage.getItem("stats_find_number_best_score"));
	else
	$("#results_find_number_score>td:nth-child(3)").html("");
///////////

	if(localStorage.getItem("stats_memory_lamp_level"+day+"/"+month))
	$("#results_memory_lamp_level>td:nth-child(2)").html(localStorage.getItem("stats_memory_lamp_level"+day+"/"+month));
	else
	$("#results_memory_lamp_level>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_memory_lamp_best_level"))
	$("#results_memory_lamp_level>td:nth-child(3)").html(localStorage.getItem("stats_memory_lamp_best_level"));
	else
	$("#results_memory_lamp_level>td:nth-child(3)").html("");

	if(localStorage.getItem("stats_memory_lamp_score"+day+"/"+month))
	$("#results_memory_lamp_score>td:nth-child(2)").html(localStorage.getItem("stats_memory_lamp_score"+day+"/"+month));
	else
	$("#results_memory_lamp_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_memory_lamp_best_score"))
	$("#results_memory_lamp_score>td:nth-child(3)").html(localStorage.getItem("stats_memory_lamp_best_score"));
	else
	$("#results_memory_lamp_score>td:nth-child(3)").html("");
///////////////////

	if(localStorage.getItem("stats_rotation_table_level"+day+"/"+month))
	$("#results_rotation_table_level>td:nth-child(2)").html(localStorage.getItem("stats_rotation_table_level"+day+"/"+month));
	else
	$("#results_rotation_table_level>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_rotation_table_best_level"))
	$("#results_rotation_table_level>td:nth-child(3)").html(localStorage.getItem("stats_rotation_table_best_level"));
	else
	$("#results_rotation_table_level>td:nth-child(3)").html("");

	if(localStorage.getItem("stats_rotation_table_score"+day+"/"+month))
	$("#results_rotation_table_score>td:nth-child(2)").html(localStorage.getItem("stats_rotation_table_score"+day+"/"+month));
	else
	$("#results_rotation_table_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_rotation_table_best_score"))
	$("#results_rotation_table_score>td:nth-child(3)").html(localStorage.getItem("stats_rotation_table_best_score"));
	else
	$("#results_rotation_table_score>td:nth-child(3)").html("");
///////////////////

	if(localStorage.getItem("stats_memory_table_level"+day+"/"+month))
	$("#results_memory_table_level>td:nth-child(2)").html(localStorage.getItem("stats_memory_table_level"+day+"/"+month));
	else
	$("#results_memory_table_level>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_memory_table_best_level"))
	$("#results_memory_table_level>td:nth-child(3)").html(localStorage.getItem("stats_memory_table_best_level"));
	else
	$("#results_memory_table_level>td:nth-child(3)").html("");

	if(localStorage.getItem("stats_memory_table_score"+day+"/"+month))
	$("#results_memory_table_score>td:nth-child(2)").html(localStorage.getItem("stats_memory_table_score"+day+"/"+month));
	else
	$("#results_memory_table_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_memory_table_best_score"))
	$("#results_memory_table_score>td:nth-child(3)").html(localStorage.getItem("stats_memory_table_best_score"));
	else
	$("#results_memory_table_score>td:nth-child(3)").html("");
///////////////////

	if(localStorage.getItem("stats_find_unique_level"+day+"/"+month))
	$("#results_find_unique_level>td:nth-child(2)").html(localStorage.getItem("stats_find_unique_level"+day+"/"+month));
	else
	$("#results_find_unique_level>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_find_unique_best_level"))
	$("#results_find_unique_level>td:nth-child(3)").html(localStorage.getItem("stats_find_unique_best_level"));
	else
	$("#results_find_unique_level>td:nth-child(3)").html("");

	if(localStorage.getItem("stats_find_unique_score"+day+"/"+month))
	$("#results_find_unique_score>td:nth-child(2)").html(localStorage.getItem("stats_find_unique_score"+day+"/"+month));
	else
	$("#results_find_unique_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_find_unique_best_score"))
	$("#results_find_unique_score>td:nth-child(3)").html(localStorage.getItem("stats_find_unique_best_score"));
	else
	$("#results_find_unique_score>td:nth-child(3)").html("");
///////////////////

	if(localStorage.getItem("stats_speed_comparison_score"+day+"/"+month))
	$("#results_speed_comparison_score>td:nth-child(2)").html(localStorage.getItem("stats_speed_comparison_score"+day+"/"+month));
	else
	$("#results_speed_comparison_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_speed_comparison_best_score"))
	$("#results_speed_comparison_score>td:nth-child(3)").html(localStorage.getItem("stats_speed_comparison_best_score"));
	else
	$("#results_speed_comparison_score>td:nth-child(3)").html("");
///////////////////

	if(localStorage.getItem("stats_memory_comparison_level"+day+"/"+month))
	$("#results_memory_comparison_level>td:nth-child(2)").html(localStorage.getItem("stats_memory_comparison_level"+day+"/"+month));
	else
	$("#results_memory_comparison_level>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_memory_comparison_best_level"))
	$("#results_memory_comparison_level>td:nth-child(3)").html(localStorage.getItem("stats_memory_comparison_best_level"));
	else
	$("#results_memory_comparison_level>td:nth-child(3)").html("");
///////////////////

	if(localStorage.getItem("stats_color_comparison_score"+day+"/"+month))
	$("#results_color_comparison_score>td:nth-child(2)").html(localStorage.getItem("stats_color_comparison_score"+day+"/"+month));
	else
	$("#results_color_comparison_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_color_comparison_best_score"))
	$("#results_color_comparison_score>td:nth-child(3)").html(localStorage.getItem("stats_color_comparison_best_score"));
	else
	$("#results_color_comparison_score>td:nth-child(3)").html("");
///////////////////
	if(localStorage.getItem("stats_symmetry_score"+day+"/"+month))
	$("#results_symmetry_score>td:nth-child(2)").html(localStorage.getItem("stats_symmetry_score"+day+"/"+month));
	else
	$("#results_symmetry_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_symmetry_best_score"))
	$("#results_symmetry_score>td:nth-child(3)").html(localStorage.getItem("stats_symmetry_best_score"));
	else
	$("#results_symmetry_score>td:nth-child(3)").html("");
///////////////////
	if(localStorage.getItem("stats_attention_symmetry_level"+day+"/"+month))
	$("#results_attention_symmetry_level>td:nth-child(2)").html(localStorage.getItem("stats_attention_symmetry_level"+day+"/"+month));
	else
	$("#results_attention_symmetry_level>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_attention_symmetry_best_level"))
	$("#results_attention_symmetry_level>td:nth-child(3)").html(localStorage.getItem("stats_attention_symmetry_best_level"));
	else
	$("#results_attention_symmetry_level>td:nth-child(3)").html("");
///////////////////
	if(localStorage.getItem("stats_math_match_score"+day+"/"+month))
	$("#results_math_match_score>td:nth-child(2)").html(localStorage.getItem("stats_math_match_score"+day+"/"+month));
	else
	$("#results_math_match_score>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_attention_symmetry_best_level"))
	$("#results_math_match_score>td:nth-child(3)").html(localStorage.getItem("stats_attention_symmetry_best_level"));
	else
	$("#results_math_match_score>td:nth-child(3)").html("");
///////////////////
	if(localStorage.getItem("stats_nback_level"+day+"/"+month))
	{
		$("#results_nback>td:nth-child(2)").html(localStorage.getItem("stats_nback_level"+day+"/"+month));
		$("#results_nback_v>td:nth-child(2)").html(localStorage.getItem("stats_nback_v"+day+"/"+month)+" %");
		$("#results_nback_a>td:nth-child(2)").html(localStorage.getItem("stats_nback_a"+day+"/"+month)+" %");
		$("#results_nback_t>td:nth-child(2)").html(localStorage.getItem("stats_nback_t"+day+"/"+month)+" %");		
	}
	else
	{
		$("#results_nback>td:nth-child(2)").html("");
		$("#results_nback_v>td:nth-child(2)").html("");
		$("#results_nback_a>td:nth-child(2)").html("");
		$("#results_nback_t>td:nth-child(2)").html("");		
	}
	if(localStorage.getItem("stats_nback_level_best"))
	{
		$("#results_nback>td:nth-child(3)").html(localStorage.getItem("stats_nback_level_best"));
		$("#results_nback_v>td:nth-child(3)").html(localStorage.getItem("stats_nback_v_best")+" %");
		$("#results_nback_a>td:nth-child(3)").html(localStorage.getItem("stats_nback_a_best")+" %");
		$("#results_nback_t>td:nth-child(3)").html(localStorage.getItem("stats_nback_t_best")+" %");		
	}
	else
	{
		$("#results_nback>td:nth-child(3)").html("");
		$("#results_nback_v>td:nth-child(3)").html("");
		$("#results_nback_a>td:nth-child(3)").html("");
		$("#results_nback_t>td:nth-child(3)").html("");		
	}

	if(localStorage.getItem("stats_cwm_level_s"+day+"/"+month))
	{
		$("#results_cwm_l_s>td:nth-child(2)").html(localStorage.getItem("stats_cwm_level_s"+day+"/"+month));
		$("#results_cwm_d_s>td:nth-child(2)").html(localStorage.getItem("stats_cwm_d_s"+day+"/"+month)+" %");
		$("#results_cwm_r_s>td:nth-child(2)").html(localStorage.getItem("stats_cwm_r_s"+day+"/"+month)+" %");
		$("#results_cwm_t_s>td:nth-child(2)").html(localStorage.getItem("stats_cwm_t_s"+day+"/"+month)+" %");
	}
	else
	{
		$("#results_cwm_l_s>td:nth-child(2)").html("");
		$("#results_cwm_d_s>td:nth-child(2)").html("");
		$("#results_cwm_r_s>td:nth-child(2)").html("");
		$("#results_cwm_t_s>td:nth-child(2)").html("");		
	}
	if(localStorage.getItem("stats_cwm_level_s_best"))
	{
		$("#results_cwm_l_s>td:nth-child(3)").html(localStorage.getItem("stats_cwm_level_s_best"));	
		$("#results_cwm_d_s>td:nth-child(3)").html(localStorage.getItem("stats_cwm_d_s_best")+" %");	
		$("#results_cwm_r_s>td:nth-child(3)").html(localStorage.getItem("stats_cwm_r_s_best")+" %");
		$("#results_cwm_t_s>td:nth-child(3)").html(localStorage.getItem("stats_cwm_t_s_best")+" %");		
	}
	else
	{
		$("#results_cwm_l_s>td:nth-child(3)").html("");	
		$("#results_cwm_d_s>td:nth-child(3)").html("");	
		$("#results_cwm_r_s>td:nth-child(3)").html("");
		$("#results_cwm_t_s>td:nth-child(3)").html("");		
	}
	if(localStorage.getItem("stats_cwm_level_v"+day+"/"+month))
	{
		$("#results_cwm_l_v>td:nth-child(2)").html(localStorage.getItem("stats_cwm_level_v"+day+"/"+month));
		$("#results_cwm_d_v>td:nth-child(2)").html(localStorage.getItem("stats_cwm_d_v"+day+"/"+month)+" %");
		$("#results_cwm_r_v>td:nth-child(2)").html(localStorage.getItem("stats_cwm_r_v"+day+"/"+month)+" %");
		$("#results_cwm_t_v>td:nth-child(2)").html(localStorage.getItem("stats_cwm_t_v"+day+"/"+month)+" %");
	}
	else
	{
		$("#results_cwm_l_v>td:nth-child(2)").html("");
		$("#results_cwm_d_v>td:nth-child(2)").html("");
		$("#results_cwm_r_v>td:nth-child(2)").html("");
		$("#results_cwm_t_v>td:nth-child(2)").html("");		
	}
	if(localStorage.getItem("stats_cwm_level_v_best"))
	{
		$("#results_cwm_l_v>td:nth-child(3)").html(localStorage.getItem("stats_cwm_level_v_best"));
		$("#results_cwm_d_v>td:nth-child(3)").html(localStorage.getItem("stats_cwm_d_v_best")+" %");
		$("#results_cwm_r_v>td:nth-child(3)").html(localStorage.getItem("stats_cwm_r_v_best")+" %");
		$("#results_cwm_t_v>td:nth-child(3)").html(localStorage.getItem("stats_cwm_t_v_best")+" %");		
	}
	else
	{
		$("#results_cwm_l_v>td:nth-child(3)").html("");
		$("#results_cwm_d_v>td:nth-child(3)").html("");
		$("#results_cwm_r_v>td:nth-child(3)").html("");
		$("#results_cwm_t_v>td:nth-child(3)").html("");		
	}
	resize_iframe();
}

training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
