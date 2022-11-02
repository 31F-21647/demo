class app {
    
    constructor(data){
        this.data = data;
        //this.data = data;
    }
    getData(){
        return this.data;
    }
    coucou(){
        console.log("Coucou!");
    }
    renderSelection(domParent){
        let chaine = "<select multiple>";
        
        this.data.forEach(function(cours){
            chaine += `<option value="${cours.sigle}">${cours.nom}</option>`;
        });
        chaine += "</select>";
        domParent.innerHTML = chaine;
    }
}