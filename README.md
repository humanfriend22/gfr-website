![Hacktime](https://hackatime-badge.hackclub.com/U091GTVS93M/gfr-website)
# Gael Force Robotics Website

This is the full codebase for the Gael Force Robotics Website. This design takes inspriation from [Lukas' original version](https://github.com/ItsJustLukas78/GFRWebsite) but makes it dynamic with a working backend. Instead of static data that only developers can modify, this web app encompasses a full fledged admin panel for the GFR officer board and captains. Here are a list of main features:

- **Full landing page control**: presidents can edit the full-site banner, the main image, the `Programs` section, and the steps for the `Join Us` section.
- **Fully dynamic officers page**: officers can set their profile picture and write descriptions of their goals on the board
- **Dedicated Team Pages**: Captains can edit their team's roster, name, logo, and social links.
- **Fully Functional Blog**: PREDs can write blogs with Markdown with a bonus functionality of 5 supplementary images seperate from the cover hosted in the sites file storage
- **Sponsor page**: a full page dedicated to sponsors and supporting our work and GFR's club

## Technologies Used
- Github Actions (click the actions tab on this repository to see all the auto deploys)
- [RobotEvents API](https://www.robotevents.com/api/v2) (used to propagate team competition/award data)
- [Firebase](https://firebase.google.com/products-build)
  - Authentication (Google SSO)
  - Firestore
  - Firebase Storage
  - Hosting
  - Functions (initialize user document on signup)
  - Emulators (see `tools/emulators/init.ts` to see the dev init code)
- [Nuxt 4](https://nuxt.com/) (mainly 3 as 4 didn't come out until recently)
- [TailwindCSS 4](https://tailwindcss.com/)
- [DaisyUI 5](https://daisyui.com/)
- Other minor dependencies in `package.json`
