// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        testAPI();
        $("status").hide();
      }
      else {
        var button = document.createElement("button");
        button.onclick = function(){fblogin();};
        button.innerHTML = "Login";
        document.getElementById("status").appendChild(button);
      }
  }
window.fbAsyncInit = function() {
    FB.init({
      appId      : '154303654934425',
      xfbml      : true,
      version    : 'v2.5'
    });

    //login
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var fblogin = function() {
  FB.login(function(){
    //login
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }, {scope: 'public_profile,email,user_about_me,user_photos,publish_actions'});

}

// Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=cover,bio,first_name', function(response) {
      console.log(response);
      document.getElementById("coverPhoto").src = response.cover.source;
      document.getElementById("coverPhotoLink").href = response.cover.source;
      document.getElementById("nameHolder").innerHTML = "Hello " + response.first_name;
      document.getElementById("bioHolder").innerHTML = "Your Bio: " + response.bio;
      getPhotos();
    });
  }

  function getPhotos() {
    FB.api('/10101892888153924?fields=photos.limit(10){picture,name}', function(response) {
      console.log(response);
      var photoArray = response.photos.data;
      var photoCounter = 0;
      for (var i = 1; i<= photoArray.length/3; i++) {
        var row = document.createElement("div");
        $(row).addClass("row");

        for (var x = 0; x< 3; x++) {
          console.log(photoCounter);
          if (photoCounter >= photoArray.length) {
            continue;
          }
          var col = document.createElement("div");
          $(col).addClass("col-md-4 text-center");

          var img = document.createElement("img");
          img.src= photoArray[photoCounter].picture;

          var caption = document.createElement("p");
          caption.innerHTML = photoArray[photoCounter].name;

          col.appendChild(img);
          col.appendChild(caption);
          row.appendChild(col);
          photoCounter++;

        }
        document.getElementById("photoBox").appendChild(row);
      }
    });
  }

  $("#submitButton").click(function() {
    var photourl = document.getElementById("photoURL").value;
    var messageText = document.getElementById("messageBox").value;
    console.log(photourl);
    FB.api(
      '/10101892888153924/photos',
      'POST',
      {
        'url': photourl,
        'message': messageText
      },
      function (response) {
        console.log(response);
      }
    );
  });
