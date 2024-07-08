import { findJobs, findKeywordsInJobs } from './jobs';
import { createJobCard, removeExistingCards } from './cards';
import { createPopup } from './popup';

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
      console.log('click')
      createPopup(findButton)
      document.getElementById("popup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    });

    containerDiv.appendChild(filterButton);
  }
}

async function findButton() {
  
  // const xxx = document.getElementById("keywords").value;
  // console.log("Palavras-chave:", xxx);

  document.getElementById("popup").style.display = "none";
  document.getElementById("loading").style.display = "block";
  document.getElementById("overlay").style.display = "block";

  const jobs = await findJobs();
  const keywords = ['Node.js', 'node js'];
  const currentUrl = window.location.href;
  const jobsToShow = await findKeywordsInJobs(jobs, keywords, 10);
  removeExistingCards();

  const jobToShowInterval = setInterval(() => {
    if (!jobsToShow.length) {
      clearInterval(jobToShowInterval)
    }

  addJobCards([jobsToShow.pop()]);
  }, 100);

  document.getElementById("loading").style.display = "none";
  document.getElementById("overlay").style.display = "none";
};


function addJobCards(jobs) {
  const jobListComponent = document.querySelector('.sc-a01de6b-0');
  jobs.forEach(job => {
    const jobCard = createJobCard(job);
    jobListComponent.appendChild(jobCard);
  });
}
