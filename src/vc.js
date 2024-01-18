export const vcHandler = client => async (oldState, newState) => {
  if (newState.channel && !oldState.channel) {
    const guildId = await newState.guild.id
    const guild = client.guilds.cache.get(guildId)
    const kikisen = guild.channels.cache.find(ch => ch.name === "聞き専")
    if (!kikisen) return
    kikisen.send(
      `\`${newState.member.displayName}\`さんが` +
      `**${newState.channel.name}**にコネクトしました！`)
  } else if (!newState.channel && oldState.channel) {
    const guildId = await newState.guild.id
    const guild = client.guilds.cache.get(guildId)
    const kikisen = guild.channels.cache.find(ch => ch.name === "聞き専")
    if (!kikisen) return
    kikisen.send(
      `\`${oldState.member.displayName}\`さんが` +
      `**${oldState.channel.name}**からディスコネクトしました`)
  }
}