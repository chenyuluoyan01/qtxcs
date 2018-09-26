<style lang="less" scoped>
    .table-wrap{
        border: 1px solid #ddd;
        border-bottom: none;
        margin:0;
        padding: 0;
        .sub-wrap{
            border-left: 1px solid #ddd;
            width: 100%;
            .m-sub-wrap{
                border-bottom: 1px solid #ddd;
                width: 100%;
            }
            .m-sub-wrap:last-child{
                border-bottom:none
            }
            .sub-title{
                border-right: 1px solid #ddd;
            }
        }
        .title{
            width: 100px;
            text-align:center
        }
    }
    .table-wrap:last-child{
        border-bottom: 1px solid #ddd;
    }
    .border-right{
        border-right: 1px solid #ddd;
    }
    .tb-tr{
        line-height: 30px;
        transition: .3s;
    }
    .tb-tr:hover{
        background: #ebf7ff;
        transition: .3s;
    }
    .cv-items{
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        cursor:pointer;
    }
    .cv-items:hover{
        background: #F7C4A6;
        color: #fff;
    }
    .BrandActive{
        background: #F7C4A6;
        color: #fff
    }
    .cv-items-brand:last-child{
        border-bottom: 0;
    }
    .my-table{
        border-left:0;
        tbody{
            tr{
                td{
                    padding:0;
                    vertical-align:top;
                }
            }
        }
    }
    .part-list{
        border-bottom:1px solid #ddd;
    }
    .part-list:last-child{
        border-bottom:0;
    }
    .car-main-part{
        width:120px;
    }
    .car-detail-part-wrap{
        width:180px;
        background:#fff;
        ul{
            li{
                padding-top: 10px;
                padding-bottom: 10px;
                border-left:1px solid #ddd;
                border-bottom:1px solid #ddd;
            }
            li:last-child{
                border-bottom:0;
            }
        }
    }
    .page-tile-lib{
        background:#fff;
        font-size:18px;
        color:#F7C4A6;
        width:140px;
    }
</style>

<template>
    <div class="view-main">
        <div class="ivu-modal-header-inner" style='height:60px;line-height:60px;position:relative;background:#F7C4A6'>
            <div class="page-tile-lib">钣金喷漆报价表</div>
            <p style='position:absolute;right:260px;top:0px;color:#fff'>商家可导出及导入最新Excel表格车型大数据</p>
            <div style='position:absolute;right:80px;top:0px;'>
                <up-file btnText='导入表格' :url='upUrl' :fileTypes="['xls','xlsx']"></up-file>
            </div>
            <Button @click='downloadExcel' type='primary' size='small' icon='ios-cloud-download-outline' style='position:absolute;right:30px;top:18px;'>导出表格</Button>
        </div>
        <table class="table table-bordered my-table" v-if='init'>
            <thead>
                <th>品牌</th>
                <th>车系</th>
                <th>部位</th>
                <th>商家报价</th>
            </thead>
            <tbody>
                <tr>
                    <td style="width:200px;padding:0">
                        <ul style="max-height:715px;overflow-y:auto">
                            <li
                                v-for='(item,index) in list'
                                :key='"brand"+item.brandId'
                                class="cv-items cv-items-brand"
                                :class='{ BrandActive:index == BrandNowIndex }'
                                @click='BrandNowIndex=index,CarsActiveNowIndex=0,getCars(index)'
                            >{{item.brandName}}</li>
                        </ul>
                    </td>
                    <td style="width:200px;padding:0">
                        <ul style="max-height:715px;overflow-y:auto">
                            <li
                                v-for='(e,i) in list[BrandNowIndex].carsList'
                                :key='"cars"+e.carsId'
                                class="cv-items cv-items-brand"
                                :class='{BrandActive: i==CarsActiveNowIndex}'
                                @click='CarsActiveNowIndex=i,getMoney(i)'
                            >{{e.carsName}}</li>
                        </ul>
                    </td>
                    <td style="width:300px;padding:0;">
                        <div class="max-height:60vh;overflow-y:auto">
                            <div class="flex row item-center part-list" style="background:#F5F7F9;">
                                <div class="car-main-part">车头车尾</div>
                                <div class="car-detail-part-wrap">
                                    <ul>
                                        <li>前保险杠</li>
                                        <li>前车盖</li>
                                        <li>后车盖</li>
                                        <li>后保险杠</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex row item-center part-list" style="background:#F5F7F9;">
                                <div class="car-main-part">车左侧</div>
                                <div class="car-detail-part-wrap">
                                    <ul>
                                        <li>左前翼子板</li>
                                        <li>左后视镜</li>
                                        <li>左前车门</li>
                                        <li>走后车门</li>
                                        <li>左右翼子板</li>
                                        <li>左裙边</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex row item-center part-list" style="background:#F5F7F9;">
                                <div class="car-main-part">车右侧</div>
                                <div class="car-detail-part-wrap">
                                    <ul>
                                        <li>右前翼子板</li>
                                        <li>右后视镜</li>
                                        <li>右前车门</li>
                                        <li>右后车门</li>
                                        <li>右右翼子板</li>
                                        <li>右裙边</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex row item-center part-list" style="background:#F5F7F9;">
                                <div class="car-main-part">其它</div>
                                <div class="car-detail-part-wrap">
                                    <ul>
                                        <li>车顶</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style="padding:0;background:#FBFBFB">
                        <ul style="max-height:715px;overflow-y:auto">
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["qbxg"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["qbxg2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["qcg"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["qcg2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["hcg"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["hcg2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["hbxg"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["hbxg2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zqyzb"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zqyzb2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zhsj"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zhsj2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zqcm"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zqcm2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zhcm"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zhcm2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zhyzb"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zhyzb2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zqb"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["zqb2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yqyzb"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yqyzb2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yhsj"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yhsj2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yqcm"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yqcm2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yhcm"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yhcm2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yhyzb"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yhyzb2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yqb"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["yqb2"]}}</span></p>
                            </li>
                            <li class="flex row item-center" style="border-bottom:1px solid #ddd">
                                <p style="flex:1;padding-bottom:10px;padding-top:10px;border-right:1px solid #ddd">钣金喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["cd"]}}</span></p>
                                <p style="flex:1">喷漆：<span style="color:#EC681F">￥{{list[BrandNowIndex].carsList[CarsActiveNowIndex].factoryPaint["cd2"]}}</span></p>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <div style="width:100%;overflow:auto">
            <table style="width:3600px;margin-bottom:0" class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th rowspan="2"  align="center" style="vertical-align:middle;width:200px;">品牌</th>
                        <th rowspan="2"  align="center" style="vertical-align:middle;width:200px;">车系</th>
                        <th colspan="18">喷漆</th>
                        <th colspan="17">钣金喷漆</th>
                    </tr>
                    <tr>
                      <th>左前翼子板</th>
                      <th>前保险杠</th>
                      <th>右前翼子板</th>
                      <th>左后视镜</th>
                      <th>前车盖</th>
                      <th>右后视镜</th>
                      <th>左前车门</th>
                      <th>车顶</th>
                      <th>右前车门</th>
                      <th>左后车门</th>
                      <th>后车盖</th>
                      <th>右后车门</th>
                      <th>左后翼子板</th>
                      <th>后保险杠</th>
                      <th>右后翼子板</th>
                      <th>左裙边</th>
                      <th>整车喷漆</th>
                      <th>右裙边</th>

                      <th>左前翼子板</th>
                      <th>前保险杠</th>
                      <th>右前翼子板</th>
                      <th>左后视镜</th>
                      <th>前车盖</th>
                      <th>右后视镜</th>
                      <th>左前车门</th>
                      <th>车顶</th>
                      <th>右前车门</th>
                      <th>左后车门</th>
                      <th>后车盖</th>
                      <th>右后车门</th>
                      <th>左后翼子板</th>
                      <th>后保险杠</th>
                      <th>右后翼子板</th>
                      <th>左裙边</th>
                      <th>右裙边</th>
                    </tr>
                </thead>
                <tr  class="tb-tr" v-for='(item,index) in list'>
                    <td v-if='item.brandName!=""' style="vertical-align:middle;" :rowspan="item.brandName | getRow">{{item.brandName}}</td>
                    <td>{{item.carsName}}</td>
                    <td>{{item.factoryPaint.zqyzb}}</td>
                    <td>{{item.factoryPaint.qbxg}}</td>
                    <td>{{item.factoryPaint.yqyzb}}</td>
                    <td>{{item.factoryPaint.yhsj}}</td>
                    <td>{{item.factoryPaint.qcg}}</td>
                    <td>{{item.factoryPaint.yhsj}}</td>
                    <td>{{item.factoryPaint.zqcm}}</td>
                    <td>{{item.factoryPaint.cd}}</td>
                    <td>{{item.factoryPaint.yqcm}}</td>
                    <td>{{item.factoryPaint.zhcm}}</td>
                    <td>{{item.factoryPaint.hcg}}</td>
                    <td>{{item.factoryPaint.yhcm}}</td>
                    <td>{{item.factoryPaint.zhyzb}}</td>
                    <td>{{item.factoryPaint.hbxg}}</td>
                    <td>{{item.factoryPaint.yhyzb}}</td>
                    <td>{{item.factoryPaint.zqb}}</td>
                    <td>{{item.factoryPaint.zcpq}}</td>
                    <td>{{item.factoryPaint.yqb}}</td>

                    <td>{{item.factoryPaint.zqyzb2}}</td>
                    <td>{{item.factoryPaint.qbxg2}}</td>
                    <td>{{item.factoryPaint.yqyzb2}}</td>
                    <td>{{item.factoryPaint.yhsj2}}</td>
                    <td>{{item.factoryPaint.qcg2}}</td>
                    <td>{{item.factoryPaint.yhsj2}}</td>
                    <td>{{item.factoryPaint.zqcm2}}</td>
                    <td>{{item.factoryPaint.cd2}}</td>
                    <td>{{item.factoryPaint.yqcm2}}</td>
                    <td>{{item.factoryPaint.zhcm2}}</td>
                    <td>{{item.factoryPaint.hcg2}}</td>
                    <td>{{item.factoryPaint.yhcm2}}</td>
                    <td>{{item.factoryPaint.zhyzb2}}</td>
                    <td>{{item.factoryPaint.hbxg2}}</td>
                    <td>{{item.factoryPaint.yhyzb2}}</td>
                    <td>{{item.factoryPaint.zqb2}}</td>
                    <td>{{item.factoryPaint.yqb2}}</td>
                </tr>
            </table>
        </div> -->
    </div>
</template>

<script>
import {upFile} from '@/core'
import md5Str from '@/libs/core/utils/lib/md5str.js'
export default {
    name: 'sheetMetalSprayPaint',
    components: {
        upFile
    },
    data () {
        return {
            upUrl:Api.factory.upExcel,
            init:false,
            list :[],
            source:[],
            BrandNowIndex:0,
            CarsActiveNowIndex:0
        };
    },
    filters:{
        getRow:function(name){
            let list = JSON.parse(localStorage.getItem("source"));
            for(let i in list){
                if(list[i].brandName == name){
                    return list[i].carsList.length
                }
            }
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        downloadExcel(){
            let token = localStorage.getItem('token');
            let factoryId = localStorage.getItem('factoryId');
            let sunnyfix_timestamp = new Date().getTime();
            let urls = Api.factory.downloadExcel+'&factoryId='+factoryId+'&token='+token+'&sunnyfix_timestamp='+sunnyfix_timestamp;
            let sunnyfix_sign = md5Str(urls);
            urls += '&sunnyfix_sign='+sunnyfix_sign;
            window.open(urls)
        },
        getCars(index){

        },
        getMoney(index){

        },
        getData(){
            this.utils.loading.show(this);
            this.post(Api.factory.print.get,res=>{
                let list = typeof res.object == 'string'?JSON.parse(res.object):res.object;
                this.list = list;
                this.init = true;
                $Vue.nextTick(()=>{
                    this.utils.loading.hide(this);
                })
                // let list = typeof res.object == 'string'?JSON.parse(res.object):res.object;
                // this.utils.setData("source",list)
                // let map = [];
                // list.map(item=>{
                //     item.carsList.map((todo,index)=>{
                //         if(index == 0){
                //             todo.brandName = item.brandName;
                //         }else{
                //             todo.brandName = ""
                //         }
                //     })
                // });
                // list.map(item=>{
                //     item.carsList.map(todo=>{
                //         map.push(todo)
                //     })
                // });
                // this.list = map;
                // $Vue.nextTick(()=>{
                //     $(".brand-name").each((i,e)=>{
                //         let each = $(".brand-name").eq(i);
                //         if(each.text() == ""){
                //             each.css("border","0")
                //         }
                //     });
                // })
            })
        }
    }
};
</script>
