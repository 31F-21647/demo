export default class Information{
    /**
     * Contient l'élément parent qui contiendra le module.
     * @type HTMLElement
     */
    parent = "";
    /**
     * @typedef elementInformation
     * @type {object[]}
     * @property {string} nom - Le nom du champs
     * @property {string} etiquette - L'étiquette (label) du champs
     * @property {('text'|'email'|'checkbox')} type - Le type d'élément de formulaire
     * @property {string} valeur - La valeur de l'élément
     */
    /**
     * @type {elementInformation[]}
     */
    #aData =[{
                nom: "nom",
                etiquette:"Nom : ",
                type: "text",
                valeur : ""
            },
            {
                nom: "courriel",
                etiquette:"Courriel : ",
                type: "email",
                valeur : ""
            },
            {
                nom: "naissance",
                etiquette:"Date de naissance : ",
                type: "date",
                valeur : ""
            }
    ];

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
        console.log("nouvel Information")
        this.#bActif = rendu;
        if(this.#bActif){
            this.render();  // Dessine le DOM
        }
    }
    
    /**
     * Validation des données
     * @todo Écrire la logique de validation du composant
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
            chaineHTML = `<legend>Informations personnelles</legend>`;    
             
            this.#aData.forEach((element)=>{      // Génère le HTML
                chaineHTML += `<p><label for="${element.nom}">${element.etiquette}</label><input type="${element.type}" name="${element.nom}"></p>`;
            })
        }
        
        this.parent.innerHTML = chaineHTML; // Insert le HTML
    }
}