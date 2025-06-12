# Laravel ヘッドレス CMS

## 1. プロジェクト概要（Overview）

### プロジェクト名

Laravel ヘッドレス CMS

### 対象・目的

中規模コーポレートサイト向けの包括的なソリューションの一部として開発された、microCMS互換のヘッドレスCMSです。デザインシステムとWEBサイトテンプレートと連携し、効率的なコンテンツ管理を実現します。

### 特徴

- microCMS互換のAPI設計により、既存プロジェクトからの移行が容易
- React (Inertia.js)による直感的な管理画面UI
- tiptapによる高度なリッチテキスト編集機能
- Laravel Scoutを活用した全文検索とPVランキング機能
- WebhookによるVercel更新処理の自動化

### 想定ユースケース

- 中規模コーポレートサイトのコンテンツ管理
- ブログ・ニュースサイトの運営
- サービス紹介サイトの管理
- 採用サイトのコンテンツ更新

## 2. システム構成（System Architecture）

### システム全体の構成

```
[Figma デザインシステム]
        ↓
[Next.js テンプレート]
        ↓↑
[ヘッドレスCMS (Laravel)]
```

### 主な構成要素

- デザインシステム: Figma
- フロントエンド: Next.js
- バックエンド: Laravel
- データベース: MySQL
- デプロイ: Vercel & VPS

### デプロイ環境

- バックエンド: VPS
- 開発環境: Docker (Laravel Sail)

## 3. 主な機能（Main Features）

### コンテンツ管理機能

- リッチテキストエディタ（tiptap）
- コードブロック（lowlight & highlight.js）
- テーブル編集（ポップオーバーUI）
- 画像管理（モーダルUI）
- 下書き＆プレビュー機能

### ブログ機能

- 最新記事一覧
- カテゴリ絞り込み
- 年月絞り込み
- キーワード検索
- 人気記事一覧

### 連携機能

- WebhookによるVercel更新処理
- メール送信機能

## 4. 技術スタック（Tech Stack）

### フロントエンド（管理画面）

- フレームワーク: React 18.2.0 (Inertia.js)
- 言語: TypeScript
- 状態管理: Zustand
- スタイリング: CSS Modules + Sass

### バックエンド

- フレームワーク: Laravel 12.0
- 言語: PHP 8.2
- DB: MySQL 8.0
- API設計: RESTful API

## 8. ディレクトリ構造（Project Structure）

```
laravel_headless_cms/
├── app/                    # Laravelアプリケーションコード
│   ├── Http/              # コントローラーとミドルウェア
│   ├── Models/            # データモデル
│   └── Services/          # ビジネスロジック
├── resources/             # フロントエンドソース
│   ├── js/               # TypeScriptソース
│   └── views/            # Bladeテンプレート
├── routes/               # ルート定義
├── database/            # マイグレーションとシーダー
└── ...
```

## 13. 使用について

このプロジェクトはポートフォリオ作品として公開しているものであり、実運用や商用利用を目的としたものではありません。
無断での使用・転載・再配布は禁止しております。
