const defaultConfig = {
    // Full Names & Short Names
    groom: "Rusdi",
    groomFullName: "Rusdi Bin Rajimin",
    bride: "Norhafizah",
    brideFullName: "Norhafizah Binti Hamzah",
    shortName: "Rusdi & Norhafizah",
    
    // Hosts
    hostFather: "HAMZAH BIN SELAMAT",
    hostSon: "MUHAMMAD SUFFIAN BIN BARUDIN",
    
    // Event Dates & Schedule
    dateDisplay: "Sabtu, 12 Disember 2026",
    countdownDate: "December 12, 2026 10:00:00",
    
    // Tentative / Atur Cara
    tentative: [
        { time: "10:00 Pagi", event: "Majlis Akad Nikah", location: "Masjid As-Syarif Pekan Meru" },
        { time: "11:00 Pagi - 4:00 Petang", event: "Jamuan Makan", location: "Kediaman Pengantin" }
    ],
    
    // Location
    hallName: "Kediaman Pengantin",
    hallAddress: "Lot 1801, Jalan Limau, Meru, 41050 Klang, Selangor Darul Ehsan",
    mapLinks: {
        google: "https://maps.google.com/?q=Lot+1801+Jalan+Limau+Meru+41050+Klang+Selangor",
        waze: "https://waze.com/ul?q=Lot+1801+Jalan+Limau+Meru+41050+Klang+Selangor",
        calendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Majlis+Perkahwinan+Rusdi+%26+Norhafizah&dates=20261212T020000Z/20261212T080000Z&details=Undangan+Majlis+Perkahwinan&location=Lot+1801+Jalan+Limau+Meru"
    },
    
    // Contacts
    contacts: [
        { name: "Hamzah Bin Selamat", phone: "60123456789" },
        { name: "Muhammad Suffian", phone: "60198765432" }
    ],

    // Bank
    bank: {
        name: "Maybank",
        accountNo: "162345678901",
        accountHolder: "Norhafizah Binti Hamzah"
    }
};

const getWeddingConfig = () => {
    const saved = localStorage.getItem('weddingCardConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
};

let weddingInfo = getWeddingConfig();