app.controller("chatController", [
  "$scope",
  "chatFactory",
  ($scope, chatFactory) => {
    /**
     * angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";
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
    $scope.newMessage = () => {
      socket.emit("newMessage", {
        message: $scope.message,
        roomId: $scope.roomId,
      });
      $scope.message = "";
    };
    $scope.switchRoom = (room) => {
      $scope.chatName = room.name;
      $scope.roomId = room.id;
      $scope.chatClicked = true;
      chatFactory.getMessages(room.id).then((data) => {
        console.log(data);
      });
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
