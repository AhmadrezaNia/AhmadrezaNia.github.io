"""Notify IndexNow after a successful deployment. No search-console credentials."""
from pathlib import Path
import json
from urllib.request import Request, urlopen

root = Path(__file__).resolve().parents[1]
payload = json.loads((root / 'indexnow.json').read_text(encoding='utf-8'))
request = Request(
    'https://api.indexnow.org/indexnow',
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json; charset=utf-8'},
    method='POST',
)
with urlopen(request, timeout=30) as response:
    status = response.status
    if status not in (200, 202):
        raise RuntimeError(f'Unexpected IndexNow response: HTTP {status}')
    print(f'IndexNow received {len(payload["urlList"])} URL(s): HTTP {status}.')
    if status == 202:
        print('Key validation is pending. This does not confirm indexing.')
    else:
        print('Submission received. This does not confirm indexing or ranking.')
