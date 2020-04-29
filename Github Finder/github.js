class HTTP{
    constructor(){
        this.clientId = '320dde619615d491a2b3';
        this.clientSecret = 'd0b11fa7651c574191c735138b54734a44714a1d'
        this.reposCount = 5;
        this.reposSort = 'created: asc'
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientId}&client_secret=${this.clientSecret}`)

        const profile = await profileResponse.json();

        return {
            profile
        }
    }

    async getRepos(user){
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.reposCount}&sort=${this.reposSort}?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
        
        const repo = await reposResponse.json();

        return{
            repo
        }
    }
}