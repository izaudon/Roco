import { EmbedBuilder } from "discord.js"

export const interactionHandler = async itr => {
  if (!itr.isButton()) return
  if (itr.customId.startsWith("random")) {
    randomIdol(itr)
  }
  if (itr.customId.startsWith("card")) {
    randomCard(itr)
  }

  function random(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  async function randomIdol(itr) {
    let range = {
      max: 0,
      min: 0,
    }
    if (itr.customId === "randomMillionAll") {
      range.max = 52+1
      range.min = 1
    } else if (itr.customId === "randomAllStars") {
      range.max = 13+1
      range.min = 1
    } else if (itr.customId === "randomMillionStars") {
      range.max = 52+1
      range.min = 14
    } else {
      return
    }
    const idolId = Math.floor(Math.random() * (range.max - range.min) + range.min)
    const url = "https://api.matsurihi.me/api/mltd/v2/idols/" + String(idolId)
    const response = await fetch(url)
    const idol = await response.json()
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
        { name: "出身地", value: idol.birthplace.name, inline: true },
        { name: "血液型", value: idol.bloodType.name, inline: true },
        { name: "利き手", value: idol.handednessType.name, inline: true },
        { name: "身長", value: String(Math.floor(idol.height)) + "cm", inline: true },
        { name: "体重", value: String(Math.floor(idol.weight)) + "kg", inline: true },
        { name: "スリーサイズ", value: threeSize, inline: true },
        { name: "趣味", value: idol.hobby, inline: true },
        { name: "特技", value: idol.speciality, inline: true },
        { name: "好きなもの", value: idol.favorites, inline: true }
      )
      .setColor(idol.colorCode)
      .setThumbnail(imageURL)
      .setFooter({ text: "Powered by matsurihi.me", iconURL: "https://pbs.twimg.com/profile_images/1093568518421770240/A2rE7EBk_400x400.jpg" })
    itr.channel.send({ embeds: [embed] })
    itr.message.delete()
  }

  async function randomCard(itr) {
    let range
    if (itr.customId === "cardSSR") {
      range = "4&exType=0,4,14,20"
    } else if (itr.customId === "cardR") {
      range = "2,3"
    } else {
      return
    }
    const url = "https://api.matsurihi.me/api/mltd/v2/cards?includeLines&rarity=" + range
    const responce = await fetch(url)
    const cardsArray = await responce.json()
    const card = random(cardsArray)
    const rarity = card.rarity === 4 ? "SSR"
                 : card.rarity === 3 ? "SR"
                 : "R"
    const awakened = String(Math.floor(Math.random() * 2))
    const  branch = rarity === "SSR" ? ["_bg/", ".png"] : ["/", "_b.png"]
    const imageURL = "https://storage.matsurihi.me/mltd/card" + branch[0]
                   + card.resourceId + "_" + awakened + branch[1]
    const colorURL = "https://api.matsurihi.me/api/mltd/v2/idols/" + String(card.idolId)
    const response = await fetch(colorURL)
    const idol = await response.json()
    const color = idol.colorCode
    const rawText = awakened === "0" ? card.lines.flavor.beforeAwakened
               : card.lines.flavor.afterAwakened
    const text = rawText.replaceAll("\{\$P\$\}", " <プロデューサー名> ")
    const embed = new EmbedBuilder()
      .setTitle(rarity+ " " + card.name)
      .setURL("https://mltd.matsurihi.me/cards/" + card.id)
      .setDescription(awakened === "0" ? "特訓前" : "特訓後")
      .setFields({ name: "フレーバーテキスト", value: text })
      .setImage(imageURL)
      .setColor(color)
      .setFooter({ text: "Powered by matsurihi.me", iconURL: "https://pbs.twimg.com/profile_images/1093568518421770240/A2rE7EBk_400x400.jpg" })
    itr.channel.send({ embeds: [embed] })
    itr.message.delete()
  }

}