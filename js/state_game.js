// This module/state handles the primary navigation on the main screen
var GAME = {};

(function() {
    var log  = function(str) { console.log(this.id + ': ' + str);}.bind(this);

    this.id = 'GAME';
    this.route = 'routeGAME';
    this.flags = {
        asyncExit: true
    };

    log(this.id + ' Loaded');

    var INITED = false;

    var tileMapCanvas = undefined;
    var mapCanvas = undefined;
    var panelCanvas = undefined;
    var environmentCanvas = undefined;

   // ********************************************
    this.enter = function (currentState, userData) {
        log('Entering ' + this.id);

        if (!INITED) {
            this.init();
        }

        g.state = s.RUNNING;

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
    this.init = function() {
        log('Initializing ' + this.id);
        INITED = true;

        tileMapCanvas = document.createElement("canvas");
        tileMapCanvas.width = 642;
        tileMapCanvas.height = 386;

        mapCanvas = document.createElement("canvas");
        mapCanvas.width = 524;
        mapCanvas.height = 329;

        panelCanvas = document.createElement("canvas");
        panelCanvas.width = 644;
        panelCanvas.height = 329;

        environmentCanvas = document.createElement("canvas");
        environmentCanvas.width = 540;
        environmentCanvas.height = 424;
    };

    // ********************************************
    this.redraw = function() {

        if (g.state == s.RUNNING) {

            // Draw background
            g.ctx.drawImage(g.woodImg, 0, 0, 1000, 610, 0, 0, s.PLAYFIELD_WIDTH - 0, s.PLAYFIELD_HEIGHT - 0);

            drawMap();
            drawEnvironment();
            drawTileMap(); 
            drawPanel();
        }

    };

    // ********************************************
    drawTileMap = function() {
        var tileMapCtx = tileMapCanvas.getContext("2d");

        // Tile Map
        var pixels = g.islandMapCtx.getImageData(g.xTile - 2, g.yTile - 1, 5, 3);
        console.log("Pixels: ");
        for (var i = 0; i < 60; i+=4) {
            console.log(i+": "+jgl.decToHex(pixels.data[i])+jgl.decToHex(pixels.data[i+1])+jgl.decToHex(pixels.data[i+2]) );
        }

        for (y = 0; y < 3; y++) {
            for (x = 0; x < 5; x++) {
                if (Math.random() > .5)
                    tileMapCtx.drawImage(g.beachTile, 0, 0, 128, 128, 2 + (x * 128), 2 + (y * 128), 126, 126);
                else
                    tileMapCtx.drawImage(g.forestTile, 0, 0, 128, 128, 2 + (x * 128), 2 + (y * 128), 126, 126);
            }
        }

        tileMapCtx.strokeStyle = "#fc8";
        tileMapCtx.strokeStyle = 'rgba(255,225,176,0.5)';
        tileMapCtx.lineWidth = 2;
        tileMapCtx.strokeRect(0, 0, 128*5 + 2, 128*3 + 2);

        g.ctx.drawImage(tileMapCanvas, 38, 21, 128*5 + 2, 128*3 + 2);
};

    // ********************************************
    drawEnvironment = function() {
         var ctx = environmentCanvas.getContext("2d");
        // Draw environment image
        ctx.drawImage(g.beachImg, 0, 0, 1024, 725, 40, 35, 450, 330);
        ctx.drawImage(g.frameImg, 0, 0, 476, 352, 0, 0, 540, 424);

        g.ctx.drawImage(environmentCanvas, 714, 0, 540, 424);
    };

    // ********************************************
    drawMap = function() {
        // Draw map

        var ctx = mapCanvas.getContext("2d");
        ctx.drawImage(g.mapImg, 0, 0, 500, 320, 0, 0, 520, 325);
        ctx.strokeStyle = "#fc8";
        ctx.strokeStyle = 'rgba(255,225,176,0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 520 + 4, 325 + 4);

        g.ctx.drawImage(mapCanvas, 718, 438, 524, 329);
     };

    // ********************************************
    drawPanel = function() {
        var ctx = panelCanvas.getContext("2d");
        // Panel
        ctx.drawImage(g.deskImg, 0, 0, 640, 325, 2, 2, 640, 325);
        ctx.strokeStyle = 'rgba(255,225,176,0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 644, 329);

        g.ctx.drawImage(panelCanvas, 38, 438, 644, 329);
    };

}).apply(GAME);  // Apply this object to the State placeholder we defined
