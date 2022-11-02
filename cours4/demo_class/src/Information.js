export default class Information{
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
    data =[{
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
                nom: "genre",
                etiquette:"genre : ",
                type: "checkbox",
                valeur : "m"
            }
    ]; 
    

    /**
     * Constructeur
     * @param {HTMLElement} domParent - Le noeud ou l'élément dans lequel insérer le dom
     */
    constructor(domParent){
        this.parent = domParent;
        console.log("nouvel Information")
        this.render();  // Dessine le DOM
    }
    /**
     * Validation des données
     * @returns boolean
     */
    estValide(){
        return true;
    }

    /**
     * Dessine le dom selon les données et le parent
     */
    render(){
        let chaineHTML = `<legend>Informations personnelles</legend>`;    
         
        this.data.forEach((element)=>{      // Génère le HTML
            chaineHTML += `<p><label for="${element.nom}">${element.etiquette}</label><input type="${element.type}" name="${element.nom}"></p>`;
        })
        
        this.parent.innerHTML = chaineHTML; // Insert le HTML
    }
}