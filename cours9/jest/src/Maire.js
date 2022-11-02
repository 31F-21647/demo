export default class Maire {
    /**
     * @typedef UnMaire
     * @type {object}
     * @property {string} nom - Le nom
     * @property {string} prenom - Le prénom
     * @property {number} debut - Année du début du mandat
     * @property {?number} fin - Année de fin du mandat ou null
     */

    /**
     * @type {UnMaire[]} Tableau des maires
     */
    #aMaires;

    /**
     * Création de la liste des maires
     * @param {UnMaire[]} lesMaires - Tableau des maires pour la ville
     */
    constructor (lesMaires){
        this.#aMaires = lesMaires;
    }
    
     /**
      * Retourne les résultats de la recherche
      * @param {Object} params - Objet de paramètre
      * @param {string} params.type - Le type de recherche : ["date", "nom"]
      * @param {string | Number} params.valeur - La valeur recherchée
      * @returns {UnMaire[]} - Tableau des résultats;
     */
    rechercheMaires(params){
        let resultats;
        if(params.type == "nom" && params.valeur != ""){
            let regexp = new RegExp(params.valeur, "i");
            resultats = this.#aMaires.filter((element)=>{
                return (regexp.test(element.prenom+" "+element.nom));
                //return (element.nom == params.valeur || element.prenom == params.valeur);
            })
        }
        if(params.type == "date" && params.valeur != ""){
            resultats = this.#aMaires.filter((element)=>{
                return (element.debut <= params.valeur && (element.fin >= params.valeur || element.fin === null ));
            })
        }

        return resultats;
    }
    /**
     * @private
     * Tri le tableau passé en paramètre par nom
     * @param {array} data - Le tableau de données à trier
     * @param {string} ordre - L'ordre du tri : ["ASC", "DESC"]
     */
    #trierNom(data, ordre){
        data.sort((a,b)=> {
            let res = 0;
            if(a.nom > b.nom){
                res = 1;
            }
            else if(a.nom < b.nom){
                res = -1;
            }
            return res;
        } );

        if(ordre === "DESC"){
            data.reverse();
        }

    }
    
    /**
     * @private
     * Tri le tableau passé en paramètre par date
     * @param {array} data - Le tableau de données à trier
     * @param {string} ordre - L'ordre du tri : ["ASC", "DESC"]
     */
    #trierDate(data, ordre){
        data.sort((a,b)=> a.debut-b.debut);

        if(ordre === "DESC"){
            data.reverse();
        }

    }

    /**
     * Retourne la liste des maires trié selon les paramètres
     * @param {Object} params - Objet de paramètre
     * @param {string} params.type - Le type de tri : ["date", "nom"]
     * @param {string} params.ordre - L'ordre du tri : ["ASC", "DESC"]
     * @returns {UnMaire[]} - Tableau des résultats
     */
    listeMaires(params) {
        if(params.type === "nom"){
            this.#trierNom(this.#aMaires, params.ordre)
        }
        if(params.type === "date"){
            this.#trierDate(this.#aMaires, params.ordre)
        }
        
        return this.#aMaires;
    }

    /**
     * @static
     * @returns {Number} - Le nombre d'enregistrement dans le tableau des maires
     */
    getNombreMaires(){
        return this.#aMaires.length;
    }
    
  }