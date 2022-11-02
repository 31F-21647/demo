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
                console.log(JSON.stringify(cours));
let json = '[{"sigle":"582-31F","nom":"Prog Inter Web 2","prof":"JM"},{"sigle":"582-31B","nom":"Prog Web Avancée","prof":"CJ"},{"sigle":"582-31W","nom":"CMS","prof":"EM"},{"sigle":"582-31D","nom":"UX UI","prof":"MA"}]'

let objet = JSON.parse(json);
console.log(objet)

cours[0].sigle = "582-312F";
objet[0].sigle = "582-312F";
//cours = objet;
cours.push({
    sigle : "582-32W",
    nom : "Projet",
    prof : "MA",
    })
console.log(cours)




















