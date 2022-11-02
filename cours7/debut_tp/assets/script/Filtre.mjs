export default class Filtre{
    /**
     * Contient le noeud d'insertion du composant
     * @type HtmlElement
     * @public
     */
    domParent;

    /**
     * Les données du composant
     * @type {Array}
     * @private
     */
    #aData;
    
    /**
     * Configuration de la classe Filtre
     * @param {HTMLElement} domParent 
     */
    constructor(domParent){
        this.domParent = domParent;

    }

    /**
     * 
     * @param {Array} data 
     * @param {Object} oCatFiltre 
     * @param {String} oCatFiltre.cat - Nom de la propriété à filtrer
     * @param {String} oCatFiltre.valeur - Valeur pour le filtre
     * @returns {Array} - Les données filtrées
     */
    appliquerFiltre(data, oCatFiltre){
        
        const aFilmsFiltre = data.filter((film)=>{
            return (film[oCatFiltre.cat] == oCatFiltre.valeur);
        });
        return aFilmsFiltre;
    }

    /**
     * Création des valeurs de filtre
     * @param {Array} data 
     */
    setCat(data){

        let valeurFiltre = [];      // Pas de valeur initiale
        // Récupère l'ensemble des valeur du champs "release_date"
        data.forEach((film)=>{
            valeurFiltre.push(film.release_date);
        })
        console.log(valeurFiltre);

        valeurFiltre = [...new Set(valeurFiltre)];  // Pour récupérer les valeurs uniques (retire les doublons)
        this.#aData = [];   // Vider le tableau de filtre initial

        // Crée le tableau des valeurs de filtre (pour afficher dans le DOM)
        valeurFiltre.forEach((element)=>{
            this.#aData.push(
                {
                    valeur : element, 
                    etiquette : element
                });
        });
        
        console.log(valeurFiltre);

    }

    /**
     * Permet de faire le rendu des filtres dans l'application en fonction des données
     */
    rendu(){
        let chaineHMTL = `<div>Date de sortie<span class="material-icons">arrow_drop_down</span>`;
                 
        this.#aData.forEach(cat => {
            chaineHMTL += `<li class="choixFiltre" data-js-cat="release_date" data-js-cat-valeur="${cat.valeur}" 
                                data-js-actif="0">${cat.etiquette}</li>`
        });
        chaineHMTL += `</div>`;
        this.domParent.innerHTML = chaineHMTL;
    }
}