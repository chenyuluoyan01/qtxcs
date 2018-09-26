<style lang="less">

</style>

<template>
    <div class="view-main">
        <!--列表页面-->
        <div class="list-page">
            <z-search :searchData='searchData' @getParam= 'getParam' @add='add'></z-search>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="width-60">序号</th>
                        <th>类型</th>
                        <th>键值</th>
                        <th>标签</th>
                        <th>描述</th>
                        <th class="width-200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(item,index) in list" :key='index+"xc"'>
                        <td>{{index+1}}</td>
                        <td>{{item.keyType}}</td>
                        <td>{{item.keyValue}}</td>
                        <td>{{item.keyLabel}}</td>
                        <td style="width:300px">{{item.description}}</td>
                        <td>
                            <span class="btn" @click='update(item)'>编辑</span>
                            <span class="btn" @click='addByKeyType(item)'>增加键值</span>
                            <cut @del='del(item)'></cut>
                        </td>
                    </tr>
                    <tr v-if='list.length == 0'><td colspan="6">暂无数据</td></tr>
                </tbody>
            </table>
            <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page>
        </div>

        <!--添加-->
        <Modal
            v-model='addConfig.modal'
            width="45vh"
            :mask-closable='false'
            title='创建字典'
            @on-ok = 'addSave'
            :closable = 'false'
        >
            <insert v-if='addConfig.modal' :name="addConfig.name" ref='add' />
            <div slot="footer">
                <Button @click='addBack'>返回</Button>
                <Button type="primary" :loading="addConfig.loading" @click="addSave">保存</Button>
            </div>
        </Modal>

        <!--编辑-->
        <Modal
            v-model='updateConfig.modal'
            width="45vh"
            :loading='updateConfig.loading'
            :mask-closable='false'
            title='编辑字典'
        >
            <update :detail="detail"  v-if='updateConfig.modal' :name="updateConfig.name" ref='update' />
            <div slot="footer">
                <Button @click="updateConfig.modal=false">返回</Button>
                <Button type="primary" :loading="updateConfig.loading" @click="updateSave">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {zTable,zPage,zSearch,cut} from '@/core'
import views from './sub/view.vue'
import insert from './sub/add.vue'
import update from './sub/update.vue'

export default {
    name: 'demo',
    components: {
        zPage,zSearch,views,insert,cut,update
    },
    data () {
        return {
            addConfig:{
               modal:false,
               name:"addConfig",
               loading:false
            },
            updateConfig:{
               modal:false,
               name:"updateConfig",
               loading:false
            },
            viewConfig:{
               modal:false,
               name:"viewConfig"
            },
            refsh:true,
            detail:{},
            dataSource:{
                url:Api.dictionary.get,
                param:{}
            },
            searchData:{
                add:true,
                source:{
                    keyTypeList:{
                        listName:"name",
                        listId:"id",
                        list:[]
                    }
                },
                list:[
                    {
                        type:'select',
                        id:'keyType',
                        name:"类型",
                        source:"keyTypeList"
                    },

                ],
                rel:{
                    keyType:""
                }
            },
            list:[]
        };
    },
    mounted () {
        this.getKeyType()
    },
    methods: {
        getKeyType: function(){
            this.post(Api.dictionary.get,(res)=>{
                let list = res.object || [];
                let arr = [];
                let aArr = [];
                for(let i in list){
                    arr.push(list[i].keyType)
                };
                arr = $.unique(arr);
                for(let i in arr){
                    aArr.push({
                        name:arr[i],
                        id:arr[i]
                    })
                };
                this.searchData.source.keyTypeList.list = aArr;
            })
        },
        del: function(item){
            let _this = this;
            let dictionaryId = item.dictionaryId;
            let data = {deletedYn:'Y',dictionaryId:dictionaryId};
            this.post(Api.dictionary.delete,data,(res)=>{
                this.$Message.success("删除成功！")
                this.utils.refshData(_this);
            });
        },
        addSave: function(){
            this.$refs.add.save();
        },
        updateSave: function(){
            this.$refs.update.save();
        },
        //分页组件吐出数据
        getPageData: function(list){
            this.list = list.object;
        },
        //当筛选参数改变的时候，重新触发分页组建
        getParam: function(param){
            let _this = this;
            this.dataSource.param = param;
            this.utils.refshData(_this)
        },
        add: function(){
            this.addConfig.modal = true;
        },
        addBack: function(){
            localStorage.removeItem("currentKeyType");
            this.addConfig.modal=false;
        },
        addByKeyType: function(item){
            let keyType = item.keyType;
            localStorage.setItem("currentKeyType",keyType);
            this.addConfig.modal = true;
        },
        update: function(params){
            this.detail = params;
            $Vue.nextTick(()=>{
                this.updateConfig.modal = true;
            });
        }
    }
};
</script>
