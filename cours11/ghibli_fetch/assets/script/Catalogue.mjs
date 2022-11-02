export default class Catalogue{
    /**
     * Contient le noeud d'insertion du composant
     * @type {HTMLElement}
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
     * Configuration de la classe Catalogue
     * @param {HTMLElement} domParent 
     */
    constructor(domParent){
        // Assigne le noeud sur lequel le composant sera attaché
        this.domParent = domParent;
    }
    /**
     * Mutateur (setter) des films du catalogue
     * @param {Array} data - Le tableau des films
     */
    setFilms(data){
        this.#aData = data;
        console.log(this.#aData);
    }
    /**
     * Permet de faire le rendu du catalogue dans l'application en fonction des données du catalogue
     */
    rendu(){
        let chaineHMTL = "";
        this.#aData.forEach(film => {
            chaineHMTL += `<article class="carte">
                                <header>
                                    <h2>${film.title} (${film.release_date})</h2>
                                    <h2>${film.original_title}</h2>
                                </header>
                                <img src="${film.image}">
                                <div class="contenu">
                                    <p>${film.description}</p>
                                </div>
                                <footer class="action">x, y z</footer>
                            </article>`
        });

        this.domParent.innerHTML = chaineHMTL;
    }
}