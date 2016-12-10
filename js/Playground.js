function Playground (width, height, numTeams, numPlayers, botRadius) {
    this.canvasBox = document.getElementById('canvas');
    this.canvas = document.getElementById('canvas').getContext("2d");

    this.frozen = false;

    this.showBotStatus = true;
    this.showBotStatusColor = true;
    this.showGridLines =false;
    this.showBotNumbers = false;
    this.teams = [];
    this.bots = [];
    this.numTeams = numTeams;
    this.numPlayers = numPlayers;
    this.botRadius=botRadius;
    this.color={0:'blue', 1:'red', 2:'green', 3:'yellow', 4:'magenta', 5:'black', 6:'blue', 7:'purple',8:'orange', 9:'black'};
    this.names={0:'Cody', 1:'Seve', 2:'Number 2', 3:'Lola', 4:'Pippi', 5:'Junior', 6:'Dot', 7:'Dash', 8:'Teri', 9:'Comma', 10:'Spike', 11:'Nemo', 12:'Marley', 13:'Chessie',14:'Tammie', 15:'Michael', 16:'Josh', 17:'Kevin', 18:'Kyle', 19:'Lindsay', 20:'Bert', 21:'Eileen', 22:'Pamela', 23:'Dave', 24:'Jeff', 25:'Justin',26:'Blair', 27:'Murphy',28:'Wendy', 29:'Maverick', 30:'Stetson', 31:'Jodi', 32:'Jim', 33:'Tom', 34:"Katherine", 35:'Jeremy', 36:'Mark', 37:'Nick', 38:'Mike'};
    this.neighborhoodRadius=10;
    this.gridSize=2*this.botRadius;
    width=parseInt(width);
    height=parseInt(height);
    this.width=width-(width%this.gridSize);
    this.height=height-(height%this.gridSize);
    this.numRows = this.height/this.gridSize;
    this.numCols = this.width/this.gridSize;
    this.framesPerGridStep = this.gridSize;
    this.frameCount = width;
    this.stepsPerSecond = 1;
    this.leaveForMeetingThreshold = 10;//seconds
    this.missedMeetingThreshold = 10;//seconds
    this.meetingCycleLength = 30;
    this.showBotNames = true;
    this.showMeetingConnectors = true;

    this.sprites = {};
    this.spriteImage = new Image();
    this.spriteImage.src = "images/sprites/mario.png";
    this.canvas.drawImage(this.spriteImage,0,0,50,50,0,0,50,50);
}




Playground.prototype.getRandomLocation = function(){
    var randomLocation = new Location();
    randomLocation.xCoord = Math.floor((Math.random()*this.numCols));
    randomLocation.yCoord = Math.floor((Math.random()*this.numRows));
    return randomLocation;
};


Playground.prototype.getRandomTime = function(){
    var foo = new Date; // Generic JS date object
    var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
    //add random time from 1 minute to 3 minutes
    return unixtime_ms + Math.floor((Math.random()*120000) + 60000);
};


Playground.prototype.isGridLocationOutOfBounds = function(gridLocation){
    return !!((gridLocation.xCoord < 0) ||
    (gridLocation.yCoord < 0) ||
    (gridLocation.xCoord > this.numCols - 1) ||
    (gridLocation.yCoord > this.numRows - 1));
};

Playground.prototype.isGridLocationOccupied = function(gridLocation){
    if(this.isGridLocationOutOfBounds(gridLocation)){
        return true;
    }

    for (var i= 0; i<this.bots.length; i++){
        if(locationsAreEqual(this.bots[i].gridPosition,gridLocation)){
            return true;
        }
    }

    return false;
};


Playground.prototype.getNextDoorNeighbors = function(bot){
    return this.getNeighborsWithinRadius(bot, 1);
};

Playground.prototype.getNeighborhood = function(bot){
    return this.getNeighborsWithinRadius(bot, this.neighborhoodRadius);
};


Playground.prototype.getNeighborsWithinRadius = function(bot, radius){
    var botsNearMe = [];

    for (var i= 0; i<this.bots.length; i++){
        if(this.bots[i] != bot){
            if( getNumSteps(bot.gridPosition, this.bots[i].gridPosition) <= (radius) ){
                botsNearMe.push(this.bots[i]);
            }
        }
    }

    return botsNearMe;
};

Playground.prototype.createTeams = function(){
    var botNumber = 1;
    var teamSpacing = Math.floor(this.numRows/(this.numTeams+1));
    var botSpacing = Math.floor((this.numCols/(this.numPlayers+1)));
    for (var i=1; i<=this.numTeams; i++){
        var tempTeam = new Team('Team'+i, new GridLocation( Math.floor(this.numCols/2), teamSpacing * i) , this, this.color[i-1]);
        for (var j=1; j<=this.numPlayers; j++){
            var newGridLocation = new GridLocation(botSpacing * j, tempTeam.base.yCoord);
            var newBot=new Bot( this.radius,newGridLocation, tempTeam, this, botNumber);
            this.bots.push(tempTeam.addBot(newBot));
            botNumber++;
        }
        this.teams.push(tempTeam);
    }
};


Playground.prototype.setup = function(){
    this.createTeams();
    this.clear();
    this.drawGround();
    this.updateSimSettings();
};

Playground.prototype.play = function(){
    this.setup();
};

Playground.prototype.start = function(){
    this.setup();
    this.animate();
};

Playground.prototype.advanceFrame = function(){
    if(this.frameCount > this.framesPerGridStep){
        this.frameCount=1;
        this.frameTranslations = [];
        for (var i= 0; i<this.bots.length; i++){
            var translation = new Translation(this.bots[i].gridPosition, null);
            this.bots[i].tryToMoveBot();
            translation.toGridLocation=this.bots[i].gridPosition;
            this.frameTranslations[this.bots[i].botNumber] = translation;
        }
    }

    for (var j= 0; j<this.bots.length; j++){
        var translation2 = this.frameTranslations[this.bots[j].botNumber];
        this.moveBotForFrame(this.bots[j], translation2, this.frameCount);
    }

    this.frameCount++;
    this.redraw();
};


Playground.prototype.animate = function(){
    var self = this;
    if(!self.frozen){
        //update bot positions for next frame
        self.advanceFrame();
        //draw next frame
        requestAnimationFrame(function(){
            self.animate();
        });
    }
};

Playground.prototype.moveBotForFrame = function(bot, translation, frameNumber){
    var xAddition =0;
    var yAddition =0;

    if(translation.fromGridPosition.xCoord < translation.toGridLocation.xCoord){
        //Right
        xAddition = 1;
    } else if(translation.fromGridPosition.xCoord > translation.toGridLocation.xCoord){
        //Left (decreasing x)
        xAddition = -1;
    }

    if(translation.fromGridPosition.yCoord > translation.toGridLocation.yCoord){
        //Up (decreasing x)
        yAddition = -1;
    } else if(translation.fromGridPosition.yCoord < translation.toGridLocation.yCoord){
        //Down (increasing y)
        yAddition = 1;
    }

    var realPixelLocation = this.convertGridToReal(translation.fromGridPosition);

    realPixelLocation.xCoord = (realPixelLocation.xCoord + (xAddition * frameNumber));
    realPixelLocation.yCoord = (realPixelLocation.yCoord + (yAddition * frameNumber));


    bot.moveBotToPixel(realPixelLocation);
};



Playground.prototype.advance = function(){
    for(var i=0; i<this.framesPerGridStep;i++){
        this.advanceFrame();
    }
};

Playground.prototype.redraw = function(){
    this.clear();
    this.drawGround();
    this.drawBots();
};

Playground.prototype.clear = function(){
    this.canvas.clearRect(0,0,this.width, this.height);
};

Playground.prototype.getSprite = function(botType){
    if(botType == "mario"){
        if(this.sprites["mario"]== null){
            this.sprites["mario"]=new Sprite("images/sprites/mario.png", marioSpriteMap, 5);
            return this.sprites["mario"];
        } else {
            return this.sprites["mario"];
        }
    }
};


Playground.prototype.drawFlippedImage = function(image,srcX,srcY,srcW,srcH,destX,destY,destW,destH, flipImage){
    if(flipImage){
        // save the context's co-ordinate system before
        // we screw with it
        this.canvas.save();

        // move the origin to 50, 35
        this.canvas.translate(destX-(destW*.5), destY-(destH*.5));

        this.canvas.scale(-1,1);
        // then draw the image back and up
        this.canvas.drawImage(image,srcX,srcY,srcW,srcH,destX-(destW*.5),destY-(destH*.5),destW,destH);

        // and restore the co-ordinate system to its default
        // top left origin with no rotation
        this.canvas.restore();
    } else {
        this.canvas.drawImage(image,srcX,srcY,srcW,srcH,destX-(destW*.5),destY-(destH*.5),destW,destH);
    }
};

Playground.prototype.drawSprite = function(bot){
    var sprite = this.getSprite(bot.botType);
    var flip = false;

    if(sprite == null){
        console.log("sprite is null ")
    }

    var framesPerPosition = Math.ceil(this.framesPerGridStep/sprite.spritesPerGridStep);
    var spriteFrame = Math.floor((this.frameCount-1)/framesPerPosition);

    var heading = bot.actualHeading;
    if(heading=="45"){
        heading ="315";
        flip=true;
    } else if(heading=="270"){
        heading ="90";
        flip=true;
    } else if(heading=="135"){
        heading ="225";
        flip=true;
    }

    if(spriteFrame ==3){
        spriteFrame=1;
    } else if(spriteFrame == 4){
        spriteFrame=0;
    }

    //console.log(heading+"_"+spriteFrame);
    try {
        if (typeof sprite.map == "undefined") {
            console.log("sprite.map undefined");
        } else if (typeof sprite.map[heading + "_" + spriteFrame].begin.xCoord == "undefined") {
            console.log("begin.xCoord undefined");
        }
    } catch(ex){
        console.log(ex.message);
    }
    var srcX = sprite.map[heading+"_" +spriteFrame].begin.xCoord;
    var srcY = sprite.map[heading+"_" +spriteFrame].begin.yCoord;
    var srcW = Math.abs(srcX-sprite.map[heading+"_" +spriteFrame].end.xCoord);
    var srcH = Math.abs(srcY-sprite.map[heading+"_" +spriteFrame].end.yCoord);


    this.drawFlippedImage(sprite.image, srcX, srcY, srcW, srcH, destX, destY, destW, destH, flip);

    var destX = bot.pixelPosition.xCoord;
    var destY = bot.pixelPosition.yCoord;
    var destW = this.botRadius;
    var destH = this.botRadius;
    this.canvas.drawImage(sprite.image,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
};

Playground.prototype.drawGround = function(){
    this.canvasBox.setAttribute('height', this.height);
    this.canvasBox.setAttribute('width', this.width);
    this.canvas.beginPath();
    this.canvas.rect(0, 0, this.width, this.height);
    this.canvas.fillStyle = '#FFFFFF';

    this.canvas.fill();
    this.canvas.lineWidth = 0;
    this.canvas.strokeStyle = 'black';
    this.canvas.stroke();

    if(this.showGridLines){
        for(var i =1; i<this.numCols; i++){
            var y = (this.height/this.numRows)*i;
            //draw horizontal
            this.canvas.beginPath();
            this.canvas.lineWidth = 1;
            this.canvas.moveTo(0,y);
            this.canvas.lineTo(this.width,y);
            this.canvas.stroke();
        }

        for(var j =1; j<this.numRows; j++){
            var x = (this.width/this.numCols)*j;
            //draw vertical
            this.canvas.beginPath();
            this.canvas.moveTo(x,0);
            this.canvas.lineTo(x,this.height);
            this.canvas.stroke();
        }
    }
};


Playground.prototype.drawBot = function(bot){
    if(!bot){
        return false;
    }

    var drawLocation = bot.pixelPosition;
    var fillStyle=bot.team.color;

    var statusText;
    if(bot.inMeeting){
        statusText = "IN A MEETING DND -  " + bot.meetingCycleCount;
        var statusFillStyle = "red";
    } else if(bot.waitingForMeeting){
        statusText = "WAITING - " + bot.timeToNextMeeting() + " s";
        var statusFillStyle = "orange";
    } else if(bot.onWayToMeeting){
        statusText = "ON MY WAY " + bot.timeToNextMeeting() + " s";
        var statusFillStyle = "yellow";
    } else{
        statusText = "WALKIN AROUND GETTIN INVOLVED - " + bot.timeToNextMeeting() + " s";
        var statusFillStyle = "green";
    }

    if(this.showBotStatus){
        this.canvas.font = "8px sans-serif";
        this.canvas.fillStyle = "black";
        this.canvas.fillText(statusText, drawLocation.xCoord, (drawLocation.yCoord-(2*this.botRadius)));
    }

    if(this.showBotStatusColor){
        fillStyle = statusFillStyle;
    }

    if(this.showBotNames){
        this.canvas.font = "7px sans-serif";
        this.canvas.fillStyle = "black";
        this.canvas.fillText(this.names[(bot.botNumber-1)%38], drawLocation.xCoord, (drawLocation.yCoord+this.botRadius));
    }

    if(this.showMeetingConnectors){
        if(bot.nextMeeting()){
            var toBot = bot.nextMeeting().otherBot;
            this.canvas.beginPath();
            this.canvas.moveTo(drawLocation.xCoord, drawLocation.yCoord);
            this.canvas.lineTo(toBot.pixelPosition.xCoord,toBot.pixelPosition.yCoord);
            this.canvas.stroke();
        }
    }

    if(this.showBotNumbers){
        this.canvas.font = "7px sans-serif";
        this.canvas.fillStyle="black";
        this.canvas.fillText(bot.botNumber, drawLocation.xCoord-2, drawLocation.yCoord+2);
    }

    if(bot.botType=="circleBot"){
        this.canvas.beginPath();
        this.canvas.arc(drawLocation.xCoord, drawLocation.yCoord, this.botRadius, 0 , 2 * Math.PI, false);
        this.canvas.fillStyle = fillStyle;
        this.canvas.fill();
        this.canvas.lineWidth = 1;
        this.canvas.strokeStyle = bot.team.color;
        this.canvas.stroke();
    } else{
        this.drawSprite(bot);
    }
};

Playground.prototype.drawBots = function(){
    for (var i= 0; i<this.bots.length; i++){
        this.drawBot(this.bots[i]);
    }
};

Playground.prototype.convertGridToReal = function(gridLocation){
    var location = new PixelLocation();
    location.xCoord = gridLocation.xCoord*this.gridSize + (this.gridSize/2);
    location.yCoord = gridLocation.yCoord*this.gridSize + (this.gridSize/2);

    return location;
};

Playground.prototype.updateSimSettings = function(){
    if($('#cbShowBotStatus').is(':checked')){
        this.showBotStatus = true;
    } else{
        this.showBotStatus = false;
    }

    this.showBotStatusColor = $('#cbShowBotStatusColors').is(':checked');

    if($('#cbShowBotNumbers').is(':checked')){
        this.showBotNumbers=true;
    } else{
        this.showBotNumbers=false;
    }

    if($('#cbShowGridlines').is(':checked')){
        this.showGridLines=true;
    } else{
        this.showGridLines=false;
    }

    this.showMeetingConnectors = $('#cbShowMeetingConnectors').is(':checked');
    this.showBotNames = $('#cbShowBotNames').is(':checked');
    this.leaveForMeetingThreshold=parseInt($('#tExtraTravelTime').val());
    this.missedMeetingThreshold=parseInt($('#tMeetWaitTime').val());
    this.meetingCycleLength=parseInt($('#tMeetingLength').val());

    this.showGridLines = $('#cbShowGridlines').is(':checked');
};
