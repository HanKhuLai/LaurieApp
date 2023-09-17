let tagJours = document.getElementById("jours");
let annéeSelec = document.getElementById("annéeSelec");
let moisSelec = document.getElementById("moisSelec");

let date = new Date();
let annéeEnCours = date.getFullYear();
let moisEnCours = date.getMonth();
let listJours = "";

const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

const genererCalendrier = () => {
    //Mois actuel  
    let premierJourMois = new Date(annéeEnCours, moisEnCours, 1).getDay();
    let dernierJourNbrMois = new Date(annéeEnCours, moisEnCours + 1, 0).getDate();
    let dernierJourMois = new Date(annéeEnCours, moisEnCours, dernierJourNbrMois).getDay();
    
    //Mois précédent
    let dernierJourNbrMoisPrecedent = new Date(annéeEnCours, moisEnCours, 0).getDate();

    //On construit les jours du mois précedent
        //ici on fait -1 car notre semaine commence le lundi et non le dimanche
    for(let i = premierJourMois - 1; i > 0; i--){
        listJours += '<li class="inactive">' + (dernierJourNbrMoisPrecedent - i + 1) + "</li>";
    }

    //On construit les jours du mois en cours
    for(let i = 1; i <= dernierJourNbrMois; i++){
        listJours += "<li>" + i + "</li>";
    }

    //On construit les jours du mois à venir
    for(let i = dernierJourMois + 1; i <= 7; i++){
        listJours += '<li class="inactive">' + (i - dernierJourMois) + "</li>";
    }

    annéeSelec.innerText = annéeEnCours
    moisSelec.innerText = mois[moisEnCours]
    tagJours.innerHTML = listJours;
}
genererCalendrier();