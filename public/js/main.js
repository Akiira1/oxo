// Informations

let statut = document.querySelector("h2")
let inGame = true
let joueurActif = "X"
let etatGame = ["", "", "", "", "", "", "", "", "",]

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
// text 
let gagner = () => `Joueur ${joueurActif} à gagné`
let egalite = () => "Egalité"
let tourJoueur = () => `C'est au tour u joueur ${joueurActif}`

statut.innerHTML = tourJoueur()

document.querySelectorAll(".case").forEach(element => element.addEventListener("click", gestionClicCase))
document.querySelector("#retry").addEventListener("click", retry)

function gestionClicCase() {
    const indexCase = parseInt(this.dataset.index)

    if (etatGame[indexCase] !== "" || !inGame) {
        return
    }

    etatGame[indexCase] = joueurActif
    this.innerHTML = joueurActif

    verifVictory()
}
function verifVictory() {
    let winTurn = false

    for(let conditionVictoire of condVictoire) {
        let valeur1 = etatGame[conditionVictoire[0]]
        let valeur2 = etatGame[conditionVictoire[1]]
        let valeur3 = etatGame[conditionVictoire[2]]
        if(valeur1 === "" || valeur2 === "" || valeur3 === "") {
            continue
        }
        if (valeur1 === valeur2 && valeur2 === valeur3) { 
            winTurn = true
            break
        }
    }
    if(winTurn){
        statut.innerHTML = gagner()
        inGame = false
        return
    }

    if(!etatGame.includes("")){
        statut.innerHTML = egalite()
        inGame = false
        return
    }

    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

function retry(){
    joueurActif = "X"
    inGame = true
    etatGame = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(element => element.innerHTML = "")
}