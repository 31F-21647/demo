import Horaire from "./Horaire.js";
import Inscription from "./Inscription.js";
import Information from "./Information.js";

/**
 * Classe représentant l'application principale.
 */
export default class App {
    /**
     * @type {cours[]}
     */
    data;   
    /**
     * Crée l'application
     * @param {cours[]} data - Le tableau de donnée représentant les cours
     */
    constructor(data){
        this.data = data;   
        
        this.oInfo = new Information(document.querySelector('.information'));   // Création de l'objet Information, avec le point d'insertion.
        //new Horaire()
        //new Inscription();
        //this.data = data;
    }
    
}
