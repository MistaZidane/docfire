<script  lang="ts">
import { doc, getDoc, collection,setDoc } from "firebase/firestore"
import { auth, db } from '@/firebase/init';
import { useRouter } from 'vue-router'


export default{
    data(){
        return{
            id:"",
            router: useRouter()
        }
    },
    methods:{
        async search(e:Event){
            e.preventDefault()
            const docSnap = await getDoc(doc(db, 'docs', this.id))
      if(docSnap.exists()) {
        console.log("found");
        this.router.push('preview'+'?id='+this.id);
      }
      else{
        console.log("not found");
        this.$notify("Document with that Id was not found");
        
      }
            console.log(this.id);
            
        }
    }
}
</script>

<template>
  <div class="text-center pt-5 mt-5">
 <div class="row">
     <div class="col-md-3"></div>
     <div class="col-md-6">
        <p class="display-4 mb-5">DocFire</p>
        <form class="mt-5" @submit="search($event)">
            <div class="form-group">
                <div class="inner-addon right-addon">
                    <i class="icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></i>
                    <input v-model="id" class="form-control form-control-lg search"  type="text" placeholder="Document Id">
                </div>
                <!-- <div class="suggestion" >
                    <p class="suggestionText"  >shhshss</p>
                </div>     -->
              </div>
           <div class="form-group mt-3">
            <button type="submit"  class="btn btn-primary mb-2 my-btn mt-2" >Verify</button>
           </div>
        </form>
     </div>
     <div class="col-md-3"></div>
 </div>
</div>
</template>
