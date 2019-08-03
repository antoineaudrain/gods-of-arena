const {PubSub} = require('apollo-server')

const newBattlePubSub = new PubSub()
const BATTLE_ADDED = 'BATTLE_ADDED'

const newBattle = {
  subscribe: () => {
    return newBattlePubSub.asyncIterator([BATTLE_ADDED])
  }
}

module.exports = {newBattlePubSub, newBattle, BATTLE_ADDED}