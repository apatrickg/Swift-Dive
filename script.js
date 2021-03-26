const loader = document.querySelector('.loader');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const artistContainer = document.querySelector('.artist-container');
const simArtistContainer = document.querySelector('.similar-artist-container');
const simArtistGrid = document.querySelector('.similar-artist-grid');
const similarSection = document.getElementById('similar');

// Proxy 
const proxy = 'https://peaceful-fjord-61207.herokuapp.com/';

// TastDive API
const apiKey = '406230-SwiftieL-J6OCQIAQ';
const apiURL = `${proxy}https://tastedive.com/api/similar?limit=9&info=1&q=Taylor Swift&k=${apiKey}`;


// Hold results from similar artists
let resultsArray = [];

// Hold information about Taylor 
let infoArray = [];

// Remove Loader and Show Content
function showContent(){
    loader.classList.add('hidden');
}

// Get Artists Related to Taylor and Information About Her
async function getArtistData(){
    // Show Loader
    loader.classList.remove('hidden');
    try{
        const response = await fetch(apiURL);
        const data = await response.json();
        resultsArray = data.Similar.Results;
        infoArray = data.Similar.Info;
        createArtistElements(infoArray);
        createResultsElements(resultsArray);
    } catch(error){
        console.log('error: ', error);
    }
    showContent();
}

// Helper Function to Create Iframe
function createIframe(div, iframe, user){
    iframe.src = `https://www.youtube-nocookie.com/embed/${user.yID}`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.loading = "lazy";

    div.appendChild(iframe);
}

// Helper Function to Create Info Paragraphs
function createPara(para, user){
    para.classList.add('info');
    para.textContent = user.wTeaser;
}

// Create DOM Elements for Taylor
function createArtistElements(artist){
    artist.forEach((artist) =>{
        const artistImageContainer = document.createElement('div');
        artistImageContainer.classList.add('artist-img');
        const artistImage = document.createElement('img');
        artistImage.src = '/images/SD-logo.png';
        artistImage.alt = 'taylor-img';
        const artistVidContainer = document.createElement('div');
        artistVidContainer.classList.add('artist-vid');
        const artistVid = document.createElement('iframe');
        const artistTextContainer = document.createElement('div');
        artistTextContainer.classList.add('artist-text');
        const artistHeading = document.createElement('h2');
        artistHeading.classList.add('artist-heading');
        artistHeading.textContent = 'Who is She?';
        const infoPara = document.createElement('p');
        createPara(infoPara, artist)
        createIframe(artistVidContainer, artistVid, artist);

        artistImageContainer.appendChild(artistImage);
        artistTextContainer.append(artistHeading, infoPara);
        artistContainer.append(artistImageContainer, artistVidContainer, artistTextContainer);
    })
}

// Create DOM Elements for Related Artists
function createResultsElements(results){
    results.forEach((result) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('a-g-item');
        const simArtistName = document.createElement('h3');
        simArtistName.classList.add('s-a-name');
        simArtistName.textContent = `${result.Name}`;
        const simArtistVidContainer = document.createElement('div');
        simArtistVidContainer.classList.add('s-a-vid');
        const simArtistVid = document.createElement('iframe');
        const simArtistText = document.createElement('div');
        simArtistText.classList.add('s-a-text');
        const simArtistPara = document.createElement('p');
        createPara(simArtistPara, result);
        createIframe(simArtistVidContainer, simArtistVid, result);

        simArtistText.appendChild(simArtistPara);
        simArtistVidContainer.appendChild(simArtistVid);
        gridItem.append(simArtistName, simArtistVidContainer, simArtistText);
        simArtistGrid.appendChild(gridItem);
        simArtistContainer.appendChild(simArtistGrid);
    });
}

// Switch theme dynamically
function switchTheme(event){
    if (event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleDarkLightMode(true);
    } else{
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleDarkLightMode(false);
    }
}

// Toggle Dark/Light
function toggleDarkLightMode(isDark){
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    isDark ? toggleIcon.children[1].classList.replace('sun','moon') :
    toggleIcon.children[1].classList.replace('moon', 'sun');
}


// Check Local Storage for Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark'){
        toggleSwitch.checked = 'true';
        toggleDarkLightMode(true);
    }
}

// On Load
getArtistData();

// Event Listeners
toggleSwitch.addEventListener('change', switchTheme, {passive: true} );