import fs from "fs"
import { EmbedBuilder } from "discord.js"

export const man = {
  description: "使えるコマンドの一覧を表示します。",
  option: ""
}

export default async msg => {
  const files = fs.readdirSync("./src/commands/").filter(file => file.endsWith(".js"))
  const commands = []
  files.forEach((element) => {
    commands.push(element.replace(".js", "\n"))
  })
  const text = commands.join("- ")
  const embed = new EmbedBuilder()
    .setColor(0xfff03c)
    .setTitle("コマンド一覧")
    .setDescription("- " + text)
  msg.channel.send({ embeds: [embed] })
}