

<template>

  <div id="app">

    <div id="header" v-bind:class="{'colored-header': scrollPosition>100}">
      <h1 id="header-title">fundr.</h1>
      <div id="account-text" v-on:click="loginButtonClicked()"><i class="fa fa-user" aria-hidden="true"></i>
        {{ loginName }}</div>
    </div>
    <div id="header-content" class="box-shadow" v-bind:class="{'header-expanded':headerExpanded}">
      <div id="funder-about" class="normal-text">
        fundr helps artists, musicians, filmmakers, designers, and other creators find the resources and support they need to make their ideas a reality. To date, <div class="box-shadow" id="random-number">{{ randomNumber }}</div> creative projects — big and small — have come to life with the support of the fundr community.
        <br><br>
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
      <li v-on:click="setActive('home')" :class="{ 'selected-filter': isActive('home')}"><a ><i class="fa fa-home" aria-hidden="true"></i></a></li>
      <li v-on:click="setActive('projects')" :class="{ 'selected-filter': isActive('projects')}"><a >all projects</a></li>
      <li v-on:click="setActive('pledged')" :class="{ 'selected-filter': isActive('pledged')}" v-show="isLoggedIn"><a  >backed</a></li>
      <li v-on:click="setActive('created')" :class="{ 'selected-filter': isActive('created')}" v-show="isLoggedIn"><a>created</a></li>
      <li v-on:click="setActive('create')" :class="{ 'selected-filter': isActive('create')}" id="new-project"><a ><i class="fa fa-plus-circle" aria-hidden="true"></i>  start a project</a></li>
    </ul>

    <router-view></router-view>

    <div class="box-shadow" id="footer">
      <i class="fa fa-copyright" aria-hidden="true"></i> Fundr Limited 2017 All rights reserved.

    </div>


  </div>

</template>






<script>

    import swal from 'sweetalert';


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
                loginName: 'login',
                activeItem: 'home',
                scrollPosition: null,
                randomNumber: parseInt(Math.random() * (999999 - 0) + 0)
            }
        },
        watch:{
          '$route': function (from, to) {
              console.log("TOOOO: "+ to);
          }
        },
        mounted: function (){
            window.addEventListener('scroll', this.updateScroll);

            if(localStorage.getItem('currentUserId')){
                this.isLoggedIn=true
                this.loginName = localStorage.getItem('currentUserName');
            }
        },
        methods: {
            updateScroll() {
                this.scrollPosition = window.scrollY
            },
            isActive: function (menuItem) {
                return this.activeItem === menuItem;
            },
            setActive: function (menuItem) {
                this.activeItem = menuItem;

                switch(menuItem){
                    case 'home':
                        this.$router.push('/');
                        break;
                    case 'projects':
                        this.$router.push('/projects');
                        break;
                    case 'pledged':
                        this.$router.push('/projects/pledged');
                        break;
                    case 'created':
                        this.$router.push('/projects/created');
                        break;
                    case 'create':
                        this.$router.push('/projects/create');
                        break;

                }

            },
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

                this.$http.post(this.$root.$data.url + 'users/login/?username='+username+'&email='+username+'&password='+password, null)
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

                    this.$http.post(this.$root.$data.url + 'users/', postData)
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
                this.$http.get(this.$root.$data.url + 'users/'+id+'/', {headers: {'X-Authorization': token}})
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

                this.$http.post(this.$root.$data.url + 'users/logout', null, {headers: {'X-Authorization': localStorage.getItem('currentUserToken')}})
                    .then(function(responce){
                        console.log("logged out");
                        localStorage.clear();
                        this.loginName = 'login';
                        this.isLoggedIn = false;
                        this.headerExpanded = false;

                    }, function(error){
                        console.log(error);
                        swal("Ummmm!", "There was an error while logging you out. Please try again.", "error");

                    });


            }
        }
    }
</script>

<style>

</style>
