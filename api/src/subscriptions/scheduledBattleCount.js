const client = require("../db/postgres")
const {PubSub} = require('apollo-server')

async function getCount() {
  let result = (await client.query(`SELECT COUNT(*) FROM scheduled_battles;`)).rows[0]
  return +(result['count'])
}

const scheduledBattleCountPubSub = new PubSub()
const SCHEDULED_BATTLE_ADDED = 'SCHEDULED_BATTLE_ADDED'

function defaultValue() {
  getCount().then(count => {
    setTimeout(() => scheduledBattleCountPubSub.publish(SCHEDULED_BATTLE_ADDED, {
      scheduledBattleCount: count
    }), 100)
  })
}

const scheduledBattleCount = {
  subscribe: () => {
    defaultValue()
    return scheduledBattleCountPubSub.asyncIterator([SCHEDULED_BATTLE_ADDED])
  }
}

module.exports = {scheduledBattleCountPubSub, scheduledBattleCount, SCHEDULED_BATTLE_ADDED}