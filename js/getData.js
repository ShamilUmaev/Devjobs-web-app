// const pageOuterContainer = document.querySelector('.page-outer-container');
const popupBackground = document.querySelector('.popup-background');
const filterFormPopupMobile = document.querySelector('.filter-form-popup-mobile');
const filterByLocationInput = document.querySelector('#job-location');
const filterLocationForm = document.querySelector('.filter-location-form');
const fulltimeCheckbox = document.querySelector('.fulltime-checkbox');

const showPopup = () => {
    popupBackground.classList.add('overlay');
    filterFormPopupMobile.classList.remove('hidden');
    filterFormPopupMobile.classList.add('visible');
}

const closePopup = (e) => {
    if(e.target.classList.contains('overlay')) {
        popupBackground.classList.remove('overlay');
        filterFormPopupMobile.classList.remove('visible');
        filterFormPopupMobile.classList.add('hidden');
    }
}

const closePopupAfterLocationFilter = () => {
    popupBackground.classList.remove('overlay');
    filterFormPopupMobile.classList.remove('visible');
    filterFormPopupMobile.classList.add('hidden');
}

const createLoadMoreBtn = () => {
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.classList.add('btn-primary', 'load-more-btn');
    loadMoreBtn.textContent = 'Load More';
    jobsOuterContainer.appendChild(loadMoreBtn);
}

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
    createLoadMoreBtn();
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
    createLoadMoreBtn();
}

const searchByTitle = async (e) => {
    e.preventDefault();
    const data = await getData();
    const filteredJobsByTitle = data.filter(job => {
        return job.position.toLowerCase().includes(filterByTitleInput.value.toLowerCase());
    });
    displayFilteredData(filteredJobsByTitle);
    filterByTitleInput.value = '';
}

const searchJobs = async (e) => {
    e.preventDefault();
    const data = await getData();

    const locationFilterValue = filterByLocationInput.value.toLowerCase();
    const isFullTimeChecked = fulltimeCheckbox.checked;

    const filteredJobs = data.filter(job => {
        const locationMatch = job.location.toLowerCase().includes(locationFilterValue);
        const fullTimeMatch = isFullTimeChecked ? job.contract.toLowerCase() === 'full time' : true;
        return locationMatch && fullTimeMatch;
    });
    displayFilteredData(filteredJobs);
    filterByLocationInput.value = '';
    closePopupAfterLocationFilter();
    fulltimeCheckbox.checked = false;
}

const redirectToDescPage = (e) => {
    if(e.target.classList.contains('job-title')) {
        e.preventDefault();
        const jobId = e.target.parentElement.parentElement.getAttribute('id');
        window.location.href = `descpage.html?jobId=${jobId}`;
    }
}

const init2 = () => {
    popupBackground.addEventListener('click', closePopup);
    filterIcon.addEventListener('click', showPopup);
    filterByTitleForm.addEventListener('submit', searchByTitle);
    filterLocationForm.addEventListener('submit', searchJobs);
    window.addEventListener('DOMContentLoaded', displayData);
    window.addEventListener('click', redirectToDescPage);
}

init2();