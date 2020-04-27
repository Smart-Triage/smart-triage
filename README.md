![Deploy on production](https://github.com/Smart-Triage/smart-triage/workflows/Deploy%20on%20production/badge.svg?branch=master)

<br />
<p align="center">
  <a href="https://github.com/Smart-Triage/smart-triage">
    <img src="https://nemocnice.online/img/email-assets/logo_text.png" alt="Logo" height="120">
  </a>

  <h3 align="center">Smart Triage</h3>

  <p align="center">
    Using technology to speed up triage in hospitals during the Covid-19 pandemic
    <br />
    <br />
    <a href="https://nemocnice.online">View Demo</a>
    ·
    <a href="https://github.com/Smart-Triage/smart-triage/issues">Report a Bug</a>
    ·
    <a href="https://github.com/Smart-Triage/smart-triage/issues">Request Feature</a>
  </p>
</p>

## About The Project

### Inspiration

We have first hand experience in front lines during the pandemic. Thanks to that, we see the problems with current procedures and are able to think of better solutions using technology. For this project, we decided to tackle the process of triage - that is dividing patients arriving at a hospital into groups based on their risk of having Covid-19. This is done to prevent the spread of infection throughout hospitals. This is now done by conducting a triage worker conducting an unnecessary interview to fill out a form for the patient, without which the patient won't be able to enter a hospital. This puts at risk both the patient - of getting infected while waiting in the queue, and the triage worker - of getting infected by the patient during the interview. We aim to alleviate this risk and increase the throughput of patients at the same time. All of this without endangering patient's personal information and without any additional infrastructure needed.

### What it does

We built a web app, allowing patient to fill out the necessary form on his smartphone, either in the queue, or on his way to the hospital. The triage worker then simply scans a QR code from patient's phone with all of the relevant information and assesses his risk of being infected. He then generates a QR code including patient's risk, as well as the time, date, and triage worker's name. At this point, the patient can be on his way into the hospital and show medical personnel his color coded risk assessment right in the app.

### Our Goal

We aim to speed up the triage of patients in hospitals and also reduce the risk of infection by reducing exposure of medical workers to potentially infectious patients.

### How it came to be

This project was concieved during Hack Košice Digital 2020, an online only hackathon. Over the weekend we managed to build a funtioning prototype and won the Health Challenge and were also the overall winners of the hackathon.

## Built With

- [Vue.js](https://vuejs.org/)
- [bento-starter](https://bento-starter.netlify.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Node.js 12.x
- npm 6.x

```sh
npm install npm@latest -g
```

We recommned using VSCode, but feel free to use your editor or IDE of choice. We're using ESLint to lint our code and Prettier to ensure uniform formating. Please download ESLint and Prettier extentions for your editor or IDE. **Our CI server will reject code with linting errors.**

### Installation

The project is known to be working on Node.js v12.16.1, we're having some problems on Node 13.

1. Clone the smart-triage

```sh
git clone https://github.com/Smart-Triage/smart-triage.git
```

2. Install NPM packages

```sh
npm install
```

## Roadmap

See the [open issues](https://github.com/Smart-Triage/smart-triage/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Want to help?

1.  Contact us at [info@nemocnice.online](mailto:info@nemocnice.online)
1.  Get a task assigned [https://github.com/Smart-Triage/smart-triage/projects](https://github.com/Smart-Triage/smart-triage/projects)
1.  Make a new branch freature/your-awesome-feature
1.  Make your changes
1.  Open a Pull request to merge your changes to the `dev` branch

If you're already on the team, please read and live by the **Developer guide**.

## Contact

Smart Triage [info@nemocnice.online](mailto:info@nemocnice.online)

Project Link: [https://github.com/Smart-Triage/smart-triage](https://github.com/Smart-Triage/smart-triage)

DevPost: [https://devpost.com/software/smart-triage](https://devpost.com/software/smart-triage)

### Core Team

We're a team of students from Prague, Czech Republic.

- Vasil Kostin
- Tom Kuna
- Ľuboš Repka
- Tomáš Trejdl
