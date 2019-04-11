var message = '';
/*
function log(msg) {
  message = message + msg + '<br>';
  document.getElementById('logs').innerHTML = message;
}*/
//var gui = require('nw.gui');
var greenworks;
var cur_platform = navigator.platform;
function testSteamAPI() {
  //var os = require('os');
/*
    if(!(cur_platform.toLowerCase().indexOf('mac') + 1))
    {
      greenworks = require(gui.App.dataPath+'/lib/greenworks.js');         
    }
    else
    {
      var path_ = process.cwd().split("BrainSharpness71.app")[0];
      greenworks = require(path_+'temp/Default/lib/greenworks.js');         
    }*/
  /*
  if (!greenworks) {
  } else {
    if (!greenworks.initAPI()) {
    } else { 

      greenworks.on('game-overlay-activated', function(is_active) {  });
      greenworks.on('steam-servers-connected', function() {  });
      greenworks.on('steam-servers-disconnected', function() {  });
      greenworks.on('steam-server-connect-failure', function() { });
      greenworks.on('steam-shutdown', function() {  });*/
/*
      greenworks.saveTextToFile('test_file.txt', 'test_content',
          function() { },
          function(err) {  });

      greenworks.readTextFromFile('test_file.txt', function(message) {
           }, function(err) {
           });


      

    }
  }*/
}

document.addEventListener('DOMContentLoaded', function() { testSteamAPI() });

var fps = 30;
function forceRefresh() {
  // this function updates the renderer at a given frame rate, even if the user is idle.
  // without this function, the Steam overlay would feel like "frozen".
  setTimeout(function() {
    document.getElementById("forceRefresh").getContext("2d").clearRect(0, 0, 1, 1);
    window.requestAnimationFrame(forceRefresh);
  }, 1000 / fps);
}

function save_result(name_stats, result)
{
  /*
  if(greenworks.initAPI())
  {
    try{
      greenworks.setStat("stat_"+name_stats, result);
    } catch(e) {
      console.log(e.name)
    }

    var data = {};
    data.appid = 856980;
    data.score = result;
    switch(name_stats)
    {
      case "attention_symmetry":
      data.leaderboardid = 2648626;
      break;
      case "color_comparison":
      data.leaderboardid = 2648633;
      break;
      case "find_unique":
      data.leaderboardid = 2648623;
      break;
      case "math_match":
      data.leaderboardid = 2648638;
      break;
      case "memory_comparison":
      data.leaderboardid = 2648618;
      break;
      case "memory_lamp":
      data.leaderboardid = 2648616;
      break;
      case "memory_table":
      data.leaderboardid = 2648637;
      break;
      case "rotation_table":
      data.leaderboardid = 2648635;
      break;
      case "speed_comparison":
      data.leaderboardid = 2648629;
      break;
      case "speed_symmetry":
      data.leaderboardid = 2648634;
      break;
    }
    data.steamid = greenworks.getSteamId().steamId;
    
    $.ajax({
      type: 'POST',
      url: 'http://polypack-ufa.ru/ajax/30495f3vu83jc9jc39jcj39.php',
      data: data
      //success: success
    });*/
    /*
    function success(data, textStatus, jqXHR)
    {
      console.log(data);
      console.log(textStatus);
      console.log(jqXHR);
    }*/
  //}
}


