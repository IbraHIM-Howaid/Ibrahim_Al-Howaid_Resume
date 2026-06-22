# Personal Portfolio Website

My personal portfolio site, hand-coded from scratch in vanilla HTML, CSS, and JavaScript and deployed to a custom domain. It is the single home for my projects, resume, and contact info.

**Live site:** [al-howaid.me](https://al-howaid.me)

---

## Summary (STAR)

**Situation.** I needed a single professional home for my work that anyone could reach without a school login, something more polished and personal than a shared Drive folder.

**Task.** Design and build a portfolio website from scratch that presents my projects clearly and reflects my skills as a developer.

**Action.** I hand-coded the entire site in vanilla HTML, CSS, and JavaScript with no templates or site builders, so every part was my own. I added scroll-triggered reveal animations, an interactive 3D tilt effect on project cards, a typewriter intro, and a modal system for detailed project write-ups, then made the layout fully responsive from desktop to mobile. I deployed it on GitHub Pages and configured a custom .me domain with the correct DNS records and HTTPS.

**Result.** A live portfolio at [al-howaid.me](https://al-howaid.me) that presents all of my work in one place.

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

## Features

- Built entirely by hand, no frameworks or site builders
- Scroll-triggered reveal animations (GSAP) and an animated particle background (tsParticles)
- Interactive 3D tilt effect on project cards
- Typewriter intro animation
- Modal system that surfaces detailed write-ups per project
- Fully responsive layout from desktop to mobile
- Custom domain with HTTPS on GitHub Pages

---

## Behind the Scenes

Before writing any code I sketched the layout to decide the section order and how the page would flow on desktop and mobile. The wireframe is in the `wireframe/` folder of this repo and maps directly to the final build: a full-height hero with the typewriter intro, an about section, a projects grid with the interactive cards, education and certifications, and a contact section at the bottom.

<img width="900" height="1500" alt="wireframe" src="https://github.com/user-attachments/assets/1fa12412-1455-4999-8b6d-85eb6be4ccb4" />


The final site follows that plan closely, with the animations and the custom domain added on top during the build.

---

## What I Learned

Beyond the front-end work, this project taught me the deployment side of web development: configuring DNS records, pointing a custom domain at GitHub Pages, and getting HTTPS working through a certificate. Debugging why the bare domain would not load (and learning how A records, CNAMEs, and propagation actually behaves) was a small crash course in how the web fits together.
