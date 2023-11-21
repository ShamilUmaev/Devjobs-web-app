const pageOuterContainer = document.querySelector('.page-outer-container');
const toggleModeBtn = document.querySelector("input[type='checkbox']");
const card = document.querySelector('.card');
const companyName = document.querySelector('.company-name');
const jobDescBg = document.querySelector('.job-desc-outer-container');
const headings = document.querySelectorAll('h4');
const footer = document.querySelector('.footer');

const switchToDarkMode = () => {
    pageOuterContainer.classList.add('dark-mode-midnight');
    card.classList.add('dark-mode-dark-blue');
    companyName.classList.add('dark-mode-font');
    jobDescBg.classList.add('dark-mode-dark-blue');
    headings.forEach(heading => {
        heading.classList.add('dark-mode-font');
    });
    footer.classList.add('dark-mode-dark-blue');
    localStorage.setItem('mode', 'dark');
    toggleModeBtn.checked = true;
    console.log(toggleModeBtn.checked);
    toggleModeBtn.classList.add('slider');
}

const removeDarkMode = () => {
    pageOuterContainer.classList.remove('dark-mode-midnight');
    card.classList.remove('dark-mode-dark-blue');
    companyName.classList.remove('dark-mode-font');
    jobDescBg.classList.remove('dark-mode-dark-blue');
    headings.forEach(heading => {
        heading.classList.remove('dark-mode-font');
    });
    footer.classList.remove('dark-mode-dark-blue');
    localStorage.removeItem('mode');
    toggleModeBtn.checked = false;
    toggleModeBtn.classList.remove('slider');
    console.log(toggleModeBtn.checked);
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
    } else {
        removeDarkMode();
    }
}

// window.addEventListener('DOMContentLoaded', checkMode);
window.addEventListener('pageshow', checkMode); // Add this line

toggleModeBtn.addEventListener('click', toggleMode);