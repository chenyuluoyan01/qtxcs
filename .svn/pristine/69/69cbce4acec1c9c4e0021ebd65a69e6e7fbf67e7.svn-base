<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="类型：" class="formMust">
                    <Input v-model="formData.rel.keyType" placeholder="请输入类型" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.keyType == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="排序：" class="formMust">
                    <Input v-model="formData.rel.sortOrder" placeholder="请输入排序" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.sortOrder == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="键值：" class="formMust">
                    <Input v-model="formData.rel.keyValue" placeholder="请输入键值" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.sortOrder == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="标签：" class="formMust">
                    <Input v-model="formData.rel.keyLabel" placeholder="请输入键值" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.keyLabel == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="描述：" class="formMust">
                    <Input :autosize="{minRows: 5}" type='textarea' v-model="formData.rel.description" placeholder="请输入描述" style="width:60%"></Input>
                    <span v-if='formData.initF && formData.rel.description == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import {upload} from '@/core'
export default {
    name: 'dictionaryUpdate',
    props:["name",'detail'],
    components: {
        upload
    },
    data () {
        return {
            formData:{
                initF:false,
                rel:{
                    dictionaryId:"",
                    keyType:"",
                    sortOrder:"",
                    keyValue:"",
                    keyLabel:"",
                    description:""
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
            this.formData.rel = this.utils.getObjByKeys(this.formData.rel,JSON.parse(JSON.stringify(d)));
        },
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.post(Api.dictionary.update,this.formData.rel,(res)=>{
                    this.$Message.success("修改字典成功！");
                    this.utils.refshData(_this.$parent.$parent)
                });
            });
        },
    }
};
</script>
