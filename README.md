# FrameForge - Videographer Portfolio (Astro)

ビデオグラファー向けに作成した、シンプルかつモダンな1ページポートフォリオです。  
Astroの静的出力を前提としているため、無料ホスティングで高速に配信できます。

## ローカル起動

```bash
npm install
npm run dev
```

`http://localhost:4321` で確認できます。

## ビルド

```bash
npm run build
```

生成物は `dist/` に出力されます。

## 無料ホスティングへのデプロイ

### 1. Vercel（推奨）

1. このディレクトリをGitHubリポジトリにpush
2. Vercelで `Add New Project` を選択
3. 対象リポジトリをImport
4. Framework Preset が `Astro` になっていることを確認
5. `Deploy` を実行

デフォルト設定のままで公開可能です。

### 2. Cloudflare Pages

1. GitHub連携でリポジトリを選択
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Deploy

### 3. Netlify

1. `Add new site` からリポジトリを接続
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

## カスタマイズポイント

- 作品データ: `src/pages/index.astro`
- 配色/タイポ/レイアウト: `src/styles/global.css`
- メタ情報・共通レイアウト: `src/layouts/MainLayout.astro`
- ヒーロー動画: `public/videos/hero-reel.mp4`（現在はPixabayフリー素材）
# Sample_Portfolio
