export default {
  diggy: ["分かってんだろ？ﾍﾟｲｽ", "ア アラララァ ア アァ！", "笑い止まんねぇよ"],
  reply: ["どうかしましたか？", "はい！", "はい！ロコですよ！", "ロコです！", "なんですか〜？プロデューサー！"],
  command: {
    "みくじ": fortune,
  },
  answer: {
    "ping": ":ping_pong:\npongです！",
    "コマンド": "`!help` と入力してみてください！",
    "どうした|どうかした|どうないした": ["どうしたも、こうしたもないで", "どうしたも、こうしたもないです！"],
    "何かあったのか": ["何かあったのか、じゃないで","何かあったのか、じゃないです！"],
    "おはよ": "おはようございます、プロデューサー！",
    "こんにちは": "こんにちは、プロデューサー！",
    "こんばん": "こんばんは、プロデューサー！",
    "おやすみ": "おやすみなさい、プロデューサー！",
    "バイバイ|さよなら|さようなら|また(ね|な)|じゃ.*(ね|な)": "バイバイです、プロデューサー",
    "ほめて|褒めて|できた|出来た": ["コングラッチュレーションです！", "マーベラスです！", "ファンタスティックです！", "アメイジングです！", "エクセレントです！"],
    "かわい|可愛|カワイ|えらい|偉|すご|凄|流石|さすが|すき|好き": "えへへ。サンクスです～",
    "アホ|あほ|阿呆|馬鹿|バカ|ばか|うんち|うんこ|ウンチ|ウンコ|クソ|くそ|糞|ボケ|ぼけ|カス|はげ|ハゲ|排泄|ゲロ|吐瀉": ["ひどいです！", "ひどいですよ！プロデューサー！"],
    "あけおめ|あけまして|明けまして": "ハッピーニューイヤーです、プロデューサー！",
  }
}

export async function fortune(msg) {
  const weight = {
    ssr: 0.05,
    sr: 0.35,
    r: 0.6,
  }
  const mikuji = [
    { unsei: "> \[**大吉**\]", comment: "\nエクセレントです！", rarity: "r" },
    { unsei: "> \[**吉**\]", comment: "\nグレイトです！", rarity: "r" },
    { unsei: "> \[**中吉**\]", comment: "\nベリーグッドです！", rarity: "r" },
    { unsei: "> \[**小吉**\]", comment: "\nグッドです！", rarity: "r" },
    { unsei: "> \[**末吉**\]", comment: "\nナイスです！", rarity: "r" },
    { unsei: "> \[**凶**\]", comment: "\nバッドですね……", rarity: "sr" },
    { unsei: "> \[**大凶**\]", comment: "\nテリブルです……", rarity: "sr" },
    { unsei: "> \[**大々吉**\]", comment: "\nアメイジングです！", rarity: "sr" },
    { unsei: "> \[**チュパ吉**\]", comment: "\nラッキーです……？", rarity: "sr" },
    { unsei: "> \[**崖吉**\]", comment: "\nラッキーなんですかね……？", rarity: "sr" },
    { unsei: "> \[**百万吉**\]", comment: "\nワンダフルです！", rarity: "sr" },
    { unsei: "> \[**令和**\]", comment: "\n🤔", rarity: "ssr" },
    { unsei: "> \[**ロコ吉**\]", comment: "\nファンタスティックです！", rarity: "ssr" },
    { unsei: "> \[**ぴょん吉**\]", comment: "\n……誰ですか？", rarity: "ssr" },
  ]
  const random = async loop =>{
    const randomNumber = Math.random()
    let filter

    if (randomNumber <= weight.ssr) {
      filter = "ssr"
    } else if (randomNumber <= weight.sr) {
      filter = "sr"
    } else {
      filter = "r"
    }

    const byRarity = []

    for (const item of mikuji) {
      if (item.rarity === filter) {
        byRarity.push({ unsei: item.unsei, comment: item.comment })
      }
    }

    const marge = []

    if (loop) {
      for (const item of byRarity) {
        marge.push(item.unsei)
      }
    } else {
      for (const item of byRarity) {
        marge.push(item.unsei + item.comment)
      }
    }

    msg.channel.send(marge[Math.floor(Math.random() * marge.length)])
  }

  if (/\d/.test(msg.content)) {
    const times = msg.content.replace(/[^0-9]/g, "")
    if (times > 10) times = 10
    for (let i = 0;i < times;i++) {
      random(true)
    }
  } else {
    random(false)
  }

}
