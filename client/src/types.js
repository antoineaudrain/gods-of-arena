const Types = {
  SWORDSMEN: {
    img: 'https://i.ibb.co/Ht80XDR/Epe-iste.jpg',
    name: 'Swordsmen',
    id: 'SWORDSMEN',
    characters: [
      {id: 'MAXIMUS', name: 'Maximus'},
      {id: 'SPARTACUS', name: 'Spartacus'},
      {id: 'PRISCUS', name: 'Priscus'},
      {id: 'POLLUX', name: 'Pollux'}
    ],
  },
  SPEARMEN: {
    img: 'https://i.ibb.co/QYF18qs/Lancier.jpg',
    name: 'Spearmen',
    id: 'SPEARMEN',
    characters: [
      {id: 'GARNICUS', name: 'Ganicus'},
      {id: 'CRIXUS', name: 'Crixus'}
    ]
  },
  HORSEMEN: {
    img: 'https://i.ibb.co/phCRZ9n/Cavalier.jpg',
    name: 'Horsemen',
    id: 'HORSEMEN',
    characters: [
      {id: 'JEANCLAUDEDUS', name: 'Jeanclaudedus'},
      {id: 'SPICULUS', name: 'Spiculus'}
    ]
  },
  BOWMEN: {
    img: 'https://i.ibb.co/MsMnvnd/Archer.jpg',
    name: 'Bowmen',
    id: 'BOWMEN',
    characters: [
      {id: 'COMMODUS', name: 'Commodus'},
      {id: 'FLAMMA', name: 'Flamma'}
    ]
  }
}

const AnimalType = {
    img: 'https://i.ibb.co/5K0bHRf/Animal.jpg',
    name: 'Animals',
    id: 'ANIMALS',
    characters: [
      {id: 'BLACKSHEEP', name: 'Black Sheep'},
      {id: 'TIGER', name: 'Tiger'},
      {id: 'LION', name: 'Lion'}
    ]
}

const typesNames = Object.keys(Types).map(e => e[0])


export {
  Types, AnimalType, typesNames
}