 $ (function (){ 
     var apiData;
   var C = true;
   //images for the background when the weather changes
   var backgroundImg =[

'https://www.naturettl.com/wp-content/uploads/2016/07/main-how-to-photograph-lightning-900x600.jpg',
'https://www.drive-safely.net/wp-content/uploads/2017/04/the-best-vehicle-dash-camera-for-poor-weather-conditions.jpg',
'http://cdn.abclocal.go.com/content/wtvd/images/cms/automation/images/511280_1280x720.jpg',
'https://www.standard.co.uk/s3fs-public/styles/hero_tablet/public/thumbnails/image/2018/02/27/17/uksnow2702f.jpg', 
'https://farm8.static.flickr.com/7179/6887615576_4ceeb9761f_b.jpg',
'https://www.kelownanow.com/files/files/images/sunnyday.jpg',
'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/beautiful-stormy-moody-cloudy-sky-over-english-countryside-lands-matthew-gibson.jpg',
'https://s-media-cache-ak0.pinimg.com/originals/ee/73/39/ee7339daf5a94914d83bb4e4e4c9a897.jpg']    
   //time month year
   var dt = new Date()
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  $('#day').html(days[dt.getDay()]);
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
  $('#time').html((dt.getHours()>12?(dt.getHours()-12):dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());
   
function displayTemp(F,C){
    if (C) return Math.round ((F*9) / 5 + 32) +'&deg; F';
    return Math.round (F) + '&deg; C';
      }
   
 
   function render(data,C){
     var currentWeather=data.weather[0].main;
     var wind_speed=data.wind.speed;
     var currentTemp=displayTemp(data.main.temp,C);
     var humidity = data.main.humidity;
     var pressure = data.main.pressure;
     var icon = data.weather[0].icon;
      $('#wind_speed').html(wind_speed+" mPs");
      $('#currentWeather').html(currentWeather); 
      $('#currentTemp').html(currentTemp);
      $('#humidity').html(humidity+"%");
      $('#pressure').html(pressure+' mBar');
     
    
     $('#currentTemp').prepend('<img src='+ icon+'>');
   }
    $.getJSON('https://freegeoip.net/json/').done(function(location){  
     //console.log(location); works
 $('#country').html(location.country_name);   
 $('#city').html(location.city);
 $('#latitude').html(location.latitude);   
 $('#longitude').html(location.longitude); 
 $('#zip_code').html(location.zip_code);
 $('#region_code').html(location.region_code);
 $('#country_name').html(location.country_name);  
 
      
   var weaApi='https://fcc-weather-api.glitch.me/api/current?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=06986e2720ce0175dc6f87d8b897dffdf';
    $.getJSON(weaApi,function(data){
        apiData=data;
        render(apiData,C);
     //   console.log(apiData); // works
        $('#toggle').click(function(){
          C=!C
          render(data,C);
          
        })
      var id = data.weather[0].id,
      bgIndex,
      backgroundId=[299,499,599,699,799,800,906];
      backgroundId.push(id);
      bgIndex=backgroundId.sort().indexOf(id);
      
     // console.log(backgroundId);
      $('body').css('background-image','url('+backgroundImg[bgIndex]+')');
    });
                });
 });