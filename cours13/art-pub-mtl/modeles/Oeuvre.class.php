<?php
/**
 * Class Oeuvre
 * 
 * @author Jonathan Martel
 * @version 1.0
 * @update 2022-10-26
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 * 
 * 
 * 
 */
class Oeuvre extends Modele {	
	const TABLE_OEUVRE = "apm__oeuvre";
	const TABLE_LIAISON_ARTISTE_OEUVRE = "apm__oeuvre_artiste";
	const TABLE_OEUVRE_DONNEES_EXTERNES = "apm__oeuvre_donnees_externes";
	const TABLE_ARTISTE = "apm__artiste";
	/**
	 * Retourne la liste des oeuvres
	 * @access public
	 * @return Array
	 * @TODO Modifier le query afin de tenir compte des oeuvres à plusieurs artistes.
	 */
	public function getListe($where=null) 
	{
		$res = Array();
		$query = "	SELECT * FROM ". self::TABLE_OEUVRE ." Oeu 
					inner join ". self::TABLE_LIAISON_ARTISTE_OEUVRE ." O_A ON Oeu.id = O_A.id_oeuvre
					left join ". self::TABLE_OEUVRE_DONNEES_EXTERNES ." OD_EXT ON Oeu.id = OD_EXT.id_oeuvre
					inner join ". self::TABLE_ARTISTE ." ART ON ART.id_artiste = O_A.id_artiste
					
				";
		if(isset($where)){
			$query .= " where Oeu.Titre LIKE '%". $where . "%' OR Oeu.Materiaux LIKE '%". $where . "%' OR Oeu.Technique LIKE '%". $where . "%' OR Oeu.Arrondissement LIKE '%". $where . "%'";
		}
		$query .= " order by id ASC";
		
		//SELECT * FROM `apm__oeuvre` Oeu inner join apm__oeuvre_artiste O_A ON Oeu.id = O_A.id_oeuvre
		if($mrResultat = $this->_db->query($query))
		{
			while($oeuvre = $mrResultat->fetch_assoc())
			{
				$oeu = end($res);
				
				if(isset($oeu) && ($oeu == false || $oeu['id'] != $oeuvre['id']))
				{
					
					$oeuvre['Artistes'] = Array();
					$oeuvre['Artistes'][] = Array	(	"id_artiste"=> $oeuvre['id_artiste'], 
														"Nom"=> $oeuvre['Nom'],
														"Prenom"=> $oeuvre['Prenom'],
														"NomCollectif"=> $oeuvre['NomCollectif']
													);
					unset($oeuvre['id_artiste']);
					unset($oeuvre['Nom']);
					unset($oeuvre['Prenom']);
					unset($oeuvre['NomCollectif']);
					
					$res[] = $oeuvre;
				}
				else if(isset($oeu) &&  $oeu['id'] == $oeuvre['id'])
				{
					$i = count($res)-1;
					$res[$i]['Artistes'][] = Array	(	"id_artiste"=> $oeuvre['id_artiste'], 
														"Nom"=> $oeuvre['Nom'],
														"Prenom"=> $oeuvre['Prenom'],
														"NomCollectif"=> $oeuvre['NomCollectif']
													);
				}
				
				  
			}
		}
		return $res;
	}
	
	
	/**
	 * Récupère une oeuvre avec son id
	 * @access public
	 * @param int $id Identifiant de l'oeuvre
	 * @return Array
	 */
	public function getOeuvre($id) 
	{
		$res = Array();
		$query = "	SELECT * FROM ". self::TABLE_OEUVRE ." Oeu 
					inner join ". self::TABLE_LIAISON_ARTISTE_OEUVRE ." O_A ON Oeu.id = O_A.id_oeuvre
					left join ". self::TABLE_OEUVRE_DONNEES_EXTERNES ." OD_EXT ON Oeu.id = OD_EXT.id_oeuvre
					inner join ". self::TABLE_ARTISTE ." ART ON ART.id_artiste = O_A.id_artiste 
					where id=". $id;
				
		if($mrResultat = $this->_db->query($query))
		{
			while($oeuvre = $mrResultat->fetch_assoc())
			{
				//$oeu = $res;
				
				if(count($res) == 0)
				{
					$oeuvre['Artistes'] = Array();
					$oeuvre['Artistes'][] = Array	(	"id_artiste"=> $oeuvre['id_artiste'], 
														"Nom"=> $oeuvre['Nom'],
														"Prenom"=> $oeuvre['Prenom'],
														"NomCollectif"=> $oeuvre['NomCollectif']
													);
					unset($oeuvre['id_artiste']);
					unset($oeuvre['Nom']);
					unset($oeuvre['Prenom']);
					unset($oeuvre['NomCollectif']);
					$res = $oeuvre;
				}
				else
				{
					
					$res['Artistes'][] = Array	(	"id_artiste"=> $oeuvre['id_artiste'], 
														"Nom"=> $oeuvre['Nom'],
														"Prenom"=> $oeuvre['Prenom'],
														"NomCollectif"=> $oeuvre['NomCollectif']
													);
				}
			}
			
		}
		return $res;
	}
	
	
	/**
	 * Récupère les oeuvres avec l'id d'un artiste
	 * @access public
	 * @param int $id Identifiant de l'artiste
	 * @return Array
	 */
	public function getOeuvresParArtiste($id) 
	{
		$res = Array();
		$query = "	SELECT * FROM ". self::TABLE_OEUVRE ." Oeu 
					inner join ". self::TABLE_LIAISON_ARTISTE_OEUVRE ." O_A ON Oeu.id = O_A.id_oeuvre
					where id_artiste=". $id;
				
		if($mrResultat = $this->_db->query($query))
		{
			while($oeuvre = $mrResultat->fetch_assoc())
			{
				$res[] = $oeuvre;
			}
		}
		return $res;
	}
	
	
}




?>