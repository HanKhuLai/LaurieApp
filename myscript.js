let tagJours = document.getElementById("jours");
let annéeSelector = document.getElementById("annéeSelec");
let moisSelector = document.getElementById("moisSelec");

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

    
//Generation header
annéeSelector.innerHTML = annéeAffichée;
moisSelector.innerHTML = mois.find(x=> x.Id === moisAffiché).Name;

//Generation calendrier
genererCalendrier();

//Gestion de la localStorage
const testLS = localStorage.getItem("test");



function genererCalendrier() {
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
        //ici on fait +2 car notre semaine commence le lundi et non le dimanche
    let idPartPre = annéeAffichée + "_" + (moisAffiché - 1) + "_";
    if (moisAffiché == 0)
        idPartPre = (annéeAffichée - 1) + "_" + 11 + "_";
    for(let i = premierJourMois; i > 1; i--){
        let numJourCase = (dernierJourNbrMoisPrecedent - i + 2);
        listJours += '<li id="' + idPartPre + numJourCase +'" class="inactive">' + numJourCase + "</li>";
    }
    
    //On construit les jours du mois en cours
    let idPart = annéeAffichée + "_" + moisAffiché + "_";
    for(let i = 1; i <= dernierJourNbrMois; i++){
        let numJourCase = i;
        listJours += '<li id="'+ idPart + numJourCase +'" onClick="changeBGC(this)">' + numJourCase + "</li>";
    }
    
    //On construit les jours du mois à venir
    let idPartNext = annéeAffichée + "_" + (moisAffiché + 1) + "_";
    if (moisAffiché == 11)
        idPartNext = (annéeAffichée + 1) + "_" + 0 + "_";
    for(let i = dernierJourMois; i < 7; i++){
        let numJourCase = (i - dernierJourMois + 1);
        listJours += '<li id="' + idPartNext + numJourCase +'" class="inactive">' + numJourCase + "</li>";
    }

    //On met à jour les données à afficher.
    tagJours.innerHTML = listJours;
}

function changeTextWithTransition(elem, textToDisplay) {
    elem.style.opacity = 0;
    setTimeout(() => {
        elem.innerHTML = textToDisplay;
        elem.style.opacity = 1;
    }, 200); // Attendre pour que l'opacité atteigne 0 avant de changer le texte
}

function changeBGC(elem){
    if(elem.style.boxShadow == ""){
        elem.style.boxShadow = "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset";
        localStorage.setItem(elem.id, "sport")
    }
    else
        elem.style.boxShadow = "";
}

function prevYear(elem){
    annéeAffichée = parseInt(annéeSelector.innerHTML) - 1;
    genererCalendrier();
    changeTextWithTransition(annéeSelector, annéeAffichée);
}

function nextYear(elem){
    annéeAffichée = parseInt(annéeSelector.innerHTML) + 1;
    genererCalendrier();
    changeTextWithTransition(annéeSelector, annéeAffichée);
}

function prevMonth(elem){
    if (moisAffiché == 0)
        moisAffiché = 11;
    else   
        moisAffiché = mois.find(x=> x.Name === moisSelector.innerHTML).Id - 1;
    genererCalendrier();
    changeTextWithTransition(moisSelector, mois.find(x=> x.Id === moisAffiché).Name);
}

function nextMonth(elem){
    if (moisAffiché == 11)
        moisAffiché = 0;
    else
        moisAffiché = mois.find(x=> x.Name === moisSelector.innerHTML).Id + 1;
    genererCalendrier();
    changeTextWithTransition(moisSelector, mois.find(x=> x.Id === moisAffiché).Name);
}
