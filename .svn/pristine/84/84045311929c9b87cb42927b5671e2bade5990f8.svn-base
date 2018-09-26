<template>
        <div>
            <div class="demo-upload-list"
                v-if = 'init'
                v-for="(item,i) in uploadList"
                :key="i"
                style="width:158px; height:158px; line-height: 158px;"
            >
            <template v-if="item.status === 'finished'">
                <img v-lazy="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" ></Progress>
            </template>
        </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png','gif']"
            :max-size="1024"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            v-show="this.uploadList.length < this.count"
            multiple
            type="drag"
            :action='urls'
            class='upForm'
            >
            <div class="loyal" v-if="this.uploadList.length < this.count">
                <Icon type="camera" size="40"></Icon>
            </div>
        </Upload>
        <Modal title="查看图片" class="imgWrap" v-model="visible">
            <img v-lazy="imgName" v-if="visible" style="width: 60%;margin-left:20%;">
        </Modal>
    </div>
</template>
<script>
    import md5Str from '@/libs/core/utils/lib/md5str.js'
    export default {
        props:{
          count:{
            type:Number,
            default:1
          },
          defaultList:{
            type:Array,
            default:[]
          },
          width:{
            type:Number,
            default:null
          },
          height:{
            type:Number,
            default:null
          },
          url:{
            type:String,
            default:Api.upload
          },
          fileDir:{
            type:String,
            default:"goods"
          }
        },
        data () {
            return {
                init:true,
                urls:'',
                check:true,
                imgName: '',
                fileName: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.init = false;
                $Vue.nextTick(()=>{
                    this.init = true;
                    this.$emit('upList',this.$refs.upload.fileList)
                })
            },
            handleSuccess (res, file) {
                if(this.check){
                    if(res.code == 0){
                        file.url = res.object.substring(0,res.object.search(/\?/));
                        if(this.count == 1){
                            this.$emit('upList',this.$refs.upload.fileList[0].url)
                        }else{
                            this.$emit('upList',this.$refs.upload.fileList)
                        }
                    }else{
                        this.uploadList.pop();
                        this.$Message.warning(res.message || "上传图片失败")
                    }
                }else{
                    this.uploadList.pop();
                }
            },
            handleFormatError (file) {
                this.$Message.warning("目前仅支持PNG,JPG,JPEG,GIF格式图片!")
            },
            handleMaxSize (file) {
                this.$Message.warning("文件太大，不能超过2M！")
            },
            handleBeforeUpload (file) {
                let self = this;
                let check = this.uploadList.length < this.count;
                if(!check){
                    return false;
                };
                if(this.height!=null && this.width!=null){
                    var docObj = document.getElementsByClassName("ivu-upload-input")[0];
                    var img = new Image;
                    img.onload = function(){
                        var width = img.width;
                        var height = img.height;
                        var filesize = img.size;
                        if(width != self.width || height != self.height){
                            self.check = false;
                            self.$Message.warning(`请上传尺寸为 ${self.width}*${self.height} 的图片！`);
                        }
                    };
                    img.src=window.URL.createObjectURL(docObj.files[0]);
                };
            }
        },
        mounted () {
            console.log();
            this.$refs.upload.fileList = this.utils.assign(this.defaultList);
            this.uploadList = this.$refs.upload.fileList;
            let token = localStorage.getItem('token');
            let sunnyfix_timestamp = new Date().getTime();
            let urls = this.url+'&fileDir='+this.fileDir+'&token='+token+'&sunnyfix_timestamp='+sunnyfix_timestamp;
            let sunnyfix_sign = md5Str(urls);
            urls += '&sunnyfix_sign='+sunnyfix_sign;
            this.urls = urls;
            $('.ivu-modal-footer .ivu-btn-large').removeClass('ivu-btn-large').addClass('ivu-btn-small')
        }
    }
</script>
<style>
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
