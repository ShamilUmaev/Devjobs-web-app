const toggleModeBtn = document.querySelector("input[type='checkbox']");
const pageOuterContainer = document.querySelector('.page-outer-container');
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

const init = () => {
    // if(window.location.pathname !== '/descpage.html') {
        
    // }
    // window.addEventListener('DOMContentLoaded', checkMode);
    window.addEventListener('pageshow', checkMode);
    toggleModeBtn.addEventListener('click', toggleMode);
}

init();
