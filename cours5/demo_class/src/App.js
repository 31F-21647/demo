import Horaire from "./Horaire.js";
import Inscription from "./Inscription.js";
import Information from "./Information.js";



/**
 * @todo Faire le composant Horaire
 * @todo Réaliser la logique du partage des informations entre les composants (information, inscription, horaire)
 * @todo Corriger les incohérences dans le partage des données (interne ou externe au composant?)
 * @todo 
 */


/**
 * Classe représentant l'application principale.
 */
export default class App {
    /**
     * @type {cours[]}
     */
    data;   

    /**
     * Tableau des modules qui représentent la séquence de l'inscription.
     * @type {Array}
     */
    #aSequence = [];
    /**
     * Crée l'application
     * @param {cours[]} data - Le tableau de donnée représentant les cours
     */
    constructor(data){
        this.data = data;   

        const btnProchain = document.querySelector("[data-js-prochain]");   // Bouton prochain
        btnProchain.addEventListener("click", this.changerPage.bind(this)); // Attacher sur le gestionnaire changerPage.
        this.#aSequence.push(new Information(document.querySelector('.information'), true));   // Création de l'objet Information, avec le point d'insertion.
        
        // Instanciaation du module Inscrption
        let inscription = new Inscription(document.querySelector('.inscription'), false, data);  
        this.#aSequence.push(inscription);  // Ajouter à la séquence
        
        // Pointeur de panneau/module actif. 
        this.indexPanneau = 0;
        //new Horaire()
        //new Inscription();
        //this.data = data;

        // Démo sur lequel nous reviendrons au prochain cours 
        /*document.querySelectorAll("[data-panneau]").forEach((element)=> {
            element.addEventListener("click", (e)=>{
                console.log(e.target.dataset.panneau);
                this.#aSequence.forEach(element=>element.activer(false))
                this.#aSequence[e.target.dataset.panneau].activer(true)
            });
        })*/
    }

    /**
     * Appeler sur le clique du bouton suivant. Gère l'affichage et le passage d'un module à l'ordre
     */
    changerPage(){
        // Si le panneau/module actif est valide...
        if(this.#aSequence[this.indexPanneau].estValide()){
            // Le désactiver
            this.#aSequence[this.indexPanneau].activer(false);
            // Passer au prochain
            this.indexPanneau++;
            // Pour gérer la limite (pour l'instant, ça boucle)
            if( this.indexPanneau >= this.#aSequence.length){ 
                this.indexPanneau = 0;  // Remettre à 0
            }
            // Activer le panneau qui doit être actif.
            this.#aSequence[this.indexPanneau].activer(true);
            
        }
    }
}
