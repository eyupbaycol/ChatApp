app.controller("chatController", [
  "$scope",
  ($scope) => {
    /**
     * angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName = "";
    /**
     * socket.io event handling
     */
    const socket = io.connect("http://localhost:3000");
    socket.on("onlineList", (users) => {
      $scope.onlineList = users;
      $scope.$apply();
    });
    socket.on("roomList", (rooms) => {
      $scope.roomList = rooms;
      $scope.$apply();
    });
    $scope.switchRoom = (room) => {
      $scope.chatName = room.roomName;
      $scope.chatClicked = true;
    };
    $scope.newRoom = () => {
      let roomName = window.prompt("Enter room name");
      if (roomName) socket.emit("newRoom", roomName);
      // let randomName = Math.random().toString(36).substring(7);
    };
    $scope.changeTab = (tab) => {
      $scope.activeTab = tab;
    };
  },
]);
