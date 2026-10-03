# Aaron Nia — professional portfolio

Live site: https://ahmadrezania.github.io/

A responsive static portfolio for applied ML and research, hosted on GitHub Pages. No framework or package installation is required.

## Layout and interaction

- A full-width university cover and centered profile introduce Aaron, his current role, and LinkedIn contact.
- On desktop, a single portrait moves from the opening profile into the persistent sidebar as the page scrolls. The sidebar tracks the current section. On smaller screens, the profile stays in the header and navigation becomes a compact menu.
- The portrait transition, smooth scrolling, and hover movement respect the visitor's reduced-motion preference.
- All twelve distinct research works have figures, summaries, expandable method/evaluation notes, month dates, and paper links. Filters cover authorship and research area; empty year groups disappear. A publication bookmark reveals its entry even when filters would otherwise hide it.
- Industry experience separates the full-time Milwaukee Tool role from the summer internship. Contributions are shared across both roles because the source résumé combines them.
- Teaching, mentorship, education, awards, reviewing service, and an expandable first-page résumé preview are included. The preview uses an image rendered from the public PDF, so it works without a browser PDF plugin. LinkedIn is the primary contact channel.
- Light/dark themes, keyboard focus indicators, a skip link, native figure dialogs, and mobile PDF links support different browsing needs.

## Update content

- Edit `template.html` for biography, dated news, experience, education, teaching, service, and contact details.
- Edit `data/publications.json` for publication metadata, scientific summaries, links, and research highlights.
- Edit `data/dates.json` for publication month dates. Each date records its basis and source; keep a scheduled workshop month distinct from the acceptance announcement month.
- Put new research figures in `assets/figures/`. Use an excerpt from the corresponding paper, with descriptive alt text and a paper link.
- Replace `assets/Aaron_Nia_Resume.pdf` to update the public résumé, and regenerate `assets/resume-preview.webp` from its first page (approximately 980 pixels wide).
- Run `python build.py` to regenerate `index.html` locally. GitHub Actions also runs this automatically on every push to `main`.
- Update the footer date and `sitemap.xml` when making substantive changes.

Preview locally: `python -m http.server 8765` and open http://localhost:8765.

## Publishing

The Pages workflow publishes only rendered HTML, CSS, JavaScript, and the public assets. It does not publish build scripts or data files as site routes. The repository itself is public.

Push changes to `main` to deploy. Updates are curated on request. There is no scheduled synchronization, external analytics, private-repository feed, or automatic scraping of Google Scholar.

## Content notes

- Author names follow the supplied manuscripts. Aaron also publishes as Ahmadreza Eslaminia and Ahmad R. Eslaminia.
- Earlier manuscript versions are consolidated under the final publication, including FTL-TP under FDG-CM.
- CLEA is a NeurIPS **workshop** acceptance supplied by Aaron, not a main-conference paper. The supplied manuscript has an anonymous author block; add the complete author list and first-author designation once confirmed. October 2026 is the supplied acceptance news month; December 2026 is the scheduled workshop month.
- QoS-QoE is labeled as a preprint until its conference status is confirmed.
- The [Illinois MechSE announcement](https://mechse.illinois.edu/news/63860), published January 25, 2024, identifies WeldMon's recognition as the **Best Student Paper Award at IEEE UEMCON 2023**. The award entry uses the October 2023 conference month; the news entry uses January 2024, the announcement month. This primary source takes precedence over the résumé's earlier August date and generic award wording.
- Figures retain attribution through their corresponding publication entries. Research summaries are original paraphrases of the papers; numerical results are scoped to the reported evaluation.
- The public résumé copy omits the telephone number. The original résumé remains unchanged.
- Peer review lists venues only, never confidential reviewed manuscript titles or unconfirmed aggregate review counts.

## Cover photograph

`assets/uiuc-cover.jpg` is **Foellinger-square-TM-Flickr.jpg** by **Herbert J. Brant**, from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Foellinger-square-TM-Flickr.jpg), licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). The source image is unchanged; CSS crops its display in the header. Attribution and license links are visible on the cover. Aaron's supplied headshot is used for the profile.

Keep local paper extracts, private code, credentials, and development screenshots outside this repository.
