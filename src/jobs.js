export async function findJobs(urlParams) {
    const today = new Date();
    const minPublishedDate = today.setMonth(today.getMonth() - 1);
    const jobs = [];
    let offset = 0;

    while (1) {
        const promises = [
            fetchJobs(urlParams, offset),
            fetchJobs(urlParams, offset + 10),
            fetchJobs(urlParams, offset + 20),
        ];

        const resposes = await Promise.all(promises);
        const results = resposes.flatMap(x => x.data)
        const filteredData = results.filter(data => {
            const publishedDate = new Date(data.publishedDate);
            return publishedDate >= minPublishedDate;
        });

        if (filteredData.length === 0) {
            break;
        }

        jobs.push(...filteredData);
        offset += results.length;
    }
    return jobs.reverse();
}

async function fetchJobs(urlParams, offset) {
    const url = `https://portal.api.gupy.io/api/v1/jobs?jobName=${urlParams}&offset=${offset}`
    console.log(url);
    const response = await fetch(url, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7,gl;q=0.6",
            "if-none-match": "W/\"7666-YH5QCbq4zjwd6h1hVKqZoCDOqsU\"",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://portal.gupy.io/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    });

    return await response.json();
}

export async function findKeywordsInJobs(jobs, keywords) {
    const hasKeywords = [];
    jobs.forEach(job => {
      const lowerCaseText = job.description.toLowerCase();
      const containsKeyword = keywords.some(keyword => lowerCaseText.includes(keyword.toLowerCase()));
      if (containsKeyword) {
        hasKeywords.push(job);
      }
    })
    return hasKeywords;
  }
  