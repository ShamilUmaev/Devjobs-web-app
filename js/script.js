const toggleModeBtn = document.querySelector("input[type='checkbox']");
const pageOuterContainer = document.querySelector('.page-outer-container');
const filterByTitleForm = document.querySelector('.filter-title-form');
const popupBackground = document.querySelector('.popup-background');
const filterIcon = document.querySelector('.filter-svg');
const card = document.querySelectorAll('.card');
const jobTitles = document.querySelectorAll('.job-title');
const filterFormPopupMobile = document.querySelector('.filter-form-popup-mobile');
const fulltimeLabel = document.querySelector('.fulltime-label');
const footer = document.querySelector('.footer');
const headings = document.querySelectorAll('h4');
const jobDescBg = document.querySelector('.job-desc-outer-container');
const companyName = document.querySelector('.company-name');
const customCheckbox = document.querySelector('.checkmark');
const jobsOuterContainer = document.querySelector('.jobs-outer-container');
const filterByTitleInput = document.querySelector('#filter-by-title');
// const filterByTitleForm = document.querySelector('.filter-title-form');

const switchToDarkMode = () => {
    toggleModeBtn.checked = true;
    localStorage.setItem('mode', 'dark');
    if(window.location.pathname === '/descpage.html') { 
        pageOuterContainer.classList.add('dark-mode-midnight');
        card.forEach(card => {
            card.classList.add('dark-mode-job-card');
        });
        companyName.classList.add('dark-mode-font');
        jobDescBg.classList.add('dark-mode-dark-blue');
        headings.forEach(heading => {
            heading.classList.add('dark-mode-font');
        });
        footer.classList.add('dark-mode-dark-blue');
    } else {
        pageOuterContainer.classList.add('dark-mode-midnight');
        filterByTitleForm.classList.add('dark-mode-dark-blue');
        filterIcon.classList.add('filter-icon-dark-mode');
        card.forEach(card => {
            card.classList.add('dark-mode-job-card');
        });
        fulltimeLabel.classList.add('dark-mode-font');
        jobTitles.forEach(title => {
            title.classList.add('dark-mode-font');
        });
        // customCheckbox.style.backgroundColor = '#313743';
    }
}

const removeDarkMode = () => {
    toggleModeBtn.checked = false;
    localStorage.removeItem("mode");
    if(window.location.pathname === '/descpage.html') {
        pageOuterContainer.classList.remove('dark-mode-midnight');
        card.forEach(card => {
            card.classList.remove('dark-mode-job-card');
        });
        companyName.classList.remove('dark-mode-font');
        jobDescBg.classList.remove('dark-mode-dark-blue');
        headings.forEach(heading => {
            heading.classList.remove('dark-mode-font');
        });
        footer.classList.remove('dark-mode-dark-blue');
    } else {
        pageOuterContainer.classList.remove('dark-mode-midnight');
        filterByTitleForm.classList.remove('dark-mode-dark-blue');
        filterIcon.classList.remove('filter-icon-dark-mode');
        card.forEach(card => {
            card.classList.remove('dark-mode-job-card');
        })
        fulltimeLabel.classList.remove('dark-mode-font');
        jobTitles.forEach(title => {
            title.classList.remove('dark-mode-font');
        })
    }
}

const toggleMode = () => {
    if(toggleModeBtn.checked) {
        switchToDarkMode();
    } else {
        removeDarkMode();
    }
}

const checkMode = () => {
    if(localStorage.getItem('mode') === 'dark') {
        switchToDarkMode();
    }
    else {
        removeDarkMode();
    }
}

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

const getData = async () => {
    const response = await fetch('../data.json');
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
        <a href="descpage.html"><h4 class="job-title">${job.position}</h4></a>
        <p class="company-name">${job.company}</p>
        <p class="company-location">${job.location}</p>
        `;        
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
        <a href="descpage.html"><h4 class="job-title">${job.position}</h4></a>
        <p class="company-name">${job.company}</p>
        <p class="company-location">${job.location}</p>
        `;        
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

const init = () => {
    if(window.location.pathname !== '/descpage.html') {
        popupBackground.addEventListener('click', closePopup);
        filterIcon.addEventListener('click', showPopup);
    }
    // window.addEventListener('DOMContentLoaded', checkMode);
    window.addEventListener('DOMContentLoaded', displayData);
    window.addEventListener('pageshow', checkMode);
    toggleModeBtn.addEventListener('click', toggleMode);
    filterByTitleForm.addEventListener('submit', searchByTitle);
}

init();
