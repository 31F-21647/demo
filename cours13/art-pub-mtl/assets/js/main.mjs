import Nav from "./Nav.mjs";
import Recherche from "./Recherche.mjs";

document.querySelector(".btn-rechercher-ajax").addEventListener("click", (e)=>{
    e.preventDefault();
    let valeur = document.querySelector("[name='recherche']").value;
    let oRecherche = new Recherche();
    //oRecherche.faireRecherche(valeur, "ajax");
    oRecherche.faireRecherchePromesse(valeur, "ajax");
    console.log("btn ajax")
});
document.querySelector(".btn-rechercher-json").addEventListener("click", (e)=>{
    e.preventDefault();
    let valeur = document.querySelector("[name='recherche']").value;
    let oRecherche = new Recherche();
    //oRecherche.faireRecherche(valeur, "json");
    oRecherche.faireRecherchePromesse(valeur, "json");
    console.log("btn json")
});

document.querySelector("[name='champ-rechercher-input']").addEventListener("input", (e)=>{
    let valeur = e.target.value;
    let oRecherche = new Recherche();
    oRecherche.faireRecherche(valeur, "ajax");

});