const client = require("../db/postgres");
const uuidv4 = require('uuid/v4');
const {scheduledBattleCountPubSub, SCHEDULED_BATTLE_ADDED} = require('../subscriptions/scheduledBattleCount')

async function getCount() {
  let result = (await client.query(`SELECT COUNT(*) FROM scheduled_battles;`)).rows[0]
  return +(result['count'])
}

const scheduleBattle = async (_, {first, second, withAnimal}) => {
  try {
    await client.query(`
        INSERT INTO scheduled_battles (id, first_type, second_type, with_animal)
        VALUES($1, $2, $3, $4);`,
      [uuidv4(), first, second, withAnimal])
    const count = await getCount()
    scheduledBattleCountPubSub.publish(SCHEDULED_BATTLE_ADDED, {
      scheduledBattleCount: count
    });
  } catch (e) {
    throw e
  }
  return true
}

module.exports = scheduleBattle