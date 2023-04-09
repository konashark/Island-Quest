var SPLASH = {};   // Create a placeholder for our new State module

(function() {
    var log  = function(str) { console.log(this.id + ': ' + str);}.bind(this);

    this.id = 'SPLASH';
    this.route = 'routeSPLASH';
    this.flags = {
        asyncExit: true
    };

    log(this.id + ' Loaded');

    // ********************************************
    this.enter = function (currentState, userData) {
        log('Entering ' + this.id);
        this.redraw();
    };

    // ********************************************
    this.exit = function (callback) {
        log('Exiting ' + this.id);
    };

    // ********************************************
    this.eventHandler = function (event) {
        return false;
    }.bind(this);

    // ********************************************
    this.redraw = function() {

        console.log("ID: "+this.id);

        gCtx.fillStyle = "#0C0C1C";
        gCtx.fillRect(0, 0, g.PLAYFIELD_WIDTH, g.PLAYFIELD_HEIGHT);

        gCtx.strokeStyle = "#239";
        gCtx.lineWidth = 3;
        gCtx.strokeRect(0, 0, g.PLAYFIELD_WIDTH, g.PLAYFIELD_HEIGHT);

        gCtx.font = "bold 48px sans-serif";
        gCtx.fillStyle = "#fff";
        gCtx.fillText(this.id, (g.PLAYFIELD_WIDTH / 2) - (gCtx.measureText(this.id).width / 2), 80);
    };

}).apply(SPLASH);  // Apply this object to the State placeholder we defined
