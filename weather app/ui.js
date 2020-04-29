class UI{
    constructor(){
        this.location = document.getElementById('location');
        this.description = document.getElementById('description');
        this.string = document.getElementById('string');
        this.icon = document.getElementById('icon');
        this.humidity = document.getElementById('humidity')
        this.feelslike = document.getElementById('feelslike')
        this.wind = document.getElementById('wind')
        this.pressure = document.getElementById('pressure')
    }

    paint(weather){
        this.location.textContent = `${weather.location.name}, ${weather.location.country}`;
        this.description.textContent = `${weather.current.condition.text}`;
        this.string.textContent = `${weather.current.temp_c}°C`;
        this.icon.setAttribute('src', `${weather.current.condition.icon}`);
        this.humidity.textContent = `Humidity: ${weather.current.humidity}` 
        this.feelslike.textContent = `Fellslike Temperature: ${weather.current.feelslike_c}°C`;
        this.wind.textContent = `Wind: ${weather.current.wind_kph}km/h. Direction: ${weather.current.wind_dir}`;
        this.pressure.textContent = `Pressure: ${weather.current.pressure_mb} hPa`;
    }
}