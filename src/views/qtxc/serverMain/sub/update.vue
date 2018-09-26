<style lang="less">
.mbrage{
    margin-bottom: 20px;
    .ivu-icon.ivu-icon-ios-close-empty {
        position: absolute;
        right: 20px;
        top: 10px;
    }
}
</style>

<template>
    <div>
        <z-search @save='save' :searchData='searchData' @back='back'></z-search>
        <div class="i-form" style="padding-top:10px;">
            <Form  :label-width="120">
                    <h2 class="padding-left-small main-color padding-bottom-small text">基础信息</h2>
                    <FormItem label="服务分类：" class="formMust" >
                       <!-- <Select  v-model='formData.rel.itemCat'  style='width:200px;'>
                         <Option v-for='(todo,i) in formData.itemCatList.list' :key='"1xd"+i' :value='todo[formData.itemCatList.listId]'>{{todo[formData.itemCatList.listName]}}</Option>
                       </Select> -->
                        <p>{{formData.rel.itemCat | getName}}</p>
                        <span v-if='formData.initF&&formData.rel.itemCat==""' class="error-mark">
                            <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="项目分类：" class="formMust" v-if='itemStatus'>
                        <p>{{formData.rel.itemName}}</p>
                       <!-- <Select v-model='formData.rel.itemCode'  style='width:200px;'>
                         <Option v-for='(todo,i) in formData.itemCodeList.list' :key='"1xd"+i' :value='todo[formData.itemCodeList.listId]'>{{todo[formData.itemCodeList.listName]}}</Option>
                       </Select> -->
                        <span v-if='formData.initF&&formData.rel.itemCode == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="配件品牌名称：" class="formMust">
                       <!-- <Select v-model='formData.rel.goodsBrandId'  style='width:200px;'>
                         <Option v-for='(todo,i) in formData.brandList.list' :key='"1xd"+i' :value='todo[formData.brandList.listId]'>{{todo[formData.brandList.listName]}}</Option>
                       </Select> -->
                       <p>{{formData.rel.goodsBrandName}}</p>
                    </FormItem>
                    <FormItem label="商品名：" class="formMust">
                        <p>{{formData.rel.goodsName}}</p>
                        <!-- <Input v-model="formData.rel.goodsName" placeholder="请输入商品名称" style="width:320px;"></Input> -->
                        <span v-if='formData.initF && formData.rel.goodsName == ""' class="error-mark">
                            <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="商品主图：" class="formMust">
                        <img v-lazy="formData.rel.mainPicture" style="width:260px;">
                    </FormItem>

                    <FormItem label="商品价格：" class="formMust">
                        <InputNumber
                            :min='0'
                            v-model="formData.rel.price"
                            placeholder="请输入商品价格"
                            style="width:220px;"
                            @on-change = 'handelChange(formData.rel.price,"price")'
                        ></InputNumber>
                        <span v-if='formData.initF && formData.rel.price == 0' class="error-mark">
                            <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="工时费：">
                        <InputNumber
                            v-model="formData.rel.fee"
                            placeholder="请输入工时费"
                            style="width:220px;"
                            @on-change = 'handelChange(formData.rel.fee,"fee")'
                        ></InputNumber>
                    </FormItem>
                <Modal
                    v-model='brandChooseConfig.modal'
                    width="45vw"
                    :loading='brandChooseConfig.loading'
                    :mask-closable='false'
                    title='选择车品牌'
                >
                    <brand-choose v-if='brandChooseConfig.modal' ref='choose' />
                    <div slot="footer">
                        <Button @click="brandChooseConfig.modal=false">返回</Button>
                        <Button type="primary" @click='xSave'>保存</Button>
                    </div>
                </Modal>
                    <h2 class="padding-left-small main-color padding-bottom-small text">车型匹配</h2>
                    <FormItem label="品牌选择：" class="formMust">
                        <Button type='primary' @click='brandChooseConfig.modal=true'>点击选择品牌</Button>
                    </FormItem>
                    <FormItem label="车型选择：" class="formMust">
                        <TypeBlog :brandList='brandList'  v-if='xStatus'></TypeBlog>
                    </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import {upload,zSearch} from '@/core'
import brandChoose from './sub/brandChoose.vue'
import TypeBlog from './sub/TypeBlog.vue'
export default {
    name: 'partsAdd',
    components: {
        upload,TypeBlog,brandChoose,zSearch
    },
    filters : {
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
    watch:{
        'formData.rel.itemCat' :function(itemCat){
            this.get(Api.server.get,{itemCat:itemCat},(res)=>{
                this.formData.rel.itemCode = "";
                this.formData.itemCodeList.list = res.object[itemCat];
                this.itemStatus = false;
                $Vue.nextTick(()=>{
                    this.itemStatus = true;
                    if(this.init){
                        this.formData.rel.itemCode = this.utils.getData("currentGood").itemCode;
                        this.init = false;
                    };
                });
            });
        },
        'goodType' : function(goodType){
            this.refshTree = false;
            $Vue.nextTick(()=>{
                this.refshTree = true;
            })
        }
    },
    data () {
        return {
            brandListL:[],
            init:true,
            xStatus:false,
            picUpStatus:false,
            brandChooseConfig:{
               modal:false,
               name:"brandChooseConfig",
               loading:false
            },
            searchData:{
                search:false,
                save:true,
                back:true,
                list:[],
            },
            step:"1",
            goodType:"carType",
            itemStatus:true,
            refshTree:true,
            formData:{
                imgUpConfig:{
                    count:0,
                    defaultList:[],
                    fileDir:'goods'
                },
                itemCodeList:{
                    listId:"itemCode",
                    listName:"itemName",
                    list:[]
                },
                brandList:{
                    listId:"goodsBrandId",
                    listName:"goodsBrandName",
                    list:[]
                },
                itemCatList:{
                    listId:"id",
                    listName:"name",
                    list:[
                        {
                            name:"保养项目",
                            id:"BYXM"
                        },
                        {
                            name:"清洗养护",
                            id:"QXYH"
                        },
                        {
                            name:"维修项目",
                            id:"WXXM"
                        }
                    ]
                },
                initF:false,
                rel:{
                    goodsId:"",
                    goodsBrandId:"",
                    goodsBrandName:"",
                    mainPicture:"",
                    itemCat:"",
                    itemCode:"",
                    itemName:"",
                    goodsName:"",
                    price:0,
                    fee:0,
                    applyAllCar:'N',
                    putaway:'N',
                    goodsCardBrandIdArr:[],
                    goodsCarIdArr:[]
                }
            }
        }
    },
    mounted () {
        this.getBrand();
        this.utils.clearTypes();
        let currentGood = this.utils.getData("currentGood");
        let data = this.formData.rel;
        data.mainPicture = (currentGood.goodsPicList && currentGood.goodsPicList[0].url) || "";
        data.goodsId = currentGood.goodsId;
        data.itemName = currentGood.itemName;
        data.factoryGoodsRelId = currentGood.factoryGoodsRelId;
        data.goodsBrandName = currentGood.goodsBrandName;
        data.goodsBrandId = currentGood.goodsBrandId;
        data.itemCat = currentGood.itemCat;
        data.goodsName = currentGood.goodsName;
        data.refPrice = Number(currentGood.refPrice) || 0;
        data.applyAllCar = currentGood.applyAllCar || "N";
        data.price = Number(currentGood.price);
        data.fee = Number(currentGood.fee);
        data.putaway = currentGood.putaway;
        data.goodsCardBrandIdArr = currentGood.goodsCardBrandList;
        if(data.goodsCardBrandIdArr.length == 0){
            data.goodsCarIdArr = [];
        };
        data.goodsCarIdArr = currentGood.goodsCarList;
        //初始化 复杂数据（图片，品牌，和车型）

        let aimIds = [];
        let aimTypeId = [];
        for(let i in data.goodsCardBrandIdArr){
            let tmp = data.goodsCardBrandIdArr[i].brandId;
            aimIds.push(tmp);
        };
        for(let i in data.goodsCarIdArr){
            let tmp = data.goodsCarIdArr[i].cardTypeId;
            aimTypeId.push(tmp);
        };
        this.utils.setData("aimIds",aimIds);
        this.utils.setData("aimTypeId",aimTypeId);


        this.utils.setData("aimIdsS",aimIds);
        this.utils.setData("aimTypeIdS",aimTypeId);


        //已经选中品牌的 list
        let brandList = [];
        let brandMap = this.utils.getData("brandMap");
        let brandListC = currentGood.goodsCardBrandList;
        brandListC.map((item,index)=>{
            brandList.push({
                brandName:brandMap[item.brandId].brandName,
                brandId:item.brandId,
                visibel:false
            })
        });
        this.brandList = brandList;
        $Vue.nextTick(()=>{
            this.xStatus = true;
        });
    },
    methods: {
        handelChange(val,name){
            if(val){
                let str = val.toString();
                if(str.indexOf('.')!=-1 && str.length-str.indexOf('.')>3){
                    this.formData.rel[name] = Number(val.toFixed(2));
                };
            }else{
                this.formData.rel[name] = 0;
            }
        },
        xSave(){
            //执行了选择页面的保存
            this.$refs.choose.save();
            this.brandChooseConfig.modal = false;
            //已经选中品牌的 list
            let brandList = [];
            let brandMap = this.utils.getData("brandMap");
            let brandListC = this.utils.getData("aimIds");
            brandListC.map((brandId,index)=>{
                brandList.push({
                    brandName:brandMap[brandId].brandName,
                    brandId:brandId
                })
            });
            this.brandList = brandList;
            this.xStatus = false;
            $Vue.nextTick(()=>{
                this.xStatus = true;
            })
        },
        getUpList(url){
            this.formData.rel.goodsPictureIdArr = this.utils.getSingleItem(url,'url');
        },
        getBrand(){
            this.post(Api.goods.brand.get,(res)=>{
                this.formData.brandList.list = res.object || [];
            })
        },
        back(){
            this.utils.refshPage();
        },
        handleNum(val){
            if(val){
                let str = val.toString();
                if(str.indexOf('.')!=-1 && str.length-str.indexOf('.')>3){
                    return val.toFixed(2)
                }else{
                    return val
                }
            }else{
                return 0
            }
        },
        //保存
        save(){
            let _this = this;
            this.utils.loading.show(this);
            let data = JSON.parse(JSON.stringify(this.formData.rel));
            this.utils.resolveForm(_this,()=>{
                let aimIds = this.utils.getData("aimIds");
                let aimTypeId = this.utils.getData("aimTypeId");
                let brands = [];
                let types = [];
                aimIds.map(o=>{
                    brands.push({
                        brandId:o
                    })
                });
                aimTypeId.map(o=>{
                    types.push({
                        cardTypeId:o
                    })
                });
                data.goodsCarIdArr = JSON.stringify(types);
                data.goodsCardBrandIdArr = JSON.stringify(brands);
                let _this = this;
                data.fee = this.handleNum(data.fee);
                data.price = this.handleNum(data.price);
                this.post(Api.factory.goods.update,data,(res)=>{
                    this.$Message.success("修改商品成功！");
                    this.utils.loading.hide(this);
                    this.utils.refshPage();
                });
            });
        },
    }
};
</script>
