import { execute as executeJobSearch } from "./jobSearch"

const url = window.location.href;

if (url.includes('/job-search/')) {
    executeJobSearch();
}