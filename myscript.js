const shadowColorGrey = "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
const ColorBlue = "rgba(3, 102, 214, 0.3)"

let listJoursSelector = document.getElementById("jours");
let annéeSelector = document.getElementById("annéeSelec");
let moisSelector = document.getElementById("moisSelec");

let date = new Date();
let today = date.getDate();
let moisAffiché = date.getMonth();
let annéeAffichée = date.getFullYear();

let todaysDate = annéeAffichée.toString() + moisAffiché.toString().padStart(2, '0') + today.toString().padStart(2, '0');

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

////////////////////////////////////////////////////////

//Generation header
annéeSelector.innerHTML = annéeAffichée;
moisSelector.innerHTML = mois.find(x=> x.Id === moisAffiché).Name;

//Generation calendrier
genererCalendrier();


////////////////////////////////////////////////////////
function isThisDayBeenSelected(){
    var elementsDuMoisSport = [];
    var elementsDuMoisBoth = [];
    //D'abord récupérer toutes les clefs de ce mois/année
    for (var i = 0; i < localStorage.length; i++) {
        var cle = localStorage.key(i); // Obtenir la clé de l'élément
        if (cle.slice(0, 4) != annéeAffichée.toString()) continue;
        if (cle.slice(4, 6) != moisAffiché.toString().padStart(2, '0')) continue;
        if (localStorage.getItem(cle) == "sport"){
            elementsDuMoisSport.push(cle);
            continue;
        }
        if (localStorage.getItem(cle) == "both"){
            elementsDuMoisBoth.push(cle);
            continue;
        }
    }

    for (let elem of elementsDuMoisSport){
        document.getElementById(elem).style.backgroundImage = 'url(' + "Icons/xmark-solid-1.svg" + ')';
    }

    for (let elem of elementsDuMoisBoth){
        document.getElementById(elem).style.backgroundImage = 'url(' + "Icons/xmark-solid-2.svg" + ')';
    }
}


function onDayClickAction(elem){
    if(elem.style.backgroundImage == '' || elem.style.backgroundImage == 'none'){
        // elem.style.boxShadow = shadowColorGrey;
        elem.style.backgroundImage = 'url(' + "Icons/xmark-solid-1.svg" + ')';
        localStorage.setItem(elem.id, "sport")
    }
    else if(elem.style.backgroundImage == 'url(' + "\"Icons/xmark-solid-1.svg\"" + ')'){
        elem.style.backgroundImage = 'url(' + "Icons/xmark-solid-2.svg" + ')';
        localStorage.setItem(elem.id, "both")
    }
    else{
        elem.style.backgroundImage = 'none';
        localStorage.removeItem(elem.id)

    }
}


function highLightToday() {
    let days = listJoursSelector.children;
    for (const day of days){
        if (!day.classList.contains('inactive')){
            if (day.id === todaysDate){
                day.style.border = "solid medium " + ColorBlue;
            }
        }
    }

}

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
    let idPartPre = annéeAffichée.toString() + (moisAffiché - 1).toString().padStart(2, '0');
    if (moisAffiché == 0)
        idPartPre = (annéeAffichée - 1).toString() + "11";
    for(let i = premierJourMois; i > 1; i--){
        let numJourCase = (dernierJourNbrMoisPrecedent - i + 2).toString().padStart(2, '0');
        listJours += '<li id="' +  idPartPre + numJourCase + '" class="inactive">' + numJourCase + "</li>";
    }
    
    //On construit les jours du mois en cours
    let idPart = annéeAffichée.toString() + moisAffiché.toString().padStart(2, '0');
    for(let i = 1; i <= dernierJourNbrMois; i++){
        let numJourCase = i;
        listJours += '<li id="' + idPart.toString() + numJourCase.toString().padStart(2, '0')  + '" onClick="onDayClickAction(this)">' + numJourCase + "</li>";
    }
    
    //On construit les jours du mois à venir
    let idPartNext =  annéeAffichée.toString() + (moisAffiché + 1).toString().padStart(2, '0');
    if (moisAffiché == 11)
        idPartNext = toString(annéeAffichée + 1) + "00";
    for(let i = dernierJourMois; i < 7; i++){
        let numJourCase = (i - dernierJourMois + 1);
        listJours += '<li id="' + idPartNext + numJourCase.toString().padStart(2, '0') +'" class="inactive">' + numJourCase + "</li>";
    }

    //On met à jour les données à afficher.
    listJoursSelector.innerHTML = listJours;

    highLightToday();
    isThisDayBeenSelected();
}

function changeTextWithTransition(elem, textToDisplay) {
    elem.style.opacity = 0;
    setTimeout(() => {
        elem.innerHTML = textToDisplay;
        elem.style.opacity = 1;
    }, 200); // Attendre pour que l'opacité atteigne 0 avant de changer le texte
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
    if (moisAffiché == 0){
        moisAffiché = 11;
        annéeAffichée = parseInt(annéeSelector.innerHTML) - 1;
        changeTextWithTransition(annéeSelector, annéeAffichée);
    }
    else
        moisAffiché = mois.find(x=> x.Name === moisSelector.innerHTML).Id - 1;

    genererCalendrier();
    changeTextWithTransition(moisSelector, mois.find(x=> x.Id === moisAffiché).Name);
}

function nextMonth(elem){
    if (moisAffiché == 11){
        moisAffiché = 0;
        annéeAffichée = parseInt(annéeSelector.innerHTML) + 1;
        changeTextWithTransition(annéeSelector, annéeAffichée);
    }
    else
        moisAffiché = mois.find(x=> x.Name === moisSelector.innerHTML).Id + 1;

    genererCalendrier();
    changeTextWithTransition(moisSelector, mois.find(x=> x.Id === moisAffiché).Name);
}
