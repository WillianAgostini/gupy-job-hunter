import { findJobs, findKeywordsInJobs } from './jobs';
import { createJobCard, removeExistingCards } from './cards';
import { createPopup } from './popup';

const jobsToShow = [];
let countJobs = 0;

const { keywordComponent } = createPopup(findButton)


const resultElement = document.querySelector('[data-testid="result-total-text"]');




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

async function findButton() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("loading").style.display = "block";
  document.getElementById("overlay").style.display = "block";

  const keywords = keywordComponent.value?.map(x => x.value);
  const urlParams = extractTerm(window.location.href);

  const jobs = await findJobs(urlParams);
  const jobsToShow = await findKeywordsInJobs(jobs, keywords, 10);
  removeExistingCards();
  countJobs = 0;

  const jobToShowInterval = setInterval(() => {
    if (!jobsToShow.length) {
      clearInterval(jobToShowInterval)
    }
    updateResultElement(++countJobs);
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

function extractTerm(url) {
  const termIndex = url.indexOf('term=');
  if (termIndex !== -1) {
    const termPart = url.substring(termIndex + 5);
    return termPart;
  }
  return '';
}

function updateResultElement(countJobs) {
  if (!resultElement) return;

  const vacanciesElement = resultElement.querySelectorAll('strong')[1];

  if (vacanciesElement) {
    vacanciesElement.textContent = `${countJobs} vacancies`;
  }

  if (!resultElement.textContent.includes('found with Gupy Job Find')) {
    const additionalText = document.createElement('span');
    additionalText.textContent = ' with Gupy Job Find';
    resultElement.appendChild(additionalText);
  }
}
