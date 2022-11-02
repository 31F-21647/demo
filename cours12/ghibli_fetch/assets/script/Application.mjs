//import {dataGhibli} from "../data/film.js";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";


export default class Application{
    /**
     * contient les données propres à l'application
     */
    #aData;
    
    constructor(){
        fetch("https://ghibliapi.herokuapp.com/films").then((data)=>data.json()).then((dataGhibli)=>{
            this.#aData = dataGhibli;  
            console.log(this.#aData)
            const noeudCatalogue = document.querySelector(".catalogue");
            const noeudFiltre = document.querySelector(".liste-categorie");

            const oCatalogue = new Catalogue(noeudCatalogue);           // Instanciation du catalogue
            oCatalogue.setFilms(this.#aData);       // Ajoute les données dans le catalogue
            oCatalogue.rendu();                     // Appel la fonction d'affichage du catalogue

            const oFiltre = new Filtre(noeudFiltre);    // Le module Filtre
            oFiltre.setCat(this.#aData);                // Les données qui permettent de créer les filtres
            oFiltre.rendu();          
            
             // Section qui gère les événements sur les filtres
            noeudFiltre.addEventListener("click", (e)=>{
                let cible = e.target;   
                if(cible.classList.contains("choixFiltre")){    // Si l'utilisateur a cliqué sur un des choix de filtre
                    const dataFiltre = {    
                                        cat : cible.dataset.jsCat,      // La catégorie du filtre (propriété a filtrer)
                                        valeur : cible.dataset.jsCatValeur  // La valeur du filtre
                                        };
                    const aFilmsFiltre = oFiltre.appliquerFiltre(this.#aData, dataFiltre);  // Appliquer le filtre
                    oCatalogue.setFilms(aFilmsFiltre);  // Passer les nouveaux films au catalogue
                    oCatalogue.rendu();     // Affiche les films
                }
                console.log(this)
            });// Affiche les filtres
        })
        //this.#aData = dataGhibli;  
        
        
        // Test de filtre, est maintenant fait dans la classe Filtre
        //const aFilmsFiltre = this.#aData.filter((film)=>{
        //    return (film.release_date >= 1);
        //});
        

        //const oCatalogue = new Catalogue(noeudCatalogue);           // Instanciation du catalogue
        //oCatalogue.setFilms(this.#aData);       // Ajoute les données dans le catalogue
        //oCatalogue.rendu();                     // Appel la fonction d'affichage du catalogue

        //const oFiltre = new Filtre(noeudFiltre);    // Le module Filtre
        //oFiltre.setCat(this.#aData);                // Les données qui permettent de créer les filtres
        //oFiltre.rendu();                            // Affiche les filtres

       
    }
}