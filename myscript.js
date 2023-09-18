let tagJours = document.getElementById("jours");
let annéeSelec = document.getElementById("annéeSelec");
let moisSelec = document.getElementById("moisSelec");

let date = new Date();
let annéeAffichée = date.getFullYear();
let moisAffiché = date.getMonth();

const mois = [
        {Id:0, Name:"Janvier"}, 
        {Id:1, Name:"Février"}, 
        {Id:2, Name:"Mars"}, 
        {Id:3, Name:"Avril"}, 
        {Id:4, Name:"Mai"}, 
        {Id:5, Name:"Juin"}, 
        {Id:6, Name:"Juillet"}, 
        {Id:7, Name:"Août"}, 
        {Id:8, Name:"Septembre"}, 
        {Id:9, Name:"Octobre"}, 
        {Id:10, Name:"Novembre"},
        {Id:11, Name:"Décembre"}
    ]

const genererCalendrier = () => {
    let listJours = "";
    //Mois actuel  
    let premierJourMois = new Date(annéeAffichée, moisAffiché, 1).getDay();
    if(premierJourMois == 0)
        premierJourMois = 7;
    let dernierJourNbrMois = new Date(annéeAffichée, moisAffiché + 1, 0).getDate();
    let dernierJourMois = new Date(annéeAffichée, moisAffiché, dernierJourNbrMois).getDay();
    if(dernierJourMois == 0)
        dernierJourMois = 7;
    //Mois précédent
    let dernierJourNbrMoisPrecedent = new Date(annéeAffichée, moisAffiché, 0).getDate();

    //On construit les jours du mois précedent
        //ici on fait -1 car notre semaine commence le lundi et non le dimanche
    for(let i = premierJourMois; i > 1; i--){
        listJours += '<li class="inactive">' + (dernierJourNbrMoisPrecedent - i + 2) + "</li>";
    }

    //On construit les jours du mois en cours
    for(let i = 1; i <= dernierJourNbrMois; i++){
        listJours += '<li onClick="changeBGC(this)">' + i + "</li>";
    }

    //On construit les jours du mois à venir
    for(let i = dernierJourMois; i < 7; i++){
        listJours += '<li class="inactive">' + (i - dernierJourMois + 1) + "</li>";
    }

    annéeSelec.innerText = annéeAffichée;
    moisSelec.innerText = mois.find(x=> x.Id === moisAffiché).Name;
    tagJours.innerHTML = listJours;
}
genererCalendrier();

function changeBGC(elem){
    if(elem.style.backgroundColor == "")
        elem.style.backgroundColor = "darkgrey";
    else
        elem.style.backgroundColor = "";
}

function prevYear(elem){
    annéeAffichée = parseInt(annéeSelec.innerText) - 1;
    genererCalendrier();
}

function nextYear(elem){
    annéeAffichée = parseInt(annéeSelec.innerText) + 1;
    genererCalendrier();
}

function prevMonth(elem){
    moisAffiché = mois.find(x=> x.Name === moisSelec.innerText).Id - 1;
    genererCalendrier();
}

function nextMonth(elem){
    moisAffiché = mois.find(x=> x.Name === moisSelec.innerText).Id + 1
    genererCalendrier();
}