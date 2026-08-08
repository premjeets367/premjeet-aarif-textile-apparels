# Textile & Apparels — Industry Website

A full front-end + PHP/MySQL backend website for a textile & apparel manufacturing
business, with a 13-page services section — each service has its **own** HTML, CSS
and JS file — and a working contact form backed by MySQL.

## Project Structure

```
Textile-Apparels/
├── index.html, about.html, services.html, faq.html, contact.html
├── css/            → style.css (design system), responsive.css
├── js/             → script.js (shared site behaviour)
├── images/         → put hero.jpg, logo.png, and services/*.jpg here
├── services/
│   ├── powerlooms.html ... cricket-gloves.html   (13 pages)
│   ├── css/powerlooms.css ... cricket-gloves.css  (13 files)
│   └── js/powerlooms.js ... cricket-gloves.js     (13 files)
├── backend/
│   ├── config.php   → DB credentials & site settings
│   ├── db.php       → PDO connection helper
│   └── contact.php  → validates & saves contact form (AJAX endpoint)
├── database/
│   └── textile.sql  → schema for the `contact` table
└── README.md
```

## Setup (XAMPP)

1. Copy the `Textile-Apparels` folder into `htdocs/`.
2. Start **Apache** and **MySQL** in the XAMPP control panel.
3. Open **phpMyAdmin** → Import → select `database/textile.sql` → Go.
   This creates the `textile` database with the `contact` table.
4. Check `backend/config.php` — defaults (`root` / no password / `localhost`)
   match a stock XAMPP install. Update if your MySQL setup differs.
5. Visit `http://localhost/Textile-Apparels/index.html` in your browser.

## Notes

- Image paths (`images/hero.jpg`, `images/logo.png`, `images/services/*`)
  are referenced as placeholders — replace with real photography before
  going live.
- The contact form submits via `fetch()` to `backend/contact.php` and is
  validated both client-side (`js/script.js`) and server-side (PHP);
  submissions are stored in the `contact` MySQL table.
- Sticky navbar, active-link highlighting, scroll-reveal, animated
  counters, FAQ accordion, gallery lightbox, hero slider, and the
  services search bar are all handled in `js/script.js`; each service
  page also has its own small script for a staggered process-step
  animation.
