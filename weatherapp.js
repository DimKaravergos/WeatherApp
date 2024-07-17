
const apiKey = "a545bc406c9e96e34a158f8b7a1c6557";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const card = document.querySelector(".card");
const background = document.querySelector(".background");
const weatherAudio = document.querySelector("#weather-audio");
    
    

    function getWindDirection(degree) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degree / 22.5) % 16;
        return directions[index];
    }

        async function checkWeather (city){
            const response = await fetch(apiURL + city + `&appid=${apiKey}`);

            document.querySelector(".temp").innerHTML = "--°C";
            document.querySelector(".humidity").innerHTML = "-- %";
            document.querySelector(".wind").innerHTML = "-- km/h";

            if (city === "") {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".city").style.display = "none";
                weatherIcon.src = "images/weather icon.png"
            }

            
            if (response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".city").style.display = "none";
                weatherIcon.src = "images/weather icon.png"
                
               
            } else { 
                var data = await response.json();

                console.log(searchBox.value);
        
                
                console.log(data);
           
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h, " + getWindDirection(data.wind.deg);

                card.classList.remove("clear", "clouds", "rain", "thunderstorm", "clear-text", "mist");
                if (data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png"
                card.classList.add("clouds");
                background.style.backgroundImage = "url('images/cloud background.jpg')";
                } else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear icon.png"
                card.classList.add("clear");
                card.classList.add("clear-text");
                background.style.backgroundImage = "url('images/sunny background.jpg')";
                // weatherAudio.src = "audio/Desert Theme.mp3"; // Set the audio source
                // weatherAudio.play(); // Play the audio
                } else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain icon.png"
                card.classList.add("rain");
                background.style.backgroundImage = "url('images/rain background.jpg')";
                } else if(data.weather[0].main == "Thunderstorm"){
                weatherIcon.src = "images/storm icon.png"
                card.classList.add("storm");
                background.style.backgroundImage = "url('images/Thunderstorm background.jpg')";
                }else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/misty background.png"
                card.classList.add("mist");
                background.style.backgroundImage = "url('images/misty background.jpg')";
                }

                
                
                document.querySelector(".error").style.display = "none";
                document.querySelector(".city").style.display = "block";
            }

        }

        

    searchBtn.addEventListener("click", ()=>{
        checkWeather(searchBox.value);
    })

       
//checkWeather ()  
