var socket = io.connect("/");
var joinBtn = document.getElementById("joinBtn");
var buzzBtn = document.getElementById("buzzer");
var gameIdInput = document.getElementById("gameId");
var gameIdDisplay = document.getElementById("gameIdDisplay");
var nicknameInput = document.getElementById("nickname");
var startHidden = document.getElementsByClassName("startHidden");
var splash = document.getElementById("splash");
var ping = document.getElementById("ping");
var muteBox = document.getElementById("mute");
var pings = [0, 0, 0, 0, 0, 0, 0];
var noConnection = document.getElementById("noConnection");
var buzzSpinner = document.getElementById("buzzSpinner");
var playerBuzzes = document.getElementById("playerBuzzes");
var buzzListContainer = document.getElementById("playerBuzzesContainer");
var buzzerContainer = document.getElementById("buzzerContainer");
var soundBar = document.getElementsByClassName("sound")[0];
var nameSpan = document.getElementById("nameSpan");
var teamSpan = document.getElementById("teamSpan");
var teamLine = document.getElementById("teamLine");
var timerDisplay = document.getElementById("timerDisplay");
var timerArea = document.getElementById("roundTimer");
var teamPointsBtn = document.getElementById("teamPointsBtn");
var playerPointsBtn = document.getElementById("playerPointsBtn");
var pointsContainer = document.getElementById("pointsContainer");
var pointsList = document.getElementById("pointsList");
var timer = false;
var playerSelfJoinTeam = true;
var currentTimer = 10000;
var premium = false;
var teams = [];
var teamsEnabled = false;
var buzzListEnabled = true;
var timerEnabled = true;
var wasBuzzed = false;
var locked = false;
var penalty = false;
var nickname;
var team = false;
var inGame = false;
var wasConnected = false;
var playersSound = true;
var soundPlayed = false;
var disconnected = true;
var errShowing = false;
var id = false;
var points = {
  teams: [],
  players: []
};
var playerTeamPointsEnabled = false;
var playerPlayerPointsEnabled = false;
var teamPointsSelected = true;

var buzzSoundsObj = {
  Default: new Howl({
    src: ["/sounds/Default.mp3"],
    rate: 1.0
  })
};
var buzzSound = {};
var currSound = "Default";

var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

if (gameCode) {
  bootbox.prompt(
    "Please enter a nickname (15 chararacters or less)",
    function (nickEntered) {
      changeNickname(nickEntered);
      sendCode();
    }
  );
}

function changeBuzzSound(newSound) {
  currSound = newSound;
  buzzSound = buzzSoundsObj[newSound];
}

buzzBtn.addEventListener("click", function () {
  sendBuzz();
});

buzzBtn.addEventListener("touchend", function () {
  sendBuzz();
});

joinBtn.addEventListener("click", function () {
  gameCode = gameIdInput.value;
  changeNickname(nicknameInput.value);
  sendCode();
});

teamSpan.addEventListener("click", function () {
  changeTeamPrompt();
});

teamPointsBtn.addEventListener("click", function () {
  teamPointsSelected = true;
  updatePoints();
});

playerPointsBtn.addEventListener("click", function () {
  teamPointsSelected = false;
  updatePoints();
});

socket.on("connection", function (data) {
  console.log(data);
  noConnection.classList.add("invisible");
  //remove buzz if reconnecting and missed clearBuzzer event
  setBackgroundToUnlocked();
  buzzBtn.classList.remove("buzzed");

  if (wasConnected) {
    sendCode();
  }
  wasConnected = true;
});

socket.on("disconnect", function () {
  noConnection.classList.remove("invisible");
  disconnected = true;
});

socket.on("ding", function () {
  socket.emit("dong");
});

socket.on("buzzed", function (data) {
  buzzed();
});

socket.on("clear", function (data) {
  clear();
});

socket.on("err", function (data) {
  if (!errShowing) {
    bootbox.alert({ message: data.message, backdrop: true });
    errShowing = true;
    var errorRemover = setInterval(function () {
      errShowing = false;
      clearInterval(errorRemover);
    }, 1000);
  }
});

socket.on("full", function (data) {
  bootbox.alert({
    message: "Sorry, this game has reached its max amount of players!",
    backdrop: true
  });
});

socket.on("joinedGame", function (data) {
  removeSplash();
  inGame = true;
  disconnected = false;
  id = data.id;
  gameIdDisplay.innerHTML = data.code;
});

socket.on("reload", function (data) {
  bootbox.alert({ message: data.message, backdrop: true });
  setInterval(function () {
    window.location.href = "/";
  }, 4000);
});

socket.on("soundChange", function (data) {
  changeBuzzSound(data.newSound);
});

socket.on("buzzSounds", function (data) {
  loadBuzzSounds(data.sounds);
});

socket.on("toggle", function (data) {
  switch (data.attribute) {
    case "locked":
      toggleLocked(data.value);
      break;
    case "playersSound":
      togglePlayersSound(data.value);
      break;
    case "buzzList":
      toggleBuzzList(data.value);
      break;
  }
});

function toggleLocked(value) {
  if (value) {
    lockBuzzer();
  } else if (penalty) {
    locked = false;
  } else {
    unlocked();
  }
}

function togglePlayersSound(value) {
  if (value) {
    playersSoundOn();
  } else {
    playersSoundOff();
  }
}

function toggleBuzzList(value) {
  if (value) {
    buzzListOn();
  } else {
    buzzListOff();
  }
}

function buzzListOn() {
  buzzListContainer.classList.remove("invisible");
  buzzerContainer.classList.add("col-md-8");
}

function buzzListOff() {
  buzzListContainer.classList.add("invisible");
  buzzerContainer.classList.remove("col-md-8");
}

socket.on("update", function (data) {
  removeSpinner();
  if (data.locked && !penalty && !data.buzzed) {
    lockBuzzer();
  } else if (!data.locked && !penalty) {
    unlocked();
  }
  if (data.buzzed) {
    buzzed();
  } else if (!data.locked && !penalty) {
    wasBuzzed = false;
    unlocked();
  }
  if (data.playersSound) {
    playersSoundOn();
  } else {
    playersSoundOff();
  }
  if (currSound != data.buzzSound) {
    changeBuzzSound(data.buzzSound);
  }
  if (nickname != data.name) {
    changeNickname(data.name);
  }
  if (team != data.team) {
    changeTeam(data.team);
  }
  if (premium != data.premium) {
    premium = data.premium;
  }
  if (teams != data.teams) {
    teams = data.teams;
  }
  if (points != data.points) {
    points = data.points;
    updatePoints();
  }
  if (playerTeamPointsEnabled != data.playerTeamPointsEnabled) {
    playerTeamPointsEnabled = data.playerTeamPointsEnabled;
    updatePoints();
  }
  if (playerPlayerPointsEnabled != data.playerPlayerPointsEnabled) {
    playerPlayerPointsEnabled = data.playerPlayerPointsEnabled;
    updatePoints();
  }
  if (teamsEnabled != data.teamsEnabled) {
    if (data.teamsEnabled) {
      showTeamStuff();
    } else {
      hideTeamStuff();
    }
    teamsEnabled = data.teamsEnabled;
  }
  if (timerEnabled != data.timerEnabled) {
    if (data.timerEnabled) {
      showTimer();
    } else {
      hideTimer();
    }
    timerEnabled = data.timerEnabled;
  }
  if (buzzListEnabled != data.buzzListEnabled) {
    toggleBuzzList(data.buzzListEnabled);
    buzzListEnabled = data.buzzListEnabled;
  }
  if (playerSelfJoinTeam != data.playerSelfJoinTeam) {
    playerSelfJoinTeam = data.playerSelfJoinTeam;
  }
});

socket.on("penalty", function (data) {
  removeSpinner();
  if (data.value) {
    setBackgroundToPenalty();
    penalty = true;
  } else {
    penalty = false;
    if (!locked) {
      unlocked();
    } else {
      setBackgroundToLocked();
    }
  }
});

socket.on("buzzes", function (data) {
  playerBuzzes.innerHTML = "";
  data.buzzes.forEach(function (buzz) {
    if (buzz.team) {
      buzz.username += " (" + buzz.team + ")";
    }
    if (buzz.id) {
      buzz.username += " [YOU]";
    }
    if (data.buzzes.indexOf(buzz) < 3) {
      this.div = generateListLine(
        buzz.username,
        data.buzzes.indexOf(buzz) + 1 + "."
      );
      playerBuzzes.appendChild(this.div);
    }
    if (data.buzzes.indexOf(buzz) >= 3 && buzz.id) {
      this.divs = generateYourListLine(
        buzz,
        data.buzzes.indexOf(buzz) + 1 + "."
      );
      playerBuzzes.appendChild(this.div[0]);
      playerBuzzes.appendChild(this.div[1]);
    }
  });
});

socket.on("changeName", function (data) {
  changeNickname(data.name);
});

socket.on("changeTeam", function (data) {
  changeTeam(data.team);
});

socket.on("timerStart", function (data) {
  startTimer(data.time);
});

socket.on("timerStop", function (data) {
  setTimerStopped(data.time);
});

function changeNickname(name) {
  nickname = name;
  nameSpan.innerHTML = name;
}

function showTeamStuff() {
  teamLine.classList.remove("invisible");
}

function hideTeamStuff() {
  teamLine.classList.add("invisible");
}

function showTimer() {
  timerArea.classList.remove("invisible");
}

function hideTimer() {
  timerArea.classList.add("invisible");
}

function changeTeam(newTeam) {
  team = newTeam;
  if (teams.length === 0) {
    teamSpan.innerHTML = "No Teams Available";
  } else if (team.id) {
    teamSpan.innerHTML = team.name;
  } else {
    if (playerSelfJoinTeam) {
      teamSpan.innerHTML = "Join Team";
    } else {
      teamSpan.innerHTML = "No Team";
    }
  }
}

function changeTeamPrompt() {
  if (playerSelfJoinTeam) {
    this.options = [];
    if (!team.id) {
      this.selectedTeam = "createTeam";
    } else {
      this.selectedTeam = team.id;
    }
    teams.forEach(function (team) {
      this.toPush = {
        text: team.name,
        value: team.id
      };
      if (this.selectedTeam == team.id) {
        this.toPush.checked = true;
      }
      if (teams.indexOf(team) == teams.length - 1) {
        this.toPush.text += "<br><hr>";
      }
      this.options.push(this.toPush);
    });
    this.options.push({
      text: "No team",
      value: "__removeTeam"
    });
    bootbox.prompt({
      title: "Assign self to which team?",
      message: "<p>Teams</p>",
      inputType: "radio",
      value: this.selectedTeam,
      inputOptions: this.options,
      callback: function (result) {
        if (result == "__removeTeam") {
          removePlayerTeam();
        } else if (result) {
          updatePlayerTeam(result);
        }
      }
    });
  } else {
    bootbox.alert("Self joining teams is disabled!");
  }
}

function updatePlayerTeam(teamID) {
  socket.emit("updateTeam", { teamID: teamID });
}

function removePlayerTeam() {
  socket.emit("removeTeam");
}

function generateListLine(name, num) {
  this.div = document.createElement("div");
  this.div.innerHTML = num + " " + name;
  return this.div;
}

function generateYourListLine(name, num) {
  this.dots = document.createElement("div");
  this.dots.innerHTML = "...";
  this.div = document.createElement("div");
  this.div.innerHTML = num + " " + name;
  return [this.dots, this.div];
}

function buzzed() {
  if (muteBox.checked && playersSound && !soundPlayed) {
    buzzSound.play();
    soundPlayed = true;
  }
  removeSpinner();
  setBackgroundToBuzzed();
  buzzBtn.classList.add("buzzed");
  wasBuzzed = true;
}

function addSpinner() {
  buzzSpinner.classList.add("spinner-border");
}

function removeSpinner() {
  buzzSpinner.classList.remove("spinner-border");
}

function clear() {
  removeSpinner();
  if (locked) {
    wasBuzzed = false;
  } else {
    setBackgroundToUnlocked();
    buzzBtn.classList.remove("buzzed");
    wasBuzzed = false;
  }
  soundPlayed = false;
}

function lockBuzzer() {
  buzzBtn.classList.remove("buzzed");
  setBackgroundToLocked();
  locked = true;
}

function unlocked() {
  locked = false;
  if (wasBuzzed) {
    setBackgroundToBuzzed();
    buzzBtn.classList.add("buzzed");
  } else {
    setBackgroundToUnlocked();
    buzzBtn.classList.remove("buzzed");
  }
}

function setBackgroundToBuzzed() {
  buzzBtn.classList.remove("buzzBackground");
  buzzBtn.classList.add("buzzedBackground");
  buzzBtn.classList.remove("lockedBackground");
  buzzBtn.classList.remove("penaltyBackground");
}

function setBackgroundToUnlocked() {
  buzzBtn.classList.add("buzzBackground");
  buzzBtn.classList.remove("buzzedBackground");
  buzzBtn.classList.remove("lockedBackground");
  buzzBtn.classList.remove("penaltyBackground");
  buzzBtn.classList.remove("buzzed");
}

function setBackgroundToPenalty() {
  buzzBtn.classList.remove("buzzBackground");
  buzzBtn.classList.remove("buzzedBackground");
  buzzBtn.classList.remove("lockedBackground");
  buzzBtn.classList.add("penaltyBackground");
}

function setBackgroundToLocked() {
  buzzBtn.classList.remove("buzzBackground");
  buzzBtn.classList.remove("buzzedBackground");
  buzzBtn.classList.add("lockedBackground");
  buzzBtn.classList.remove("penaltyBackground");
}

function playersSoundOn() {
  playersSound = true;
  muteBox.disabled = false;
  soundBar.classList.remove("invisible");
}

function playersSoundOff() {
  playersSound = false;
  muteBox.disabled = true;
  soundBar.classList.add("invisible");
}

var resender = false;
function sendBuzz() {
  if (!disconnected) {
    socket.emit("buzz");
    clearInterval(resender);
    resender = false;
    if (!locked && !penalty) {
      buzzed();
    }
  } else if (!resender) {
    resender = setInterval(function () {
      sendBuzz();
    }, 100);
  }
}

function sendCode() {
  socket.emit("playerConnect", {
    username: nickname,
    code: gameCode,
    id: id
  });
}

var obj;
var sounder;
function loadBuzzSounds(sounds) {
  obj = {};
  sounds.forEach(function (sound) {
    sounder = new Howl({
      src: ["/sounds/" + sound + ".mp3"],
      rate: 1.0
    });
    obj[sound] = sounder;
  });
  buzzSoundsObj = obj;
}

function removeSplash() {
  splash.classList.add("invisible");
  for (var i = 0; i < startHidden.length; i++) {
    startHidden[i].classList.remove("invisible");
  }
}

var spacebarHasBeenReleased = true;
var bHasBeenReleased = true;
var sHasBeenReleased = true;
document.onkeypress = function (evt) {
  evt = evt || window.event;
  var charCode = evt.key;

  if (charCode == " " && inGame && spacebarHasBeenReleased) {
    spacebarHasBeenReleased = false;
    sendBuzz();
  }

  if (charCode == "b" && inGame && bHasBeenReleased) {
    bHasBeenReleased = false;
    sendBuzz();
  }

  if (charCode == "s" && inGame && sHasBeenReleased) {
    sHasBeenReleased = false;
    muteBox.checked = !muteBox.checked;
  }
};

document.onkeyup = function (evt) {
  evt = evt || window.event;
  var charCode = evt.key;
  if (charCode == " " && inGame && !spacebarHasBeenReleased) {
    spacebarHasBeenReleased = true;
  }

  if (charCode == "b" && inGame && !bHasBeenReleased) {
    bHasBeenReleased = true;
  }

  if (charCode == "s" && inGame && !sHasBeenReleased) {
    sHasBeenReleased = true;
  }
};

function startTimer(time) {
  currentTimer = time;
  updateTimerDisplay();
  clearInterval(timer);
  timer = setInterval(updateTimer, 100);
}

function setTimerStopped(time) {
  clearInterval(timer);
  currentTimer = time;
  updateTimerDisplay();
}

function updateTimer(time) {
  currentTimer -= 100;
  if (currentTimer <= 0) {
    currentTimer = 0;
    clearInterval(timer);
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  timerDisplay.innerHTML = currentTimer / 1000 + " s";
}

function updatePoints() {
  if (teamPointsSelected && !playerTeamPointsEnabled) {
    teamPointsSelected = false;
  }

  if (!playerTeamPointsEnabled && !playerPlayerPointsEnabled) {
    pointsContainer.classList.add("invisible");
  } else {
    pointsContainer.classList.remove("invisible");
  }

  if (!playerTeamPointsEnabled) {
    teamPointsBtn.classList.add("invisible");
  } else {
    teamPointsBtn.classList.remove("invisible");
  }

  if (!playerPlayerPointsEnabled) {
    playerPointsBtn.classList.add("invisible");
  } else {
    playerPointsBtn.classList.remove("invisible");
  }

  if (teamPointsSelected) {
    pointsList.innerHTML = "";
    this.teams = points.teams;
    this.players = points.players;
    this.rankedTeams = [];
    this.teams.forEach(function (team) {
      this.totPoints = team.points;
      this.players.forEach(function (player) {
        if (player.teamID == team.id) {
          this.totPoints += player.points;
        }
      });
      team.totPoints = this.totPoints;
      if (this.rankedTeams.length == 0) {
        this.rankedTeams.push(team);
      } else {
        this.foundPlace = -1;
        for (var i = this.rankedTeams.length - 1; i >= 0; i--) {
          if (this.totPoints > this.rankedTeams[i].totPoints) {
            foundPlace = i;
          }
        }
        if (this.foundPlace == -1) {
          this.rankedTeams.push(team);
        } else {
          this.rankedTeams.splice(foundPlace, 0, team);
        }
      }
    });

    this.rankedTeams.forEach(function (team) {
      this.div = generateListLine(team.totPoints, team.name + " -");
      pointsList.appendChild(this.div);
    });
    if (this.rankedTeams.length == 0) {
      this.div = generateListLine("", "No teams found");
      pointsList.appendChild(this.div);
    }
  } else if (playerPlayerPointsEnabled) {
    pointsList.innerHTML = "";
    this.rankedPlayers = [];
    points.players.forEach(function (player) {
      if (this.rankedPlayers.length == 0) {
        this.rankedPlayers.push(player);
      } else {
        this.foundPlace = -1;
        for (var i = this.rankedPlayers.length - 1; i >= 0; i--) {
          if (player.points > this.rankedPlayers[i].points) {
            foundPlace = i;
          }
        }
        if (this.foundPlace == -1) {
          this.rankedPlayers.push(player);
        } else {
          this.rankedPlayers.splice(foundPlace, 0, player);
        }
      }
    });

    this.rankedPlayers.forEach(function (player) {
      if (player.isYou) {
        this.div = generateListLine(
          player.points,
          player.username + " [YOU] -"
        );
      } else {
        this.div = generateListLine(player.points, player.username + " -");
      }
      pointsList.appendChild(this.div);
    });
  }
}

updateTimerDisplay();
changeBuzzSound("Default");
