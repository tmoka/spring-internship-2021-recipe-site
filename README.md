# spring-internship-2021-recipe-site

Cookpad Online Spring Internship 2021 のリポジトリです。インターンシップ参加者はこのリポジトリを fork してアプリケーションを実装してください。


## TODOS
### BASIC
* 基本課題を終わらせる

### ADVANCED
* OGP対応
* CSS in JS導入 & 各ライブラリの比較
* マイフォルダ機能の実装
(TODO 登録ボタン初期値がバグってるので直す)

* 無限スクロール
* パフォーマンス最適化 web vitals(https://web.dev/vitals/)
* GraphQL導入
* レシピ投稿（レシピエディタ）
* Poster View

### OPTIONAL
* その他改善

## Getting Started

Next.js と TypeScript で開発環境をつくるところまでをこのドキュメントに記述します。Node.js は予めインストールされている前提です。yarn が使いたい人は npm を yarn に置き換えて読んでください。

まずは必用なモジュールをインストールします。

```
$ npm install --save next react react-dom
$ npm install --save-dev typescript @types/react @types/node
```

次に `pages/index.tsx` というファイルを作って以下のように編集してください。

```typescript
import { FC } from "react";

const TopPage: FC = () => {
  return <h1>Hello Next!</h1>;
};

export default TopPage;
```

最後に開発サーバーを起動します。

```
$ npx next dev
```

http://localhost:3000/ を開いて `Hello Next!` が表示されていることを確認します。

簡単でしたね。
