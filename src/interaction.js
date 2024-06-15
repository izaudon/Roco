import { randomIdolInteraction } from "./commands/randomIdol.js"
import { randomCardInteraction } from "./commands/randomCard.js"
import { searchCardInteraction } from "./commands/searchCard.js"

export const interactionHandler = async itr => {
  if (!itr.isButton()) return
  if (itr.customId.startsWith("random")) {
    randomIdolInteraction(itr)
  }
  if (itr.customId.startsWith("card")) {
    randomCardInteraction(itr)
  }
  if (itr.customId.startsWith("search")) {
    searchCardInteraction(itr)
  }

}