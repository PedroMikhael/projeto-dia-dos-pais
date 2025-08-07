document.addEventListener("DOMContentLoaded", () => {
    
    const fadeInElements = document.querySelectorAll(".fade-in");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeInElements.forEach(el => observer.observe(el));

   
    const images = document.querySelectorAll(".carousel-images img");
    let currentIndex = 0;
    if (images.length > 0) {
        images[0].classList.add("active");
    }
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove("active");
            if (i === index) {
                img.classList.add("active");
            }
        });
    }
    function nextImage() {
        if (images.length === 0) return;
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }
    function prevImage() {
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }
    document.querySelector(".next").addEventListener("click", nextImage);
    document.querySelector(".prev").addEventListener("click", prevImage);
    setInterval(nextImage, 4000);

  
    function createTimer(elementId, startDateString) {
        const timerElement = document.getElementById(elementId);
        if (!timerElement) return; 
        const startDate = new Date(startDateString);
        function update() {
            const now = new Date();
            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();
            let hours = now.getHours() - startDate.getHours();
            let minutes = now.getMinutes() - startDate.getMinutes();
            let seconds = now.getSeconds() - startDate.getSeconds();

            if (seconds < 0) { minutes--; seconds += 60; }
            if (minutes < 0) { hours--; minutes += 60; }
            if (hours < 0) { days--; hours += 24; }
            if (days < 0) {
                months--;
                const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            const pad = (num) => String(num).padStart(2, '0');
            timerElement.textContent = `${years} anos, ${months} meses, ${days} dias, ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
        }
        setInterval(update, 1000);
        update();
    }
    createTimer("timer-pedro", "2006-05-09T00:00:00");
    createTimer("timer-julio", "2010-06-01T00:00:00");
    createTimer("timer-marco", "2012-03-20T00:00:00");

   
    const musicControls = document.querySelectorAll('.music-controls');

    musicControls.forEach((control) => {
        const btn = control.querySelector('.music-toggle');
        const audio = control.querySelector('.audio');
        const originalText = btn.textContent;

        btn.addEventListener('click', () => {
            if (audio.paused) {
                
                musicControls.forEach(otherControl => {
                    const otherAudio = otherControl.querySelector('.audio');
                    const otherBtn = otherControl.querySelector('.music-toggle');
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                        otherBtn.textContent = otherBtn.dataset.originalText || originalText;
                    }
                });

               
                audio.play();
                btn.dataset.originalText = originalText;
                btn.textContent = `Pausar música ⏸️`;
            } else {
                audio.pause();
                btn.textContent = originalText;
            }
        });
    });
});