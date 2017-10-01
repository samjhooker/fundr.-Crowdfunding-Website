

<template>

  <div id="app">

    <div id="header">
      <h1 id="header-title">funder</h1>
      <div id="account-text" v-on:click="loginButtonClicked">samuel</div>
    </div>
    <div id="header-content">
      <div id="funder-about" class="normal-text">
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
        <div id="login">
          <h3>login</h3>
          <input class="login-form" type="text" name="username" placeholder="username or email"><br>
          <input class="login-form" type="password" name="password" placeholder="password"><br>
          <button class="white-button">login</button>
        </div>
        <div id="register">
          <h3>register</h3>
          <input class="login-form" type="text" name="username" placeholder="username"><br>
          <input class="login-form" type="text" name="email" placeholder="email"><br>
          <input class="login-form" type="password" name="password" placeholder="password"><br>
          <input class="login-form" type="text" name="location" placeholder="location"><br>
          <button class="white-button">register</button>
        </div>
      </div>
    </div>


    <ul id="filter">
      <li focus><a href="/" >all projects</a></li>
      <li><a href="/projects/pledged">backed</a></li>
      <li><a href="/projects/created">created</a></li>
      <li id="new-project"><a href="/projects/create">create new project</a></li>
    </ul>

    <router-view></router-view>


  </div>

</template>






<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted: function (){
            //alert("this works");
        },
        methods: {
            loginButtonClicked: function(){
                if($("#header-content").hasClass("header-expanded")){
                    $("#header-content").removeClass("header-expanded")
                }else{
                    console.log("hello")
                    $("#header-content").addClass("header-expanded")
                }
            }
        }
    }
</script>

<style>

</style>
