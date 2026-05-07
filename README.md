# 相続診断士協会 兵庫支部 ウェブサイト

Next.js 14（App Router）+ Supabase（PostgreSQL）で構築した相続診断士検索サイトです。

## 技術スタック

| 役割 | 技術 |
|------|------|
| フロントエンド | Next.js 14（App Router）+ TypeScript |
| スタイリング | Tailwind CSS |
| データベース | Supabase（PostgreSQL） |
| 認証（管理者） | Supabase Auth |
| ホスティング | Vercel（推奨） |

---

## セットアップ手順

### 1. Supabase プロジェクトの作成

1. [https://supabase.com](https://supabase.com) にアクセスしてアカウント作成
2. 「New project」でプロジェクトを作成（リージョン：Northeast Asia（Tokyo）推奨）
3. SQL Editorで `supabase/migrations/001_create_advisors.sql` を実行

### 2. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` を開き、Supabaseダッシュボードの「Settings > API」から値をコピー：

- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon public key
- `SUPABASE_SERVICE_ROLE_KEY` → service_role key（⚠️ 外部公開禁止）

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアクセスできます。

---

## ページ構成

| URL | 説明 |
|-----|------|
| `/` | トップ・検索一覧ページ |
| `/advisors/[id]` | 診断士 個別プロフィールページ |
| `/admin/login` | 管理者ログイン |
| `/admin/advisors` | 診断士一覧（管理画面） |
| `/admin/advisors/new` | 新規登録フォーム |

---

## Vercel へのデプロイ

```bash
# Vercel CLIでデプロイ
npx vercel

# 環境変数をVercelに設定
# Vercelダッシュボード > Settings > Environment Variables に
# .env.local の内容をすべて追加
```

---

## 管理者アカウントの作成

Supabaseダッシュボード > Authentication > Users > 「Add user」から管理者のメールアドレスとパスワードを設定してください。
