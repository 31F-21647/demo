export default class Inscription{
    /**
     * Contient l'élément parent qui contiendra le module.
     * @type HTMLElement
     */
    parent = "";
    
    /**
     * Données du composant
     * @type Array
     * @private
     */
    #aData = [];
    
   /**
     * Propriété qui représente l'état du composant (actif ou non)
     * @type boolean
     * @private
     */
    #bActif;
    
    /**
     * Constructeur
     * @param {HTMLElement} domParent - Le noeud ou l'élément dans lequel insérer le dom
     * @param {boolean} rendu - Est-ce que le composant est dessiné (rendu) lors de sa création
     * @param {?Array} data - Jeu de données du composant
     */
    constructor(domParent, rendu, data){
        this.parent = domParent;
        console.log("nouvel inscription")
        this.#bActif = rendu;
        if(data){
            this.#aData = data;
        }

        if(this.#bActif){
            this.render();  // Dessine le DOM
        }
    
    }
    /*setData(data){
        this.#aData = data;
    }*/
    /**
     * Validation des données
     * @returns boolean
     */
    estValide(){
        return true;
    }
    
    /**
     * Activer ou désactiver le composant
     * @param {boolean} actif 
     */
      activer(actif){
        this.#bActif = actif;
        this.render();
    }

    /**
     * Dessine le dom selon les données et le parent
     */
    render(){
        let chaineHTML = "";
        if(this.#bActif){
            chaineHTML = `<legend>Inscriptions</legend>`;    
            chaineHTML += `<div class="selectCours">
                                <select multiple>`;
            this.#aData.forEach((element)=>{      // Génère le HTML
                chaineHTML += `<option value="${element.sigle}">${element.nom}</option>`;
            })
            chaineHTML += `  </select>
                            </div>`;
        }
        this.parent.innerHTML = chaineHTML; // Insert le HTML
    }
}