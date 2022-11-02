/**
 * Représente le routeur de l'application. 
 * Ce concept sera introduit progressivement dans les prochains cours, soyez patient!
 * @see https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh
 */
export default class Routeur{
    #routeActive;
    #routes ={}

    constructor(){
        window.addEventListener("hashchange", this.changerRoute.bind(this));
        /*document.querySelectorAll("[href^='#!/']").forEach((lien)=>{
            lien.addEventListener("click", this.changerRoute.bind(this));
        })*/
    }
    /**
     * Ajoute une route
     * @param {String} route 
     * @param {Function} cb 
     */
    ajouterRoute(route, cb){
        this.#routes[route] = {cb:cb};
        //console.log (this.#routes)
    }
    /**
     * Appelé sur le changement du hash ou sur le click sur un lien avec un hash bang
     * @param {HashChangeEvent} e 
     */
    changerRoute(e){
        console.log(e);
        this.#routeActive = window.location.hash.match("#!/(.*)$")[1].replace("/", "");
        //console.log(this.#routeActive)
        if(this.#routes[this.#routeActive]?.cb){
            this.#routes[this.#routeActive].cb();
        }
    }
}