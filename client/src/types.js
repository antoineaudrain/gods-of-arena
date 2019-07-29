const Types = {
  SWORDSMEN: {
    img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg',
    name: 'Swordsmen',
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
    characters: [
      'Ganicus',
      'Crixus'
    ]
  },
  HORSEMEN: {
    img: 'https://i.ibb.co/phCRZ9n/Cavalier.jpg',
    name: 'Horsemen',
    characters: [
      'Jeanclaudedus',
      'Spiculus'
    ]
  },
  BOWMEN: {
    img: 'https://i.ibb.co/MsMnvnd/Archer.jpg',
    name: 'Bowmen',
    characters: [
      'Commodus',
      'Flamma'
    ]
  }
}

const OptionType = {
  ANIMALS: {
    img: 'https://i.ibb.co/5K0bHRf/Animal.jpg',
    name: 'Animals',
    characters: [
      'Black Sheep',
      'Tiger',
      'Lion'
    ]
  }
}

const typesNames = Object.keys(Types).map(e => e[0])


export {
  Types, OptionType, typesNames
}