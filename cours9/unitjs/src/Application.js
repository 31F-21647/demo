import Maire from "./Maire.js";
import { mairesMTL } from "./mairesdata.js";

export default class Application {
    #btnRechercheNom;
    #btnRechercheDate;
    #btnChampRecherche;
    #btnListeNom;
    #btnListeDate;
    #noeudResultat;
    /**
     * Constructeur de la classe Maire. 
     * Le constructeur attache les écouteurs d'événement sur les bonnes méthodes de l'application
     */
    constructor() {
        this.#btnRechercheDate = document.querySelector(".btn-recherche-date");
        this.#btnRechercheNom = document.querySelector(".btn-recherche-nom");
        this.#btnListeDate = document.querySelector(".btn-liste-date");
        this.#btnListeNom = document.querySelector(".btn-liste-nom");
        this.#btnChampRecherche = document.querySelector(".champ-recherche");
        this.#noeudResultat  = document.querySelector(".tbl-resultat");

        this.#btnRechercheNom.addEventListener("click", this.rechercherMairesParNom.bind(this));
        this.#btnRechercheDate.addEventListener("click", this.rechercherMairesParDate.bind(this));
        this.#btnListeNom.addEventListener("click", this.listeMairesParNom.bind(this));
        this.#btnListeDate.addEventListener("click", this.listeMairesParDate.bind(this));

        this.oMaireMTL = new Maire(mairesMTL);
        
    }
    /**
     * Gestionnaire d'événement de recherche par nom. 
     */
    rechercherMairesParNom(){
        const valeur = this.#btnChampRecherche.value;
        let lesMaires;
        if(valeur) {
            lesMaires = this.oMaireMTL.rechercheMaires({type:'nom', valeur: valeur});
            
        }
        console.log(lesMaires);
        this.afficheTableauResultat(lesMaires);
    }
    /**
     * Gestionnaire d'événement de recherche par date. 
     */
    rechercherMairesParDate(){
        let valeur = this.#btnChampRecherche.value;
        let lesMaires;
        if(valeur){

            lesMaires = this.oMaireMTL.rechercheMaires({type:'date', valeur:valeur});
            console.log(lesMaires);
        }
        console.log(lesMaires);
        this.afficheTableauResultat(lesMaires);
    }

    /**
     * Gestionnaire d'événement de l'affichage de la liste par nom. 
     */
    listeMairesParNom(){
        let lesMaires;
        let ordre = document.querySelector("[name = 'ordre']:checked")?.value;
        console.log(ordre);
        ordre = ordre || "ASC"; // Valeur par défault
        console.log(ordre);
        if(ordre) {
            lesMaires = this.oMaireMTL.listeMaires({type:"nom", ordre : ordre});
        }
        console.log(lesMaires[0]);
        this.afficheTableauResultat(lesMaires);
    }
    /**
     * Gestionnaire d'événement de l'affichage de la liste par nom. 
     */
    listeMairesParDate(){
        let lesMaires;
        let ordre = document.querySelector("[name = 'ordre']:checked")?.value;
        console.log(ordre);
        ordre = ordre || "ASC"; // Valeur par défault
        console.log(ordre);
        if(ordre) {
            lesMaires = this.oMaireMTL.listeMaires({type:"date", ordre : ordre});
        }
        console.log(lesMaires[0]);
        this.afficheTableauResultat(lesMaires);
    }
    
    afficheTableauResultat(aResultat){
        let chaine = "<tr><th>Nom</th><th>Prénom</th><th>Début</th><th>Fin</th></tr>";
        if(aResultat && aResultat.length){
            aResultat.forEach(unMaire => {
                chaine += `<tr>
                                <td>${unMaire.nom}</td>
                                <td>${unMaire.prenom}</td>
                                <td>${unMaire.debut}</td>
                                <td>${unMaire.fin}</td>
                            </tr>`;
            });
        }
        else {
            chaine +=   `<tr>
                            <td colspan="4">Aucun résultat</td>
                        </tr>`;
        }
        
        this.#noeudResultat.innerHTML = chaine;
    }
  }