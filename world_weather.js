const getPicAndWeather = async (city) => {
   getCityPicture(city);
   const data = await getWeather(city);
   createWeatheBoard(data);
}

const btn = document.querySelector('#check');

btn.addEventListener('click', function () {
   const city = document.querySelector('#city').value;
   getPicAndWeather(city);
})

const getRandNum = async (max) => {
   return await Math.round(Math.random() * max);
}

const getCityPicture = async (city) => {
   const data = await fetch(`https://api.pexels.com/v1/search?query=${city}`, {
      headers: {
         "Authorization": "563492ad6f91700001000001543dd7e9b70d4889849f4177cdab5355",
         "Content-Type": "application/json",
      },
   })

   const json = await data.json();
   const number = await getRandNum(json.photos.length);

   document.body.style.backgroundImage = `url(${json.photos[number].src.landscape})`;
   document.body.style.backgroundSize = 'cover';
   document.body.style.backgroundRepeat = 'no-repeat';
}

const getWeather = async (city) => {
   const data = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&APPID=b39deab49ef49ca7b6b320ee1ca3a91c`);
   const json = await data.json();
   return json
}

const createWeatheBoard = async (data) => {
   const div = document.querySelector('#weather_container');
   div.innerHTML = `<h3 style="text-align: center"> Weather forecast for: ${data.list[0].name}</h3><br>
   <i class="fas fa-temperature-low fa-2x"> Temperature: ${data.list[0].main.temp}C°</i><br>
   <i class="fas fa-tint fa-2x"> Humidity: ${data.list[0].main.humidity}%</i><br>
   <i class="fas fa-city fa-2x"> ${data.list[0].weather[0].main}/${data.list[0].weather[0].description}</i><br>`;
   div.style.display = 'block';
}

