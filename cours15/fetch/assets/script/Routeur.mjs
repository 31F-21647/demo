/**
 * Représente le routeur de l'application. 
 * Ce concept sera introduit progressivement dans les prochains cours, soyez patient!
 * @see https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh
 */
export default class Routeur{
    #routeActive;
    #routes ={}

    constructor(){
        window.addEventListener("popstate", this.dePopState.bind(this));

        document.querySelectorAll("[href^='#!/']").forEach((lien)=>{
            lien.addEventListener("click", (e)=>{
                e.preventDefault();
                let cible = e.target;
                let hash = cible.hash;
                console.log(hash)
                console.log(e);
                history.pushState({}, "", hash);
                this.changerRoute(hash);

            });
        })
    }
    /**
     * Ajoute une route
     * @param {String} route 
     * @param {Function} cb 
     */
    ajouterRoute(route, cb){
        this.#routes[route] = {cb:cb};
        console.log (this.#routes)
        
    }
    naviguer(route, redirection){
        let hash = `#!/${route}`;
        if(redirection){
            history.replaceState({}, "", hash);
        }
        else{
            history.pushState({}, "", hash);
        }
        console.log(hash, route)
        this.changerRoute(hash);
    }
    demarrer(){
        let hash = location.hash;
        if(!hash.includes("#!/")){
            hash = "#!/";
        }
        history.pushState({}, "", hash);
        this.changerRoute(hash);
        
    }

    dePopState(e){
        console.log(e);
        let hash = location.hash;
        this.changerRoute(hash);
    }
    /**
     * Appelé sur le changement du hash ou sur le click sur un lien avec un hash bang
     * 
     */
    changerRoute(hash){
        this.#routeActive = hash.match("#!/(.*)$")[1].replace("/", "");
        
        if(this.#routes[this.#routeActive]?.cb){
            this.#routes[this.#routeActive].cb();
        }
    }
}