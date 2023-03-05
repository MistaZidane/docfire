<script  lang="ts">
import EditorJS from '@editorjs/editorjs';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Translate from '@editorjs/translate-inline';
import Underline from '@editorjs/underline';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import Header from '@editorjs/header';
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfMake";
import { signOut } from 'firebase/auth'
import { auth, db } from '@/firebase/init';
import { doc, getDoc, collection,setDoc } from "firebase/firestore"
import { useRouter } from 'vue-router'
import QRCodeVue3 from "qrcode-vue3";



export default {
  data() {
    return {
      editor:new EditorJS({
    holder: 'editorjs',
    tools: {
    table: Table,
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      }
    },
    translator: {
      class: Translate,
    },
    underline: Underline,
    Marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M',
    },
    delimiter: Delimiter,
    header: Header,
  }
}), 
router: useRouter(),
type: "bc",
randomId: new Date().valueOf().toString()
    }
  },
  // `mounted` is a lifecycle hook which we will explain later
 methods: {
    save(){
        this.editor.save().then(async (outputData) => {
  const colRef = collection(db, 'docs');
 const docRef = await setDoc(doc(db, "docs", this.randomId), {data:JSON.stringify(outputData)});
 console.log('data saved');
 
 this.downloadPdf();
}).catch((error) => {
  console.log('Saving failed: ', error)
});
    },
    downloadPdf() {
      let doc = document.getElementsByClassName('codex-editor__redactor')
      let qrcode = document.getElementById('qrcode');
      qrcode.style.display = 'block';
      doc[0].appendChild(qrcode);
      var val = htmlToPdfmake(doc[0]?.innerHTML);
      var dd = {content:val,pageSize: {
    width: 595.28,
    height: 'auto'
  }};
    pdfMake.createPdf(dd).download();
    },
    logout(){
      signOut(auth)
      .then(() => {
        // user signed-out
        this.router.push('/login')
      })
    },
    async setType(type:string){
      this.type = type;
      const docSnap = await getDoc(doc(db, 'stuffs', this.type))
      let data:any = JSON.parse(docSnap.data()[this.type]);
    this.editor.blocks.render(data).then(ee=>{

        
    }).catch(e=>{
        console.log(e,'aa');
        
    })
    }
 }, async mounted(){

  const docSnap = await getDoc(doc(db, 'stuffs', this.type))
      let data:any = JSON.parse(docSnap.data()[this.type]);
    this.editor.blocks.render(data).then(ee=>{

        
    }).catch(e=>{
        console.log(e,'aa');
        
    })

 }, components:{QRCodeVue3}
}

</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Select doc type
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#" @click="setType('bc')"> Birth Certificate</a></li>
    <li><a class="dropdown-item" href="#" @click="setType('dc')">Death Certificate</a></li>
  
  </ul>
</div>
        </li>
            
      </ul> <div class="d-flex">
      <button class="btn btn-outline-success me-2" @click="save" >Save</button>
      <button class="btn btn-outline-success" @click="downloadPdf" >Download</button>
      <button class="btn btn-outline-danger" @click="logout" >Logout</button>
        </div>
    </div>
  </div>
</nav>
<div class="container">
    <div>
     <div id="editorjs" class="editorjs mt-4">
      <QRCodeVue3
          id="qrcode"
          style="display:none"
          :value="randomId"
          :width="60"
          :height="60"
        />
     </div>  
   
    </div>
   </div>
    </div>

  
</template>
<style scoped>

.editorjs {
background-color: white;
min-height: 90vh;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

}
</style>