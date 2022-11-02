import Routeur from "./Routeur.mjs";

export default class App {

    #aData;
    #URL = "https://ghibliapi.herokuapp.com";
    #xhr;
    constructor() {
        const routeur = new Routeur();
        routeur.ajouterRoute("film", this.getFilm.bind(this));
        routeur.ajouterRoute("personnage", this.getPersonnage.bind(this));
        routeur.ajouterRoute("espece", this.getEspece.bind(this));
        
        this.#xhr = new XMLHttpRequest();
        this.#xhr.addEventListener("load", () => {
            
            console.log(JSON.parse(this.#xhr.response));
            this.#aData = JSON.parse(this.#xhr.response);
            if(this.afficher){
                this.afficher();
            }
        })
    }

    getFilm() {
        console.log("Les films");
        this.#xhr.open("GET", this.#URL + "/films");
        this.afficher = this.afficherFilm;
        this.#xhr.send();
        console.log(this.#aData);
    }

    getPersonnage() {
        console.log("Les personnages");
        this.#xhr.open("GET", this.#URL + "/people");
        this.afficher = this.afficherPersonnage;
        this.#xhr.send();
    }

    getEspece() {
        console.log("Les espèces");
        this.#xhr.open("GET", this.#URL + "/species");
        this.afficher = this.afficherEspece;
        this.#xhr.send();
    }

    afficherFilm(){
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

}