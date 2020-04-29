const api = new Weather('Poznan');
const ui = new UI;

const modal = document.querySelector('.form-control');

// modal.addEventListener('submit', changeLocation);

// function changeLocation(e){
//     console.log(e.target.value);
    

//     e.preventDefault()
// }

document.addEventListener('DOMContentLoaded', getWeather)

// api.changeLocation('la')

document.getElementById('save-changes').addEventListener('click', e => {
    e.preventDefault()

    
    const city = document.getElementById('city').value;

    api.changeLocation(city);

    getWeather();

    $('#exampleModal').modal('hide');

})

function getWeather(){

    api.getWeather()
    .then(data => ui.paint(data.response))
    .catch(err => console.log(err))

}