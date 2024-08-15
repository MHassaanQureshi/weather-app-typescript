const Apikey: string = "b86aa6933c3a5f81c50cad93b0823ca5";
const ApiLink: string = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

document.addEventListener("DOMContentLoaded", () => {
    const search = document.querySelector<HTMLInputElement>("#search-bar");
    const searchbtn = document.querySelector<HTMLButtonElement>("#search-but");

    // Function to check weather
    async function checkWeather(city: string): Promise<void> {
        try {
            const response = await fetch(ApiLink + city + `&appid=${Apikey}`);
            const data = await response.json();

            if (response.ok) {
                document.querySelector("#temperature-read")!.innerHTML = Math.floor(data.main.temp) + "°";
                document.querySelector("#humidity")!.innerHTML = data.main.humidity + "% Humidity";
                document.querySelector("#air")!.innerHTML = data.wind.speed + " KM/H";
                document.querySelector("#weather-type")!.innerHTML = data.weather[0].main;
                document.querySelector("#city-name")!.innerHTML = data.name;
                document.querySelector("#max")!.innerHTML = Math.floor(data.main.temp_max) + "°C";
                document.querySelector("#min")!.innerHTML = Math.floor(data.main.temp_min) + "°C";
            } else {
                alert("City not found. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching the weather data: ", error);
            alert("Something went wrong. Please try again later.");
        }
    }

    // Event listener for the search button
    searchbtn?.addEventListener("click", () => {
        if (search?.value) {
            checkWeather(search.value);
        }
    });

    // Initialize with default city
});
