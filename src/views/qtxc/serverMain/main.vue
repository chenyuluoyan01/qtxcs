<style lang="less">

</style>

<template>
    <div class="view-main">
        <Modal v-model='pictureLook'>
            <img :src="currentUrl" style="width: 80%;margin-left:10%;margin-top:30%;">
        </Modal>
        <!--列表页面-->
        <transition name='fold'>
            <div class="list-page" v-if='pageStatus == "view"'>
                <z-search :searchData='searchData' @getParam='getParam' @add='add'></z-search>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>商品主图</th>
                            <th>品牌</th>
                            <th>商品名</th>
                            <th>商品价格 (元)</th>
                            <th>工时费 (元)</th>
                            <th>销量</th>
                            <!-- <th>有货商家</th> -->
                            <th>状态</th>
                            <th class="width-200">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for = "(item,index) in list" :key='index+"xc"'>
                            <td>{{index+1}}</td>
                            <td>
                                <img
                                    ref='imgs'
                                    @click='lookPic(index)'
                                    v-lazy='handlePic(item.goodsPicList)'
                                    style="width:60px;height:60px;cursor:pointer"
                                >
                            </td>
                            <td>{{item.goodsBrandName}}</td>
                            <td>{{item.goodsName}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.fee}}</td>
                            <td>{{item.salesAmount}}</td>
                            <td>{{item.putaway | getPutaway}}</td>
                            <td>
                                <!-- <span class="btn" @click='putaway(item)'>{{item.putaway | getPutawayF}}</span> -->
                                <!-- <span class="btn" @click='view(item)'>查看</span> -->
                                <span class="btn" @click='update(item)'>编辑</span>
                                <cut @del='del(item)'></cut>
                            </td>
                        </tr>
                        <tr v-if='list.length == 0'><td colspan="9">暂无数据</td></tr>
                    </tbody>
                </table>
                <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page>
            </div>
        </transition>


        <!-- 新增逻辑 -->
        <transition name = 'fold'>
            <div class="list-page" v-if='pageStatus == "add"'>
                <insert v-if='pageStatus == "add"' ref='add' />
            </div>
        </transition>

        <!-- 编辑逻辑 -->
        <transition name = 'fold'>
            <div class="list-page" v-if='pageStatus == "update"'>
                <update v-if='pageStatus == "update"' ref='update' />
            </div>
        </transition>
    </div>
</template>

<script>
import {zTable,zPage,zSearch,zModel,freeze,cut} from '@/core'
import insert from './sub/add.vue'
import update from './sub/update.vue'

export default {
    name: 'demo',
    components: {
        zPage,zSearch,freeze,insert,cut,zModel,update
    },
    filters: {
        getPic: function(arr){
            if($.isArray(arr)){
                if(arr[0]){
                    return arr[0].url
                }
            }else{
                return ""
            }
        },
        getPutaway: function(putaway){
            let putawayDes = "上架";
            if(putaway == 'N'){
                putawayDes = "下架"
            };
            return putawayDes
        },
        getPutawayF: function(putaway){
            let putawayDes = "上架";
            if(putaway == 'Y'){
                putawayDes = "下架"
            };
            return putawayDes
        },
        getName: function(itemCat){
            let itemName = "";
            if(itemCat == 'BYXM'){
                itemName = "保养项目"
            }else if(itemCat == 'QXYH'){
                itemName = "清洗养护"
            }else if(itemCat == 'WXXM'){
                itemName = "维修项目"
            };
            return itemName
        }
    },
    data () {
        return {
            itemCode:"",
            pictureLook:false,
            pageStatus:'view',
            currentUrl:"",
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
            refsh:false,
            detail:{},
            dataSource:{
                url:Api.factory.goods.get,
                param:{}
            },
            searchData1:{
                save:true,
                back:true,
                list:[
                    {
                        type:"input",
                        name:"配件品牌名称",
                        id:"goodsBrandName"
                    }
                ],
                rel:{
                    goodsBrandName:""
                }
            },
            searchData2:{
                save:true,
                search:false,
                back:true,
                list:[
                    {
                        type:"input",
                        name:"配件品牌名称",
                        id:"goodsBrandName"
                    }
                ],
                rel:{
                    goodsBrandName:""
                }
            },
            searchData:{
                add:true,
                source:{},
                list:[
                    {
                        type:"input",
                        name:"配件品牌名称",
                        id:"goodsBrandName"
                    }
                ],
                rel:{
                    goodsBrandName:""
                }
            },
            list:[]
        };
    },
    watch:{
        '$route':function(router){
            let itemCode = router.query.itemCode;
            this.itemCode = itemCode;
            this.refsh = false;
            this.dataSource.param.itemCode = itemCode;
            $Vue.nextTick(()=>{
                this.refsh = true;
            });
        }
    },
    mounted () {
        let itemCode = $(".big-menu").attr("itemCode");
        if(itemCode == undefined || itemCode == null ||  itemCode == ""){
            itemCode = localStorage.getItem("firstItemCode");
        };
        if(itemCode){
            this.itemCode = itemCode;
            this.dataSource.param.itemCode = itemCode;
            this.refsh = true;
        };
    },
    methods: {
        handlePic: function(list){
            if( list instanceof Array ){
                if( list.length > 0 ){
                    return list[0].url
                }else{
                    return ""
                }
            }else{
                return ""
            }
        },
        Aback: function(){
            this.utils.clearTypes();
            this.updateConfig.modal=false
        },
        Bsave: function(){
            this.$refs.add.save();
        },
        Bback: function(){
            this.pageStatus = 'view';
        },
        Bsave1: function(){
            this.$refs.update.save();
        },
        getData: function(){
            this.get(Api.goods.get,(res)=>{
                this.list = res.object || [];
            })
        },
        lookPic: function(index){
            this.currentUrl = this.$refs.imgs[index].src;
            this.pictureLook = true;
        },
        putaway: function(item){
            let putawayDse = item.putaway == 'Y'?'下架':'上架'
            let msg = `该商品${putawayDse}成功！`
            let data = {
                goodsId:item.goodsId,
                factoryId:localStorage.getItem("factoryId"),
                putaway:item.putaway == 'Y'?'N':'Y'
            };
            this.post(Api.goods.putaway,data,(res)=>{
                this.$Message.success(msg)
                this.getData()
            })
        },
        del: function(item){
            let goodsId = item.goodsId;
            let factoryGoodsRelId = item.factoryGoodsRelId;
            let data = {goodsId:goodsId,deletedYn:'Y',factoryGoodsRelId:factoryGoodsRelId};
            this.post(Api.factory.goods.delete,data,(res)=>{
                let _this = this;
                this.$Message.success("删除商品成功！");
                this.utils.refshData(_this)
            })
        },
        //分页组件吐出数据
        getPageData: function(list){
            // let lists = [];
            // this.utils.setData("listBiz",list.object)
            // list.object.map((item)=>{
            //     delete item.goodsCarList
            //     delete item.goodsCardBrandList
            // })
            this.list = list.object;
        },
        //当筛选参数改变的时候，重新触发分页组建
        getParam: function(param){
            let _this = this;
            if(Object.keys(this.dataSource.param).indexOf("goodsBrandName") != -1){
                delete this.dataSource.param.goodsBrandName;
            };
            this.dataSource.param = Object.assign(this.dataSource.param,param);
            this.utils.refshData(_this);
        },
        //表格操作函数
        view: function(params){
            this.detail = params;
            $Vue.nextTick(()=>{
                this.viewConfig.modal = true;
            });
        },
        add: function(){
            this.pageStatus = 'add';
        },
        update: function(params){
            this.utils.loading.show(this);
            this.get(Api.factory.goods.getById,{goodsId:params.goodsId},res=>{
                let data = res.object[0];
                this.utils.setData("currentGood",data);
                this.pageStatus = 'update';
            });
        }
    }
};
</script>
