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
    #coursChoisi = [];
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
    setData(data){
        console.log(this);
        console.log(data);
        this.nombre = 0;
        let index = data.findIndex(function(element){
            return (element.cle == "nombre");
        })
        if(index != -1){
            this.nombre = data[index].valeur;
        }
    }
    /**
     * Validation des données
     * @returns boolean
     */
    estValide(){
        /**
         * @todo Combien de choix ont été fait ? (est-ce que le nombre est égal à this.nombre)
         * 
         */
        let res =false;
        this.#coursChoisi = this.getData();
        
        if(this.#coursChoisi.length == this.nombre){
            res = true;
        }



        return res;
    }
    
    getData(){
        let aValeur = [];
        let select = this.parent.querySelectorAll(":checked");
        console.log(select);
        select.forEach((option)=>{
            aValeur.push(option.value)
        })
        console.log(aValeur)
        return aValeur;
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
            
            chaineHTML += `<p>Vous devez choisir ${this.nombre} cours</p>`;
            chaineHTML += `<div class="selectCours">
                                <select multiple>`;
            console.log(this.#coursChoisi)
            this.#aData.forEach((element)=>{      // Génère le HTML
                let selected = "";
                
                let bSelection =  this.#coursChoisi.includes(element.sigle);
                console.log(bSelection)
                if(bSelection){
                    selected = "selected"
                }
                console.log(selected)
                chaineHTML += `<option ${selected} value="${element.sigle}">${element.nom}</option>`;
            })
            chaineHTML += `  </select>
                            </div>`;
        }
        this.parent.innerHTML = chaineHTML; // Insert le HTML
    }
}