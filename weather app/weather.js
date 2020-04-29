class Weather{
    constructor(city){
        this.api_key = 'b1aa9f29b4f04d40b0b132232200603';
        this.city = city
     }

    async getWeather(){
        const query = await fetch(`http://api.weatherapi.com/v1/current.json?q=${this.city}&key=${this.api_key}`);

        const response = await query.json();

        return{
            response
        }
     }

    changeLocation(newLoc){
        this.city = newLoc;
    }
}