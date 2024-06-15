import { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js"
import { randomArray } from "../lib.js"

export const man = {
  description: "選んだレアリティ内で、存在するカードからランダムで1枚の情報を出力します。",
  option: ""
}

export default async msg => {
  const ssrButton = new ButtonBuilder()
    .setCustomId("cardSSR")
    .setStyle(ButtonStyle.Primary)
    .setLabel("SSR")
  const rButton = new ButtonBuilder()
    .setCustomId("cardR")
    .setStyle(ButtonStyle.Primary)
    .setLabel("SR・R")
  await msg.channel.send({
    content: "どのレアリティからチョイスしますか？",
    components: [
      new ActionRowBuilder()
        .addComponents(ssrButton, rButton)
    ]
  })
}

export const randomCardInteraction = async itr => {
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
  const card = randomArray(cardsArray)
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