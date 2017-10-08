<template>



    <div id="main-content" >


        <div id="home-content">


        </div>



        <div id="rewards-banner">
            <h2>most recent projects</h2>
        </div>

        <project class="thin-border" v-for="item in projectData" :projectSubtitle="item.subtitle" :projectId="item.id" :projectName="item.title" :imageUrl='"http://localhost:4941/api/v2"+item.imageUri' v-bind:id="item.id"></project>

        <div id="all-projects-wrapper">
            <button id="all-projects-button" class="button center" href="/projects">see all projects</button>
        </div>
    </div>
</template>



<script>
    import Project from './Project.vue'

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
                pictureCount:0
            }
        },
        mounted: function (){
            setInterval(this.changePicture, 5000);
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
                console.log("bang")
                $("#home-content").css('background-image', "url("+ this.homePictures[this.pictureCount%this.homePictures.length]+")");
                this.pictureCount ++;
            }
        }
    }
</script>