<template>


    <div>
        <paginate
                id="main-content"
                name="displayedData"
                :list="displayedData"
                :per="6"
                >

            <div id="search-filter-bar">
                <input placeholder='search' id="search-filter-input" v-on:keyup="searchInputChanged" v-model="searchInput">
            </div>

            <i class="loading-spinner fa fa-spinner fa-3x fa-fw" v-show="!isLoaded" aria-hidden="true"></i>


            <project class="thin-border" v-for="item in paginated('displayedData')" :projectData="item" :projectId="item.id"
                     v-bind:id="item.id"></project>


        </paginate>
        <paginate-links
                id="paginate-links"
                for="displayedData"
                :show-step-links="true"
                @change="onPageChange"

        ></paginate-links>
    </div>


</template>








<script>
    import Project from './Project.vue'
    import swal from 'sweetalert';
    import Paginate from "vue-paginate/src/components/Paginate";


    export default {
        name: 'projects',
        components: {
            Paginate,
            Project },
        data () {
            return{
                projectData: [],
                displayedData:[],
                isLoaded:false,
                placeholderImageUrl: "http://www.euneighbours.eu/sites/default/files/2017-01/placeholder.png",
                paginate: ['displayedData'],
                searchInput: ""

            }
        },
        mounted: function (){
            this.$http.get(this.$root.$data.url + 'projects?open=true')
                .then(function(responce){
                    console.log("projects recieved");
                    console.log(responce);
                    this.projectData = responce.body;
                    this.displayedData = this.projectData;
                    this.isLoaded=true;
                }, function(error){
                    console.log(error);
                    swal("Whoops!", "Cannot retrieve projects at the moment", "error");
                });
        },
        methods: {
            onPageChange: function () {
                $('html,body').animate({
                        scrollTop: 0},
                    'slow');
            },
            searchInputChanged: function () {
                console.log(this.searchInput);
                if(this.searchInput != ""){
                    this.displayedData = this.projectData.filter(this.search);
                }else{
                    this.displayedData = this.projectData;
                }
                console.log(this.displayedData);
            },
            search: function(data){
                return data.title.toLowerCase().includes(this.searchInput.toLowerCase())|| data.subtitle.toLowerCase().includes(this.searchInput.toLowerCase());
            }
            
        }
    }
</script>