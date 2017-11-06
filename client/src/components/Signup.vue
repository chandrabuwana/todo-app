<template>
  <div>
    <div class="section"></div>
    <main>
    <center>
    <img class="responsive-img" style="width: 250px;" src="https://i.imgur.com/ax0NCsK.gif" />
    <div class="section"></div>

    <h5 class="indigo-text">Register, please</h5>
    <div class="section"></div>

    <div class="container">
      <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

        <form class="col s12" method="post">
          <div class='row'>
            <div class='col s12'>
            </div>
          </div>

          <div class='row'>
            <div class='input-field col s12'>
              <input v-model="signup.username" placeholder="username" />
              <!-- <label>Enter your Username</label> -->
            </div>
          </div>

          <div class='row'>
            <div class='input-field col s12'>
              <input v-model="signup.password" placeholder="password" />
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input v-model="signup.name" placeholder="name" />
                </div>
              </div>
          <br />
          <center>
            <div class='row'>
              <button v-on:click.prevent="getSignup()" type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Sign Up</button>
            </div>
          </center>
        </form>
      </div>
    </div>
    </center>
    </main>
    <div>
      <small>Copyright chipsChanAhoy</small>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default{
  data (){
    return{
      signup: {
        username: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    getSignup(){
      var self = this
      axios.post('http://localhost:3000/signup',{
        username: self.signup.username,
        password: self.signup.password,
        name: self.signup.name
      })
      .then(response=>{
        this.$router.push('/')
      })
      .catch(err =>{
        console.log(err);
      })
    }
  }
}
</script>
