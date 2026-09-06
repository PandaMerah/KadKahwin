const defaultConfig = {
    // Couple Details
    groom: "Rusdi",
    groomFullName: "Rusdi Bin Rajimin",
    bride: "Norhafizah",
    brideFullName: "Norhafizah Binti Hamzah",
    shortName: "Rusdi & Norhafizah",
    
    // Hosts & Special Invites
    host: "Hamzah Bin Selamat",
    specialInvite: "Muhammah Suffian Bin Barudin (Anak)",
    
    // Date & Time Details
    dateDisplay: "Sabtu, 12 Disember 2026",
    countdownDate: "December 12, 2026 10:00:00",
    timeDisplay: "11:00 Pagi - 4:00 Petang",
    
    // Program Schedule
    nikahTime: "10:00 Pagi",
    nikahLocation: "Masjid As-Syarif Pekan Meru",
    receptionTime: "11:00 Pagi - 4:00 Petang",
    
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
        { name: "Muhammah Suffian", phone: "60198765432" }
    ],

    // Banking Info
    bank: {
        name: "Maybank",
        accountNo: "162345678901",
        accountHolder: "Norhafizah Binti Hamzah"
    }
};

// Retrieve updated config from localStorage if edited via website, else fallback to default
const getWeddingConfig = () => {
    const saved = localStorage.getItem('weddingCardConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
};

let weddingInfo = getWeddingConfig();