const checkBox = document.querySelector("input[type='checkbox']");
const pageOuterContainer = document.querySelector('.page-outer-container');
const form = document.querySelector('.form');
const popupBackground = document.querySelector('.popup-background');
const filterIcon = document.querySelector('.filter-svg');
const card = document.querySelectorAll('.card');
const jobTitles = document.querySelectorAll('.job-title');
const filterFormPopupMobile = document.querySelector('.filter-form-popup-mobile');
const fulltimeLabel = document.querySelector('.fulltime-label');

const darkMode = () => {
    pageOuterContainer.classList.toggle('dark-mode-bg');
    form.classList.toggle('dark-mode-form');
    filterIcon.classList.toggle('filter-icon-dark-mode');
    card.forEach(card => {
        card.classList.toggle('dark-mode-job-card')
    })
    jobTitles.forEach(title => {
        title.classList.toggle('dark-mode-font');
    })
    fulltimeLabel.classList.toggle('dark-mode-font');
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

popupBackground.addEventListener('click', closePopup);
filterIcon.addEventListener('click', showPopup);
checkBox.addEventListener('change', darkMode);