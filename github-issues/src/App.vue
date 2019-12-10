<!-- Vue app Html template  -->
<template>
  <div id="app">
    <div >
      <form>
        <input type="text" class="input" placeholder="Enter Git Repo url" v-model="repoUrl" @keyup.enter="Submit">
        <button @click="Submit" type="button" class="btn">Get Issues</button>
      </form>
    </div>
    <div class="info">
      <div class="card">
        <div class="heading">Total open issues in Repository</div>
        <div class="value">{{totalIssues}}</div>
      </div>

      <div class="card">
        <div class="heading">Open issues within 24 hours</div>
        <div class="value">{{within24Hours}}</div>
      </div>

      <br>

      <div class="card">
        <div class="heading">Open issues between 24 hours and 7 days</div>
        <div  class="value">{{within7Days}}</div>
      </div>

      <div class="card">
        <div class="heading">Open issues more than 7 days ago</div>
        <div  class="value">{{above7Days}}</div>
      </div>  
      
      
    </div>  
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      repoUrl :       '',
      totalIssues :   "--",
      within24Hours : "--",
      within7Days :   "--",
      above7Days :    "--",
      error:0
    }
  },
  methods:{
    //function to submit url and get the required git repo issue count
    Submit:function(){
      console.log("hi");
      console.log(this.repoUrl);

      const axios = require('axios');
      var vm = this;

      axios.post('https://git-issues-backend.herokuapp.com/',{
        repoUrl:this.repoUrl
      })
      .then(function (response) {
        if(response.data.statusCode==404){
          vm.error = 1;
          vm.$toaster.error('Please Enter a Valid URL');
          vm.totalIssues = "--"
          vm.within24Hours = "--"
          vm.within7Days = "--"
          vm.above7Days = "--"
          vm.repoUrl = ""
        }
        // handle success
        else{
          vm.totalIssues = ""+response.data[0].total
          vm.within24Hours = ""+response.data[0].within24Hours
          vm.within7Days = ""+response.data[0].within7Days
          vm.above7Days = ""+response.data[0].above7Days
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0a0a0a;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
textarea:focus, input:focus{
    outline: none;
}
.input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #CCC;
  color: #555;
  box-sizing: border-box;
  font-family: 'Arvo';
  font-size: 18px;
  padding: 10px 0px;
  position: relative;
  width: 400px;

  &:focus {
    outline: none;    
  }
}
::-webkit-input-placeholder { /* Chrome */
  color: #c3c3c3;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #c3c3c3;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #c3c3c3;
  opacity: 1;
}
:-moz-placeholder { /* Firefox 4 - 18 */
  color: #c3c3c3;
  opacity: 1;
}
.center{
  position: absolute;
  left: 50%;
  top: 20%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.info{
  margin-top: 5%;
}
.card{
  width:200px;
  height:200px;
  max-width:300px;
  max-height:300px;
  text-align:center;
  background:white;
  display: inline-block;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
  margin: 20px;
  position: relative;
  margin-bottom: 50px;
  transition: all .2s ease-in-out;
  padding-left:2%;
  padding-right:2%;
}
.card:hover {
  /*box-shadow: 0 5px 22px 0 rgba(0,0,0,.25);*/
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  margin-bottom: 54px;
}
.heading{
  font-family:verdana;
  margin-top:10%;
  color:#0a0a0a;
}
.value{
  margin-top:20%;
  color:#0a0a0a;
  font-size: 40px;

}
.btn{
  box-sizing: border-box;
  height: 30px;
  width: 150px;
  font-weight: bold;
  transition: background .5s;
  cursor: pointer;
  background: transparent;
}
</style>
