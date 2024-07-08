import { findJobs, findKeywordsInJobs } from './jobs';
import { createJobCard, removeExistingCards } from './cards';

document.body.innerHTML += `
<!-- Popup Structure -->
<div id="popup" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:300px; padding:20px; background-color:white; box-shadow:0 0 10px rgba(0,0,0,0.1); z-index:1000;">
    <h3>Enter Keywords</h3>
    <textarea id="keywords" rows="5" style="width:100%;"></textarea>
    <button id="findButton" style="margin-top:10px; padding:10px; background-color:#007bff; color:white; border:none; cursor:pointer;">Find</button>
</div>
<!-- Overlay to darken the background -->
<div id="overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); z-index:999;"></div>
<!-- Loading Indicator -->
<div id="loading" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); padding:20px; background-color:white; box-shadow:0 0 10px rgba(0,0,0,0.1); z-index:1001;">
    Loading...
</div>
`

const jobsToShow = [];

const companiesSection = document.querySelector('section[aria-label="Found companies"]');

if (companiesSection) {
  const companiesTitle = companiesSection.querySelector('h2');

  if (companiesTitle) {
    const containerDiv = document.createElement("div");
    containerDiv.style.display = "flex";
    containerDiv.style.alignItems = "center";
    containerDiv.style.justifyContent = "space-between";
    containerDiv.style.marginTop = "10px";

    companiesTitle.parentNode.insertBefore(containerDiv, companiesTitle);
    containerDiv.appendChild(companiesTitle);

    const filterButton = document.createElement("button");
    filterButton.textContent = "Buscar com Gupy Job Find";
    filterButton.style.padding = "10px";
    filterButton.style.marginLeft = "10px";
    filterButton.style.border = "none";
    filterButton.style.backgroundColor = "#007bff";
    filterButton.style.color = "white";
    filterButton.style.cursor = "pointer";

    filterButton.addEventListener("click", function () {
      document.getElementById("popup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    });

    containerDiv.appendChild(filterButton);
  }
}

document.getElementById("findButton").addEventListener("click", async function () {
  // const xxx = document.getElementById("keywords").value;
  // console.log("Palavras-chave:", xxx);

  document.getElementById("popup").style.display = "none";
  document.getElementById("loading").style.display = "block";
  document.getElementById("overlay").style.display = "block";

  const jobs = await findJobs();
  const keywords = ['Node.js', 'node js'];
  const jobsToShow = await findKeywordsInJobs(jobs, keywords, 10);
  removeExistingCards();

  const jobToShowInterval = setInterval(() => {
    console.log('jobsToShow', jobsToShow.length)
    if (!jobsToShow.length) {
      clearInterval(jobToShowInterval)
    }

  addJobCards([jobsToShow.pop()]);
  }, 100);

  document.getElementById("loading").style.display = "none";
  document.getElementById("overlay").style.display = "none";

});

document.getElementById("overlay").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("loading").style.display = "none";
});


function addJobCards(jobs) {
  const jobListComponent = document.querySelector('.sc-a01de6b-0');
  jobs.forEach(job => {
    const jobCard = createJobCard(job);
    jobListComponent.appendChild(jobCard);
  });
}

