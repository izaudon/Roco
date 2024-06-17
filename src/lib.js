import { EmbedBuilder } from "discord.js"

export const randomArray = array => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const idolProfile = (idol) => {
  const imageURL = "https://storage.matsurihi.me/mltd/card/" + String(idol.resourceId) + "0011_0_b.png"
  const threeSize = "B" + String(idol.measurements.bust)
                  + " / W" + String(idol.measurements.waist)
                  + " / H" + String(idol.measurements.hip)
  const birthday = String(idol.birthday.month) + "月"
                   + String(idol.birthday.day) + "日"
                   + " (" + idol.constellation.name + ")"
  const type = idol.type == 1 ? "Princess"
             : idol.type == 2 ? "Fairy"
             : idol.type == 3 ? "Angel"
             : "Ex"
  const embed = new EmbedBuilder()
    .setTitle(idol.fullName)
    .setDescription(idol.alphabetName)
    .setFields(
      { name: "CV", value: idol.cv },
      { name: "\u200B", value: "Profile" },
      { name: "属性", value: type, inline: true },
      { name: "年齢", value: String(idol.age) + "歳", inline: true },
      { name: "誕生日", value: birthday, inline: true },
      { name: "身長", value: String(Math.floor(idol.height)) + "cm", inline: true },
      { name: "体重", value: String(Math.floor(idol.weight)) + "kg", inline: true },
      { name: "スリーサイズ", value: threeSize, inline: true },
      { name: "出身地", value: idol.birthplace.name, inline: true },
      { name: "血液型", value: idol.bloodType.name, inline: true },
      { name: "利き手", value: idol.handednessType.name, inline: true },
      { name: "趣味", value: idol.hobby, inline: true },
      { name: "特技", value: idol.speciality, inline: true },
      { name: "好きなもの", value: idol.favorites, inline: true }
    )
    .setColor(idol.colorCode)
    .setThumbnail(imageURL)
    .setFooter({ text: "Powered by matsurihi.me", iconURL: "https://pbs.twimg.com/profile_images/1093568518421770240/A2rE7EBk_400x400.jpg" })
  return embed
}

export const cardInformation = async (card) => {
  const rarity = card.rarity === 4 ? "SSR"
               : card.rarity === 3 ? "SR"
               : "R"
  const branch = rarity === "SSR" ? ["_bg/", ".png"] : ["/", "_b.png"]
  const imageURL = [
    "https://storage.matsurihi.me/mltd/card" + branch[0]
    + card.resourceId + "_0" + branch[1],
    "https://storage.matsurihi.me/mltd/card" + branch[0]
    + card.resourceId + "_1" + branch[1]
    ]
  const idolURL = "https://api.matsurihi.me/api/mltd/v2/idols/" + String(card.idolId)
  const response = await fetch(idolURL)
  const idol = await response.json()
  const color = idol.colorCode
  const rawText = [card.lines.flavor.beforeAwakened,
                   card.lines.flavor.afterAwakened]
  const flavor = []

  for (const t of rawText) {
    const text = t.replaceAll("\{\$P\$\}", " <プロデューサー名> ")
    flavor.push(text)
  }

  const embed1 = new EmbedBuilder()
    .setTitle(rarity+ "　" + card.name)
    .setURL("https://mltd.matsurihi.me/cards/" + card.id)
    .setDescription("フレーバーテキスト")
    .setFields(
      { name: "特訓前", value: flavor[0] },
      { name: "特訓後", value: flavor[1] }
    )
    .setImage(imageURL[0])
    .setColor(color)
    .setFooter({ text: "Powered by matsurihi.me", iconURL: "https://pbs.twimg.com/profile_images/1093568518421770240/A2rE7EBk_400x400.jpg" })
  const embed2 = new EmbedBuilder()
    .setURL("https://mltd.matsurihi.me/cards/" + card.id)
    .setImage(imageURL[1])
  return [embed1, embed2]
}