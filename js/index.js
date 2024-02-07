const popupBackground = document.querySelector('.popup-background');
const filterFormPopupMobile = document.querySelector('.filter-form-popup-mobile');
const mobileFilterByLocationInput = document.querySelector('.mobile-form .job-location'); 
const filterLocationFormMobile = document.querySelector('.filter-location-form.mobile-only');
const mobileFulltimeCheckbox = document.querySelector('.mobile-only .fulltime-checkbox');
const mainSection = document.querySelector('.main-section');
const jobsOuterContainer = document.querySelector('.jobs-outer-container');
const mobileFilterByTitleInput = document.querySelector('.mobile-form .input-filter-by-title');
const mobileFilterByTitleForm = document.querySelector('.filter-title-form.mobile-form');
const filterIcon = document.querySelector('.filter-svg');
let toggleModeBtn = document.querySelector("input[type='checkbox']");
const body = document.querySelector('body');

const desktopFilterByTitleInput = document.querySelector('.desktop-form .input-filter-by-title');
const desktopFilterByLocationInput = document.querySelector('.desktop-form .job-location');
const desktopFulltimeCheckbox = document.querySelector('.desktop-form .fulltime-checkbox');
const desktopLargeForm = document.querySelector('.desktop-form');

const globalData = {
    data: [],
    currentLoadedData: []
}

import {toggleBtn, checkMode} from './darkMode.js';

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

const showLoader = () => {
    const loaderBackground = document.createElement('div');
    loaderBackground.classList.add('loader-background');
    loaderBackground.style.width = '100%';
    loaderBackground.style.height = '100%';
    loaderBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loaderBackground.style.overflow = 'scroll';
    loaderBackground.style.position = 'fixed';
    loaderBackground.style.top = '0';
    loaderBackground.style.left = '0';
    loaderBackground.style.zIndex = '3';
    body.insertAdjacentElement('beforebegin', loaderBackground);
    document.querySelector('.loader').classList.add('visible');
} 

const closeLoader = () => {
    document.querySelector('.loader-background').remove();
    document.querySelector('.loader').classList.remove('visible');
}

const showNotFoundMsg = () => {
    jobsOuterContainer.innerHTML = '';
    const notFoundMsg = document.createElement('h2');
    notFoundMsg.classList.add('not-found-msg');
    notFoundMsg.textContent = 'No results found';
    mainSection.appendChild(notFoundMsg);
    removeLoadMoreBtn();
    if(localStorage.getItem('mode') === 'darke') {
        notFoundMsg.classList.add('dark-mode-font');
    } else {
        notFoundMsg.classList.remove('dark-mode-font');
    }
}

const removeNotFoundMsg = () => {
    document.querySelector('.not-found-msg')?.remove();
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
    mainSection.appendChild(loadMoreBtn);
}

const removeLoadMoreBtn = () => {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn?.remove();
}

const turnOfAutoCompletionOnMobile = (element) => {
    element.setAttribute("autocomplete", "off" );
}

const getData = async () => {
    // const response = await fetch('../data.json');
    const response = await fetch('https://shamilumaev.github.io/Devjobs-web-app/data.json');
    const data = await response.json();
    globalData.data = data;
    globalData.currentLoadedData = data;
    shortenJobList(globalData.data);
}

const displayData = (data) => {
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
    checkMode();
}

const displayFilteredData = (filteredJobs) => {
    jobsOuterContainer.innerHTML = '';
    shortenJobList(filteredJobs);
}

const searchByTitle = (e, filterByTitleInput) => {
    e.preventDefault();
    const filteredJobsByTitle = globalData.data.filter(job => {
        return job.position.toLowerCase().includes(filterByTitleInput.value.toLowerCase());
    });
    if(filteredJobsByTitle.length < 1) {
        removeNotFoundMsg();
        jobsOuterContainer.innerHTML = '';
        showNotFoundMsg();
        checkMode();
    } else {
        removeNotFoundMsg();
        jobsOuterContainer.innerHTML = '';
        displayFilteredData(filteredJobsByTitle);
        globalData.currentLoadedData = filteredJobsByTitle;
        toggleBtn();
    }
    // filterByTitleInput.value = '';
    console.log('gets called')
}

const searchJobsByLocationAndContract = (e, filterByLocationInput) => {
    e.preventDefault();

    const locationFilterValue = filterByLocationInput.value.toLowerCase();
    const isFullTimeChecked = mobileFulltimeCheckbox.checked;

    const filteredJobs = globalData.data.filter(job => {
        const locationMatch = job.location.toLowerCase().includes(locationFilterValue);
        const fullTimeMatch = isFullTimeChecked ? job.contract.toLowerCase().includes('full time') : true;
        return locationMatch && fullTimeMatch;
    });

    if(filteredJobs.length < 1) {
        removeNotFoundMsg();
        jobsOuterContainer.innerHTML = '';
        showNotFoundMsg();
        checkMode();
    } else {
        removeNotFoundMsg();
        jobsOuterContainer.innerHTML = '';
        displayFilteredData(filteredJobs);
        toggleBtn();
        globalData.currentLoadedData = filteredJobs;
    }
    // filterByLocationInput.value = '';
    closePopupAfterLocationFilter();
    // mobileFulltimeCheckbox.checked = false;
}

const redirectToDescPage = (e) => {
    if(e.target.classList.contains('job-title')) {
        e.preventDefault();
        const jobId = e.target.parentElement.parentElement.getAttribute('id');
        window.location.href = `descpage.html?jobId=${jobId}`;
    }
}

let startIndexOfSlice;
let endIndexOfSlice;

const shortenJobList = (data) => {
    removeLoadMoreBtn();
    if(data.length > 8) {
        startIndexOfSlice = 0;
        endIndexOfSlice = 8;
        const shortenedJobsList = data.slice(startIndexOfSlice, endIndexOfSlice);
        displayData(shortenedJobsList);
        createLoadMoreBtn(); 
    } else {
        displayData(data);
        removeLoadMoreBtn();
    }
}

const loadMoreJobs = (e) => {
    if(!e.target.classList.contains('load-more-btn')) return;
    
    if(globalData.currentLoadedData.length < 8) {
        removeLoadMoreBtn();
        return;
    }

    startIndexOfSlice += 8;
    endIndexOfSlice += 8;

    const nextLoadedJobs = globalData.currentLoadedData.slice(startIndexOfSlice, endIndexOfSlice);
    showLoader();
    displayData(nextLoadedJobs);
    toggleBtn();
    setTimeout(() => {
        closeLoader();
    }, 500);

    if(endIndexOfSlice > globalData.currentLoadedData.length) {
        removeLoadMoreBtn();
    }
}

const searchByAllInputs = (title, location, contract) => {
    const titleInputValue = title.value.toLowerCase();
    const locationValue = location.value.toLowerCase();
    const checkBoxValue = contract.checked;

    const filteredJobsByAllInputs = globalData.data.filter(job => {
        const matchByTitle = job.position.toLowerCase().includes(titleInputValue);
        const matchByLocation = job.location.toLowerCase().includes(locationValue)
        const matchByContract = checkBoxValue ? job.contract.toLowerCase().includes('full time') : true;
        return matchByTitle && matchByLocation && matchByContract;
    });

    if(filteredJobsByAllInputs.length < 1) {
        removeNotFoundMsg();
        jobsOuterContainer.innerHTML = '';
        showNotFoundMsg();
        checkMode();
    } else {
        removeNotFoundMsg();
        jobsOuterContainer.innerHTML = '';
        displayFilteredData(filteredJobsByAllInputs);
        toggleBtn();
        globalData.currentLoadedData = filteredJobsByAllInputs;
    }
}

const laptopMediaQuery = window.matchMedia("(min-width: 992px)")
const changePlaceholderForLargedevice = (laptopMediaQuery) => {
    if (laptopMediaQuery.matches) {
        document.querySelector('.desktop-form .input-filter-by-title').placeholder = 'Filter by title, companies, expertise...'
    } else {
        document.querySelector('.desktop-form .input-filter-by-title').placeholder = 'Filter by title...'
    }
}

const tabletMediaQuery = window.matchMedia("(min-width: 768px)")
const takeInputValuesToMobileForm = (tabletMediaQuery) => {
    if (tabletMediaQuery.matches) {
        desktopFilterByTitleInput.value = mobileFilterByTitleInput.value;
        desktopFilterByLocationInput.value = mobileFilterByLocationInput.value;
        desktopFulltimeCheckbox.checked = mobileFulltimeCheckbox.checked;
    } else {
        mobileFilterByTitleInput.value = desktopFilterByTitleInput.value;
        mobileFilterByLocationInput.value = desktopFilterByLocationInput.value;
        mobileFulltimeCheckbox.checked = desktopFulltimeCheckbox.checked;
        turnOfAutoCompletionOnMobile(mobileFilterByTitleForm);
        turnOfAutoCompletionOnMobile(mobileFilterByLocationInput);
    }
}

const init = () => {
    popupBackground.addEventListener('click', closePopup);
    filterIcon.addEventListener('click', showPopup);
    mobileFilterByTitleForm.addEventListener('submit', (e) => {
        searchByTitle(e, mobileFilterByTitleInput);
    });
    filterLocationFormMobile.addEventListener('submit', (e) => {
        searchJobsByLocationAndContract(e, mobileFilterByLocationInput);
        console.log(filterLocationFormMobile);
    });
    document.addEventListener('DOMContentLoaded', getData);
    jobsOuterContainer.addEventListener('click', redirectToDescPage);
    window.addEventListener('click', loadMoreJobs);
    toggleModeBtn.addEventListener('click', toggleBtn);
    // Attach listener function on state changes
    laptopMediaQuery.addEventListener("change", () => {
        changePlaceholderForLargedevice(laptopMediaQuery);
    });
    tabletMediaQuery.addEventListener("change", () => {
        takeInputValuesToMobileForm(tabletMediaQuery);
    });
    changePlaceholderForLargedevice(laptopMediaQuery);

    desktopLargeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchByAllInputs(desktopFilterByTitleInput, desktopFilterByLocationInput, desktopFulltimeCheckbox);
    });
}

init();
