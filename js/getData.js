const popupBackground = document.querySelector('.popup-background');
const filterFormPopupMobile = document.querySelector('.filter-form-popup-mobile');
const filterByLocationInput = document.querySelector('#job-location');
const filterLocationForm = document.querySelector('.filter-location-form');
const fulltimeCheckbox = document.querySelector('.fulltime-checkbox');
const mainSection = document.querySelector('.main-section');

// let globalData = [];
const globalData = {
    data: [],
    currentLoadedData: []
}

const showPopup = () => {
    popupBackground.classList.add('overlay');
    filterFormPopupMobile.classList.remove('hidden');
    filterFormPopupMobile.classList.add('visible');
}

const showNotFoundMsg = () => {
    const notFoundMsg = document.createElement('h1');
    notFoundMsg.style.textAlign = 'center';
    notFoundMsg.style.marginTop = '15rem';
    notFoundMsg.textContent = 'No results found';
    jobsOuterContainer.appendChild(notFoundMsg);
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

// const disableLoadMoreBtn = () => {
//     const loadMoreBtn = document.querySelector('.load-more-btn');
//     loadMoreBtn.disabled = true;
// }

const removeLoadMoreBtn = () => {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.remove();
}

const getData = async () => {
    const response = await fetch('../data.json?offset=0&limit=3');
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
}

const displayFilteredData = (filteredJobs) => {
    jobsOuterContainer.innerHTML = '';
    shortenJobList(filteredJobs);
}

const searchByTitle = (e) => {
    e.preventDefault();
    const filteredJobsByTitle = globalData.data.filter(job => {
        return job.position.toLowerCase().includes(filterByTitleInput.value.toLowerCase());
    });
    if(filteredJobsByTitle.length < 1) {
        jobsOuterContainer.innerHTML = '';
        showNotFoundMsg();
    } else {
        jobsOuterContainer.innerHTML = '';
        displayFilteredData(filteredJobsByTitle);
        globalData.currentLoadedData = filteredJobsByTitle;
        toggleBtn();
    }
    filterByTitleInput.value = '';
}

const searchJobsByLocationAndContract = (e) => {
    e.preventDefault();

    const locationFilterValue = filterByLocationInput.value.toLowerCase();
    const isFullTimeChecked = fulltimeCheckbox.checked;

    const filteredJobs = globalData.data.filter(job => {
        const locationMatch = job.location.toLowerCase().includes(locationFilterValue);
        const fullTimeMatch = isFullTimeChecked ? job.contract.toLowerCase() === 'full time' : true;
        return locationMatch && fullTimeMatch;
    });

    if(filteredJobs.length < 1) {
        jobsOuterContainer.innerHTML = '';
        showNotFoundMsg();
    } else {
        jobsOuterContainer.innerHTML = '';
        displayFilteredData(filteredJobs);
        toggleBtn();
        globalData.currentLoadedData = filteredJobs;
    }
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

let startIndexOfSlice;
let endIndexOfSlice;

const shortenJobList = (data) => {
        if(data.length > 5) {
            startIndexOfSlice = 0;
            endIndexOfSlice = 5;
            const shortenedJobsList = data.slice(startIndexOfSlice, endIndexOfSlice);
            displayData(shortenedJobsList);
            createLoadMoreBtn();
        } else {
            displayData(data);
        }
}

const loadMoreJobs = (e) => {
    if(!e.target.classList.contains('load-more-btn')) return;
    
    if(globalData.currentLoadedData.length < 5) {
        removeLoadMoreBtn();
        return;
    }

    startIndexOfSlice += 5;
    endIndexOfSlice += 5;

    const nextLoadedJobs = globalData.currentLoadedData.slice(startIndexOfSlice, endIndexOfSlice);
    removeLoadMoreBtn();
    displayData(nextLoadedJobs);
    toggleBtn();

    if(endIndexOfSlice < globalData.currentLoadedData.length) {
        createLoadMoreBtn();
    }
}

let toggleModeBtn = document.querySelector("input[type='checkbox']");
const pageOuterContainer = document.querySelector('.page-outer-container');
const body = document.querySelector('body')
const filterByTitleForm = document.querySelector('.filter-title-form');

const filterIcon = document.querySelector('.filter-svg');
const card = document.querySelectorAll('.card');
const jobTitles = document.querySelectorAll('.job-title');

const fulltimeLabel = document.querySelector('.fulltime-label');
const footer = document.querySelector('.footer');
const headings = document.querySelectorAll('h4');
const jobDescBg = document.querySelector('.job-desc-outer-container');
const companyName = document.querySelector('.company-name');
const customCheckbox = document.querySelector('.checkmark');
const jobsOuterContainer = document.querySelector('.jobs-outer-container');
const filterByTitleInput = document.querySelector('#filter-by-title');
// const filterByTitleForm = document.querySelector('.filter-title-form');

const toggleBtn = () => {
    if(toggleModeBtn.checked) {
        localStorage.setItem('mode', 'dark');
        switchToDarkMode();
    } else {
        localStorage.removeItem("mode");
        removeDarkMode();
    }
}


const switchToDarkMode = () => {
    // if(window.location.pathname === '/descpage.html') {
    //     body.classList.add('dark-mode-midnight');
    //     card.forEach(card => {
    //         card.classList.add('dark-mode-job-card');
    //     });
    //     companyName.classList.add('dark-mode-font');
    //     jobDescBg.classList.add('dark-mode-dark-blue');
    //     headings.forEach(heading => {
    //         heading.classList.add('dark-mode-font');
    //     });
    //     footer.classList.add('dark-mode-dark-blue');
    // } else {
        // jobsOuterContainer.children.forEach(child => {
        //     console.log(child);
        // });
        
        body.classList.add('dark-mode-midnight');
        filterByTitleForm.classList.add('dark-mode-dark-blue');
        filterByTitleInput.classList.add('dark-mode-font');
        console.log(filterByTitleInput)
        filterIcon.classList.add('filter-icon-dark-mode');
        const jobsC = jobsOuterContainer.children;
        console.log(jobsC)
        Array.from(jobsC)?.forEach(child => {
            if(!child.classList.contains('load-more-btn')) {
                child.classList?.add('dark-mode-job-card');
                child.querySelector('h4').classList.add('dark-mode-font');
            }
        });
    // }
}

const removeDarkMode = () => {
    // if(window.location.pathname === '/descpage.html') {
    //     body.classList.remove('dark-mode-midnight');
    //     card.forEach(card => {
    //         card.classList.remove('dark-mode-job-card');
    //     });
    //     companyName.classList.remove('dark-mode-font');
    //     jobDescBg.classList.remove('dark-mode-dark-blue');
    //     headings.forEach(heading => {
    //         heading.classList.remove('dark-mode-font');
    //     });
    //     footer.classList.remove('dark-mode-dark-blue');
    // } else {
        body.classList.remove('dark-mode-midnight');
        filterByTitleForm.classList.remove('dark-mode-dark-blue');
        filterByTitleInput.classList.remove('dark-mode-font');
        filterIcon.classList.remove('filter-icon-dark-mode');
        const jobsC = jobsOuterContainer.children;
        Array.from(jobsC)?.forEach(child => {
            child.classList?.remove('dark-mode-job-card');
            child.querySelector('h4')?.classList.remove('dark-mode-font');
        })
    // }
}

const checkMode = async () => {
    await getData();
    if(localStorage.getItem('mode') === 'dark') {
        toggleModeBtn.checked = true;
        switchToDarkMode();
    }
    else {
        toggleModeBtn.checked = false;
        removeDarkMode();
    }
}

// const init = () => {
    // if(window.location.pathname !== '/descpage.html') {
        
    // }
    // window.addEventListener('pageshow', checkMode);
    // toggleModeBtn.addEventListener('click', toggleMode);
// }

// init();


const init = () => {
    popupBackground.addEventListener('click', closePopup);
    filterIcon.addEventListener('click', showPopup);
    filterByTitleForm.addEventListener('submit', searchByTitle);
    filterLocationForm.addEventListener('submit', searchJobsByLocationAndContract);
    // document.addEventListener('DOMContentLoaded', getData);
    jobsOuterContainer.addEventListener('click', redirectToDescPage);
    window.addEventListener('click', loadMoreJobs);
    toggleModeBtn.addEventListener('click', toggleBtn);
    window.addEventListener('DOMContentLoaded', checkMode);
}

init();