import { Job, findJobs, findKeywordsInJobs } from "./jobs";
import { createJobCard, removeExistingCards } from "./cards";
import { createPopup } from "./popup";

const jobsToShow = [];

const { keywordComponent } = createPopup(findButton);

const resultElement = document.querySelector('[data-testid="result-total-text"]');

const main = document.getElementById("main-content");

if (main) {
    const title = main.querySelector("h2") || main.querySelector("h3");

    if (title) {
        const containerDiv = document.createElement("div");
        containerDiv.style.display = "flex";
        containerDiv.style.alignItems = "center";
        containerDiv.style.justifyContent = "space-between";
        containerDiv.style.marginTop = "10px";

        title.parentNode?.insertBefore(containerDiv, title);
        containerDiv.appendChild(title);

        const filterButton = document.createElement("button");
        filterButton.textContent = "Gupy Job Finder";
        filterButton.style.padding = "10px";
        filterButton.style.marginLeft = "10px";
        filterButton.style.border = "none";
        filterButton.style.backgroundColor = "#007bff";
        filterButton.style.color = "white";
        filterButton.style.cursor = "pointer";

        filterButton.addEventListener("click", function () {
            document.getElementById("popup")!.style.display = "block";
            document.getElementById("overlay")!.style.display = "block";
        });

        containerDiv.appendChild(filterButton);
    }
}

async function findButton() {
    document.getElementById("popup")!.style.display = "none";
    document.getElementById("loading")!.style.display = "block";
    document.getElementById("overlay")!.style.display = "block";

    const keywords = keywordComponent.value?.map((x) => x.value);
    const urlParams = extractTerm(window.location.href);

    const jobs = await findJobs(urlParams);
    const jobsToShow = await findKeywordsInJobs(jobs, keywords);
    removeExistingCards();
    let countJobs = 0;
    updateResultElement(countJobs);

    const jobToShowInterval = setInterval(() => {
        if (!jobsToShow.length) {
            clearInterval(jobToShowInterval);
        }
        updateResultElement(++countJobs);
        addJobCards([jobsToShow.pop()]);
    }, 100);

    document.getElementById("loading")!.style.display = "none";
    document.getElementById("overlay")!.style.display = "none";
}

function addJobCards(jobs: any[]) {
    const jobListComponent = document.querySelector(".sc-a01de6b-0");
    jobs.forEach((job: Job) => {
        const jobCard = createJobCard(job);
        jobListComponent?.appendChild(jobCard);
    });
}

function extractTerm(url: string) {
    const termIndex = url.indexOf("term=");
    if (termIndex !== -1) {
        const termPart = url.substring(termIndex + 5);
        return termPart;
    }
    return "";
}

function updateResultElement(countJobs: number) {
    if (!resultElement) return;

    const vacanciesElement = resultElement.querySelectorAll("strong")[1] || resultElement.querySelectorAll("strong")[0];

    if (vacanciesElement) {
        vacanciesElement.textContent = `${countJobs} vacancies`;
    }

    if (!resultElement.textContent!.includes("found with Gupy Job Find")) {
        const additionalText = document.createElement("span");
        additionalText.textContent = " with Gupy Job Find";
        resultElement.appendChild(additionalText);
    }
}
