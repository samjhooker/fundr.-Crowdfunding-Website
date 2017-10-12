<template>
    <div class="content-cell" v-bind:class="{'expanded-content-cell':isExtended}" v-on:click="contentCellClicked">
        <div id="cell-title" v-show="!isExtended">
            <h2 id="project-name-title" class="white-project-title-text">{{ projectName }}</h2>
            <div id="project-subtitle-title" class="white-project-title-text normal-text">{{ projectSubtitle }}</div>
        </div>

        <div v-bind:id="'image-view-'+projectId" class="image-view"></div>
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
                    <div v-for="creator in creators"><strong>creator:</strong> {{creator.username}}<br></div>
                    <div v-if="target != null"><strong>target:</strong> ${{target}}<br></div>
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
                <div class="button" v-on:click="pledgeClicked()">pledge</div>
                <i class="loading-spinner fa fa-spinner fa-pulse fa-3x fa-fw" v-show="!isLoaded" aria-hidden="true"></i>
                <ul class="normal-text" id="pledges">
                    <li class="box-shadow grow" v-for="pledge in pledges">{{ pledge }}</li>
                </ul>

            </div>
        </div>

        <div id="user-content-wrapper" class="box-shadow" v-show="isExtended">
            <h2>my project</h2>
            <div id="user-content">
                <div id="update-image" class="box-shadow">
                    <div class="center" id="update-image-label"></div>
                </div>
                <button class="button" id="close-project-button">close project.<br/>this cannot be undone</button>
            </div>
        </div>

    </div>
</template>


<script>
    export default {
        name: 'project',
        props: ['projectName', 'projectSubtitle', 'imageUrl', 'projectId'],
        data () {
            return{
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
                pledges:[]
            }
        },
        mounted: function(){
            $('#image-view-'+this.projectId).css("background-image", "url('"+this.imageUrl+"')")
        },
        methods: {
            contentCellClicked: function(event){
                if(this.isExtended)return; // dont allow click to return
                this.isExtended = !this.isExtended;
                if(!this.isLoaded){
                    this.loadProject();
                }
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
            pledgeClicked : function(){
                console.log(this.creators);
                var username = localStorage.getItem("currentUserName");
                if(username){
                    for(var index in this.creators){
                        if(this.creators[index].username == username){
                            alert("You cannot pledge to your own project");
                            return;
                        }
                    }
                    this.$router.push('/pledge/'+this.projectId);
                }else{
                    alert("You must be logged in to pledge.");
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
                        console.log(recentBackers);

                        for(var name in recentBackers){
                            this.pledges.push(name+" pledged $" + recentBackers[name]);
                        }



                        this.isLoaded = true;
                    }, function(error){
                        console.log(error);
                        alert("error getting project details");
                    });

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
            }
        }

    };
</script>