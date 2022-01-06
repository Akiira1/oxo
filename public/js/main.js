// Informations

let statut = document.querySelector("h2") 
let inGame = true // le jeu est lancé au chargement de page ! 
let joueurActif = "X" // on définis déjà le premier joueur 
let etatGame = ["", "", "", "", "", "", "", "", "",]  // initialisation de toute les cases du jeu 


// création de toutes les cominaisons permetant la victoire sur la grille
let condVictoire = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]


// text affichées pour le tour des jouer et la victoire/égalité
let gagner = () => `Joueur ${joueurActif} à gagné`
let egalite = () => "Egalité"
let tourJoueur = () => `C'est au tour u joueur ${joueurActif}`

statut.innerHTML = tourJoueur() // initialisation du texte premier joueur


//boutons
//récupération de chaque case de jeu et ajout d'un listener au clique qui lance la méthode pour récuperer l'index !!
document.querySelectorAll(".case").forEach(element => element.addEventListener("click", gestionClicCase))
document.querySelector("#retry").addEventListener("click", retry) // réinitialiser le jeu 


// récupération de l'index de chaque case en Number pour pouvoir la modifié
function gestionClicCase() {
    const indexCase = parseInt(this.dataset.index)

    if (etatGame[indexCase] !== "" || !inGame) { // on vérifie si la case cliqué est remplie et si la partie est en cours 
        return
    }

    // insertion du joueur actif ("X" ou "O") dans la case cliqué grace au bon index
    etatGame[indexCase] = joueurActif 
    this.innerHTML = joueurActif 

    verifVictory()
}


function verifVictory() {
    let winTurn = false // on dit que de base la partie n'es pas gagné

    for(let conditionVictoire of condVictoire) { // on parcours le tableau des bonnes condition de victoire ! 
        let valeur1 = etatGame[conditionVictoire[0]] // premier ellement du tableau des coditions ! 
        let valeur2 = etatGame[conditionVictoire[1]] // deuxiemme ellement du tableau des coditions ! 
        let valeur3 = etatGame[conditionVictoire[2]] // troisieme  ellement du tableau des coditions ! 

        // on regarde d'abord si l'une des 3 cases des conditions de victoire et vide et si oui, on continue le jeu 
        if(valeur1 === "" || valeur2 === "" || valeur3 === "") {
            continue
        }

        // si la valeur 1, 2 et 3 sont identique ("X" ou "O") on met true à winTurn pour arreter le jeu 
        if (valeur1 === valeur2 && valeur2 === valeur3) { 
            winTurn = true
            break
        }
    }

    // on indique qu'en cas de victoire, le status de Ingame passe en false et le message du gagnant s'affiche ! 
    if(winTurn){
        statut.innerHTML = gagner()
        inGame = false
        return
    }
    // si les conditions précedentes ne sont pas respecter et qu'il ne reste plus de cases vides, on arrete le jeu et on déclare égalité
    if(!etatGame.includes("")){
        statut.innerHTML = egalite()
        inGame = false
        return
    }
        //raccourcis pour foreach !! demancde si c'est "X", si oui, renvoie le "O" sinon renvoie le "X"
    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}
// on remet tout à zero en cliquant sur le boutton
function retry(){
    joueurActif = "X"
    inGame = true
    etatGame = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(element => element.innerHTML = "")
}