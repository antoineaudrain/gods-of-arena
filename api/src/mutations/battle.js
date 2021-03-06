const {scheduledBattleCountPubSub, SCHEDULED_BATTLE_ADDED} = require('../subscriptions/scheduledBattleCount')
const {newBattlePubSub, BATTLE_ADDED} = require('../subscriptions/newBattle')
const client = require("../db/postgres")
const uuidv4 = require('uuid/v4')

async function getCount() {
  let result = (await client.query(`SELECT COUNT(*) FROM scheduled_battles;`)).rows[0]
  return +(result['count'])
}


const battle = async (_, {id, first, second, animals}) => {
  const [battleId, firstId, secondId, animalId] = [uuidv4(), uuidv4(), uuidv4(), uuidv4()]
  const hasAnimals = animals.some(e => e.animalQuantity !== 0)

  try {
    await client.query('BEGIN')

    await insertGladiators(firstId, first, secondId, second)
    await insertAnimals(hasAnimals, animalId, animals)
    await insertBattle(battleId, firstId, secondId, hasAnimals, animalId)
    await deleteOldestBattleScheduled(id)

    const count = await getCount()
    scheduledBattleCountPubSub.publish(SCHEDULED_BATTLE_ADDED, {
      scheduledBattleCount: count
    })

    newBattlePubSub.publish(BATTLE_ADDED, {
      newBattle: {
        id: battleId,
        first: {gladiator: first.gladiatorId, metadata: {sword: first.option}},
        second: {gladiator: second.gladiatorId, metadata: {sword: second.option}},
        animals: [animals[0].animalQuantity, animals[1].animalQuantity, animals[2].animalQuantity]
      }
    })

    await client.query('COMMIT')

  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  }
  return true
}

const insertGladiators = async (firstId, first, secondId, second) => {
  const insertGladiatorText = 'INSERT INTO gladiators(id, character, metadata) VALUES ($1, $2, $3)'
  const insertFirstGladiatorValues = [firstId, first.gladiatorId, {sword: first.option}]
  const insertSecondGladiatorValues = [secondId, second.gladiatorId, {sword: second.option}]
  await client.query(insertGladiatorText, insertFirstGladiatorValues)
  await client.query(insertGladiatorText, insertSecondGladiatorValues)
}

const insertAnimals = async (hasAnimals, animalId, animals) => {
  if (hasAnimals) {
    const insertAnimalsText = 'INSERT INTO animals(id, black_sheep, tiger, lion) VALUES ($1, $2, $3, $4)'
    const insertAnimalsValues = [animalId, ...[animals[0].animalQuantity, animals[1].animalQuantity, animals[2].animalQuantity]]
    await client.query(insertAnimalsText, insertAnimalsValues)
  }
}

const insertBattle = async (id, firstId, secondId, hasAnimals, animalId) => {
  const insertBattleText = 'INSERT INTO battles(id, first, second, animals) VALUES ($1, $2, $3, $4)'
  const insertBattleValues = [id, firstId, secondId, hasAnimals ? animalId : null]
  await client.query(insertBattleText, insertBattleValues)
}

const deleteOldestBattleScheduled = async (id) => {
  await client.query('DELETE FROM scheduled_battles WHERE id = $1', [id])
}

module.exports = battle