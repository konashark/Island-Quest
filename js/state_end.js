var END = {};   // Create a placeholder for our new State module

(function() {
    var log  = function(str) { console.log(this.id + ': ' + str);}.bind(this);

    this.id = 'END';
    this.route = 'routeEND';
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

        g.ctx.fillStyle = "#0C0C1C";
        g.ctx.fillRect(0, 0, s.PLAYFIELD_WIDTH, s.PLAYFIELD_HEIGHT);

        g.ctx.strokeStyle = "#239";
        g.ctx.lineWidth = 3;
        g.ctx.strokeRect(0, 0, s.PLAYFIELD_WIDTH, s.PLAYFIELD_HEIGHT);

        g.ctx.font = "bold 48px sans-serif";
        g.ctx.fillStyle = "#fff";
        g.ctx.fillText(this.id, (s.PLAYFIELD_WIDTH / 2) - (g.ctx.measureText(this.id).width / 2), 80);
    };

}).apply(END);  // Apply this object to the State placeholder we defined
