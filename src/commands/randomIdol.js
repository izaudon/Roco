import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js"
import { idolProfile } from "../lib.js"

export const man = {
  description: "選んだグループ内で、ランダムで1人のアイドルのプロフィール情報を出力します。",
  option: ""
}

export default async msg => {
  const allButton = new ButtonBuilder()
    .setCustomId("randomMillionAll")
    .setStyle(ButtonStyle.Primary)
    .setLabel("765PRO (52人)")
  const ASButton = new ButtonBuilder()
    .setCustomId("randomAllStars")
    .setStyle(ButtonStyle.Danger)
    .setLabel("ALLSTARS (13人)")
  const mlButton = new ButtonBuilder()
    .setCustomId("randomMillionStars")
    .setStyle(ButtonStyle.Success)
    .setLabel("MILLIONSTARS (39人)")
  await msg.channel.send({
    content: "どのチームからチョイスしますか？",
    components: [
      new ActionRowBuilder()
        .addComponents(allButton, ASButton, mlButton)
    ]
  })
}

export const randomIdolInteraction = async itr => {
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
  const embed = idolProfile(idol)
  itr.message.delete()
  itr.channel.send({ embeds: [embed] })
}