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
import { useRouter ,useRoute} from 'vue-router'
import QRCodeVue3 from "qrcode-vue3";
export default {
  data() {
    return {
      editor:new EditorJS({
        readOnly: true,
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
}
},
  async mounted() {

const route = useRoute()
let id :string = route.query.id?.toString();

  const docSnap = await getDoc(doc(db, 'docs', id))
      let data:any = JSON.parse(docSnap.data().data);
    this.editor.blocks.render(data).then(ee=>{

        
    }).catch(e=>{
        console.log(e,'aa');
        
    })
}
}
</script>

<template>
 <div>
<div class="container">
    <div>
     <div id="editorjs" class="editorjs mt-4">
     </div>  
   
    </div>
   </div>
 </div>
</template>

<style>
.dd{
  background-color: rgb(119, 119, 119);
}
</style>
