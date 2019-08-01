const client = require("../db/postgres");
const uuidv4 = require('uuid/v4');

const scheduleBattle = async (_, {first, second, withAnimal}) => {
  try {
    await client.query(`
        INSERT INTO scheduled_battles (id, first_type, second_type, with_animal)
        VALUES($1, $2, $3, $4);`,
      [uuidv4(), first, second, withAnimal]).catch((err) => {
      console.log(err)
    })

  } catch (e) {
    throw e
  }
  return true
}

module.exports = scheduleBattle