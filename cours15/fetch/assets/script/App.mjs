import Ghibli from "./Ghibli.mjs";
import Routeur from "./Routeur.mjs";

export default class App {

    #aData;
    #URL = "https://ghibliapi.herokuapp.com";

    constructor() {
        const routeur = new Routeur();
        routeur.ajouterRoute("film", this.getFilm.bind(this));
        routeur.ajouterRoute("personnage", this.getPersonnage.bind(this));
        routeur.ajouterRoute("espece", this.getEspece.bind(this));
        routeur.ajouterRoute("emplacement", this.getEmplacement.bind(this));
        
    }

    getFilm() {
        console.log("Les films");

        const oGhibli = new Ghibli();
        const params = {
                            ressource : "films",
                            cb: this.afficherFilm.bind(this)
                        };
        let data = oGhibli.getRessource(params);
        
        console.log(data);
        
        let asyncData = oGhibli.getRessourceAsync(params).then((data)=>{
            console.log(data);
            this.afficherFilm(data);
        })
        console.log(asyncData);

    }

    getPersonnage() {
        console.log("Les personnages");
        fetch(this.#URL+"/people")
            .then((data)=> data.json())
            .then((data)=>{
                this.#aData = data;
                this.afficherPersonnage();
            });
    }

    getEspece() {
        console.log("Les espèces");
        fetch(this.#URL+"/species")
            .then((data)=> data.json())
            .then((data)=>{
                this.#aData = data;
                this.afficherEspece();
            });
    }


    async getEmplacement(){
        console.log("Emplacement");
        
        let reponse = await fetch(this.#URL+"/locations");
        this.#aData = await reponse.json();
        
        this.afficherEmplacement();
    }

    afficherFilm(data){
        if(data){
            this.#aData = data;
        }
        let chaineHTML = "";
        this.#aData.forEach(unFilm => {
            chaineHTML +=`<article class="carte">
                    <header>
                        <h2>${unFilm.title}</h2>
                    </header>
                    <img src="${unFilm.image}">
                    <div class="contenu">
                        <p>${unFilm.description}</p>
                    </div>
                </article>`;
        });
        document.querySelector(".catalogue").innerHTML = chaineHTML;
    }

    afficherPersonnage(){
        let chaineHTML = "";
        this.#aData.forEach(unPerso => {
            chaineHTML +=`<article class="carte">
                    <header>
                        <h2>${unPerso.name}</h2>
                    </header>
                    <div class="contenu">
                        <p>${unPerso.age}</p>
                    </div>
                </article>`;
        });
        document.querySelector(".catalogue").innerHTML = chaineHTML;
    }

    afficherEspece(){
        let chaineHTML = "";
        this.#aData.forEach(unEspece => {
            chaineHTML +=`<article class="carte" style="background-color:${unEspece.eye_colors}">
                    <header>
                        <h2>${unEspece.name}</h2>
                    </header>
                    <div class="contenu">
                        <p>${unEspece.eye_colors}</p>
                    </div>
                </article>`;
        });
        document.querySelector(".catalogue").innerHTML = chaineHTML;
    }
    afficherEmplacement (){
        let chaineHTML = "";
        this.#aData.forEach(unePlace => {
            chaineHTML +=`<article class="carte">
                    <header>
                        <h2>${unePlace.name}</h2>
                    </header>
                    <div class="contenu">
                        <p>${unePlace.climate}</p>
                    </div>
                </article>`;
        });
        document.querySelector(".catalogue").innerHTML = chaineHTML;
    }

}