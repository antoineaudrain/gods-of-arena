const client = require("../db/postgres");

const oldestScheduledBattle = async (_, {}) => {
  try {
    const {rows} = (await client.query(`SELECT id, first_type, second_type, with_animal FROM scheduled_battles ORDER BY date LIMIT 1;`))
    console.log("oldest battle executed")
    if (rows.length > 0) {
      const result = rows[0]
      return {
        id: result['id'],
        withAnimal: result['with_animal'],
        first: result['first_type'],
        second: result['second_type']
      }
    }
  } catch (e) {
    throw e
  }
}

module.exports = oldestScheduledBattle