<template>


    <div>


        <paginate
                id="main-content"
                name="displayedData"
                :list="displayedData"
                :per="parseInt(showPerPage)"
                >



            <div id="search-filter-bar">
                <h2>all projects</h2>
                <div id="search-bar-wrapper">
                    <input placeholder='search' id="search-filter-input" v-on:keyup="searchInputChanged" v-model="searchInput">
                </div>
                <div id="projects-per-screen-select" class="wrapper-dropdown-5" tabindex="1" v-on:click="toggleDropdown" v-bind:class="{'active': isDropdownActive}">
                    {{ showPerPage }} per page
                    <ul class="dropdown">
                        <li><a @click="updateShowPerPage(6)">6 per page</a></li>
                        <li><a @click="updateShowPerPage(12)">12 per page</a></li>
                        <li><a @click="updateShowPerPage(24)">24 per page</a></li>
                        <li><a @click="updateShowPerPage(100)">100 per page</a></li>

                    </ul>
                </div>

            </div>




            <i class="loading-spinner fa fa-spinner fa-3x fa-fw" v-show="!isLoaded" aria-hidden="true"></i>


            <project class="thin-border" v-for="item in paginated('displayedData')" :projectData="item" :projectId="item.id"
                     v-bind:id="item.id"></project>

            <h2 class="center"  id="no-projects-found-label" v-show="displayNoProjects">No Projects Found</h2>


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
                searchInput: "",
                displayNoProjects: false,
                showPerPage:12,
                selectedShowNumber:null,
                isDropdownActive: false,

            }
        },
        mounted: function (){
            this.$http.get(this.$root.$data.url + 'projects' + '?open=true')
                .then(function(responce){
                    console.log("projects recieved");
                    console.log(responce);
                    this.projectData = responce.body;
                    this.displayedData = this.projectData;
                    this.displayNoProjects = false;
                    if(this.displayedData == []) this.displayNoProjects = true;
                    this.isLoaded=true;
                }, function(error){
                    console.log(error);
                    swal("Whoops!", "Cannot retrieve projects at the moment", "error");
                });
        },
        methods: {
            toggleDropdown: function () {
                this.isDropdownActive = ! this.isDropdownActive;
            },
            updateShowPerPage: function (value) {
              this.showPerPage = parseInt(value);
            },
            onPageChange: function () {
                $('html,body').animate({
                        scrollTop: 0},
                    'slow');
            },
            searchInputChanged: function () {

                if(this.searchInput != ""){
                    this.displayedData = this.projectData.filter(this.search);
                }else{
                    this.displayedData = this.projectData;
                }
                console.log(this.displayedData);
                this.displayNoProjects = false;

                if(this.displayedData.length < 1){
                    this.displayNoProjects = true;

                    console.log("is empty");
                }
            },
            search: function(data){
                return data.title.toLowerCase().includes(this.searchInput.toLowerCase())|| data.subtitle.toLowerCase().includes(this.searchInput.toLowerCase());
            },
            
        }
    }
</script>