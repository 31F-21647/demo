export default class Ghibli{
    #URL = "https://ghibliapi.herokuapp.com";

    constructor(){


    }
    /**
     * @param {object} params - paramètre de la fonction
     * @param {string} params.ressource
     * @param {function} params.cb - callback (ou une fonction de rappel)
     * 
     */
    getRessource(params){
        /**
         * @todo - Valider la ressource
         */
        let resultat;
        let ressourceAcceptee = ["films", "species", "locations", "people", "vehicles"];
        if(ressourceAcceptee.includes(params.ressource)){
            fetch(this.#URL + "/"+params.ressource)
                .then((data)=>data.json())
                .then((data)=>{
                    resultat = data;
                    params.cb(data);
                })
        }
        //return resultat
    }

    async getRessourceAsync(params, id){
        /**
         * @todo - Valider la ressource
         */
        let resultat;
        id = id || "";
        let ressourceAcceptee = ["films", "species", "locations", "people", "vehicles"];
        if(ressourceAcceptee.includes(params.ressource)){
            let response = await fetch(this.#URL + "/"+params.ressource + "/"+id);
            resultat = await response.json();
            //console.log(resultat)
            ///console.log("condition 1")
            if(params.cb){
                console.log("condition 1")
                params.cb(resultat);
            }
        }
        return resultat;
    }

}