export type Difficulty = {
  id: string;
  name: string;
  timeLimit: number; // 秒単位
};

export type Word = {
  display: string;
  reading: string;
};

export const DIFFICULTIES: Difficulty[] = [
  { id: 'easy', name: 'えもり', timeLimit: 60 },
  { id: 'normal', name: 'スーパーえもり', timeLimit: 120 },
  { id: 'hard', name: 'ハイパーえもり', timeLimit: 180 },
];

export const WORDS: Record<string, Word[]> = {
  easy: [
    { display: "えもり", reading: "えもり" },
    { display: "理由がない", reading: "りゆうがない" },
    { display: "認識が違う", reading: "にんしきがちがう" },
    { display: "ワンツーマン", reading: "わんつーまん" },
    { display: "どうにもならない", reading: "どうにもならない" },
    { display: "ロボット", reading: "ろぼっと" },
    { display: "クローズアーム", reading: "くろーずあーむ" },
    { display: "アットホーム", reading: "あっとほーむ" },
    { display: "ルールの穴", reading: "るーるのあな" },
    { display: "口を開けば", reading: "くちをひらけば" },
    { display: "日本酒", reading: "にほんしゅ" },
    { display: "飲み込む", reading: "のみこむ" },
    { display: "リキュール", reading: "りきゅーる" },
    { display: "組織が腐る", reading: "そしきがくさる" }
  ],
  normal: [
    { display: "資格がない", reading: "しかくがない" },
    { display: "バッテリーパーン", reading: "ばってりーぱーん" },
    { display: "あなたほんとうにすごいよ", reading: "あなたほんとうにすごいよ" },
    { display: "横領力学", reading: "おうりょうりきがく" },
    { display: "知ろうとしない心構え", reading: "しろうとしないこころがまえ" },
    { display: "基盤が膨らんでる", reading: "きばんがふくらんでる" },
    { display: "イケメン依存症", reading: "いけめんいぞんしょう" },
    { display: "そうやっておいていくんだ", reading: "そうやっておいていくんだ" },
    { display: "仲間はずれにするんだ", reading: "なかまはずれにするんだ" },
    { display: "dの一族", reading: "dのいちぞく" },
    { display: "劇場型詐欺師", reading: "げきじょうがたさぎし" },
    { display: "上下左右盲", reading: "じょうげさゆうもう" },
    { display: "先延ばしの天才", reading: "さきのばしのてんさい" },
    { display: "栞をなしとよむ", reading: "しおりをなしとよむ" },
    { display: "占いがすべて", reading: "うらないがすべて" },
    { display: "再々再折衝", reading: "さいさいさいせっしょう" },
    { display: "なんか面白いことないかな", reading: "なんかおもしろいことないかな" },
    { display: "砂丘をさおかとよむ", reading: "さきゅうをさおかとよむ" }
  ],
  hard: [
    { display: "技術者倫理の失敗作", reading: "ぎじゅつしゃりんりのしっぱいさく" },
    { display: "何もしてないけどヒューズが飛んだ", reading: "なにもしてないけどひゅーずがとんだ" },
    { display: "コンセントの極性変えちゃうぞ", reading: "こんせんとのきょくせいかえちゃうぞ" },
    { display: "これはヒヤリハット案件だな", reading: "これはひやりはっとあんけんだな" },
    { display: "こいつ京都人だから", reading: "こいつきょうとじんだから" },
    { display: "かわいそうかわにいそう", reading: "かわいそうかわにいそう" },
    { display: "メンヘラなaiと共依存になりたい", reading: "めんへらなaiときょういぞんになりたい" }


  ],
};
