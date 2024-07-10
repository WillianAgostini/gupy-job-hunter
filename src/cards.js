import { formatDate } from "./date";
import { hasViewedJob, setViewedJob } from "./storage";

function formatCity(city) {
    if(!city) return '';
    const abrevCity = city.substring(0, 10)
    if (abrevCity.length < 10) return abrevCity;
    return abrevCity + "...";
}

export function createJobCard(job) {
    const jobCard = document.createElement("li");
    const place = job.state ? `${formatCity(job.city)} - ${getBrazilianStateAbbreviation(job.state)}` : "Not informed";

    // Criação do conteúdo do cartão de emprego
    jobCard.innerHTML = `
    <div class="sc-4d881605-0 kokxPe">
        <div class="sc-9de900ec-0 khWrGf">
            <div aria-live="polite" id="" class="sc-kLLXSd hHAGuT">
                <button aria-label="This company has Feedback Badge" aria-expanded="false" tabindex="-1" aria-hidden="true" class="sc-jIZahH cuCZMH">
                    <div data-testid="friendly-badge-infotip">
                        <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
                            <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
                                <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2732%27%20height=%2746%27/%3e" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;">
                            </span>
                            <img alt="" src="/images/friendly-gupy-badge.svg" decoding="async" data-nimg="intrinsic" srcset="/images/friendly-gupy-badge.svg 1x, /images/friendly-gupy-badge.svg 2x" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;">
                            <noscript></noscript>
                        </span>
                    </div>
                </button>
            </div>
        </div>
        <a href="${job.jobUrl}" target="_blank" rel="noreferrer" aria-label="######################" class="sc-4d881605-1 IKqnq">
            <div class="sc-evZas bdbCHA sc-4d881605-2 evSPWd">
                <div aria-label="Company VENHA SER #SANGUELARANJA 🧡🚀" id="" role="group">
                    <div aria-hidden="true" class="sc-4d881605-3 XmfhX">
                        <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
                            <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
                                <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2732%27%20height=%2732%27/%3e" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;">
                            </span>
                            <img alt="Company logo" src="/_next/image?url=${job.careerPageLogo}&amp;w=64&amp;q=75" decoding="async" data-nimg="intrinsic" class="sc-ab49f641-0 kDrzQb" srcset="/_next/image?url=${job.careerPageLogo}&amp;w=32&amp;q=75 1x, /_next/image?url=${job.careerPageLogo}&amp;w=64&amp;q=75 2x" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;">
                            <noscript></noscript>
                        </span>
                        <p class="sc-bBXxYQ eJcDNr sc-4d881605-5 bpsGtj">VENHA SER #SANGUELARANJA 🧡🚀</p>
                    </div>
                </div>
                <h3 font-family="'Inter', sans-serif" color="#27262A" my="0" id="" class="sc-bZkfAO gYfAYo sc-4d881605-4 dZRYPZ">${job.name} </h3>
                <div class="sc-4d881605-7 bOkPDX">
                    <div data-testid="listing-details" class="sc-66f01f61-0 OtNUi">
                        <div aria-label="Workplace: ${place}." id="" role="group" class="sc-23336bc7-2 hCmVmU">
                            <div class="sc-dkzDqf eNgrhv">
                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="Location Icon">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                </svg>
                            </div>
                            <span aria-hidden="true" data-testid="job-location" class="sc-23336bc7-1 cezNaf">${place}</span>
                        </div>
                        <div aria-label="Work model ${job.workplaceType}." id="" role="group" class="sc-23336bc7-2 hCmVmU">
                            <div class="sc-dkzDqf eNgrhv">
                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="Job Model Icon">
                                    <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"></path>
                                </svg>
                            </div>
                            <span aria-hidden="true" class="sc-23336bc7-1 cezNaf">${job.workplaceType}</span>
                        </div>
                        <div aria-label="This job is of type ${job.type}." id="" role="group" class="sc-23336bc7-2 hCmVmU">
                            <div class="sc-dkzDqf eNgrhv">
                                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="${job.type}">
                                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.1 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path>
                                </svg>
                            </div>
                            <span aria-hidden="true" class="sc-23336bc7-1 cezNaf">${typeOfJob(job.type)}</span>
                        </div>
                        ${job.disabilities
            ? `
                            <div aria-label="This job is also for People with Disabilities." id="" role="group" class="sc-23336bc7-2 hCmVmU">
                                <div class="sc-dkzDqf eNgrhv">
                                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" alt="Accessibility Icon">
                                        <circle cx="12" cy="4" r="2"></circle>
                                        <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path>
                                    </svg>
                                </div>
                                <span aria-hidden="true" class="sc-23336bc7-1 cezNaf">Also for PwD</span>
                            </div>
                            `
            : ""
        }
                    </div>
                </div>
                <div class="sc-d9e69618-1 fPWTrT">
                    <hr aria-hidden="true" class="sc-iIPllB cPqeyD">
                    <p class="sc-bBXxYQ eJcDNr sc-d9e69618-0 iUzUdL">Published on: ${formatDate(new Date(job.publishedDate))}</p>
                </div>
            </div>
        </a>
    </div>
    `;

    const publishedOnElement = jobCard.querySelector(".sc-d9e69618-0");

    // Função para adicionar o ícone de visualizado
    const insertViewed = () => {
        if (!publishedOnElement.querySelector('span[data-viewed="true"]')) {
            const okIcon = document.createElement("span");
            okIcon.textContent = "✔";
            okIcon.style.color = "green";
            okIcon.style.fontSize = "16px";
            okIcon.style.position = "absolute";
            okIcon.style.right = "10px";
            okIcon.style.top = "0";
            okIcon.setAttribute("data-viewed", "true");
            okIcon.setAttribute("title", "Viewed");
            publishedOnElement.style.position = "relative"; // Para garantir que o pai seja posicionado relativamente
            publishedOnElement.appendChild(okIcon);
        }
    };

    if (hasViewedJob(job.id)) {
        insertViewed();
    }

    jobCard.addEventListener("click", (event) => {
        if (event.button === 0 || event.button === 1) {
            insertViewed();
            setViewedJob(job.id);
        }
    });

    return jobCard;
}

export function removeExistingCards() {
    const jobListComponent = document.querySelector(".sc-a01de6b-0");
    jobListComponent.innerHTML = "";
}

function typeOfJob(type) {
    const jobTypes = {
        "vacancy_type_apprentice": 'Apprentice',
        "vacancy_type_associate": 'Associate',
        "vacancy_type_talent_pool": 'TalentPool',
        "vacancy_type_effective": 'Effective',
        "vacancy_type_internship": 'Internship',
        "vacancy_type_summer": 'Summer',
        "vacancy_type_temporary": 'Temporary',
        "vacancy_type_outsource": 'Outsource',
        "vacancy_type_trainee": 'Trainee',
        "vacancy_type_volunteer": 'Volunteer',
        "vacancy_legal_entity": 'lEntity',
        "vacancy_type_parter": 'Partner',
        "vacancy_type_lecturer": 'Lecturer',
        "vacancy_type_freelancer": 'Freelancer',
        "vacancy_type_autonomous": 'Autonomous',
    };

    return jobTypes[type] || type;
}

function getBrazilianStateAbbreviation(stateName) {
    const states = {
        "Acre": "AC",
        "Alagoas": "AL",
        "Amapá": "AP",
        "Amazonas": "AM",
        "Bahia": "BA",
        "Ceará": "CE",
        "Distrito Federal": "DF",
        "Espírito Santo": "ES",
        "Goiás": "GO",
        "Maranhão": "MA",
        "Mato Grosso": "MT",
        "Mato Grosso do Sul": "MS",
        "Minas Gerais": "MG",
        "Pará": "PA",
        "Paraíba": "PB",
        "Paraná": "PR",
        "Pernambuco": "PE",
        "Piauí": "PI",
        "Rio de Janeiro": "RJ",
        "Rio Grande do Norte": "RN",
        "Rio Grande do Sul": "RS",
        "Rondônia": "RO",
        "Roraima": "RR",
        "Santa Catarina": "SC",
        "São Paulo": "SP",
        "Sergipe": "SE",
        "Tocantins": "TO"
    };

    return states[stateName] || stateName;
}