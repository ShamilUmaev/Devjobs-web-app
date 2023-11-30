// const pageOuterContainer = document.querySelector('.page-outer-container');

const getData = async () => {
    const response = await fetch('../data.json?offset=0&limit=3');
    const data = await response.json();
    return data;
}

const displayData = async () => {
    const data = await getData();
    data.forEach(job => {
        const div = document.createElement('div');
        div.classList.add('card', 'job-card');
        div.innerHTML = `
            <div class="job-company-logo" style="background-color: ${job.logoBackground};"><img class="job-company-logo-img" src="${job.logo}"></div>
            <p class="posted-date"><span>${job.postedAt}</span> <span class="bullet-point"></span> <span>${job.contract}</span></p>
            <a href="#"><h4 class="job-title">${job.position}</h4></a>
            <p class="company-name">${job.company}</p>
            <p class="company-location">${job.location}</p>
        `;
        div.setAttribute('id', job.id);        
        jobsOuterContainer.appendChild(div);
    });
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.classList.add('btn-primary', 'load-more-btn');
    loadMoreBtn.textContent = 'Load More';
    jobsOuterContainer.appendChild(loadMoreBtn);
}

const displayFilteredData = (filteredJobs) => {
    jobsOuterContainer.innerHTML = '';
    filteredJobs.forEach(job => {
        const div = document.createElement('div');
        div.classList.add('card', 'job-card');
        div.innerHTML = `
            <div class="job-company-logo" style="background-color: ${job.logoBackground};"><img class="job-company-logo-img" src="${job.logo}"></div>
            <p class="posted-date"><span>${job.postedAt}</span> <span class="bullet-point"></span> <span>${job.contract}</span></p>
            <a href="#"><h4 class="job-title">${job.position}</h4></a>
            <p class="company-name">${job.company}</p>
            <p class="company-location">${job.location}</p>
        `;        
        div.setAttribute('id', job.id);
        jobsOuterContainer.appendChild(div);
    });
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.classList.add('btn-primary', 'load-more-btn');
    loadMoreBtn.textContent = 'Load More';
    jobsOuterContainer.appendChild(loadMoreBtn);
}

const searchByTitle = async (e) => {
    e.preventDefault();
    const data = await getData();
    const filteredByTitleJobs = data.filter(job => {
        return job.position.toLowerCase().includes(filterByTitleInput.value.toLowerCase());
    });
    displayFilteredData(filteredByTitleJobs);
    filterByTitleInput.value = '';
}

const redirectToDescPage = (e) => {
    if(e.target.classList.contains('job-title')) {
        e.preventDefault();
        const jobId = e.target.parentElement.parentElement.getAttribute('id');
        window.location.href = `descpage.html?jobId=${jobId}`;
        console.log(jobId)
    }
}

const init2 = () => {
    filterByTitleForm.addEventListener('submit', searchByTitle);
    window.addEventListener('DOMContentLoaded', displayData);
    window.addEventListener('click', redirectToDescPage);
}

init2();