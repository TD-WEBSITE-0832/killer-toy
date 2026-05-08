document.addEventListener('DOMContentLoaded', () => {

    const unlockBtn = document.getElementById('unlockBtn');
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const langBtns = document.querySelectorAll('.lang-btn');

    // LANGUAGE SYSTEM

    function changeLang(lang, clickedBtn) {

        document.querySelectorAll('[data-uz]').forEach(item => {

            item.innerHTML =
                item.getAttribute(`data-${lang}`);

        });

        langBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        clickedBtn.classList.add('active');

        document.documentElement.lang = lang;
    }

    langBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            const lang =
                btn.textContent.toLowerCase();

            changeLang(lang, btn);

        });

    });

    // MUSIC TOGGLE

    let isMusicPlaying = false;

    musicToggle.addEventListener('click', () => {

        if (isMusicPlaying) {

            bgMusic.pause();

            musicToggle.classList.remove('playing');

        } else {

            bgMusic.play().catch(e =>
                console.log("Audio play failed:", e)
            );

            musicToggle.classList.add('playing');

        }

        isMusicPlaying = !isMusicPlaying;

    });

    // UNLOCK LOGIC

    unlockBtn.addEventListener('click', () => {

        unlockBtn.innerHTML =
            '<i class="fas fa-unlock"></i>';

        setTimeout(() => {

            introScreen.classList.add('slide-up');

            mainContent.classList.remove('hidden');

            if (!isMusicPlaying) {

                bgMusic.play().then(() => {

                    isMusicPlaying = true;

                    musicToggle.classList.add('playing');

                }).catch(e => {

                    console.log(
                        "Auto-play prevented by browser"
                    );

                });

            }

            setTimeout(() => {

                introScreen.style.display = 'none';

            }, 800);

        }, 300);

    });

    // SCROLL BUTTON

    const scrollDownBtn =
        document.getElementById('scrollDownBtn');

    if (scrollDownBtn) {

        scrollDownBtn.addEventListener('click', () => {

            const messageSection =
                document.getElementById('messageSection');

            messageSection.scrollIntoView({
                behavior: 'smooth'
            });

        });

    }

    // HEADER SCROLL

    window.addEventListener('scroll', () => {

        const header =
            document.querySelector('.app-header');

        if (window.scrollY > window.innerHeight - 100) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

    });

});

document.addEventListener('DOMContentLoaded', () => {
    // 1. TO'Y SANASINI O'RNATISH (Sana va vaqtni shu yerdan o'zgartirasiz)
    // Sinash uchun kelajakdagi sanani qo'ydim (masalan: 17-may)
    const weddingDate = new Date("May 17, 2026 18:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const gap = weddingDate - now;

        // Elementlarni topib olamiz
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        // Agar sana o'tib ketgan bo'lsa yoki xato bo'lsa, hammasini 00 qilamiz
        if (gap <= 0) {
            if(daysEl) daysEl.innerText = "00";
            if(hoursEl) hoursEl.innerText = "00";
            if(minutesEl) minutesEl.innerText = "00";
            if(secondsEl) secondsEl.innerText = "00";
            return;
        }

        // Matematik hisob-kitob
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        // Ekranga chiqarish (Raqam 10 dan kichik bo'lsa, oldiga 0 qo'shadi)
        if(daysEl) daysEl.innerText = d.toString().padStart(2, '0');
        if(hoursEl) hoursEl.innerText = h.toString().padStart(2, '0');
        if(minutesEl) minutesEl.innerText = m.toString().padStart(2, '0');
        if(secondsEl) secondsEl.innerText = s.toString().padStart(2, '0');
    }

    // Har bir soniyada (1000 millisekund) funksiyani yangilab turish
    setInterval(updateCountdown, 1000);

    // Sahifa yuklanishi bilan darhol ishga tushirish (1 soniya kutib o'tirmaslik uchun)
    updateCountdown();
});

