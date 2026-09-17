# 浜松市イベントカレンダー

浜松市内のイベント情報を月別カレンダーで表示するReactアプリケーションです。

AppSyncの接続情報が設定されている場合はAppSyncからイベントを取得し、未設定または取得失敗時はローカルのmockデータにフォールバックします。

## 必要な環境

- Node.js 22系
- npm

このリポジトリでは `.node-version` でNode.jsのバージョンを指定しています。nodenvを使う場合は、必要に応じて次のようにインストールしてください。

```bash
nodenv install
```

## セットアップ

```bash
npm ci
cp .env_sample .env.local
```

`.env.local` にAppSyncの接続情報を設定します。

```bash
VITE_APPSYNC_GRAPHQLENDPOINT=
VITE_APPSYNC_REGION=
VITE_APPSYNC_AUTHENTICATIONTYPE=apiKey
VITE_APPSYNC_APIKEY=
VITE_GA4_ID=
```

`VITE_GA4_ID` は任意です。未設定の場合、Google Analyticsは初期化されません。

## 開発サーバー

```bash
npm run dev
```

Viteのデフォルトでは、次のURLで起動します。

```text
http://localhost:5173/
```

## テスト

```bash
npm test -- --run
```

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` に出力されます。

## AppSync連携

イベント一覧は `src/lib/appsyncClient.ts` からAppSyncへGraphQLリクエストを送って取得します。

- フロント側の月形式 `YYYYMM` は、AppSyncの `event_month` 用に `YYYY-MM` へ変換します。
- AppSyncから返る日時文字列は、カレンダー比較用に `YYYY-MM-DD` へ正規化します。
- テスト実行時は外部通信せず、mockデータを使います。
