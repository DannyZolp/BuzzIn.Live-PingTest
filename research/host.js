var socket = io.connect();
var playersList = document.getElementById("playersList");
var teamsList = document.getElementById("teamsList");
var resetOneBtn = document.getElementById("resetOne");
var resetAllBtn = document.getElementById("resetAll");
var disconnected = document.getElementById("disconnected");
var gameIdSpan = document.getElementById("gameId");
var playerBuzzesList = document.getElementById("playerBuzzesList");
var toggleLockBtn = document.getElementById("toggleLock");
var lockIcon = document.getElementById("lockIcon");
var togglePlayersSoundBtn = document.getElementById("togglePlayersSound");
var playersSoundIcon = document.getElementById("playersSoundIcon");
var toggleOneBuzzOnlyBtn = document.getElementById("toggleOneBuzzOnly");
var oneBuzzOnlyIcon = document.getElementById("oneBuzzOnlyIcon");
var toggleHostSoundBtn = document.getElementById("toggleHostSound");
var hostSoundIcon = document.getElementById("hostSoundIcon");
var toggleHostSoundAllBtn = document.getElementById("toggleHostSoundAll");
var hostSoundAllIcon = document.getElementById("hostSoundAllIcon");
var togglePlayerJoinBtn = document.getElementById("togglePlayerJoin");
var playerJoinIcon = document.getElementById("playerJoinIcon");
var toggleEarlyBuzzPenaltyBtn = document.getElementById("toggleEarlyBuzzPenalty");
var earlyBuzzPenaltyIcon = document.getElementById("earlyBuzzPenaltyIcon");
var settingsModal = document.getElementById("settingsModal");
var lobbyChooserModal = document.getElementById("lobbyChooserModal");
var settingsBtn = document.getElementById("settingsBtn");
var closeBtn = document.getElementById("closeBtn");
var playerLimitSpan = document.getElementById("playerLimit");
var soundSelect = document.getElementById("soundSelect");
var iosWarn = document.getElementById("iosWarn");
var premiumBadge = document.getElementById("premiumBadge");
var clickToReveal = document.getElementById("clickToReveal");
var teamsDiv = document.getElementById("teamsDiv");
var toggleTeamsBtn = document.getElementById("toggleTeams");
var togglePointsBtn = document.getElementById("togglePoints");
var toggleTimerBtn = document.getElementById("toggleTimer");
var teamsIcon = document.getElementById("teamsIcon");
var pointsIcon = document.getElementById("pointsIcon");
var timerIcon = document.getElementById("timerIcon");
var penaltyTimeSpan = document.getElementById("penaltyTime");
var buzzListBtn = document.getElementById("toggleBuzzList");
var buzzListIcon = document.getElementById("buzzListIcon");
var setEarlyBuzzPenaltyTimeBtn = document.getElementById("setEarlyBuzzPenaltyTime");
var infoBtn = document.getElementById("infoBtn");
var removeAllPlayersButton = document.getElementById("removeAllPlayersBtn");
var removeAllPointsButton = document.getElementById("removeAllPointsBtn");
var premiumSoundNote = document.getElementById("premiumSoundNote");
var premiumOptionsLabel = document.getElementById("premiumOptionsLabel");
var pointsIncrementSpan = document.getElementById("pointsIncrement")
var setPointsIncrement = document.getElementById("setPointsIncrement");
var loadingModal = document.getElementById("loadingModal");
var timerDisplay = document.getElementById("timerDisplay");
var timerArea = document.getElementById("roundTimer");
var timerStartBtn = document.getElementById("timerStart");
var timerPauseBtn = document.getElementById("timerPause");
var timerResetBtn = document.getElementById("timerReset");
var clickToRevealLink = document.getElementById("clickToRevealLink");
var linkWarning = document.getElementById("linkWarning");
var timerSettingsBtn = document.getElementById("timerSettings");
var timerSettingsModal = document.getElementById("timerSettingsModal");
var timerSettingsCloseBtn = document.getElementById("timerSettingsClose");
var timerUnlockOnStartBtn = document.getElementById("toggleTimerUnlockOnStart");
var timerUnlockOnStartIcon = document.getElementById("timerUnlockOnStartIcon");
var timerLockOnEndBtn = document.getElementById("toggleTimerLockOnEnd");
var timerLockOnEndIcon = document.getElementById("timerLockOnEndIcon");
var timerLockOnPauseBtn = document.getElementById("toggleTimerLockOnPause");
var timerLockOnPauseIcon = document.getElementById("timerLockOnPauseIcon");
var timerPauseOnBuzzBtn = document.getElementById("toggleTimerPauseOnBuzz");
var timerPauseOnBuzzIcon = document.getElementById("timerPauseOnBuzzIcon");
var timerStartOnBuzzBtn = document.getElementById("toggleTimerStartOnBuzz");
var timerStartOnBuzzIcon = document.getElementById("toggleTimerStartOnBuzzIcon");
var timerResetBuzzersBtn = document.getElementById("toggleTimerResetBuzzers");
var timerResetBuzzersIcon = document.getElementById("timerResetBuzzersIcon");
var timerSoundIcon = document.getElementById("timerSoundIcon");
var toggleTimerSoundBtn = document.getElementById("toggleTimerSoundBtn");
var playerTimerBtn = document.getElementById("togglePLayerTimerBtn");
var playerTimerIcon = document.getElementById("playerTimerIcon");
var playerTimerBtn2 = document.getElementById("togglePLayerTimerBtn2");
var playerTimerIcon2 = document.getElementById("playerTimerIcon2");
var setTimerBtn = document.getElementById("setTimerBtn");
var secondaryTimerSettingsBtn = document.getElementById("secondaryTimerSettingsBtn");
var roundModeBtn = document.getElementById("roundModeBtn");
var buyPremium1 = document.getElementById("buyPremium1");
var buyPremium2 = document.getElementById("buyPremium2");
var playerSelfJoinTeamBtn = document.getElementById("togglePlayerSelfJoinTeamBtn");
var playerSelfJoinTeamIcon = document.getElementById("playerSelfJoinTeamIcon");
var removeSavedKeyBtn = document.getElementById("removeSavedKeyBtn");
var endGameBtn = document.getElementById("endGameBtn");
var togglePlayerPointsBtn = document.getElementById("togglePlayerPoints");
var toggleTeamPointsBtn = document.getElementById("toggleTeamPoints");
var playerPointsIcon = document.getElementById("playerPointsIcon");
var teamPointsIcon = document.getElementById("teamPointsIcon")
loadingModal.classList.add("invisible");
var previousBuzzArrLength = 0;
var resetBuzzersWithTimer = false;
var timerRunning = false;
var locked = false;
var gameId = false;
var premiumGame = false;
var premiumKeyExpiration = 0;
var timerDefault = 10000;
var currentTimer = 10000;
var timer = false;
var premiumLinkCode = 0;
var gameCode = 0;
var fullMessageShown = false;
var timerPauseOnBuzz = false;
var currentBuzzes = [];
var currentPlayers = [];
var currentTeams = [];
var pointsHidden = true;
var teamsHidden = true;
var lastPingedCounter = 0;
var buzzSound = {};
var buzzSoundsObj = {
    "Default": new Howl({
        src: ['/sounds/Default.mp3'],
        rate: 1.0
      })
};
var timerEndSound = new Howl({
    src: ["/sounds/timerEnd.mp3"],
    rate: 1.0
});
timerEndSound.volume(0.75);
var playSound = false;
var playSoundAll = true;
var soundPlayed = false;
var hostVerifyCode = 0;
var playerLimit = 8;
var overrideCheck = false;
var playTimerEndSound = true;
var timerStartOnBuzz = false;
// var isIOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
// (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
// !window.MSStream;

// if(isIOS){
//     iosWarn.classList.remove("invisible");
// }
var lobbyChooserBackup;
if(premiumKey){
    socket.emit("hostConnect", {premiumKey: premiumKey, hostOverride: false});
}else if(isCookie()){
    bootbox.confirm("A saved Premium key was found. Use key?", function(result){
        if(result){
            socket.emit("hostConnect", {premiumKey: premiumKey, hostOverride: false});
            lobbyChooserBackup = setInterval(function(){
                if(gameCode === 0 && !overrideCheck){
                    deleteCookie();
                    lobbyChooserModal.classList.remove("invisible");
                    bootbox.alert("Error trying to use saved key");
                }
            }, 3000);
        }else{
            lobbyChooserModal.classList.remove("invisible");
        }
    })
    //used if premiumKey from cookie fails - checks if in game by 3 seconds, otherwise brings up lobby menu and deletes (most likely) bad cookie key

}else{
    lobbyChooserModal.classList.remove("invisible");
}

socket.on("hostOverrideCheck", function(){
    overrideCheck = true;
    bootbox.confirm("Your key currently has a game running with it. Replace the current game's host? <br>--------<br>Reconnecting from a full disconnect is not fully implemented!! The switches of settings previously toggled may be shown visually incorrect. This can be fixed by toggling the impacted setting switches)", function(result){
        if(result){
            socket.emit("hostConnect", {premiumKey: premiumKey, hostOverride: true})
        }else{
            lobbyChooserModal.classList.remove("invisible");
        }
    })
})

socket.on("hostOverride", function(){
    bootbox.alert("You have been disconnected as your key was used to connect from a different location.")
})

soundSelect.addEventListener('change', function(){
    changeBuzzSound(soundSelect.value);
    buzzSound.play();
});

function changeBuzzSound(sound){
    buzzSound = buzzSoundsObj[sound];
    socket.emit("soundChange", {newSound: sound});
}
var obj;
var sounder;
function loadBuzzSounds(sounds){
    obj = {};
    sounds.forEach(function(sound){
      sounder = new Howl({
        src: ['/sounds/' + sound + '.mp3'],
        rate: 1.0
      });
      obj[sound] = sounder;
    });
    buzzSoundsObj = obj;
    changeBuzzSound(soundSelect.value);
  }

var option;
function generateSoundSelect(soundArr){
    soundSelect.innerHTML = "";
    soundArr.forEach(function(sound){
        option = document.createElement("option");
        option.setAttribute("value", sound);
        option.innerHTML = sound;
        soundSelect.appendChild(option);
    })
}

function playBuzzSound(){
    if(playSound && !soundPlayed){
        buzzSound.play();
        soundPlayed = true;
    }else if(playSoundAll){
        buzzSound.play();
    }
}

setEarlyBuzzPenaltyTimeBtn.addEventListener("click", function(){
    bootbox.prompt("How long would you like the penalty to be (in seconds)?", function(result){
        if(result && isInt(result * 1000)){
            socket.emit("setPenaltyTime", {time: parseInt(result * 1000)});
        }else if(!isInt(result * 1000)){
            bootbox.alert({message: "Please input a number", backdrop: true});
        }
    });
})

function isInt(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

setPointsIncrementBtn.addEventListener("click", function(){
    bootbox.prompt("How many points would you like the increment to be?", function(result){
        if(result && isInt(result)){
            socket.emit("setPointsIncrement", {points: parseInt(result)});
        }else if(!isInt(result)){
            bootbox.alert({message: "Please input a number", backdrop: true});
        }
    });
})

infoBtn.addEventListener("click", function(){
    bootbox.dialog({ 
        message: "<h3>How To Info</h3><ul><li><b>Buzzing</b> - Players can join via the game code at the top of your screen. Afterwards, they will have a buzzer button appear on their screens that, when clicked, will buzz in.</li><li><b>Removing Buzzes</b> - Buzzes can be removed by click the \"Reset ALL Buzzers\" button or can be removed individually by clicking the buzz order number beside a buzzed in player's name.</li><li><b>Toggling/Locking</b> - Toggling the lock will enable/disable buzzers.</li><li><b>Removing</b> - Click the <i class='fas fa-ban'></i> to remove a player or team.</li><li><b>Buzz Ordering</b> - The number beside players shows their buzzing order and can be clicked to individually remove buzzes.</li><li><b>Renaming</b> - Click the name of a player or team to rename them.</li><li><b>Latency Correction</b> - BuzzIn.Live accounts for each players connection delay (up to a one second delay) in the ordering of the buzzes. Because of this you may notice buzzes reordering a split-second after they appear.</li><li><b>Disconnecting/Reconnecting</b> - Devices (both players and host) will try to automatically reconnect if their connection fails. While a device is disconnected you will see \"(Disconnected)\" by the name. Players who manually reload or navigate away from the page will not be able to reconnect to their old player profile and will have to rejoin as a new player. </li></ul><h3>Premium Features and How To Use</h3><ul><li><b>Enabling Features</b> - Early-buzz penalty, teams, points, and sound options can all be enabled/changed in the settings menu</li><li><b>Early-Buzz Penalty</b> - Enabling this only works when using the toggling/locking function. Players who buzz-in before their buzzers are unlocked will have their buzzers disabled for a certain amount of time (3 seconds by default).</li><li><b>Points</b> - To get started with points, click the <i class='fas fa-plus'></i> or <i class='fas fa-minus'></i> to add or subtract points from players or teams.</li><li><b>Teams</b> - Teams can be added either by click the assign team button beside a player or by the add team button under the teams tab.</li><li><b>Reassigning Teams</b> - Once assigned, a team can be changed by clicking on the team's name beside the player.</li><li><b>Team Ranking</b> - Teams are ranked by points. These are calculated first by adding up all points of the players on that team and then adding points directly given to the team.</li></ul><h3>Question not answered? Head to the feedback button on the home page and send me your question there! Thanks for using BuzzIn.Live!!</h3>",
        size: 'large',
        onEscape: true,
        backdrop: true,
        buttons: {
            Okay: {
                label: 'Okay',
                className: 'btn-success'
            }
        }
    });
});

removeAllPlayersButton.addEventListener("click", function(){
    removeAllPlayers();
})

removeAllPointsButton.addEventListener("click", function(){
    removeAllPoints();
})

resetAllBtn.addEventListener("click", function(){
    removeAllBuzzes();
});

toggleLockBtn.addEventListener("click", function(){
    socket.emit("toggleLock");
});

togglePlayersSoundBtn.addEventListener("click", function(){
    socket.emit("togglePlayersSound");
});

toggleOneBuzzOnlyBtn.addEventListener("click", function(){
    socket.emit("toggleOneBuzzOnly");
});

togglePlayerJoinBtn.addEventListener("click", function(){
    socket.emit("togglePlayerJoin");
});

togglePlayerPointsBtn.addEventListener("click", function(){
    socket.emit("togglePlayerPlayerPoints");
});

toggleTeamPointsBtn.addEventListener("click", function(){
    socket.emit("togglePlayerTeamPoints");
});

toggleEarlyBuzzPenaltyBtn.addEventListener("click", function(){
    socket.emit("toggleEarlyBuzzPenalty");
});

toggleHostSoundBtn.addEventListener("click", function(){
    if(playSound){
        hostSoundIcon.classList.remove("fa-check");
        hostSoundIcon.classList.add("fa-times");
    }else{
        playSoundAll = false;
        hostSoundAllIcon.classList.remove("fa-check");
        hostSoundAllIcon.classList.add("fa-times");
        hostSoundIcon.classList.add("fa-check");
        hostSoundIcon.classList.remove("fa-times");
    }
    playSound = !playSound;
});

toggleHostSoundAllBtn.addEventListener("click", function(){
    if(playSoundAll){
        hostSoundAllIcon.classList.remove("fa-check");
        hostSoundAllIcon.classList.add("fa-times");
    }else{
        playSound = false;
        hostSoundIcon.classList.add("fa-times");
        hostSoundIcon.classList.remove("fa-check");
        hostSoundAllIcon.classList.add("fa-check");
        hostSoundAllIcon.classList.remove("fa-times");
    }
    playSoundAll = !playSoundAll;
});

toggleTimerSoundBtn.addEventListener("click", function(){
    if(playTimerEndSound){
        timerSoundIcon.classList.remove("fa-check");
        timerSoundIcon.classList.add("fa-times");
    }else{
        timerSoundIcon.classList.add("fa-check");
        timerSoundIcon.classList.remove("fa-times");
    }
    playTimerEndSound = !playTimerEndSound;
})

settingsBtn.addEventListener("click", function(){
    settingsModal.classList.toggle("invisible");
});

closeBtn.addEventListener("click", function(){
    settingsModal.classList.toggle("invisible");
});

endGameBtn.addEventListener("click", function(){
    bootbox.confirm({
        message: "Are you sure you wish to end the game?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No',
                className: 'btn-success'
            }
        },
        callback: function (result) {
            if(result){
                socket.emit("endGame");
            }
        }
    });
})

timerSettingsBtn.addEventListener("click", function(){
    timerSettingsModal.classList.toggle("invisible");
})

secondaryTimerSettingsBtn.addEventListener("click", function(){
    settingsModal.classList.toggle("invisible");
    timerSettingsModal.classList.toggle("invisible");
})

timerSettingsCloseBtn.addEventListener("click", function(){
    timerSettingsModal.classList.toggle("invisible");
})

timerResetBuzzersBtn.addEventListener("click", function(){
    toggleTimerResetBuzzers();
})

timerUnlockOnStartBtn.addEventListener("click", function(){
    socket.emit("toggleTimerUnlockOnStart");
});

timerLockOnEndBtn.addEventListener("click", function(){
    socket.emit("toggleTimerLockOnEnd");
});

timerLockOnPauseBtn.addEventListener("click", function(){
    socket.emit("toggleTimerLockOnPause");
});

timerPauseOnBuzzBtn.addEventListener("click", function(){
    toggleTimerPauseOnBuzz();
});

setTimerBtn.addEventListener("click", function(){
    askForTimerChange();
})

playerSelfJoinTeamBtn.addEventListener("click", function(){
    socket.emit("togglePlayerSelfJoinTeam");
})

roundModeBtn.addEventListener("click", function(){
    toggleTimerResetBuzzers();
    socket.emit("toggleTimerUnlockOnStart");
    socket.emit("toggleTimerLockOnEnd");
    socket.emit("toggleTimerLockOnPause");
    if(!locked){
        socket.emit("toggleLock");
    }
})

playerTimerBtn.addEventListener("click", function(){
    socket.emit("togglePlayerTimer");
})

playerTimerBtn2.addEventListener("click", function(){
    socket.emit("togglePlayerTimer");
})


clickToReveal.addEventListener('click', function(){
    clickToReveal.innerHTML = premiumKey;
    clickToReveal.classList.remove("btn");
    clickToReveal.classList.remove("btn-outline-secondary");
});

clickToRevealLink.addEventListener("click", function(){
    clickToRevealLink.innerHTML = "https://buzzin.live/play/" + premiumLinkCode;
    clickToRevealLink.classList.remove("btn");
    clickToRevealLink.classList.remove("btn-outline-secondary");
    linkWarning.classList.remove("invisible");
})

toggleTeamsBtn.addEventListener("click", function(){
    socket.emit("toggleTeams");
});

togglePointsBtn.addEventListener("click", function(){
    socket.emit("togglePoints");
});

toggleTimerBtn.addEventListener("click", function(){
    socket.emit("toggleTimer");
})

buzzListBtn.addEventListener("click", function(){
    socket.emit("toggleBuzzList");
});

timerDisplay.addEventListener("click", function(){
    askForTimerChange();
});

timerStartBtn.addEventListener("click", function(){
    startTimer();
});

timerPauseBtn.addEventListener("click", function(){
    pauseTimer();
});

timerResetBtn.addEventListener("click", function(){
    resetTimer();
    if(resetBuzzersWithTimer){
        removeAllBuzzes();
    }
});

timerStartOnBuzzBtn.addEventListener("click", function(){
    toggleTimerStartOnBuzz();
})

removeSavedKeyBtn.addEventListener("click", function(){
    bootbox.confirm({
        message: "Are you sure you wish to remove the saved key?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No',
                className: 'btn-success'
            }
        },
        callback: function (result) {
            if(result){
                Cookies.remove("premiumKey");
                removeSavedKeyBtn.classList.add("invisible");
            }
        }
    });    
})

function newPlayer(name, id){
    this.li = createLi(name, id);
    addPlayerLiOptions(this.li, id);
    playersList.appendChild(this.li);
}

function addPlayerLiOptions(li, id) {
    this.trashSpan = document.createElement("span");
    this.trashSpan.addEventListener("click", function(){
        removePlayer(id);
    });
    this.trashSpan.classList.add("playerOptions");
    this.trashSpan.innerHTML = " <i class='fas fa-trash'></i> ";
    this.renameSpan = document.createElement("span");
    this.renameSpan.addEventListener("click", function(){
        bootbox.prompt("What would you like to rename this player?", function(response){
            if(response){
                renamePlayer(id, response);
            }
        });
    });
    this.renameSpan.classList.add("playerOptions");
    this.renameSpan.innerHTML = " <i class='fas fa-pencil-alt'></i> ";
    li.addEventListener("mouseover", function(){
        this.children[1].classList.add("playerOptionsVisible");
        this.children[2].classList.add("playerOptionsVisible");
    });
    li.addEventListener("mouseout", function(){
        this.children[1].classList.remove("playerOptionsVisible");
        this.children[2].classList.remove("playerOptionsVisible");
    });
    li.appendChild(this.renameSpan);
    li.appendChild(this.trashSpan);
}

function createLi(name, id){
    this.li = document.createElement("li");
    this.li.innerHTML = "<span class='playerName'>" + name + "</span>";
    this.li.classList.add(id);
    this.li.classList.add("playerLi");
    return this.li;
}

function removePlayer(id){
    socket.emit("removePlayer", {
        id: id
    });
}

function renamePlayer(id, name){
    socket.emit("renamePlayer", {
        id: id,
        name: name
    });
}

function removeAllBuzzes(){
    socket.emit("clearAllBuzzes");
}

function startFreeLobby(){
    socket.emit("hostConnect");
}

function startPremiumLobby(){
    bootbox.prompt("What is your premium key?", function(premiumKeyInput){
        premiumKey = premiumKeyInput;
        Cookies.remove("premiumKey");
        socket.emit("hostConnect", {premiumKey: premiumKey});
    });
}

socket.on("connection", function(data){
    console.log(data);
    disconnected.classList.add("invisible");
    if(gameId){
        socket.emit("hostConnect", {code: gameId, hostVerifyCode: hostVerifyCode});
    }
});

socket.on("ding", function(){
    socket.emit("dong");
});

socket.on("err", function(data){
    bootbox.alert({message: data.message, backdrop: true});
});

socket.on("reload", function(){
    socket.disconnect();
    window.location = "/";
});

socket.on("disconnect", function(){
    disconnected.classList.remove("invisible");
});

socket.on("buzzSounds", function(data){
    generateSoundSelect(data.sounds);
    loadBuzzSounds(data.sounds);
});

socket.on("setPenaltyTime", function(data){
    penaltyTimeSpan.innerHTML = data.time;
});

socket.on("setPointsIncrement", function(data){
    if(data.points == 1){
        pointsIncrementSpan.innerHTML = data.points + " point";
    }else{
        pointsIncrementSpan.innerHTML = data.points + " points";
    }
})

socket.on("toggle", function(data){
    switch(data.attribute){
        case "locked":
            toggleLocked(data.value);
            break;
        case "playersSound":
            togglePlayersSound(data.value);
            break;
        case "oneBuzzOnly":
            toggleOneBuzzOnly(data.value);
            break;
        case "playerJoin":
            togglePlayerJoin(data.value);
            break;
        case "earlyBuzzPenalty":
            toggleEarlyBuzzPenalty(data.value);
            break;
        case "buzzList":
            toggleBuzzList(data.value);
            break;
        case "teams":
            toggleTeams(data.value);
            break;
        case "points":
            togglePoints(data.value);
            break;
        case "timer":
            toggleTimer(data.value);
            break;
        case "timerLockOnPause":
            toggleTimerLockOnPause(data.value);
            break;
        case "timerLockOnEnd":
            toggleTimerLockOnEnd(data.value);
            break;
        case "timerUnlockOnStart":
            toggleTimerUnlockOnStart(data.value);
            break;
        case "playerTimer":
            togglePlayerTimer(data.value);
            break;
        case "playerSelfJoinTeam":
            togglePlayerSelfJoinTeam(data.value);
            break;
        case "playerPlayerPointsEnabled":
            togglePlayerPlayerPoints(data.value);
            break;
        case "playerTeamPointsEnabled":
            togglePlayerTeamPoints(data.value);
            break;

    }
});

function togglePlayerSelfJoinTeam(value){
    if(value){
        playerSelfJoinTeamIcon.classList.add("fa-check");
        playerSelfJoinTeamIcon.classList.remove("fa-times");
    }else{
        playerSelfJoinTeamIcon.classList.remove("fa-check");
        playerSelfJoinTeamIcon.classList.add("fa-times");
    }
}

function togglePlayerTimer(value){
    if(value){
        playerTimerIcon.classList.add("fa-check");
        playerTimerIcon.classList.remove("fa-times");
        playerTimerIcon2.classList.add("fa-check");
        playerTimerIcon2.classList.remove("fa-times");
    }else{
        playerTimerIcon.classList.remove("fa-check");
        playerTimerIcon.classList.add("fa-times");
        playerTimerIcon2.classList.remove("fa-check");
        playerTimerIcon2.classList.add("fa-times");
    }
}

function toggleTimerResetBuzzers(){
    resetBuzzersWithTimer = !resetBuzzersWithTimer;
    if(resetBuzzersWithTimer){
        timerResetBuzzersIcon.classList.add("fa-check");
        timerResetBuzzersIcon.classList.remove("fa-times");
    }else{
        timerResetBuzzersIcon.classList.remove("fa-check");
        timerResetBuzzersIcon.classList.add("fa-times");
    }
}

function toggleTimerLockOnPause(value){
    if(value){
        timerLockOnPauseIcon.classList.add("fa-check");
        timerLockOnPauseIcon.classList.remove("fa-times");
    }else{
        timerLockOnPauseIcon.classList.remove("fa-check");
        timerLockOnPauseIcon.classList.add("fa-times");
    }
}

function toggleTimerPauseOnBuzz(){
    timerPauseOnBuzz = !timerPauseOnBuzz;
    if(timerStartOnBuzz && timerPauseOnBuzz){
        toggleTimerStartOnBuzz();
    }
    if(timerPauseOnBuzz){
        timerPauseOnBuzzIcon.classList.add("fa-check");
        timerPauseOnBuzzIcon.classList.remove("fa-times");
    }else{
        timerPauseOnBuzzIcon.classList.remove("fa-check");
        timerPauseOnBuzzIcon.classList.add("fa-times");
    }
}

function toggleTimerLockOnEnd(value){
    if(value){
        timerLockOnEndIcon.classList.add("fa-check");
        timerLockOnEndIcon.classList.remove("fa-times");
    }else{
        timerLockOnEndIcon.classList.remove("fa-check");
        timerLockOnEndIcon.classList.add("fa-times");
    }
}

function toggleTimerStartOnBuzz(){
    timerStartOnBuzz = !timerStartOnBuzz;
    if(timerStartOnBuzz && timerPauseOnBuzz){
        toggleTimerPauseOnBuzz();
    }
    if(timerStartOnBuzz){
        timerStartOnBuzzIcon.classList.add("fa-check");
        timerStartOnBuzzIcon.classList.remove("fa-times");
    }else{
        timerStartOnBuzzIcon.classList.remove("fa-check");
        timerStartOnBuzzIcon.classList.add("fa-times");
    }
}

function toggleTimerUnlockOnStart(value){
    if(value){
        timerUnlockOnStartIcon.classList.add("fa-check");
        timerUnlockOnStartIcon.classList.remove("fa-times");
    }else{
        timerUnlockOnStartIcon.classList.remove("fa-check");
        timerUnlockOnStartIcon.classList.add("fa-times");
    }
}

function toggleTeams(value){
    teamsHidden = !value;
    if(value){
        showTeams();
    }else{
        hideTeams();
    }
}

function togglePoints(value){
    pointsHidden = !value;
    if(value){
        showPoints();
    }else{
        hidePoints();
    }
}

function toggleTimer(value){
    if(value){
        showTimer();
    }else{
        hideTimer();
    }
}

function toggleBuzzList(value){
    if(value){
        buzzListIcon.classList.add("fa-check");
        buzzListIcon.classList.remove("fa-times");
    }else{
        buzzListIcon.classList.remove("fa-check");
        buzzListIcon.classList.add("fa-times");
    }
}

function toggleLocked(value){
    locked = value;
    if(value){
        lockIcon.classList.remove("fa-lock-open");
        lockIcon.classList.add("fa-lock");
    }else{
        lockIcon.classList.add("fa-lock-open");
        lockIcon.classList.remove("fa-lock");
    }
}

function togglePlayersSound(value){
    if(value){
        playersSoundIcon.classList.add("fa-volume-up");
        playersSoundIcon.classList.remove("fa-volume-off");
    }else{
        playersSoundIcon.classList.remove("fa-volume-up");
        playersSoundIcon.classList.add("fa-volume-off");
    }
}

function toggleOneBuzzOnly(value){
    if(value){
        oneBuzzOnlyIcon.classList.add("fa-check");
        oneBuzzOnlyIcon.classList.remove("fa-times");
    }else{
        oneBuzzOnlyIcon.classList.remove("fa-check");
        oneBuzzOnlyIcon.classList.add("fa-times");
    }
}

function togglePlayerJoin(value){
    if(value){
        playerJoinIcon.classList.add("fa-check");
        playerJoinIcon.classList.remove("fa-times");
    }else{
        playerJoinIcon.classList.remove("fa-check");
        playerJoinIcon.classList.add("fa-times");
    }
}

function togglePlayerPlayerPoints(value){
    if(value){
        playerPointsIcon.classList.add("fa-check");
        playerPointsIcon.classList.remove("fa-times");
    }else{
        playerPointsIcon.classList.remove("fa-check");
        playerPointsIcon.classList.add("fa-times");
    }
}

function togglePlayerTeamPoints(value){
    if(value){
        teamPointsIcon.classList.add("fa-check");
        teamPointsIcon.classList.remove("fa-times");
    }else{
        teamPointsIcon.classList.remove("fa-check");
        teamPointsIcon.classList.add("fa-times");
    }
}

function toggleEarlyBuzzPenalty(value){
    if(value){
        earlyBuzzPenaltyIcon.classList.add("fa-check");
        earlyBuzzPenaltyIcon.classList.remove("fa-times");
    }else{
        earlyBuzzPenaltyIcon.classList.remove("fa-check");
        earlyBuzzPenaltyIcon.classList.add("fa-times");
    }
}

socket.on("gameCreated", function(data){
    clearInterval(lobbyChooserBackup);
    addKeyEventListeners();
    gameCode = data.gameCode;
    playerLimit = data.playerLimit;
    hostVerifyCode = data.hostVerifyCode;
    gameIdSpan.innerHTML = gameCode;
    gameId = gameCode;
    playerLimitSpan.innerHTML = playerLimit;
    lobbyChooserModal.classList.add("invisible");
    gameModal.classList.remove("invisible");
    if(data.premium){
        premiumGame = true;
        premiumKey = data.premiumKey;
        premiumKeyExpiration = data.premiumKeyExpiration;
        soundSelect.value = "Pop";
        changeBuzzSound(soundSelect.value);
        showTeams();
        showPoints();
        premiumLinkCode = data.obfCode;
        buyPremium1.classList.add("invisible");
        buyPremium2.classList.add("invisible");
        setEarlyBuzzPenaltyTimeBtn.disabled = false;
        premiumBadge.classList.remove("invisible");
        clickToReveal.classList.remove("invisible");
        clickToRevealLink.classList.remove("invisible");
        togglePointsBtn.disabled = false;
        toggleTeamsBtn.disabled = false;
        toggleTimerBtn.disabled = false;
        secondaryTimerSettingsBtn.classList.remove("invisible");
        toggleEarlyBuzzPenaltyBtn.disabled = false;
        premiumSoundNote.classList.remove("invisible");
        setPointsIncrementBtn.disabled = false;
        roundModeBtn.disabled = false;
        timerUnlockOnStartBtn.disabled = false;
        timerLockOnEndBtn.disabled = false;
        timerLockOnPauseBtn.disabled = false;
        timerPauseOnBuzzBtn.disabled = false;
        playerSelfJoinTeamBtn.disabled = false;
        timerStartOnBuzzBtn.disabled = false;
        togglePlayerPointsBtn.disabled = false;
        removeAllPointsButton.disabled = false;
        toggleTeamPointsBtn.disabled = false;
        if(!isCookie()){
            askCookie();
            if(isCookie()){
                removeSavedKeyBtn.classList.remove("invisible");
            }else{
                removeSavedKeyBtn.classList.add("invisible");
            }
        }else{
            removeSavedKeyBtn.classList.remove("invisible");
        }
        
    }
});

socket.on("players", function(data){
    if(JSON.stringify(data.playerArr) != JSON.stringify(currentPlayers)){
        currentPlayers = data.playerArr;
        generatePlayerLines();
        generateTeamLines();
        if(!fullMessageShown && data.playerArr.length >= playerLimit){
            bootbox.alert({message: "This game has reached the player limit! (" + playerLimit + " Players)", backdrop: true});
            fullMessageShown = true;
        }
    }
});

socket.on("buzzes", function(data){
    if(JSON.stringify(data.buzzArr) != JSON.stringify(currentBuzzes)){
        currentBuzzes = data.buzzArr;
        generatePlayerLines();
        if(data.buzzArr.length != 0 && data.buzzArr.length > previousBuzzArrLength){
            playBuzzSound();
            if(timerPauseOnBuzz){
                pauseTimer();
            }else if(timerStartOnBuzz){
                startTimer();
            }
        }else if(data.buzzArr.length == 0){
            soundPlayed = false;
        }
        previousBuzzArrLength = data.buzzArr.length;
    }
});

socket.on("teams", function(data){
    if(JSON.stringify(data.teamsArr) != JSON.stringify(currentTeams)){
        currentTeams = data.teamsArr;
        generatePlayerLines();
        generateTeamLines();
    }
});

function createTeam(name){
    socket.emit("createTeam", {teamName: name});
}

function removeTeam(teamID){
    socket.emit("removeTeam", {teamID: teamID});
}

function changeTeamName(teamID, newName){
    socket.emit("changeTeamName", {teamID: teamID, newName: newName});
}

function addTeamPoint(teamID){
    socket.emit("addTeamPoint", {teamID: teamID});
}

function removeTeamPoint(teamID){
    socket.emit("removeTeamPoint", {teamID: teamID});
}

function addPlayerPoint(playerID){
    socket.emit("addPlayerPoint", {playerID: playerID});
}

function removePlayerPoint(playerID){
    socket.emit("removePlayerPoint", {playerID: playerID});
}

function updatePlayerTeam(playerID, newTeamID){
    socket.emit("updatePlayerTeam", {playerID: playerID, teamID: newTeamID});

}

function getCreateTeam(playerID){
    bootbox.prompt("What should the new team be called?", function(result){
        if(result){
            createTeam(result);
        }
        if(playerID){
            var intervalTeamSetter = setInterval(function(){
                currentTeams.forEach(function(team){
                    if(team.name == result){
                        clearInterval(intervalTeamSetter);
                        updatePlayerTeam(playerID, team.id);
                    }
                });
            }, 50);
        }
    });
}

function getChangePlayerTeam(playerID, teamID){
    this.options = [];
    this.selectedTeam = teamID;
    if(!teamID){
        this.selectedTeam = "createTeam";
    }
    currentTeams.forEach(function(team){
        this.toPush = {
            text: team.name,
            value: team.id
        };
        if(this.selectedTeam == team.id){
            this.toPush.checked = true;
        }
        if(currentTeams.indexOf(team) == currentTeams.length - 1){
            this.toPush.text += "<br><hr>"
        }
        this.options.push(this.toPush);
    });
    this.options.push({
        text: "Create new team",
        value: "__createTeam"
    });
    this.options.push({
        text: "Remove player from team",
        value: "__removeTeam"
    });
    bootbox.prompt({
        title: "Assign player to which team?",
        message: "<p>Teams</p>",
        inputType: 'radio',
        value: this.selectedTeam,
        inputOptions: this.options,
        callback: function (result) {
            if(result == "__createTeam"){
                getCreateTeam(playerID);
            }else if(result == "__removeTeam"){
                removePlayerTeam(playerID);
            }else if(result){
                updatePlayerTeam(playerID, result);
            }
        }
    });
}

function removePlayerTeam(id){
    socket.emit("removeTeamFromPlayer", {playerID: id});
}

function getChangeTeamName(id){
    bootbox.prompt("What would you like to name this team", function(result){
        if(result){
            changeTeamName(id, result);
        }
    });
}

function generateTeamLines(){
    teamsList.innerHTML = "";
    this.players = JSON.parse(JSON.stringify(currentPlayers));
    this.teams = JSON.parse(JSON.stringify(currentTeams));
    this.rankedTeams = [];
    this.teams.forEach(function(team){
        this.totPoints = team.points;
        this.players.forEach(function(player){
            if(player.teamID == team.id){
                this.totPoints += player.points;
            }
        });
        team.totPoints = this.totPoints;
        if(this.rankedTeams.length == 0){
            this.rankedTeams.push(team);
        }else{
            this.foundPlace = -1;
            for(var i = this.rankedTeams.length - 1; i >= 0; i--){
                if(this.totPoints > this.rankedTeams[i].totPoints){
                    foundPlace = i;
                }
            }
            if(this.foundPlace == -1){
                this.rankedTeams.push(team);
            }else{
                this.rankedTeams.splice(foundPlace, 0, team);
            }
        }
    });
    for(var i = 0; i < this.rankedTeams.length; i++){
        this.name = this.rankedTeams[i].name;
        this.id = this.rankedTeams[i].id;
        this.points = this.rankedTeams[i].totPoints;
        this.rank = i + 1;
        generateTeamLine(this.rank, this.name, this.id, this.points);
    }
}

function generateTeamLine(rank, name, id, points){
    this.row = document.createElement("div");
    this.row.classList.add('row');
    this.rowStuff = document.createElement("div");
    this.rowStuff.classList.add("rowStuff");
    this.remove = document.createElement("div");
    this.remove.className = "remove playerInfoEl";
    this.remove.title = "Remove team";
    this.remove.innerHTML = '<i class="fas fa-ban"></i>';
    this.remove.addEventListener('click', function(){
        bootbox.confirm({
            message: "Are you sure you wish to remove the team " + name + "?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-success'
                }
            },
            callback: function (result) {
                if(result){
                    removeTeam(id);
                }
            }
        });
    });
    this.rank = document.createElement("div");
    this.rank.className = "order playerInfoEl";
    this.rank.title = "Rank of team based on points";
    this.rank.innerHTML = rank + ". ";
    this.teamName = document.createElement("div");
    this.teamName.className = "name playerInfoEl";
    this.teamName.title = "Name of team - Click to change";
    this.teamName.innerHTML = name;
    this.teamName.addEventListener('click', function(){
        getChangeTeamName(id);
    });
    this.points = document.createElement("div");
    if(!pointsHidden){
        this.points.className = "points playerInfoEl";
        this.plus = document.createElement('span');
        this.plus.title = "Add point";
        this.plus.className = "pointChanger";
        this.plus.innerHTML = '<i class="fas fa-plus"></i>';
        this.plus.addEventListener('click', function(){
            addTeamPoint(id);
        });
        this.minus = document.createElement('span');
        this.minus.title = "Remove point";
        this.minus.className = "pointChanger";
        this.minus.innerHTML = '<i class="fas fa-minus"></i>';
        this.minus.addEventListener('click', function(){
            removeTeamPoint(id);
        });
        this.pointAmt = document.createElement("span");
        this.pointAmt.title = "Total points both given to the team and to each of the teams players";
        this.pointAmt.innerHTML = points;
        this.points.appendChild(this.minus);
        this.points.appendChild(this.pointAmt);
        this.points.appendChild(this.plus);
    }
    this.rowStuff.appendChild(this.remove);
    this.rowStuff.appendChild(this.rank);
    this.rowStuff.appendChild(this.teamName);
    this.rowStuff.appendChild(this.points);
    this.row.appendChild(this.rowStuff);
    teamsList.appendChild(this.row);
}

function generatePlayerLines(){
    playersList.innerHTML = "<em>Buzzed Players:</em>";
    this.buzzes = JSON.parse(JSON.stringify(currentBuzzes));
    this.players = JSON.parse(JSON.stringify(currentPlayers));
    this.teams = JSON.parse(JSON.stringify(currentTeams));

    for(var i = 0; i < this.buzzes.length; i++){
        this.buzzOrder = i + 1;
        this.id = this.buzzes[i].id;
        this.player = false;
        this.players.forEach(function(player){
            if(player.id == this.id){
                this.player = player;
                this.players.splice(this.players.indexOf(player), 1);
            }
        });
        this.name = this.player.name;
        this.connected = this.player.connected;
        if(!this.connected){
            this.name += " (Disconnected)";
        }
        this.points = this.player.points;
        this.team = false;
        this.teams.forEach(function(team){
            if(team.id == this.player.teamID){
                this.team = team;
            }
        });
        this.teamName = this.team.name;
        this.teamID = this.team.id;
        generatePlayerLine(this.buzzOrder, this.name, this.id, this.points, this.teamName, this.teamID);
    }
    this.br = document.createElement("br");
    this.span = document.createElement("span");
    this.span.innerHTML = "<em>Not Buzzed Players:</em>";
    playersList.appendChild(this.br);
    playersList.appendChild(this.span);
    this.players.forEach(function(player){
        this.name = player.name;
        this.connected = player.connected;
        if(!this.connected){
            this.name += " (Disconnected)";
        }
        this.id = player.id;
        this.buzzOrder = false;
        this.points = player.points;
        this.team = false;
        this.teams.forEach(function(team){
            if(team.id == player.teamID){
                this.team = team;
            }
        });
        this.teamName = this.team.name;
        this.teamID = this.team.id;
        generatePlayerLine(this.buzzOrder, this.name, this.id, this.points, this.teamName, this.teamID);
    });

}

function generatePlayerLine(buzzOrder, name, id, points, teamName, teamID){
    this.row = document.createElement("div");
    this.row.classList.add('row');
    this.rowStuff = document.createElement("div");
    this.rowStuff.classList.add("rowStuff");
    this.remove = document.createElement("div");
    this.remove.className = "remove playerInfoEl";
    this.remove.innerHTML = '<i class="fas fa-ban"></i>';
    this.remove.title = "Click to remove player";
    this.remove.addEventListener('click', function(){
        bootbox.confirm({
            message: "Are you sure you wish to remove the player " + name + "?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-success'
                }
            },
            callback: function (result) {
                if(result){
                    removePlayer(id);
                }
            }
        });
    });
    this.order = document.createElement("div");
    if(buzzOrder){
        this.order.className = "order playerInfoEl";
        this.order.title = "Order of buzzes";
        this.order.innerHTML = buzzOrder + ". ";
        this.order.addEventListener("click", function(){
                socket.emit("clearOneBuzz", {id: id});
        });
    }
    // this.buzzIndicator = document.createElement("span");
    // if(buzzOrder){
    //     this.buzzIndicator.className = "buzzIndicator playerInfoEl";
    //     this.buzzIndicator.innerHTML = '<span><i class="fas fa-circle"></i></span>';
    //     this.buzzIndicator.title = "Buzz Indicator - Click to individually remove buzz";
    // }else{
    //     // this.buzzIndicator.innerHTML = '<span><i class="far fa-circle"></i></span>';
    // }
    // this.buzzIndicator.addEventListener("click", function(){
    //     socket.emit("clearOneBuzz", {id: id});
    // });
    this.playerName = document.createElement("div");
    this.playerName.title = "Name of player - Click to change";
    this.playerName.className = "name playerInfoEl";
    this.playerName.innerHTML = name;
    this.playerName.addEventListener('click', function(){
        bootbox.prompt("What would you like to name this player?", function(name){
            if(name){
                renamePlayer(id, name);
            }
        });
    });
    this.points = document.createElement("div");
    if(!pointsHidden){
        this.points.className = "points playerInfoEl";
        this.plus = document.createElement('span');
        this.plus.title = "Add point";
        this.plus.className = "pointChanger";
        this.plus.innerHTML = '<i class="fas fa-plus"></i>';
        this.plus.addEventListener('click', function(){
            addPlayerPoint(id);
        });
        this.minus = document.createElement('span');
        this.minus.title = "Remove point";
        this.minus.className = "pointChanger";
        this.minus.innerHTML = '<i class="fas fa-minus"></i>';
        this.minus.addEventListener('click', function(){
            removePlayerPoint(id);
        });
        this.pointAmt = document.createElement("span");
        this.pointAmt.innerHTML = points;
        this.points.appendChild(this.minus);
        this.points.appendChild(this.pointAmt);
        this.points.appendChild(this.plus);
    }
    this.team = document.createElement("div");
    if(!teamsHidden){
        this.team.className = "team playerInfoEl";
        if(teamName){
            this.team.innerHTML = "<button class='btn btn-outline-secondary'>" + teamName + "</button>";
        }else{
            this.team.innerHTML = "<button class='btn btn-outline-secondary'>No Team Assigned</button>";
        }
        this.team.addEventListener('click', function(){
            getChangePlayerTeam(id, teamID);
        });
    }
    this.rowStuff.appendChild(this.remove);
    this.rowStuff.appendChild(this.order);
    // this.rowStuff.appendChild(this.buzzIndicator);
    this.rowStuff.appendChild(this.playerName);
    this.rowStuff.appendChild(this.points);
    this.rowStuff.appendChild(this.team);
    this.row.appendChild(this.rowStuff);
    playersList.appendChild(this.row);
}

function showTeams(){
    teamsIcon.classList.remove("fa-times");
    teamsIcon.classList.add("fa-check");
    teamsHidden = false;
    teamsDiv.classList.remove("invisible");
    generatePlayerLines();
    generateTeamLines();
}

function hideTeams(){
    teamsIcon.classList.add("fa-times");
    teamsIcon.classList.remove("fa-check");
    teamsHidden = true;
    teamsDiv.classList.add("invisible");
    generatePlayerLines();
    generateTeamLines();
}

function showPoints(){
    pointsIcon.classList.remove("fa-times");
    pointsIcon.classList.add("fa-check");
    pointsHidden = false;
    generatePlayerLines();
    generateTeamLines();
}

function hidePoints(){
    pointsIcon.classList.add("fa-times");
    pointsIcon.classList.remove("fa-check");
    pointsHidden = true;
    generatePlayerLines();
    generateTeamLines();
}

function showTimer(){
    timerIcon.classList.remove("fa-times");
    timerIcon.classList.add("fa-check");
    timerArea.classList.remove("invisible");
}

function hideTimer(){
    timerIcon.classList.add("fa-times");
    timerIcon.classList.remove("fa-check");
    timerArea.classList.add("invisible");
}



window.onbeforeunload = function(e) {
    this.socket.disconnect();
};

function askCookie(){
    bootbox.confirm({
        title: "Save Key?",
        message: "Would you like to save a cookie to your computer to remember you premium key? (Beware: This does not always work. Save your key elseware too!)",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Confirm'
            }
        },
        backdrop: true,
        callback: function (result) {
            if(result){
                createCookie();
            }
        }
    });
}
var daysTillExpiration;
function createCookie(){
    daysTillExpiration = (((((premiumKeyExpiration - Date.now()) /1000)/60)/60)/24);
    Cookies.set("premiumKey", premiumKey, {expires: daysTillExpiration});
}

var cookieKey;
function isCookie(){
    cookieKey = Cookies.get("premiumKey");
    if(cookieKey){
        premiumKey = cookieKey;
        return true;
    }
    return false;
}

function deleteCookie() {
    Cookies.remove("premiumKey");
}

function addKeyEventListeners(){
    document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.key;
        if(charCode == " " && evt.target == document.body){
            evt.preventDefault();
            removeAllBuzzes();
        } 
        
        if(charCode == "s" && evt.target == document.body){
            evt.preventDefault();
            if(timerRunning){
                pauseTimer();
            }else{
                startTimer();
            }
        } 
        
        if(charCode == "q" && evt.target == document.body){
            evt.preventDefault();
            askForTimerChange();
        } 
        
        if(charCode == "r" && evt.target == document.body){
            evt.preventDefault();
            resetTimer();
        } 
        
        if(charCode == "p" && evt.target == document.body){
            evt.preventDefault();
            pauseTimer();
        } 
        
        if(charCode == "c" && evt.target == document.body){
            evt.preventDefault();
            removeAllBuzzes();
        } 
        
        if(charCode == "l" && evt.target == document.body){ //lowercase L
            evt.preventDefault();
            socket.emit("toggleLock");
        } 
    };
}

function removeAllPoints(){
    bootbox.confirm({
        message: "Are you sure you wish to reset the points?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No',
                className: 'btn-success'
            }
        },
        callback: function (result) {
            if(result){
                socket.emit("resetPoints");
            }
        }
    });
}

function removeAllPlayers(){
    bootbox.confirm({
        message: "Are you sure you wish to remove ALL players?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-danger'
            },
            cancel: {
                label: 'No',
                className: 'btn-success'
            }
        },
        callback: function (result) {
            if(result){
                currentPlayers.forEach(function(player){
                    removePlayer(player.id);
                });
            }
        }
    });
}

changeBuzzSound("Default");

function startTimer(){
    if(!timerRunning){
        if(currentTimer == 0){
            currentTimer = timerDefault;
            updateTimerDisplay();
        }
        lastPingedCounter = 0;
        timerRunning = true;
        timer = setInterval(updateTimer, 100);
        socket.emit("timerStart", {time: currentTimer});
    }
}

function pauseTimer(){
    if(timerRunning){
        clearInterval(timer);
        updateTimerDisplay();
        socket.emit("timerPause", {time: currentTimer});
        timerRunning = false;
    }
}

function resetTimer(){
    clearInterval(timer);
    currentTimer = timerDefault;
    updateTimerDisplay();
    socket.emit("timerReset", {time: currentTimer});
    timerRunning = false;
}

function askForTimerChange(){
    bootbox.prompt("What would you like to set the timer to (in seconds)?", function(result){
        if(result && isInt(result * 1000)){
            timerChange(result * 1000);
        }else if(!isInt(result * 1000)){
            bootbox.alert({message: "Please input a number", backdrop: true});
        }
    });
}

function timerChange(newTime){
    timerDefault = newTime;
    resetTimer();
}

function timerEnd(){
    clearInterval(timer);
    socket.emit("timerEnd");
    timerRunning = false;
}

function updateTimer(){
    lastPingedCounter++;
    currentTimer -= 100;
    //Every 5 seconds
    if(lastPingedCounter >= 50){
        //keeps players both update to date and gives timer to players who have joined since last timer start
        socket.emit("timerStart", {time: currentTimer});
        lastPingedCounter = 0;
    }
    if(currentTimer <= 0){
        if(playTimerEndSound){
            timerEndSound.play();
        }
        currentTimer = 0;
        timerEnd(timer);
    }
    updateTimerDisplay();
}

function updateTimerDisplay(){
    timerDisplay.innerHTML = currentTimer / 1000 + " s";
}

updateTimerDisplay();