/*
 *  GAME TEMPLATE
 *  V1.0D April 2, 2023
 *  Copyright (c) 2023 Jeffrey Sprague
 *
 *  Template framework for a game or other app that uses multiple "state" screens and a single canvas for rendering
 */

var jgl;
var stateManager;

// ********************************************
window.onload = function() {

    jgl = new Jgl; // Instantiate JGL. Do this once at the start of your program

    g.canvas = document.getElementById("playfield");
    g.ctx = g.canvas.getContext("2d");

    // Create the state machine and initialise it to a given state
    stateManager = jgl.newStateManager();

    // Register our two states (defined in their own, name-corresponding files)
    stateManager.registerState(SPLASH);
    stateManager.registerState(GAME);
    stateManager.registerState(END);

    var stateList = ['SPLASH', 'GAME', 'END'];
    var stateIdx = 1;   // 1 for development, 0 for game

    // Start handling key events
    document.onkeydown = function(event) {
        var eventConsumed = false;
        event.preventDefault();

        // First, see if the current state object is interested in this event
        var eventHandler = stateManager.getCurrentStateEventHandler();
        if (eventHandler) {
            eventConsumed = eventHandler(event);
        }

        // If the current state object didn't use the event, perhaps we, the main app wrapper will use it
        if (!eventConsumed) {
            //console.log("Event was not handled by any State");
            var key = event.key;
            var keyCode = event.keyCode;

            switch (keyCode) {
                case jgl.KEYS.ENTER: {
                    if (++stateIdx > 2) {
                        stateIdx = 0;
                    }
                    stateManager.transitionTo(stateList[stateIdx]);
                }
            }
        }
    }.bind(this);

    // Once external files are loaded, we can start the main game loop by transitioning to first screen state
    this.loadResources(function() {
        console.log('RESOURCES Loaded');
        createMap();
        stateManager.transitionTo(stateList[stateIdx]);
    });

    console.log('Loaded');
};

/*************************************************/
function loadResources(callback) {
    var numToLoad = 27;
    var frame, i;

    var isLoadComplete = function() {
        console.log("Images to load: " + numToLoad);
        if (--numToLoad == 0) {
            callback();
        }
    };

    // Load all the images we will make screens or sprites out of
    g.parchmentImg = jgl.newImage('resources/images/parchment.png', isLoadComplete);
    g.mapImg = jgl.newImage('resources/images/map.png', isLoadComplete);
    g.islandMapImg = jgl.newImage('resources/images/islandmap.png', function(img) {
        g.islandMapCanvas = jgl.convertImageToCanvas(img);
        g.islandMapCtx = g.islandMapCanvas.getContext("2d");
        isLoadComplete();
    });

    g.woodImg = jgl.newImage('resources/images/wood.png', isLoadComplete);
    g.frameImg = jgl.newImage('resources/images/frame.png', isLoadComplete);
    g.deskImg = jgl.newImage('resources/images/desktop.jpg', isLoadComplete);
    g.titleImg = jgl.newImage('resources/images/islandquest.png', isLoadComplete);

    // Tiles
    g.beachTile = jgl.newImage('resources/images/tiles/beach-128.jpg', isLoadComplete);
    g.forestTile = jgl.newImage('resources/images/tiles/forest 2-128.jpg', isLoadComplete);
    g.desertTile = jgl.newImage('resources/images/tiles/desert-128.jpg', isLoadComplete);
    g.meadowTile = jgl.newImage('resources/images/tiles/meadow-128.jpg', isLoadComplete);
    g.seaTile = jgl.newImage('resources/images/tiles/sea-128.jpg', isLoadComplete);
    g.swampTile = jgl.newImage('resources/images/tiles/swamp-128.jpg', isLoadComplete);
    g.mountainTile = jgl.newImage('resources/images/tiles/mountain pass-128.jpg', isLoadComplete);
    g.snowTile = jgl.newImage('resources/images/tiles/snowy mountain pass-128.jpg', isLoadComplete);
    g.riverTile = jgl.newImage('resources/images/tiles/river 2-128.jpg', isLoadComplete);
    g.lakeTile = jgl.newImage('resources/images/tiles/sea-128.jpg', isLoadComplete);


    // Environments
    g.terrain[0].img = jgl.newImage('resources/images/terrain/beach on right.jpg', isLoadComplete);  // TODO: Need SEA image
    g.terrain[1].img= jgl.newImage('resources/images/terrain/meadow.jpg', isLoadComplete);
    g.terrain[2].img= jgl.newImage('resources/images/terrain/forest.jpg', isLoadComplete);
    g.terrain[3].img= jgl.newImage('resources/images/terrain/swamp.jpg', isLoadComplete);
    g.terrain[4].img= jgl.newImage('resources/images/terrain/mountain pass.jpg', isLoadComplete);
    g.terrain[5].img= jgl.newImage('resources/images/terrain/beach on right.jpg', isLoadComplete);
    g.terrain[6].img= jgl.newImage('resources/images/terrain/desert.jpg', isLoadComplete);
    g.terrain[7].img= jgl.newImage('resources/images/terrain/river.jpg', isLoadComplete);
    g.terrain[8].img= jgl.newImage('resources/images/terrain/river.jpg', isLoadComplete);   // TODO: Need LAKE image
    g.terrain[9].img= jgl.newImage('resources/images/terrain/snowy pass.jpg', isLoadComplete);
}
