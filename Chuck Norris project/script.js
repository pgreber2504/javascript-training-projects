// document.querySelector('.form').addEventListener('submit', addData);

// function addData(e){
//     const xhr = new XMLHttpRequest();
    
//     const number = document.getElementById('input').value;
    
//     xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);
    

//     xhr.onload = function(){
//         if(this.status === 200){
//             const data = JSON.parse(this.responseText);
//             let output = '';

//             if(data.type === "success"){
//                 data.value.forEach(function(joke){
//                     output += `
//                     <li>${joke.joke}</li>
//                     `
//                 });
//                 document.querySelector('#output').innerHTML = output;

//             }else alert(ERROR);
//         }
//     }
//     xhr.send()
//     e.preventDefault();
// }


document.querySelector('.form').addEventListener('submit', addData);

function addData(e){
    const xhr = new XMLHttpRequest();

    const number = document.getElementById('input').value;

    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`,true);

    xhr.onload = function(){
        if(this.status === 200){
            const data = JSON.parse(this.responseText);

            let output = '';

            if(data.type === 'success'){
                data.value.forEach(joke => {
                    output += `
                    <li>${joke.joke}</li>
                    `
                })
                document.getElementById('output').innerHTML = output;
            }else alert('ERROR');
        }
    }
    xhr.send();
    e.preventDefault();
}

