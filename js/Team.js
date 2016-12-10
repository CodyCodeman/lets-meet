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
