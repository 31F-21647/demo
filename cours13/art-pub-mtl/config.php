<?php
/**
 * Fichier de configuration. Il est appelé par index.php et par test/index.php
 * Il contient notamment l'autoloader
 * @author Jonathan Martel
 * @version 1.0
 * @update 2016-03-03
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 * 
 */
	
	
	
	include_once('db_info.php');
	
	function mon_autoloader($class) 
	{
		$dossierClasse = array('modeles/', 'vues/', 'lib/', 'lib/mysql/', './controlleurs/', '../modeles/', '../vues/', '../lib/' , '../lib/mysql/', '../controlleurs/', '../', '' );	// Ajouter les dossiers au besoin
		
		foreach ($dossierClasse as $dossier) 
		{
			
			if(file_exists($dossier.$class.'.class.php'))
			{
					
				require_once($dossier.$class.'.class.php');
				//echo "trouvé : ";
				//var_dump($dossier.$class.'.class.php');
				return;
			}
		}
		
	  
	}
	
	spl_autoload_register('mon_autoloader');
	
?>