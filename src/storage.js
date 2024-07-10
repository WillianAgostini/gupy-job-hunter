export function hasViewedJob(jobId) {
    return !!localStorage.getItem(jobId);
}

export function setViewedJob(jobId) {
    localStorage.setItem(jobId, "{}");
}
