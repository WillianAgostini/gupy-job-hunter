import Tagify from "@yaireo/tagify";
import { createJobCard, removeExistingCards } from "./cards";
import { Job, findJobs, findKeywordsInJobs } from "./jobs";

type KeywordComponent = Tagify & {
    getValues: () => any[];
    isEmpty: () => boolean;
};

let jobsToShow: any[] = [];
let keywordComponent: KeywordComponent;
export function execute() {
    const { loading } = createLoadingComponent();
    const mainElement = document.getElementById("__next");
    createFilterComponent(mainElement, loading);

    keywordComponent = createKeywordComponent();

    if (!keywordComponent.isEmpty()) {
        startSearching(loading);
    }
}

function createFilterComponent(mainElement: HTMLElement | null, loading: any) {
    const containerDiv = document.createElement("div");
    containerDiv.style.display = "flex";
    containerDiv.style.alignItems = "center";
    containerDiv.style.justifyContent = "flex-end";
    containerDiv.style.marginTop = "10px";

    const text = document.createElement("h3");
    text.textContent = "Keywords: ";
    text.style.marginLeft = "10px";
    text.style.padding = "10px";
    containerDiv.appendChild(text);

    const keywordsInput = document.createElement("input");
    keywordsInput.id = "keywords";
    // containerDiv.style.marginTop = "10px";
    keywordsInput.style.marginLeft = "10px";
    keywordsInput.style.padding = "10px";
    containerDiv.appendChild(keywordsInput);

    const filterButton = document.createElement("button");
    filterButton.textContent = "Gupy Job Finder";
    filterButton.style.padding = "10px";
    filterButton.style.marginLeft = "10px";
    filterButton.style.border = "none";
    filterButton.style.backgroundColor = "#007bff";
    filterButton.style.color = "white";
    filterButton.style.cursor = "pointer";
    filterButton.addEventListener("click", function () {
        startSearching(loading);
    });
    containerDiv.appendChild(filterButton);

    mainElement?.insertBefore(containerDiv, mainElement?.lastElementChild!);
}

function startSearching(loading: any) {
    findButton(loading);
    loading.start();
}

function createLoadingComponent() {
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.display = "none";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "999";
    overlay.onclick = function () {};
    document.body.appendChild(overlay);

    const loading = document.createElement("div");
    loading.id = "loading";
    loading.style.display = "none";
    loading.style.position = "fixed";
    loading.style.top = "50%";
    loading.style.left = "50%";
    loading.style.transform = "translate(-50%, -50%)";
    loading.style.padding = "20px";
    loading.style.backgroundColor = "white";
    loading.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    loading.style.zIndex = "1001";
    loading.textContent = "Loading...";
    document.body.appendChild(loading);

    return {
        loading: {
            start: function () {
                document.getElementById("loading")!.style.display = "block";
                document.getElementById("overlay")!.style.display = "block";
            },
            stop: function () {
                document.getElementById("loading")!.style.display = "none";
                document.getElementById("overlay")!.style.display = "none";
            },
        },
    };
}

async function findButton(loading: any) {
    const keywords = keywordComponent.getValues();
    const urlParams = extractTerm(window.location.href);

    const jobs = await findJobs(urlParams);
    jobsToShow = await findKeywordsInJobs(jobs, keywords);
    removeExistingCards();
    let countJobs = 0;
    const resultElement = document.querySelector('[data-testid="result-total-text"]')!;

    updateResultElement(resultElement, countJobs);

    const jobToShowInterval = setInterval(() => {
        if (!jobsToShow.length) {
            clearInterval(jobToShowInterval);
        }
        updateResultElement(resultElement, ++countJobs);
        addJobCards([jobsToShow.pop()]);
    }, 100);

    loading.stop();
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

function updateResultElement(resultElement: Element, countJobs: number) {
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

function createKeywordComponent() {
    const keywords = document.getElementById("keywords") as HTMLInputElement;
    const keywordComponent = new Tagify(keywords, {
        id: "keywords",
    }) as KeywordComponent;
    keywordComponent.getValues = function () {
        return this.value?.map((x: { value: any }) => x.value) ?? [];
    };

    keywordComponent.isEmpty = function () {
        return !this.getValues().length;
    };

    keywordComponent.on("remove", () => {
        if (keywordComponent.isEmpty()) {
            keywordComponent.clearPersistedData();
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    });

    return keywordComponent;
}
