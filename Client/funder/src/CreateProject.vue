<template>
    <div class="create-project-content" id="main-content">

        <div id="top-filler" v-bind:class="{'top-filler-hidden':isTop}"></div>

        <h2 id="login-message" v-if="!isLoggedIn"> You must be logged in to create a project</h2>

        <div v-bind:class="{'create-project-header-top':isTop}" id="create-project-header" v-else>
            <input id="project-name-input" v-bind:class="{'project-name-input-top':isTop}" v-model="projectName" placeholder="project name"/><br>
            <button id="project-name-button" v-show="!isTop" class="button" v-on:click="projectNameSubmitButtonPressed()">next</button>
        </div>

        <div v-bind:class="{'create-project-content-top':isTop}" id="create-project-content">

            <div class="black-border new-project-cell large-project-cell thin-border" id="insert-information">
                <h2 id="information-title">information</h2>

                <input type="text" v-model="subtitle" maxlength="50" class="black-border info-input" id="subtitle-info-input" placeholder="an awesome project">
                <span id="" class="information-item-title input-group-addon">subtitle</span>

                <span id="target-info-input-span" class="black-border info-input">$<input v-model="target" maxlength="15" type="text" name="currency" id="target-info-input" placeholder="500"></span>
                <span id="" class=" information-item-title input-group-addon">target</span>

                <textarea type="text" v-model="description" maxlength="5000" class="black-border info-input" id="description-info-input"/>
                <span id="" class=" information-item-title input-group-addon">description</span>


            </div>

            <div class="black-border new-project-cell large-project-cell  thin-border" id="insert-image" v-on:click="insertImageButtonPressed">
                <img id="image-upload" class="" src="https://i.imgur.com/WqljCrr.png"/>
            </div>

            <input class="hidden" type="file" id="files" name="files[]" accept="image/*" v-on:change="fileChoosen" single/>


            <div id="rewards-banner">
                <h2>rewards</h2>
            </div>

            <div v-for="reward in rewards" class="grow appear reward-cell black-border new-project-cell thin-border">
                <i id="reward-cell-close" class="fa fa-times black" aria-hidden="true" v-on:click="closeRewardButtonPressed(reward)"></i>
                <div id="reward-cell-title">${{ reward.amount }}</div>
                <div id="reward-cell-content">{{ reward.description }}</div>
            </div>

            <div class="reward-cell black-border new-project-cell thin-border">
                <!--<input v-model="rewardAmount"  type="text" maxlength="15" class="black-border reward-input" id="reward-amount-input" placeholder="reward amount"/>-->
                <span class="black-border reward-input">$<input v-model="rewardAmount" maxlength="15" type="text" name="currency" id="reward-amount-input" placeholder="500"></span>

                <textarea  v-model="rewardDescription" type="text" maxlength="300" class="black-border reward-input" id="reward-description-input" placeholder="reward description"/>
                <button v-on:click="rewardButtonClicked" id="reward-button" class="button">create</button>
            </div>

            <div id="submit-button-wrapper">
                <button v-if="isTop" v-on:click="submitButtonPressed" id="submit-project-button" class="appear button">submit project</button>
            </div>

        </div>







    </div>
</template>


<script>

    import swal from 'sweetalert';

    export default {
        name: 'create-project',
        data () {
            return{
                isLoggedIn:false,
                isTop:false,
                projectName:"",
                imageUploaded:false,
                image:null,
                file:null,
                rewards:[],
                rewardAmount:'',
                rewardDescription:'',
                subtitle:'',
                target:'',
                numbericalTarget:null,
                description:'',
            }
        },
        mounted: function (){
            if(localStorage.getItem("currentUserId")){
                this.isLoggedIn = true;
            }
        },
        methods: {
            projectNameSubmitButtonPressed: function(){
                if(localStorage.getItem("currentUserId")){
                    if(this.projectName != ""){
                        this.isTop = true;
                    }else{
                        this.swing('#project-name-input');
                    }
                }else{
                    this.isLoggedIn = false;
                }

            },
            insertImageButtonPressed : function () {
                $("#files").click();
            },
            fileChoosen : function(evt){
                var self = this;
                console.log(this.image);
                var files = evt.target.files;

                this.file = files[0];

                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {
                        $("#image-upload").hide();
                        self.image = e.target.result;
                        $("#insert-image").css('background-image', "url('"+e.target.result+"')");
                    };
                })(this.file);
                reader.readAsDataURL(this.file);


            },
            rewardButtonClicked: function () {
                var a = parseInt(this.rewardAmount);
                if(a && this.rewardDescription){
                    this.rewards.push({'amount':a, 'description':this.rewardDescription});

                    this.rewardAmount ='';
                    this.rewardDescription = '';
                }else{
                    this.swing("#reward-button");
                }

            },
            closeRewardButtonPressed: function (reward) {
                var index = this.rewards.indexOf(reward);
                if (index > -1) {
                    this.rewards.splice(index, 1);
                }

            },
            swing: function(node){
                var el = $(node).addClass('swing');
                setTimeout(function() {
                    el.removeClass('swing');
                }, 800);
            },
            submitButtonPressed: function (event) {
                var swingList = [];
                this.numericalTarget = parseInt(this.target);
                if(!this.subtitle)swingList.push("#subtitle-info-input");
                if(!this.numericalTarget)swingList.push("#target-info-input-span");
                if(!this.description)swingList.push("#description-info-input");
                if(!this.projectName)swingList.push("#project-name-input");

                if(!swingList.length == 0){
                    for(var id in swingList){
                        this.swing(swingList[id]);
                    }
                    return;
                }else{
                    this.postProject();
                }

            },
            postProject: function () {
                var data = {
                    "title": this.projectName,
                    "subtitle": this.subtitle,
                    "description": this.description,
                    "target": this.numericalTarget,
                    "creators": [
                        {
                            "id": parseInt(localStorage.getItem('currentUserId'))
                        }
                    ],
                }

                if(this.rewards.length > 0){
                    data.rewards = this.rewards;
                }

                this.$http.post(this.$root.$data.url + 'projects/', data, {headers: {'X-Authorization': localStorage.getItem('currentUserToken')}})
                    .then(function(responce){
                        console.log("Project Creation Successful");
                        this.postImage(responce.body.id);
                    }, function(error){
                        console.log(error);
                        swal("That's awkward!", "There was an error creating your project. Please try again", "error");

                    });

            },
            postImage: function (projectId) {

                if(this.file){

                    var type = this.file.type;

                    this.$http.put(this.$root.$data.url + 'projects/'+projectId+'/image/', this.file,
                        {headers:{'X-Authorization': localStorage.getItem('currentUserToken'), 'Content-Type': type}})
                        .then(function(responce){
                            swal("Yay!", "Your project funding campaign has started. Good Luck.", "success");
                            this.$router.push('/projects');



                        }, function(error){

                            swal("Well... this happened", "Project has been created but image upload failed. File size may be too large. Images can be edited within the project.", "info");
                            this.$router.push('/projects');

                            console.log(error);
                        });
                }else{
                    swal("Yay!", "Your project funding campaign has started. Good Luck.", "success");
                    this.$router.push('/projects');
                }

            }
        }
    }

</script>