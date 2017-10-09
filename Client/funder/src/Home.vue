<template>



    <div id="main-content" >


        <div id="home-content">
            <div class="video-background">
                <div class="video-foreground">
                    <iframe src="https://www.youtube.com/embed/HOz34_2Z-mw?controls=0&showinfo=0&mute=1&rel=0&autoplay=1&loop=1" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            <div id="home-typewriter">fund<div id="home-typewriter-text">:  my life</div></div>
            <div id="home-content-content">
                <!--<button class="button home-content-buttons" href="/projects">see all projects</button>-->
                <!--<br/>-->
                <!--<button class="home-content-buttons button" href="/projects/create">start a project</button>-->

            </div>
        </div>



        <div id="rewards-banner">
            <h2>most recent projects</h2>
        </div>

        <project class="thin-border" v-for="item in projectData" :projectSubtitle="item.subtitle" :projectId="item.id" :projectName="item.title" :imageUrl='"http://localhost:4941/api/v2"+item.imageUri' v-bind:id="item.id"></project>

        <div id="all-projects-wrapper">
            <button class="home-content-buttons button center" href="/projects">see all projects</button>
        </div>
    </div>
</template>



<script>
    import Project from './Project.vue'
    import Typed from 'typed.js';


    export default {
        name: 'projects',
        components: { Project },
        data () {
            return{
                msg: 'Welcome to Your Vue.js App',
                projectData: [],
                placeholderImageUrl: "http://www.euneighbours.eu/sites/default/files/2017-01/placeholder.png",
                homePictures:['https://images.pexels.com/photos/35550/ipad-tablet-technology-touch.jpg?h=350&auto=compress&cs=tinysrgb',
                    'https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg?h=350&auto=compress&cs=tinysrgb',
                    'http://www.livingwellspendingless.com/wp-content/uploads/2016/11/6456393_m2.jpg'],
                pictureCount:0,
                textCount:0,
                homeText: [ ":  my", ':  my project', ':  my plan',':  my team',':  my hobby',':  my idea',':  my event',':  my life']
            }
        },
        mounted: function (){
            var typed = new Typed("#home-typewriter-text", {
                strings: this.homeText,
                smartBackspace: true,
                loop:true,
                typeSpeed: 40,
                backSpeed: 40,
                backDelay: 2000,
                startDelay: 2000,
            });


            setInterval(this.changePicture, 4500);
            this.$http.get('http://localhost:4941/api/v2/projects')
                .then(function(responce){
                    console.log("projects recieved");
                    console.log(responce);
                    for(var index in responce.body){
                        if(index > 4)break;
                        if(responce.body[index].open){
                            this.projectData.push(responce.body[index]);
                        }
                    }
                }, function(error){
                    console.log(error);
                    alert("error getting projects");
                });
        },
        methods: {
            changePicture: function(){
                $("#home-content").css('background-image', "url("+ this.homePictures[this.pictureCount%this.homePictures.length]+")");
                this.pictureCount ++;
            }
            ,changeText: function(){
                $("#home-typewriter-text").html(this.homeText[this.textCount%this.homeText.length]);
                this.textCount ++;
            }
        }
    }
</script>