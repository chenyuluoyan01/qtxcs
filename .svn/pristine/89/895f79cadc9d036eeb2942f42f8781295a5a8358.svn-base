<template>
    <div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="fileTypes"
            :max-size="2048"
            :on-error='handleError'
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            :action='urls'
            class='upForm'
            >
            <Button type='primary' size='small' icon='ios-cloud-upload-outline'>{{btnText}}</Button>
        </Upload>
    </div>
</template>
<script>
    import md5Str from '@/libs/core/utils/lib/md5str.js'
    export default {
        props:{
          url:{
            type:String,
            default:Api.upload
          },
          btnText:{
            type:String,
            default: "上传文件"
          },
          fileTypes:{
            type:Array,
            default: ()=>{
                return ['xls','xlsx']
            }
          }
        },
        data () {
            return {
                statusInit:true,
                urls:'',
                imgName: '',
                fileName: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            handleSuccess (res, file) {
                if(res.code == 0){
                    this.$Message.success("上传成功！")
                    this.utils.loading.hide(this);
                }else{
                    this.$Message.warning(res.message || "上传图片失败");
                    this.utils.loading.hide(this);
                }
            },
            handleError (err) {
                this.$Message.warning("服务器出错，上传失败！");
                this.utils.loading.hide(this);
            },
            handleFormatError (file) {
                this.$Message.warning(`请上传格式为${this.fileTypes.join(",")}的文件！`);
                this.utils.loading.hide(this);
            },
            handleMaxSize (file) {
                this.$Message.warning("文件太大，不能超过2M！");
                this.utils.loading.hide(this);
            },
            handleBeforeUpload () {
                this.utils.loading.show(this);
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
            let token = localStorage.getItem('token');
            let factoryId = localStorage.getItem('factoryId');
            let sunnyfix_timestamp = new Date().getTime();
            let urls = this.url+'&factoryId='+factoryId+'&token='+token+'&sunnyfix_timestamp='+sunnyfix_timestamp;
            let sunnyfix_sign = md5Str(urls);
            urls += '&sunnyfix_sign='+sunnyfix_sign;
            this.urls = urls;
        }
    }
</script>
<style lang='less'>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .ivu-modal-footer .ivu-btn-small span{
      font-size:14px;
    }
    .upForm{
      display:inline-block;
      width:158px;
    }
    .loyal{
      width:158px;
      height:158px;
      line-height: 158px;
    }
</style>
