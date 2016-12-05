
function distance(location1,location2) {
    if(location1==location2){
        return 0;
    }
    //console.log("location1:"+location1.xCoord + "," + location1.yCoord + " location2:" + location2.xCoord + " " + location2.yCoord);
    //console.log("xCoords diff="+(location1.xCoord - location2.xCoord));
    //console.log("yCoords diff="+(location1.yCoord - location2.yCoord));
    //console.log("xCoords diff squared="+ (Math.pow( (location1.xCoord - location2.xCoord) ,2)));
    //console.log("yCoords diff squared="+ (Math.pow( (location1.yCoord - location2.yCoord),2)));
    var distance = Math.sqrt( (Math.pow( (location1.xCoord - location2.xCoord) ,2) ) + (Math.pow( (location1.yCoord - location2.yCoord),2)));

    if (distance==undefined){
        //console.log("distance calculated to be 0");
        return 0;
    }
    else if(isNaN(distance)){
        //console.log("distance calculated to be=0");
        return 0;
    }
    else{
        if(distance < 20)   {

            //console.log("location1:"+location1.xCoord + "," + location1.yCoord + " location2:" + location2.xCoord + " " + location2.yCoord);

            //console.log("distance calculated to be " + distance);

        }
        return distance;
    }

}

function getRandomHeading(){



    return Math.floor((Math.random()*359));


}

function getSurroundingCells(gridPosition){

    var surroundingCells = new Array();

    for(var i=-1; i<=1; i++){

        for(var j=-1; j<=1; j++){
            if(!(j==0 && i==0)){
                var gridLocation = new GridLocation(gridPosition.xCoord+i, gridPosition.yCoord+j);
                surroundingCells.push(gridLocation);
            }

        }


    }
    return surroundingCells;
}

function getNumSteps(fromGridPosition, toGridLocation){

    var numXSteps = Math.abs(fromGridPosition.xCoord - toGridLocation.xCoord);
    var numYSteps = Math.abs(fromGridPosition.yCoord - toGridLocation.yCoord);

    if(numXSteps > numYSteps)
        return numXSteps;
    else
        return numYSteps;




}

function locationsAreEqual(location1, location2){


    return ( (location1.xCoord == location2.xCoord)
            &&  (location1.yCoord == location2.yCoord) );

}

function diffTime(time1, time2){

    var diff = time2 - time1;

    // diff contains the time difference in milliseconds

    // so for seconds...
    return( diff / 1000 );





}

function sortTimeAscending(a,b) {
      if (a.time < b.time)
         return -1;
      if (a.time > b.time)
        return 1;
      return 0;
    }


function getNow(){


    var foo = new Date; // Generic JS date object
    return foo.getTime(); // Returns milliseconds since the epoch

}

function Translation(fromGridPosition, toGridLocation){
    this.fromGridPosition = new GridLocation(fromGridPosition.xCoord,fromGridPosition.yCoord);
    if(toGridLocation == null)
        this.toGridLocation= new GridLocation();
    else
        this.toGridPosition = new GridLocation(toGridLocation.xCoord,toGridLocation.yCoord);

}

function Location (xCoord,yCoord) {
    this.xCoord=xCoord;
    this.yCoord=yCoord;

}
function PixelLocation (xCoord,yCoord) {
    this.xCoord=xCoord;
    this.yCoord=yCoord;

}

function GridLocation (xCoord,yCoord){
    this.xCoord=xCoord;
    this.yCoord=yCoord;



}


function Meeting (gridLocation, bot, time) {
    this.gridLocation=gridLocation;
    this.bot=bot;
    this.time=time;
    this.comments="";
}
var marioSpriteMap={};
marioSpriteMap['0_0']={

        begin: {
            xCoord: 2,
            yCoord: 240
        },
        end: {
            xCoord: 39,
            yCoord: 294
        }
};
marioSpriteMap['0_1']={

        begin: {
            xCoord: 39,
            yCoord: 240
        },
        end: {
            xCoord: 79,
            yCoord: 294
        }
};

marioSpriteMap['0_2']={

        begin: {
            xCoord: 79,
            yCoord: 240
        },
        end: {
            xCoord: 120,
            yCoord: 294
        }
};
marioSpriteMap['315_0']={

        begin: {
            xCoord: 2,
            yCoord: 181
        },
        end: {
            xCoord: 39,
            yCoord: 240
        }
};
marioSpriteMap['315_1']={

        begin: {
            xCoord: 39,
            yCoord: 181
        },
        end: {
            xCoord: 79,
            yCoord: 240
        }
};

marioSpriteMap['315_2']={

        begin: {
            xCoord: 79,
            yCoord: 181
        },
        end: {
            xCoord: 120,
            yCoord: 240
        }
};


marioSpriteMap['90_0']={

        begin: {
            xCoord: 2,
            yCoord: 123
        },
        end: {
            xCoord: 39,
            yCoord: 181
        }
};
marioSpriteMap['90_1']={

        begin: {
            xCoord: 39,
            yCoord: 123
        },
        end: {
            xCoord: 79,
            yCoord: 181
        }
};

marioSpriteMap['90_2']={

        begin: {
            xCoord: 79,
            yCoord: 123
        },
        end: {
            xCoord: 120,
            yCoord: 181
        }
};

marioSpriteMap['225_0']={

        begin: {
            xCoord: 2,
            yCoord: 65
        },
        end: {
            xCoord: 39,
            yCoord: 123
        }
};
marioSpriteMap['225_1']={

        begin: {
            xCoord: 39,
            yCoord: 65
        },
        end: {
            xCoord: 79,
            yCoord: 123
        }
};

marioSpriteMap['225_2']={

        begin: {
            xCoord: 79,
            yCoord: 65
        },
        end: {
            xCoord: 120,
            yCoord: 123
        }
};


marioSpriteMap['180_0']={

        begin: {
            xCoord: 2,
            yCoord: 14
        },
        end: {
            xCoord: 39,
            yCoord: 65
        }
};
marioSpriteMap['180_1']={

        begin: {
            xCoord: 39,
            yCoord: 14
        },
        end: {
            xCoord: 79,
            yCoord: 65
        }
};

marioSpriteMap['180_2']={

        begin: {
            xCoord: 79,
            yCoord: 14
        },
        end: {
            xCoord: 120,
            yCoord: 65
        }
};




function Sprite (imagePath,spriteMap,spritesPerGridStep){
    this.image = new Image();
    this.image.src = imagePath;
    this.map = spriteMap;
    this.spritesPerGridStep = spritesPerGridStep;
    console.log(this.image.src);


}

function Team (name, base, playground,color) {
    this.name=name;
    this.bots=new Array();
    this.base=base;
    this.playground = playground;
    this.color=color;
    //console.log("new team created, home base:(" + this.base.xCoord + "," + this.base.yCoord + ")");
}

Team.prototype.addBot = function(bot){

    this.bots.push(bot);
    //console.log(this.name + " now has " + this.bots.length + ' bots');
    return bot;
};
Team.prototype.removeBot = function(){ };


/******************************************************/
function Bot (radius, gridPosition, team, playground, botNumber) {
    //this.botType='circleBot';
    this.botType = "mario";

    this.gridPosition = gridPosition;
    this.pixelPosition = playground.convertGridToReal(gridPosition);
    this.meetings = new Array();
    this.persuasiveLevel;
    this.badBots = new Array();
    this.team=team;
    this.playground=playground;
    this.radius= radius;
    this.currentDirection = getRandomHeading();
    this.botNumber = botNumber;
    this.onWayToMeeting = false;
    this.missedMeetings = new Array();
    this.waitingForMeeting = false;
    this.oldMeetings = new Array();
    this.inMeeting=false;
    this.meetingCycleCount=0;

    //console.log("new bot created at location:(" + this.gridPosition.xCoord + "," + this.gridPosition.yCoord + ") for team " + this.team.name);
}

Bot.prototype.nextMeeting = function() {
    if(this.meetings){
        return this.meetings[0];
    }
    else
        return null;
};

Bot.prototype.sortMeetings = function(){

    this.meetings.sort(sortTimeAscending);

}

Bot.prototype.moveBotTo = function(nextStep){
    if(!nextStep)
        return false;
    this.gridPosition.xCoord = nextStep.xCoord;
    this.gridPosition.yCoord = nextStep.yCoord;
    return true;
};

Bot.prototype.moveBotToPixel = function(nextPixel){
    if(!nextPixel)
        return false;
    this.pixelPosition.xCoord = nextPixel.xCoord;
    this.pixelPosition.yCoord = nextPixel.yCoord;
    return true;
};


Bot.prototype.getSurroundingCells = function(){
    return getSurroundingCells(this.gridPosition);
};//end function


Bot.prototype.hasNextMeetingPassed = function(){

if(!this.nextMeeting())
    return false;

    return this.hasMeetingPassed(this.nextMeeting());



};

Bot.prototype.hasMeetingPassed = function(meeting){
    if(!meeting)
        return false;

    return (diffTime(meeting.time+this.playground.missedMeetingThreshold, getNow()) > 0);



};

Bot.prototype.shouldLeaveForNextMeeting = function(){

    return (this.tripTimeToNextMeeting() > (this.timeToNextMeeting()-this.playground.leaveForMeetingThreshold) );


};

Bot.prototype.clearMissedMeetings = function(){

    for (var i = 0; i<this.meetings.length; i++){
        if(this.hasMeetingPassed(this.meetings[i])){
            this.oldMeetings.push(this.meetings.splice(i));
            i=0;


        }



    }


};


Bot.prototype.isMyNextMeetingHere = function(){

    return this.isMyMeetingHere(this.nextMeeting());
};//end function Bot::isMyNextMeetingHere()

Bot.prototype.isMyMeetingHere = function(meeting){
if(!meeting)
    return false;
    var neighbors = this.playground.getNextDoorNeighbors(this);

    if(neighbors){

        for(var i = 0; i<neighbors.length; i++){

            if( neighbors[i].botNumber == meeting.bot){
                return neighbors[i];
            }//end if
        }//end for

    }//end if neighbors


};//end function Bot::isMyMeetingHere()

Bot.prototype.meet = function() {
    this.inMeeting = true;

    if(this.meetingCycleCount > this.playground.meetingCycleLength){
        this.oldMeetings.push(this.meetings.pop());
        this.clearMissedMeetings();
        this.inMeeting=false;
        this.onWayToMeeting=false;
        this.waitingForMeeting =false;
        this.meetingCycleCount=0;
    }
    else
        this.meetingCycleCount++;
};



Bot.prototype.tryToMoveBot = function(){
    //console.log("Trying to move bot " + this.botNumber);
    //check for neighbors
    var neighbors = this.playground.getNextDoorNeighbors(this);
    //if we have neighbors
    if(neighbors != false){
    //  console.log("   I have no next door neighbors");

        //loop through neighbors
        for(var i = 0; i<neighbors.length; i++){
            //lets schedule a meeting
            this.scheduleMeet(neighbors[i]);


        }

    }
    //get possible moves
    var possibleSteps = this.getPossibleSteps();
    if(this.isInCorner()){

        this.currentDirection = (this.currentDirection+180)%360;
    //  console.log("   No body puts baby in the corner");
    //  console.log("    Direction is now " + this.currentDirection);

    }
    else if(this.isUpAgainstWall() && this.isHeadingTowardsWall()){
    //  console.log("   I'm up against a wall")
    //  console.log("    Direction was " + this.currentDirection);
        this.currentDirection = (this.currentDirection+180)%360;
    //  console.log("    Direction is now " + this.currentDirection);
    }

    if(this.inMeeting){
        this.meet();

    }

    //if we are at the spot waiting for the meeting
    else if(this.waitingForMeeting){
        //In here we either wait for meeting to pass or other bot to show up

    //  console.log("   I'm waiting for a meeting");
        if(this.hasNextMeetingPassed() ){
            this.waitingForMeeting=false;
            this.onWayToMeeting = false;
            this.clearMissedMeetings();
        }//end if otherbot was a no show
        var bot = this.isMyNextMeetingHere();
        if(bot){
            bot.waitingForMeeting=true;
            this.meet();
        }//end if my meeting is here




    }

    else if(this.onWayToMeeting){
        //console.log("   I'm on my way to a meeting");

        //if we missed our meeting
        if( this.hasNextMeetingPassed()){
            //console.log("      I missed my meeting");
            this.clearMissedMeetings();
            this.waitingForMeeting=false;
            this.onWayToMeeting=false;
            this.inMeeting=false;
            //this.tryToMoveBot();


        }

        //else we are still on time
        else{
            //("      We're still on time");
            if(this.nextMeeting())
            this.currentDirection = this.calculateHeadingToGridLocation(this.nextMeeting().gridLocation);
            //console.log("         My current heading is " + this.currentDirection);
            if( locationsAreEqual(this.gridPosition,this.nextMeeting().gridLocation)){
                this.waitingForMeeting=true;
                var bot = this.isMyNextMeetingHere();
                if(bot){

                    bot.waitingForMeeting=true;
                    bot.inMeeting=true;
                    this.meet();
                }//end if my meeting is here
            }

        }//end else still on time

        var nextStep = this.calculateNextStepFromHeading(possibleSteps);
        //var nextStep = possibleSteps[0];
        this.moveBotTo(nextStep);

    }//end else if on way to meeting

    //else we are not yet on our way to a meeting
    else {
        //console.log("   I'm still a free agent");





        //check to see if we have any meetings approaching
        //if we maybe have to goto a meeting
        if(this.nextMeeting()){
            //console.log("time to next meeting: " + this.timeToNextMeeting() + " seconds????");
            //console.log("distance to next meeting " + this.distanceToNextMeeting() + " in number of steps.")
            var meeting = this.nextMeeting();
            //console.log("heading to next meeting calculated to be " + this.calculateHeadingToGridLocation(this.nextMeeting().gridLocation));
            var distance = this.distanceToNextMeeting();
            if( this.shouldLeaveForNextMeeting()){
    //          console.log("   need to leave time to get to next meeting=" + this.tripTimeToNextMeeting() + " and next meeting starts in " + (this.timeToNextMeeting()-this.playground.leaveForMeetingThreshold) + "actual=" + this.timeToNextMeeting());
                this.currentDirection = this.calculateHeadingToGridLocation(this.nextMeeting().gridLocation);
                this.onWayToMeeting=true;

            }
            else{
                //console.log("   apparently we have some time, time to next meeting=" + this.tripTimeToNextMeeting() + " adn next meeting starts in " + (this.timeToNextMeeting()-this.playground.leaveForMeetingThreshold));
            }
        }//end if I have a next Meeting




        var neighborhood = this.playground.getNeighborhood(this);

        //continue on our current heading as close as possible
        //console.log("   My current heading is " + this.currentDirection);


        var nextStep = this.calculateNextStepFromHeading(possibleSteps);
        //var nextStep = possibleSteps[0];
        this.moveBotTo(nextStep);
        //else we are free to roam around

    }//else if not on way to a meeting


};//end function Bot::move



Bot.prototype.getPossibleSteps = function(){
    var surroundingCells = this.getSurroundingCells();
    //console.log("calculated " + surroundingCells.length + " surrounding cells");
    var possibleSteps = new Array();
    for(var i=0; i<surroundingCells.length; i++){

        if(!this.playground.isGridLocationOccupied(surroundingCells[i]))
            possibleSteps.push(surroundingCells[i]);


    }
    if(possibleSteps.length <= 0)
        return false;
    else
        return possibleSteps;
};


Bot.prototype.isUpAgainstWall = function(){
    if(this.gridPosition.xCoord==0
            || this.gridPosition.yCoord==0
            || this.gridPosition.xCoord>=(this.playground.numCols-1)
            || this.gridPosition.yCoord>=(this.playground.numRows-1))
        return true;
    else
        return false;
};

Bot.prototype.isHeadingTowardsWall = function(){
    if(this.gridPosition.xCoord==0 && this.currentDirection>180){return true;}
    else if(this.gridPosition.yCoord==0 && (this.currentDirection<90 || this.currentDirection >225)){return true;}
    else if(this.gridPosition.xCoord>=(this.playground.numCols-1) && this.currentDirection<180){return true;}
    else if(this.gridPosition.yCoord>=(this.playground.numRows-1) && (this.currentDirection>90 && this.currentDirection <225)){return true;}
    else return false;
};

Bot.prototype.isInCorner = function(){
    var yes =0;
    if(this.gridPosition.xCoord==0)
        yes++;
    if(this.gridPosition.yCoord==0)
        yes++;

    if(this.gridPosition.xCoord>=this.playground.numCols-1)
        yes++;
    if(this.gridPosition.yCoord>=this.playground.numRows-1)
        yes++;
    if (yes>=2)
        return true;
    else
        return false;
};



Bot.prototype.calculateHeadingToGridLocation = function(gridLocation){
    if(!gridLocation)
        alert("gridLocation is null");
    /*
    var heading = Math.atan((possibleStep.xCoord-this.gridPosition.xCoord)/(possibleStep.yCoord-this.gridPosition.yCoord));
    heading = heading*(180/Math.PI);
    if (heading < 0)
        heading=heading+360;

    //console.log("Calculated heading is " + heading + " for step (" + possibleStep.xCoord + "," + possibleStep.yCoord + ")");
    return heading;
     */

    var diffX = gridLocation.xCoord-this.gridPosition.xCoord;
    var diffY = gridLocation.yCoord-this.gridPosition.yCoord;

    if(diffX==0 && diffY==-1)
        return 0;
    else if(diffX>=1 && diffY<=-1)
        return 45;
    else if(diffX>=1 && diffY==0)
        return 90;
    else if(diffX>=1 && diffY>=1)
        return 135;
    else if(diffX==0 && diffY>=1)
        return 180;
    else if(diffX<=-1 && diffY>=1)
        return 225;
    else if(diffX<=-1 && diffY==0)
        return 270;
    else if(diffX<=-1 && diffY<=-1)
        return 315;
    else
        return 0;


};



Bot.prototype.calculateHeadingOfPossibleStep = function(possibleStep){
    if(!possibleStep)
        alert("possible step is null");
        /*
    var heading = Math.atan((possibleStep.xCoord-this.gridPosition.xCoord)/(possibleStep.yCoord-this.gridPosition.yCoord));
    heading = heading*(180/Math.PI);
    if (heading < 0)
        heading=heading+360;

    //console.log("Calculated heading is " + heading + " for step (" + possibleStep.xCoord + "," + possibleStep.yCoord + ")");
    return heading;
     */

    var diffX = possibleStep.xCoord-this.gridPosition.xCoord;
    var diffY = possibleStep.yCoord-this.gridPosition.yCoord;

    if(diffX==0 && diffY==-1)
        return 0;
    else if(diffX==1 && diffY==-1)
        return 45;
    else if(diffX==1 && diffY==0)
        return 90;
    else if(diffX==1 && diffY==1)
        return 135;
    else if(diffX==0 && diffY==1)
        return 180;
    else if(diffX==-1 && diffY==1)
        return 225;
    else if(diffX==-1 && diffY==0)
        return 270;
    else if(diffX==-1 && diffY==-1)
        return 315;
    else alert("unable to calculate heading");

};

Bot.prototype.calculateNextStepFromHeading = function(possibleSteps){

    var bestHeadingSoFar;
    var bestOffsetSoFar=180;
    var bestStepSoFar=false;
    //("      I'm currently at (" + this.gridPosition.xCoord + "," + this.gridPosition.yCoord + ") and I have " + possibleSteps.length + " poss steps");
    for(var i = 0; i<possibleSteps.length; i++){
        var possibleStepHeading = this.calculateHeadingOfPossibleStep(possibleSteps[i]);
        //console.log("      Calculated heading is " + possibleStepHeading + " for step (" + possibleSteps[i].xCoord + "," + possibleSteps[i].yCoord + ")");
        var headingDiff = this.currentDirection - possibleStepHeading;
        if(headingDiff>180)headingDiff-=360;
        else if(headingDiff<-180)headingDiff+=360;
        headingDiff=Math.abs(headingDiff);// //console.log("    we hit an else, headingDiff=" + headingDiff + "  +180=" + (headingDiff+180) + "   or   +360=" + (headingDiff+360));//
        if(headingDiff < bestOffsetSoFar){
            bestHeadingSoFar = possibleStepHeading;
            bestOffsetSoFar=headingDiff;
            bestStepSoFar=possibleSteps[i];
        }//end if
        //console.log("         Diffence in headings is " + headingDiff);
    }//end for loop
    this.actualHeading = bestHeadingSoFar;

    //console.log("      Best possible step is (" + bestStepSoFar.xCoord + "," + bestStepSoFar.yCoord + ")");
    return bestStepSoFar;







    /*
    //45
    if(this.currentDirection >= 22.5 && this.currentDirection < 67.5){
        this.nextMove.yCoord=this.location.yCoord-1;
        this.nextMove.xCoord=this.location.xCoord+1;

    }
    //90
    else if(this.currentDirection >= 67.5 && this.currentDirection < 112.5){
        this.nextMove.yCoord=this.location.yCoord;
        this.nextMove.xCoord=this.location.xCoord+1;

    }
    //135
    else if(this.currentDirection >= 112.5 && this.currentDirection < 157.5){
        this.nextMove.yCoord=this.location.yCoord+1;
        this.nextMove.xCoord=this.location.xCoord+1;

    }

    //180
    else if(this.currentDirection >= 157.5 && this.currentDirection < 202.5){
        this.nextMove.yCoord=this.location.yCoord+1;
        this.nextMove.xCoord=this.location.xCoord;
    }
    //225
    else if(this.currentDirection >= 202.5 && this.currentDirection < 247.5){
        this.nextMove.yCoord=this.location.yCoord+1;
        this.nextMove.xCoord=this.location.xCoord-1;

    }
    //270
    else if(this.currentDirection >= 247.5 && this.currentDirection < 292.5){
        this.nextMove.xCoord=this.location.xCoord-1;
        this.nextMove.yCoord=this.location.yCoord;

    }
    //315
    else if(this.currentDirection >= 292.5 && this.currentDirection < 337.5){
        this.nextMove.yCoord=this.location.yCoord-1;
        this.nextMove.xCoord=this.location.xCoord-1;

    }
    //360 or 0
    else if(this.currentDirection >= 337.5 || this.currentDirection < 22.5){
        this.nextMove.yCoord=this.location.yCoord-1;
        this.nextMove.xCoord=this.location.xCoord;

    }
    else{

        //console.log("error unknown direction " + this.currentDirection);
    }


     */
};



Bot.prototype.timeToNextMeeting = function(){
    if(!this.nextMeeting())
        return 0;
    var time = new Date();
    var unix = time.getTime();

    var timeDiff =  diffTime(unix, this.nextMeeting().time);
    //console.log ("time difference between now and next Meeting is " + timeDiff);
    return timeDiff;
};
Bot.prototype.tripTimeToNextMeeting = function(){ return this.tripTimeToMeeting(this.nextMeeting());};

Bot.prototype.tripTimeToMeeting = function(meeting){

    return ( (this.distanceToNextMeeting()/this.playground.stepsPerSecond) );


};

Bot.prototype.distanceToNextMeeting = function(){
    if(this.nextMeeting())
    return getNumSteps(this.gridPosition, this.nextMeeting().gridLocation);
    else return 0;
};

Bot.prototype.existingMeeting = function(bot){
    for (var i= 0; i<this.meetings.length; i++){
        if (typeof bot == 'undefined' || typeof bot.botNumber == 'undefined')
            console.trace();
        if(this.meetings[i].bot == bot.botNumber)
            return true;



    }//end for
};

Bot.prototype.hasMissedMeetingWith = function(botNumber){

    for (var i= 0; i<this.missedMeetings.length; i++){
        if(this.missedMeetings[i])
                if(this.missedMeetings[i].bot == botNumber)
            return true;



    }//end for
    return false;
};

Bot.prototype.scheduleMeet = function(otherBot){
    if(!this.existingMeeting(otherBot) && (this.team != otherBot.team) && !this.hasMissedMeetingWith(otherBot.botNumber)){
        //console.log("no meeting YET, lets do this now");
        //make random time
        var time = this.playground.getRandomTime();
        //make random place
        var place = this.playground.getRandomLocation();

        var myMeeting = new Meeting(place, otherBot.botNumber, time);
        myMeeting.otherBot = otherBot;
        this.meetings.push(myMeeting);

        var hisMeeting = new Meeting(place, this.botNumber, time);
        hisMeeting.otherBot=this;
        otherBot.meetings.push(hisMeeting);

        this.sortMeetings()
        otherBot.sortMeetings();
    }
//  calculate who is closer to their next meeting
    else{
        //console.log("we already have a meeting, lets sit this one out");

    }

};//end function meet





/******************************************************/
function Playground (width, height, numTeams, numPlayers, botRadius) {
    this.canvasBox = document.getElementById('canvas');
    this.canvas = document.getElementById('canvas').getContext("2d");

    this.runInterval;
    this.showBotStatus = true;
    this.showBotStatusColor = true;
    this.showGridLines =false;
    this.showGridNumbers=false;
    this.showBotNumbers = false;
    this.teams=new Array();
    this.bots = new Array();
    this.defaultTeam;
    this.numTeams = numTeams;
    this.numPlayers = numPlayers;
    this.botRadius=botRadius;
    this.color={0:'blue', 1:'red', 2:'green', 3:'yellow', 4:'white', 5:'black', 6:'blue', 7:'purple',8:'orange', 9:'black'};
    this.names={0:'Cody', 1:'Seve', 2:'Number 2', 3:'Lola', 4:'Pippi', 5:'Junior', 6:'Dot', 7:'Dash', 8:'Teri', 9:'Comma', 10:'Spike', 11:'Nemo', 12:'Marley', 13:'Chessie',14:'Tammie', 15:'Michael', 16:'Josh', 17:'Kevin', 18:'Kyle', 19:'Lindsay', 20:'Bert', 21:'Eileen', 22:'Pamela', 23:'Dave', 24:'Jeff', 25:'Justin',26:'Blair', 27:'Murphy',28:'Wendy', 29:'Maverick', 30:'Stetson', 31:'Jodi', 32:'Jim', 33:'Tom', 34:"Katherine", 35:'Jeremy', 36:'Mark', 37:'Nick', 38:'Mike'};
    this.neighborhoodRadius=10;
    this.gridSize=2*this.botRadius;
    width=parseInt(width);
    height=parseInt(height);
    this.width=width-(width%this.gridSize);
    //console.log("width="+width);
    //console.log("gridSize=" + this.gridSize);
    //console.log("width%this.gridSize=" + (width%this.gridSize));
    //console.log("width-(width%this.gridsize=" + (width-(width%this.gridSize)));
    this.height=height-(height%this.gridSize);
    this.numRows = this.height/this.gridSize;
    this.numCols = this.width/this.gridSize;
    this.framesPerGridStep = this.gridSize;
    this.frameCount = width;
    this.stepsPerSecond = 1;
    this.leaveForMeetingThreshold=10;//seconds
    this.missedMeetingThreshold = 10;//seconds
    this.meetingCycleLength=30;
    this.meetNoShowBots = false;
    this.meetTeamMembers = false;
    this.showBotNames = true;
    this.showMeetingConnectors=true;
    this.sprites = {};


    this.spriteImage = new Image();
    this.spriteImage.src = "images/sprites/mario.png";
    this.canvas.drawImage(this.spriteImage,0,0,50,50,0,0,50,50);

}

Playground.prototype.getRandomLocation = function(){
    var randomLocation = new Location();

    randomLocation.xCoord = Math.floor((Math.random()*this.numCols));
    randomLocation.yCoord = Math.floor((Math.random()*this.numRows));
    //console.log("random location is (" + randomLocation.xCoord + "," + randomLocation.yCoord + ")");




    return randomLocation;

};


Playground.prototype.getRandomTime = function(){

    var foo = new Date; // Generic JS date object
    var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch

    //add random time from 1 minute to 3 minutes
    return unixtime_ms + Math.floor((Math.random()*120000) + 60000);
    //return unixtime_ms + Math.floor((Math.random()*20000) + 10000);


};


Playground.prototype.isGridLocationOutOfBounds = function(gridLocation){
    if( (gridLocation.xCoord < 0)
            ||  (gridLocation.yCoord < 0)
            ||  (gridLocation.xCoord > this.numCols-1)
            ||  (gridLocation.yCoord > this.numRows-1) ){
        return true;
    }
    else return false;
};

Playground.prototype.isGridLocationOccupied = function(gridLocation){

    if(this.isGridLocationOutOfBounds(gridLocation))
        return true;

    for (var i= 0; i<this.bots.length; i++){

        if(locationsAreEqual(this.bots[i].gridPosition,gridLocation))
            return true;

    }//end for

    return false;


};


Playground.prototype.getNextDoorNeighbors = function(bot){

    return this.getNeighborsWithinRadius(bot, 1);

};

Playground.prototype.getNeighborhood = function(bot){


    return this.getNeighborsWithinRadius(bot, this.neighborhoodRadius);


};


Playground.prototype.getNeighborsWithinRadius = function(bot, radius){

    var botsNearMe=Array();

    for (var i= 0; i<this.bots.length; i++){
        if(this.bots[i] != bot)
            if( getNumSteps(bot.gridPosition, this.bots[i].gridPosition) <= (radius) )
                botsNearMe.push(this.bots[i]);

    }//end for
    return botsNearMe;

};


Playground.prototype.nextMeeting = function() {
    return meetings[0];
};

Playground.prototype.createTeams = function(){
    //console.log("createTeams() called");
    var botNumber = 1;
    var teamSpacing = Math.floor(this.numRows/(this.numTeams+1));
    var botSpacing = Math.floor((this.numCols/(this.numPlayers+1)));
    for (var i=1; i<=this.numTeams; i++)
    {

        var tempTeam = new Team('Team'+i, new GridLocation( Math.floor(this.numCols/2), teamSpacing * i) , this, this.color[i-1]);
        //console.log("newTeam created " + 'Team'+i);
        for (var j=1; j<=this.numPlayers; j++)
        {
            //console.log("tempTeam.base.xCoord/this.numPlayers is " + tempTeam.base.xCoord/this.numPlayers);
            var newGridLocation = new GridLocation(botSpacing * j, tempTeam.base.yCoord);
            //console.log("this.numPlayers="+this.numPlayers);
            //console.log("this.numPlayers+1=" + Number(this.numPlayers+1));
            //console.log("this.numCols=" +this.numCols);

            //console.log("(this.numCols/(this.numPlayers+1))="+(this.numCols/(this.numPlayers+1)));
            //console.log("(this.numRows/(this.numPlayers+1))*j="+(this.numRows/(this.numPlayers+1))*j);

            var newBot=new Bot( this.radius,newGridLocation, tempTeam, this, botNumber);

            //console.log("newGridLocation is at (" + newGridLocation.xCoord + "," + newGridLocation.yCoord + ")");
            this.bots.push(tempTeam.addBot(newBot));
            //console.log("new bot added at position(" + tempTeam.bots[tempTeam.bots.length-1].gridPosition.xCoord + ' '  + tempTeam.bots[tempTeam.bots.length-1].gridPosition.yCoord + ')');
            botNumber++;
        }
        this.teams.push(tempTeam);
    }

};
Playground.prototype.pauseBot = function(){ };

Playground.prototype.setup = function(){
    this.createTeams();
    this.clear();
    this.drawGround();
    //this.drawBots();


};
Playground.prototype.play = function(){
    this.setup();
    //this.advance();


};

Playground.prototype.advanceLoop = function(){

    while(1)
    this.advanceFrame();



};

Playground.prototype.pause = function(){

};


Playground.prototype.advanceFrame = function(){

    if(this.frameCount > this.framesPerGridStep){
        //console.log('starting new frame');
        this.frameCount=1;
        this.frameTranslations = new Array();
        for (var i= 0; i<this.bots.length; i++){

            var translation = new Translation(this.bots[i].gridPosition, null);
            this.bots[i].tryToMoveBot();
            translation.toGridLocation=this.bots[i].gridPosition;
            this.frameTranslations[this.bots[i].botNumber] = translation;


        }


    }//end if need to start new frame

    for (var i= 0; i<this.bots.length; i++){
        var translation = this.frameTranslations[this.bots[i].botNumber];
        //var moveToPixel = this.convertGridToReal(translation.toGridLocation);

        ////console.log("moving bot " + this.bots[i].botNumber +  " from " + this.bots[i].gridPosition.xCoord + "," + this.bots[i].gridPosition.yCoord);
        //this.bots[i].moveBotToPixel(moveToPixel);
        this.moveBotForFrame(this.bots[i], translation, this.frameCount);
        ////console.log("to " + this.bots[i].gridPosition.xCoord + "," + this.bots[i].gridPosition.yCoord);
    }


    this.frameCount++;
    this.redraw();
};



Playground.prototype.moveBotForFrame = function(bot, translation, frameNumber){
    var xAddition =0;
    var yAddition =0;

    //Right
    if(translation.fromGridPosition.xCoord < translation.toGridLocation.xCoord)
        xAddition = 1;

    //Left (decreasing x)
    else if(translation.fromGridPosition.xCoord > translation.toGridLocation.xCoord)
        xAddition = -1;
    //Up (decreasing x)
    if(translation.fromGridPosition.yCoord > translation.toGridLocation.yCoord)
        yAddition = -1;
    //Down (increasing y)
    else if(translation.fromGridPosition.yCoord < translation.toGridLocation.yCoord)
        yAddition = 1;

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


Playground.prototype.headings = function(){

    this.setup();
    //$("#debugInfo").append(" ");
    //draw the headings for the distance matrix
    for(var l=0; l<this.bots.length; l++ ){

        $("#debugInfo").append("       " + l);
    }


    for(var i=0; i<this.bots.length; i++){
        //start a new line
        $("#debugInfo").append("\r\nBot" + i);

        for(var k=0; k<i+1; k++){
            $("#debugInfo").append("   X    ");
        }
        for(var j=i+1; j<this.bots.length; j++){

            $("#debugInfo").append(distance(this.bots[i], this.bots[j]).toFixed(2));



        }


    }





};



Playground.prototype.getSprite = function(botType){

    if(botType == "mario"){

        if(this.sprites["mario"]== null){
            //console.log("mario was chosen");
            this.sprites["mario"]=new Sprite("images/sprites/mario.png", marioSpriteMap, 5);
            return this.sprites["mario"];
        }
        else
            return this.sprites["mario"];
    }

    else
        return;



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
    }


    else
        this.canvas.drawImage(image,srcX,srcY,srcW,srcH,destX-(destW*.5),destY-(destH*.5),destW,destH);










};

Playground.prototype.drawSprite = function(bot){


        var sprite = this.getSprite(bot.botType);
        if(sprite == null)
            console.log("sprite is null ")
        //.drawImage(sprites,srcX,srcY,srcW,srcH,destX,destY,destW,destH);
            //console.log(sprite.image);


        var framesPerPosition = Math.ceil(this.framesPerGridStep/sprite.spritesPerGridStep);
        var spriteFrame = Math.floor((this.frameCount-1)/framesPerPosition);
        console.log(this.frameCount);
        console.log(framesPerPosition + " " + spriteFrame);

        var heading = bot.actualHeading;
        if(heading=="45"){heading ="315"; flip=true;}
        else if(heading=="270"){heading ="90"; flip=true;}
        else if(heading=="135"){heading ="225";flip=true;}
        else flip=false;

        if(spriteFrame ==3){
            spriteFrame=1;




        }
        else if(spriteFrame == 4){


            spriteFrame=0;


        }


        if(typeof sprite.map == "undefined")
            console.log("sprite.map undefined");
        else if(typeof sprite.map[heading+"_"+spriteFrame].begin.xCoord == "undefined")
            console.log("begin.xCoord undefined");

        var srcX = sprite.map[heading+"_" +spriteFrame].begin.xCoord;
        var srcY = sprite.map[heading+"_" +spriteFrame].begin.yCoord;
        var srcW = Math.abs(srcX-sprite.map[heading+"_" +spriteFrame].end.xCoord);
        var srcH = Math.abs(srcY-sprite.map[heading+"_" +spriteFrame].end.yCoord);


        this.drawFlippedImage(sprite.image,srcX,srcY,srcW,srcH,destX,destY,destW,destH,flip);
        /*
        var srcX = sprite.map["0_1"].begin.xCoord;
        var srcY = sprite.map["0_1"].begin.yCoord;
        var srcW = Math.abs(srcX-sprite.map["0_1"].end.xCoord);
        var srcH = Math.abs(srcY-sprite.map["0_1"].end.yCoord);
        */
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
    //this.canvas.fillStyle = '#8ED6FF';
    this.canvas.fillStyle = '#FFFFFF';

    this.canvas.fill();
    this.canvas.lineWidth = 0;
    this.canvas.strokeStyle = 'black';
    this.canvas.stroke();
    ////console.log('drawing playground');
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

        for(var i =1; i<this.numRows; i++){

            var x = (this.width/this.numCols)*i;


            //draw vertical
            this.canvas.beginPath();
            this.canvas.moveTo(x,0);
            this.canvas.lineTo(x,this.height);
            this.canvas.stroke();





        }








    }//end if show grid lines




};


Playground.prototype.drawBot = function(bot){

    if(!bot){return false;}
    ////console.log("drawBot called");
    var drawLocation = bot.pixelPosition;
    var fillStyle=bot.team.color;

        var statusText;
        if(bot.inMeeting){

            statusText = "IN A MEETING DND -  " + bot.meetingCycleCount;
            var statusFillStyle = "red";
        }

        else if(bot.waitingForMeeting){
            statusText = "WAITING - " + bot.timeToNextMeeting() + " s";
            var statusFillStyle = "orange";

        }

        else if(bot.onWayToMeeting){
            statusText = "ON MY WAY " + bot.timeToNextMeeting() + " s";
            var statusFillStyle = "yellow";
        }

        else{
            statusText = "WALKIN AROUND GETTIN INVOLVED - " + bot.timeToNextMeeting() + " s";
            var statusFillStyle = "green";
        }

        if(this.showBotStatus){
        this.canvas.font = "8px sans-serif";
        this.canvas.fillStyle="black";
        this.canvas.fillText(statusText, drawLocation.xCoord, (drawLocation.yCoord-(2*this.botRadius)));
    }//end if show bot status



    if(this.showBotStatusColor){

        fillStyle=statusFillStyle;
    }




    if(this.showBotNames){


        this.canvas.font = "7px sans-serif";
        this.canvas.fillStyle="black";
        this.canvas.fillText(this.names[(bot.botNumber-1)%38], drawLocation.xCoord, (drawLocation.yCoord+this.botRadius));

    }




    if(this.showMeetingConnectors){

        if(bot.nextMeeting()){

            var toBot = bot.nextMeeting().otherBot;
            //if(parseInt(toBot.botNumber) < parseInt(bot.botNumber)){

                this.canvas.beginPath();
                this.canvas.moveTo(drawLocation.xCoord, drawLocation.yCoord);
                this.canvas.lineTo(toBot.pixelPosition.xCoord,toBot.pixelPosition.yCoord);
                this.canvas.stroke();
            //}
        }





    }

    if(this.showBotNumbers){
        this.canvas.font = "7px sans-serif";
        this.canvas.fillStyle="black";
        this.canvas.fillText(bot.botNumber, drawLocation.xCoord-2, drawLocation.yCoord+2);
    }
    //console.log("drew bot at " + drawLocation.xCoord + "," + drawLocation.yCoord);


    if(bot.botType=="circleBot"){

        this.canvas.beginPath();
        this.canvas.arc(drawLocation.xCoord, drawLocation.yCoord, this.botRadius, 0 , 2 * Math.PI, false);

        this.canvas.fillStyle = fillStyle;

        this.canvas.fill();
        this.canvas.lineWidth = 1;
        this.canvas.strokeStyle = bot.team.color;
        this.canvas.stroke();
    }

    else this.drawSprite(bot);





};

Playground.prototype.drawBots = function(){
    //this.canvas.globalCompositeOperation="lighter";
    ////console.log("drawBots called on " + this.bots.length + " bots");
    for (var i= 0; i<this.bots.length; i++){
        //bot.move();
        this.drawBot(this.bots[i]);

    }//end for

};//end function



Playground.prototype.convertGridToReal = function(gridLocation){
    var location = new PixelLocation();
    location.xCoord = gridLocation.xCoord*this.gridSize + (this.gridSize/2);
    location.yCoord = gridLocation.yCoord*this.gridSize + (this.gridSize/2);

    return location;
};

Playground.prototype.convertRealToGrid = function(location){



    return gridLocation;
};
