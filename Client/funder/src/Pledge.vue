<template>



    <div id="pledge-content">
        <ol class="progtrckr" data-progtrckr-steps="3">
            <li class="progtrckr-done">confirmation</li>
            <li class="progtrckr-todo">payment</li>
            <li class="progtrckr-todo">done</li>
        </ol>

        <div id="pledge-content-1" class="hidden">

            <div id="pledge-image" class="box-shadow">

                <div id="pledge-text" class="center box-shadow">I would like to pledge $<input placeholder=""><br/> to {{ title }}</div>

            </div>
            <div id="pledge-button-wrapper" class="">
                <button id="pledge-back-button" class="home-content-buttons button"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i>         cancel</button>
                <button id="pledge-next-button" class="home-content-buttons button">next        <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></button>


            </div>
        </div>



        <div id="pledge-content-2">


            <div class="black-border new-project-cell thin-border" id="insert-payment">
                <div id="payment-title-wrapper" class="box-shadow">
                    <h2 id="payment-title">payment details</h2>
                    <img class="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png">
                </div>

                <div class="payment-item-title">card number</div>
                <input type="text" v-model="subtitle" maxlength="16" class="black-border info-input payment-card-input" id="" placeholder="xxxxxxxxxxxxxxxx">
                <span id="" class="card-icon box-shadow input-group-addon"><i class="fa fa-credit-card"></i></span>

                <div class="payment-item-title">expiry date</div>
                <input type="text" v-model="subtitle" maxlength="16" class="black-border info-input payment-card-input" id="" placeholder="mm/yy">
                <span id="" class=" card-icon box-shadow input-group-addon"><i class="fa fa-calendar-o"></i></span>

                <div class="payment-item-title">cvc</div>
                <input type="text" v-model="subtitle" maxlength="16" class="black-border info-input payment-card-input" id="" placeholder="123">
                <span id="" class=" card-icon box-shadow input-group-addon"><i class="fa fa-university"></i></span>

                <label id="anonymous-checkbox"><input type="checkbox" value="">   pledge anonymously</label>


                <div id="pledge-button-wrapper" class="">
                    <button id="pledge-back-button" class="home-content-buttons button"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i>         cancel</button>
                    <button id="pledge-next-button" class="home-content-buttons button">pledge        <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></button>


                </div>
        </div>



            <!--ENTRY FORM CREATED BY LLGRUFF. Used under licence-->
            <!--Copyright (c) 2017 by llgruff (https://codepen.io/llgruff/pen/JdyJWR)-->


        </div>








    </div>
</template>








<script>

    export default {
        name: 'pledge',
        props:['id'],
        data () {
            return{
                open:null,
                imageUri:null,
                title:null,

            }
        },
        mounted: function (){
            this.$http.get('http://localhost:4941/api/v2/projects/'+this.id+'/')
                .then(function(responce){
                    console.log("project pulled Successful");
                    console.log(responce);
                    this.title = responce.body.title;
                    this.imageUri= responce.body.imageUri;
                    this.open = responce.body.open;

                    this.init();
                }, function(error){
                    console.log(error);
                    alert("error getting project details");
                });
        },
        methods: {
            init: function () {
                $("#pledge-image").css('background-image', 'url("http://localhost:4941/api/v2' +  this.imageUri +'")');

            }
        }
    }
</script>