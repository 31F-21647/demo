export default class Horaire{
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
    filtre = [];
    horaireChoisi = [];
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
        console.log("nouvel horaire")
        this.#bActif = rendu;
        if(data){
            this.#aData = data;
        }

        if(this.#bActif){
            this.render();  // Dessine le DOM
        }
    
    }
    setData(data){
        this.filtre = data;
        console.log(data);
      
    }
    /**
     * Validation des données
     * @returns boolean
     */
    estValide(){
        this.horaireChoisi = {};
        let checked = this.parent.querySelectorAll(":checked");
        checked.forEach((element)=>{
            if(!this.horaireChoisi[element.dataset.sigle]){
                this.horaireChoisi[element.dataset.sigle] = [element.value];
            }
            else{
                this.horaireChoisi[element.dataset.sigle].push (element.value);
            }
            console.log(element)
        })
        console.log(this.horaireChoisi);
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
            chaineHTML = `<legend>Horaire</legend>`;
            
            this.#aData.forEach((cours)=>{
                if(this.filtre.includes(cours.sigle)) {
                    chaineHTML += `<p>${cours.nom}</p>`;
                    cours.horaire.forEach((heure)=>{
                        let checked = "";
                        if(cours.sigle in this.horaireChoisi && this.horaireChoisi[cours.sigle].includes(heure)){

                            checked = "checked";
                        }
                        chaineHTML += `<p><input ${checked} type="checkbox" data-sigle="${cours.sigle}" name="horaire['${cours.sigle}']" value="${heure}">${heure}</p>`;
                    });
                }
            })
        }
        this.parent.innerHTML = chaineHTML; // Insert le HTML
    }
}