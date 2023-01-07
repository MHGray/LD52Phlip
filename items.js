let ITEMS = [
    {
        "id": 1,
        "name": "Necklace",
        "quality": 0,
        "baseValue": 0,
        "type": "Jewelry",
        "description": "An elegant fashion statement for someone who can afford a matching wardrobe.",
        "specialFlag": 0
    },
    {
        "id": 2,
        "name": "Ring",
        "quality": 5.2,
        "baseValue": 4183,
        "type": "Jewelry",
        "description": "Engraved with some strange symbols, hopefully the owner doesn't come looking for it.",
        "specialFlag": 0
    },
    {
        "id": 3,
        "name": "Earring",
        "quality": 2.5,
        "baseValue": 2292,
        "type": "Jewelry",
        "description": "A pair of earrings in the shape of skulls. They don't match but they have an endearing quality to them.",
        "specialFlag": 0
    },
    {
        "id": 4,
        "name": "Blingy Chain",
        "quality": 2.9,
        "baseValue": 673,
        "type": "Jewelry",
        "description": "A gold chain once worn by the rapper FIST. It menaces with spikes of diamond.",
        "specialFlag": 0
    },
    {
        "id": 5,
        "name": "Tiara",
        "quality": 1.9,
        "baseValue": 8,
        "type": "Jewelry",
        "description": "This piece looks absolutely stunning. It would really sing with some billowing golden locks flowing behind it.",
        "specialFlag": 1
    },
    {
        "id": 6,
        "name": "Shovel",
        "quality": 1.2,
        "baseValue": 2460,
        "type": "Tool",
        "description": "With ornate hand grips and some sort of anti-splinter guard, this is one of the nicest shovels you've seen. Shame the tip is so blunted.",
        "specialFlag": 0
    },
    {
        "id": 7,
        "name": "Bucket",
        "quality": 3.6,
        "baseValue": 3355,
        "type": "Tool",
        "description": "A legendary collector item. You can almost smell the 12 herbs and spices.",
        "specialFlag": 1
    },
    {
        "id": 8,
        "name": "Hammer",
        "quality": 5.5,
        "baseValue": 2952,
        "type": "Tool",
        "description": "A plumbing hammer. It is so heavy it could probably smash a turtle shell.",
        "specialFlag": 0
    },
    {
        "id": 9,
        "name": "Wrench",
        "quality": 7.7,
        "baseValue": 2066,
        "type": "Tool",
        "description": "Just a wrench.",
        "specialFlag": 0
    },
    {
        "id": 10,
        "name": "Crowbar",
        "quality": 3.5,
        "baseValue": 3275,
        "type": "Tool",
        "description": "It is not a wrench. Wielding it, you feel like a free man.",
        "specialFlag": 0
    },
    {
        "id": 11,
        "name": "Pistol",
        "quality": 8.2,
        "baseValue": 3492,
        "type": "Gun",
        "description": "Feels very high quality. It even comes with a little hat where the bullets come out.",
        "specialFlag": 0
    },
    {
        "id": 12,
        "name": "Shotgun",
        "quality": 2.1,
        "baseValue": 2756,
        "type": "Gun",
        "description": "Be vewy vewy quiet. It is voice activated for some reason.",
        "specialFlag": 0
    },
    {
        "id": 13,
        "name": "Norf Gun",
        "quality": 8.6,
        "baseValue": 4925,
        "type": "Gun",
        "description": "Its Norf or something else!",
        "specialFlag": 0
    },
    {
        "id": 14,
        "name": "Rocket Launcher",
        "quality": 5.4,
        "baseValue": 1676,
        "type": "Gun",
        "description": "Came with a note saying it was a Christmas present from a favorite relative.",
        "specialFlag": 1
    },
    {
        "id": 15,
        "name": "Boomerang",
        "quality": 3.4,
        "baseValue": 219,
        "type": "Gun",
        "description": "You tried to throw it away, but it came back to you!",
        "specialFlag": 0
    },
    {
        "id": 16,
        "name": "Melty Clocks Painting",
        "quality": 9.1,
        "baseValue": 3308,
        "type": "Painting",
        "description": "A painting titled Melty Time by Dolly Patron.",
        "specialFlag": 0
    },
    {
        "id": 17,
        "name": "Solflower Painting",
        "quality": 0.3,
        "baseValue": 3732,
        "type": "Painting",
        "description": "A painting titled Solflower by Vance Sedan Vroom.",
        "specialFlag": 0
    },
    {
        "id": 18,
        "name": "Screamy Dude Painting",
        "quality": 8.5,
        "baseValue": 2361,
        "type": "Painting",
        "description": "A painting titled Yelling by Count Donut.",
        "specialFlag": 0
    },
    {
        "id": 19,
        "name": "Mona Lusa Painting",
        "quality": 9.3,
        "baseValue": 1599,
        "type": "Painting",
        "description": "A painting titled Monka Lucy by Leon da Caprio. It is smaller than you thought it would be.",
        "specialFlag": 1
    },
    {
        "id": 20,
        "name": "Can of Soup Painting",
        "quality": 9.2,
        "baseValue": 3917,
        "type": "Painting",
        "description": "A painting titled Lunch by Andrew Peacecabinet.",
        "specialFlag": 0
    },
    {
        "id": 21,
        "name": "Vase",
        "quality": 8.7,
        "baseValue": 4222,
        "type": "Antique",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 22,
        "name": "Gold Goose Statue",
        "quality": 1.7,
        "baseValue": 3864,
        "type": "Antique",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 23,
        "name": "Compass",
        "quality": 2.2,
        "baseValue": 590,
        "type": "Antique",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 24,
        "name": "1959 Buick Lesabre",
        "quality": 1.1,
        "baseValue": 2406,
        "type": "Antique",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 1
    },
    {
        "id": 25,
        "name": "Opera Glasses",
        "quality": 1.2,
        "baseValue": 2560,
        "type": "Antique",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 26,
        "name": "Poison Ivy",
        "quality": 7.2,
        "baseValue": 1724,
        "type": "Plant",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 27,
        "name": "Venus Flytrap",
        "quality": 6.2,
        "baseValue": 4681,
        "type": "Plant",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 28,
        "name": "Painted Pumpkin",
        "quality": 0.2,
        "baseValue": 338,
        "type": "Plant",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 29,
        "name": "Egg Bush",
        "quality": 4.8,
        "baseValue": 1147,
        "type": "Plant",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 30,
        "name": "Money Tree",
        "quality": 7.1,
        "baseValue": 2604,
        "type": "Plant",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 1
    },
    {
        "id": 31,
        "name": "Watch",
        "quality": 4.5,
        "baseValue": 3714,
        "type": "Technology",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 32,
        "name": "Smartphone",
        "quality": 8.9,
        "baseValue": 4600,
        "type": "Technology",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 33,
        "name": "Television",
        "quality": 1.1,
        "baseValue": 1940,
        "type": "Technology",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
    {
        "id": 34,
        "name": "Toystation 5",
        "quality": 9.1,
        "baseValue": 1889,
        "type": "Technology",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 1
    },
    {
        "id": 35,
        "name": "Gamekid",
        "quality": 8,
        "baseValue": 1276,
        "type": "Technology",
        "description": "This is a test description that has a lot of characters so UI is possible to make UWU",
        "specialFlag": 0
    },
]