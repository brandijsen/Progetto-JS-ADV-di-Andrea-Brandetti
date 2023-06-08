// Select DOM elements
const card = document.querySelector('.card');
const container = document.querySelector('.container');
const appNameDiv = document.querySelector('.app-name-div');
const appNameHeader = document.querySelector('.app-name-header');
const searchBar = document.querySelector('.search-bar');
const cityNameInput = document.querySelector('.city');
const searchButton = document.querySelector('.search-bar button');
const description = document.querySelector('.description');

// Boolean to confirm that the user didn't look yet for the city 

let citySearched = false;

// Event listener for mouse click
searchButton.addEventListener('click', search);

// Event listener for Enter key
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    search();
  }
});

// Search function (taking API datas)
function search() {
  const city = cityNameInput.value;

  if (city.toLowerCase() === 'los angeles' && !citySearched) {
    fetch("https://api.teleport.org/api/urban_areas/slug:los-angeles/scores/")
      .then(response => response.json())
      .then(data => {

        // Updating card style
         card.style.cssText = "width: 900px; color: #000";

        // Updating container style
        container.style.cssText = `
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 800px;
          height: 47px;
        `;

        // Remove the app description
        description.innerHTML= ''

        // Update app name style
        appNameDiv.style.marginBottom = '0px';
        appNameDiv.style.cursor = 'pointer';

        appNameHeader.style.fontSize = '32px';

        // Update search bar style
        searchBar.style.cssText = `
          display: flex;
          flex-direction: row;
          width: 357px;
          height: 47px;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-left: 20px;
          margin-top: 0px;
          gap: 10px;
          text-align: center;
          color: #030e2596;
          border-color: #030e2596;
        `;

        // Update city name input style
        cityNameInput.style.cssText = `
          padding: 10px 50px 8px 56px;
          width: 300px;
          height: 38px;
          border-radius: 50px;
          font-size: 18px;
          color: black;
          text-transform: uppercase;
        `;

        // Reset of value and placeholder of the input
        cityNameInput.value = '';
        cityNameInput.placeholder = 'Enter city name';

        // Update style for the button
        searchButton.style.cssText = `
          width: 47px;
          height: 47px;
          align-items: center;
          font-size: 26px;
          padding: 10px;
          border-radius: 50%;
          border-color: #030e2596;
          cursor: pointer;
        `;

        // City name header
        const cityNameHeader = document.createElement('h2');
        cityNameHeader.textContent = city.toUpperCase();
        card.appendChild(cityNameHeader);
        cityNameHeader.classList.add('city-name');

        // Element to show the city image
        const cityImage = document.createElement('img');
        cityImage.src = "images/Los Angeles.png";
        cityImage.classList.add('city-image');
        card.appendChild(cityImage);

        // City description div
        const summaryDiv = document.createElement('div');
        summaryDiv.classList.add('summary');
        summaryDiv.innerHTML = `<p>${data.summary}</p>`;
        card.appendChild(summaryDiv);
        summaryDiv.style.width = '800px';

        // City score rounded
        const scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score');
        scoreDiv.innerHTML = `<p>City Score: ${Math.round(data.teleport_city_score)}</p>`;
        card.appendChild(scoreDiv);

        // Categories 
        const categories = document.createElement('div');
        categories.classList.add('categories');
        card.appendChild(categories);

        const categoriesSection = document.createElement('div');
        categoriesSection.classList.add('categories-section');
        categories.appendChild(categoriesSection);

        // Create the div that includes category bars 
        const barSection = document.createElement('div');
        barSection.classList.add('bar-section');
        categories.appendChild(barSection);

        // Creating category bars 
        data.categories.forEach(category => {
          const categoryDiv = document.createElement('div');
          categoryDiv.classList.add('category');
          categoryDiv.innerHTML = `${category.name}`;
          categoriesSection.appendChild(categoryDiv);

        // Category scores 
          const categoryScore = document.createElement('header');
          categoryScore.classList.add('category-score');
          categoryScore.innerHTML = `${Math.round(category.score_out_of_10)}`;
          categoryDiv.appendChild(categoryScore);

          const categoryBar = document.createElement('div');
          categoryBar.classList.add('category-bar');
          barSection.appendChild(categoryBar);

          // Calculate the percentage of the scores to determine the width of the bars to give a visual idea about the scores of the categories
          const percentageScore = Math.round(category.score_out_of_10) * 10;

          categoryBar.style.cssText = `
            background-color: ${category.color};
            width: ${percentageScore}%;
            height: 25px;
          `;
        });

        // Boolean to confirm that the user searched the city
        citySearched = true;
      })

      // Error alert message

      .catch(error => {
        console.log(error);
      });
  } else if (city.trim() !== '' && city.toUpperCase() !== 'LOS ANGELES') {
    alert("Sorry, we don't have information about this city.");
  }
}

// Function to restore the page by clicking the app name 
function resetPage() {
  location.reload();
}

appNameDiv.addEventListener('click', resetPage);
