const client = require("../db/postgres");

const battles = async (_, {}) => {
  try {
    let result = (await client.query(`
        SELECT b.id,
               json_build_object('gladiator' ,g1.character, 'metadata', g1.metadata) AS first,
               json_build_object('gladiator' ,g2.character, 'metadata', g2.metadata) AS second,
               json_build_array(a.black_sheep, a.tiger, a.lion) AS animals
        FROM battles b
                 LEFT JOIN gladiators g1 ON b.first = g1.id
                 LEFT JOIN gladiators g2 ON b.second = g2.id
                 LEFT JOIN animals a ON b.animals = a.id
        ORDER BY date DESC
    `)).rows
      return result
  } catch (e) {
    throw e
  }
}

module.exports = battles