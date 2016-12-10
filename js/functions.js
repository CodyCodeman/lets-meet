function distance(location1,location2) {
    if(location1==location2){
        return 0;
    }

    var distance = Math.sqrt( (Math.pow( (location1.xCoord - location2.xCoord) ,2) ) + (Math.pow( (location1.yCoord - location2.yCoord),2)));

    if (distance==undefined){
        return 0;
    }
    else if(isNaN(distance)){
        return 0;
    }
    else{
        if(distance < 20)   {
            //I don't remember what this was for
        }
        return distance;
    }
}

function getRandomHeading(){
    return Math.floor((Math.random()*359));
}

function getSurroundingCells(gridPosition){
    var surroundingCells = [];

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

    if(numXSteps > numYSteps){
        return numXSteps;
    }
    else{
        return numYSteps;
    }
}

function locationsAreEqual(location1, location2){
    return ( (location1.xCoord == location2.xCoord) && (location1.yCoord == location2.yCoord) );
}

function diffTime(time1, time2){
    var diff = time2 - time1;
    // diff contains the time difference in milliseconds
    // so for seconds...
    return( diff / 1000 );
}

function sortTimeAscending(a,b) {
    if (a.time < b.time){
        return -1;
    }
    if (a.time > b.time){
        return 1;
    }
    return 0;
}


function getNow(){
    var foo = new Date; // Generic JS date object
    return foo.getTime(); // Returns milliseconds since the epoch
}

function newGame(){
    $('#settings').addClass('closed');
    playground = new Playground(
        parseInt(document.getElementById('playgroundWidth').value),
        parseInt(document.getElementById('playgroundHeight').value),
        parseInt(document.getElementById('numTeams').value),
        parseInt(document.getElementById('numBots').value),
        parseInt(document.getElementById('tBotSize').value)/2
    );
    playground.start();
}
