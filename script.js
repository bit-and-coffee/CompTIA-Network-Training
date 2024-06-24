// 問題、回答群、正解をJSON形式で変数に格納
var questions = [
    {"question": "中規模企業のネットワーク管理チームは、両方のチームのパフォーマンスを向上させるために、ネットワークをセグメント化し、財務チームとマーケティング チームを論理的に分離することを決定しました。財務チームとマーケティング チームは依然としてサブネットを越えてリソースにアクセスする必要があり、ルーターには単一のインターフェイスがあります。トラフィックを許可するには、管理者は次のどれを設定する必要がありますか。", "answers": ["サブインターフェース", "IPv6トンネリング", "クラスレスマスキング", "ポートアドレス変換"], "correct": ["サブインターフェース"]}, {"question": "ネットワーク管理者は、通常の営業時間後にアクセス ポイントで過剰なワイヤレス トラフィックが発生していることに気づきました。アクセス ポイントは外壁にあります。建物の外でのワイヤレス アクセスを制限するには、管理者が行うべきことは次のうちどれですか。", "answers": ["SSIDのブロードキャストを停止する", "指向性アンテナに変更する", "WAP でのローミングを無効にする", "プライベートVLANを設定する"], "correct": ["指向性アンテナに変更する"]}, {"question": "ある技術者は、権限のない担当者がデータセンターのサーバー ラックに設置されている資産を移動することを懸念しています。技術者は、サーバー ラックのドアが開いたときにアラートを送信するネットワーク センサーを設置します。技術者が設置したのは次のうちどれですか。", "answers": ["タンパー検知", "アクセスコントロールが実施されている出入口", "アセットタグ", "暗号ロック"], "correct": ["タンパー検知"]}
];

var currentQuestionIndex = 0;
var selectedAnswers = questions.map(() => []);
var points = 0;


// 選択した回答を更新する関数
function updateSelectedAnswers() {
    var answers = document.querySelectorAll('.answers input');
    selectedAnswers[currentQuestionIndex] = []; // 現在の問題の選択状態をリセット

    answers.forEach((answer, index) => {
        if (answer.checked) {
            selectedAnswers[currentQuestionIndex].push(index);
        }
    });
}

//問題の表示
function displayQuestion() {
    if(currentQuestionIndex < questions.length) {
        var questionText = questions[currentQuestionIndex].question;
        document.getElementById('question-text').innerText = questionText;
        
        // 問題番号を更新
        document.getElementById('question-number').innerText = `問${currentQuestionIndex + 1}`;
        
        displayAnswers();
    } else {
        alert('No more questions.');
    }
    var csvButton = document.querySelector('.csv-button');
    csvButton.style.display = 'none';
}

/// 回答群の表示
function displayAnswers() {
    var answersContainer = document.getElementsByClassName('answers')[0];
    answersContainer.innerHTML = '';

    var answers = questions[currentQuestionIndex].answers;
    var isMultipleCorrectAnswers = questions[currentQuestionIndex].correct.length > 1;

    answers.forEach(function(answer, index) {
        var listItem = document.createElement('li');
        var input = document.createElement('input');
        input.id = 'answer' + index;
        input.name = isMultipleCorrectAnswers ? 'answers' : 'answer';
        input.type = isMultipleCorrectAnswers ? 'checkbox' : 'radio';
        input.checked = selectedAnswers[currentQuestionIndex].includes(index); // 選択状態を反映

        var label = document.createElement('label');
        label.htmlFor = 'answer' + index;
        label.textContent = answer;

        input.addEventListener('change', function() {
            updateSelectedAnswers(); // ここで選択状態を更新
        });

        listItem.appendChild(input);
        listItem.appendChild(label);
        answersContainer.appendChild(listItem);
    });
}

// 次へボタン
function nextQuestion() {
    updateSelectedAnswers(); // 選択状態を更新
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert('これが最後の問題です。');
    }
}

// 前へボタン
function previousQuestion() {
    updateSelectedAnswers(); // 選択状態を更新
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    } else {
        alert('これが最初の問題です。');
    }
}


function showCorrectAnswer() {
        var correctAnswers = questions[currentQuestionIndex].correct.join(", ");
        alert("正解: " + correctAnswers); // 正解をアラートで表示
    }


// 結果表示テーブルの修正
function displayResultsTable() {
    // テーブル要素を作成
    var table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.borderSpacing = '0';
    table.style.border = '0.5px solid black';

    // テーブルヘッダーを作成
    var headerRow = table.insertRow();
    var header1 = headerRow.insertCell();
    var header2 = headerRow.insertCell();
    var header3 = headerRow.insertCell();
    var header4 = headerRow.insertCell();
    header1.innerText = '問題番号';
    header2.innerText = '選択した回答';
    header3.innerText = '正しい回答';
    header4.innerText = '正誤判定';
    header1.style.border = '0.5px solid black';
    header2.style.border = '0.5px solid black';
    header3.style.border = '0.5px solid black';
    header4.style.border = '0.5px solid black';

    // 正答数をカウントする変数を初期化
    var points = 0;

    // 各問題に対してテーブル行を作成
    for (let i = 0; i < questions.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        // 問題番号を表示
        cell1.innerText = `${i + 1}`;
        
        // 選択した回答を表示
        var choiceAnswers = selectedAnswers[i].map(index => questions[i].answers[index]).join(", ");
        cell2.innerText = choiceAnswers || '未回答';
        
        // 正しい回答を表示
        var correctAnswer = questions[i].correct.join(", ");
        cell3.innerText = correctAnswer;

        // 選択した回答が正しいかを確認して正答数をカウント
        if (selectedAnswers[i].every(index => questions[i].correct.includes(questions[i].answers[index])) && 
            selectedAnswers[i].length === questions[i].correct.length) {
            points++;
        } else {
            cell2.style.color = 'red'; // 間違いは赤色
        }
        // 正誤判定処理
        if (cell2.innerText == cell3.innerText){
            cell4.innerText = '◯'
        } else {
            cell4.innerText = '✕'
            cell4.style.color = 'red';
        }

        // セルに罫線を追加
        cell1.style.border = '0.5px solid black';
        cell2.style.border = '0.5px solid black';
        cell3.style.border = '0.5px solid black';
        cell4.style.border = '0.5px solid black';
    }

    // 結果を表示するコンテナを取得
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    // スコアを表示する要素を作成
    var scoreElement = document.createElement('div');
    var totalQuestions = questions.length;
    var percentage = Math.round((points / totalQuestions) * 100);

    // スコアを表示
    scoreElement.innerText = `あなたのスコア：${points} 点(${percentage}%)`;
    scoreElement.style.fontSize = '30px';
    resultsContainer.appendChild(scoreElement);

    // テーブルを結果コンテナに追加
    table.style.fontSize = '12px';
    resultsContainer.appendChild(table);

    const endMessageElement = document.querySelector(".end-message");
    endMessageElement.innerText = 'お疲れ様でした。再試験はページを更新してください。'
    endMessageElement.style.fontSize = '13px';
}

// 結果表示
function showResults() {
    displayResultsTable();
    hideQuestionElements()
    // 他の要素を非表示にする処理を追加
    // 保存ボタンに対するイベントリスナーを追加
    document.getElementById('save-button').addEventListener('click', function() {
        showResults();
    });
}

//非表示
function hideQuestionElements() {
    var contentBox = document.querySelector('.content-box');
    contentBox.style.display = 'none';

    var questionBox = document.querySelector('.question-box');
    questionBox.style.display = 'none';

    var navigationButtons = document.querySelector('.navigation-buttons');
    navigationButtons.style.display = 'none';

    var saveButton = document.querySelector('.button:last-of-type');
    saveButton.style.display = 'none';

    var footer = document.querySelector('.end-button');
    footer.style.display = 'none';

    var questionNumber = document.getElementById('question-number');
    questionNumber.style.display = 'none';
    showCSVButton();

}


function showCSVButton() {
    var csvButton = document.querySelector('.csv-button');
    csvButton.style.display = 'block';
    csvButton.style.pointerEvents = 'auto'; // クリックを有効化
}

//採点結果画面をCSV化
function exportResultsToCSV() {
    const tableRows = document.querySelectorAll('table tr');
    let csvContent = "data:text/csv;charset=utf-8,"; // letを使用して再代入可能な変数に変更

    // テーブルのデータをCSV形式に変換
    tableRows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(cell => {
            rowData.push(cell.innerText);
        });
        csvContent += rowData.join(',') + '\n';
    });

    // CSVファイルをダウンロード
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', '試験結果.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function checkAnswer() {
    const resultMessageElement = document.querySelector(".result-message"); // 正しいセレクタを使用する
    var correctAnswers = questions[currentQuestionIndex].correct.join(", ");

    // 正解の表示
    let message = `正解は “${correctAnswers}” です。`; // 正解を適切に表示する
    resultMessageElement.innerText = message;
    resultMessageElement.style.fontSize = '10PX';
    resultMessageElement.style.display = "block"; // メッセージを表示する

    // 3秒後に次の問題へ移動または結果メッセージを非表示にする
    setTimeout(() => {
        resultMessageElement.style.display = "none";
        if (currentQuestionIndex < questions.length - 1) {
            //currentQuestionIndex++; // currentQuestionIndexをインクリメントして次の問題に進む
            //displayQuestion(); // 次の問題を表示
        } else {
            // 最後の質問の場合はここでスコアを表示するか、他の処理を行う
        }
    }, 3000); // 3秒後に実行
}

function page_reload() {
    location.reload(); 
}
//模擬試験スタート
displayQuestion();
