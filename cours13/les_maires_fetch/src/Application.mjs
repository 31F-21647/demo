import MaireXhr from "./MaireXhr.mjs";
import MaireFetch from "./MaireFetch.mjs";

export default class Application {
    
    /**
     * Constructeur de la classe Application
     * Le constructeur attache les écouteurs d'événement sur les bonnes méthodes de l'application
     */
    constructor() {
      
      document.querySelector (".fetch .btn-recherche-date").addEventListener("click", ()=>{
        let oMaire = new MaireFetch();
        let params = {callback : function(data){
          console.log("voici les données du fetch ", data);
          // Appeler la fonction d'affichage des maires...
        }}
        oMaire.rechercheMaires(params)
      })
        
    }
    /**
    Mettre les autres méthodes ici.
    */
  }