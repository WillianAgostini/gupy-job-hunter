export function hasViewedJob(jobId: number) {
    return !!localStorage.getItem(jobId.toString());
}

export function setViewedJob(jobId: number) {
    localStorage.setItem(jobId.toString(), "{}");
}
