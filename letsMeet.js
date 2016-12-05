document.createElement('header');
document.createElement('menu');
document.createElement('content');
document.createElement('footer');

function updateSimSettings(){
    playground=playground;
    if($('#cbShowBotStatus').is(':checked'))
        playground.showBotStatus=true;
    else
        playground.showBotStatus=false;

    playground.showBotStatusColor=$('#cbShowBotStatusColors').is(':checked');


    if($('#cbShowBotNumbers').is(':checked'))

        playground.showBotNumbers=true;
    else
        playground.showBotNumbers=false;

    if($('#cbShowGridlines').is(':checked')){
        playground.showGridLines=true;
        console.log("show grid lines true;");
        alert
    }

    else
        playground.showGridLines=false;

    if($('#cbMeetTeamMembers').is(':checked'))
        playground.meetTeamMembers=true;
    else
        playground.meetTeamMembers=false;

    if($('#cbMeetNoShowBots').is(':checked'))
        playground.meetNoShowBots=true;
    else
        playground.meetNoShowBots=false;

    playground.showMeetingConnectors = $('#cbShowMeetingConnectors').is(':checked');
    playground.showBotNames = $('#cbShowBotNames').is(':checked');
    //playground.botRadius=(parseInt($('#tBotSize').val())/2);
    playground.leaveForMeetingThreshold=parseInt($('#tExtraTravelTime').val());
    playground.missedMeetingThreshold=parseInt($('#tMeetWaitTime').val());
    playground.meetingCycleLength=parseInt($('#tMeetingLength').val());

    playground.showGridLines = $('#cbShowGridlines').is(':checked');
    }

function newGame(){
    playground=new Playground(parseInt(document.getElementById('playgroundWidth').value),
    parseInt(document.getElementById('playgroundHeight').value),
    parseInt(document.getElementById('numTeams').value),
    parseInt(document.getElementById('numBots').value),
    parseInt(document.getElementById('tBotSize').value)/2);
    playground.play();
    updateSimSettings();
    //playground.redraw();
    animate();

}

