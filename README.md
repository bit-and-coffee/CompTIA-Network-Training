# CompTIA-Network-Training
## はじめに
閲覧ありがとうございます。このファイルにつていはローカルで起動することを前提として作っていますので、webサーバでの動作については検証していません。また使用される環境次第でプログラムの修正が必要ですので、ご承知ください。
また、pythonについてはanaconda3で実行しています。

## ファイル構成
- test_comptia-network.html
- script.js<br>
→コード内の`questions`変数にjson形式のリスト（`data.json`）を挿入することで問題文、解答群が表示される仕組み
- jason_change.py<br>
→`data.xlsx`ファイルの問題文、解答群、解答をjson形式に変換するスクリプト
- data.xlsx
- data.json

## 使い方
1. 使用したい問題文等を`data.xlsx`形式に沿って入力
2. `jason_change.py`を実行<br>
→pythonのインストール必須
3. `data.json`が生成される。中身の値（リスト）を`script.js`の`questions`変数に代入
4. `test_comptia-network.html`を起動し、`questions`に代入した値が問題、解答群となって表示
