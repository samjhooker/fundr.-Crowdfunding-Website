<template>



    <div id="main-content" >

        <div id="home-content">
            <div class="video-background">
                <div class="video-foreground">
                    <iframe src="https://www.youtube.com/embed/HOz34_2Z-mw?controls=0&showinfo=0&mute=1&rel=0&autoplay=1&loop=1&playlist=HOz34_2Z-mw" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            <div id="home-typewriter">fund<div id="home-typewriter-text">:  my life</div></div>
            <div id="home-content-content">
                <button class="button home-content-buttons" @click="$router.push('/projects')">see all projects</button>
                <button class="home-content-buttons button" @click="$router.push('/projects/create')">start a project</button>

            </div>
        </div>



        <div id="rewards-banner">
            <h2>most recent projects</h2>
        </div>

        <project class="thin-border" v-for="item in projectData" :projectData="item" :projectId="item.id" v-bind:id="item.id"></project>


        <div id="all-projects-wrapper">
            <button class="home-content-buttons button center" @click="$router.push('/projects')">see all projects</button>
        </div>
    </div>
</template>



<script>
    import swal from 'sweetalert';
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
                typeSpeed: 50,
                backSpeed: 50,
                backDelay: 2000,
                startDelay: 2000,
            });


//            setInterval(this.changePicture, 4500);
            this.$http.get(this.$root.$data.url + 'projects')
                .then(function(responce){
                    console.log("projects recieved");
                    console.log(responce);
                    for(var index in responce.body){
                        if(index > 5)break;
                        if(responce.body[index].open){
                            this.projectData.push(responce.body[index]);
                        }
                    }
                }, function(error){
                    console.log(error);
                    swal("Whoops!", "Cannot retrieve projects at the moment", "error");

                });
        },
        methods: {

        }
    }
</script>