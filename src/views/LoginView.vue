<script  lang="ts">
 import {signInWithEmailAndPassword} from 'firebase/auth'
 import { auth } from '../firebase/init.js'
 import { useRouter } from 'vue-router'
 export default {
  data() {
    return {
      email:"",
      password:"",
      router: useRouter()
    }
  },
  methods: {
    signIn(e:Event){  
      e.preventDefault();
      console.log(this.email, this.password);
   signInWithEmailAndPassword(auth,this.email, this.password) 
      .then((data:any) => {
        console.log('Successfully logged in!',data);
        this.router.push('/admin')
      })
      .catch((error:any) => {
        console.log(error.code,error)
      });
  }
  }
}

</script>

<template>
    <div class=" pt-5 mt-5">
 <div class="row">
     <div class="col-md-3"></div>
     <div class="col-md-6">
        <p class="display-4 mb-5 text-center">Login</p>
        <form class="mt-5 text-left" @submit="signIn($event)">
            <div class="form-group">
              <label for="email">Email</label>   
              <input class="form-control form-control-lg search" id="email" v-model="email" type="email" placeholder="Email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
              <input class="form-control form-control-lg search" id="password" v-model="password" type="password" placeholder="Password">
              </div>
           <div class="form-group mt-3 text-center">
            <button type="submit" class="btn btn-primary mb-2 my-btn btn-lg mt-2" >Login</button>
           </div>
        </form>
     </div>
     <div class="col-md-3"></div>
 </div>
</div>
</template>

<style>

</style>
