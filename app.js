const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-sunny-overcast",
  "Snow": "wi wi-day-snow",
  "mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet"
}



function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true){
  let ville;

  if(withIP){
  // 1. Choper l'adresse IP du PC qui ouvre la page : https://api.ipify.org?format=json

  const ip = await fetch('https://api.ipify.org?format=json')
    .then(resultat => resultat.json())
    .then(json => json.ip)

     ville = await fetch('http://api.ipstack.com/82.234.105.140?access_key=fbab381e1fb37aeb6b44dc2fa8c3370c&format=1' + ip)
      .then(resultat => resultat.json())
      .then(json => json.city)
}else {
  ville = document.querySelector('#ville').textContent;
}
      const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)

    displayWeatherInfos(meteo)
}

function displayWeatherInfos(data){
  const name = data.name;
  const temperature = data.main.temp;
  const conditions = data.weather[0].main;
  const description = data.weather[0].description;

  document.querySelector('#ville').textContent = name;
  document.querySelector('#temperature').textContent = Math.round(temperature);
  document.querySelector('#conditions').textContent = capitalize(description);
  document.querySelector('i.wi').className = weatherIcons[conditions];
  document.body.className = conditions.toLowerCase();
}

const ville = document.querySelector('#ville');

  ville.addEventListener('click', () => {
    ville.contentEditable = true;
  });

ville.addEventListener('keydown', (e) => {
  if(e.keyCode === 13){
    e.preventDefault();
    ville.contentEditable = false;
    main(false);
  }
})

main();
