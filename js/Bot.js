function Bot(radius, gridPosition, team, playground, botNumber) {
    this.botType='circleBot';
    //this.botType = "mario";
    this.gridPosition = gridPosition;
    this.pixelPosition = playground.convertGridToReal(gridPosition);
    this.meetings = [];
    this.team = team;
    this.playground = playground;
    this.radius = radius;
    this.currentDirection = getRandomHeading();
    this.botNumber = botNumber;
    this.onWayToMeeting = false;
    this.missedMeetings = [];
    this.waitingForMeeting = false;
    this.oldMeetings = [];
    this.inMeeting = false;
    this.meetingCycleCount = 0;
}

Bot.prototype.nextMeeting = function () {
    if (this.meetings) {
        return this.meetings[0];
    }

    return null;
};

Bot.prototype.sortMeetings = function () {
    this.meetings.sort(sortTimeAscending);
};

Bot.prototype.moveBotTo = function (nextStep) {
    if (!nextStep) {
        return;
    }

    this.gridPosition.xCoord = nextStep.xCoord;
    this.gridPosition.yCoord = nextStep.yCoord;
};

Bot.prototype.moveBotToPixel = function (nextPixel) {
    if (!nextPixel) {
        return false;
    }

    this.pixelPosition.xCoord = nextPixel.xCoord;
    this.pixelPosition.yCoord = nextPixel.yCoord;
};


Bot.prototype.getSurroundingCells = function () {
    return getSurroundingCells(this.gridPosition);
};


Bot.prototype.hasNextMeetingPassed = function () {
    if (!this.nextMeeting()) {
        return false;
    }

    return this.hasMeetingPassed(this.nextMeeting());


};

Bot.prototype.hasMeetingPassed = function (meeting) {
    if (!meeting) {
        return false;
    }

    return (diffTime(meeting.time + this.playground.missedMeetingThreshold, getNow()) > 0);
};

Bot.prototype.shouldLeaveForNextMeeting = function () {
    return (this.tripTimeToNextMeeting() > (this.timeToNextMeeting() - this.playground.leaveForMeetingThreshold) );
};

Bot.prototype.clearMissedMeetings = function () {
    for (var i = 0; i < this.meetings.length; i++) {
        if (this.hasMeetingPassed(this.meetings[i])) {
            this.oldMeetings.push(this.meetings.splice(i));
            i = 0;
        }
    }
};


Bot.prototype.isMyNextMeetingHere = function () {
    return this.isMyMeetingHere(this.nextMeeting());
};

Bot.prototype.isMyMeetingHere = function (meeting) {
    if (!meeting) {
        return false;
    }
    var neighbors = this.playground.getNextDoorNeighbors(this);

    if (neighbors) {
        for (var i = 0; i < neighbors.length; i++) {
            if (neighbors[i].botNumber == meeting.bot) {
                return neighbors[i];
            }
        }
    }
};

Bot.prototype.meet = function () {
    this.inMeeting = true;

    if (this.meetingCycleCount > this.playground.meetingCycleLength) {
        this.oldMeetings.push(this.meetings.pop());
        this.clearMissedMeetings();
        this.inMeeting = false;
        this.onWayToMeeting = false;
        this.waitingForMeeting = false;
        this.meetingCycleCount = 0;
    }
    else
        this.meetingCycleCount++;
};


Bot.prototype.tryToMoveBot = function () {

    //check for neighbors
    var neighbors = this.playground.getNextDoorNeighbors(this);
    //if we have neighbors
    if (neighbors != false) {
        //loop through neighbors
        for (var i = 0; i < neighbors.length; i++) {
            //lets schedule a meeting
            this.scheduleMeet(neighbors[i]);
        }
    }

    //get possible moves
    var possibleSteps = this.getPossibleSteps();
    if (this.isInCorner()) {
        this.currentDirection = (this.currentDirection + 180) % 360;
    } else if (this.isUpAgainstWall() && this.isHeadingTowardsWall()) {
        this.currentDirection = (this.currentDirection + 180) % 360;
    }

    if (this.inMeeting) {
        this.meet();
    } else if (this.waitingForMeeting) {
        //if we are at the spot waiting for the meeting

        if (this.hasNextMeetingPassed()) {
            //whoops we missed it
            this.waitingForMeeting = false;
            this.onWayToMeeting = false;
            this.clearMissedMeetings();
        } else {
            //hooray there is still time
            var otherBot = this.isMyNextMeetingHere();

            if (otherBot) {
                otherBot.waitingForMeeting = true;
                this.meet();
            }
        }
    } else if (this.onWayToMeeting) {
        if (this.hasNextMeetingPassed()) {
            //if we missed our meeting
            this.clearMissedMeetings();
            this.waitingForMeeting = false;
            this.onWayToMeeting = false;
            this.inMeeting = false;
        } else {
            //else we are still on time
            if (this.nextMeeting()) {
                this.currentDirection = this.calculateHeadingToGridLocation(this.nextMeeting().gridLocation);
            }

            if (locationsAreEqual(this.gridPosition, this.nextMeeting().gridLocation)) {
                this.waitingForMeeting = true;
                var bot = this.isMyNextMeetingHere();
                if (bot) {

                    bot.waitingForMeeting = true;
                    bot.inMeeting = true;
                    this.meet();
                }
            }

        }

        var nextStep = this.calculateNextStepFromHeading(possibleSteps);
        this.moveBotTo(nextStep);

    } else {
        //else we are not yet on our way to a meeting

        //check to see if we have any meetings approaching
        if (this.nextMeeting()) {
            if (this.shouldLeaveForNextMeeting()) {
                //if we maybe have to goto a meeting
                this.currentDirection = this.calculateHeadingToGridLocation(this.nextMeeting().gridLocation);
                this.onWayToMeeting = true;
            }
            else {
            }
        }

        var nextStep = this.calculateNextStepFromHeading(possibleSteps);
        //var nextStep = possibleSteps[0];
        this.moveBotTo(nextStep);
        //else we are free to roam around

    }


};


Bot.prototype.getPossibleSteps = function () {
    var surroundingCells = this.getSurroundingCells();

    var possibleSteps = [];
    for (var i = 0; i < surroundingCells.length; i++) {
        if (!this.playground.isGridLocationOccupied(surroundingCells[i])) {
            possibleSteps.push(surroundingCells[i]);
        }
    }

    if (possibleSteps.length <= 0) {
        return false;
    } else {
        return possibleSteps;
    }

};


Bot.prototype.isUpAgainstWall = function () {
    if (this.gridPosition.xCoord == 0 ||
        this.gridPosition.yCoord == 0 ||
        this.gridPosition.xCoord >= (this.playground.numCols - 1) ||
        this.gridPosition.yCoord >= (this.playground.numRows - 1)) {

        return true;
    }
    else {
        return false;
    }
};

Bot.prototype.isHeadingTowardsWall = function () {
    if (this.gridPosition.xCoord == 0 && this.currentDirection > 180) {
        return true;
    } else if (this.gridPosition.yCoord == 0 && (this.currentDirection < 90 || this.currentDirection > 225)) {
        return true;
    } else if (this.gridPosition.xCoord >= (this.playground.numCols - 1) && this.currentDirection < 180) {
        return true;
    } else if (this.gridPosition.yCoord >= (this.playground.numRows - 1) && (this.currentDirection > 90 && this.currentDirection < 225)) {
        return true;
    } else {
        return false;
    }
};

Bot.prototype.isInCorner = function () {
    var yes = 0;

    if (this.gridPosition.xCoord == 0) {
        yes++;
    }

    if (this.gridPosition.yCoord == 0) {
        yes++;
    }

    if (this.gridPosition.xCoord >= this.playground.numCols - 1) {
        yes++;
    }

    if (this.gridPosition.yCoord >= this.playground.numRows - 1) {
        yes++;
    }

    return yes >= 2;

};


Bot.prototype.calculateHeadingToGridLocation = function (gridLocation) {
    if (!gridLocation) {
        alert("gridLocation is null");
    }

    var diffX = gridLocation.xCoord - this.gridPosition.xCoord;
    var diffY = gridLocation.yCoord - this.gridPosition.yCoord;

    if (diffX == 0 && diffY == -1)
        return 0;
    else if (diffX >= 1 && diffY <= -1)
        return 45;
    else if (diffX >= 1 && diffY == 0)
        return 90;
    else if (diffX >= 1 && diffY >= 1)
        return 135;
    else if (diffX == 0 && diffY >= 1)
        return 180;
    else if (diffX <= -1 && diffY >= 1)
        return 225;
    else if (diffX <= -1 && diffY == 0)
        return 270;
    else if (diffX <= -1 && diffY <= -1)
        return 315;
    else
        return 0;

};


Bot.prototype.calculateHeadingOfPossibleStep = function (possibleStep) {
    if (!possibleStep) {
        alert("possible step is null");
    }
    var diffX = possibleStep.xCoord - this.gridPosition.xCoord;
    var diffY = possibleStep.yCoord - this.gridPosition.yCoord;

    if (diffX == 0 && diffY == -1)
        return 0;
    else if (diffX == 1 && diffY == -1)
        return 45;
    else if (diffX == 1 && diffY == 0)
        return 90;
    else if (diffX == 1 && diffY == 1)
        return 135;
    else if (diffX == 0 && diffY == 1)
        return 180;
    else if (diffX == -1 && diffY == 1)
        return 225;
    else if (diffX == -1 && diffY == 0)
        return 270;
    else if (diffX == -1 && diffY == -1)
        return 315;
    else alert("unable to calculate heading");

};

Bot.prototype.calculateNextStepFromHeading = function (possibleSteps) {

    if(!possibleSteps){
        this.actualHeading = 180;
        return null;
    }

    var bestHeadingSoFar;
    var bestOffsetSoFar = 180;
    var bestStepSoFar = false;
    for (var i = 0; i < possibleSteps.length; i++) {
        var possibleStepHeading = this.calculateHeadingOfPossibleStep(possibleSteps[i]);
        var headingDiff = this.currentDirection - possibleStepHeading;

        if (headingDiff > 180) {
            headingDiff -= 360;
        } else if (headingDiff < -180) {
            headingDiff += 360;
        }

        headingDiff = Math.abs(headingDiff);

        if (headingDiff < bestOffsetSoFar) {
            bestHeadingSoFar = possibleStepHeading;
            bestOffsetSoFar = headingDiff;
            bestStepSoFar = possibleSteps[i];
        }
    }

    if(typeof bestHeadingSoFar === 'undefined'){
        console.log("uh oh");
    }

    this.actualHeading = bestHeadingSoFar;

    return bestStepSoFar;

};


Bot.prototype.timeToNextMeeting = function () {
    if (!this.nextMeeting())
        return 0;
    var time = new Date();
    var unix = time.getTime();

    return diffTime(unix, this.nextMeeting().time);
};

Bot.prototype.tripTimeToNextMeeting = function () {
    return this.tripTimeToMeeting(this.nextMeeting());
};

Bot.prototype.tripTimeToMeeting = function () {
    return ( (this.distanceToNextMeeting() / this.playground.stepsPerSecond) );
};

Bot.prototype.distanceToNextMeeting = function () {
    if (this.nextMeeting()) {
        return getNumSteps(this.gridPosition, this.nextMeeting().gridLocation);
    }

    else return 0;
};

Bot.prototype.existingMeeting = function (bot) {
    for (var i = 0; i < this.meetings.length; i++) {
        if (typeof bot == 'undefined' || typeof bot.botNumber == 'undefined') {
            console.trace();
        }
        if (this.meetings[i].bot == bot.botNumber) {
            return true;
        }
    }
};

Bot.prototype.hasMissedMeetingWith = function (botNumber) {
    for (var i = 0; i < this.missedMeetings.length; i++) {
        if (this.missedMeetings[i]) {
            if (this.missedMeetings[i].bot == botNumber) {
                return true;
            }

        }
    }

    return false;
};

Bot.prototype.scheduleMeet = function (otherBot) {
    if (!this.existingMeeting(otherBot) && (this.team != otherBot.team) && !this.hasMissedMeetingWith(otherBot.botNumber)) {
        //make random time
        var time = this.playground.getRandomTime();
        //make random place
        var place = this.playground.getRandomLocation();

        var myMeeting = new Meeting(place, otherBot.botNumber, time);
        myMeeting.otherBot = otherBot;
        this.meetings.push(myMeeting);

        var hisMeeting = new Meeting(place, this.botNumber, time);
        hisMeeting.otherBot = this;
        otherBot.meetings.push(hisMeeting);

        this.sortMeetings()
        otherBot.sortMeetings();
    } else {
        //  calculate who is closer to their next meeting
    }

};
