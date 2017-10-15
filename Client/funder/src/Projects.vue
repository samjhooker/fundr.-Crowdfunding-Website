<template>



        <div
                id="main-content">

            <div id="search-filter-bar">
                <input placeholder="search" id="search-filter-input">
            </div>

            <i class="loading-spinner fa fa-spinner fa-3x fa-fw" v-show="!isLoaded" aria-hidden="true"></i>


            <project class="thin-border" v-for="item in projectData" :projectData="item" :projectId="item.id" v-bind:id="item.id"></project>


        </div>


</template>








<script>
    import Project from './Project.vue'
    import swal from 'sweetalert';


    export default {
        name: 'projects',
        components: { Project },
        data () {
            return{
                projectData: [],
                isLoaded:false,
                placeholderImageUrl: "http://www.euneighbours.eu/sites/default/files/2017-01/placeholder.png",
                paginate: ['projectData']

            }
        },
        mounted: function (){
            this.$http.get(this.$root.$data.url + 'projects')
                .then(function(responce){
                    console.log("projects recieved");
                    console.log(responce);
                    for(var index in responce.body){
                        console.log(index);
                        if(responce.body[index].open){
                            this.projectData.push(responce.body[index]);
                        }
                        this.isLoaded=true;
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