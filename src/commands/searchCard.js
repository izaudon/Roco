import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js"
import { cardInformation } from "../lib.js"

let card = []

export const man = {
  description: "検索したカードの情報を表示します。",
  option: "<カード名> (<アイドル名>, <レアリティ>)"
}

export default async msg =>{
  const cardName = msg.content.replace("!searchCard", "").trim()
  if (!cardName) return msg.channel.send("検索ワードを指定してください！")
  const url = "https://api.matsurihi.me/api/mltd/v2/cards?includeLines"
  const response = await fetch(url)
  const cards = await response.json()

  const words = cardName.split(/\s|　/)
  const rarity = r => {
    const regex = new RegExp(r)
    const rarityId = regex.test("/(?i)ssr/") ? 4
                   : regex.test("/(?i)sr/")  ? 3
                   : regex.test("/(?i)r/")   ? 2
                   : regex.test("/(?i)n/")   ? 1
                   : 0
    return rarityId
  }
  for (const name of words) {
    const regex = new RegExp(name)
    await cards.forEach(c => {
      if (regex.test(c.name)) {
        card.push(c)
      } else if (c.rarity === rarity(name)) {
        card.push(c)
      }
    })
  }
  if (card.length == 0) return msg.channel.send("そんなカードはありません！")

  const rId = async r => {
    const rName = await r == 1 ? "N"
                      : r == 2 ? "R"
                      : r == 3 ? "SR"
                      : r == 4 ? "SSR"
                      : "NULL"
    return rName
  }

  if (card.length == 1) {
    card = card.pop()
    const title = "検索結果 : " + await rId(card.rarity) + "　" + card.name

    const unawakenedButton = new ButtonBuilder()
      .setCustomId("searchCardUnawakened")
      .setStyle(ButtonStyle.Primary)
      .setLabel("特訓 前")
    const awakenedButton = new ButtonBuilder()
      .setCustomId("searchCardAwakened")
      .setStyle(ButtonStyle.Primary)
      .setLabel("特訓 後")
    const embed = new EmbedBuilder()
      .setColor(0xfff03c)
      .setTitle(title)
      .setDescription("どちらの情報を表示しますか？")
    msg.channel.send({ embeds: [embed] })
    await msg.channel.send({
      components: [
        new ActionRowBuilder()
          .addComponents(unawakenedButton, awakenedButton)
      ]
    })

  } else {
    const names = []
    for (const c of card) {
      const n = "- " + await rId(c.rarity)  + "　" + c.name + "\n"
      names.push(n)
      if (names.indexOf(n) == 10) {
        names.push("...etc")
        break
      }
    }
    const text = names.join("")
    const embed = new EmbedBuilder()
      .setColor(0xfff03c)
      .setTitle("検索結果が複数存在します。")
      .setDescription(text)
    msg.channel.send({ embeds: [embed] })
  }

}

export const searchCardInteraction = async (itr) => {
  let awakened
  if (itr.customId === "searchCardUnawakened") {
    awakened = "0"
  } else if (itr.customId === "searchCardAwakened") {
    awakened = "1"
  } else {
    return
  }
  const embed = await cardInformation(card, awakened)
  itr.channel.send({ embeds: [embed] })
  itr.message.delete()
  card = []
}