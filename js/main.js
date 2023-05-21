console.log('main.js loaded');
const form = document.getElementById('form');
const button = document.getElementById('button');
const season = document.getElementById('season');
const round = document.getElementById('round');


button.addEventListener('click', (e) => {
    e.preventDefault();
    let seasonValue = season.value;
    let roundValue = round.value;
    if(seasonValue !== '' && roundValue !== '') {
        getDriver(seasonValue, roundValue).then(drivers => createTable(drivers));
    }else {
        alert('Invalid fields');
    }
});


// Fetching data from API

async function getDriver(season, round) {
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    let driverStandings
    let drivers = []
    if(res.ok) {
        const data = await res.json();
        driverStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }else {
        console.log('Error');
        alert('Cant find data');
        return;
    }
    for(let i= 0; i < 7; i++) {
        driverDict = {
            'position': driverStandings[i].position,
            'name': driverStandings[i].Driver.givenName + ' ' + driverStandings[i].Driver.familyName,
            'nationality': driverStandings[i].Driver.nationality,
            'sponsor': driverStandings[i].Constructors[0].name,
            'points': driverStandings[i].points,
        }
        drivers.push(driverDict);
}
    console.log(drivers);
    return drivers;
}


function createTable(drivers) {
    let table = document.getElementById('table');
    table.innerHTML = '';
    let tableBody = document.createElement('tbody');
    let positionHeader = document.createElement('th');
    row = document.createElement('tr');
    positionHeader.innerHTML = 'Position';
    row.appendChild(positionHeader);
    let nameHeader = document.createElement('th');
    nameHeader.innerHTML = 'Name';
    row.appendChild(nameHeader);
    let nationalityHeader = document.createElement('th');
    nationalityHeader.innerHTML = 'Nationality';
    row.appendChild(nationalityHeader);
    let sponsorHeader = document.createElement('th');
    sponsorHeader.innerHTML = 'Sponsor';
    row.appendChild(sponsorHeader);
    let pointsHeader = document.createElement('th');
    pointsHeader.innerHTML = 'Points';
    row.appendChild(pointsHeader);
    tableBody.appendChild(row);
    table.appendChild(tableBody);
    for(let i = 0; i < drivers.length; i++) {
        let row = document.createElement('tr');
        tableBody.appendChild(row);
        let position = document.createElement('td');
        position.innerHTML = drivers[i].position;
        row.appendChild(position);
        let name = document.createElement('td');
        name.innerHTML = drivers[i].name;
        row.appendChild(name);
        let nationality = document.createElement('td');
        nationality.innerHTML = drivers[i].nationality;
        row.appendChild(nationality);
        let sponsor = document.createElement('td');
        sponsor.innerHTML = drivers[i].sponsor;
        row.appendChild(sponsor);
        let points = document.createElement('td');
        points.innerHTML = drivers[i].points;
        row.appendChild(points);
    }
}



    