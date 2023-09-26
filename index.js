

function initCountdown(date) {
    const weddingDate = new Date(date).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = weddingDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('countdown-days');
        const hoursElement = document.getElementById('countdown-hours');
        const minutesElement = document.getElementById('countdown-minutes');

        daysElement.innerHTML = days;
        hoursElement.innerHTML = hours;
        minutesElement.innerHTML = minutes;
    }

    setInterval(updateCountdown, 1000);
}

function formatDate(weddingDate) {
    const date = new Date(weddingDate);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} de ${months[monthIndex]} del ${year}`;
}

function convertUTCtoLocalTime(utcDateString) {
    const localDate = new Date(utcDateString);


    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();

    let ampm = 'am';
    if (hours >= 12) {
        ampm = 'pm';
    }

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}


function setWeedingDate(date) {
    const weddingDateElement = document.getElementById('weddingDate');
    const weddingHourElement = document.getElementById('weddingHour');
    weddingDateElement.innerHTML = formatDate(date);
    weddingHourElement.innerHTML = convertUTCtoLocalTime(date)

}

function loadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(function (img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

function initScollElements() {

    window.addEventListener('scroll', function () {

        const photos = document.querySelectorAll('.hidden');


        const hiddenElementsobserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                }
            });
        }, { threshold: 0.5 }); // threshold determina qué porcentaje del elemento debe estar visible para activar el evento

        photos.forEach((section) => {
            hiddenElementsobserver.observe(section);
        });


    });
}





let carouselShown;

function initCarousel() {
    const photoWrapper = document.querySelector('.photo-wrapper');
    carouselShown = false;
    window.addEventListener('scroll', function () {
        const distanceFromTop = photoWrapper.getBoundingClientRect().top;
        if (!carouselShown && isInViewport(photoWrapper)) {
            carouselShown = true
        }

        photoWrapper.style.transform = `translateX(-${distanceFromTop}px)`;
        if (carouselShown) {
        }
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0
        && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}