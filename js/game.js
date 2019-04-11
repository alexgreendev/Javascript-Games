function resize_iframe()
{
	$(function() {
    var iframe = $('.train_ifarme>iframe', parent.document.body);
    if($(document.body).height())
    iframe.height($(document.body).height());
	});	
}

$(document).ready(function()
{
	$("body>label").click(function()
	{
		resize_iframe();
	});
});
$(parent.window).on('resize', function(){
      resize_iframe();
}); 

$(document).ready(function()
{
		$('#fullscreen_btn').click(function() 
		{
		    var doc = document.documentElement,
		        state = (document.webkitIsFullScreen || document.isFullScreen),
		        requestFunc = (doc.requestFullScreen || doc.webkitRequestFullScreen),
		        cancelFunc = (document.cancelFullScreen || document.webkitCancelFullScreen);

		    if(!state)
	    	{
	    		requestFunc.call(doc)
	    		//$('iframe', parent.document).attr("scrolling", "auto");
	    	}
	    	else
    		{
    			cancelFunc.call(document);
    			//$('iframe', parent.document).attr("scrolling", "no");
    		}
		    return;
      	});
		$('#tab1').change(function () {
			if($(this).is(':checked'))
			{
				$('#content-tab1').show();
				$('#content-tab2').hide();
				$('#content-tab3').hide();
			}
			else
			{
				$('#content-tab1').hide();
			} 
			resize_iframe();
		 });
		$('#tab2').change(function () {
			if($(this).is(':checked'))
			{
				$('#content-tab2').show();
				$('#content-tab1').hide();
				$('#content-tab3').hide();
			}
			else
			{
				$('#content-tab2').hide();
			} 
			resize_iframe();
		 });
		$('#tab3').change(function () {
			if($(this).is(':checked'))
			{
				$('#content-tab3').show();
				$('#content-tab1').hide();
				$('#content-tab2').hide();
			}
			else
			{
				$('#content-tab3').hide();
			} 
			resize_iframe();
		 });
});
/*
function open_lederboard(id)
{
	try
    {
    	var gui = require('nw.gui');
        gui.Shell.openExternal("steam://openurl/https://steamcommunity.com/stats/772470/leaderboards/"+id+"/");
    }
    catch(e)
    {

    }
}*/
$(document).keydown(function(eventObject){
	if(eventObject.which == 32)
  	{
		eventObject.preventDefault();
	}
});
function getHexRGBColor(color)
{
  color = color.replace(/\s/g,"");
  var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);

  if(aRGB)
  {
    color = '';
    for (var i=1;  i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');
  }
  else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
  
  return '#'+color;
}