import Routeur from "./Routeur.mjs";

export default class App {

    #aData;

    constructor(){
        const xhr = new XMLHttpRequest();

        document.querySelector("body").addEventListener("click", ()=>{
            //console.log(this.#aData);
            xhr.open("GET", "https://ghibliapi.herokuapp.com/films");
            xhr.send();
        })    

        console.log(this.#aData)
        /*xhr.addEventListener("readystatechange",function(e){
            console.log(xhr.readyState, xhr.status);
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(JSON.parse(xhr.response));
            }
        })*/
        
        
        
        
        xhr.addEventListener("load", ()=>{
            console.log(this)
            this.#aData = JSON.parse(xhr.response)
            console.log(this.#aData);
        });
        
        
        
        console.log(this.#aData)
    }

    
}