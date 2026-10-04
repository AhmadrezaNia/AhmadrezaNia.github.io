"""Render the static portfolio with Python's standard library: python build.py."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
papers = json.loads((ROOT / 'data/publications.json').read_text(encoding='utf-8'))
dates = json.loads((ROOT / 'data/dates.json').read_text(encoding='utf-8'))
esc = html.escape

def link(item):
    external = item['url'].startswith('https://') or item['url'].endswith('.pdf')
    attrs = ' target="_blank" rel="noopener noreferrer"' if external else ''
    return f'<a href="{esc(item["url"])}"{attrs}>{esc(item["label"])}</a>'

def author_line(names):
    return ', '.join(f'<strong>{esc(n)}</strong>' if 'Eslaminia' in n else esc(n) for n in names)

def publication(p):
    d = dates[p['id']]
    authors = f'<p class="authors">{author_line(p["authors"])}</p>' if p['authors'] else ''
    first = '<span class="first-author">First author</span>' if p['first'] else ''
    links = p['links'] + p.get('resources', [])
    return f'''<article class="publication" id="paper-{p['id']}" data-first="{str(p['first']).lower()}" data-topic="{esc(p['topic'])}">
      <button class="paper-figure" type="button" data-figure="assets/figures/{p['image']}" data-caption="{esc(p['title'])}" aria-label="Enlarge figure from {esc(p['title'])}"><img src="assets/figures/{p['image']}" alt="{esc(p['alt'])}" loading="lazy" width="420" height="270"><span>View figure</span></button>
      <div class="publication-body"><div class="paper-meta"><time datetime="{d['iso']}">{d['display']}</time>{first}</div>
      <h3>{esc(p['title'])}</h3>{authors}<p class="venue">{esc(p['venue'])}<span class="paper-status">{esc(p['status'])}</span></p><p class="paper-summary">{esc(p['summary'])}</p>
      <div class="paper-links">{''.join(link(x) for x in links)}</div>
      <details><summary>Research details</summary><div class="paper-detail"><p><strong>Approach.</strong> {esc(p['method'])}</p><p><strong>Evaluation.</strong> {esc(p['evaluation'])}</p></div></details></div></article>'''

def featured(p):
    f = p['feature']
    resource_links = ''.join(link(x) for x in p.get('resources', []))
    return f'''<article class="research-card"><div class="card-top"><span class="project-name">{esc(f['label'])}</span><time datetime="{dates[p['id']]['iso']}">{dates[p['id']]['display']}</time></div>
    <h3>{esc(f['title'])}</h3><p class="research-description">{esc(f['description'])}</p>
    <a class="research-image" href="#paper-{p['id']}" aria-label="Read the paper for {esc(f['label'])}"><img src="assets/figures/{p['image']}" alt="{esc(p['alt'])}" loading="lazy" width="600" height="320"></a>
    <p class="research-result">{esc(f['result'])}</p><div class="card-links"><a href="#paper-{p['id']}">Read paper</a>{resource_links}</div></article>'''

groups = []
for year in sorted({p['year'] for p in papers}, reverse=True):
    group = sorted((p for p in papers if p['year'] == year), key=lambda p: dates[p['id']]['iso'], reverse=True)
    groups.append(f'<div class="publication-year"><h3 class="year-heading">{year}</h3>'+''.join(publication(p) for p in group)+'</div>')
highlights = sorted((p for p in papers if 'feature' in p), key=lambda p: p['feature']['order'])
template = (ROOT / 'template.html').read_text(encoding='utf-8')
template = template.replace('{{FEATURED}}', ''.join(featured(p) for p in highlights))
template = template.replace('{{PUBLICATIONS}}', ''.join(groups))
template = template.replace('{{COUNT}}', str(len(papers)))
template = template.replace('{{TOPICS}}', ''.join(f'<option>{esc(t)}</option>' for t in sorted({p['topic'] for p in papers})))
(ROOT / 'index.html').write_text(template, encoding='utf-8', newline='\n')
print(f'Rendered {len(papers)} research works and {len(highlights)} project highlights.')
