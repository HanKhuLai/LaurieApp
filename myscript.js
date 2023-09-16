let tagJours = document.getElementById("jours");


let date = new Date();
let annéeEnCours = date.getFullYear();
let moisEnCours = date.getMonth();
let listJours = "";

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
        listJours += "<li>" + (dernierJourNbrMoisPrecedent - i + 1) + "</li>";
    }


    //On construit les jours du mois en cours


    //On construit les jours du mois à venir

    tagJours.innerHTML = listJours;
}
genererCalendrier();