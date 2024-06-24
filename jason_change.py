import pandas as pd
import json

# Excelファイルとシート名の指定
file_path = input('変換元のファイル名を入力（拡張子まで）：')  # ファイルパスの設定
sheet_name = '問題・正解'  # シート名の設定

# Excelファイルからデータを読み込む
data = pd.read_excel(file_path, sheet_name=sheet_name)

# データを適切に整形する
questions = []
for index, row in data.iterrows():
    if index == 0 or pd.isna(row['Unnamed: 1']):  # ヘッダー行や空行をスキップ
        continue

    # 各問題に対して
    question_text = row['Unnamed: 1']
    answers = [row[f'Unnamed: {i}'] for i in range(2, 8) if pd.notna(row[f'Unnamed: {i}'])]
    # 正解のインデックスを整数に変換
    try:
        correct_answer_index = int(row['Unnamed: 12']) - 1  # 1ベースから0ベースに変換
    except ValueError:
        correct_answer_index = None  # 値が整数に変換できない場合はNoneを設定

    questions.append({
        'question': question_text,
        'answers': answers,
        'correct': correct_answer_index
    })

# JSON形式に変換
json_data = json.dumps(questions, ensure_ascii=False)

# 結果の表示（またはファイルに保存）
j_file_name = file_path.split('.')[0] + '.json'
with open(j_file_name, 'w', encoding='utf-8') as file:
    # ファイルにテキストを書き込む
    file.write(json_data)

print(f"Create file {j_file_name} !!!")
