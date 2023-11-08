const checkBox = document.querySelector("input[type='checkbox']");
const pageOuterContainer = document.querySelector('.page-outer-container');
const form = document.querySelector('.form');
const filterIcon = document.querySelector('.filter-svg');
const jobCards = document.querySelectorAll('.job-card');
const jobTitles = document.querySelectorAll('.job-title');

const darkMode = () => {
    pageOuterContainer.classList.toggle('dark-mode-bg');
    form.classList.toggle('dark-mode-form');
    filterIcon.classList.toggle('filter-icon-dark-mode');
    jobCards.forEach(card => {
        card.classList.toggle('dark-mode-job-card')
    })
    jobTitles.forEach(title => {
        title.classList.toggle('dark-mode-font');
    })
}

checkBox.addEventListener('change', darkMode);