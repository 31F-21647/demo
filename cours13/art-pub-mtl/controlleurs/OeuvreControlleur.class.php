<?php
/**
 * Class Controler
 * Gère les requêtes HTTP
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2022-10-26
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 */
 
 /*
 * TODO : Commenter selon les standards du département.
 *
 */

 
 
class OeuvreControlleur extends Controlleur 
{
	
	// GET : 
	// 		/oeuvre/ - Liste des oeuvres
	// 		/oeuvre/{id}/ - Une oeuvre
	// 		/oeuvre/?recherche=chaineDeRecherche
	
	public function getAction(Requete $requete)
	{
		$res = array();
		
		if(isset($requete->url_elements[0]) && is_numeric($requete->url_elements[0]))	// Normalement l'id de l'oeuvre 
		{
			$id_oeuvre = (int)$requete->url_elements[0];
            $res = $this->getOeuvre($id_oeuvre);
            
        } 
        else 	// Liste des oeuvres
        {
        	if(isset($_GET['recherche']))
			{
				$res = $this->rechercherOeuvre($_GET['recherche']);	
			}
			else
			{
				$res = $this->getListeOeuvre();
			}	
        }
	}
	
	
	
	
		
	protected function getOeuvre($id_oeuvre)
	{
		$oOeuvre = new Oeuvre();
		$aOeuvre = $oOeuvre->getOeuvre($id_oeuvre);
		//var_dump($aOeuvre);
		if(isset($_GET['json']))
		{
			echo json_encode($aOeuvre);	
		}
		else
		{
			$this->afficherVue("entete");
			$this->afficherVue("nav");
			$this->afficherVue("uneOeuvre", "Oeuvre", $aOeuvre);
			$this->afficherVue("pied", "");
		
		}
	}
	
	protected function getListeOeuvre()
	{
		
		$oOeuvre = new Oeuvre();
		$aOeuvre = $oOeuvre->getListe();
		if(isset($_GET['json']))
		{
			echo json_encode($aOeuvre);	
		}
		else
		{
			$this->afficherVue("entete");
			$this->afficherVue("nav");
			$this->afficherVue("recherche", "Oeuvre", $aOeuvre);
			$this->afficherVue("liste", "Oeuvre", $aOeuvre);
			$this->afficherVue("pied", "");
		
		}
		
	}
	protected function rechercherOeuvre($valeur)
	{
		
		$oOeuvre = new Oeuvre();
		$aOeuvre = $oOeuvre->getListe($valeur);
		if(isset($_GET['json']))
		{
			echo json_encode($aOeuvre);	
		}
		else if(isset($_GET['ajax'])){
			$this->afficherVue("liste", "Oeuvre", $aOeuvre);
		}
		else
		{
			$this->afficherVue("entete");
			$this->afficherVue("nav");
			$this->afficherVue("recherche", "Oeuvre", $aOeuvre);
			$this->afficherVue("liste", "Oeuvre", $aOeuvre);
			$this->afficherVue("pied", "");
		
		}
		
	}
	
	
	
}
?>