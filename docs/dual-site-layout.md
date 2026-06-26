# Dual-site layout（履歷站 + open-slide 同 repo）

當 **wport 履歷**與 **open-slide 簡報**住在同一個 Git repo 時，所有 agent skill 與 Vercel 部署都必須遵守此契約，避免檔案互踩、build 互相覆蓋、或兩個網站搶同一個 output。

## 領地劃分（Territory map）

```text
repo/
├── doc/resume/              ← 履歷站領地（gen-resume 系列）
│   ├── resume.html
│   ├── resume.json
│   ├── resume-optimized.html
│   ├── interview-prep.html
│   ├── career-plan.html
│   └── vercel.json          ← 僅履歷站用（可選）
├── slides/                  ← open-slide 簡報領地（create-slide 系列）
├── themes/                  ← open-slide 主題
├── templates/               ← wport 渲染器（履歷 skill 讀取，不 deploy）
├── dist/                    ← open-slide build 輸出（簡報站 deploy 用，勿 commit 覆蓋履歷）
├── package.json             ← open-slide 依賴與 build script
└── open-slide.config.ts     ← open-slide 設定
```

| 領地 | 負責 skill | Vercel Project 名稱（建議） | Output Directory |
|------|-----------|---------------------------|------------------|
| 履歷 + 職涯報告 | `gen-resume`, `gen-resume-optimizer`, `gen-career-mentor`, `interviewer-ai` | `<name>-resume` | `doc/resume` |
| 簡報 | `create-slide`, `slide-authoring`, `apply-comments` | `<name>-slides` | `dist` |

## 跨領地禁止（所有 skill 共通）

- **履歷 skill** 不得寫入 `slides/`、`dist/`、`themes/`、不得改 `open-slide.config.ts` / open-slide 的 `package.json` scripts。
- **open-slide skill** 不得寫入 `doc/resume/`、不得改 `templates/resume/`、不得跑 `render.mjs` 覆蓋履歷 HTML。
- **任何 skill** 不得在 repo 根目錄建立會讓「兩站共用同一個 `outputDirectory`」的 `vercel.json`。
- **`dist/`** 只給 open-slide；**`doc/resume/`** 只給履歷靜態檔。禁止把簡報 build 輸出導到 `doc/resume/`。

## Vercel 雙站（不可打架）

### 鐵則

1. **兩個 Vercel Project** 指向**同一個 Git repo** — 絕不用一個 Project 同時 deploy 履歷與簡報。
2. **履歷 Project** 的 Build Command **只能**渲染履歷（或留空，若 HTML 已 commit）；**禁止**執行 `pnpm build` / open-slide build。
3. **簡報 Project** 的 Output **必須**是 `dist`（或 open-slide 文件指定路徑）；**禁止**設成 `doc/resume`。
4. 本機 `.vercel/` 一次只 link **一個** project。要 deploy 另一站時：改 Dashboard 設定，或用 `VERCEL_PROJECT_ID` / `vercel link --project <name>`，**不要**在未確認 project 名稱前 `vercel --prod`。
5. 兩站各自獨立網域／`*.vercel.app`，互不加 rewrite 搶路徑。

### Dashboard 設定對照

| | 履歷站 `<name>-resume` | 簡報站 `<name>-slides` |
|---|------------------------|-------------------------|
| Root Directory | `doc/resume` **或** `.`（見下方 vercel.json） | `.` |
| Install Command | 留空 | `pnpm install` |
| Build Command | 見下方「履歷 build」 | `pnpm build` |
| Output Directory | `doc/resume` | `dist` |

### 履歷站首頁

`render.mjs` 產出的是 `resume.html`，不是 `index.html`。履歷站 deploy 前擇一：

**A. `doc/resume/vercel.json` rewrite（建議）**

```json
{
  "rewrites": [{ "source": "/", "destination": "/resume.html" }]
}
```

**B. Build 時複製**

```bash
node ../../templates/resume/render.mjs resume.json resume.html
cp resume.html index.html
```

（若 Root Directory = `doc/resume`，路徑改為相對該目錄。）

### 建議的 `doc/resume/vercel.json`（完整範例）

```json
{
  "buildCommand": "node ../../templates/resume/render.mjs resume.json resume.html && cp resume.html index.html",
  "outputDirectory": ".",
  "installCommand": ""
}
```

當 Vercel Project 的 **Root Directory = `doc/resume`** 時，`outputDirectory: "."` 即 deploy 此資料夾內容。

### 簡報站

- 不在 `doc/resume/` 放任何 `vercel.json` 以外的 deploy 設定。
- open-slide 的 build 只在 repo 根執行；產物只進 `dist/`。

## Agent 分工

| 使用者說 | 套用 skill | 勿套用 |
|---------|-----------|--------|
| 做履歷、客製履歷、面試題、職涯計畫 | `gen-resume` 系列 | `create-slide` |
| 做簡報、改 slide | `create-slide` 系列 | `gen-resume` |
| 上架履歷網站 | `exec-vercel-cli`（resume project） | 勿對簡報 project 下 deploy |
| 上架簡報網站 | `exec-vercel-cli`（slides project） | 勿對履歷 project 下 deploy |
| 兩個都要上線 | `exec-vercel-cli` 依序設定兩個 project | 單一 `vercel --prod` 不指定 project |

## 相關 skill

- [`skills/exec-vercel-cli/SKILL.md`](../skills/exec-vercel-cli/SKILL.md)
- [`skills/gen-resume/SKILL.md`](../skills/gen-resume/SKILL.md)
- [`skills/create-slide/SKILL.md`](../skills/create-slide/SKILL.md)
