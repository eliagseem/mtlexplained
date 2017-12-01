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

                  $scope.posts.$add({
                    date: Firebase.ServerValue.TIMESTAMP,
                    dateTag: Date.now(),
                    base64: fileLoadedEvent.target.result,
                    description: description,
                    location: JSON.parse(window.localStorage.getItem("userLoc")),
                    locName: window.localStorage.getItem("locTag"),
                    role: window.localStorage.getItem('userRole'),
                    username: window.localStorage.getItem('userName'),
                    profilePic: 'https://firebasestorage.googleapis.com/v0/b/mtlexplained.appspot.com/o/blank.png?alt=media&token=189d8183-79c1-44f8-8876-12e162ca291a'
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
});
