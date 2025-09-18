# ALVIN – POC

> Assistant for Live Versioning & Insightful Narratives

**Goal:** On every PR, generate concise, high‑signal docs from the diff using an LLM, commit the doc, and comment on the PR with a preview.

## How to Demo
1. Create a feature branch and change something inside `app/` (e.g., tweak `/` payload or add a new endpoint).
2. Open a Pull Request to `main`.
3. Watch the **ALVIN PR Docs** workflow run.
4. View the PR: you’ll see an **ALVIN** comment with a preview and a committed doc in `docs/`.

## Configuration
- Add `OPENAI_API_KEY` to repo **Secrets**.
- Optional: set `OPENAI_MODEL` in the workflow (defaults to `gpt-4o-mini`).

## FAQ
**Will people get lazy and accept ALVIN’s draft as the source of truth?**
- The comment explicitly states **“POC summary. Human review required.”**
- Add a `CODEOWNERS` rule so a human doc owner must approve before merge.
- Optionally watermark the doc and fail the workflow if no human edit touches it.
