<?php
/**
 * Class Requete
 * Gère les requêtes HTTP
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2016-03-03
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 * @see http://www.lornajane.net/posts/2012/building-a-restful-php-server-understanding-the-request
 */

class Requete 
{
	public $url_elements;
	public $ressource;
    public $verbe;
    public $parametres;
	private $_db;
	
    public function __construct() {
        $this->_db = MonSQL::getInstance();
        
        $this->verbe = $_SERVER['REQUEST_METHOD'];
        $_GET['url'] = (isset($_GET['url']) ? $_GET['url'] : "");
        
        $this->url_elements = explode('/', $_GET['url']);
						
		$this->parseIncomingParams();
		
		$this->ressource = $this->url_elements[0]; 
		array_splice($this->url_elements, 0, 1);
        return true;
	}
	
	public function parseIncomingParams() {
        $parametres = array();

        // first of all, pull the GET vars
        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $parametres);
        }

       	unset($parametres['url']);
        $body = file_get_contents("php://input");
		$content_type = false;
        if(isset($_SERVER['CONTENT_TYPE'])) {
            $content_type = $_SERVER['CONTENT_TYPE'];
        }
		
		
        $body_params = json_decode($body);
		
        if($body_params) {
            foreach($body_params as $nom => $valeur) {
				$parametres[$nom] = $this->aseptiserParametre($valeur);
            }
        }

        
        
        $this->parametres = $parametres;
    }
	
	private function aseptiserParametre($valeur)
	{
		$valeur = $this->_db->real_escape_string($valeur);
		$valeur = htmlspecialchars($valeur);
		return $valeur;
	} 	
}
?>