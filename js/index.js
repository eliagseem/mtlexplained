var angularFire = angular.module('angularFire', ['firebase', 'angular.filter']);

angularFire.controller("base64Ctrl", function($scope, $firebaseArray) {
  
  var ref = new Firebase("https://mtlexplained.firebaseio.com/");
  var post = new Firebase("https://mtlexplained.firebaseio.com/posts");
  
  $scope.posts = $firebaseArray(post);

  var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

  $scope.uploadPost = function() {

    var sFileName = $("#nameImg").val();
    var description = $("#nameDescription").val();
    if (sFileName.length > 0) {

      var blnValid = false;

      for (var j = 0; j < _validFileExtensions.length; j++) {

        var sCurExtension = _validFileExtensions[j];

        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {

          blnValid = true;
          var filesSelected = document.getElementById("nameImg").files;
          
          if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {
              var textAreaFileContents = document.getElementById(
                "textAreaFileContents"
              );

              $scope.posts.$add({
                date: Firebase.ServerValue.TIMESTAMP,
                base64: fileLoadedEvent.target.result,
                description: description,
                location: userLoc,
                locName: locTag,
                role: 'Student',
                username: 'presentation4u',
                profilePic: 'https://68.media.tumblr.com/avatar_d5db9f21cb9c_128.png'
              }).then(result =>{
                window.location.href = './post_detail.html?postId=' + result.key();            
              });
            };

            fileReader.readAsDataURL(fileToLoad);
          }
          break;
        }
      }

      if (!blnValid) {
        alert('File is not valid');
        return false;
      }
    }

    return true;
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