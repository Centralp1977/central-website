# セントラル印刷 ウェブサイト — Claude Code 作業ルール

## ブランチ戦略（必須）

**master は本番デプロイブランチ（GitHub Pages）。直接コミットしない。**

### 作業フロー

1. **セッション開始時** — 必ず feature ブランチを切る
   ```
   git checkout master
   git pull origin master
   git checkout -b feature/作業内容の説明
   ```

2. **作業中** — feature ブランチにコミット
   ```
   git add <files>
   git commit -m "説明"
   ```

3. **セッション終了時** — push して PR を作成
   ```
   git push origin feature/作業内容
   gh pr create --base master --title "タイトル" --body "..."
   ```

4. **PR マージ後** — master に戻る
   ```
   git checkout master
   git pull origin master
   ```

### ブランチ命名規則
- `feature/hero-section-update` — 機能追加・デザイン変更
- `fix/dropdown-hover-bug` — バグ修正
- `content/company-profile-update` — テキスト・コンテンツ更新

---

## プロジェクト構成

- **メインファイル**: `central_printing_demo_v5.html` → 編集後は必ず `index.html` に同期
  ```
  cp central_printing_demo_v5.html index.html
  ```
- **下層ページ**: `president.html`（会社案内）
- **画像**: プロジェクトルート直下、認証ロゴは `Certification_logo/`
- **プレビューサーバー**: `.claude/launch.json` に設定済み（ポート 8787）

## CSS カスタムプロパティ

```css
--blue: #0E7AC4
--blue-d: #0A5A93
--blue-l: #E8F4FC
--gray: #F4F7FA
--text: #1A2B3C
--sub: #566879
--gmid: #DDE6EE
--hh: 68px   /* ヘッダー高さ */
```

## デプロイ

GitHub Pages: `https://centralp1977.github.io/central-website/`
push されると自動でデプロイ（master ブランチ）。
