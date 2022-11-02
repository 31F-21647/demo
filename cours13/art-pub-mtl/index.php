<?php
ini_set('display_errors', 1);
error_reporting(~0);
/**
 * Fichier de lancement du MVC, Il appel le var.init et le gabarit HTML 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2016-03-03
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 * 
 */

if(isset($_GET['json']))
{
	header('Content-Type: application/json; charset=utf8');	
}

header('Access-Control-Allow-Origin: *');
		
header('Access-Control-Allow-Methods: OPTIONS, PUT, POST, GET, DELETE');

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
{
    // Source : https://stackoverflow.com/a/43498290
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"])){
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
	return;
}
	 /***************************************************/
    /** Fichier de configuration, contient l'autoloader **/
    /***************************************************/
	require_once("./config.php");
	
   /***************************************************/
    /** Initialisation des variables **/
    /***************************************************/

   
	$oReq = new Requete();
	
	/* Instanciation du controlleur */
	if($oReq->ressource == ""){
		$oReq->ressource = "Accueil";
	}
	
	$nomControlleur = ucfirst($oReq->ressource) . 'Controlleur';
	
	
	if (class_exists($nomControlleur)) {
		$reflectionClass = new ReflectionClass($nomControlleur);
		
		if($reflectionClass->isInstantiable()){
			$oControlleur = new $nomControlleur();
			$nomAction = strtolower($oReq->verbe) . 'Action';
			$result = $oControlleur->$nomAction($oReq);
		}
		else{
			http_response_code(404);
		}	
	}else{
		http_response_code(404);
	}	
	
	
	
	
	//http://www.lornajane.net/posts/2012/building-a-restful-php-server-understanding-the-request				

?>
