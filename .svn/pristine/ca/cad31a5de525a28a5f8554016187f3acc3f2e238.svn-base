<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
    .sub-card-title{
        font-size:14px;
        border-left:4px solid #888;
        padding:2px 6px;
        color:#555;
        font-weight:600;
        margin-top: 10px;
        margin-bottom:20px;
        text-indent:6px;
    }
</style>
<template>
    <div class="home-main">
        <Row>
            <Card :padding="0">
                <p slot="title" class="card-title">
                    昨日数据(每天8点更新)
                </p>
            </Card>
        </Row>
        <Row style='margin-top:10px;'>
            <Card :padding="0">
                <p slot="title" class="card-title">
                    <Icon type="star"></Icon>
                    关键指标
                </p>
                <div class="map-con clear" style="height:140px; padding:20px;">
                    <Col :md="24" :lg="16">
                        <Row :gutter="5">
                            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                                <infor-card
                                    id-name="user_created_count"
                                    :end-val="count.createUser"
                                    iconType="android-person-add"
                                    color="#2d8cf0"
                                    intro-text="今日新增用户"
                                ></infor-card>
                            </Col>
                            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                                <infor-card
                                    id-name="visit_count"
                                    :end-val="count.visit"
                                    iconType="ios-eye"
                                    color="#64d572"
                                    :iconSize="50"
                                    intro-text="今日浏览量"
                                ></infor-card>
                            </Col>
                            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                                <infor-card
                                    id-name="collection_count"
                                    :end-val="count.collection"
                                    iconType="upload"
                                    color="#ffd572"
                                    intro-text="今日数据采集量"
                                ></infor-card>
                            </Col>
                            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                                <infor-card
                                    id-name="transfer_count"
                                    :end-val="count.transfer"
                                    iconType="shuffle"
                                    color="#f25e43"
                                    intro-text="今日服务调用量"
                                ></infor-card>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    历史趋势
                </p>
                <div class="time-kp">
                    <div class="form">
                        <h4 style="display:inline-block;position:relative;top:-20px;">时间：</h4>
                        <Tabs size='small' @on-click='switchTab' type="card" style='display:inline-block'>
                            <TabPane name='day' label="按天"></TabPane>
                            <TabPane name='yue' label="按月"></TabPane>
                            <TabPane name='zxfw' label="自选范围"></TabPane>
                        </Tabs>
                        <DatePicker
                          v-if = 'dateType == "daterange"'
                          :value="time.timeList"
                          @on-change="getDate"
                          format="yyyy-MM-dd"
                          type="daterange"
                          placement="bottom-end"
                          placeholder="请选择日期范围"
                          style="width:200px;position:relative;top:-30px;left:20px;"
                        ></DatePicker>
                        <DatePicker
                          v-if = 'dateType == "day"'
                          :value="time.day"
                          @on-change="getDay"
                          format="yyyy-MM-dd"
                          type="date"
                          placeholder="请选择日期"
                          style="width:200px;position:relative;top:-30px;left:20px;"
                        ></DatePicker>
                        <DatePicker
                            v-if = 'dateType == "month"'
                            type="month"
                            @on-change="getMonth"
                            :value="time.timeMonth"
                            placeholder="请选择月份"
                            style="width:200px;position:relative;top:-30px;left:20px;"
                        ></DatePicker>
                        <!-- <DatePicker
                          type="date"
                          :value="time.timeWeekStart"
                          placeholder="请选择一周的开始时间"
                          style="width: 200px;position:relative;top:-30px;left:20px;"
                          @on-change="getWeek"
                          >
                        </DatePicker> -->
                    </div>

                </div>
                <Tabs @on-click='switchTab'>
                    <TabPane name='zhzb' label="综合指标"></TabPane>
                    <TabPane name='pv' label="浏览量(PV)"></TabPane>
                    <TabPane name='uv' label="独立用户(UV)"></TabPane>
                    <TabPane name='vv' label="访问次数(VV)"></TabPane>
                    <TabPane name='dlip' label="独立IP"></TabPane>
                    <TabPane name='tcl' label="跳出率"></TabPane>
                    <TabPane name='zxsc' label="平均在线时长"></TabPane>
                </Tabs>
                <div class="card-title sub-card-title">趋势图</div>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
                <div class="card-title sub-card-title">详细数据</div>
                <div>
                    <z-table :titles='titles' :list='list'></z-table>
                    <!-- <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page> -->
                </div>
                <div class="card-title sub-card-title">用户/门店地域分布</div>
                <div class="map-con">
                    <Col span="14" class="map-incon">
                        <Row type="flex" justify="center" align="middle">
                            <home-map :city-data="cityData"></home-map>
                        </Row>
                    </Col>
                    <Col span="10">
                        <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                    </Col>
                </div>
            </Card>
        </Row>
        <!-- <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="avatorPath" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">Admin</b>
                                            <p>super admin</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">北京</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>
                                待办事项
                            </p>
                            <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                                <Icon type="plus-round"></Icon>
                            </a>
                            <Modal
                                v-model="showAddNewTodo"
                                title="添加新的待办事项"
                                @on-ok="addNew"
                                @on-cancel="cancelAdd">
                                <Row type="flex" justify="center">
                                    <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                                </Row>
                                <Row slot="footer">
                                    <Button type="text" @click="cancelAdd">取消</Button>
                                    <Button type="primary" @click="addNew">确定</Button>
                                </Row>
                            </Modal>
                            <div class="to-do-list-con">
                                <div v-for="(item, index) in toDoList" :key="index" class="to-do-item">
                                    <to-do-list-item :content="item.title"></to-do-list-item>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日新增用户"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日浏览量"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="upload"
                            color="#ffd572"
                            intro-text="今日数据采集量"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="今日服务调用量"
                        ></infor-card>
                    </Col>
                </Row>
                <Row>
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            今日服务调用地理分布
                        </p>
                        <div class="map-con">
                            <Col span="10">
                                <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                            </Col>
                            <Col span="14" class="map-incon">
                                <Row type="flex" justify="center" align="middle">
                                    <home-map :city-data="cityData"></home-map>
                                </Row>
                            </Col>
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        上周每日来访量统计
                    </p>
                    <div class="data-source-row">
                        <visite-volume></visite-volume>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        数据来源统计
                    </p>
                    <div class="data-source-row">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-wifi"></Icon>
                        各类用户服务调用变化统计
                    </p>
                    <div class="data-source-row">
                        <user-flow></user-flow>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row> -->
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import {zTable,zPage} from '@/core'
export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem,
        zTable,
        zPage
    },
    data () {
        return {
            dateType:"day",
            time:{
                timeList:[],
                timeMonth:"",
            },
            refsh:true,
            titles: [
                {
                    title:"姓名",
                    key:"name"
                },
                {
                    title:"操作",
                    key:"action",
                    width:300,
                    btns:[
                        {
                            text:"查看",
                            on:"view"
                        },
                        {
                            text:"冻结",
                            on:"view"
                        },
                        {
                            text:"删除",
                            on:"view"
                        }
                    ]
                }
            ],
            list:[
                {
                    name: 'John Brown',
                },
                {
                    name: 'Jim Green',
                },
                {
                    name: 'Joe Black',
                },
                {
                    name: 'Jon Snow',
                }
            ],
            dataSource:{
                url:Api.login,
                param:{phone:17603006126,password:"12345678"}
            },
            toDoList: [
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                }
            ],
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: ''
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        getDate: function(time){

        },
        getDay: function(time){},
        getMonth: function(time){
        },
        switchTab: function(name){
            if(name == 'day'){
                this.dateType = 'day';
            }else if(name == 'yue'){
                this.dateType = 'month';
            }else if(name == 'zxfw'){
                this.dateType = 'daterange';
            }
        },
        //分页组件吐出数据
        getPageData: function(list){
            console.log(list)
        },
        //表格操作函数
        view: function(params){
            alert(params.name)
        },
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
