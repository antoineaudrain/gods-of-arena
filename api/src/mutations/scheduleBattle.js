const client = require("./db/postgres");

const scheduleBattle = async (_, {first, second, withAnimal}) => {
  try {
    await client.query(`
        INSERT INTO scheduled_battles (first_type, second_type, with_animal)
        VALUES($1, $2, $3);`,
        [first, second, withAnimal]).catch((err) => {
      console.log(err)
    })

  } catch (e) {
    throw e
  }
  return true
}

module.exports = scheduleBattle