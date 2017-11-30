var angularFire = angular.module('angularFire', ['firebase', 'angular.filter']);

angularFire.controller("base64Ctrl", function($scope, $firebaseArray) {
  
  var ref = new Firebase("https://mtlexplained.firebaseio.com/");
  var post = new Firebase("https://mtlexplained.firebaseio.com/posts");
  
  $scope.posts = $firebaseArray(post);

  var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

  $scope.uploadPost = function() {
    var description = $("#nameDescription").val();
    $scope.posts.$add({
      date: Firebase.ServerValue.TIMESTAMP,
      base64: window.localStorage.getItem("uploadedPic"),
      description: description,
      location: JSON.parse(window.localStorage.getItem("userLoc")),
      locName: window.localStorage.getItem("locTag"),
      role: window.localStorage.getItem('userRole'),
      username: window.localStorage.getItem('userName'),
      profilePic: 'https://68.media.tumblr.com/avatar_d5db9f21cb9c_128.png'
    }).then(result =>{
      window.location.href = './post_detail.html?postId=' + result.key();            
    });
  }

  $scope.deletepost = function(postid) {
    var r = confirm("Do you want to remove this image ?");
    if (r == true) {
      $scope.posts.forEach(function(childSnapshot) {
        if (childSnapshot.$id == postid) {
            $scope.posts.$remove(childSnapshot).then(function(ref) {
              ref.key() === childSnapshot.$id;
            });
        }
      });
    }
  }
});