const settings = {
    eventInfo: {
        tagline: '¡Nos Casamos!',
        dateTime: '2024-01-27T22:00:00Z',
        ceremony: {
            name: 'CEREMONIA',
            address: 'Primera IAFCJ',
            image: './img/church.png',
            hour: '3:00 PM',
            url: "https://maps.app.goo.gl/mXkvo94tB7pT32f8A"
        },
        rsvp: {
            name: 'SALÓN',
            address: 'Cielito Mío',
            image: './img/location.png',
            hour: '5:00 PM',
            url: "https://maps.app.goo.gl/hHtUwRvvUKDTyiDf7"
        },
    },
    bride: {
        name: 'Keren'
    },
    groom: {
        name: 'Ángel'
    }
}

function onInit() {
    setTitlePage(settings);
    setCoupleNames(settings);
    setWeedingDate(settings.eventInfo.dateTime);
    initCountdown(settings.eventInfo.dateTime);
    setWeedingHour(settings.eventInfo.ceremony.hour);
    setCocktailHour(settings.eventInfo.rsvp.hour);
    loadImages();
    initScollElements();
    setRsvpInfo(settings);
}

function setTitlePage(settings) {
    document.title += ` | ${settings.bride.name} & ${settings.groom.name}`;
    const titleElement = document.getElementById('tagline');
    titleElement.innerHTML = settings.eventInfo.tagline;
}


function setCoupleNames(settings) {
    const groomElement = document.getElementById('groomName');
    const brideElement = document.getElementById('brideName');

    groomElement.innerHTML = settings.groom.name;
    brideElement.innerHTML = settings.bride.name;
}

function setRsvpInfo(settings) {
    const rsvpTitle = document.getElementById('rsvpTitle');
    const rsvpAddress = document.getElementById('rsvpAddress');
    const rsvpImage = document.getElementById('rsvpImage');
    const rsvpMapLink = document.getElementById('rsvpMapLink');

    const ceremonyTitle = document.getElementById('ceremonyTitle');
    const ceremonyAddress = document.getElementById('ceremonyAddress');
    const ceremonyImage = document.getElementById('ceremonyImage');
    const ceremonyMapLink = document.getElementById('ceremonyMapLink');

    rsvpTitle.innerHTML = settings.eventInfo.rsvp.name;
    rsvpAddress.innerHTML = settings.eventInfo.rsvp.address;
    rsvpImage.src = settings.eventInfo.rsvp.image;
    rsvpMapLink.href = settings.eventInfo.rsvp.url;

    ceremonyTitle.innerHTML = settings.eventInfo.ceremony.name;
    ceremonyAddress.innerHTML = settings.eventInfo.ceremony.address;
    ceremonyImage.src = settings.eventInfo.ceremony.image;
    ceremonyMapLink.href = settings.eventInfo.ceremony.url;
}

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
        const secondsElement = document.getElementById('countdown-seconds');

        daysElement.innerHTML = days;
        hoursElement.innerHTML = hours;
        minutesElement.innerHTML = minutes;
        secondsElement.innerHTML = seconds;
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
    weddingDateElement.innerHTML = formatDate(date);
}

function setWeedingHour(hour) {
    const weddingHourElement = document.getElementById('ceremonyHour');
    weddingHourElement.innerHTML = hour
}

function setCocktailHour(hour) {
    const weddingHourElement = document.getElementById('cocktailHour');
    weddingHourElement.innerHTML = hour
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

function showImage(imageSrc) {
    document.getElementById('fullImage').src = imageSrc;
    document.getElementById('overlay').style.display = 'flex';
}

function hideImage() {
    document.getElementById('overlay').style.display = 'none';
}