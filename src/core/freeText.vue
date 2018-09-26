<template>
  <vue-wangeditor
    id="editor"
    :uploadImgUrl='url'
    v-model="text1"
    ref='editor'
    :menus='menus'
    :disabled='disabled'
    mapKey='iTFrUHZGDDx2iviWfFYGAf0HTyvt6tma'
    @load='load'
  ></vue-wangeditor>
</template>
<script>
  import vueWangeditor from 'vue-wangeditor'
  import md5Str from '@/libs/core/utils/lib/md5str.js'
  export default {
    props:{
      text:{
        type:String,
        default:""
      },
      disabled:{
        default:false
      }
    },
    mounted(){
      let token = localStorage.getItem('token');
      let sunnyfix_timestamp = new Date().getTime();
      let urls = this.url+'&fileDir='+this.fileDir+'&token='+token+'&sunnyfix_timestamp='+sunnyfix_timestamp;
      let sunnyfix_sign = md5Str(urls);
      urls += '&sunnyfix_sign='+sunnyfix_sign;
      this.url = urls;
      this.text1 = this.text;
    },
    methods:{
      load: function(originalName,resultText){
        let res = JSON.parse(resultText);
        if(res.code == 0){
          this.$refs.editor.insertImg(res.object.substring(0,res.object.search(/\?/)));
        }else{
          let msg = this.message || "上传图片失败！";
          this.$Message.warning(msg)
        }
      },
      getHtml: function(){
        let html = this.$refs.editor.getHtml();
        return html;
      }
    },
    data(){
      return {
        text1:"",
        fileDir:"freeText",
        url:Api.upload,
        uploadParams:"",
        menus:[
          'source', // 源码模式
          '|',
          'bold', // 粗体
          'underline',  // 下划线
          'italic', // 斜体
          'strikethrough',  // 中线
          'eraser', // 清空格式
          'forecolor',  // 文字颜色
          'bgcolor',  // 背景颜色
          '|',
          'quote',  // 引用
          'fontfamily', // 字体
          'fontsize', // 字号
          'head', // 标题
          'unorderlist',  // 无序列表
          'orderlist',  // 有序列表
          'alignleft',  // 左对齐
          'aligncenter',  // 居中
          'alignright', // 右对齐
          '|',
          'link', // 链接
          'unlink', // 取消链接
          'table',  // 表格
          'emotion',  // 表情
          '|',
          'img',  // 图片
          'video',  // 视频
          'insertcode', // 插入代码
          '|',
          'undo', // 撤销
          'redo', // 重做
          'fullscreen'  // 全屏
        ]
      }
    },
    components: {
      vueWangeditor
    }
  }
</script>
