# Claude Code 引き継ぎメモ

## 作業ディレクトリ

編集対象はこのリポジトリです。

```text
C:\Users\user\Documents\Brain\sample_homepage
```

GitHub リポジトリ:

```text
https://github.com/NagiNanasaki/sample_homepage.git
```

公開URL:

```text
https://naginanasaki.github.io/sample_homepage/
```

現在の最新コミット:

```text
4c9831f Add recruit badge to hero
```

`main` と `gh-pages` は同じコミットまで反映済みです。

## 主要ファイル

- `index.html`  
  ページ本体。ヘッダー、ヒーロー、各セクション、RECRUIT導線などを編集する場所。

- `styles.css`  
  ほぼ全スタイル。ヘッダー、ヒーロー、スライド、カード、スマホ表示、スクロールアニメーションを編集する場所。

- `scripts.js`  
  トップスライドショー、ハンバーガーメニュー、スクロール時のフェードアップ表示を制御。

- `assets/`  
  画像とファビコン。現在のトップ写真は Unsplash の実写素材3枚。

- `.github/workflows/pages.yml`  
  GitHub Pages 用ワークフロー。ただし現在は `gh-pages` ブランチにも同じ内容をpushして公開している。

## 今の実装内容

- トップは実写写真3枚のスライドショー。
- ヘッダー左は `favicon.svg` と同じロゴを使った `はるいろ整体院` 表示。
- 横並びナビはやめて、右上の `メニュー` ボタンに格納済み。
- スクロール時にコンテンツがふわっと出るアニメーションあり。
- ヒーロー右下に `RECRUIT / 採用サイト` の丸い導線あり。
- RECRUIT のリンク先はサンプルで `https://example.com`。
- CSSキャッシュ対策として `index.html` のCSS読み込みにバージョン文字列を付けている。

## よく触る場所

### ヘッダー

`index.html` の `<header class="site-header">` 周辺。  
見た目は `styles.css` の以下あたり。

```css
.site-header
.header-main
.brand
.brand-mark
.header-actions
.menu-toggle
.nav
```

### ヒーロー

`index.html` の `<section class="hero">` 周辺。  
見た目は `styles.css` の以下あたり。

```css
.hero
.hero-media
.hero-slider
.hero-slide
.hero-message
.hero-controls
.recruit-badge
```

### スクロールアニメーション

`scripts.js` の `revealTargets` から下。  
対象を増やす場合は `revealTargets` 配列にCSSセレクタを追加する。

関連CSS:

```css
.scroll-reveal
.scroll-reveal.is-visible
@media (prefers-reduced-motion: reduce)
```

## 画像素材

現在使っているヒーロー画像:

- `assets/slide-room-bright.jpg`
- `assets/slide-massage-room.jpg`
- `assets/slide-chiropractic.jpg`

古い生成画像と旧写真素材は削除済み。

## 編集時の注意

- 日本語ファイルはUTF-8。PowerShellの `Get-Content` だと文字化けして見えることがあるが、ブラウザ表示とファイル自体は正常。
- `index.html` のCSSバージョン文字列は、見た目を変えたら更新するとGitHub Pages上で反映確認しやすい。
  例: `styles.css?v=recruit-badge-1` を `styles.css?v=next-change-1` に変える。
- 医療・整体系のサンプルなので、誇大表現や架空実績を増やさない。
- スマホ表示でテキストやボタンが被りやすいので、必ず 390px 幅前後で確認する。
- `gh-pages` も使っているため、公開まで行う場合は `main` push 後に `gh-pages` を fast-forward してpushする。

## 公開手順

通常の作業後:

```powershell
git status --short
git add index.html styles.css scripts.js
git commit -m "変更内容がわかるメッセージ"
git push origin main
git switch gh-pages
git merge --ff-only main
git push origin gh-pages
git switch main
```

公開確認:

```text
https://naginanasaki.github.io/sample_homepage/?v=コミットID
```

## 確認ポイント

- PC幅 1366px 前後でトップが崩れていないか。
- スマホ幅 390px 前後で横スクロールが出ていないか。
- メニューボタンを押してドロップダウンが前面に出るか。
- スライドショーのドットと一時停止ボタンが押せるか。
- スクロール時にカードやセクションが表示されるか。
- RECRUITバッジが本文・スライド操作・カードに被っていないか。

## 直近の変更履歴

- `4c9831f` RECRUITバッジをヒーロー右下に追加。
- `6c9a202` スクロール時のフェードアップ表示を追加。
- `7d6bba0` 横並びナビをハンバーガーメニューへ変更。
- `d1c6580` ヘッダーロゴと院名サイズを調整。
- `c9ba36b` トップを実写写真スライドショーへ変更。
