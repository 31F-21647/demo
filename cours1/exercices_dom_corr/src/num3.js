
// Attendre l'événément load avant de manipuler le DOM
window.addEventListener("load", ()=>{
    //  Récupère le parent des items afin d'y placer mon gestionnaire d'événement.
    const listeItem = document.querySelector(".liste-item");
    listeItem.addEventListener("click", function(e){    
        const cibleClic = e.target; // Sur quoi ai-je cliqué?
        if(cibleClic.classList.contains("btn")){    // Si c'est un bouton
            const item = cibleClic.parentElement;   // Récupère le parent (div.item)
            const conteneur = item.parentElement;   // Récupère le conteneur des items
      
            // Flèche du haut ou du bas ?
            if(cibleClic.classList.contains("fleche-haut")){  
                conteneur.insertBefore(item, item.previousElementSibling);  // Opération de manipulation
            }
            else if(cibleClic.classList.contains("fleche-bas")){
                conteneur.insertBefore(item.nextElementSibling, item);  // Opération de manipulation
            }
        }
    })
    

    // Ajoute un gestionnaire d'événement sur la soumission du form (pour ajouter un item)
    document.querySelector("form").addEventListener("submit", function(e){
        e.preventDefault(); // Pour ne pas que le form fasse une requête GET
        console.log("envoie");
        
        // Récupère la valeur de l'item dans le champ texte
        const item = document.querySelector("[name='item']");
        const sItem = item?.value; // Extra : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
        
        console.log(sItem);
        
        // Formatage du html pour insérer l'élément
        const nouvItem =    `<div class="item">
                            <span class="nom">${sItem}</span> 
                            <span class="btn fleche-haut"></span>
                            <span class="btn fleche-bas"></span>
                            </div>`;
        // Insère l'élément comme noeud de .liste-item
        document.querySelector(".liste-item").insertAdjacentHTML("afterbegin", nouvItem);
        
        // Vide le champs texte
        item.value = "";
    })
    
})