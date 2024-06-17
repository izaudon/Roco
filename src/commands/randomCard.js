import { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js"
import { randomArray, cardInformation } from "../lib.js"

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
  const embed = await cardInformation(card)
  itr.message.delete()
  itr.channel.send({ embeds: [embed[0], embed[1]] })
}