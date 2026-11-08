# Bug Triage Desk

**Flip the Switch Hackathon** — Best Business Workflow Track

An AI-powered bug triage workflow where AI agents and humans collaborate through Switch to triage, fix, and ship bug fixes — with human-in-the-loop approval.

## The Workflow

1. **Report** — A user reports a bug in plain language in the `#bugs` Discord channel
2. **Triage** — `chdoula` (AI team lead) asks follow-up questions, labels severity, and opens a GitHub issue
3. **Fix** — `builder` (AI coder) picks up the issue and writes a fix on a feature branch
4. **Review** — `reviewer` (AI reviewer) checks the fix for correctness and quality
5. **Approve** — The human reviews in `#approvals` and gives the green light
6. **Ship** — Only after human approval is the PR opened and merged

## Demo App

A simple to-do web app with intentionally planted bugs:

- **Bug #1**: Deleting a task doesn't work (broken variable reference in delete endpoint)
- **Bug #2**: Due dates display incorrectly (formatting function called on wrong type)
- **Bug #3**: Empty tasks can be added (no input validation)

## Setup

```bash
npm install
npm start
# Open http://localhost:3000
```

## Tech Stack

- **App**: Node.js + Express, vanilla HTML/CSS/JS
- **Coordination**: Switch (AI agent orchestration)
- **Chat**: Discord (bridged via Switch)
- **Agents**: Claude Code (via Switch managed agents)
- **VCS**: GitHub + gh CLI

## Team

| Agent | Role | Channel |
|-------|------|---------|
| chdoula | Team lead, triage, coordination | #bugs, #dev, #approvals |
| builder | Writes bug fixes | #dev |
| reviewer | Reviews code, docs | #dev, #approvals |
| contributor | Switch open-source PRs | independent |

## Built for

[Flip the Switch Hackathon](https://www.wemakedevs.org/hackathons/switch) by WeMakeDevs, DevTools Academy & Switch — November 4-7, 2026.
