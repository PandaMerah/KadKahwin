document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INJECT CONFIG DATA INTO HTML ---
    function populateConfigData() {
        document.getElementById('page-title').innerText = `Walimatulurus | ${weddingInfo.shortName}`;
        document.getElementById('cover-names').innerText = weddingInfo.shortName;
        document.getElementById('cover-date').innerText = weddingInfo.dateDisplay;
        
        document.getElementById('hero-names').innerHTML = `${weddingInfo.groom} <br><span class="ampersand">&</span><br> ${weddingInfo.bride}`;
        document.getElementById('hero-date').innerText = weddingInfo.dateDisplay;
        
        document.getElementById('info-date').innerText = weddingInfo.dateDisplay;
        document.getElementById('info-time').innerText = weddingInfo.timeDisplay;
        document.getElementById('info-arrival').innerText = weddingInfo.brideArrival;
        
        document.getElementById('info-hall').innerText = weddingInfo.hallName;
        document.getElementById('info-address').innerText = weddingInfo.hallAddress;
        
        document.getElementById('link-google').href = weddingInfo.mapLinks.google;
        document.getElementById('link-waze').href = weddingInfo.mapLinks.waze;
        document.getElementById('link-calendar').href = weddingInfo.mapLinks.calendar;

        // Populate Contacts
        const contactContainer = document.getElementById('contact-list-container');
        contactContainer.innerHTML = weddingInfo.contacts.map(contact => `
            <a href="https://wa.me/${contact.phone}?text=Assalamualaikum" target="_blank" class="contact-item">
                <span>${contact.name}</span>
                <i class="fa-brands fa-whatsapp"></i>
            </a>
        `).join('');

        // Populate Bank Info
        document.getElementById('bank-name').innerText = weddingInfo.bank.name;
        document.getElementById('bank-acc').innerText = weddingInfo.bank.accountNo;
        document.getElementById('bank-holder').innerText = weddingInfo.bank.accountHolder;

        document.getElementById('footer-year').innerText = new Date().getFullYear();

        document.getElementById('btn-copy-acc').addEventListener('click', () => {
            navigator.clipboard.writeText(weddingInfo.bank.accountNo);
            alert('No Akaun Disalin!');
        });
    }
    
    // Run the populator
    populateConfigData();


    // --- 2. BACKEND API & UI LOGIC (Keep previous code below) ---
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_6MY4kjRxzIrlSf0tKFq2OzT8ZsIrTjgu1ghv7H-HLhnISVsuNvFjluH9mLjQVYVO/exec";

    // Audio & Cover Controls
    const btnOpen = document.getElementById('btn-open-card');
    const overlay = document.getElementById('cover-overlay');
    const audio = document.getElementById('wedding-audio');
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;

    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            overlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('spinning');
            }).catch(err => console.log("Autoplay blocked:", err));
        });
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                musicBtn.classList.remove('spinning');
            } else {
                audio.play();
                musicBtn.classList.add('spinning');
            }
            isPlaying = !isPlaying;
        });
    }

    // Countdown Timer (Using config data)
    const eventDate = new Date(weddingInfo.countdownDate).getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff > 0) {
            document.getElementById('days').innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById('hours').innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById('minutes').innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById('seconds').innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
        }
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Fetch Wishes from Google Sheet
    const wishesList = document.getElementById('wishes-list');

    function escapeHtml(text) {
        return String(text).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
    }

    function loadWishes() {
        wishesList.innerHTML = `<p style="text-align:center; font-size:0.85rem; color:#888;">Memuatkan ucapan...</p>`;
        
        fetch(GOOGLE_SCRIPT_URL)
            .then(res => res.json())
            .then(response => {
                if (response.status === "success" && response.data.length > 0) {
                    wishesList.innerHTML = response.data.map(w => `
                        <div class="wish-card">
                            <div class="wish-author">${escapeHtml(w.name)}</div>
                            <div class="wish-text">${escapeHtml(w.text)}</div>
                        </div>
                    `).join('');
                } else {
                    wishesList.innerHTML = `<p style="text-align:center; font-size:0.85rem; color:#888;">Jadilah yang pertama menyampaikan ucapan!</p>`;
                }
            })
            .catch(() => {
                wishesList.innerHTML = `<p style="text-align:center; font-size:0.85rem; color:#888;">Gagal memuatkan ucapan.</p>`;
            });
    }

    loadWishes();

    // 4. Handle RSVP Submission
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = rsvpForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = "Menghantar...";

        const payload = {
            action: "rsvp",
            name: document.getElementById('rsvp-name').value,
            status: document.getElementById('rsvp-status').value,
            pax: document.getElementById('rsvp-pax').value
        };

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                alert('Terima kasih! RSVP anda telah berjaya disimpan.');
                rsvpForm.reset();
            } else {
                alert('Ralat semasa menghantar. Sila cuba lagi.');
            }
        })
        .catch(() => alert('Ralat sambungan. Sila cuba lagi.'))
        .finally(() => {
            btn.disabled = false;
            btn.innerText = "Hantar RSVP";
        });
    });

    // 5. Handle Guestbook Submission
    const wishForm = document.getElementById('guestbook-form');
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = wishForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = "Menghantar...";

        const payload = {
            action: "wish",
            name: document.getElementById('wish-name').value,
            message: document.getElementById('wish-message').value
        };

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                alert('Ucapan anda telah berjaya dikirim!');
                wishForm.reset();
                loadWishes();
            } else {
                alert('Ralat semasa mengirim ucapan.');
            }
        })
        .catch(() => alert('Ralat sambungan. Sila cuba lagi.'))
        .finally(() => {
            btn.disabled = false;
            btn.innerText = "Kirim Ucapan";
        });
    });
});