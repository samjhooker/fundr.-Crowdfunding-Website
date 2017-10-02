<template>



    <div id="main-content" >
        <project v-for="item in projectData" :description="item.description" :projectName="item.projectName" :amountRaised="item.amountRaised" :usersPledge="item.usersPledge" :imageUrl="item.imageUrl"></project>
    </div>
</template>








<script>
    import Project from './Project.vue'

    export default {
        name: 'projects',
        components: { Project },
        data () {
            return{
                msg: 'Welcome to Your Vue.js App',
                projectData: [
                    {'projectName':"AdventureNatives", 'amountRaised':"500", 'description':"Wow, much stuff here", 'usersPledge':"0", 'imageUrl':"https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572_1280.jpg"},
                    {'projectName':"Awesome Project", 'amountRaised':"500", 'usersPledge':"0",'description':"Wow, much stuff here", 'imageUrl':"https://d3n8a8pro7vhmx.cloudfront.net/taxpayers/pages/679/attachments/original/1499663166/4-ways-cheer-up-depressed-cat.jpg?1499663166"},
                    {'projectName':"Fun Things", 'amountRaised':"34", 'usersPledge':"0",'description':"Wow, much stuff here", 'imageUrl':"https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?h=350&auto=compress&cs=tinysrgb"},
                    {'projectName':"Fidget Spinner R Us", 'amountRaised':"4555", 'usersPledge':"90",'description':"Wow, much stuff here", 'imageUrl':"http://www.petmd.com/sites/default/files/sleepy-cat-125522297.jpg"},
                    {'projectName':"FacebookForDogs", 'amountRaised':"500", 'usersPledge':"0",'description':"Wow, much stuff here", 'imageUrl':"http://www.petsworld.in/blog/wp-content/uploads/2014/09/cute-kittens.jpg"}
                    ]
            }
        },
        mounted: function (){
            //alert("this works");
        },
        methods: {
            contentCellClicked: function(event){
                this.isExtended = !this.isExtended;
            },
            pledgeClicked : function(){
                alert("pledge");
            }
        }
    }
</script>