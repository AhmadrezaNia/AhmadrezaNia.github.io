"""Render the portfolio using only Python's standard library: python build.py."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
papers = json.loads((ROOT / "data/publications.json").read_text(encoding="utf-8"))
esc = html.escape

def link(item, cls=""):
    external = item["url"].startswith("https://")
    attrs = ' target="_blank" rel="noopener noreferrer"' if external else ''
    return f'<a class="{cls}" href="{esc(item["url"])}"{attrs}>{esc(item["label"])}<span aria-hidden="true"> ↗</span></a>'

def author_line(names):
    return ", ".join(f'<strong>{esc(n)}</strong>' if 'Eslaminia' in n else esc(n) for n in names)

def publication(p):
    authors = f'<p class="authors">{author_line(p["authors"])}</p>' if p['authors'] else ''
    first = '<span class="first-author">First author</span>' if p['first'] else ''
    return f'''<article class="publication" id="paper-{p['id']}" data-first="{str(p['first']).lower()}" data-topic="{esc(p['topic'])}">
      <button class="paper-figure" type="button" data-figure="assets/figures/{p['image']}" data-caption="{esc(p['title'])}" aria-label="Enlarge figure from {esc(p['title'])}"><img src="assets/figures/{p['image']}" alt="{esc(p['alt'])}" loading="lazy" width="300" height="200"><span aria-hidden="true">View figure ↗</span></button>
      <div class="publication-body"><div class="paper-meta"><span>{p['year']}</span><span>{esc(p['status'])}</span>{first}</div>
      <h3>{esc(p['title'])}</h3>{authors}<p class="venue">{esc(p['venue'])}</p><p class="paper-summary">{esc(p['summary'])}</p>
      <div class="paper-links">{''.join(link(x) for x in p['links'])}</div>
      <details><summary>Method & evaluation</summary><div class="paper-detail"><p><strong>Approach.</strong> {esc(p['method'])}</p><p><strong>Evidence.</strong> {esc(p['evaluation'])}</p></div></details></div></article>'''

def featured(p):
    f = p['feature']
    return f'''<article class="research-card"><div class="card-top"><span class="eyebrow">{esc(f['label'])}</span><span class="card-year">{p['year']}</span></div>
    <a class="research-image" href="#paper-{p['id']}" aria-label="Read the publication for {esc(f['title'])}"><img src="assets/figures/{p['image']}" alt="{esc(p['alt'])}" loading="lazy" width="600" height="320"></a>
    <div class="card-copy"><h3>{esc(f['title'])}</h3><p>{esc(f['description'])}</p><p class="research-result">{esc(f['result'])}</p><a class="text-link" href="#paper-{p['id']}">Explore the work <span aria-hidden="true">→</span></a></div></article>'''

template = (ROOT / 'template.html').read_text(encoding='utf-8')
template = template.replace('{{FEATURED}}', ''.join(featured(p) for p in papers if 'feature' in p))
template = template.replace('{{PUBLICATIONS}}', ''.join(publication(p) for p in papers))
template = template.replace('{{COUNT}}', str(len(papers)))
template = template.replace('{{TOPICS}}', ''.join(f'<option>{esc(t)}</option>' for t in sorted({p['topic'] for p in papers})))
(ROOT / 'index.html').write_text(template, encoding='utf-8')
print(f'Rendered {len(papers)} publications and {sum("feature" in p for p in papers)} research highlights.')
