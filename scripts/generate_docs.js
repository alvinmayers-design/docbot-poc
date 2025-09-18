#!/usr/bin/env node
/*
  Node script invoked by the GitHub Action. It:
  - Reads the PR event payload
  - Loads a unified diff between base and head
  - Fills the prompt template
  - Calls OpenAI to produce Markdown
  - Writes docs/ALVIN_PR_<num>.md
*/

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { OpenAI } = require('openai');

// ---- Inputs from the Action env ----
const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) throw new Error('GITHUB_EVENT_PATH missing');
const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));

const repo = process.env.GITHUB_REPOSITORY; // e.g. owner/repo
const prNumber = event.pull_request.number;
const base = event.pull_request.base.sha;
const head = event.pull_request.head.sha;
const baseRef = event.pull_request.base.ref;
const headRef = event.pull_request.head.ref;
const author = event.pull_request.user.login;

// ---- Compute unified diff ----
// Ensure we have both SHAs locally
execSync(`git fetch --no-tags --depth=2 origin ${base} ${head}`, { stdio: 'inherit' });
const diffText = execSync(`git diff --unified=2 ${base}...${head}`, { encoding: 'utf8' });

// ---- Load prompt template ----
const tpl = fs.readFileSync(path.join(__dirname, 'prompt_template.txt'), 'utf8');
const filled = tpl
  .replace('{{repo_full_name}}', repo)
  .replace('{{pr_number}}', prNumber)
  .replace('{{author}}', author)
  .replace('{{base_ref}}', baseRef)
  .replace('{{head_ref}}', headRef)
  .replace('{{diff_text}}', diffText.replace(/```/g, '```\u200b'));

// ---- Call OpenAI ----
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error('OPENAI_API_KEY not set');
const client = new OpenAI({ apiKey });

async function run() {
  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    temperature: 0.2,
    messages: [
      { role: 'user', content: filled }
    ]
  });

  const md = completion.choices[0].message.content;
  const outDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `ALVIN_PR_${prNumber}.md`);
  fs.writeFileSync(outPath, md, 'utf8');
  console.log(`::set-output name=doc_path::${outPath}`);
  // Also echo a short preview for the PR comment
  const preview = md.split('\n').slice(0, 20).join('\n');
  fs.writeFileSync(path.join(outDir, `ALVIN_PR_${prNumber}.preview.txt`), preview, 'utf8');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
