<template>
  <div>
    <div class="section"></div>
<main>
  <center>
    <img class="responsive-img" style="width: 250px;" src="https://i.imgur.com/ax0NCsK.gif" />
    <div class="section"></div>

    <h5 class="indigo-text">Please, login into your account</h5>
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
              <input v-model="login.username" placeholder="username" />
              <!-- <label>Enter your Username</label> -->
            </div>
          </div>

          <div class='row'>
            <div class='input-field col s12'>
              <input v-model="login.password" placeholder="password" />
              </div>
            </div>
          <br />
          <center>
            <div class='row'>
              <button v-on:click.prevent="getLogin()" type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
            </div>
          </center>
        </form>
      </div>
    </div>
    <fb-signin-button :params="fbSignInParams"
      @success="onSignInSuccess" @error="onSignInError" class="fb-signin-button fb-signin-button--facebook">Login with Facebook
    </fb-signin-button><br><br>
    <p>Not have an account yet? Sign Up <span><router-link v-bind:to="'signup'"> here</router-link></span></p>
  </center>

  <div class="section"></div>
  <div class="section"></div>
</main>
      <div>
        <small>Copyright chipsChanAhoy</small>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data(){
    return{
      login: {
        username: '',
        password: ''
      },
      fbSignInParams: {
        scope: 'email,public_profile',
        return_scopes: true
      }
    }
  },
  methods: {
    getLogin(){
      var self = this
      console.log(self)
      axios.post('http://localhost:3000/login',{
        username: self.login.username,
        password: self.login.password
      })
      .then(response=>{
        console.log('=====',response.data.token)
        localStorage.setItem('token',response.data.token)
        this.$router.push('/todo')
      })
      .catch(err=>{
        console.log(err);
      })
    },
    onSignInSuccess(response){
      var self = this
      console.log('ini respone',response)
      localStorage.setItem('fbaccesstoken',response.authResponse.accessToken)
      axios({
        method: 'post',
        url: `http://localhost:3000/userFb`,
        headers: {
          fbaccesstoken: localStorage.getItem('fbaccesstoken')
        }
      })
      .then(loginResponse=>{
        console.log('data',loginResponse.data)
        localStorage.setItem('token',loginResponse.data.token)
        localStorage.setItem('name',loginResponse.data.name)
        localStorage.setItem('id',loginResponse.data.id)
        this.checkLogin()
      })
      .catch(err=>{
        console.log('ada error',err)
        self.$router.push('/')
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    checkLogin () {
      console.log('check login')
      if (localStorage.fbaccesstoken) {
        this.$router.push('/todo')
      }
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
}
.fb-signin-button {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.fb-signin-button:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.fb-signin-button:focus {
  outline: none;
}
.fb-signin-button:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

.fb-signin-button--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.fb-signin-button--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.fb-signin-button--facebook:hover,
.fb-signin-button--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}
body {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }

    main {
      flex: 1 0 auto;
    }

    body {
      background: #fff;
    }

    .input-field input[type=date]:focus + label,
    .input-field input[type=text]:focus + label,
    .input-field input[type=email]:focus + label,
    .input-field input[type=password]:focus + label {
      color: #e91e63;
    }

    .input-field input[type=date]:focus,
    .input-field input[type=text]:focus,
    .input-field input[type=email]:focus,
    .input-field input[type=password]:focus {
      border-bottom: 2px solid #e91e63;
      box-shadow: none;
    }
</style>
