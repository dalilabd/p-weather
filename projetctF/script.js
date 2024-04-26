const APIKey = '6ea7bdb78eecc3950e3a52fefd3a20b2'
const searchTemperature = () =>{
    const city = document.getElementById("city-name").value
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayTemperature(data))
console.log(city)
    displayForCast(city);
}
const setInnerText =(id , text) =>{
    document.getElementById(id).innerText =text
   
}
window.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          const geoUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&${metric}`;
          // fetchData
          fetchData(`${geoUrl}`).then((result) => {
            let location = result.city.name + "," + result.city.country;
            let cityName = document.getElementById("city");
            cityName.innerHTML = `<h1>${location}</h1>`;
            const dayOne = document.getElementById("date");
            displayForCast(result.city.name);
            const options = {
              weekday: "long",
            };
            let fdate = new Date();
            console.log(fdate);
            fdate.setDate(fdate.getDate());
            fdate = fdate.toLocaleDateString("en-US", options);
            dayOne.innerHTML = `<h1>${fdate}</h1>`;
            //day1
            const dayun = document.getElementById("dayun");
            dayun.innerHTML = days[0];
            //weather icon
            const dayunImg = document.getElementById("dayunImg");
            dayunImg.src = `https://openweathermap.org/img/wn/${result.list[0].weather[0].icon}.png`;
            //weather day1
            const dayunW = document.getElementById("dayunW");
            dayunW.innerHTML = `<h1>${result.list[0].main.temp}°C</h1>`;
  
            //day2
            const day2 = document.getElementById("day2");
            day2.innerHTML = days[1];
            //weather icon
            const day2Img = document.getElementById("day2Img");
            day2Img.src = `https://openweathermap.org/img/wn/${result.list[5].weather[0].icon}.png`;
            //weather day2
            const day2W = document.getElementById("day2W");
            day2W.innerHTML = `<h1>${result.list[5].main.temp}°C</h1>`;
             
            console.log(result.list[5].main.temp);
  
            //day3
            const day3 = document.getElementById("day3");
            day3.innerHTML = days[2];
            //weather icon
            const day3Img = document.getElementById("day3Img");
            day3Img.src = `https://openweathermap.org/img/wn/${result.list[13].weather[0].icon}.png`;
            //weather day2
            const day3W = document.getElementById("day3W");
            day3W.innerHTML = `<h1>${result.list[13].main.temp}°C</h1>`;
  
  
            //day4
            const day4 = document.getElementById("day4");
            day4.innerHTML = days[3];
            //weather icon
            const day4Img = document.getElementById("day4Img");
            day4Img.src = `https://openweathermap.org/img/wn/${result.list[21].weather[0].icon}.png`;
            //weather day4
            const day4W = document.getElementById("day4W");
            day4W.innerHTML = `<h1>${result.list[21].main.temp}°C</h1>`;
  
  
  
            //day5
            const day5 = document.getElementById("day5");
            day5.innerHTML = days[4];
            //weather icon
            const day5Img = document.getElementById("day5Img");
            day5Img.src = `https://openweathermap.org/img/wn/${result.list[29].weather[0].icon}.png`;
            //weather day5
            const day5W = document.getElementById("day5W");
            day5W.innerHTML = `<h1>${result.list[29].main.temp}°C</h1>`;
  
  
            console.log(result);
          }).catch((error) => {
            console.error("Error fetching data:", error);
          });
  
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        function (error) {
          console.error("Error getting location: " + error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  
  });
  
const displayTemperature = temperature =>{
    console.log(temperature)
    setInnerText('city',temperature.name)
    setInnerText('weather',temperature.weather[0].main)
    setInnerText('temp',temperature.main.temp)
    setInnerText('wind',temperature.wind.speed)
    setInnerText('humidity',temperature.main.humidity)
    
    const url2 =`https://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    const imgIcon = document.getElementById("image-icon")
    imgIcon.setAttribute('src',url2)
    
}
let metric = "units=metric";
function displayForCast(city){

    const forcastUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&${metric}`;
    
    fetch(forcastUrl)
    
    .then(response => response.json())
    .then(data =>{
     
       console.log(data);
       const forecastByDate=[];
       const fiveForecastDay=data.list.filter(responseLigne=>{
           const date = new Date(responseLigne.dt_txt).getDate()
           if(!forecastByDate.includes(date)){
             return  forecastByDate.push(date)
           }
       })
       // filtrer les dates
       const forecastsDays = fiveForecastDay.map(el => {
           const date = new Date(el.dt_txt).toLocaleString('fr-FR',{weekday:'long'});
           return date;
       });
       // console.log(forecastsDays)
       forecastsDays.forEach(el => {
           console.log("Date:", el.date);
       })
       //filtrer par température
       const forecastsTemp = fiveForecastDay.map(el => {
           const temperature = el.main.temp;
           return temperature;
       })
       forecastsTemp.forEach(el => {
           console.log("Température:", el.temperature);
       })
    
     // Récupérer l'élément canvas
    
    const ctx = document.getElementById('myChart');
    
    // Vérifier si l'élément canvas existe
    if (ctx) {
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }
    
        // Créer un nouveau graphique
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: forecastsDays,
                datasets: [{
                    label: 'Température',
                    data: forecastsTemp,
                    borderWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'blue dark'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        var i;
        for(i=1;i<6;i++){

            let forCastHtml = `
        
            <div class="card2">
            <div class="weather">
              <div class="date1" id="dayun">${forecastsDays[i]}</div>
              <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" class="weather-icon" id="dayunImg">
              <h1 class="temp" id="dayunW">${forecastsTemp[i]}°C</h1>
            </div>
          </div>  


            `; 
        document.getElementById("dayun1").innerHTML += forCastHtml ;}
        
    } else {
        console.error("L'élément canvas avec l'ID 'myChart' n'a pas été trouvé.");
    }
    
    
    
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('City not found. Please try again.');
    });
    
    }