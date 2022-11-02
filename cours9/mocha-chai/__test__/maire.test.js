

import Maire from "../src/Maire.mjs"
import {mairesMTL} from "../src/mairesdata.js";

mocha.setup("bdd");
const assert = chai.assert;
const expect = chai.expect;


describe("Essai de mocha chai", function(){
    it("mon premier test 14 est un nombre", function(){
        assert.typeOf(14, 'Number');
    });
    it("mon premier test, 'allo' est un nombre", function(){
        assert.typeOf('allo', 'Number');
    });
})

describe("Classe Maires (3 méthodes)", ()=>{
    const oMaire = new Maire(mairesMTL);
    
    it("Maire.getNombreMaire()", ()=>{
        const longueur = mairesMTL.length;      // Ou un dataset mocké
        expect(oMaire.getNombreMaires()).to.be.to.have.to.an("Number").to.equal(longueur);
    })

    it("Maire.rechercheMaire(), 'nom=plante'", ()=>{
        let res = [{
            nom:"Plante", 
            prenom: "Valérie",
            debut : 2017,
            fin : null
        }]
        let res2 = [{
            "nom": "Coderre",
            "prenom": "Denis",
            "debut": 2013,
            "fin": 2017
        }]
        let recherche = {type: 'nom', valeur: "Plante"};
        expect(oMaire.rechercheMaires(recherche)).an("Array");
        expect(oMaire.rechercheMaires(recherche)).to.have.lengthOf(1);
        expect(oMaire.rechercheMaires(recherche)).to.have.deep.members(res);
        expect(oMaire.rechercheMaires(recherche)).to.not.have.members(res2);
        
    })
    it("Maire.rechercheMaires(), 'nom=houde'", ()=>{
        let res = {
            "nom": "Houde",
            "prenom": "Camillien",
            "debut": 1934,
            "fin": 1936
        }
        
        let recherche = {type: 'nom', valeur: "houde"};
        expect(oMaire.rechercheMaires(recherche)).to.be.an("Array");
        expect(oMaire.rechercheMaires(recherche)).to.have.lengthOf(4);
        expect(oMaire.rechercheMaires(recherche)).to.have.deep.include(res);  
    })

    it("Ceci est une chaine qui décrit le test, je test la méthode listeMaire() avec les paramètres suivants : par date, ASC", ()=>{
        let param = {type: "date", ordre : "ASC"};
        let dataTest = [...mairesMTL];
        
        let res = [
            {
                "nom": "Viger",
                "prenom": "Jacques",
                "debut": 1833,
                "fin": 1836
            },
            {
                "nom": "Bourret",
                "prenom": "Joseph",
                "debut": 1842,
                "fin": 1844
            },
            
        ]
        
        expect(oMaire.listeMaires(param)).to.be.an("array");
        expect(oMaire.listeMaires(param)).to.have.lengthOf(55);
        expect(oMaire.listeMaires(param)).to.have.members(dataTest);
        expect(oMaire.listeMaires(param)).to.deep.include.ordered.members(res);


    })

    
})

mocha.run();

