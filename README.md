# Aaron Nia — professional portfolio

Live site: https://ahmadrezania.github.io/

A responsive, accessible static portfolio for applied ML and research, hosted on GitHub Pages. No framework or package installation is required.

## Update content

- Edit `template.html` for biography, experience, education, service, and contact details.
- Edit `data/publications.json` for publication metadata, scientific summaries, links, and research highlights.
- Put new research figures in `assets/figures/`. Use an excerpt from the corresponding paper, with descriptive alt text and a paper link.
- Replace `assets/Aaron_Nia_Resume.pdf` to update the public résumé.
- Run `python build.py` to regenerate `index.html` locally. GitHub Actions also runs this automatically on every push to `main`.
- Update the footer date and `sitemap.xml` when making substantive changes.

Preview locally: `python -m http.server 8765` and open http://localhost:8765.

## Publishing

The Pages workflow publishes only rendered HTML, CSS, JavaScript, and the public assets. It does not publish build scripts or data files as site routes. The repository itself is public.

Push changes to `main` to deploy. There is no scheduled synchronization, external analytics, private-repository feed, or automatic scraping of Google Scholar. Updates are curated on request.

## Content notes

- Author names follow the supplied manuscripts. Aaron also publishes as Ahmadreza Eslaminia and Ahmad R. Eslaminia.
- Earlier manuscript versions are consolidated under the final publication, including FTL-TP under FDG-CM.
- CLEA is a NeurIPS **workshop** acceptance supplied by Aaron, not a main-conference paper. The supplied manuscript has an anonymous author block; add the complete author list and first-author designation once confirmed.
- QoS-QoE is labeled as a preprint until its conference status is confirmed.
- Figures retain attribution through their corresponding publication entries. Research summaries are original paraphrases of the papers.
- The public résumé copy omits the telephone number. The original résumé remains unchanged.
- Peer review lists venues only, never confidential reviewed manuscript titles.

Keep local paper extracts, private code, credentials, and development screenshots outside this repository.
