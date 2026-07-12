// 単純なマッピング辞書
const basicMap: Record<string, string[]> = {
  'あ': ['a'], 'い': ['i'], 'う': ['u', 'wu', 'whu'], 'え': ['e'], 'お': ['o'],
  'か': ['ka', 'ca'], 'き': ['ki'], 'く': ['ku', 'cu', 'qu'], 'け': ['ke'], 'こ': ['ko', 'co'],
  'さ': ['sa'], 'し': ['shi', 'si', 'ci'], 'す': ['su'], 'せ': ['se', 'ce'], 'そ': ['so', 'co'],
  'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  'わ': ['wa'], 'を': ['wo'], 'ん': ['nn', 'n'],
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  'ゔ': ['vu'],

  'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
  'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しぇ': ['she', 'sye'], 'しょ': ['sho', 'syo'],
  'ちゃ': ['cha', 'tya', 'cya'], 'ちゅ': ['chu', 'tyu', 'cyu'], 'ちぇ': ['che', 'tye', 'cye'], 'ちょ': ['cho', 'tyo', 'cyo'],
  'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
  'じゃ': ['ja', 'zya', 'jya'], 'じゅ': ['ju', 'zyu', 'jyu'], 'じぇ': ['je', 'zye', 'jye'], 'じょ': ['jo', 'zyo', 'jyo'],
  'ぢゃ': ['dya'], 'ぢゅ': ['dyu'], 'ぢょ': ['dyo'],
  'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],

  'てゃ': ['tha'], 'てぃ': ['thi'], 'てゅ': ['thu'], 'てぇ': ['the'], 'てょ': ['tho'],
  'でゃ': ['dha'], 'でぃ': ['dhi'], 'でゅ': ['dhu'], 'でぇ': ['dhe'], 'でょ': ['dho'],
  'ふぁ': ['fa', 'fwa'], 'ふぃ': ['fi', 'fwi', 'fyi'], 'ふぇ': ['fe', 'fwe', 'fye'], 'ふぉ': ['fo', 'fwo'], 'ふゅ': ['fyu'],
  'ゔぁ': ['va'], 'ゔぃ': ['vi'], 'ゔぇ': ['ve'], 'ゔぉ': ['vo'], 'ゔゅ': ['vyu'],
  'つぁ': ['tsa'], 'つぃ': ['tsi'], 'つぇ': ['tse'], 'つぉ': ['tso'],
  'いぇ': ['ye'],
  'うぁ': ['wha', 'uwa'], 'うぃ': ['whi', 'wi', 'uwi'], 'うぇ': ['whe', 'we', 'uwe'], 'うぉ': ['who', 'uwo'],
  'くぁ': ['qa', 'kwa', 'qwa'], 'くぃ': ['qi', 'qwi'], 'くぅ': ['qu'], 'くぇ': ['qe', 'qwe'], 'くぉ': ['qo', 'qwo'], 'くゃ': ['qya'], 'くゅ': ['qyu'], 'くょ': ['qyo'],
  'ぐぁ': ['gwa'], 'ぐぃ': ['gwi'], 'ぐぅ': ['gwu'], 'ぐぇ': ['gwe'], 'ぐぉ': ['gwo'],
  'すぁ': ['swa'], 'すぃ': ['swi'], 'すぅ': ['swu'], 'すぇ': ['swe'], 'すぉ': ['swo'],
  'ずぁ': ['zwa'], 'ずぃ': ['zwi'], 'ずぅ': ['zwu'], 'ずぇ': ['zwe'], 'ずぉ': ['zwo'],
  'とぁ': ['twa'], 'とぃ': ['twi'], 'とぅ': ['twu'], 'とぇ': ['twe'], 'とぉ': ['two'],
  'どぁ': ['dwa'], 'どぃ': ['dwi'], 'どぅ': ['dwu'], 'どぇ': ['dwe'], 'どぉ': ['dwo'],

  'ぁ': ['la', 'xa'], 'ぃ': ['li', 'xi'], 'ぅ': ['lu', 'xu'], 'ぇ': ['le', 'xe'], 'ぉ': ['lo', 'xo'],
  'ゃ': ['lya', 'xya'], 'ゅ': ['lyu', 'xyu'], 'ょ': ['lyo', 'xyo'],
  'っ': ['ltsu', 'xtsu', 'ltu', 'xtu'],
  'ー': ['-'],
  '、': [','], '。': ['.'], '？': ['?'], '！': ['!'], ' ': [' ']
};

// 子音のリスト (「っ」の次にきたら重ねる)
const consonants = 'kstnhmyrwgzjdbpcfqv'.split('');
const vowels = ['a', 'i', 'u', 'e', 'o'];

export type ParsedNode = {
  romaji: string;
  kana: string;
};

// 1つのひらがな文字列に対して、考えられるすべてのローマ字分割パターンのリストを生成する
// 例: "し" -> [ [{romaji: "shi", kana: "し"}], [{romaji: "si", kana: "し"}], ... ]
export function parseKanaToPatterns(kanaStr: string): ParsedNode[][] {
  if (kanaStr.length === 0) return [[]];

  let patterns: ParsedNode[][] = [];

  // 1. 2文字の組み合わせ（きゃ、しゃ等）を試す
  if (kanaStr.length >= 2) {
    const twoChars = kanaStr.substring(0, 2);
    if (basicMap[twoChars]) {
      const restPatterns = parseKanaToPatterns(kanaStr.substring(2));
      for (const r of basicMap[twoChars]) {
        for (const rest of restPatterns) {
          patterns.push([{ romaji: r, kana: twoChars }, ...rest]);
        }
      }
    }
  }

  // 2. 「っ」の特別処理 (後ろに子音が続く場合、その子音を重ねる入力)
  if (kanaStr[0] === 'っ' && kanaStr.length >= 2) {
    const restStr = kanaStr.substring(1);
    const restPatterns = parseKanaToPatterns(restStr);
    
    // 単独で xtsu などと打つパターンは 3. の 1文字処理に任せる
    
    // 重ねるパターン (後ろのローマ字の最初の子音を重ねる)
    for (const rest of restPatterns) {
      const nextNode = rest[0];
      const firstChar = nextNode.romaji[0];
      if (consonants.includes(firstChar)) {
        patterns.push([{ romaji: firstChar, kana: 'っ' }, ...rest]);
      }
    }
  }

  // 3. 「ん」の特別処理
  if (kanaStr[0] === 'ん') {
    const restPatterns = parseKanaToPatterns(kanaStr.substring(1));
    for (const rest of restPatterns) {
      // 常に 'nn' は許容
      patterns.push([{ romaji: 'nn', kana: 'ん' }, ...rest]);

      // 後ろに続く文字のローマ字が、母音・'y'・'n' から始まらない場合は 'n' 1文字でも許容
      if (rest.length > 0) {
        const nextChar = rest[0].romaji[0];
        if (!vowels.includes(nextChar) && nextChar !== 'y' && nextChar !== 'n') {
          patterns.push([{ romaji: 'n', kana: 'ん' }, ...rest]);
        }
      } else {
        // 末尾の場合も 'n' は不可 (通常タイピングゲームでは nn を要求することが多い)
        // 今回は末尾の n を許可するかはゲーム仕様次第。寿司打は nn 要求なので nn のみとする。
      }
    }
  }

  // 4. 1文字の処理
  const singleChar = kanaStr[0];
  if (basicMap[singleChar] && singleChar !== 'ん') { // んは上で特別処理済
    const restPatterns = parseKanaToPatterns(kanaStr.substring(1));
    for (const r of basicMap[singleChar]) {
      for (const rest of restPatterns) {
        patterns.push([{ romaji: r, kana: singleChar }, ...rest]);
      }
    }
  } else if (!basicMap[singleChar] && singleChar !== 'ん') {
    // 辞書にない文字（アルファベットや記号そのまま）
    const restPatterns = parseKanaToPatterns(kanaStr.substring(1));
    for (const rest of restPatterns) {
      patterns.push([{ romaji: singleChar, kana: singleChar }, ...rest]);
    }
  }

  return patterns;
}

export type TypeState = {
  kanaStr: string;
  patterns: ParsedNode[][];
  typedRomaji: string;
  expectedRomajiPrefix: string;
};

// 入力状態を管理するクラス
export class TypingSession {
  public patterns: ParsedNode[][];
  public typedCount: number = 0; // 正しく打った文字数

  public kanaStr: string;

  constructor(kanaStr: string) {
    this.kanaStr = kanaStr;
    this.patterns = parseKanaToPatterns(kanaStr);
  }

  // キー入力を行い、受理されたら true を返す
  public typeChar(char: string): boolean {
    const nextCharLower = char.toLowerCase();
    
    // 現在の入力済み文字数（typedCount）番目の文字が nextCharLower と一致するパターンのリストを抽出
    const validPatterns = this.patterns.filter(p => {
      const fullRomaji = p.map(node => node.romaji).join('');
      return fullRomaji[this.typedCount] === nextCharLower;
    });

    if (validPatterns.length > 0) {
      // 許容されるパターンだけに残す
      this.patterns = validPatterns;
      this.typedCount++;
      return true;
    }

    return false;
  }

  public isFinished(): boolean {
    if (this.patterns.length === 0) return false;
    const fullRomaji = this.patterns[0].map(node => node.romaji).join('');
    return this.typedCount >= fullRomaji.length;
  }

  public getFullTargetRomaji(): string {
    if (this.patterns.length === 0) return '';
    return this.patterns[0].map(node => node.romaji).join('');
  }

  public getTypedRomaji(): string {
    return this.getFullTargetRomaji().substring(0, this.typedCount);
  }

  public getRemainingRomaji(): string {
    return this.getFullTargetRomaji().substring(this.typedCount);
  }
}
