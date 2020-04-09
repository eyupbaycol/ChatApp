app.controller("chatController", [
  "$scope",
  "chatFactory",
  "userFactory",
  "configFactory",
  ($scope, chatFactory,userFactory,configFactory) => {
    /**
     * initialization
     */
    function init(){
      userFactory.getUser().then(user=>{
       $scope.user = user;
      })
    }
    init()
    /**
     * angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.loadingMessages = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";
    $scope.messages=[];
    $scope.user = {}
    $scope.server = ""
    /**
     * socket.io event handling
     */
    configFactory.getConfig().then((data) => {
      $scope.server = data;
    });
    const socket = io.connect($scope.server.socketUrl);
    socket.on("onlineList", (users) => {
      $scope.onlineList = users;
      $scope.$apply();
    });
    socket.on("roomList", (rooms) => {
      $scope.roomList = rooms;
      $scope.$apply();
    });
    $scope.newMessage = () => {
      if($scope.message.trim()){
        socket.emit("newMessage", {
          message: $scope.message,
          roomId: $scope.roomId,
        });
         $scope.messages[$scope.roomId].push({
           message : $scope.message,
           userId : $scope.user._id,
           name: $scope.user.username,
           username : $scope.user.surname
         }) 
        $scope.message = "";
      }
    };
    socket.on('receiveMessage',message =>{
      $scope.messages[message.roomId].push({
        message : message.message,
        userId : message.userId,
        name: message.username,
        username :message.surname
      }) 
    })
    $scope.switchRoom = (room) => {
      $scope.chatName = room.name;
      $scope.roomId = room.id;
      $scope.chatClicked = true;
      if(!$scope.messages.hasOwnProperty(room.id)){
        $scope.loadingMessages = true;
        console.log("servise bağlanıyor")
        chatFactory.getMessages(room.id).then((data) => {
          $scope.messages[room.id] = data ;
          $scope.loadingMessages = false;
        });
      }
      
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
