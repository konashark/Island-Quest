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

