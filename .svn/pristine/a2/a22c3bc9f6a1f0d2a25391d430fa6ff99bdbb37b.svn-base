<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="角色：" class="formMust" >
                    <RadioGroup v-model="formData.rel.role">
                      <Radio label="车主">车主</Radio>
                      <Radio label="汽修厂">汽修厂</Radio>
                    </RadioGroup>
                    <span v-if='formData.initF&&formData.rel.role==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="版本号：" class="formMust">
                    <Input v-model="formData.rel.version" placeholder="请输入版本号" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.version == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="设备类型：" class="formMust" >
                    <RadioGroup v-model="formData.rel.deviceType">
                      <Radio label="andriod">andriod</Radio>
                      <Radio label="ios">ios</Radio>
                    </RadioGroup>
                    <span v-if='formData.initF&&formData.rel.deviceType==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="更新类型：" class="formMust" >
                    <RadioGroup v-model="formData.rel.upgradeType">
                      <Radio label="0">强制更新</Radio>
                      <Radio label="1">非强制更新</Radio>
                    </RadioGroup>
                    <span v-if='formData.initF&&formData.rel.upgradeType==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="发布时间：" class="formMust" >
                    <DatePicker
                      :value="formData.rel.releaseTime"
                      @on-change="getDate"
                      format="yyyy-MM-dd"
                      type="date"
                      placement="bottom-end"
                      placeholder="选择发布时间"
                      style="width: 200px"
                    ></DatePicker>
                    <span v-if='formData.initF && formData.rel.releaseTime == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="下载地址：" class="formMust">
                    <Input v-model="formData.rel.downloadUrl" placeholder="请输入下载地址" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.downloadUrl == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="文件大小：" class="formMust">
                    <InputNumber :max="10000" :min="0" :step="0.01" :precision='2' v-model="formData.rel.size"></InputNumber>
                    <span v-if='formData.initF && (formData.rel.size == 0||formData.rel.size == "")' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="弹出信息：" class="formMust">
                    <Input :autosize="{minRows: 5}" type='textarea' v-model="formData.rel.popupMessage" placeholder="请输入弹出信息" style="width:60%"></Input>
                    <span v-if='formData.initF && formData.rel.popupMessage == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="更新描述：" class="formMust">
                    <Input :autosize="{minRows: 5}" type='textarea' v-model="formData.rel.description" placeholder="请输入更新描述" style="width:60%"></Input>
                    <span v-if='formData.initF && formData.rel.description == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bannerAdd',
    props:["name","detail"],
    components: {},
    data () {
        return {
            formData:{
                initF:false,
                rel:{
                    role:"车主",
                    platformVersionId:"",
                    deviceType:"andriod",
                    version:"",
                    upgradeType:'0',
                    releaseTime:"",
                    downloadUrl:"",
                    size:0,
                    description:"",
                    popupMessage:""
                }
            }
        }
    },
    mounted () {
        this.handleInit()
    },
    methods: {
        handleInit(){
            let d = this.detail;
            d.releaseTime = this.utils.formatDate(d.releaseTime,"yyyy-MM-dd");
            d.size = Number(d.size);
            this.formData.rel = this.utils.getObjByKeys(this.formData.rel,JSON.parse(JSON.stringify(d)));
        },
        getDate(date){
            this.formData.rel.releaseTime = date + ' 00:00:00';
        },
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.post(Api.version.update,this.formData.rel,(res)=>{
                    this.$Message.success("修改版本成功！");
                    this.utils.refshData(_this.$parent.$parent)
                });
            });
        },
    }
};
</script>
