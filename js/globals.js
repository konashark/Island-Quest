var g = {};	// Globals
var s = {}; // Statics

g.xTile = 140;
g.yTile = 156;
g.x = 140 * 128 + 64;
g.y = 156 * 128 + 64;

g.canvas = undefined;
g.ctx = undefined;

s.PLAYFIELD_WIDTH = 1280;
s.PLAYFIELD_HEIGHT = 800;

// States
s.INITIALIZING = 0;
s.RUNNING = 1;

g.state = s.INITIALIZING;

g.islandMapImg = undefined;
g.islandMapCanvas = undefined;
g.islandMapCtx = undefined;
