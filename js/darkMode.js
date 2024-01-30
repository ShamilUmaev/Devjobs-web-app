let toggleModeBtn = document.querySelector("input[type='checkbox']");
const body = document.querySelector('body');
const filterByTitleForm = document.querySelector('.filter-title-form');

const filterIcon = document.querySelector('.filter-svg');
const jobsOuterContainer = document.querySelector('.jobs-outer-container');
const filterByTitleInput = document.querySelector('#filter-by-title');

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
    if(window.location.pathname === '/descpage.html') {
        body.classList.add('dark-mode-midnight');
        const companyDescCard = document.querySelector('.company-desc-card');
        companyDescCard.classList.add('dark-mode-dark-blue');
        const companyName = document.querySelector('.company-name');
        companyName.classList.add('dark-mode-font');
        const jobDescOuterContainer = document.querySelector('.job-desc-outer-container');
        jobDescOuterContainer.classList.add('dark-mode-dark-blue');
        const headings = jobDescOuterContainer.querySelectorAll('h4');
        headings.forEach(title => {
            title.classList.add('dark-mode-font');
        })
        const footer = document.querySelector('.footer');
        footer.classList.add('dark-mode-dark-blue');
        const footerJobTitle = document.querySelector('.footer .job-title');
        footerJobTitle.classList.add('dark-mode-font');
    } else {
        body.classList.add('dark-mode-midnight');
        filterByTitleForm.classList.add('dark-mode-dark-blue');
        filterByTitleInput.classList.add('dark-mode-font');
        filterIcon.classList.add('filter-icon-dark-mode');
        const jobCardList = jobsOuterContainer.children;
        Array.from(jobCardList)?.forEach(child => {
            if(!child.classList.contains('load-more-btn')) {
                child.classList?.add('dark-mode-job-card');
                child.querySelector('h4').classList.add('dark-mode-font');
            }
        });
        const popup = document.querySelector('.filter-form-popup-mobile');
        popup.classList.add('dark-mode-job-card');
        const fulltimeLabels = document.querySelectorAll('.fulltime-label');
        fulltimeLabels.forEach(label => {
            label.classList.add('dark-mode-font');
        });
    }
}

const removeDarkMode = () => {
    if(window.location.pathname === '/descpage.html') {
        body.classList.remove('dark-mode-midnight');
        const companyDescCard = document.querySelector('.company-desc-card');
        companyDescCard.classList.remove('dark-mode-dark-blue');
        const companyName = document.querySelector('.company-name');
        companyName.classList.remove('dark-mode-font');
        const jobDescOuterContainer = document.querySelector('.job-desc-outer-container');
        jobDescOuterContainer.classList.remove('dark-mode-dark-blue');
        const headings = jobDescOuterContainer.querySelectorAll('h4');
        headings.forEach(title => {
            title.classList.remove('dark-mode-font');
        })
        const footer = document.querySelector('.footer');
        footer.classList.remove('dark-mode-dark-blue');
        const footerJobTitle = document.querySelector('.footer .job-title');
        footerJobTitle.classList.remove('dark-mode-font');
    } else {
        body.classList.remove('dark-mode-midnight');
        filterByTitleForm.classList.remove('dark-mode-dark-blue');
        filterByTitleInput.classList.remove('dark-mode-font');
        filterIcon.classList.remove('filter-icon-dark-mode');
        const jobCardList = jobsOuterContainer.children;
        Array.from(jobCardList)?.forEach(child => {
            child.classList?.remove('dark-mode-job-card');
            child.querySelector('h4')?.classList.remove('dark-mode-font');
        });
        const popup = document.querySelector('.filter-form-popup-mobile');
        popup.classList.remove('dark-mode-job-card');
        const fulltimeLabels = document.querySelectorAll('.fulltime-label');
        fulltimeLabels.forEach(label => {
            label.classList.remove('dark-mode-font');
        });
    }
}

const checkMode = () => {
    if(localStorage.getItem('mode') === 'dark') {
        toggleModeBtn.checked = true;
        switchToDarkMode();
    }
    else {
        toggleModeBtn.checked = false;
        removeDarkMode();
    }
}
  
export {toggleBtn, checkMode};