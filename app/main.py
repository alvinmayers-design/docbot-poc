import os, hmac, hashlib, json
from pathlib import Path
from fastapi import FastAPI, Request, Header

app = FastAPI()
GH_WEBHOOK_SECRET = os.getenv("GH_WEBHOOK_SECRET", "changeme")
DOCS_DIR = Path("docs")
UNRELEASED_DIR = DOCS_DIR / "releases" / "unreleased"

def verify_signature(sig_header: str, body: bytes) -> bool:
    if not sig_header:
        return False
    mac = hmac.new(GH_WEBHOOK_SECRET.encode(), body, hashlib.sha256)
    return hmac.compare_digest(f"sha256={mac.hexdigest()}", sig_header)

def generate_change_summary(pr: dict) -> str:
    number = pr["number"]
    title = pr.get("title", "(no title)")
    body = pr.get("body", "(no description)")
    user = pr.get("user", {}).get("login", "someone")
    head = pr.get("head", {}).get("ref", "head")
    base = pr.get("base", {}).get("ref", "base")
    return f"""# PR #{number}: {title}

**Author:** @{user}  
**Branches:** {head} → {base}

## Why
- (placeholder)

## What changed
- (placeholder)

## Impact
- (placeholder)

## Risks & Rollback
- (placeholder)

**Traceability:** Linked PR #{number}
"""

@app.get("/")
async def root():
    return {"ok": True, "service": "docbot-poc"}

@app.post("/webhook")
async def webhook(request: Request, x_github_event: str = Header(None), x_hub_signature_256: str = Header(None)):
    body = await request.body()
    if not verify_signature(x_hub_signature_256, body):
        return {"ok": False, "error": "bad signature"}

    payload = json.loads(body)

    if x_github_event == "pull_request" and payload.get("action") in {"opened", "edited", "synchronize"}:
        pr = payload["pull_request"]
        number = pr["number"]
        UNRELEASED_DIR.mkdir(parents=True, exist_ok=True)
        out_path = UNRELEASED_DIR / f"{number}-summary.md"
        out_path.write_text(generate_change_summary(pr), encoding="utf-8")
        return {"ok": True, "wrote": str(out_path)}

    return {"ok": True, "note": "event ignored"}
