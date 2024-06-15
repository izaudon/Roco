import { EmbedBuilder } from "discord.js"

export const man = {
  description: "コマンドの使い方をレクチャーします。",
  option: ""
}

export default async msg =>{
  const embed = new EmbedBuilder()
    .setColor(0xfff03c)
    .setTitle("ヘルプ")
    .setDescription("コマンドは、頭に `!` を付けた上、半角英数で入力してください。\n`!list` を使ってコマンドの一覧が表示できます。\n`!manual <コマンド名>`を使ってコマンドの詳細を表示できます。")
  msg.channel.send({ embeds: [embed] })
}