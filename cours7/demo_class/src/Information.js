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
                valeur : "Jonathan",
                domElement : null,
                fctValidation : [this.validerNonNull.bind(this), this.validerAlphaNum.bind(this)]
            },
            {
                nom: "courriel",
                etiquette:"Courriel : ",
                type: "email",
                valeur : "a@a",
                domElement : null,
                fctValidation : function(){
                    //console.log("Courriel ok");
                    return true;
                }
                
            },
            {
                nom: "naissance",
                etiquette:"Date de naissance : ",
                type: "date",
                valeur : "",
                domElement : null,
                //cbValidation : this.validerDate,
            }
            ,
            {
                nom: "nombre",
                etiquette:"Nombre de cours : ",
                type: "number",
                valeur : "4",
                domElement : null,
                fctValidation : function(domElement){
                    //console.log("Toto")
                    let res = false;
                    
                    if(domElement.value > 0 && domElement.value <= 4){
                        res = true;
                    }
                    //console.log(res);
                    return res;
                },
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
     * 
     * @returns boolean
     */
    estValide(){
        
        let aValide = [];       // Tableau qui contient les boolean de validation

        // Pour chaque élément
        this.#aData.forEach(function(element){
            if(element.domElement){ // Lecture des valeurs inscrits dans le DOM
                element.valeur = element.domElement.value;
            }
            // si l'élément a une ou des fonctions de validation
            if(element.fctValidation){
                // Si c'est un tableau de fonction de validation
                if(Array.isArray(element.fctValidation))
                {
                    // Appel chaque fonction de validation et passe le domElement (pour lire la valeur)
                    for (let uneFonctionDeValidation of element.fctValidation){
                        let bValide = uneFonctionDeValidation(element.domElement);
                        aValide.push(bValide);  // Ajoute le résultat dans le tableau final
                    }
                    /*element.fctValidation.forEach(function(uneFonctionDeValidation){
                        uneFonctionDeValidation(element.domElement);
                    });*/
                }
                // S'il y a une seule fonction de validation
                else{
                    let bValide = element.fctValidation(element.domElement);
                    aValide.push(bValide);
                }
            }


        })
        //debugger;
        //console.log(this.#aData)
        //console.dir(this.#aData)
        
        // Retourne true si l'ensemble des valeurs sont true
        return aValide.every(function(chaqueCas){
            return (chaqueCas == true);
        });
/*
        
        console.log(res);
        return res;*/
    }
    /**
     * Fonction de validation
     * @param {HTMLElement} domElement 
     * @returns 
     */
    validerNonNull(domElement){
        let res = false
        if(domElement.value != ""){
            res = true;
        }
        //console.log(this);
        //console.log(domElement);
        //console.log("Non null")
        return res;
    }
    
    /**
     * Fonction de validation
     * @param {HTMLElement} domElement 
     * @returns 
     */
    validerAlphaNum(domElement){
        //console.log("alpha num")
        return true;
    }
   
   

    /**
     * Fonction qui retourne les données du composants
     */
    getData(){
        const aRes = [];
        // Génèrer les données pour retourner les composants.
        this.#aData.forEach((unElement)=>{
            let oRes = {
                cle:unElement.nom,
                valeur:unElement.valeur
            }
            aRes.push(oRes);
        })
        
        return aRes;

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
                chaineHTML += `<p><label for="${element.nom}">${element.etiquette}</label><input type="${element.type}" value="${element.valeur}" name="${element.nom}"></p>`;
            })
        }
        
        this.parent.innerHTML = chaineHTML; // Insert le HTML
        this.#aData.forEach(function(element){
            element.domElement = document.querySelector(`[name='${element.nom}']`);
            //console.log(element);
        })
    }
}