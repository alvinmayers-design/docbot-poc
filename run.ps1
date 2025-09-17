$env:GH_WEBHOOK_SECRET = ""changeme""
uvicorn app.main:app --reload --port 8002
