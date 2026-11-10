# Parth Chaudhari — portfolio

Personal site, served by GitHub Pages at https://parth12-ui.github.io.

Plain HTML, CSS and JavaScript with no build step: edit the files and push.

## What's on it

- **Hero**: a live passing network drawn on a canvas. Click to call for the ball; move the cursor to press.
- **Project demos**: every project card opens a small interactive demo
  - LLM Confidence Under Pressure: results chart (answer retention, discrimination)
  - Passing Polygons: step-by-step K-Means splitting players into two teams
  - C-Shell: shows how a command line is split into pipeline stages and redirections
  - Reliable Transport over UDP: sliding window with cumulative ACKs; click packets to drop them
  - Packet Sniffer: hover over a captured frame's bytes to decode Ethernet / IPv4 / TCP / HTTP
  - CLI-Docs: sentence-level locks between two users
  - Remote 3D Printer Control: MQTT command and telemetry flow
- **Terminal**: press <kbd>`</kbd> (or the `>_` button). Try `help`, `projects`, `open llm`, `skills | wc -l`.
- **Command palette**: <kbd>Ctrl/⌘ K</kbd> to jump to any section, project or action.
- Light/dark theme, skill → project highlighting, deep links (`/#p/llm`), keyboard accessible, respects reduced motion.

## Editing content

Projects, skills and links live at the top of `script.js` (`PROJECTS`, `SKILLS`, `SKILL_USES`, `LINKS`).
About, experience and contact text is in `index.html`. Colours are CSS variables at the top of `styles.css`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
