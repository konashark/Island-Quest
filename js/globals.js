var jgl = null;

var s = {	// STATICS
	PLAYFIELD_WIDTH: 1280,
	PLAYFIELD_HEIGHT: 800,
	INITIALIZING: 0,
	RUNNING: 1	
}; // Statics

var g = {	// GLOBALS
	xTile: 147,
	yTile: 164,
    x: 147 * 128 + 64,
    y: 164 * 128 + 64,
    canvas: undefined,
    ctx: undefined,
    islandMapImg: undefined,
    islandMapCanvas: undefined,
    islandMapCtx: undefined,
    map: null,
    state: s.INITIALIZING,
    img: [],
    terrainType: 2,
    keyCallback: null,
    mode: 'map',
    characters:[
        { type: 'Men',        desc: 'a group of ',      str: 1, agg: 0, singular: false, img: undefined },
        { type: 'Minstral',   desc: 'a wandering ',     str: 0, agg: 0, singular: true,  img: undefined },
        { type: 'Merchant',   desc: 'a traveling ',     str: 1, agg: 0, singular: true,  img: undefined },
        { type: 'Orcs',       desc: 'a band of ',       str: 4, agg: 5, singular: false, img: undefined },
        { type: 'Goblins',    desc: 'a group of ',      str: 3, agg: 3, singular: false, img: undefined },
        { type: 'Dwarfs',     desc: 'a gathering of ',  str: 3, agg: 2, singular: false, img: undefined },
        { type: 'Harpies',    desc: 'a flock of ',      str: 3, agg: 4, singular: false, img: undefined },
        { type: 'Gypsies',    desc: 'a caravan of ',    str: 2, agg: 2, singular: false, img: undefined },
        { type: 'Bandits',    desc: 'a gang of ',       str: 3, agg: 4, singular: false, img: undefined },
        { type: 'Trolls',     desc: 'a den of ',        str: 4, agg: 3, singular: false, img: undefined },
        { type: 'Wizard',     desc: 'a magical ',       str: 5, agg: 2, singular: true,  img: undefined },
        { type: 'Enchantress',desc: 'a mystical ',      str: 5, agg: 2, singular: true,  img: undefined },
        { type: 'Hag',        desc: 'an old ',          str: 5, agg: 2, singular: true,  img: undefined },
        { type: 'Cleric',     desc: 'a wandering ',     str: 1, agg: 0, singular: true,  img: undefined },
        { type: 'Dragon',     desc: 'a ferocious ',     str: 5, agg: 4, singular: true,  img: undefined }
    ],
    terrain:[],
    goods:[],
    inventory: [],
    capacity: 0,
    load: 0,
    strength: 0,
    charisma: 5,
    day: 1,
    quarterHour: 0
};

g.terrain[0]  = { type: 'sea',       	img: undefined };
g.terrain[1]  = { type: 'meadow',    	img: undefined };
g.terrain[2]  = { type: 'forest',    	img: undefined };
g.terrain[3]  = { type: 'swamp',     	img: undefined };
g.terrain[4]  = { type: 'mountain',  	img: undefined };
g.terrain[5]  = { type: 'beach',  		img: undefined };
g.terrain[6]  = { type: 'desert',  		img: undefined };
g.terrain[7]  = { type: 'river',  		img: undefined };
g.terrain[8]  = { type: 'lake',  		img: undefined };
g.terrain[9]  = { type: 'snowy pass',	img: undefined };
g.terrain[10]  = { type: 'town',        img: undefined };
g.terrain[11]  = { type: 'coastal town',img: undefined };

g.terrain['CAVE']       = { type:' cave',      img: undefined };
g.terrain['ROCK']       = { type:' rock',      img: undefined };
g.terrain['TOWN']       = { type: 'town',      img: undefined };
g.terrain['CASTLE']     = { type: 'castle',    img: undefined };
g.terrain['SHACK']      = { type: 'shack',     img: undefined };
g.terrain['RUINS']      = { type: 'ruins',     img: undefined };
g.terrain['TEMPLE']     = { type: 'temple',    img: undefined };

g.goods['GOLD']         = { type: 'Gold',      img: undefined, price:1,   weight:0.05, str:0,quan:500};
g.goods['FOOD']         = { type: 'Food Packet',img: undefined, price:8,   weight:1,  str:0,  quan:5};
g.goods['CANTEEN']      = { type: 'Canteen',   img: undefined, price:14,  weight:2,  str:0,  quan:2};
g.goods['ALE']          = { type: 'Ale',       img: undefined, price:12,  weight:2,  str:0,  quan:0};
g.goods['MEDICINE']     = { type: 'Medicine',  img: undefined, price:75,  weight:1,  str:0,  quan:0};
g.goods['LANTERN']      = { type: 'Lantern',   img: undefined, price:40,  weight:6,  str:0,  quan:0};
g.goods['ROPE']         = { type: 'Rope',      img: undefined, price:45,  weight:8,  str:0,  quan:0};
g.goods['AXE']          = { type: 'Axe',       img: undefined, price:60,  weight:15, str:4,  quan:0};
g.goods['SHOVEL']       = { type: 'Shovel',    img: undefined, price:35,  weight:12, str:2,  quan:0};
g.goods['MAP']          = { type: 'Map',       img: undefined, price:100, weight:1,  str:0,  quan:0};
g.goods['SPELL']        = { type: 'Spell',     img: undefined, price:75,  weight:1,  str:0,  quan:0};
g.goods['MAGIC KEY']    = { type: 'Magic Key', img: undefined, price:500, weight:1,  str:0,  quan:0};
g.goods['GEMS']         = { type: 'Gems',      img: undefined, price:100, weight:1,  str:0,  quan:0};
g.goods['LUTE']         = { type: 'Lute',      img: undefined, price:20,  weight:3,  str:0,  quan:0};
g.goods['LEATHERS']     = { type: 'Leathers',  img: undefined, price:35,  weight:8,  str:4,  quan:0};
g.goods['CHAIN MAIL']   = { type: 'Chain Mail',img: undefined, price:75,  weight:15, str:10, quan:0};
g.goods['DAGGER']       = { type: 'Dagger',    img: undefined, price:30,  weight:5,  str:3,  quan:0};
g.goods['BROAD SWORD']  = { type: 'Sword',     img: undefined, price:60,  weight:10, str:10, quan:0};
g.goods['LONG BOW']     = { type: 'Long Bow',  img: undefined, price:50,  weight:10, str:8,  quan:0};
g.goods['SHIELD']       = { type: 'Shield',    img: undefined, price:25,  weight:5,  str:4,  quan:0};
g.goods['SMALL BOAT']   = { type: 'Small Boat',img: undefined, price:250, weight:5,  str:4,  quan:0};
g.goods['SHIP']         = { type: 'Ship',      img: undefined, price:2250,weight:5,  str:4,  quan:0};
g.goods['DONKEY']       = { type: 'Donkey',    img: undefined, price:150, weight:0,  str:0,  quan:0};
g.goods['MERCENARY']    = { type: 'Mercenary', img: undefined, price:50,  weight:0,  str:10, quan:1};

for (var key in g.goods) {
    g.inventory[key] = g.goods[key];
};
g.inventory['GOLD'].quan = 1000;
g.inventory['FOOD'].quan = 5;
g.inventory['CANTEEN'].quan = 2;
g.inventory['MERCENARY'].quan = 1;
