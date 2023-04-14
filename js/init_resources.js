/*************************************************/
function loadResources(callback) {
    var numToLoad = 31;
    var frame, i;

    var isLoadComplete = function() {
        console.log("Images to load: " + numToLoad);
        if (--numToLoad == 0) {
            callback();
        }
    };

    // Load all the images we will make screens or sprites out of
    g.parchmentImg  = jgl.newImage('resources/images/parchment.png', isLoadComplete);
    g.mapImg        = jgl.newImage('resources/images/map.png', isLoadComplete);
    g.islandMapImg  = jgl.newImage('resources/images/islandmap.png', function(img) {
        g.islandMapCanvas = jgl.convertImageToCanvas(img);
        g.islandMapCtx    = g.islandMapCanvas.getContext("2d");
        isLoadComplete();
    });

    g.woodImg   = jgl.newImage('resources/images/wood.png', isLoadComplete);
    g.frameImg  = jgl.newImage('resources/images/frame.png', isLoadComplete);
    g.deskImg   = jgl.newImage('resources/images/desktop.jpg', isLoadComplete);
    g.titleImg  = jgl.newImage('resources/images/islandquest.png', isLoadComplete);

    // Tiles
    g.seaTile    = jgl.newImage('resources/images/tiles/sea-128.jpg', isLoadComplete);
    g.meadowTile = jgl.newImage('resources/images/tiles/meadow-128.jpg', isLoadComplete);
    g.forestTile = jgl.newImage('resources/images/tiles/forest 2-128.jpg', isLoadComplete);
    g.swampTile  = jgl.newImage('resources/images/tiles/swamp-128.jpg', isLoadComplete);
    g.mountainTile = jgl.newImage('resources/images/tiles/mountain pass-128.jpg', isLoadComplete);
    g.beachTile  = jgl.newImage('resources/images/tiles/beach-128.jpg', isLoadComplete);
    g.desertTile = jgl.newImage('resources/images/tiles/desert-128.jpg', isLoadComplete);
    g.riverTile  = jgl.newImage('resources/images/tiles/river 2-128.jpg', isLoadComplete);
    g.lakeTile   = jgl.newImage('resources/images/tiles/sea-128.jpg', isLoadComplete);
    g.snowTile   = jgl.newImage('resources/images/tiles/snowy mountain pass-128.jpg', isLoadComplete);
    g.townTile   = jgl.newImage('resources/images/tiles/town-128.jpg', isLoadComplete);
    g.coastalTownTile = jgl.newImage('resources/images/tiles/coastal town-128.jpg', isLoadComplete);


    // Environments
    g.terrain[0].img = jgl.newImage('resources/images/terrain/sea.jpg', isLoadComplete);
    g.terrain[1].img = jgl.newImage('resources/images/terrain/meadow.jpg', isLoadComplete);
    g.terrain[2].img = jgl.newImage('resources/images/terrain/forest.jpg', isLoadComplete);
    g.terrain[3].img = jgl.newImage('resources/images/terrain/swamp.jpg', isLoadComplete);
    g.terrain[4].img = jgl.newImage('resources/images/terrain/mountain pass.jpg', isLoadComplete);
    g.terrain[5].img = jgl.newImage('resources/images/terrain/beach on right.jpg', isLoadComplete);
    g.terrain[6].img = jgl.newImage('resources/images/terrain/desert.jpg', isLoadComplete);
    g.terrain[7].img = jgl.newImage('resources/images/terrain/river.jpg', isLoadComplete);
    g.terrain[8].img = jgl.newImage('resources/images/terrain/river.jpg', isLoadComplete);   // TODO: Need LAKE image
    g.terrain[9].img = jgl.newImage('resources/images/terrain/snowy pass.jpg', isLoadComplete);
    g.terrain[10].img = jgl.newImage('resources/images/terrain/town.jpg', isLoadComplete);
    g.terrain[11].img = jgl.newImage('resources/images/terrain/coastal town.jpg', isLoadComplete);
}

//*********************************************************
function getPixelRgb(pixelData, x) {
    var red = ("00" + pixelData[x*4 + 0].toString(16)).slice(-2);
    var green = ("00" + pixelData[x*4 + 1].toString(16)).slice(-2);
    var blue = ("00" + pixelData[x*4 + 2].toString(16)).slice(-2);
    //var alpha = ("00" + pixelData[x*4 + 3].toString(16)).slice(-2);
    return(red+green+blue);
}

//*********************************************************
function createMap(){

    // Note: The two versions of the parchment map are loaded as backgrounds in the .css file

    // Note: If you need to access the pixel data of an image, you can't just load it as you normally would. This
    // results in nasty CORS "cross-domain tainted" issues. Instead we'll just load a pre-encoded Base64 version of the img.
    g.mapDataImage = new Image();
    g.mapDataImage.src="data:image/png;base64,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b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDQtMThUMTU6MTc6NDYtMDc6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDQtMjBUMjA6NDU6MDYtMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTA0LTIwVDIwOjQ1OjA2LTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNDNlM2M1OS1kODE3LTRjY2EtYjE2Ni0xNWIwZjcyMTVkNTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjNhOGFlM2MtZTlhNi00N2E0LTgxNWYtMWZmM2U0M2QzYjk3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjNhOGFlM2MtZTlhNi00N2E0LTgxNWYtMWZmM2U0M2QzYjk3IiBwaG90b3Nob3A6Q29sb3JNb2RlPSIyIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iRGlzcGxheSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjNhOGFlM2MtZTlhNi00N2E0LTgxNWYtMWZmM2U0M2QzYjk3IiBzdEV2dDp3aGVuPSIyMDE4LTA0LTE4VDE1OjE3OjQ2LTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjNjYWQ3Y2YtMGQ0MS00MjYyLWI1NzEtYjBhYmNmMDA2NTI1IiBzdEV2dDp3aGVuPSIyMDE4LTA0LTE4VDE1OjIxOjA4LTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0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";
    g.mapDataCanvas = jgl.convertImageToCanvas(g.mapDataImage);
    g.mapDataContext = g.mapDataCanvas.getContext('2d');

    console.log("Creating new map...");
    g.map = jgl.newTileMapCanvas({ context: g.mapContext, x:0, y:0, w:640, h:640 });

    console.log("Creating tiles...");
    g.map.setDefaultTile({ img: g.seaTile, x:0, y:0, w:128, h:128 });

    g.map.newTile({ index:0, img: g.seaTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:1, img: g.meadowTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:2, img: g.forestTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:3, img: g.swampTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:4, img: g.mountainTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:5, img: g.beachTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:6, img: g.desertTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:7, img: g.riverTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:8, img: g.lakeTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:9, img: g.snowTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:10, img: g.townTile, x:0, y:0, w:128, h:128 });
    g.map.newTile({ index:11, img: g.coastalTownTile, x:0, y:0, w:128, h:128 });

    // Generate map

    var mapData = [];
    for (var row = 0; row < 320; row++) {
        var pixelData = g.mapDataContext.getImageData(0, row, 500, 1).data;
        var rowData = [];
        for (var col = 0; col < 500; col++) {
            ///rowData[col] = Math.round(Math.random());

            var pixel = getPixelRgb(pixelData, col);
            //console.log(pixel);
            switch (pixel) {
                case '00326a':
                    //console.log('SEA');
                    rowData[col] = 0;
                    break;
                case '8acf94':
                    //console.log('MEADOW');
                    rowData[col] = 1;
                    break;
                case '009d61':
                    //console.log('FOREST');
                    rowData[col] = 2;
                    break;
                case 'ff9396':
                    //console.log('SWAMP');
                    rowData[col] = 3;
                    break;
                case 'cccccc':
                    //console.log('MOUNTAIN');
                    rowData[col] = 4;
                    break;
                case 'ffca91':
                    //console.log('SHORE');
                    rowData[col] = 5;
                    break;
                case 'feff00':
                    //console.log('DESERT');
                    rowData[col] = 6;
                    break;
                case '009bd1':
                    //console.log('RIVER');
                    rowData[col] = 7;
                    break;
                case '0099ff':
                    //console.log('LAKE');
                    rowData[col] = 8;
                    break;
                case 'ffffff':
                    //console.log('SNOW');
                    rowData[col] = 9;
                    break;
                default:
                    console.log('??? - '+pixel);
            }

        }
        mapData.push(rowData);
    }

    // Place any extra objects that arem't in the physical map data
    // Add harbor town
    mapData[164][146] = 11;

    g.map.attachMap({ numColumns: 500, numRows: 320, tileWidth: 128, tileHeight: 128, mapData: mapData });
//     g.map.setPositionOffset(224-32, 160-32); // center of map is positioning hot spot
    g.map.setPositionOffset(256 + 64, 256 + 64); // center of map is positioning hot spot
}