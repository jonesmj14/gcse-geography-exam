# 📐 GCSE Geography Exam Generator
### Edexcel A Specification · Daily Randomised Practice Papers

A fully client-side React app that generates unique GCSE Geography practice papers every day, covering all 10 topics from the **Edexcel A** specification.

---

## ✨ Features

- 📅 **Daily Paper** — A new unique paper is generated every day using a date-based seed. Everyone gets the same questions on the same day; the paper resets at midnight.
- 📋 **10 Topics Covered** — All Edexcel A units including Coastal Change, Tectonic World, Globalisation, Superpowers, and more.
- ⏱️ **Timed & Practice Modes** — Simulate real exam conditions or practise at your own pace.
- 💡 **Hints & Mark Guides** — Examiner-style tips for every question type (1–8 marks).
- ⚙️ **Custom Papers** — Filter by specific topics to focus your revision.

---

## 🚀 Deploy to GitLab Pages

This project is pre-configured for **GitLab Pages** via `.gitlab-ci.yml`.

### Steps

1. **Create a new GitLab project** at [gitlab.com](https://gitlab.com)

2. **Upload this zip** or push via git:
   ```bash
   git init
   git remote add origin https://gitlab.com/YOUR_USERNAME/YOUR_PROJECT.git
   git add .
   git commit -m "Initial commit: GCSE Geography Exam Generator"
   git push -u origin main
   ```

3. **GitLab CI automatically builds and deploys** — check the pipeline under `CI/CD > Pipelines`

4. **Your app goes live at:**
   ```
   https://YOUR_USERNAME.gitlab.io/YOUR_PROJECT/
   ```

> **Note:** It may take a few minutes after the first pipeline run for the Pages site to become active. Enable it under `Settings > Pages` if needed.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Requires **Node.js 18+**.

---

## 📁 Project Structure

```
gcse-geography-exam-generator/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx          # React entry point
│   └── App.jsx           # Main app (all topics, questions, UI)
├── .gitignore
├── .gitlab-ci.yml        # GitLab Pages CI/CD pipeline
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🗺️ Topics Covered

| Topic | Key Content |
|---|---|
| The Changing Landscapes of the UK | Rock types, coastal & river landscapes |
| The Living World | Ecosystems, rainforests, hot deserts |
| Coastal Change and Conflict | Processes, landforms, management |
| River Processes and Pressures | Processes, landforms, flooding |
| Globalisation | TNCs, global connections, India |
| Regenerating Places | Place identity, urban/rural change |
| Superpowers | US & China, global governance |
| Migration, Identity & Sovereignty | Migration types, impacts, Brexit |
| The Tectonic World | Plate tectonics, earthquakes, volcanoes |
| Changing Weather & Climate | UK weather, climate change, futures |

---

## 🔧 Customisation

All questions live in the `QUESTION_BANKS` object in `src/App.jsx`. To add new questions, follow this format:

```js
{ q: "Your question here.", marks: 4, type: "explain", hint: "Optional hint..." }
```

Valid types: `define`, `describe`, `explain`, `essay`, `recall`  
Valid marks: `1`, `2`, `4`, `6`, `8`

---

Built with React + Vite · No backend required · 100% client-side
