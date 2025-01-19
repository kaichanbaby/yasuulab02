// 初期スコアと設定
let score = 0;
let currentQuestionIndex = 0;
let selectedQuestions = [];
let difficulty = "";
let mistakes = 0;
const mistakesAllowed = 3; // ミス可能回数
let remainingLives = mistakesAllowed; // 残りライフ


// 問題の設定
const easyQuestions = [
    { question: "安浦はどの都道府県にある？", choices: ["神奈川県", "東京都"], correctAnswer: 1 },
    { question: "安浦は神奈川県の何市にある？", choices: ["横浜市", "横須賀市"], correctAnswer: 2 },
    { question: "横須賀基地はどの海軍に関係している？", choices: ["アメリカ海軍", "ロシア海軍"], correctAnswer: 1 },
    { question: "安浦近くの海は何海？", choices: ["日本海", "東京湾"], correctAnswer: 2 },
    { question: "横須賀市は何の街としても知られている？", choices: ["カレーの街", "うどんの街"], correctAnswer: 1 },
    { question: "安浦にはどの交通機関が通っている？", choices: ["京急線", "東急線"], correctAnswer: 1 },
    { question: "安浦の近くにある観光名所は？", choices: ["富士山", "猿島"], correctAnswer: 2 },
    { question: "安浦にある公園の名前は？", choices: ["三笠公園", "横須賀公園"], correctAnswer: 1 },
    { question: "安浦で特に人気のある食べ物は？", choices: ["ハンバーガー", "寿司"], correctAnswer: 1 },
    { question: "横須賀市にある動物園の名前は？", choices: ["よこはま動物園", "横須賀動物園"], correctAnswer: 2 },
    { question: "安浦の特産品は？", choices: ["海苔", "ウナギ"], correctAnswer: 1 },
    { question: "安浦には何の軍事施設がある？", choices: ["自衛隊基地", "海軍基地"], correctAnswer: 2 },
    { question: "安浦にある有名な食堂は？", choices: ["横須賀食堂", "安浦食堂"], correctAnswer: 2 },
    { question: "安浦に近い有名な島は？", choices: ["猿島", "沖ノ島"], correctAnswer: 1 },
    { question: "安浦で行われる祭りは？", choices: ["夏祭り", "海軍祭り"], correctAnswer: 1 },
    { question: "安浦に住む生物は？", choices: ["シロイルカ", "トド"], correctAnswer: 1 },
    { question: "安浦の最寄りの港はどこ？", choices: ["横須賀港", "東京港"], correctAnswer: 1 },
    { question: "安浦周辺の観光地はどこ？", choices: ["鎌倉", "横浜"], correctAnswer: 1 },
    { question: "安浦で人気のあるイベントは？", choices: ["花火大会", "音楽フェス"], correctAnswer: 1 },
    { question: "安浦の海はどのような色ですか？", choices: ["青色", "緑色"], correctAnswer: 1 },
    { question: "安浦の伝統的なスポーツは？", choices: ["相撲", "野球"], correctAnswer: 1 },
    { question: "安浦にある美術館の名前は？", choices: ["安浦美術館", "横須賀美術館"], correctAnswer: 2 },
    { question: "安浦にある公園はどれ？", choices: ["三笠公園", "日比谷公園"], correctAnswer: 1 },
    { question: "安浦で有名な飲み物は？", choices: ["コーヒー", "お茶"], correctAnswer: 2 },
    { question: "安浦の周辺で特に有名な漁港は？", choices: ["横須賀漁港", "東京湾漁港"], correctAnswer: 1 },
    { question: "安浦で特に人気のある遊びは？", choices: ["釣り", "水泳"], correctAnswer: 1 },
    { question: "安浦の海岸は何色の砂浜ですか？", choices: ["白", "黒"], correctAnswer: 1 },
    { question: "安浦にある大きなショッピングモールは？", choices: ["横須賀モール", "三井アウトレット"], correctAnswer: 1 },
    { question: "安浦の有名な野球チームは？", choices: ["横浜ベイスターズ", "横須賀ベイスターズ"], correctAnswer: 2 },
    { question: "安浦でよく見られる動物は？", choices: ["イルカ", "クジラ"], correctAnswer: 1 },
    { question: "安浦の近くにあるビーチはどこ？", choices: ["海水浴場", "リゾートビーチ"], correctAnswer: 1 },
    { question: "安浦にある有名な歴史的建物は？", choices: ["横須賀城", "安浦城"], correctAnswer: 2 },
    { question: "安浦に近い観光名所は？", choices: ["猿島", "淡路島"], correctAnswer: 1 },
    { question: "安浦の特産物は何？", choices: ["タコ", "カニ"], correctAnswer: 1 },
    { question: "安浦周辺の海の深さはどのくらい？", choices: ["深い", "浅い"], correctAnswer: 1 },
    { question: "安浦で人気のある水族館は？", choices: ["横浜水族館", "横須賀水族館"], correctAnswer: 2 },
    { question: "安浦での活動で人気のあるものは？", choices: ["ヨット", "サーフィン"], correctAnswer: 1 },
    { question: "安浦で特に有名なキャンプ場は？", choices: ["横須賀キャンプ場", "安浦キャンプ場"], correctAnswer: 2 },
    { question: "安浦にある動物の種類は？", choices: ["クジラ", "イルカ"], correctAnswer: 2 },
    { question: "安浦の歴史的なイベントは？", choices: ["海軍祭り", "夏祭り"], correctAnswer: 1 },
    { question: "安浦の近くの海に住む魚は？", choices: ["サバ", "イワシ"], correctAnswer: 1 },
    { question: "安浦の観光名所は？", choices: ["横須賀海軍博物館", "横須賀美術館"], correctAnswer: 1 },
    { question: "安浦で有名な作家は？", choices: ["村上春樹", "太宰治"], correctAnswer: 1 },
    { question: "安浦にあるビーチの名前は？", choices: ["浦賀湾", "久里浜湾"], correctAnswer: 1 },
    { question: "安浦の特産物は何？", choices: ["海苔", "タコ"], correctAnswer: 1 },
    { question: "安浦の最寄りの駅は？", choices: ["横須賀駅", "久里浜駅"], correctAnswer: 1 },
    { question: "安浦で人気のあるスポーツは？", choices: ["サッカー", "野球"], correctAnswer: 2 },
    { question: "安浦で有名な祭りは何？", choices: ["夏祭り", "花火大会"], correctAnswer: 1 },
    { question: "安浦周辺の観光スポットはどこ？", choices: ["江ノ島", "鎌倉"], correctAnswer: 2 },
    { question: "安浦の名物料理は何？", choices: ["海鮮丼", "カレー"], correctAnswer: 1 },
    { question: "安浦の主要な交通手段は？", choices: ["バス", "電車"], correctAnswer: 2 },
    { question: "安浦で人気のアクティビティは？", choices: ["釣り", "ダイビング"], correctAnswer: 1 },
    { question: "安浦の観光名所はどれ？", choices: ["三笠公園", "横須賀港"], correctAnswer: 1 }
];


const normalQuestions = [
    { question: "安浦はいつ頃から開発が始まった？", choices: ["江戸時代", "明治時代", "大正時代"], correctAnswer: 1 },
    { question: "安浦にある観光スポットの一つ、三笠公園にある戦艦の名前は？", choices: ["三笠", "大和", "長門"], correctAnswer: 0 },
    { question: "安浦近くの猿島は何で有名？", choices: ["バーベキュー", "キャンプ", "釣り"], correctAnswer: 0 },
    { question: "安浦で多く採れる魚は何？", choices: ["アジ", "イワシ", "サバ"], correctAnswer: 0 },
    { question: "安浦が位置する東京湾は何県に囲まれている？", choices: ["神奈川県・千葉県・東京都", "千葉県・東京都・埼玉県", "神奈川県・東京都・茨城県"], correctAnswer: 0 },
    { question: "安浦にある横須賀美術館は何年に設立された？", choices: ["2007年", "2010年", "2015年"], correctAnswer: 0 },
    { question: "安浦の近くで行われる歴史的なイベントは？", choices: ["横須賀軍港巡り", "横浜開港祭", "鎌倉大仏祭り"], correctAnswer: 0 },
    { question: "安浦にある自衛隊基地で有名な部隊は？", choices: ["海上自衛隊", "陸上自衛隊", "航空自衛隊"], correctAnswer: 0 },
    { question: "安浦周辺の桜の名所は？", choices: ["ヴェルニー公園", "上野恩賜公園", "鶴見池公園"], correctAnswer: 0 },
    { question: "安浦の観光施設である三笠公園はどのような施設か？", choices: ["軍事博物館", "植物園", "動物園"], correctAnswer: 0 },
    { question: "安浦の有名な浜辺で、よく行われるイベントは？", choices: ["音楽フェス", "映画上映会", "マラソン大会"], correctAnswer: 1 },
    { question: "安浦で人気のあるウォータースポーツは？", choices: ["カヤック", "セーリング", "スキューバダイビング"], correctAnswer: 1 },
    { question: "安浦の近くで見ることができる灯台の名前は？", choices: ["観音崎灯台", "江ノ島灯台", "三浦灯台"], correctAnswer: 0 },
    { question: "安浦近くで見られる有名な桜の並木道は？", choices: ["くりはま花の国", "山手公園", "青山公園"], correctAnswer: 0 },
    { question: "安浦で見られる歴史的な要塞跡はどこ？", choices: ["猿島要塞", "芝浦要塞", "三浦要塞"], correctAnswer: 0 },
    { question: "安浦のある横須賀市の名物料理は？", choices: ["海軍カレー", "もんじゃ焼き", "お好み焼き"], correctAnswer: 0 },
    { question: "安浦の観光名所である猿島はどのような特徴があるか？", choices: ["無人島", "人工島", "海洋公園"], correctAnswer: 0 },
    { question: "安浦近くに位置する米海軍基地の名前は？", choices: ["横須賀海軍施設", "厚木海軍施設", "横浜海軍基地"], correctAnswer: 0 },
    { question: "安浦で行われる漁業の一種は？", choices: ["底引き網漁", "養殖漁業", "サンゴ礁漁"], correctAnswer: 0 },
    { question: "安浦近くにある横須賀美術館の特色は？", choices: ["海を望むガラス張りの建物", "歴史的な建物", "近代的な高層ビル"], correctAnswer: 0 },
    { question: "安浦のある横須賀市はどのような町としても知られている？", choices: ["軍港の町", "商業都市", "観光都市"], correctAnswer: 0 },
    { question: "安浦周辺で見られる特徴的な建築物は？", choices: ["三笠記念館", "赤レンガ倉庫", "横浜ランドマークタワー"], correctAnswer: 0 },
    { question: "安浦で人気のあるシーフードレストランの場所は？", choices: ["浦賀", "三浦", "鎌倉"], correctAnswer: 0 },
    { question: "安浦の近くで行われるイベントの一つは？", choices: ["シーサイドフェスティバル", "ビーチマラソン", "横須賀グルメフェス"], correctAnswer: 0 },
    { question: "安浦近くで見られる桜の名所はどこ？", choices: ["ヴェルニー公園", "隅田公園", "上野恩賜公園"], correctAnswer: 0 },
    { question: "安浦の港からの観光船はどこを巡る？", choices: ["軍港巡り", "湾岸巡り", "東京湾巡り"], correctAnswer: 0 },
    { question: "安浦で採れる魚介の代表的な種類は？", choices: ["サバ", "タコ", "イカ"], correctAnswer: 1 },
    { question: "安浦の景観がよく見える場所は？", choices: ["横須賀中央タワー", "観音崎灯台", "横浜ランドマークタワー"], correctAnswer: 1 },
    { question: "安浦のある横須賀市の有名な商店街はどこ？", choices: ["ドブ板通り", "浅草通り", "三浦通り"], correctAnswer: 0 },
    { question: "安浦近くの猿島が無人島となった理由は？", choices: ["軍事拠点だったため", "観光地として開発されたため", "海上交通の要所だったため"], correctAnswer: 0 },
    { question: "安浦で見られる船舶の一つは？", choices: ["三笠", "信濃", "長門"], correctAnswer: 0 },
    { question: "安浦で有名なミュージアムは？", choices: ["三笠記念館", "横浜美術館", "横須賀海軍博物館"], correctAnswer: 0 },
    { question: "安浦のある横須賀市で歴史的に有名な場所は？", choices: ["浦賀の造船所", "築地市場", "神戸港"], correctAnswer: 0 },
    { question: "安浦に隣接する都市で人気の観光地は？", choices: ["鎌倉", "熱海", "横浜"], correctAnswer: 0 },
    { question: "安浦周辺の観光名所で三笠に関するものは？", choices: ["戦艦展示", "灯台ツアー", "博物館見学"], correctAnswer: 0 },
    { question: "安浦で歴史的な遺産が残っている場所は？", choices: ["猿島要塞", "観音崎", "赤レンガ倉庫"], correctAnswer: 0 },
    { question: "安浦で行われるヨットレースの名称は？", choices: ["ヨコスカカップ", "東京ベイクルーズ", "横浜マリンカップ"], correctAnswer: 0 },
    { question: "安浦周辺でのレジャースポットの一つは？", choices: ["猿島", "館山", "葉山"], correctAnswer: 0 }
];

const hardQuestions = [
    { question: "安浦の歴史的な背景はどの時代に始まった？", choices: ["明治時代", "江戸時代", "大正時代", "昭和時代"], correctAnswer: 1 },
    { question: "安浦が位置する県の海岸線の長さはおおよそどれくらい？", choices: ["約400km", "約1000km", "約500km", "約1500km"], correctAnswer: 1 },
    { question: "安浦にある最も古い寺院は何と呼ばれる？", choices: ["安浦寺", "観音寺", "成就寺", "松本寺"], correctAnswer: 1 },
    { question: "安浦の発展に大きく寄与した軍港は何と呼ばれている？", choices: ["横須賀港", "呉港", "長崎港", "横浜港"], correctAnswer: 1 },
    { question: "安浦の地名の由来は何ですか？", choices: ["安らぎの場所", "浦の名前", "港の名前", "川の名前"], correctAnswer: 1 },
    { question: "安浦に存在するミリタリー関連の博物館はどれか？", choices: ["横須賀軍港博物館", "防衛ミュージアム", "海上自衛隊博物館", "海軍博物館"], correctAnswer: 1 },
    { question: "安浦の特産物の一つである海藻は何か？", choices: ["わかめ", "昆布", "ひじき", "あおさ"], correctAnswer: 2 },
    { question: "安浦で行われる伝統的な祭りの名前は？", choices: ["安浦海祭り", "横須賀祭り", "横浜祭り", "鎌倉祭り"], correctAnswer: 1 },
    { question: "安浦の風景画を描いた有名な画家は誰か？", choices: ["横山大観", "東山魁夷", "田中一村", "山口蓬春"], correctAnswer: 2 },
    { question: "安浦で有名な食文化は何か？", choices: ["海鮮料理", "焼肉", "寿司", "ラーメン"], correctAnswer: 1 },
    { question: "安浦にある国の重要文化財は何か？", choices: ["安浦城跡", "横須賀城跡", "三浦海岸跡", "大磯城跡"], correctAnswer: 1 },
    { question: "安浦周辺に生息する希少な野生動物は何か？", choices: ["ニホンザル", "ニホンカモシカ", "アカショウビン", "ニホンジカ"], correctAnswer: 2 },
    { question: "安浦にある美術館で特に知られているのは？", choices: ["横須賀美術館", "安浦アートギャラリー", "三浦美術館", "横浜美術館"], correctAnswer: 1 },
    { question: "安浦に流れる川の名前は何か？", choices: ["安浦川", "横須賀川", "久里浜川", "三浦川"], correctAnswer: 1 },
    { question: "安浦周辺の海域において、特に漁獲が盛んな魚は何か？", choices: ["ブリ", "カツオ", "サバ", "イカ"], correctAnswer: 1 },
    { question: "安浦の気候はどのような特徴があるか？", choices: ["温暖湿潤", "寒冷湿潤", "乾燥", "亜熱帯"], correctAnswer: 1 },
    { question: "安浦に近い観光名所の一つは？", choices: ["猿島", "江ノ島", "三浦半島", "大磯海岸"], correctAnswer: 1 },
    { question: "安浦にて行われる海軍関連のイベントは何か？", choices: ["海軍観艦式", "海自フェスティバル", "海軍祭", "防衛フェア"], correctAnswer: 1 },
    { question: "安浦の水質はどのように評価されているか？", choices: ["良好", "悪化", "汚染", "正常"], correctAnswer: 1 },
    { question: "安浦の沿岸で多く見られる水鳥の種類は何か？", choices: ["カモメ", "ウミネコ", "カモ", "ペリカン"], correctAnswer: 1 },
    { question: "安浦の観光名所の中で、特に訪れるべき場所はどこか？", choices: ["横須賀美術館", "横須賀軍港", "三浦半島", "葉山海岸"], correctAnswer: 1 },
    { question: "安浦の地元料理である魚介類の名前は何か？", choices: ["ウニ", "イクラ", "サザエ", "カニ"], correctAnswer: 1 },
    { question: "安浦で有名な地酒の名前は何か？", choices: ["安浦酒", "横須賀酒", "三浦酒", "神奈川酒"], correctAnswer: 1 },
    { question: "安浦の住民がよく訪れる温泉地はどこか？", choices: ["湯河原", "熱海", "箱根", "伊豆"], correctAnswer: 1 },
    { question: "安浦の特産品である果物は何か？", choices: ["梨", "みかん", "イチゴ", "桃"], correctAnswer: 2 },
    { question: "安浦周辺で観察できる星座は何か？", choices: ["おおぐま座", "しし座", "さそり座", "おとめ座"], correctAnswer: 1 },
    { question: "安浦で実施されている環境保護活動の一環は何か？", choices: ["ビーチクリーン", "植樹祭", "リサイクル運動", "エコツアー"], correctAnswer: 1 },
    { question: "安浦の気候区分は何か？", choices: ["亜熱帯", "温帯", "寒冷", "乾燥"], correctAnswer: 2 },
    { question: "安浦にある小さな島の名前は？", choices: ["猿島", "久里浜島", "三浦島", "金田島"], correctAnswer: 1 },
    { question: "安浦の名所旧跡で特に有名なものはどれか？", choices: ["安浦神社", "横須賀神社", "三浦神社", "葉山神社"], correctAnswer: 1 },
    { question: "安浦にある伝統工芸品は何か？", choices: ["横須賀塗り", "安浦焼き", "三浦焼き", "伊豆焼き"], correctAnswer: 2 },
    { question: "安浦の祭りで特に人気のある食べ物は？", choices: ["焼きそば", "たこ焼き", "お好み焼き", "串焼き"], correctAnswer: 1 },
    { question: "安浦の周辺に広がる自然公園の名前は何か？", choices: ["横須賀自然公園", "安浦公園", "三浦自然公園", "葉山公園"], correctAnswer: 1 },
    { question: "安浦に住む主な魚の種類は何か？", choices: ["ヒラメ", "カレイ", "マグロ", "サンマ"], correctAnswer: 1 },
    { question: "安浦で行われる伝統的なスポーツは何か？", choices: ["相撲", "釣り", "柔道", "剣道"], correctAnswer: 2 },
    { question: "安浦の主要な交通手段は何か？", choices: ["バス", "フェリー", "電車", "自転車"], correctAnswer: 2 },
    { question: "安浦において特に有名なアートイベントは何か？", choices: ["アートフェスティバル", "美術展", "映画祭", "音楽祭"], correctAnswer: 1 },
    { question: "安浦の周辺にある湖の名前は？", choices: ["横須賀湖", "三浦湖", "横浜湖", "相模湖"], correctAnswer: 4 },
    { question: "安浦で人気のある観光施設の一つは？", choices: ["横須賀博物館", "安浦温泉", "三浦海上公園", "葉山動物園"], correctAnswer: 1 },
    { question: "安浦の海岸線に見られる特徴的な地形は何か？", choices: ["断崖", "砂丘", "湖", "湿地帯"], correctAnswer: 1 },
    { question: "安浦の代表的な港町はどこか？", choices: ["横須賀", "三浦", "葉山", "鎌倉"], correctAnswer: 1 },
    { question: "安浦の周辺に位置する有名な温泉地はどれか？", choices: ["湯河原温泉", "箱根温泉", "熱海温泉", "伊豆温泉"], correctAnswer: 1 },
    { question: "安浦にある伝統的な建物は何か？", choices: ["安浦神社", "横須賀城跡", "観音寺", "成就寺"], correctAnswer: 1 },
    { question: "安浦の周辺で見られる代表的な花は何か？", choices: ["桜", "梅", "藤", "菊"], correctAnswer: 1 },
    { question: "安浦で最も観光客が訪れる季節はいつか？", choices: ["春", "夏", "秋", "冬"], correctAnswer: 1 }
    ];
    

// 各画面の表示関数
function hideAllScreens() {
    document.getElementById("titleScreen").classList.add("hidden");
    document.getElementById("difficultyScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("rankingScreen").classList.add("hidden");
    document.getElementById("scoreDisplay").classList.add("hidden");
    document.getElementById("lifeDisplay").classList.add("hidden"); // ライフ表示を非表示にする
}

function showTitleScreen() {
    hideAllScreens();
    document.getElementById("titleScreen").classList.remove("hidden");
}

function showDifficultyScreen() {
    hideAllScreens();
    document.getElementById("difficultyScreen").classList.remove("hidden");
}

function showRanking() {
    hideAllScreens();
    document.getElementById("rankingScreen").classList.remove("hidden");
    updateRankingTable();
}

// クイズの開始
function startQuiz(selectedDifficulty) {
    difficulty = selectedDifficulty;
    score = 0;
    mistakes = 0;
    remainingLives = mistakesAllowed; // ライフを初期化
    currentQuestionIndex = 0;

    // 問題を難易度に合わせてシャッフル
    switch (difficulty) {
        case "簡単":
            selectedQuestions = shuffleArray(easyQuestions).slice(0, 10);
            break;
        case "普通":
            selectedQuestions = shuffleArray(normalQuestions).slice(0, 10);
            break;
        case "難しい":
            selectedQuestions = shuffleArray(hardQuestions).slice(0, 10);
            break;
    }

    hideAllScreens();
    document.getElementById("quizScreen").classList.remove("hidden");
    document.getElementById("scoreDisplay").classList.remove("hidden");
    document.getElementById("lifeDisplay").classList.remove("hidden"); // ライフ表示を追加
    updateDisplays();
    displayQuestion();
    startTimer();  // クイズが始まったときにタイマーをスタート
}

// 画面のスコアとライフ表示を更新
function updateDisplays() {
    document.getElementById("scoreDisplay").textContent = `スコア: ${score}`;
    document.getElementById("lifeDisplay").textContent = `ライフ: ${remainingLives}`; // ライフを表示
}

// 問題の表示
function displayQuestion() {
    if (currentQuestionIndex < selectedQuestions.length) {
        const questionObj = selectedQuestions[currentQuestionIndex];
        document.getElementById("question").textContent = questionObj.question;

        const choicesContainer = document.getElementById("choices");
        choicesContainer.innerHTML = ""; // 以前の選択肢をクリア
        questionObj.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.classList.add("button");
            button.addEventListener("click", () => checkAnswer(index + 1));
            choicesContainer.appendChild(button);
        });
    } else {
        endQuiz(); // 最後の問題が終わった後、クイズ終了
    }
}

// 回答のチェック
function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score += (difficulty === "簡単" ? 10 : difficulty === "普通" ? 20 : 40); // スコアを難易度に合わせて加算
        
        // タイマーに5秒追加
        currentTime = Math.max(0, currentTime - 5); // 時間を巻き戻す（0未満にならないようにする）
        drawCircle(); // タイマー表示を即座に更新
    } else {
        mistakes++;
        remainingLives--; // ライフを減らす

        if (remainingLives <= 0) {
            endQuiz();
            return;
        }
    }

    currentQuestionIndex++;
    updateDisplays(); // スコアとライフの表示を更新
    displayQuestion();
}

function endQuiz() {
    clearInterval(timerInterval); // タイマーを停止
    document.getElementById('timerCanvas').style.display = "none"; // タイマーを非表示にする
    hideAllScreens();
    alert(`クイズ終了! 最終スコア: ${score}`);
    saveRanking();

    // 再度クイズを開始
    const restart = confirm("もう一度クイズを始めますか？");
    if (restart) {
        // タイマーの位置を最初と同じに設定
        const canvas = document.getElementById('timerCanvas');
        const ctx = canvas.getContext('2d');
        const radius = 80;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const startAngle = 1.5 * Math.PI; // 円のスタート位置（上部）
        let endAngle = 1.5 * Math.PI; // 終了位置（最初はスタート位置と同じ） 
        document.getElementById('timerCanvas').style.display = "block";  // タイマーを再表示
        startQuiz(difficulty); // 前回選択した難易度で再スタート
    } else {
        showRanking(); // ランキング画面を表示
    }
}


// ランキングを保存
function saveRanking() {
    const name = prompt("お名前を入力してください:");
    if (name) {
        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
        ranking.push({ name, score });
        ranking.sort((a, b) => b.score - a.score); // スコアでソート
        localStorage.setItem("ranking", JSON.stringify(ranking));
    }
}

// ランキングを更新する関数
function updateRankingTable() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    
    // スコアを降順にソート
    ranking.sort((a, b) => b.score - a.score);

    const rankingBody = document.getElementById("rankingBody");
    rankingBody.innerHTML = ""; // 以前の内容をクリア
    ranking.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td><td>${entry.name}</td><td>${entry.score}</td>`;
        rankingBody.appendChild(row);
    });
}

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// タイマーの設定
const canvas = document.getElementById('timerCanvas');
const ctx = canvas.getContext('2d');
const radius = 80;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const startAngle = 1.5 * Math.PI; // 円のスタート位置（上部）
let endAngle = 1.5 * Math.PI; // 終了位置（最初はスタート位置と同じ）

let duration = 60; // タイマーの時間（60秒）
let currentTime = 0; // 現在の時間
let timerInterval; // タイマーのインターバル

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle); // 円を描画
    ctx.lineWidth = 30;
    ctx.strokeStyle = "#ff0000"; // 赤色
    ctx.stroke();

    ctx.lineWidth = 5;
    ctx.font = "20px Arial";
    ctx.fillText(`${Math.round(duration - currentTime)}s`, centerX - 20, centerY); // タイマーの残り時間を表示
}

function updateTimer() {
    currentTime += 0.1; // 0.1秒ずつ進める
    endAngle = startAngle + (2 * Math.PI * (currentTime / duration)); // 終了角度を進める

    if (currentTime >= duration) {
        clearInterval(timerInterval); // タイマーが終了したら停止
        endQuiz(); // タイマーがゼロになったらクイズ終了
    }

    drawCircle();
}


// タイマー開始関数
function startTimer() {
    currentTime = 0; // 時間をリセット
    timerInterval = setInterval(updateTimer, 100); // 100ミリ秒ごとに更新
}

// 最初にタイトル画面を表示
document.addEventListener("DOMContentLoaded", function () {
    showTitleScreen();

    // イベントリスナーの設定
    document.getElementById("startButton").addEventListener("click", showDifficultyScreen);
    document.getElementById("rankingButton").addEventListener("click", showRanking);
    document.getElementById("easyButton").addEventListener("click", () => startQuiz("簡単"));
    document.getElementById("normalButton").addEventListener("click", () => startQuiz("普通"));
    document.getElementById("hardButton").addEventListener("click", () => startQuiz("難しい"));
    document.getElementById("backToTitleButton").addEventListener("click", showTitleScreen);
});
// 回答のチェック
function checkAnswer(selectedAnswer) {
    const correctAnswer = selectedQuestions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score += (difficulty === "簡単" ? 10 : difficulty === "普通" ? 20 : 40);

        // タイマーに5秒追加
        currentTime = Math.max(0, currentTime - 5); // 経過時間を巻き戻す
        drawCircle(); // タイマー表示を即座に更新
    } else {
        mistakes++;
        remainingLives--;

        if (remainingLives <= 0) {
            endQuiz();
            return;
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex >= selectedQuestions.length) {
        currentQuestionIndex = 0; // 最初の問題に戻る
    }

    updateDisplays();
    displayQuestion();
}

// タイマー更新
function updateTimer() {
    currentTime += 0.1; // 0.1秒ずつ進める

    const remainingTime = duration - currentTime;
    endAngle = startAngle + (2 * Math.PI * (remainingTime / duration));

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    } else {
        drawCircle();
    }
}

// クイズ終了時の処理
function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('timerCanvas').style.display = "none"; // タイマーを非表示
    hideAllScreens();
    alert(`クイズ終了! 最終スコア: ${score}`);
    saveRanking();

    const restart = confirm("もう一度クイズを始めますか？");
    if (restart) {
        showDifficultyScreen(); // 難易度選択画面に戻る
    } else {
        showRanking(); // ランキング画面を表示
    }
}

// タイマー開始
function startTimer() {
    currentTime = 0;
    duration = 60; // タイマーをリセット
    drawCircle(); // リセット直後にタイマーを描画
    timerInterval = setInterval(updateTimer, 200); // タイマーを開始
}

// タイマー描画
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア

    const remainingTime = duration - currentTime;

    // 円を描画
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 30;
    ctx.strokeStyle = "#ff0000"; // 赤色
    ctx.stroke();

    // 残り時間をテキストで描画
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000"; // 黒色
    ctx.fillText(`${Math.ceil(remainingTime)}s`, centerX, centerY);
}
