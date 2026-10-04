# Aaron Nia — professional portfolio

Live site: https://ahmadrezania.github.io/

A responsive static portfolio for applied ML and research, hosted on GitHub Pages. No framework or package installation is required.

## Layout and content

- One persistent sidebar provides consistent section navigation. The portrait stays circular and stationary. On mobile, the sidebar becomes a compact menu and the portrait appears with the introduction.
- The opening is a borderless first-person introduction. Inter typography, clear heading sizes, restrained color, and a consistent reading column establish the hierarchy.
- Research highlights lead with transferable ML methods: LLM agents and tool use, LLM evaluation, continual learning and anomaly detection, and federated learning and generalization. Official paper titles and detailed scientific descriptions remain in the publication entries.
- The twelve research works use readable venues and preprint labels, month dates, original figures, and expandable research details. Filters cover authorship and research area; publication bookmarks reveal entries even when filters would hide them.
- The Milwaukee Tool full-time position and internship are separate. Shared contributions reflect the source résumé's combined treatment of the roles.
- Teaching and service include Aaron's supplied update: five undergraduate students mentored across three research projects.
- Both résumé pages are rendered from the existing public PDF, with a direct PDF link. The previews work independently of embedded browser PDF support.
- LinkedIn is the primary contact. Theme selection, keyboard focus indicators, a skip link, and native figure dialogs support different browsing needs. Section navigation is immediate and keeps the active menu aligned with the destination.

## Updating

- Edit `template.html` for biography, news, appointments, education, teaching, recognition, and contact details.
- Edit `data/publications.json` for papers, summaries, project highlights, and `resources` links. Add only verified public resources. A resource may be code, a benchmark, a dataset, or a project repository; label it according to what is actually released.
- Edit `data/dates.json` for publication month dates. Each entry records its basis and source. Keep acceptance announcement dates distinct from scheduled workshop dates.
- Put figures in `assets/figures/`, with descriptive alt text and a corresponding paper link.
- Replace `assets/Aaron_Nia_Resume.pdf` to update the résumé, then regenerate both `assets/resume-page-1.webp` and `assets/resume-page-2.webp` from that same public PDF (approximately 980 pixels wide).
- Run `python build.py` to regenerate `index.html`. GitHub Actions also runs it on every push to `main`.
- Update the footer date and `sitemap.xml` for substantive changes.

Preview: `python -m http.server 8765` and open http://localhost:8765.

## Resource verification

Verified October 2026:

- [FDM-Bench](https://github.com/AhmadrezaNia/FDM-Bench) releases the benchmark prompts, questions, and labeled G-code data.
- [FDG-CM](https://github.com/AhmadrezaNia/FDG-CM) releases client/server code. Its README describes data as private and available on reasonable request; the site does not label it as an open dataset.
- [QoS–QoE Translation](https://github.com/yyu6969/qos-qoe-translation) releases the data construction pipeline and links to the dataset. The site's dataset link follows the authors' release.
- [WeldMon Public](https://github.com/beitong95/WeldMon_Public) currently releases project results and figures; its README lists further resources as pending. It is labeled **Project GitHub**, rather than claiming a complete code release.
- Private repositories remain private and are not presented as public code releases.

## Accuracy and attribution

- Author names and order follow the supplied manuscripts. Earlier versions are consolidated under the final publication, including FTL-TP under FDG-CM.
- CLEA is Aaron's supplied acceptance at a NeurIPS **workshop**. Its manuscript has an anonymous author block; complete the author list and first-author designation when confirmed. October 2026 is the supplied acceptance announcement month; December 2026 is the scheduled workshop month.
- QoS–QoE remains a preprint until conference status is confirmed.
- The [Illinois announcement](https://mechse.illinois.edu/news/63860), published January 25, 2024, identifies WeldMon's **Best Student Paper Award at IEEE UEMCON 2023**. The award uses the October 2023 conference month; the coverage uses January 2024.
- The [Open Access Government article](https://www.openaccessgovernment.org/ebook/sensing-and-computing-challenges-enhanced-data-integrity/140832/) was published October 20, 2022. Aaron's coauthorship is recorded on the [MAINTLET project page](https://t2c2.csl.illinois.edu/maintlet/).
- Figures retain attribution through the corresponding paper entries. Summaries are original paraphrases; reported numerical results retain their evaluation context.
- The public résumé omits the telephone number and preserves the complete email address. The original source résumé is unchanged.
- Reviewing service lists venues rather than confidential reviewed manuscript titles.

The supplied headshot is Aaron's profile photograph. The retained, unused `assets/uiuc-cover.jpg` is **Foellinger-square-TM-Flickr.jpg**, by **Herbert J. Brant**, from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Foellinger-square-TM-Flickr.jpg), licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## Publishing

The Pages workflow publishes rendered HTML, CSS, JavaScript, and public assets. Build scripts and source data are not published as site routes; the repository itself is public. Push to `main` to deploy.

Updates are curated on request. Keep local extracts, private code, credentials, development screenshots, and verification scripts outside this repository.

## October 2026 refinement

- Visible profile links label LinkedIn, Google Scholar, GitHub, and email. Larger circular portraits and original research figures open in a keyboard-accessible image dialog.
- The publication treatment uses blue month dates and venue names, serif year headings, larger diagrams, and outlined resource links. The same accent and rules organize industry, education, teaching, and service.
- The résumé preview is collapsed by default and includes both pages. Dark-theme previews use CSS inversion and blending for reading; the original PDF download remains unchanged.
- Industry metrics come from the supplied Cisco résumé. That résumé groups internship and full-time contributions, so the engineering impact block covers Milwaukee Tool work collectively.
- Technical expertise was expanded from the supplied résumé's programming, software, and methods. No private code or confidential reviewed manuscript titles are published.
- Mentorship dates (Jan 2024–May 2026), two UIUC teaching semesters, and the undergraduate teaching end date (May 2020) are Aaron's updates. Fall semesters are displayed without inventing exact day dates. Mechanical Design I is an undergraduate course taught by a graduate teaching assistant, not a graduate-level course.
- The mentoring outputs LLM-ADAM and FDM-Bench follow Aaron's update. The NCSA program title and link are verified at https://reu.ncsa.illinois.edu/.
- Reviewing counts are 20 review rounds in Aaron's original record plus two completed reviews for Frontiers in Manufacturing Technology confirmed by Aaron. Journal counts total 15; conferences total 7; aggregate 22 reviews across 10 venues. Counts include repeat review rounds and are not presented as a number of unique manuscripts. The source résumé's older aggregate (26 papers) is not substituted for this itemized record.
- MONET group affiliation is cross-linked to https://monet.cs.illinois.edu/. Prof. Klara Nahrstedt's Computer Science affiliation and Prof. Chenhui Shao's Mechanical Engineering affiliation are supported by their institutional faculty pages.
- Old recognition, service, and contact bookmarks still navigate to Awards or Connect.
