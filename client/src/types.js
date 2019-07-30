const Types = {
  SWORDSMEN: {
    img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg',
    name: 'Swordsmen',
    id: 'SWORDSMEN',
    characters: [
      'Maximus',
      'Spartacus',
      'Priscus',
      'Puollux'
    ]
  },
  SPEARMEN: {
    img: 'https://i.ibb.co/QYF18qs/Lancier.jpg',
    name: 'Spearmen',
    id: 'SPEARMEN',
    characters: [
      'Ganicus',
      'Crixus'
    ]
  },
  HORSEMEN: {
    img: 'https://i.ibb.co/phCRZ9n/Cavalier.jpg',
    name: 'Horsemen',
    id: 'HORSEMEN',
    characters: [
      'Jeanclaudedus',
      'Spiculus'
    ]
  },
  BOWMEN: {
    img: 'https://i.ibb.co/MsMnvnd/Archer.jpg',
    name: 'Bowmen',
    id: 'BOWMEN',
    characters: [
      'Commodus',
      'Flamma'
    ]
  }
}

const AnimalType = {
    img: 'https://i.ibb.co/5K0bHRf/Animal.jpg',
    name: 'Animals',
    id: 'ANIMALS',
    characters: [
      'Black Sheep',
      'Tiger',
      'Lion'
    ]
}

const typesNames = Object.keys(Types).map(e => e[0])


export {
  Types, AnimalType, typesNames
}