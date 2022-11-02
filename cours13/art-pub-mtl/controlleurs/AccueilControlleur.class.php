<?php
/**
 * Class AccueilControlleur
 * Gère la page d'accueil
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2022-10-26
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 */
 

 
 
class AccueilControlleur extends Controlleur 
{
	
	// GET : 
	
	public function getAction(Requete $requete)
	{
		//$oOeuvre = new Oeuvre();
		//$aData = $aOeuvre = $oOeuvre->getListe();

		$this->afficherVue("entete");
		$this->afficherVue("nav");
		$this->afficherVue("accueil", "Accueil");
		$this->afficherVue("pied", "");
		
	}
	
	
}
?>