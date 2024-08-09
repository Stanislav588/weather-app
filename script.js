const searchBtn = document.querySelector(".weather-btn");
const container = document.querySelector(".weather-info");
const error404 = document.querySelector(".not-found");
const weather = document.querySelector(".weather");
searchBtn.addEventListener("click", () => {
  const APIKey = "365305409f88367546c62d0994f9951f";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const img = document.querySelector(".weather-img");
      const temperature = document.querySelector(".temperature span");
      const desc = document.querySelector(".description");
      const humidity = document.querySelector(".humidity span");
      const wind = document.querySelector(".wind span");

      if (data.cod == "404") {
        img.classList.remove("active");
        error404.style.display = "block";
        weather.style.height = "560px";
        container.style.display = "none";
      } else {
        img.classList.add("active");
        container.style.display = "block";
        weather.style.height = "740px";
        error404.style.display = "none";
      }

      switch (data.weather[0].main) {
        case "Clear":
          img.src = "images/clear.png";
          break;
        case "Cloud":
          img.src = "images/cloud.png";
          break;
        case "Rain":
          img.src = "images/rain.png";
          break;
        case "Snow":
          img.src = "images/snow.png";
          break;
        case "Mist":
          img.src = "images/mist.png";
          break;

        default:
          img.src = "images/cloud.png";
      }
      temperature.innerHTML = `${parseInt(data.main.temp)} <span>ºC</span>`;
      desc.innerHTML = `${data.weather[0].description.toUpperCase()}`;
      humidity.innerHTML = `${data.main.humidity} % `;
      wind.innerHTML = `${parseInt(data.wind.speed)} km/h`;
    });
});
