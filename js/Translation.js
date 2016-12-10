function Translation(fromGridPosition, toGridLocation){
    this.fromGridPosition = new GridLocation(fromGridPosition.xCoord,fromGridPosition.yCoord);
    if(toGridLocation == null){
        this.toGridLocation= new GridLocation();
    }
    else{
        this.toGridPosition = new GridLocation(toGridLocation.xCoord,toGridLocation.yCoord);
    }
}
