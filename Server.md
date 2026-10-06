Ubuntuサーバーでランキング機能を含めたタイピングゲームを稼働させるための手順です。

今回のアプリは、**フロントエンド（画面）**と**バックエンド（ランキング用のAPI）**の両方を持つ構成です。
そのため、単にNginxで静的ファイルを配信するだけでなく、Ubuntu上で**Node.js**のサーバーを動かし、フロントエンドとバックエンドの両方を提供する必要があります。

以下の手順で進めてください。

---

### 1. 手元（Windows）でビルドする
まず、Windows側でフロントエンドの最終的な配信用ファイルを作成します。コマンドプロンプト等で以下を実行します。

```bash
cd C:\Users\tossh\Desktop\ai_obj\typing_game
npm run build
```
成功すると、フォルダ内に `dist` というディレクトリが作成されます。

### 2. Ubuntu サーバーへファイルを転送
WindowsからUbuntuサーバーへ、アプリを動かすのに必要な以下のファイル・フォルダを転送します。
（転送には `scp` コマンドや、WinSCP・FileZillaなどのソフトを使うと便利です。今回はUbuntuのホームディレクトリ直下に `typing_game` フォルダを作る想定とします）

**【転送するもの】**
- `dist` フォルダ全体
- `server` フォルダ全体
- `package.json`
- `package-lock.json`

### 3. Ubuntu サーバーの環境構築（Node.js と Nginx）
UbuntuサーバーにSSHでログインし、必要なソフトウェア（Node.js, npm, Nginx）をインストールします。

```bash
# パッケージリストの更新
sudo apt update

# Node.js, npm, Nginxのインストール
sudo apt install -y nodejs npm nginx
```

### 4. パッケージのインストールとサーバーの起動（PM2の利用）
転送したディレクトリに移動し、必要なNodeパッケージをインストールします。
また、サーバーが落ちた時に自動再起動したり、バックグラウンドで動かし続けるために **PM2** というツールを導入します。

```bash
# 転送したディレクトリに移動（例）
cd ~/typing_game

# 本番環境用のパッケージのみをインストール
npm install --omit=dev

# PM2をグローバルインストール
sudo npm install -g pm2

# Node.jsサーバーをPM2で起動
pm2 start server/index.js --name "typing_game"

# サーバー再起動時にもPM2が自動起動するように設定
pm2 startup
# （出力された sudo env PATH... から始まるコマンドをコピーして実行してください）
pm2 save
```
これで、Ubuntu内でNode.jsサーバーが `http://localhost:3001` で立ち上がりました。ランキングのデータは `server/data/rankings.json` に保存されるようになります。

### 5. Nginx のリバースプロキシ設定
最後に、ユーザーがURL（ポート80）でアクセスした際に、内部で動いているNode.js（ポート3001）へ通信を流すための設定（リバースプロキシ）を行います。

Nginxのデフォルト設定ファイルを編集します。
```bash
sudo nano /etc/nginx/sites-available/default
```

ファイルの中身をすべて消し、以下の内容に書き換えて保存してください。
（nanoエディタの場合: `Ctrl+O` で保存し、`Enter` で確定、`Ctrl+X` で終了）

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    # ドメインがある場合は _ をドメイン名に変更します
    server_name _;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

設定が正しいか確認し、Nginxを再起動して反映させます。
```bash
# 文法チェック
sudo nginx -t

# Nginxの再起動
sudo systemctl restart nginx
```

---

以上で設定は完了です！
ブラウザでUbuntuサーバーのIPアドレス（またはドメイン）にアクセスするとゲームが表示され、バックエンドも動いているため**ランキング機能も正常に機能**します。