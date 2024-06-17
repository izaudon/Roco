import { EmbedBuilder } from "discord.js"
import { idolProfile } from "../lib.js"

export const man = {
  description: "検索したアイドルのプロフィール情報を表示します。",
  option: "<アイドル名> または <アイドルのID>"
}

export default async msg =>{
  const idolName = msg.content.replace("!searchIdol", "").trim()

  if (!idolName) return msg.channel.send("検索ワードを指定してください！")

  const url = "https://api.matsurihi.me/api/mltd/v2/idols/"
  const response = await fetch(url)
  let idol = await response.json()
  const words = idolName.split(/\s|　/)

  for (const name of words) {
    const regex = new RegExp(name)
    const filter = (i => regex.test(i.displayName) ||
                         regex.test(i.fullNameRuby) ||
                         String(i.id) === name)
    idol = await idol.filter(i => filter(i))
  }

  if (idol.length == 0) return msg.channel.send("そんなアイドルはいません！")

  if (idol.length == 1) {
    idol = idol.pop()
    const resultEmbed = new EmbedBuilder()
      .setColor(0xfff03c)
      .setTitle("検索結果 : ")
    const embed = idolProfile(idol)
    msg.channel.send({ embeds: [resultEmbed, embed] })
  } else {
    const names = []
    idol.forEach(i => {
      names.push("- " + i.displayName + "\n")
    })
    const text = names.join("")
    const embed = new EmbedBuilder()
      .setColor(0xfff03c)
      .setTitle("検索結果が複数存在します。")
      .setDescription(text)
    msg.channel.send({ embeds: [embed] })
  }

}