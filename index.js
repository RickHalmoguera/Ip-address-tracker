const inputField = document.getElementById("inputField")
const ipDisplay = document.getElementById("ipDisplay")
const locationDisplay = document.getElementById("locationDisplay")
const timezoneDisplay = document.getElementById("timezoneDisplay")
const ispDisplay = document.getElementById("ispDisplay")
const getDataBtn = document.getElementById("getDataBtn")


let lat = 0 
let lng = 0
let ip 

let map = L.map('map').setView([lat,lng],2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    
fetch(`https://api.ipify.org?format=json`)
.then(response => response.json())
.then(data => saveIp(data));

displayMap = ()=>{
    map.flyTo([lat,lng],19)
    let marker = L.marker([lat,lng]).addTo(map);
}

const saveIp = (data)=>{
    ip = data.ip
    inputField.value = ip
}


const displayData = (data) =>{
    ipDisplay.innerText = data.ip
    locationDisplay.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
    timezoneDisplay.innerText = `UTC ${data.location.timezone}`
    ispDisplay.innerText = data.isp
    lat = data.location.lat
    lng = data.location.lng
    displayMap()
} 

const getData = ()=>{
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_yYcgXPyen8znWK6ud0AZmDWrNQKDA&ipAddress=${ip}`)
    .then(response => response.json())
    .then(data => displayData(data));
}


getDataBtn.addEventListener("click", getData)