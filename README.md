# Introduction
C'est un petit jeu de stratégie à 2 joueurs, fait en javascript, jouable [ici](https://deadmall0w.github.io/Mon-jeu-Internet/)

# Regles
## Introduction
Voici les règles de mon jeu:
Il se joue à 2, le premier joueur est représenté par un 'X' et le deuxième par un 'O'.

![X](Img/Regles/players.png)

Le jeu se déroule en tour par tour sur une grile de taille variable.
Les joueurs débutent de chaque côtés du plateau.

![Image début de partie](Img/Regles/shema_debut_partie.png) 
### But
Le but est de coincé ou capturer tous les pions adverses en déplaçant les pions de façon statégique.

## Début de partie
Une partie est répartie en manches.
- Lors des manches pairs, c'est le joueur X qui commence.
- Lors des manches impairs, c'est le joueur O qui commence.

Le gagnant est le joueur qui a gagné le plus de manche.

## Jouabilité
Lorsque c'est notre tour, en cliquant sur un pion, les mouvements possibles sont affichés par une croix et un rond.

![Image pion mouvement](Img/Regles/possible_move_black.png)

Pour déplacer le pion, il suffit de rester appuyé dessus et de le glisser vers la case suivante. Attention, si un mouvement n'est pas valide, le pion ne bouge pas.

## Mouvements
### Base
Les pions peuvent avancer uniquement vers l'avant. 

### Pions seuls
![Pion seul](Img/Regles/mouvement_seul.png)

Un pion seul, peut se déplacer vers l'avant en diagonal uniqument.

### Avec un pion allié devant
Lorsqu'un pion du même camp est devant, le pion arrière peut se déplacer au-dessus, en dessous, devant ou en diagonale par rapport au pion allié.

![Pion avec allié](Img/Regles/mouvement_pion_allie2.png)

> Ici, les pions arrière (le pion X le plus à droite, le pion O le plus à gauche) ont plus de mouvements possibles.
> Les pions devant, ont les meme mouvements qu'un pion seul.

### Pion bloqué
Un pion peut bloquer un autre pion et l'empêcher de bouger en étant à côté (au-dessus, en dessous, devant, derrière). Le pion ne peut alors plus se déplacer.

![Pion bloqué](Img/Regles/pion_bloque.png)

> Ici, le pion X et le pion O sont bloqué car un pion ennemi les bloque, ils ne peuvent donc pas bouger.

### Pion capturé
Un pion peut être capturé en se déplaçant dessus, le pion capturé et ainsi perdu pour le reste de la manche.
 
![Pion bloqué](Img/Regles/pion_capture.png)

> Ici, le pion X se déplace sur le pion O, capturant ainsi le pion O.


## Victoire
- Si un joueur n'a plus de pion, ou tous ces pions sont bloqué, il perd.
- Si les 2 joueurs sont bloqué, c'est celui qui a le plus de pion qui gagne.
- Si les 2 joueurs ont le même nombre de pion, il y a une égalité.

# Création

# License


 
