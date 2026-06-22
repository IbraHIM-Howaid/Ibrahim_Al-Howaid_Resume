# Personal Portfolio Website

My personal portfolio site, made from scratch in vanilla HTML, CSS, and JavaScript and deployed to a custom domain. It's the single home for my projects, resume, and contact info.

**Live site:** [al-howaid.me](https://al-howaid.me)

---

## Tech Stack

| Area | Tools |
|------|-------|
| Markup / Style | HTML, CSS (no framework) |
| Interactivity | Vanilla JavaScript |
| Animation | GSAP (scroll-triggered reveals), tsParticles |
| Hosting | GitHub Pages |
| Domain / DNS | Namecheap (.me), custom A + CNAME records, HTTPS |
| Tooling | Git/GitHub, VS Code |

---

## STAR Write-Up

**Situation.** I needed a single professional home for my work that anyone could reach without a school login, something more polished and personal than a shared Drive folder.

**Task.** Design and build a portfolio website from scratch that presents my projects clearly and reflects my skills as a developer.

**Action.** I built the entire site in vanilla HTML, CSS, and JavaScript with no templates or site builders, so every part was my own. I added scroll-triggered reveal animations, an interactive 3D tilt effect on project cards, a typewriter intro, and a modal system for detailed project write-ups, then made the layout fully responsive from desktop to mobile. I deployed it on GitHub Pages and configured a custom .me domain with the correct DNS records and HTTPS.

**Result.** A live portfolio at [al-howaid.me](https://al-howaid.me) that presents all of my work in one place.

---

## Features

- Built entirely by hand, no frameworks or site builders
- Scroll-triggered reveal animations (GSAP) and an animated particle background (tsParticles)
- Interactive 3D tilt effect on project cards
- Typewriter intro animation
- Modal system that surfaces detailed write-ups per project
- Fully responsive layout from desktop to mobile
- Custom domain with HTTPS on GitHub Pages

---


## What I Learned

Beyond the front-end work, this project taught me the deployment side of web development: configuring DNS records, pointing a custom domain at GitHub Pages, and getting HTTPS working through a certificate. Debugging why the bare domain wouldn't load (and learning how A records, CNAMEs, and propagation actually behave) was a small crash course in how the web fits together.
