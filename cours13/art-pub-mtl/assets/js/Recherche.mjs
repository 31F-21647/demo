export default class Recherche{
    
    async faireRecherche(valeur, type){
        let oeuvre;
        let res = await fetch(`./oeuvre?recherche=${valeur}&${type}`);
        
        if(type == "ajax")
        {
            oeuvre = await res.text();
            document.querySelector(".catalogue").outerHTML = oeuvre;
        }
        else if(type == "json"){
            oeuvre = await res.json();
            this.rendu(oeuvre);
            console.log(oeuvre)
        }

        console.log(res);
    }

    faireRecherchePromesse(valeur, type){
        let oeuvre;
        fetch(`./oeuvre?recherche=${valeur}&${type}`)
        .then((res) =>{
            if(type == "ajax")
            {
                res.text().then((oeuvre)=>{
                    console.log(oeuvre)
                    
                    document.querySelector(".catalogue").outerHTML = oeuvre;    
                });
                
            }
            else if(type == "json"){
                res.json().then(oeuvre =>{
                    this.rendu(oeuvre);
                });
                
            }
        });   
    }

    rendu(oeuvre){
        let chaineHTML = "";
        oeuvre.forEach(element => {
            chaineHTML += `<article class="carte">
                    <header>
                        <h2>${element.Titre}</h2>
                    </header>
                    <img src="https://picsum.photos/200/300">
                    <div class="contenu">
                        <p></p>
                        `;
                        element.Artistes.forEach((unArtiste)=>{
                            chaineHTML += `<p class="auteur">Par : <a href="artiste/${unArtiste.id_artiste}">${unArtiste.Nom},${unArtiste.Prenom} </a></p>`;                            
                        })
                    chaineHTML += `</div>
                    <footer class="action"><p class="arrondissement">Côte-des-Neiges–Notre-Dame-de-Grâce</p></footer>
                </article>`;
        });

        document.querySelector(".catalogue").innerHTML = chaineHTML;
    }

    
}