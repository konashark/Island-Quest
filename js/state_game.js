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
    var MAP_ACTIVE  = false;

    var tileMapCanvas = undefined;
    var mapCanvas = undefined;
    var panelCanvas = undefined;
    var environmentCanvas = undefined;

    var terrainIndex = 1;

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
        var consumed = false;
        var key = event.key;
        var keyCode = event.keyCode;
                
        //console.log("Event: " + keyCode);

        switch (keyCode) {
            case jgl.KEYS.M: {
                MAP_ACTIVE = !MAP_ACTIVE;
                consumed = true;
                this.redraw();
            }
            break;

            case jgl.KEYS.RIGHT: {
                scrollMap(2,0,64);
                consumed = true;
                this.redraw();
            }
            break;

            case jgl.KEYS.LEFT: {
                scrollMap(-2,0,64);
                consumed = true;
                this.redraw();
            }
            break;

            case jgl.KEYS.UP: {
                scrollMap(0,-2,64);
                consumed = true;
                this.redraw();
            }
            break;

            case jgl.KEYS.DOWN: {
                scrollMap(0,2,64);
                consumed = true;
                this.redraw();
            }
        }

        return consumed;
    }.bind(this);

    // ********************************************
    this.init = function() {
        log('Initializing ' + this.id);
        INITED = true;

        tileMapCanvas = document.createElement("canvas");
        tileMapCanvas.width = 642;
        tileMapCanvas.height = 386 + 256;

        mapCanvas = document.createElement("canvas");
        mapCanvas.width = 500;
        mapCanvas.height = 320;

        panelCanvas = document.createElement("canvas");
        panelCanvas.width = 524;
        panelCanvas.height = 305;

        environmentCanvas = document.createElement("canvas");
        environmentCanvas.width = 540;
        environmentCanvas.height = 424;
    };

    // ********************************************
    this.redraw = function() {

        if (g.state == s.RUNNING) {

            // Draw background
            g.ctx.drawImage(g.woodImg, 0, 0, 1000, 610, 0, 0, s.PLAYFIELD_WIDTH - 0, s.PLAYFIELD_HEIGHT - 0);

            drawEnvironment();
            drawTileMap(); 
            drawPanel();

            // Draw title
            g.ctx.drawImage(g.titleImg, 0, 0, 640, 100, 14, 0, 640, 100);
            drawMap();
        }
    };

    //***********************************************
    function scrollMap(xd, yd, frames) {
        var numFrames = frames;
        function animLoop(){
            if (frames > 0){
                frames--;
                g.y += yd;
                g.x += xd;
                drawTileMap();
                if (frames == parseInt(numFrames / 2)) {
                    drawEnvironment();
                }
                requestAnimFrame(animLoop);
            } else {
                //exposeMap();
            }
        }
        animLoop();
    }

    // ********************************************
    drawTileMap = function() {
        var tileMapCtx = tileMapCanvas.getContext("2d");

        g.map.tileMap.context = tileMapCtx;
        //console.log("MAP AT "+g.x+","+g.y);
        g.map.drawMap(g.x, g.y);

        tileMapCtx.fillStyle = "#DD8800";
        tileMapCtx.fillRect(256 + 54, 256 + 54, 20, 20);
        tileMapCtx.strokeStyle = "#FFFFFF";
        tileMapCtx.strokeRect(256 + 54, 256 + 54, 20, 20);

        tileMapCtx.strokeStyle = "#fc8";
        tileMapCtx.strokeStyle = 'rgba(255,225,176,0.5)';
        tileMapCtx.lineWidth = 2;
        tileMapCtx.strokeRect(0, 0, 128*5 + 2, 128*5 + 2);

        g.ctx.drawImage(tileMapCanvas, 42, 110, 128*5 + 2, 128*5 + 2);
    };

    // ********************************************
    drawEnvironment = function() {
         var ctx = environmentCanvas.getContext("2d");

        var tileIndex = g.map.tileAt(g.x, g.y);
        console.log("TILE: "+tileIndex);
        console.log("TERRAIN: "+g.terrain[tileIndex].type);
        if (tileIndex >= 0) {
            // Draw environment image
            ctx.drawImage(g.terrain[tileIndex].img, 0, 0, 1024, 725, 40, 35, 450, 330);
        }

        ctx.drawImage(g.frameImg, 0, 0, 476, 352, 0, 0, 540, 424);

        g.ctx.drawImage(environmentCanvas, 714, 10, 540, 424);
    };

    // ********************************************
    drawMap = function() {
        // Draw map
        if (!MAP_ACTIVE) 
            return;

        var ctx = mapCanvas.getContext("2d");
        ctx.drawImage(g.mapImg, 0, 0);

        // Draw crosshairs
        ctx.strokeStyle = "#C20";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(g.xTile, g.yTile - 10);
        ctx.lineTo(g.xTile, g.yTile - 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(g.xTile - 10, g.yTile);
        ctx.lineTo(g.xTile - 2, g.yTile);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(g.xTile, g.yTile + 2);
        ctx.lineTo(g.xTile, g.yTile + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(g.xTile + 2, g.yTile);
        ctx.lineTo(g.xTile + 10, g.yTile);
        ctx.stroke();

        // Draw frame
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#fc8";
        ctx.strokeStyle = 'rgba(255,225,176,0.5)';
        ctx.strokeRect(0, 0, 500, 320);

        g.ctx.drawImage(mapCanvas, 0, 0, 500, 320, 140, 80, 1000, 640);
     };

    // ********************************************
    drawPanel = function() {
        var ctx = panelCanvas.getContext("2d");
        // Panel
        ctx.drawImage(g.deskImg, 0, 0);
        ctx.strokeStyle = 'rgba(255,225,176,0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 524, 305);

        g.ctx.drawImage(panelCanvas, 718, 448);
    };
}).apply(GAME);  // Apply this object to the State placeholder we defined
