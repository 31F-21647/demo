    
        <section class="catalogue">
						<?php
						foreach ($aData as $cle => $oeuvre) {
							extract($oeuvre);
							?>
                            <article class="carte">
                                <header>
                                    <h2><?php echo $Titre?></h2>
                                </header>
                                <img src="https://picsum.photos/200/300">
                                <div class="contenu">
                                    <p><?php echo $Description ?></p>
                                    <?php
                                    foreach($Artistes as $artiste){
										extract($artiste);
										?>
										<p class="auteur">Par : <a href="artiste/<?php echo $id_artiste ?>"><?php echo $Nom .", ". $Prenom?></a></p>
                                    <?php 
                                    }
                                    ?>
                                </div>
                                <footer class="action"><p class="arrondissement"><?php echo $Arrondissement?></p></footer>
                            </article>
                        <?php 
                        }?>
			</section>
