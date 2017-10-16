<template>
    <div class="content-cell" v-bind:class="{'expanded-content-cell':isExtended}" v-on:click="contentCellClicked">
        <div id="cell-title" v-show="!isExtended">
            <h2 id="project-name-title" class="white-project-title-text">{{ projectName }}</h2>
            <div id="project-subtitle-title" class="white-project-title-text normal-text">{{ projectSubtitle }}</div>
        </div>

        <div v-bind:id="'image-view-'+cellId" class="image-view"></div>

        <i class="fa fa-times close-button" v-bind:class="{'hidden':!isExtended}" aria-hidden="true" id="close-button" v-on:click="contentCellClosed"></i>

        <div id="content-info" v-bind:class="{'hidden':!isExtended}">

            <div id="content-left">
                <h2 id="project-name-text" class="project-title-text">{{ projectName }}</h2>
                <div id="money-raised-text" class="project-title-text normal-text">{{ backerText }}</div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0"
                         aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>

                <div id="amount-pledged-text" class="project-title-text normal-text"><strong></strong></div>
                <i class="loading-spinner fa fa-spinner fa-pulse fa-3x fa-fw" v-show="!isLoaded" aria-hidden="true"></i>
                <div id="description-text" class="normal-text" v-show="isLoaded">
                    {{ projectSubtitle }}<br><br>
                    <div v-if="status == false">THIS PROJECT IS CLOSED<br></div>
                    <div v-if="target != null"><strong>target:</strong> ${{target}}<br></div>
                    <div v-for="creator in creators"><strong>creator:</strong> {{creator.username}}<br></div>
                    <div v-if="creationDate != null"><strong>date:</strong> {{creationDate}}<br></div>
                    <br>
                    <strong>description</strong><br>{{ description }}
                    <br><br>
                    <h2>rewards</h2>
                    <div v-for="reward in rewards">
                        <strong>${{ reward.amount }}: </strong>{{ reward.description }}<br><br>
                    </div>

                </div>
            </div>

            <div id="content-right">
                <div class="button" v-bind:class="{'pledge-button-flat': usersPledge}" v-on:click="pledgeClicked()">pledge</div>
                <div id="user-pledge-label" class="box-shadow normal-text" v-if="usersPledge"> you pledged ${{ usersPledge }}</div>

                <i class="loading-spinner fa fa-spinner fa-pulse fa-3x fa-fw" v-show="!isLoaded" aria-hidden="true"></i>

                <ul class="normal-text" id="pledges">
                    <li class="box-shadow grow" v-for="pledge in pledges">{{ pledge }}</li>
                </ul>

            </div>
        </div>

        <div id="user-content-wrapper" class="box-shadow" v-if="isCreator" v-show="isExtended">
            <h2>my project</h2>
            <div id="user-content">
                <div id="update-image" class="box-shadow" v-on:click="insertImageButtonPressed">
                    <div class="center" id="update-image-label"></div>
                </div>
                <button class="button" id="close-project-button" v-on:click="closeButtonPressed">close project.<br/>this cannot be undone</button>
                <input class="hidden" type="file" id="files" name="files[]" accept="image/*" v-on:change="fileChoosen" single/>

            </div>
        </div>

    </div>
</template>


<script>
    import swal from 'sweetalert';

    export default {
        name: 'project',
        props: ['projectData', 'projectId'],
        data () {
            return{
                show:false,
                projectName:null,
                projectSubtitle:null,
                imageUrl:null,
                isCreator:false,
                isExtended: false,
                isLoaded : false,
                description:null,
                rewards: null,
                backers:null,
                creators:[],
                creationDate:null,
                rewards:[],
                target:null,
                status:null,
                backerText:null,
                pledges:[],
                usersPledge:null,
                file:null,
                cellId: Math.random().toString(36).substr(2, 9),
            }
        },
        mounted: function(){
            if(this.projectData){
                this.projectName = this.projectData.title;
                this.projectSubtitle = this.projectData.subtitle;
                this.imageUrl = this.$root.$data.url.substring(0, this.$root.$data.url.length - 1)+ this.projectData.imageUri;
                console.log(Math.random().toString(36).substr(2, 9));
                $('#image-view-'+this.cellId).css("background-image", "url('"+this.imageUrl+"')")

            }

        },
        watch: {
            'projectId': function(){
                if(this.projectData){
                    this.projectName = this.projectData.title;
                    this.projectSubtitle = this.projectData.subtitle;
                    this.imageUrl = this.$root.$data.url.substring(0, this.$root.$data.url.length - 1)+ this.projectData.imageUri;

                    $('#image-view-'+this.cellId).css("background-image", "url('"+this.imageUrl+"')")

                }

            }
        },
        methods: {

            contentCellClicked: function(event){
                if(this.isExtended)return; // dont allow click to return
                this.isExtended = !this.isExtended;
                this.loadProject();
                if(this.isExtended){
                    $('html,body').animate({
                            scrollTop: $("#"+this.projectId).offset().top -4*16},
                        'slow');

                }

            },
            contentCellClosed: function(event){
                if(!this.isExtended)return; // dont allow click to return
                this.isExtended = !this.isExtended;
                event.stopPropagation();
            },
            insertImageButtonPressed : function () {
                $("#files").click();
            },
            fileChoosen : function(evt){

                var self = this;
                var files = evt.target.files;

                this.file = files[0];

                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {

                        $('#image-view-'+self.cellId).css('background-image', "url('"+e.target.result+"')");
                        self.saveImage();

                    };
                })(this.file);
                reader.readAsDataURL(this.file);


            },
            saveImage: function () {
                if(this.file){

                    var type = this.file.type;

                    this.$http.put(this.$root.$data.url + 'projects/'+this.projectId+'/image/', this.file,
                        {headers:{'X-Authorization': localStorage.getItem('currentUserToken'), 'Content-Type': type}})
                        .then(function(responce){
                            console.log("Image Posted Successfully");
                        }, function(error){
                            swal("Not so fast!", "Image upload failed. File size may be too large.", "error");
                            console.log(error);
                        });
                }

            },
            pledgeClicked : function(){
                console.log(this.creators);
                var username = localStorage.getItem("currentUserName");
                if(username){
                    if(this.isCreator){
                        swal("Sorry!", "For legal reasons, you cannot pledge to your own project.", "error");
                        return;
                    }
                    this.$router.push('/pledge/'+this.projectId);
                }else{
                    swal("Slight Problem!", "You need to log in before you can pledge to a project", "info");

                }
            },
            loadProject: function(){


                this.$http.get(this.$root.$data.url + 'projects/'+this.projectId+'/')
                    .then(function(responce){
                        console.log("project pulled Successful");
                        console.log(responce);
                        this.description = responce.body.description;
                        this.rewards = responce.body.rewards;
                        this.creators= responce.body.creators;
                        this.creationDate = this.timeSince(new Date(responce.body.creationDate)) + " ago";
                        this.target = responce.body.target;
                        this.status = responce.body.open;
                        if(responce.body.progress){
                            this.backerText = "$"+responce.body.progress.currentPledged + " pledged from " +responce.body.progress.numberOfBackers + " backers";
                            var percentage = parseInt((parseInt(responce.body.progress.currentPledged)/parseInt(responce.body.target)) * 100);

                            $('.progress-bar').css('width',percentage+'%');
                            $('.progress-bar').text(percentage+'% funded');

                        }


                        var backers =responce.body.backers;
                        this.populateBackers(backers);
                        this.displayUserBacker(backers)
                        this.checkCreators();


                        this.isLoaded = true;
                    }, function(error){
                        console.log(error);
                        swal("My bad!", "Unable to retrieve project from server. please try again", "error");

                    });

            },
            checkCreators: function(){
                var isCreatorTemp=false;
                var id = localStorage.getItem("currentUserId");
                if(id){
                    for(var index in this.creators){
                        if(this.creators[index].id == parseInt(id)){
                            isCreatorTemp = true;
                        }
                    }
                }
                this.isCreator = isCreatorTemp;
            },
            populateBackers: function (backers) {
                var recentBackers = [];
                for(var index in backers){
                    if(recentBackers.length<6){
                        var username = backers[index].username;
                        if (recentBackers[username]){
                            recentBackers[username] += backers[index].amount;
                        }else{
                            recentBackers[username] = backers[index].amount;
                        }

                    }
                }
                this.pledges = [];
                for(var name in recentBackers){
                    this.pledges.push(name+" pledged $" + recentBackers[name]);
                }

            },
            displayUserBacker: function (backers) {
                var userId = localStorage.getItem('currentUserId');
                if(userId){
                    var userPledge = 0;
                    for(var index in backers){
                            if(backers[index].id == parseInt(userId)) userPledge += backers[index].amount;
                    }
                    if(userPledge > 0) this.usersPledge = userPledge;
                }

            },
            timeSince: function(date){
                var seconds = Math.floor((new Date() - date) / 1000);

                var interval = Math.floor(seconds / 31536000);

                if (interval > 1) {
                    return interval + " years";
                }
                interval = Math.floor(seconds / 2592000);
                if (interval > 1) {
                    return interval + " months";
                }
                interval = Math.floor(seconds / 86400);
                if (interval > 1) {
                    return interval + " days";
                }
                interval = Math.floor(seconds / 3600);
                if (interval > 1) {
                    return interval + " hours";
                }
                interval = Math.floor(seconds / 60);
                if (interval > 1) {
                    return interval + " minutes";
                }
                return Math.floor(seconds) + " seconds";
            },
            closeButtonPressed: function () {
                this.checkCreators();
                if(this.isCreator){

                    swal({
                        title: "Are you sure?",
                        text: "Once closing, you cannot re-open this project!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {

                                var data = {
                                    "open": false
                                }

                                this.$http.put(this.$root.$data.url + 'projects/'+this.projectId, data,
                                    {headers:{'X-Authorization': localStorage.getItem('currentUserToken')}})
                                    .then(function(responce){
                                        swal("Closed!", "Project has been closed. It cannot be reopened again.", "success");
                                    }, function(error){
                                        swal("I don't even!", "The project could be not be closed. please try again.", "error");
                                        console.log(error);
                                    });

                            }
                        });


                }else{
                    swal("How'd you get here?", "Only the creator of the project can close it. Ensure you are logged in.", "error");
                }


            }
        }

    };
</script>