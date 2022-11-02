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
    /*
    getData(){
        return this.data;
    }
    coucou(){
        console.log("Coucou!");
    }
    renderSelection(domParent){
        let chaine = "<select multiple>";
        
        this.data.forEach(function(cours){
            chaine += `<option value="${cours.sigle}">${cours.nom}</option>`;
        });
        chaine += "</select>";
        domParent.innerHTML = chaine;
    }*/
}
/*
// Version alternative avec les prototypes ou lieu de la classe ES5.
let app2 = (function(){
    function app2(data){
        this.data = data;
    }
    app2.prototype = {
                    getData : function(){
                            return this.data;
                    },
                    coucou : function(){
                        console.log("Coucou!");
                    },
                    renderSelection : function(domParent){
                        let chaine = "<select multiple>";
                        
                        this.data.forEach(function(cours){
                            chaine += `<option value="${cours.sigle}">${cours.nom}</option>`;
                        });
                        chaine += "</select>";
                        domParent.innerHTML = chaine;
                    }
                }
    return app2;
})()
*/