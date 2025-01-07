# webpro_06

## このプログラムについて

## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
show.ejs | あいさつ表示のテンプレートファイル
icon.ejs | 画像表示のテンプレートファイル
luck.ejs | 運勢占いのテンプレートファイル
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんのテンプレートファイル
views/dice.ejs | サイコロチャレンジのテンプレートファイル
views/zodiac-form.ejs | 星座判定のテンプレートファイル


##　編集したファイルをGitで管理する方法
1. cdコマンドで編集したファイルのあるディレクトリに移動する
1. ターミナルで```git add .```と入力する
1. ターミナルで```git commit -am 'コメント'```と入力する
1. コメントの部分には変更内容や変更理由を記入する
1. ターミナルで```git push```と入力する
1. git上のファイルが更新されている

##　使用方法

### hello１機能
#### 機能説明
「Hello world」と「Bon jour」という文字が表示される．
####　使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/hello１```にアクセスする
1. 画像が表示される
####　フローチャート
```mermaid
flowchart TD;
    start["開始"]
    end1["終了"]
    render["'show'をレンダリング"]
    display["挨拶メッセージ表示"]

    start --> render
    render --> display
    display --> end1
```

### hello2機能
#### 機能説明
「Hello world」と「Bon jour」という文字が表示される．
####　使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/hello2```にアクセスする
1. 画像が表示される
####　フローチャート
```mermaid
flowchart TD;
    start["開始"]
    end1["終了"]
    render["'show'をレンダリング"]
    display["挨拶メッセージ表示"]

    start --> render
    render --> display
    display --> end1
```

### アイコン表示
#### 機能説明
Appleの画像が表示される．
####　使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/icon```にアクセスする
1. 画像が表示される
####　フローチャート
```mermaid
flowchart TD;
    start["開始"]
    end1["終了"]
    render["'icon'のレンダリング"]
    display["画像を表示"]

    start --> render
    render --> display
    display --> end1

```


### 運勢占い
#### 機能説明
ランダムに生成された1〜6の数字を使用し,ユーザーに大吉,中吉,吉の運勢を決定する．運勢の結果と数字を表示する．
####　使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/luck```にアクセスする
1. 運勢が表示される
####　フローチャート

```mermaid
flowchart TD;
    start["開始"]
    end1["終了"]
    generate["ランダムな数字を生成"]
    fortune["運勢を決定"]
    display["運勢の結果を表示"]

    start --> generate
    generate --> fortune
    fortune --> display
    display --> end1
```


### じゃんけん
#### 機能説明
ユーザーが送信したグー,チョキ,パーに対して,コンピュータとじゃんけんを行う.ゲーム結果の勝ち,負け,引き分けを判定し,勝利回数やトータル回数を表示する．
####　使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/public/janken.html```にアクセスする
1. 自分の手を入力する
####　フローチャート

```mermaid
flowchart TD;
    start["開始"]
    end1["終了"]
    get_hand["ユーザーの手を取得"]
    generate_cpu["コンピュータの手を生成"]
    judgement["勝敗を判定"]
    display["結果と統計を表示"]

    start --> get_hand
    get_hand --> generate_cpu
    generate_cpu --> judgement
    judgement --> display
    display --> end1
```

### ピンゾロチャレンジゲーム
#### 機能説明
最初にサイコロの目が1と表示され,ユーザーがサイコロを振ることで,その目が1かそれ以外かを判定する.もし1が出た場合,ゲームは継続し,1以外の目が出た場合は終了となる．継続した場合ユーザーは続けるか辞めるかを選択することができる．
####　使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/dice```にアクセスする
1. サイコロを振る
1. ゾロ目が出たら続けるか辞めるかを選べる
####　フローチャート

```mermaid
flowchart TD;

start["開始"]
end1["終了"]
roll_user["ユーザーのサイコロを振る"]
check_dice2["サイコロが1か判定"]
game_choice["継続するか"]
game_continue["ゲーム継続"]
game_end["ゲーム終了"]
display["連続回数を表示"]

start --> roll_user
roll_user --> check_dice2
check_dice2 -->|yes| game_choice
check_dice2 -->|no| game_end
game_choice -->|yes| game_continue
game_choice -->|no| game_end
game_continue --> roll_user
game_end --> display
display --> end1
```

### 星座判定
#### 機能説明
ユーザーが生年月日を入力できるフォームが表示され，ユーザーが生年月日を入力し、送信すると、生年月日に基づいて星座を判定し、その星座を返す．
####　使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```localhost:8080/zodiac-form```にアクセスする
1. 自分の生年月日を入力する
####　フローチャート
```mermaid
flowchart TD;
    start["開始"]
    end1["終了"]
    input_date["生年月日を入力"]
    submit_form["フォームを送信"]
    get_date["ユーザーの生年月日を取得"]
    extract_date["月日を抽出"]
    determine_zodiac["星座を判定"]
    display["星座を表示"]

    start --> input_date
    input_date --> submit_form
    submit_form --> get_date
    get_date --> extract_date
    extract_date --> determine_zodiac
    determine_zodiac --> display
    display --> end1
```

```mermaid
flowchart TD
    A[ユーザーが掲示板ページを開く] --> B[サーバーに投稿データを要求]
    B --> C{サーバーから投稿データを取得}
    C -->|データがある| D[掲示板に投稿を表示]
    C -->|データがない| E[投稿なしメッセージを表示]
    
    D --> F[投稿を表示する]
    F --> G[「いいね」ボタンをクリック]
    F --> H[「削除」ボタンをクリック]
    F --> I[「返信」ボタンをクリック]
    
    G --> J[いいね処理をサーバーに送信]
    J --> K[サーバーが更新されたいいね数を返す]
    K --> L[「いいね」ボタンを更新]
    
    H --> M[投稿削除処理をサーバーに送信]
    M --> N[サーバーが投稿を削除]
    N --> O[削除された投稿を表示から削除]
    
    I --> P[返信用フォームを表示]
    P --> Q[返信メッセージを入力]
    Q --> R[返信データをサーバーに送信]
    R --> S[サーバーが返信を保存]
    S --> T[返信を元の投稿の下に表示]

    F --> U[新しい投稿を送信]
    U --> V[投稿データをサーバーに送信]
    V --> W[サーバーが新しい投稿を保存]
    W --> X[掲示板に新しい投稿を表示]

    X --> F
    T --> F
    L --> F
    O --> F

```

2024/11/18
