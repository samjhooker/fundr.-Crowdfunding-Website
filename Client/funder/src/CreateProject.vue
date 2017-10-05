<template>
    <div class="create-project-content" id="main-content">


        <div class="center" v-bind:class="{'create-project-header-top':isTop}" id="create-project-header">
            <input id="project-name-input" v-bind:class="{'project-name-input-top':isTop}" v-model="projectName" placeholder="project name"/><br>
            <button id="project-name-button" v-show="!isTop" class="button" v-on:click="projectNameSubmitButtonPressed()">next</button>
        </div>

        <div v-bind:class="{'create-project-content-top':isTop}" id="create-project-content">

            <div class="black-border flex-item" id="insert-information">
            </div>

            <div class="black-border flex-item" id="insert-image" v-on:click="insertImageButtonPressed">

                <img id="image-upload" class="" src="https://i.imgur.com/WqljCrr.png"/>

            </div>
            <input class="hidden" type="file" id="files" name="files[]" accept="image/*" v-on:change="fileChoosen" single/>


            <div id="rewards-banner">
                <h2>rewards</h2>
            </div>

            <div class="reward black-border flex-item">
            </div>

            <div class="reward black-border flex-item">
            </div>
            <div class="reward black-border flex-item">
            </div>

            <div class="reward black-border flex-item">
            </div>
            <div class="reward black-border flex-item">
            </div>

            <div class="reward black-border flex-item">
            </div>

        </div>


    </div>
</template>


<script>
    export default {
        name: 'create-project',
        data () {
            return{
                isTop:false,
                projectName:"",
                imageUploaded:false,
                image:null,
            }
        },
        mounted: function (){

        },
        methods: {
            projectNameSubmitButtonPressed: function(){
                if(this.projectName != ""){
                    this.isTop = true;
                }else{
                    alert("project name required");
                }
            },
            insertImageButtonPressed : function () {
                $("#files").click();
            },
            fileChoosen : function(evt){
                var self = this;
                console.log(this.image);
                var files = evt.target.files; // FileList object

                var file = files[0];

                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {
                        $("#image-upload").hide();
                        self.image = e.target.result;
                        $("#insert-image").css('background-image', "url('"+e.target.result+"')");
                    };
                })(file);
                reader.readAsDataURL(file);

            }
        }
    }

</script>