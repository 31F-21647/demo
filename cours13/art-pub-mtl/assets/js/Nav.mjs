export default class Nav{
    constructor(nav, elementMenu){
        if(elementMenu){
            let chaine = "<ul>";
            elementMenu.forEach(element => {
                chaine +=   `<li>
                                <a href="${element.lien}">${element.titre}</a>
                            </li>`;
                });
            chaine += "</ul>";
            domNav.innerHTML = chaine;
        }
        /**
         * Source https://web.dev/website-navigation/
         */
        //const nav = document.querySelector('#mainnav')
        const list = nav.querySelector('#mainnav ul');
        const burgerClone = document.querySelector('#burger-template').content.cloneNode(true);
        
        const button = burgerClone.querySelector('button');
        button.addEventListener('click', e => {
            const isOpen = button.getAttribute('aria-expanded') === "false"
            button.setAttribute('aria-expanded', isOpen);
        });
        
        nav.addEventListener('keyup', e => {
            if (e.code === 'Escape') {
                button.setAttribute('aria-expanded', false);
                button.focus()
            }
        });
        
        nav.insertBefore(burgerClone, list);
    }
}