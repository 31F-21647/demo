console.log("test");
const cours = [{
                sigle : "582-31F",
                nom : "Prog Inter Web 2",
                prof : "JM",
                },{
                sigle : "582-31B",
                nom : "Prog Web Avancée",
                prof : "CJ",
                },{
                sigle : "582-31W",
                nom : "CMS",
                prof : "EM",
                },{
                sigle : "582-31D",
                nom : "UX UI",
                prof : "MA",
                },];
                
                console.log(cours);

const monApp = new app(cours);
monApp.coucou();
/*let mesDonnees = monApp.getData();
console.log(mesDonnees);
monApp.data = console.log;
console.log(monApp.data);
mesDonnees = monApp.getData();
console.log(mesDonnees);
monApp.data("test de console")
*/
window.addEventListener("DOMContentLoaded", function(){
    let parentSelect = document.querySelector(".selectCours");
    monApp.renderSelection(parentSelect)
})