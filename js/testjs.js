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
  }, {scope: 'public_profile,email'});

}

// Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log(response);      
    });
  }