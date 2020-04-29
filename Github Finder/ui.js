class UI{
    constructor(){
        this.profile = document.getElementById('profile')
    }

    setProfile(user){
        this.profile.innerHTML = `
        <div class= "card card-body mb-3">
            <div class= "row">
                <div class= "col-md-3">
                    <img class= "img-fluid mb-2" src="${user.avatar_url}"></img>
                    <a href= "${user.html_url}" class= "btn btn-primary btn-black mb-4" target= "_blank">View Profile</a>
                </div>
                <div class= "col-md-9">
                    <span class= "badge badge-primary">Public Repos: ${user.public_repos}</span>
                    <span class= "badge badge-secondary">Public Gists: ${user.public_gists}</span>
                    <span class= "badge badge-success">Followers: ${user.followers}</span>
                    <span class= "badge badge-info mt-2">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Name: ${user.name}</li>
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                    </ul>
                </div>            
            </div>
        </div>
        <h3 class= "page-heading">Latest Repositories</h3>
        <div id="repos"></div>
        `
    }

    setDefault(){
        this.profile.innerHTML = ''
    }

    clearAlert(){
        const alert = document.querySelector('.alert');

        if(alert){
            alert.remove()
        }
    }

    showAlert(){
        this.clearAlert();
        
        this.profile.innerHTML = '';
        const card = document.querySelector('.search');
        const h1 = document.querySelector('h1');
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.appendChild(document.createTextNode(`User don't exists`))

        card.insertBefore(alert,h1);
        setTimeout(()=> alert.remove(), 2000);
    }

    setRepos(repos){
        let output = ''

        repos.forEach(repo => {
            output += `
            <div class= "card card-body mb-2">
                <div class= "row">
                    <div class= "col-md-6 mt-2">
                        <a href= "${repo.html_url}" target= "_blank">Repo name: ${repo.name}</a>
                    </div>
                    <div class= "col-md-6">
                        <span class= "badge badge-primary">Stars: ${repo.stargazers_count}</span>
                        <span class= "badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                        <span class= "badge badge-info mt-1">Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>
            `    
        });

        document.getElementById('repos').innerHTML= output;

    }
}