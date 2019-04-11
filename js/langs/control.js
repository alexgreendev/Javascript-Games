var jsonLang;

(function()
{
	if(localStorage.getItem("lang_key") && localStorage.getItem("lang_key") != "en")
	{
		switch(localStorage.getItem("lang_key"))
		{
			case "en":
			break;
			case "ru":
			jsonLang = jsonLang_ru;
			break;
			case "zh":
			jsonLang = jsonLang_zh;
			break;
			case "zh_l":
			jsonLang = jsonLang_zh_l;
			break;
			case "de":
			jsonLang = jsonLang_de;
			break;
			case "fr":
			jsonLang = jsonLang_fr;
			break;
			case "ja":
			jsonLang = jsonLang_ja;
			break;
			case "pt":
			jsonLang = jsonLang_pt;
			break;
			case "ptb":
			jsonLang = jsonLang_pt;
			break;
			case "ko":
			jsonLang = jsonLang_ko;
			break;
			case "es":
			jsonLang = jsonLang_es;
			break;
			case "it":
			jsonLang = jsonLang_it;
			break;
			case "pl":
			jsonLang = jsonLang_pl;
			break;
			case "tr":
			jsonLang = jsonLang_tr;
			break;
			case "th":
			jsonLang = jsonLang_th;
			break;
		}		
	}
})();
var langs = {};
langs.ru = function(string){
	console.log(jsonLang);
	return jsonLang[string];
	
}
var _t = function(string)
{
	if(localStorage.getItem("lang_key") && localStorage.getItem("lang_key") != "en")
	{
		for (var key in jsonLang) {
			if(key.toLowerCase() == string.toLowerCase())
			{
				return jsonLang[key]; 
			}
		}
		return string;
	}
	else
	{
		return string;
	}
}
$(document).ready(function()
{
	console.log(localStorage.getItem("lang_key"));
	switch(localStorage.getItem("lang_key"))
	{
		case "en":
		$("#lang_select").val("english");
		break;
		case "ru":
		$("#lang_select").val("русский");
		break;
		case "zh":
		$("#lang_select").val("繁体中文");
		break;		
		case "zh_l":
		$("#lang_select").val("简体中文");
		break;
		case "de":
		$("#lang_select").val("deutsche");
		break;
		case "fr":
		$("#lang_select").val("française");
		break;
		case "ja":
		$("#lang_select").val("日本語");
		break;
		case "pt":
		$("#lang_select").val("portugues");
		break;
		case "ptb":
		$("#lang_select").val("português brasileiro");
		break;
		case "ko":
		$("#lang_select").val("한국어");
		break;
		case "es":
		$("#lang_select").val("español");
		break;
		case "it":
		$("#lang_select").val("italiano");
		break;		
		case "pl":
		$("#lang_select").val("polski");
		break;
		case "tr":
		$("#lang_select").val("türkçe");
		break;
		case "th":
		$("#lang_select").val("ไทย");
		break;
	}
	$("#lang_select").change(function()
	{
		switch($(this).val())
		{
			case "english":
			localStorage.setItem("lang_key", "en");
			break;
			case "русский":
			localStorage.setItem("lang_key", "ru");
			break;
			case "繁体中文":
			localStorage.setItem("lang_key", "zh");
			break;			
			case "简体中文":
			localStorage.setItem("lang_key", "zh_l");
			break;
			case "deutsche":
			localStorage.setItem("lang_key", "de");
			break;
			case "française":
			localStorage.setItem("lang_key", "fr");
			break;
			case "日本語":
			localStorage.setItem("lang_key", "ja");
			break;
			case "portugues":
			localStorage.setItem("lang_key", "pt");
			break;
			case "português brasileiro":
			localStorage.setItem("lang_key", "ptb");
			break;
			case "한국어":
			localStorage.setItem("lang_key", "ko");
			break;
			case "español":
			localStorage.setItem("lang_key", "es");
			break;
			case "italiano":
			localStorage.setItem("lang_key", "it");
			break;
			case "polski":
			localStorage.setItem("lang_key", "pl");
			break;
			case "türkçe":
			localStorage.setItem("lang_key", "tr");
			break;
			case "ไทย":
			localStorage.setItem("lang_key", "th");
			break;
		}
		location.reload(); 
	});
});