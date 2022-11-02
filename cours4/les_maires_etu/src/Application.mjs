import Maire from "./Maire.mjs";
import {mairesMTL } from "./mairesdata.js";

export default class Application {
    
    /**
     * Constructeur de la classe Application
     * Le constructeur attache les écouteurs d'événement sur les bonnes méthodes de l'application
     * Il instancie l'objet Maire.
     */
    constructor() {
        console.log(mairesMTL);
        this.oMaireMtl = new Maire(mairesMTL);
        
        document.querySelector(".btn-recherche-date").addEventListener("click", this.rechercheParDate.bind(this));
        document.querySelector(".btn-recherche-nom").addEventListener("click", this.rechercheParNom.bind(this));
        /*document.querySelector(".btn-recherche-date").addEventListener("click", ()=>{
            let resultat = this.oMaireMtl.rechercheMaires({type:"date", valeur:"2013"});
            console.log(this)
            console.log(resultat);
        });*/
        
        //let resultat = oMaireMtl.rechercheMaires({type:"date", valeur:"2013"});
        //resultat = oMaireMtl.rechercheMaires({type:"nom", valeur:"Coderre"});
        //console.log(resultat);

    }
    /**
    Mettre les autres méthodes ici.
    */

    rechercheParDate (){
        let recherche = {
                            type:"date", 
                            valeur:""
                        }

        recherche.valeur = document.querySelector(".champ-recherche").value
        let resultat = this.oMaireMtl.rechercheMaires(recherche);
        //console.log(this)
        console.log(resultat);
        this.afficherResultats(resultat);
        
    }
    rechercheParNom (){
          
    }

    afficherResultats(resultats){
        let chaineHTML = "";
        resultats.forEach(unMaire => {
            chaineHTML += `<tr><td>${unMaire.nom}</td><td>${unMaire.prenom}</td><td>${unMaire.debut}</td><td>${unMaire.fin}</td></tr>`
        });
        
        
        document.querySelector(".tbl-resultat").insertAdjacentHTML("beforeend", chaineHTML);
    }
  }