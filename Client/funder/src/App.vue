

<template>

  <div id="app">

    <div id="header">
      <h1 id="header-title">funder</h1>
      <div id="account-text" v-on:click="loginButtonClicked()"><i class="fa fa-user" aria-hidden="true"></i>
        {{ loginName }}</div>
    </div>
    <div id="header-content" v-bind:class="{'header-expanded':headerExpanded}">
      <div id="funder-about" class="normal-text">
        "don't use straight black or boxes in interface design" - Professor Andy Cockburn
        <br><br>
        funder was designed with the ideologies of brutal simplicity and monochromatic croudfunding.
        <br><br>
        it is as simple as black and white, an idea that governs both the website and it’s inherit design as well as the crowdfunding experience within the website. everything is designed with an intuitive purpose absent of manuals and documentation; everything just works.
        <br><br>
        to your distaste, you shall find no pleasure in drop shadows, gradients, border radius or anything but the colour #000. the modern design guidelines of apple, google and microsoft have been ignored in favour of black box borders, san-serif fonts and brutal sharp squares. i think its ugly, you probably do too, but thats what i like about it.
        <br><br>
        i have designed many websites before, but nothing black and white and even a bit brutalist … so i made this one. enjoy.
        <br><br>
        - admin
      </div>
      <div id="login-register">
        <div id="login" v-if="!isLoggedIn">
          <h3>login</h3>
          <input class="login-form" type="text" name="username" v-model="loginEmail" placeholder="username or email"><br>
          <input class="login-form" type="password" name="password" v-model="loginPassword" placeholder="password"><br>
          <input type="submit" class="white-button" value="login"  v-on:click="loginSubmit()"/>
        </div>
        <div id="register" v-if="!isLoggedIn">
          <h3>register</h3>
          <input class="login-form" type="text" name="username" v-model="registerUsername" placeholder="username"><br>
          <input class="login-form" type="text" name="email" v-model="registerEmail" placeholder="email"><br>
          <input class="login-form" type="password" name="password" v-model="registerPassword" placeholder="password"><br>
          <input class="login-form" type="text" name="location" v-model="registerLocation" placeholder="location"><br>
          <input type="submit" class="white-button" value="register"  v-on:click="registerSubmit()"/>

        </div>
        <div v-else>
          <input type="submit" class="white-button" value="logout" v-on:click="logoutPressed()"/>
        </div>
      </div>
    </div>


    <ul id="filter">
      <li><a href="/" class="selected-filter"><i class="fa fa-home" aria-hidden="true"></i></a></li>
      <li><a href="/projects">all projects</a></li>
      <li v-show="isLoggedIn"><a href="/projects/pledged" >backed</a></li>
      <li v-show="isLoggedIn"><a href="/projects/created">created</a></li>
      <li id="new-project"><a href="/projects/create"><i class="fa fa-plus-circle" aria-hidden="true"></i>  start a project</a></li>
    </ul>

    <router-view></router-view>


  </div>

</template>






<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                headerExpanded: false,
                isLoggedIn: false,
                loginEmail: null,
                loginPassword: null,
                registerLocation: null,
                registerEmail: null,
                registerUsername: null,
                registerPassword: null,
                loginName: 'login'
            }
        },
        mounted: function (){
            if(localStorage.getItem('currentUserId')){
                this.isLoggedIn=true
                this.loginName = localStorage.getItem('currentUserName');
            }
        },
        methods: {
            onSubmit: function(){
                return
            },
            loginButtonClicked: function(){
                this.headerExpanded = !this.headerExpanded;
            },
            loginSubmit: function () {
                if(this.loginEmail && this.loginPassword){
                    this.loginUser(this.loginEmail, this.loginPassword);
                };

            },
            checkRegistrationDataValid: function(){
                if(!this.registerPassword && !this.registerEmail && !this.registerUsername){
                    alert("Required Username, Email, Password");
                    return false;
                } else if (!this.isValidEmail(this.registerEmail)){
                    alert("Email is invalid");
                    return false;
                }
                return true;
            },
            loginUser: function (username, password) {

                this.$http.post('http://localhost:4941/api/v2/users/login/?username='+username+'&email='+username+'&password='+password, null)
                    .then(function(responce){
                        console.log("loggedIn");
                        this.isLoggedIn = true;
                        this.getUserFromID(responce.body.id, responce.body.token);
                    }, function(error){
                        console.log(error);
                        alert("error Login");
                    });
            },
            registerSubmit: function(){
                if(this.checkRegistrationDataValid()){

                    let postData = {
                        "username": this.registerUsername,
                        "email": this.registerEmail,
                        "password": this.registerPassword,
                        "location": this.registerLocation
                    };
                    console.log(postData);

                    this.$http.post('http://localhost:4941/api/v2/users/', postData)
                        .then(function(responce){
                            console.log("Account Creation Successful");
                            this.loginUser(postData.username, postData.password);
                        }, function(error){
                            console.log(error);
                            alert("error Create Account");
                    });
                }
            },
            isValidEmail: function(email){
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            getUserFromID(id, token){
                this.$http.get('http://localhost:4941/api/v2/users/'+id+'/', {headers: {'X-Authorization': token}})
                    .then(function(responce){
                        console.log("Account Creation Successful");
                        localStorage.setItem('currentUserId', id);
                        localStorage.setItem('currentUserToken', token);
                        localStorage.setItem('currentUserName', responce.body.username);
                        localStorage.setItem('currentUserEmail', responce.body.email);
                        localStorage.setItem('currentUserLocation', responce.body.location);

                        this.loginName = responce.body.username;
                        this.headerExpanded = false;

                    }, function(error){
                        console.log(error);
                        alert("error getting user details");
                    });
            },
            logoutPressed: function(){

                this.$http.post('http://localhost:4941/api/v2/users/logout', null, {headers: {'X-Authorization': localStorage.getItem('currentUserToken')}})
                    .then(function(responce){
                        console.log("logged out");
                        localStorage.clear();
                        this.loginName = 'login';
                        this.isLoggedIn = false;
                        this.headerExpanded = false;

                    }, function(error){
                        console.log(error);
                        alert("error logout");
                    });


            }
        }
    }
</script>

<style>

</style>
