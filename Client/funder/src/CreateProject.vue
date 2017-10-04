<template>
    <div class="create-project-content" id="main-content" >


        <div class="center" v-bind:class="{'create-project-header-top':isTop}" id="create-project-header">
            <input id="project-name-input" v-bind:class="{'project-name-input-top':isTop}" v-model="projectName" placeholder="project name"/><br>
            <button id="project-name-button" v-show="!isTop" class="button" v-on:click="projectNameSubmitButtonPressed()">next</button>
        </div>

        <div v-bind:class="{'create-project-content-top':isTop}" id="create-project-content">
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
            }
        }
    }

</script>