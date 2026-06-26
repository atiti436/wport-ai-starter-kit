---
name: exec-vercel-cli
description: >-
  Runs Vercel CLI for login, project linking, deploy, env vars, and dual-project
  monorepo patterns (resume site + open-slide). Use when the user mentions Vercel,
  vercel deploy, preview URL, or hosting resume HTML and slides from one repo
  without deploy conflicts.
---

# Vercel CLI

Upstream: [Vercel CLI](https://vercel.com/docs/cli)

**Monorepo contract（履歷 + open-slide 同 repo）：** [`docs/dual-site-layout.md`](../../docs/dual-site-layout.md)

Prefer project-local execution (no global install required):

```bash
npx vercel <command>
```

## Dual-site anti-collision rules（必讀）

當 `doc/resume/`（履歷）與 `slides/`（open-slide）在同一 repo 時，deploy **必須**遵守：

### 兩個 Project，不是一個

| Vercel Project（建議命名） | Root Directory | Build Command | Output Directory | 絕對禁止 |
|---------------------------|----------------|---------------|------------------|----------|
| `<name>-resume` | `doc/resume` | 見下方「履歷 build」 | `.`（即 `doc/resume` 內容） | `pnpm build`、output `dist` |
| `<name>-slides` | `.` | `pnpm build` | `dist` | output `doc/resume`、只 render 履歷 |

- **禁止**只用一個 Vercel Project deploy 整個 repo。
- **禁止**在 repo 根目錄放會讓兩站共用同一 `outputDirectory` 的 `vercel.json`。
- 履歷站設定在 [`doc/resume/vercel.json`](../../doc/resume/vercel.json)；簡報站用 open-slide 根目錄 build，**不要**在 `doc/resume/` 放簡報 build。

### 本機 `vercel link` 勿搞混

`.vercel/project.json` 一次只對應一個 project。Deploy 前**先確認**連的是哪一站：

```bash
cat .vercel/project.json   # 看 projectName
npx vercel link --project <name>-resume   # 履歷站
npx vercel link --project <name>-slides   # 簡報站
```

不確定時 → 用 Vercel Dashboard 手動 deploy，或 CI 裡用不同 `VERCEL_PROJECT_ID`。

**未指定 project 就 `vercel --prod` = 高風險**：可能把簡報 build 推到履歷網址，或反之。

### 履歷 build（僅 `<name>-resume` project）

Root Directory = `doc/resume` 時，使用 repo 內建的 `doc/resume/vercel.json`：

```json
{
  "buildCommand": "node ../../templates/resume/render.mjs resume.json resume.html && cp resume.html index.html",
  "installCommand": "",
  "rewrites": [{ "source": "/", "destination": "/resume.html" }]
}
```

或 Dashboard 手動設 Build Command（Root = repo 根時）：

```bash
node templates/resume/render.mjs doc/resume/resume.json doc/resume/resume.html
cp doc/resume/resume.html doc/resume/index.html
```

Output Directory = `doc/resume`。

### 簡報 build（僅 `<name>-slides` project）

```bash
pnpm install
pnpm build
```

Output Directory = `dist`（依 open-slide 版本為準）。**勿**在履歷 project 跑此 build。

### Deploy 前 checklist

- [ ] 確認目前 `vercel link` 的 project 名稱（resume vs slides）
- [ ] 履歷站：output 是 `doc/resume`，且有 `index.html` 或 `/` → `resume.html` rewrite
- [ ] 簡報站：output 是 `dist`，且 `doc/resume/` 沒有被 build 覆寫
- [ ] 沒有把 `dist/` 內容複製到 `doc/resume/`

### 與其他 skill 分工

| 使用者意圖 | 先完成的 skill | 本 skill deploy 哪一站 |
|-----------|---------------|------------------------|
| 履歷上線 | `gen-resume`（產出 `doc/resume/*.html`） | `<name>-resume` only |
| 簡報上線 | `create-slide` + open-slide build | `<name>-slides` only |
| 兩站都要 | 兩邊產物就緒後 | **分兩次** deploy，各用對應 project |

## Auth

```bash
npx vercel login
npx vercel whoami
```

For CI, create a token in Vercel dashboard → Account Settings → Tokens. Store as `VERCEL_TOKEN` in the secret store — never commit values.

## Common commands

```bash
npx vercel link
npx vercel                    # preview
npx vercel --prod             # production — 先確認 project！
npx vercel ls
npx vercel env pull
npx vercel env add <NAME> production
```

Deploy 指定 project（CI / 避免 link 搞混）：

```bash
npx vercel deploy --prod --token="$VERCEL_TOKEN"
# 搭配環境變數 VERCEL_ORG_ID + VERCEL_PROJECT_ID（每站不同）
```

## First-time Dashboard setup（雙站）

1. `npx vercel login`
2. **New Project** → 同一 GitHub repo → 名稱 `<name>-resume`
   - Root Directory: `doc/resume`
   - 使用 `doc/resume/vercel.json` 或手動設履歷 build
3. **New Project** → 同一 repo → 名稱 `<name>-slides`
   - Root Directory: `.`
   - Build: `pnpm build`，Output: `dist`
4. 各自綁定不同網域（例：`resume.example.com`、`slides.example.com`）

## CI checklist

- [ ] 履歷與簡報使用**不同的** `VERCEL_PROJECT_ID`
- [ ] `VERCEL_TOKEN` in CI secrets
- [ ] 兩條 workflow 或 matrix job，勿共用同一 deploy job 而不指定 project

## Safety

- Never commit `.vercel/` unless the team agrees — or gitignore it.
- Confirm `outputDirectory` and linked project before `--prod`.
- Wrong project = wrong site live (resume visitors see slides or vice versa).
