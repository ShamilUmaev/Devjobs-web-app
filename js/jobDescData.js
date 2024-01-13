const mainSection = document.querySelector('.main-section');
const pageOuterContainer = document.querySelector('.page-outer-container');
let toggleModeBtn = document.querySelector("input[type='checkbox']");

import {toggleBtn, checkMode} from './darkMode.js';

const getData = async () => {
    const jobId = window.location.search.split('=')[1];
    const response = await fetch('../data.json');
    const data = await response.json();
    const filteredData = data.filter(job => job.id === parseInt(jobId));
    return filteredData[0];
}

const displayData = async () => {
    const data = await getData();
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.innerHTML = `
        <div class="card company-desc-card">
            <div class="job-company-logo" style="background-color: ${data.logoBackground};"><img src=${data.logo} class="job-company-logo-img"></div>
            <div class="company-info">
                <h4 class="company-name">${data.company}</h4>
                <p class="company-link"><a href="#">${data.website}</a></p>
            </div>
            <a class="btn-secondary" href="${data.website}">Company Site</a>
        </div>
        <div class="job-desc-outer-container">
            <div class="desc-header">
                <div class="desc-header-text">
                    <p class="posted-date"><span>${data.postedAt}</span> <span class="bullet-point"></span> <span>${data.contract}</span></p>
                    <h4 class="job-title">${data.position}</h4>
                    <p class="company-location">${data.location}</p>
                </div>
                <a class="btn-primary apply-btn" href="#">Apply Now</a>
            </div>
            <div class="desc-body">
                <p class="text-about-company">
                ${data.description}
                </p>
                <div class="job-requirements-container">
                    <h4 class="requirements-heading">Requirements</h4>
                    <p class="job-requirements-text">
                        ${data.requirements.content}
                    </p>
                    <ul class="requirements-list">
                        ${data.requirements.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="your-daily-tasks-container">
                    <h4 class="requirements-heading">What You Will Do</h4>
                    <p class="your-daily-tasks-text">
                        ${data.role.content}
                    </p>
                    <ol class="list-of-tasks">
                        ${data.role.items.map(item => `<li><span>${item}</span></li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `
    mainSection.appendChild(wrapper);
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `
        <div class="wrapper">
            <div class="desktop-only footer-job-title-container">
                <h4 class="job-title">${data.position}</h4>
                <p>So Digital Inc.</p>
            </div>
            <a class="btn-primary apply-btn" href="#">Apply Now</a>
        </div>
    `
    pageOuterContainer.appendChild(footer);
    checkMode();
}

window.addEventListener('DOMContentLoaded', displayData);
toggleModeBtn.addEventListener('click', toggleBtn);