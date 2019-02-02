/***********
Data: Customize the data below as you please.
***********/

const CHARACTERS = {
  ford: {
    name: "robert ford",
    display_name: "Robert Ford",
    audio_message: `FORD_MESSAGE`,
    description: `FORD_MESSAGE`,
    img: {
      smallImageUrl: "https://amp.thisisinsider.com/images/5832e0ea70296624008b47ed-750-563.png",
      largeImageUrl: "https://amp.thisisinsider.com/images/5832e0ea70296624008b47ed-750-563.png"
    }
  },
  mave: {
    name: "Maeve Millay",
    display_name: "Maeve Millay",
    audio_message: `MAEVE_MESSAGE`,
    description: `MAEVE_MESSAGE`,
    img: {
      smallImageUrl: "https://i.pinimg.com/originals/71/be/22/71be22f7adfc28e4a2d9133a0d92c7df.jpg",
      largeImageUrl: "https://i.pinimg.com/originals/71/be/22/71be22f7adfc28e4a2d9133a0d92c7df.jpg"
    }
  },
  dolores: {
    name: "Dolores Abernathy",
    display_name: "Dolores Abernathy",
    audio_message: `DOLORES_MESSAGE`,
    description: `DOLORES_MESSAGE`,
    img: {
      smallImageUrl: "https://uproxx.files.wordpress.com/2016/10/westworld-doloroes-flies.jpg?quality=95",
      largeImageUrl: "https://uproxx.files.wordpress.com/2016/10/westworld-doloroes-flies.jpg?quality=95"
    }
  },
  teddy: {
    name: "Teddy Flood",
    display_name: "Teddy Flood",
    audio_message: `TEDDY_MESSAGE`,
    description: `TEDDY_MESSAGE`,
    img: {
      smallImageUrl: "https://i.pinimg.com/originals/55/ce/4c/55ce4c6ce3a7724accebb1017b2b3af2.jpg",
      largeImageUrl: "https://i.pinimg.com/originals/55/ce/4c/55ce4c6ce3a7724accebb1017b2b3af2.jpg"
    }
  },
  bernard: {
    name: "Bernard Lowe",
    display_name: "Bernard Lowe",
    audio_message: `BERNARD_MESSAGE`,
    description: `BERNARD_MESSAGE`,
    img: {
      smallImageUrl: "https://vignette.wikia.nocookie.net/westworld/images/b/b6/Bernard_Les_Ecorches.png/revision/latest?cb=20180604190617",
      largeImageUrl: "https://vignette.wikia.nocookie.net/westworld/images/b/b6/Bernard_Les_Ecorches.png/revision/latest?cb=20180604190617"
    }
  },
  mib: {
    name: "Man in Black",
    display_name: "Man in Black",
    audio_message: "MIB_MESSAGE",
    description: `MIB_MESSAGE`,
    img: {
      smallImageUrl: "https://pixel.nymag.com/imgs/daily/vulture/2016/12/04/mib.w700.h700.jpg",
      largeImageUrl: "https://pixel.nymag.com/imgs/daily/vulture/2016/12/04/mib.w700.h700.jpg"
    }
  }
};

// points for question's answers in order
const points = [{
    points_1: {
      bernard: 1,
      ford: 1
    },
    points_2: {
      mave: 1
    },
    points_3: {
      teddy: 1
    },
    points_4: {
      dolores: 1,
      mib: 1
    }
  },
  {
    points_1: {
      teddy: 1
    },
    points_2: {
      mave: 1
    },
    points_3: {
      dolores: 1
    },
    points_4: {
      mib: 1
    }
  },
  {
    points_1: {
      ford: 1
    },
    points_2: {
      mib: 1
    },
    points_3: {
      teddy: 1
    },
    points_4: {
      bernard: 1
    }
  },
  {
    points_1: {
      dolores: 1
    },
    points_2: {
      bernard: 1
    },
    points_3: {
      mave: 1
    },
    points_4: {
      ford: 1
    }
  },
  {
    points_1: {
      ford: 1
    },
    points_2: {
      teddy: 1
    },
    points_3: {
      bernard: 1
    },
    points_4: {
      mib: 1
    }
  },
  {
    points_1: {
      bernard: 1
    },
    points_2: {
      dolores: 1
    },
    points_3: {
      mib: 1
    },
    points_4: {
      mave: 1
    }
  },
  {
    points_1: {
      bernard: 1
    },
    points_2: {
      mave: 1
    },
    points_3: {
      dolores: 1
    },
    points_4: {
      teddy: 1
    }
  },
  {
    points_1: {
      ford: 1
    },
    points_2: {
      dolores: 1
    },
    points_3: {
      bernard: 1
    },
    points_4: {
      mib: 1
    }
  }
  ,
  {
    points_1: {
      teddy: 1
    },
    points_2: {
      mave: 1
    },
    points_3: {
      mib: 1
    },
    points_4: {
      ford: 1
    }
  }
];

exports.points = points;
exports.CHARACTERS = CHARACTERS;
