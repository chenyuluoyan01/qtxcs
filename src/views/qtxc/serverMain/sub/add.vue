<style lang="less">
    .bgred {
        background:#FFCC66;
    }
    .table-hover tbody tr.bgred:hover{
        background:#FFCC66!important;
    }
    .table-hover tbody tr.bgred:hover td{
        background:none!important;
    }
    .page-wrap{
        position:fixed;
        bottom: 0px;
        right: 0px;
        width: 100%;
    }
</style>

<template>
    <Row>
        <Col span="24">
            <Modal v-model='pictureLook'>
                <img :src="currentUrl" style="width: 80%;margin-left:10%;margin-top:30%;">
            </Modal>
            <Card>
                <z-search
                    @getParam='getParam'
                    :searchData='searchData'
                ></z-search>
                <div class="goods-add-wrap" style="overflow-y:auto;position:relative;">
                    <table class="table table-hover" style="margin-bottom:20px!important;">
                        <thead>
                            <th class="width-80">选择</th>
                            <th style="width:180px;">商品主图</th>
                            <th>商品名</th>
                            <th style="width:180px;">商品价格</th>
                            <th style="width:180px;">工时费</th>
                        </thead>
                        <tbody v-if='tableInit'>
                            <tr :class='{bgred:item.error}' v-for = "(item,index) in list" :key='index+"xc"'>
                                <td v-if='item.old'>
                                    已上架
                                </td>
                                <td v-else>
                                    <CheckboxGroup  v-model='checkedGoodsIds'>
                                        <Checkbox :label='item.goodsId'><span style="opacity:0">{{index+1}}</span></Checkbox>
                                    </CheckboxGroup>
                                </td>
                                <td>
                                    <img
                                        ref='imgs'
                                        @click='lookPic(index)'
                                        v-lazy='getPic(item.goodsPictureIdList)'
                                        style="width:60px;height:60px;cursor:pointer"
                                    >
                                </td>
                                <td>{{item.goodsName}}</td>
                                <td v-if='item.old'>
                                    {{item.price}}
                                </td>
                                <td v-else>
                                    <InputNumber
                                      v-model="item.price"
                                      @on-change = 'handelChange(item.price,"price",index)'
                                    ></InputNumber>
                                </td>
                                <td v-if='item.old'>
                                    {{item.fee}}
                                </td>
                                <td v-else>
                                    <InputNumber
                                        v-model="item.fee"
                                         @on-change = 'handelChange(item.fee,"fee",index)'
                                    ></InputNumber>
                                </td>

                            </tr>
                            <tr v-if='list.length == 0'><td colspan="5">暂无数据</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="page-wrap" v-if='pageInit'>

                    <div class="page-deliver clear">
                        <ul class="ivu-page clear">
                            <span class="ivu-page-total">共 <span class="main-color text">{{Math.ceil(pageConfig.totolSize/pageConfig.pageSize)}}</span> 页</span>

                            <li @click='prePage' title="上一页" class="ivu-page-prev" v-if='pageConfig.currentPage>1'>
                                <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
                            </li>
                            <li title="上一页" class="ivu-page-prev ivu-page-disabled" v-else>
                                <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
                            </li>

                            <li title="1" class="ivu-page-item ivu-page-item-active"><a>{{pageConfig.currentPage}}</a></li>

                            <li @click='nextPage' title="下一页" class="ivu-page-next" v-if='pageConfig.currentPage<pageConfig.totolSize/pageConfig.pageSize'>
                                <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
                            </li>
                            <li title="下一页" class="ivu-page-next ivu-page-disabled" v-else>
                                <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
                            </li>
                            <div class="ivu-page-options">
                                <div class="ivu-page-options-sizer">
                                    <Select v-model='pageConfig.pageSize'>
                                        <Option v-for='(e,i) in pageConfig.pageSizeList' :value='e'>{{e}}条/页</Option>
                                    </Select>
                                </div>
                                <div class="ivu-page-options-elevator">
                                    跳至
                                    <input type="text" @keyup.enter='goPage' v-model='pageConfig.gotoPage' autocomplete="off" spellcheck="false">
                                    页
                                </div>
                                <div class="ivu-page-options-elevator" style="margin-left:20px;">
                                    <span class="ivu-page-total">共 {{pageConfig.totolSize}} 条</span>
                                </div>
                            </div>
                        </ul>

                    </div>
                </div>
                <div class="flex row item-center justify-between" style="padding:20px;padding-bottom:0;padding-right:40px;">
                    <Checkbox style="flex:1" :title='selectDis?"当页商品已全部添加":"全选"' @on-change='handleCheckChange(selectAll)' :disabled='selectDis' v-model='selectAll'>全选</Checkbox>
                    <p style="flex:14"><span class="text main-color">注：</span>车主订单金额由<商品价格>+<工时费>组成，工时费不重复计算</p>
                    <div class="goods-add-btn-list">
                        <Button style='margin-left:20px;margin-right:20px;'  icon='checkmark' size='small' type='success' @click='Bsave'>保存</Button>
                        <Poptip
                            placement='top'
                            width='200'
                            confirm
                            title="还没有保存，确定要离开吗?"
                            @on-ok="Bback"
                            style='text-align:left'
                        >
                            <Button size='small' type='primary' icon="arrow-left-c">返回</Button>
                        </Poptip>
                    </div>
                </div>
                <!-- <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page> -->
            </Card>
        </Col>
    </Row>
</template>

<script>
import {zSearch,zPage} from '@/core'
export default {
    name: 'bannerAdd',
    props:["name"],
    components: {
        zSearch,zPage
    },
    data () {
        return {
            selectAll:false,
            selectDis:false,
            pageInit:false,
            pageConfig:{
                pageSize:10,
                pageSizeList:[10,20,30,40],
                currentPage:1,
                totolSize:0,
                gotoPage:1
            },
            goodIdInit:[],
            tableInit:false,
            nowIndex:1,
            totolPage:0,
            pictureLook:false,
            currentUrl:"",
            refsh:false,
            list:[],
            goodsIdsCache:{},
            checkedGoodsIds:[],
            searchData:{
                list:[
                    {
                        type:"input",
                        name:"配件品牌名称",
                        id:"goodsBrandName"
                    },
                ],
                rel:{
                    goodsBrandName:"",
                }
            },
            dataSource:{
                url:Api.goods.get,
                param:{itemCode:this.$parent.itemCode}
            },
        }
    },
    mounted () {
        //获取所有已选择的商品
        this.post(Api.factory.goods.get,{itemCode:this.$parent.itemCode},res=>{
            this.goodIdInit = res.object || [];
            this.refsh = true;
        });
        this.getListInit();
    },
    watch: {
        'pageConfig.pageSize'(val){
            this.handleGo("size")
        }
    },
    methods: {
        handleCheckChange: function(status){
            if(status){
                let filList = this.list.filter((item)=>{
                    return item.old != true;
                });
                filList.map(item=>{
                    this.checkedGoodsIds.push(item.goodsId)
                })
            }else{
                this.checkedGoodsIds = [];
            }
        },
        handelChange: function(val,name,i){
            let str = val.toString();
            if(str.indexOf('.')!=-1 && str.length-str.indexOf('.')>3){
                this.goodsIdsCache[this.nowIndex][i][name] = Number(val.toFixed(2));
                this.tableInit = false;
                $Vue.nextTick(()=>{
                    this.tableInit = true;
                })
            };
        },
        getPic: function(arr){
            if($.isArray(arr)){
                if(arr[0]){
                    return arr[0].url
                }
            }else{
                return ""
            }
        },
        lookPic: function(index){
            this.currentUrl = this.$refs.imgs[index].src;
            this.pictureLook = true;
        },
        handleGo: function(status){
            let _this = this;
            this.selectAll = false;
            if(this.checkedGoodsIds.length>0){
                this.utils.dialog.show({
                    ok:()=>{
                        if(status == "pre"){
                            _this.pageConfig.currentPage --;
                        }else if(status == "next"){
                            _this.pageConfig.currentPage ++;
                        }else if(status == "size"){
                            _this.pageConfig.currentPage = 1;
                        }else if(status == "goto"){
                            _this.pageConfig.currentPage = _this.pageConfig.gotoPage;
                        }
                        _this.getListInit();
                        this.checkedGoodsIds = [];
                    }
                });
            }else{
                if(status == "pre"){
                    _this.pageConfig.currentPage --;
                }else if(status == "next"){
                    _this.pageConfig.currentPage ++;
                }else if(status == "size"){
                    _this.pageConfig.currentPage = 1;
                }else if(status == "goto"){
                    _this.pageConfig.currentPage = _this.pageConfig.gotoPage;
                }
                _this.getListInit()
            }
        },
        prePage: function(){
            this.handleGo("pre")
        },
        nextPage: function(){
            this.handleGo("next")
        },
        goPage:function(){
            this.handleGo("goto");
        },
        getListInit: function(){
            let data = {
                itemCode:this.$parent.itemCode,
                pageSize:this.pageConfig.pageSize,
                currentPage:this.pageConfig.currentPage
            };
            this.utils.loading.show(this)
            this.post(Api.goods.get,data,res=>{
                this.pageConfig.totolSize = res.pageBean.totolSize;
                this.pageInit = true;
                this.getPageData(res);
            })
        },
        //分页组件吐出数据
        getPageData: function(list){
            let lists = list.object || [];
            let listInit = this.goodIdInit;
            lists.map(item=>{
                item.price = 0;
                item.fee = 0;
                item.error = false;
            });
            lists.map((item,index)=>{
                for(let i in listInit){
                    if(item.goodsId == listInit[i].goodsId){
                        item.old = true;
                        item.price = listInit[i].price;
                        item.fee = listInit[i].fee;
                    }
                }
            });
            if(lists.filter(item=>item.old!=true).length == 0){
                this.selectDis = true;
            }else{
                this.selectDis = false;
            }
            this.list = lists;
            this.tableInit = false;
            $Vue.nextTick(()=>{
                this.tableInit = true;
                this.utils.loading.hide(this)
            })
        },
        //当筛选参数改变的时候，重新触发分页组件
        getParam: function(param){
            let _this = this;
            this.pageConfig.currentPage = 1;
            let data = {
                itemCode:this.$parent.itemCode,
                pageSize:this.pageConfig.pageSize,
                currentPage:this.pageConfig.currentPage
            };
            if(param.goodsBrandName){
                data.goodsBrandName = param.goodsBrandName;
            };
            this.utils.loading.show(this)
            this.post(Api.goods.get,data,res=>{
                this.pageConfig.totolSize = res.pageBean.totolSize;
                this.pageInit = true;
                this.getPageData(res);
            })
        },
        Bsave(){
            let goodsIds = this.checkedGoodsIds;
            let goodsList = this.list;
            let list = [];
            let error = false;
            goodsList.map( (todo,index) => {
                goodsIds.map(id => {
                    if(todo.goodsId == id){
                        if(!todo.price){
                            todo.error = true;
                            error = true;
                        }else{
                            list.push({
                                goodsId:id,
                                price:todo.price,
                                fee:todo.fee,
                                itemCode:todo.itemCode,
                                itemCat:todo.itemCat,
                                goodsBrandId:todo.goodsBrandId,
                                factoryId:localStorage.getItem("factoryId")
                            })
                        };
                    };
                })
            })
            if(error){
                this.$Message.warning("请补全已选中商品的价格、工时费数据！")
            }else{
                if(list.length == 0){
                    this.$Message.warning("请选择要添加的商品！");
                    return false
                }
                let data = {
                    factoryGoodsList:JSON.stringify(list)
                };
                this.post(Api.factory.goods.insert,data,(res)=>{
                    this.$Message.success("新增汽修厂商品成功！");
                    this.Bback();
                });
            };
        },
        Bback(){
            this.$parent.pageStatus = "view";
        },
    }
};
</script>
