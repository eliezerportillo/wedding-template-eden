const settings = {
    eventInfo: {
        dateTime: '2025-06-22T18:00:00-07:00',

        rsvp: {
            ceremony: {
                dateTime: '2025-06-22T18:00:00',
                name: '1ra. IAFCJ',
                address: 'Rio Bravo 203, Marrón, 22015 Tijuana, B.C.',
                addressLink: 'https://maps.app.goo.gl/FUnK5mibJq2fBo5Y9',
                image: './img/ceremony_photo.png'
            },
            reception: {
                dateTime: '2023-07-07T16:00:00',
                name: 'Espacio Galarza Eventos',
                address: 'Av. Ermita Sur 4744, Reynoso, 22106 Tijuana, B.C.',
                addressLink: 'https://maps.app.goo.gl/4zCQ9uwsiKkaiJ2g6',
                image: './img/reception_photo.png'
            }
        },

    },
    bride: {
        name: 'Lizeth'
    },
    groom: {
        name: 'Joel'
    },

    sections: [
        'my-header-section',
        'my-countdown-section',
        'my-story-section',
        'my-carousel-section',
        'my-quote-section',
        'my-rsvp-section',
        'my-ceremony-section',
        'my-dress-code-section',
        'my-gifts-section',
        'my-congirmation-section',
        // 'my-hashtag-section',
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

    setInfo(settings.eventInfo.rsvp.ceremony, 'ceremony');
    setInfo(settings.eventInfo.rsvp.reception, 'reception');
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
let carouselScroll = 0;

function initCarousel() {
    const photoWrapper = document.querySelector('.photo-wrapper');
    carouselShown = false;
    window.addEventListener('scroll', function () {
        if (!carouselShown && isInViewport(photoWrapper)) {
            carouselShown = true
        }

        if (carouselShown) {
            const currentScroll = window.scrollY;

            if (currentScroll > carouselScroll) {
                carouselScroll += 1; // Increment when scrolling down
            } else if (currentScroll < carouselScroll) {
                carouselScroll -= 1; // Decrement when scrolling up
            }
            photoWrapper.style.transform = `translateX(-${currentScroll}px)`;
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