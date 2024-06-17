import { randomIdolInteraction } from "./commands/randomIdol.js"
import { randomCardInteraction } from "./commands/randomCard.js"

export const interactionHandler = async itr => {
  if (!itr.isButton()) return

  if (itr.customId.startsWith("random")) {
    randomIdolInteraction(itr)
  }

  if (itr.customId.startsWith("card")) {
    randomCardInteraction(itr)
  }

}