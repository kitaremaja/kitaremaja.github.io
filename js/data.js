/* =========================================================================
 *  DATA PORTFOLIO
 *  -------------------------------------------------------------------------
 *  Edit file ini untuk mengganti seluruh konten website (teks & gambar).
 *  Setiap teks yang bisa diterjemahkan ditulis dalam format:
 *      { id: "Teks Bahasa Indonesia", en: "English text" }
 *  Gambar: letakkan file di folder assets/img/ lalu ganti path-nya di sini.
 * ========================================================================= */

const PORTFOLIO = {
  /* ---------------------------------------------------------------- PROFIL */
  profile: {
    name: "Ibnu Nurmauludin",
    shortName: "Ibnu",
    photo: "assets/img/profile.jpg",
    cv: "assets/img/CV ATS - Ibnu Nurmauludin.pdf", // ganti dengan link file CV, contoh: "assets/cv-raka.pdf"
    location: { id: "Jakarta, Indonesia", en: "Jakarta, Indonesia" },
    email: "ibnu.nurmauludin@gmail.com",
    phone: "+62 896-0175-8669",
    available: true,
    // Opsional: isi dengan endpoint Formspree (https://formspree.io) agar form kontak benar-benar mengirim email.
    // Contoh: "https://formspree.io/f/xxxxxxx". Jika kosong, form hanya menampilkan simulasi sukses.
    formEndpoint: "",
    greeting: { id: "Halo, saya", en: "Hi, I'm" },
    roles: {
      id: ["Software Engineer", "WMS and Customs Clearance Specialist", "Problem Solver"],
      en: ["Software Engineer", "WMS and Customs Clearance Specialist", "Problem Solver"],
    },
    tagline: {
      id: "Saya membangun aplikasi yang andal, skalabel, dan menyenangkan untuk digunakan — dari arsitektur backend hingga antarmuka yang rapi.",
      en: "I build reliable, scalable, and delightful software — from backend architecture to polished user interfaces.",
    },
    socials: [
      { icon: "bi-github", label: "GitHub", url: "https://github.com/" },
      { icon: "bi-linkedin", label: "LinkedIn", url: "https://linkedin.com/" },
      { icon: "bi-twitter-x", label: "X", url: "https://x.com/" },
      { icon: "bi-medium", label: "Medium", url: "https://medium.com/" },
    ],
  },

  /* ----------------------------------------------------------- TENTANG SAYA */
  about: {
    paragraphs: [
      {
        id: "Saya adalah Software Engineer dengan pengalaman lebih dari 5 tahun dalam merancang dan mengembangkan sistem berskala besar, khususnya di bidang logistik, dan kepabeanan.",
        en: "I'm a Software Engineer with 5+ years of experience designing and building large-scale systems, particularly in logistics, and customs clearance.",
      },
      {
        id: "Saya senang mengubah masalah bisnis yang kompleks menjadi solusi teknis yang sederhana dan elegan. Fokus saya adalah clean code, performa, dan kolaborasi tim yang sehat.",
        en: "I enjoy turning complex business problems into simple, elegant technical solutions. My focus is on clean code, performance, and healthy team collaboration.",
      },
    ],
    stats: [
      { value: 5, suffix: "+", label: { id: "Tahun Pengalaman", en: "Years Experience" } },
      { value: 20, suffix: "+", label: { id: "Proyek Selesai", en: "Projects Completed" } },
      { value: 5, suffix: "", label: { id: "Sertifikasi", en: "Certifications" } },
      { value: 95, suffix: "%", label: { id: "Klien Puas", en: "Client Satisfaction" } },
    ],
    highlights: [
      { icon: "bi-diagram-3", title: { id: "Arsitektur Sistem", en: "System Architecture" }, text: { id: "Microservices, event-driven, dan cloud-native.", en: "Microservices, event-driven, and cloud-native." } },
      { icon: "bi-lightning-charge", title: { id: "Performa", en: "Performance" }, text: { id: "Optimasi query, caching, dan profiling.", en: "Query optimization, caching, and profiling." } },
      { icon: "bi-people", title: { id: "Kolaborasi", en: "Collaboration" }, text: { id: "Agile, code review, dan mentoring.", en: "Agile, code review, and mentoring." } },
    ],
  },

  /* ---------------------------------------------------------------- SKILL */
  // Setiap teknologi: nama + kelas ikon logo dari Devicon (cari ikon di https://devicon.dev)
  // Tambahkan "colored" agar logo tampil dengan warna aslinya.
  // Jika logo tidak tersedia di Devicon, bisa pakai Bootstrap Icons, contoh: "bi bi-braces"
  skills: [
    {
      category: { id: "Backend", en: "Backend" },
      icon: "bi-hdd-stack",
      items: [
        { name: "PHP", icon: "devicon-php-plain colored" },
        { name: "Laravel", icon: "devicon-laravel-original colored" },
        { name: "REST API", icon: "bi bi-braces-asterisk" },
      ],
    },
    {
      category: { id: "Frontend", en: "Frontend" },
      icon: "bi-window-sidebar",
      items: [
        { name: "JavaScript", icon: "devicon-javascript-plain colored" },
        { name: "jQuery", icon: "devicon-jquery-plain colored" },
        { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
        { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
        { name: "EasyUI", icon: "bi bi-grid-1x2-fill" },
      ],
    },
    {
      category: { id: "Database", en: "Database" },
      icon: "bi-database",
      items: [
        { name: "MySQL", icon: "devicon-mysql-original colored" },
      ],
    },
  ],

  /* ---------------------------------------------------------------- PROYEK */
  // category harus sama dengan salah satu key di projectCategories
  projectCategories: [
    { key: "all", label: { id: "Semua", en: "All" } },
    { key: "web", label: { id: "Web App", en: "Web App" } },
    { key: "mobile", label: { id: "Mobile", en: "Mobile" } },
    { key: "backend", label: { id: "Backend / API", en: "Backend / API" } },
  ],
  projects: [
    {
      title: "TPS Online Garuda Indonesia Cargo",
      category: "web",
      image: "assets/img/project-garuda.png",
      year: "2021-Current",
      role: { id: "Full-Stack Engineer", en: "Full-Stack Engineer" },
      summary: {
        id: "Sistem managemen TPS untuk Garuda Indonesia Cargo",
        en: "TPS Management System for Garuda Indonesia Cargo",
      },
      description: {
        id: "Membangun aplikasi TPS Online untuk memenuhi kebutuhan proses customs clearance expor dan impor. Aplikasi ini juga terintegrasi dengan sistem lain seperti Ceisa 4.0 (bea dan cukai), angkasa pura, maskapai dan sistem kasir.",
        en: "Building TPS Online application to meet the needs of export and import customs clearance processes. This application is also integrated with other systems such as Ceisa 4.0 (customs and excise), angkasa pura, airlines and cashier systems.",
      },
      tech: ["PHP", "MySQL", "EasyUI", "Bootstrap", "REST API", "JavaScript", "jQuery"],
      demo: "#",
      repo: "#",
    },
    {
      title: "Crossborder",
      category: "web",
      image: "assets/img/project-crossborder.png",
      year: "2021-Current",
      role: { id: "Full-Stack Engineer", en: "Full-Stack Engineer" },
      summary: {
        id: "Sistem manajemen transaksi impor barang kiriman kepada bea dan cukai, dan pelacakan pengiriman terintegrasi.",
        en: "Cross-border import transaction management system and integrated shipment tracking.",
      },
      description: {
        id: "Membangun sistem managemen dan transaksi pertukaran data elektronik antara pengusaha kepabeanan dengan bea dan cukai yang tansaksinya lebih dari 1000 barang setiap hari.",
        en: "Developing a system for managing and transacting electronic data exchange between entrepreneurs and customs and excise, with a transaction volume of more than 1000 shipments per day.",
      },
      tech: ["PHP", "MySQL", "EasyUI", "Bootstrap", "REST API", "JavaScript", "jQuery"],
      demo: "#",
      repo: "#",
    },
    {
      title: "KASMIN",
      category: "web",
      image: "assets/img/project-kasmin.png",
      year: "2025",
      role: { id: "Full-Stack Engineer", en: "Full-Stack Engineer" },
      summary: {
        id: "Sistem kas register untuk operasional kantor.",
        en: "Register cash system for office operations.",
      },
      description: {
        id: "Membangun sistem kas register untuk operasional kantor.",
        en: "Developing a register cash system for office operations.",
      },
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "jQuery"],
      demo: "#",
      repo: "#",
    },
    {
      title: "DAGADIGI",
      category: "web",
      image: "assets/img/project-dagadigi.png",
      year: "2022",
      role: { id: "Web Developer", en: "Web Developer" },
      summary: {
        id: "Website Publisher Musik.",
        en: "Music Publisher Website.",
      },
      description: {
        id: "Membangun website publisher musik untuk salah satu label musik.",
        en: "Developing a music publisher website for one of the music labels.",
      },
      tech: ["Bootstrap", "Tailwind CSS", "JavaScript"],
      demo: "https://www.dagadigi.co.id/",
      repo: "#",
    },
    {
      title: "Sistem Tracking Barang",
      category: "web",
      image: "assets/img/project-tracking.png",
      year: "2025",
      role: { id: "Full-Stack Engineer", en: "Full-Stack Engineer" },
      summary: {
        id: "Sistem tracking barang.",
        en: "Tracking System.",
      },
      description: {
        id: "Membangun sistem tracking barang untuk salah satu perusahaan logistik, dan bisa terintegrasi dengan vendor kurir lain.",
        en: "Developing a tracking system for one of the logistics companies and can be integrated with other courier vendors.",
      },
      tech: ["PHP", "MySQL", "Bootstrap", "Admin LTE", "JavaScript", "jQuery"],
      demo: "#",
      repo: "#",
    },
    {
      title: "Ceisa 4.0 Core",
      category: "backend",
      image: "assets/img/project-api.jpg",
      year: "2021-Current",
      role: { id: "Software Architect", en: "Software Architect" },
      summary: {
        id: "Integrasi Sistem aplikasi pertukaran data dengan bea dan cukai dalam program CEISA 4.0.",
        en: "System integration application for data exchange with customs and excise in CEISA 4.0 program.",
      },
      description: {
        id: "Merancang dan membangun sistem integrasi data antar perusahaan dengan bea dan cukai untuk mempermudah proses ekspor dan impor, serta memastikan kelancaran arus barang dan dokumen.",
        en: "Designing and building a data integration system between companies and customs and excise to facilitate the export and import process, and ensure the smooth flow of goods and documents.",
      },
      tech: ["PHP", "REST API"],
      demo: "#",
      repo: "#",
    },
  ],

  /* ----------------------------------------------------------- PENGALAMAN */
  experience: [
    {
      period: { id: "2021 — Sekarang", en: "2021 — Present" },
      role: { id: "Software Engineer", en: "Software Engineer" },
      company: "Gudang Jago Sejahtera",
      location: "Jakarta",
      points: [
        { id: "Membangun dan Mengembangkan arsitektur microservices untuk platform logistik.", en: "Build and develop microservices architecture for the logistics platform." },
        { id: "Mengintegrasikan API Bea dan Cukai.", en: "Integrate customs API." },
      ],
    },
    {
      period: { id: "2019 — 2021", en: "2019 — 2021" },
      role: { id: "Staff Expor Laut", en: "Ocean Export Staff" },
      company: "Royal Persada Cargo",
      location: "Jakarta",
      points: [
        { id: "Melakukan penanganan dan penyelesaian dokumen ekspor laut", en: "Handled and processed ocean export documents" },
        { id: "Memastikan kelancaran arus barang dan dokumen", en: "Ensured the smooth flow of goods and documents" },
      ],
    },
    {
      period: { id: "2018 — 2019", en: "2018 — 2019" },
      role: { id: "Leader Impor E-Commerce", en: "E-Commerce Import Leader" },
      company: "Trans Kargo Internasional",
      location: "Jakarta",
      points: [
        { id: "Memimpin tim impor e-commerce dan melakukan penanganan dan penyelesaian dokumen impor e-commerce", en: "Lead the e-commerce import team and handle and process e-commerce import documents" },
        { id: "Mengembangkan fitur impor e-commerce", en: "Developed e-commerce import features" },
      ],
    },
    {
      period: { id: "2015 — 2017", en: "2015 — 2017" },
      role: { id: "Staff Expor Impor", en: "Customs Clearance Staff" },
      company: "Royal Logistics",
      location: "Jakarta",
      points: [
        { id: "Melakukan penanganan dan penyelesaian dokumen ekspor impor", en: "Handled and processed import and export documents" },
        { id: "Memastikan kelancaran arus barang dan dokumen", en: "Ensured the smooth flow of goods and documents" },
      ],
    },
  ],

  /* ------------------------------------------------------------ PENDIDIKAN */
  education: [
    {
      period: "2016 — 2021",
      degree: { id: "S1 Sistem Informasi", en: "B.Sc. in Information Systems" },
      school: "Universitas Budi Luhur",
      detail: { id: "IPK 3.50 / 4.00", en: "GPA 3.50 / 4.00" },
      icon: "bi-mortarboard",
    },
    {
      period: "2012 — 2015",
      degree: { id: "SMK — Jurusan Teknik Mesin", en: "Vocational High School — Mechanical Engineering" },
      school: "SMKN 56 Jakarta",
      detail: { id: "", en: "" },
      icon: "bi-book",
    },
  ],

  /* ----------------------------------------------------------- SERTIFIKASI */
  certifications: [
    { name: "Computer Algorithm Competency", issuer: "Budi Luhur University", year: "2018", icon: "bi-cpu", url: "#" },
    { name: "ERP and Business Analytices", issuer: "Monsoon Academy", year: "2019", icon: "bi-boxes", url: "#" },
    { name: "Google Professional UI UX Development", issuer: "Google", year: "2024", icon: "bi-google", url: "#" },
    { name: "TOEFL Prediction", issuer: "TOEFL.ID", year: "2026", icon: "bi-chat-left-quote", url: "#" },
    { name: "Basic Grammar", issuer: "IFLOW English Education Center", year: "2026", icon: "bi-chat-left-text", url: "#" },
  ],

  /* -------------------------------------------------- TEKS ANTARMUKA (UI) */
  ui: {
    nav_home: { id: "Beranda", en: "Home" },
    nav_about: { id: "Tentang", en: "About" },
    nav_skills: { id: "Keahlian", en: "Skills" },
    nav_projects: { id: "Proyek", en: "Projects" },
    nav_experience: { id: "Pengalaman", en: "Experience" },
    nav_education: { id: "Pendidikan", en: "Education" },
    nav_contact: { id: "Kontak", en: "Contact" },
    available: { id: "Tersedia untuk proyek baru", en: "Available for new projects" },
    btn_projects: { id: "Lihat Proyek", en: "View Projects" },
    btn_cv: { id: "Unduh CV", en: "Download CV" },
    scroll: { id: "Gulir", en: "Scroll" },
    about_eyebrow: { id: "Tentang Saya", en: "About Me" },
    about_title: { id: "Mengubah ide menjadi <em>kode yang bermakna</em>", en: "Turning ideas into <em>meaningful code</em>" },
    skills_eyebrow: { id: "Keahlian", en: "Skills" },
    skills_title: { id: "Teknologi yang <em>saya kuasai</em>", en: "Technologies <em>I work with</em>" },
    projects_eyebrow: { id: "Portofolio", en: "Portfolio" },
    projects_title: { id: "Proyek <em>pilihan</em>", en: "Selected <em>projects</em>" },
    project_detail: { id: "Lihat Detail", en: "View Details" },
    project_role: { id: "Peran", en: "Role" },
    project_year: { id: "Tahun", en: "Year" },
    project_tech: { id: "Teknologi", en: "Tech Stack" },
    project_demo: { id: "Live Demo", en: "Live Demo" },
    project_repo: { id: "Source Code", en: "Source Code" },
    exp_eyebrow: { id: "Perjalanan Karier", en: "Career Journey" },
    exp_title: { id: "Pengalaman <em>kerja</em>", en: "Work <em>experience</em>" },
    edu_eyebrow: { id: "Pendidikan & Sertifikasi", en: "Education & Certifications" },
    edu_title: { id: "Terus <em>belajar & berkembang</em>", en: "Always <em>learning & growing</em>" },
    edu_heading: { id: "Latar Belakang Pendidikan", en: "Educational Background" },
    cert_heading: { id: "Sertifikasi", en: "Certifications" },
    cert_view: { id: "Lihat kredensial", en: "View credential" },
    contact_eyebrow: { id: "Kontak", en: "Contact" },
    contact_title: { id: "Mari <em>bekerja sama</em>", en: "Let's <em>work together</em>" },
    contact_text: { id: "Punya proyek, peluang kerja, atau sekadar ingin menyapa? Kirimkan pesan, saya akan membalas secepatnya.", en: "Have a project, a job opportunity, or just want to say hi? Send me a message and I'll reply as soon as possible." },
    form_name: { id: "Nama Lengkap", en: "Full Name" },
    form_email: { id: "Email", en: "Email" },
    form_subject: { id: "Subjek", en: "Subject" },
    form_message: { id: "Pesan", en: "Message" },
    form_send: { id: "Kirim Pesan", en: "Send Message" },
    form_invalid: { id: "Mohon lengkapi kolom ini dengan benar.", en: "Please fill out this field correctly." },
    form_success: { id: "Terima kasih! Pesan Anda telah terkirim.", en: "Thank you! Your message has been sent." },
    footer_rights: { id: "Hak cipta dilindungi.", en: "All rights reserved." },
    footer_made: { id: "Dibuat dengan", en: "Crafted with" },
  },
};
