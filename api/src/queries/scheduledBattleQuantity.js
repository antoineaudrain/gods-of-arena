const client = require("../db/postgres");

const scheduledBattleQuantity = async (_, {}) => {
  try {
    let result = (await client.query(`SELECT COUNT(*) FROM scheduled_battles;`)).rows[0]
    return result['count'] || null
  } catch (e) {
    throw e
  }
}

module.exports = scheduledBattleQuantity