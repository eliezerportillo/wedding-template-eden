const settings = {
    eventInfo: {
        dateTime: '2024-02-24T22:00:00Z',

        rsvp: {
            dateTime: '2023-12-16T16:00:00',
            name: 'Terraza el Tejaban',
            address: 'Independencia #20. 45235 Zapopan, Jalisco, México',
            addressLink: 'https://maps.app.goo.gl/zfXjQA344JyibCbs5',
            image: './img/place_photo.jpeg'
        },

    },
    bride: {
        name: 'Cesia'
    },
    groom: {
        name: 'Abdiel'
    },

    sections: [
        'my-header-section',
        'my-countdown-section',
        'my-story-section',
        'my-carousel-section',
        'my-rsvp-section',
        'my-ceremony-section',
        'my-gifts-section',
        'my-congirmation-section',
        'my-hotels-section',
        'my-footer-section'
    ]
}

function onInit() {
    showMySections(settings);
    setTitlePage(settings);
    setCoupleNames(settings);
    setWeedingDate(settings.eventInfo.dateTime);
    initCountdown(settings.eventInfo.dateTime);

    loadImages();
    initScollElements();
    initCarousel();
    setRsvpInfo(settings);
}

function showMySections(settings) {
    settings.sections.forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.style.display = 'block';
        }
    });
}

function setTitlePage(settings) {
    document.title += ` | ${settings.bride.name} & ${settings.groom.name}`;
}


function setCoupleNames(settings) {
    const groomElement = document.getElementById('groomName');
    const brideElement = document.getElementById('brideName');

    groomElement.innerHTML = settings.groom.name;
    brideElement.innerHTML = settings.bride.name;
}

function setRsvpInfo(settings) {

    const setInfo = (placeInfo, selector) => {
        const rsvpTitle = document.getElementById(`${selector}Title`);
        const rsvpAddress = document.getElementById(`${selector}Address`);
        const rsvpLink = document.getElementById(`${selector}Link`);
        const rsvpImage = document.getElementById(`${selector}Image`);

        rsvpTitle.innerHTML = placeInfo.name;
        rsvpAddress.innerHTML = placeInfo.address;
        rsvpLink.href = placeInfo.addressLink;

        if (placeInfo.image) {
            rsvpImage.src = placeInfo.image;
        } else {
            rsvpImage.hidden = true;
        }

        setWeedingHour(placeInfo.dateTime, `${selector}Hour`);
    }

    setInfo(settings.eventInfo.rsvp, 'rsvp');
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
    weddingDateElement.innerHTML = formatDate(date);
}

function setWeedingHour(date, selector) {
    const weddingHourElement = document.getElementById(selector);
    if (weddingHourElement) {
        weddingHourElement.innerHTML = convertUTCtoLocalTime(date)
    }
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

    const photos = document.querySelectorAll('.photo');

    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            const enlargedPhoto = document.getElementById('enlargedPhoto');
            enlargedPhoto.src = this.querySelector('img').src;

            const modal = document.getElementById('photoModal');
            modal.style.display = 'block';

            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', function () {
                modal.style.display = 'none';
            });
        });
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