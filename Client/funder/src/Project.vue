<template>
    <div  class="content-cell" v-bind:class="{'expanded-content-cell':isExtended}" v-on:click="contentCellClicked()">
        <div id="cell-title" v-show="!isExtended">
            <h2 class="white-project-title-text">{{ projectName }}</h2>
            <div class="white-project-title-text normal-text">${{ amountRaised }} raised</div>
        </div>
        <img v-bind:src="imageUrl" alt>
        <i class="fa fa-times close-button" v-bind:class="{'hidden':!isExtended}" aria-hidden="true" id="close-button"></i>
        <div id="content-info" v-bind:class="{'hidden':!isExtended}">
            <div id="content-left">
                <h2 id="project-name-text" class="project-title-text">{{ projectName }}</h2>
                <div id="money-raised-text" class="project-title-text normal-text">${{ amountRaised }} raised</div>
                <div id="amount-pledged-text" class="project-title-text normal-text"><strong>you pledged ${{ usersPledge }}</strong></div>
                <textarea id="description-text" class="normal-text">{{ description }}</textarea>
            </div>
            <div id="content-right">
                <div class="button" v-on:click="pledgeClicked()">pledge</div>

                <ul class="normal-text" id="pledges">
                    <li>Joe Smith pledges $230</li>
                    <li>Sam pledges $230</li>
                    <li>Anonymous pledges $134</li>
                    <li>Bob Jones pledges $230</li>
                    <li>Sir Pledgealot pledges $230</li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'project',
        props: ['projectName', 'amountRaised', 'usersPledge', 'imageUrl', 'description'],
        data () {
            return{
                isExtended: false,
            }
        },
        methods: {
            contentCellClicked: function(event){
                this.isExtended = !this.isExtended;
            },
            pledgeClicked : function(){
                alert("pledge");
            }
        }

    };
</script>