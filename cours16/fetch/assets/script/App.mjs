import Ghibli from "./Ghibli.mjs";
import Routeur from "./Routeur.mjs";

export default class App {

    #aData;
    #URL = "https://ghibliapi.herokuapp.com";

    constructor() {
        this.routeur = new Routeur();
        this.routeur.ajouterRoute("liste", this.routeListe.bind(this));
        this.routeur.ajouterRoute("detail", this.routeDetail.bind(this));
       
        this.routeur.ajouterRoute("", ()=>{
            console.log("accueil");
            this.routeur.naviguer("liste", true);

        });
        
        this.routeur.demarrer();

        document.querySelector("[name='btn-recherche']").addEventListener("click", ()=>{
            let recherche = document.querySelector("[name='recherche']").value;
            console.log(this.routeur.getInfoRoute())
            let infoRoute = this.routeur.getInfoRoute();
            this.routeur.naviguer(infoRoute.route+"?recherche="+recherche);
        })
    }

    async routeListe(paramRequete) {
        console.log(paramRequete)
        let parametre = paramRequete.parametre;
        let aRoute = paramRequete.route;
        console.log(aRoute);
        //console.log("Les films");

        const oGhibli = new Ghibli();
        const params = {
                            ressource : "films",
                            //cb: this.afficherFilm.bind(this)
                        };
        
       
        let data = await oGhibli.getRessourceAsync(params);
        
        if(parametre.recherche){
            data = data.filter((element)=>{
                let valeur = element.title + " " + element.description + " " + element.director + " " + element.release_date;
                return valeur.includes (parametre.recherche);
            });
        }
        if(parametre.filtre){
            // Filtrer selon le paramètre
            if(parametre.valeur){
                data = data.filter((unfilm)=>{
                    return unfilm[parametre.filtre] == parametre.valeur;
                })
            }
        }
        if(parametre.tri){
            //Trier selon les paramètres
            let propTri = parametre.tri;
            data.sort((a, b)=>{
                return a[propTri].localeCompare(b[propTri]);
            })
            if(parametre.ordre == "DESC"){
                data.reverse();
            }
        } 
        // console.log(data);
        this.afficherFilm(data);
    
            
       //console.log(asyncData);

    }

    async routeDetail(paramRequete) {
        console.log(paramRequete)
        let parametre = paramRequete.parametre;
        let aRoute = paramRequete.route;
        console.log(aRoute);
        //console.log("Les films");

        const oGhibli = new Ghibli();
        const params = {
                            ressource : "films",
                            //cb: this.afficherFilm.bind(this)
                        };
        //let data = oGhibli.getRessource(params);
        // Afficher les détails d'un film
        if(aRoute[1]){
            let id = aRoute[1];
            let data = await oGhibli.getRessourceAsync(params, id);   
            console.log(data)
            this.afficherUnFilm(data);
        }
        else{ // Afficher la liste des films
            this.routeur.naviguer("liste", true);
        }
            
       //console.log(asyncData);

    }
    
    afficherFilm(data){
        if(data){
            this.#aData = data;
        }
        let chaineHTML = "";
        this.#aData.forEach(unFilm => {
            chaineHTML +=`<article class="carte">
                    <header>
                        <h2><a href="#!/detail/${unFilm.id}">${unFilm.title}</a></h2>
                    </header>
                    <!--<img src="${unFilm.image}">-->
                    <div class="contenu">
                        <p>${unFilm.description}</p>
                    </div>
                </article>`;
        });
        document.querySelector(".catalogue").innerHTML = chaineHTML;
    }
    afficherUnFilm(unFilm){
        const chaineHTML =`<article class="carte">
                <header>
                    <h2><a href="#!/film/${unFilm.id}">${unFilm.title}</a></h2>
                </header>
                <!--<img src="${unFilm.image}">-->
                <div class="contenu">
                    <p>${unFilm.description}</p>
                </div>
            </article>`;
    
        document.querySelector(".catalogue").innerHTML = chaineHTML;
    }

}