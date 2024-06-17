import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js"
import { cardInformation } from "../lib.js"

export const man = {
  description: "検索したカードの情報を表示します。",
  option: "<カード名>"
}

export default async msg =>{
  const cardName = msg.content.replace("!searchCard", "").trim()

  if (!cardName) return msg.channel.send("検索ワードを指定してください！")

  const url = "https://api.matsurihi.me/api/mltd/v2/cards?includeLines"
  const response = await fetch(url)
  let card = await response.json()
  const words = cardName.split(/\s|　/)

  for (const name of words) {
    const regex = new RegExp(name)
    card = await card.filter(c => regex.test(c.name))
  }

  if (card.length == 0) return msg.channel.send("そんなカードはありません！")

  const rarityId = async r => {
    const rName = await r == 1 ? "N"
                      : r == 2 ? "R"
                      : r == 3 ? "SR"
                      : r == 4 ? "SSR"
                      : "NULL"
    return rName
  }

  if (card.length == 1) {
    card = card.pop()
    const resultEmbed = new EmbedBuilder()
      .setColor(0xfff03c)
      .setTitle("検索結果 : ")
    const embed = await cardInformation(card)
    await msg.channel.send({ embeds: [resultEmbed, embed[0], embed[1]] })
  } else {
    const names = []
    for (const c of card) {
      const n = "- " + await rarityId(c.rarity)  + "　" + c.name + "\n"
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