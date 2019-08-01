const client = require("../db/postgres");

const oldestScheduledBattle = async (_, {}) => {
  try {
    let result = (await client.query(`SELECT first_type, second_type, with_animal FROM scheduled_battles ORDER BY date LIMIT 1;`)).rows[0]
  } catch (e) {
    throw e
  }
  return {
    withAnimal: result['with_animal'],
    first: result['first_type'],
    second: result['second_type']
  }
}

module.exports = oldestScheduledBattle