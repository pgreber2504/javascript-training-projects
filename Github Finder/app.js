const http = new HTTP;

const ui = new UI;

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', e => {
    inputText = e.target.value;

    if(inputText !== ''){
        
        http.getUser(inputText)
        .then(data => {
            if(data.profile.message !== 'Not Found'){
            ui.setProfile(data.profile);
            }else{
                ui.showAlert()
            }
        })

        http.getRepos(inputText)
        .then(data => ui.setRepos(data.repo));
        
    }else ui.setDefault();
}
)