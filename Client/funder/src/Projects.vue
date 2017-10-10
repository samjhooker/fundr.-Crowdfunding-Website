<template>



    <div id="main-content" >


        <div id="search-filter-bar">
            <input placeholder="search" id="search-filter-input">
        </div>


        <project class="thin-border" v-for="item in projectData" :projectSubtitle="item.subtitle" :projectId="item.id" :projectName="item.title" :imageUrl='"http://localhost:4941/api/v2"+item.imageUri' v-bind:id="item.id"></project>
    </div>
</template>








<script>
    import Project from './Project.vue'

    export default {
        name: 'projects',
        components: { Project },
        data () {
            return{
                projectData: [],
                placeholderImageUrl: "http://www.euneighbours.eu/sites/default/files/2017-01/placeholder.png"
            }
        },
        mounted: function (){
            this.$http.get('http://localhost:4941/api/v2/projects')
                .then(function(responce){
                    console.log("projects recieved");
                    console.log(responce);
                    for(var index in responce.body){
                        console.log(index);
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
        }
    }
</script>