// Attendre l'événément load ou DOMContentLoaded avant de manipuler le DOM

//window.addEventListener("load", function(){
window.addEventListener("DOMContentLoaded", function(){
    
    // Récupère le bouton
    const btn = document.querySelector(".btn_num1");
    
    //Attache le gestionnaire d'événement pour détecter le click

    btn.addEventListener('click',function (e){
        const monBtn = e.target;    // Récupère le bouton dynamiquement
        console.log(monBtn);
        monBtn.disabled = true;     //Désactive le bouton
        
        const maDiv = document.querySelector(".maDiv"); // Récupère l'élément a animer
        maDiv.classList.add("animationDiv");            // Ajoute la classe qui démarre l'animation
        
        // Attache le gestionnaire d'événement (animationend - fin de l'animation) 
        // pour nettoyer le DOM après l'animation
        maDiv.addEventListener("animationend", function(e){
            console.log("fin");
            e.target.classList.remove("animationDiv");  // Retrait de la classe d'animation
            monBtn.disabled = false;                    // Réactive le bouton
        })
    })


        
    
})


