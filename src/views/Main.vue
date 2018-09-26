<style lang="less">
    @import "./main.less";
    .main-breadcrumb{
        line-height: 60px;
        span,a{
            color:#efefef;
            font-size:14px;
        }
        span:hover,a:hover{
            color:#fff;
        }
    };
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .before-read{
        width:100vw;
        height:100vh;
        background: rgba(0,0,0,.6);
        position:fixed;
        top: 0;
        left: 0;
        z-index: 99;
    }
    .step-0{
        position:fixed;
        width:460px;
        height:400px;
        top:0;
        left: 0;
        bottom:0;
        right:0;
        margin: auto;
        .top-img{
            img{
                vertical-align: top;
            }
        }
    }
</style>
<template>
    <div>
       <Spin fix style='z-index:999999999999999999999999999999999' v-if='statusInit'>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <transition name='fade'>
            <div class="before-read" v-if='ifNew && step == 0'>
                <div class="step step-0">
                    <div class="top-img">
                        <img src="../images/readstep/step1/1.png" height="323" width="374">
                        <img @click='ifNew = false,setNew()' src="../images/readstep/step1/close.png" height="72" width="54" style="margin-top:20px;cursor:pointer">
                    </div>
                    <div class="top-img">
                        <img @click='step = 1,setNew()' src="../images/readstep/step1/next.png" style="margin-left:100px;margin-top:14px;cursor:pointer" height="66" width="129">
                    </div>
                </div>
            </div>
        </transition>
        <transition name='fade'>
            <div class="before-read" v-if='ifNew && step == 1'>
                <div class="step step-1">
                    <img src="../images/readstep/step7/pp.png" height="58" width="181" style="margin-top:120px">
                    <img src="../images/readstep/step7/tb.png" height="233" width="272" style="position:fixed;top:120px;">
                    <img  @click='ifNew = false' src="../images/readstep/step1/close.png" height="72" width="54"  style="position:fixed;top:90px;left:500px;cursor:pointer">
                    <img  @click='step = 2' src="../images/readstep/step1/next.png" style="position:fixed;top:330px;left:500px;cursor:pointer;" height="66" width="129">
                </div>
            </div>
        </transition>
        <transition name='fade'>
            <div class="before-read" v-if='ifNew && step == 2'>
                <div class="step step-2">
                    <img src="../images/readstep/step2/to@2x.png" height="58" width="181" style="margin-top:270px">
                    <img src="../images/readstep/step2/ls@2x.png" height="232" width="254" style="position:fixed;top:280px;">
                    <img  @click='ifNew = false' src="../images/readstep/step1/close.png" height="72" width="54"  style="position:fixed;top:280px;left:500px;;cursor:pointer">
                    <img  @click='step = 3' src="../images/readstep/step1/next.png" style="position:fixed;top:480px;left:500px;;cursor:pointer" height="66" width="129">
                </div>
            </div>
        </transition>
        <transition name='fade'>
            <div class="before-read" v-if='ifNew && step == 3'>
                <div class="step step-3">
                    <img src="../images/readstep/step3/tb.png" height="58" width="181" style="margin-top:320px">
                    <img src="../images/readstep/step3/ls.png" height="223" width="333" style="position:fixed;top:320px;">
                    <img  @click='ifNew = false' src="../images/readstep/step1/close.png" height="72" width="54"  style="position:fixed;top:320px;left:500px;;cursor:pointer">
                    <img  @click='step = 4' src="../images/readstep/step1/next.png" style="position:fixed;top:580px;left:500px;cursor:pointer" height="66" width="129">
                </div>
            </div>
        </transition>
        <transition name='fade'>
            <div class="before-read" v-if='ifNew && step == 4'>
                <div class="step step-4">
                    <img src="../images/readstep/step4/to.png" height="58" width="181" style="margin-top:370px">
                    <img src="../images/readstep/step4/tb.png" height="229" width="255" style="position:fixed;top:370px;">
                    <img  @click='ifNew = false' src="../images/readstep/step1/close.png" height="72" width="54"  style="position:fixed;top:370px;left:460px;cursor:pointer">
                    <img  @click='step = 5' src="../images/readstep/step1/next.png" style="position:fixed;top:630px;left:460px;cursor:pointer" height="66" width="129">
                </div>
            </div>
        </transition>
        <transition name='fade'>
            <div class="before-read" v-if='ifNew && step == 5'>
                <div class="step step-5">
                    <img src="../images/readstep/step5/tb.png" height="58" width="181" style="margin-top:420px">
                    <img src="../images/readstep/step5/to.png" height="212" width="372" style="position:fixed;top:430px;">
                    <img  @click='ifNew = false' src="../images/readstep/step1/close.png" height="72" width="54"  style="position:fixed;top:420px;left:560px;cursor:pointer">
                    <img  @click='step = 6' src="../images/readstep/step1/next.png" style="position:fixed;top:630px;left:540px;cursor:pointer" height="66" width="129">
                </div>
            </div>
        </transition>
        <transition name='fade'>
            <div class="before-read" v-if='ifNew && step == 6'>
                <div class="step step-6">
                    <img src="../images/readstep/step6/to.png" height="58" width="181" style="margin-top:470px">
                    <img src="../images/readstep/step6/tb.png" height="212" width="372" style="position:fixed;top:480px;">
                    <img  @click='ifNew = false' src="../images/readstep/step1/close.png" height="72" width="54"  style="position:fixed;top:480px;left:560px;cursor:pointer">
                </div>
            </div>
        </transition>
        <div class="main" :class="{'main-hide-text': shrink}">
            <!--  修改密码  -->
            <Modal v-model="editPasswordModal" :closable='false' :mask-closable='false' :width="500">
                <h3 slot="header" style="color:#f56a00">修改密码</h3>
                <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                    <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                        <Input type='password' v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                    </FormItem>
                    <FormItem label="新密码" prop="newPass">
                        <Input type='password' v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                    </FormItem>
                    <FormItem label="确认新密码" prop="rePass">
                        <Input type='password' v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="text" @click="cancelEditPass">取消</Button>
                    <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
                </div>
            </Modal>
            <!--  修改密码  -->
            <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
                <shrinkable-menu
                    v-if = 'menuStatus'
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">

                    <!---转换开关-->
                    <div slot="top" class="navicon-con" style="padding:8px;padding-top:12px;padding-bottom:13px;position:fixed;top:60px;padding-left:4px;background:#b24317;transition:width .3s;" :style="{width: shrink?'60px':'200px'}">
                        <Tooltip content="展开" placement="top" :disabled="!shrink" :delay="600">
                            <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" style='background:#ec681e;margin-left:0;position:relative;top:1px;left:8px;padding:0;padding-left:6px;padding-right:6px;' type="text" @click="toggleClick">
                                <Icon type="navicon" size="32" style='color:#fff;'></Icon>
                            </Button>
                        </Tooltip>
                        <span v-if='delayS' style="font-size:16px;padding-left:20px;color:#fff;position:relative;top:4px;transition:all .3s">展开/隐藏</span>
                    </div>
                    <!---转换开关-->

                </shrinkable-menu>
            </div>
            <div class="main-header-con" :style="{paddingLeft: '0px'}">
                <div class="main-header">
                    <div style="padding:8px;" :style="{width: this.shrink ? '60px' : '200px'}">
                        <img style="height:44px;" :src="this.shrink ?minlogo  : biglogo" key="max-logo" />
                    </div>
                    <div class="header-middle-con" style="padding-left:0" :style="{left: this.shrink ? '60px' : '200px'}">
                        <span style="display:inline-block;width:2px;height:40px;background:#ccc;"></span>
                        <span style="font-size:22px;padding-left:20px;position:relative;top:-10px;color:#555">商家管理后台</span>
                    </div>

                    <div class="header-avator-con">
                    <!--全屏，锁屏，消息提示-->
                        <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                        <lock-screen></lock-screen>
                        <message-tip v-model="mesCount"></message-tip> -->
                    <!--全屏，锁屏，消息提示-->
                        <theme-switch v-show='false'></theme-switch>

                    <!--个人中心组件-->
                        <div class="user-dropdown-menu-con">
                            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                <span>欢迎管理员：</span>
                                <Dropdown style='width:120px' transfer trigger="click" @on-click="handleClickUserDropdown">
                                    <a href="javascript:void(0)">
                                        <span class="main-user-name">{{ userName }}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="ownSpace">修改密码</DropdownItem>
                                        <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Avatar :src="avatorPath" style="margin-left: 10px;"></Avatar>
                            </Row>
                        </div>
                    <!--个人中心组件-->

                    </div>
                </div>

                <!--浏览记录组建-->
                   <!--  <div class="tags-con">
                       <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
                   </div> -->
                <!--浏览记录组建-->

            </div>
            <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">

                <div class="single-page">
                    <div style='width:100%;background:#ec681e;height:68px;position:fixed;top:52px;left:0;z-index:99;'>
                        <div class="header-middle-con" style="position:absolute":style="{left: shrink?'60px':'200px'}">
                            <div class="main-breadcrumb">
                                <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                            </div>
                        </div>
                    </div>
                    <!-- <keep-alive :include="cachePage"> -->
                        <router-view v-if='status' style='width:100vw;height:100vh;overflow-y:auto;position:fixed;top:0;left:0;padding-top:140px; background:#fff' :style="{paddingLeft: shrink?'80px':'220px',}"></router-view>
                    <!-- </keep-alive> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import {appRouter} from '@/router/router';
    import '@/libs/common.js'
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch,

        },
        data () {
            const valideRePassword = (rule, value, callback) => {
                if (value !== this.editPasswordForm.newPass) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                ifNew:false,
                step:0,
                biglogo:require("../images/logo.png"),
                minlogo:require("../images/logo-min.png"),
                editPasswordModal:false,
                savePassLoading: false,
                oldPassError: '',
                statusInit:true,
                menuStatus: false,
                shrink: false,
                delayS:true,
                status: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                menuList:[],
                editPasswordForm: {
                    oldPass: '',
                    newPass: '',
                    rePass: ''
                },
                passwordValidate: {
                    oldPass: [
                        { required: true, message: '请输入原密码', trigger: 'blur' }
                    ],
                    newPass: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                        { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                    ],
                    rePass: [
                        { required: true, message: '请再次输入新密码', trigger: 'blur' },
                        { validator: valideRePassword, trigger: 'blur' }
                    ]
                },
            }
        },
        computed: {
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return require("../images/logo-min.png");
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            setNew () {
                this.utils.setData("ifNew","N");
            },
            cancelEditPass () {
                this.editPasswordModal = false;
            },
            saveEditPass () {
                this.$refs['editPasswordForm'].validate((valid) => {
                    if (valid) {
                        let data = {
                            password:this.editPasswordForm.oldPass,
                            newPassword:this.editPasswordForm.newPass,
                            repetitionNewPassword:this.editPasswordForm.rePass
                        };
                        console.log(data);
                        console.log(Api.factory.updatePass);
                        this.post(Api.factory.changePass,data,res=>{
                            this.savePassLoading = true;
                            this.$Message.success("密码更改成功！")
                            this.$router.push({
                                name: 'login'
                            });
                        })
                        //this.savePassLoading = true;
                        // you can write ajax request here
                    }
                });
            },
            menuCofig (){
                this.post(Api.server.get,(res)=>{
                    let map = res.object;
                    let list = this.utils.assign(appRouter);
                    localStorage.setItem("firstItemCode",map.BYXM[0].itemCode);
                    //保养项目路由
                    for(let i in map.BYXM){
                        list[1].children.push(this.utils.assign(list[1].children[0]));
                    };
                    list[1].children.pop();
                    for(let i in list[1].children){
                        list[1].children[i].title = map.BYXM[i].itemName;
                        list[1].children[i].name = map.BYXM[i].itemCode;
                    };
                    //清洗项目路由
                    for(let i in map.QXYH){
                        list[2].children.push(this.utils.assign(list[2].children[0]));
                    };
                    list[2].children.pop();
                    for(let i in list[2].children){
                        list[2].children[i].title = map.QXYH[i].itemName;
                        list[2].children[i].name = map.QXYH[i].itemCode;
                    };

                    //维修项目路由
                    for(let i in map.WXXM){
                        list[3].children.push(this.utils.assign(list[3].children[0]));
                    };
                    list[3].children.pop();
                    for(let i in list[3].children){
                        list[3].children[i].title = map.WXXM[i].itemName;
                        list[3].children[i].name = map.WXXM[i].itemCode;
                    };
                    this.menuList = list;
                    this.menuStatus = true;
                    this.statusInit = false;
                    this.status = true;
                    if(this.utils.getData("ifNew") != "N"){
                        this.ifNew = true;
                    };
                });
            },
            delay () {
                if(this.strik){
                    setTimeout(()=>{
                        this.delayS = false;
                    },300)
                }else{
                    setTimeout(()=>{
                        this.delayS = true;
                    },300)
                }
            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = localStorage.getItem("userPhone");
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
                this.menuCofig()
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    $(".ivu-form-item-error-tip").remove();
                    $(".ivu-form-item-error").removeClass("ivu-form-item-error");
                    for( let o in this.editPasswordForm ){
                        this.editPasswordForm[o] = "";
                    };
                    this.editPasswordModal = true;
                    /*util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });*/
                } else if (name === 'loginout') {
                    // 退出登录
                    this.post(Api.factory.quit,res=>{
                        this.$Message.success("退出成功！");
                        this.$store.commit('clearOpenedSubmenu');
                        this.$store.commit('logout', this);
                        this.$router.push({
                            name: 'login'
                        });
                    })

                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                /*this.status = false;
                $Vue.nextTick(()=>{
                    this.status = true;
                })*/
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            //这里做个延迟，避免动画出现问题
            shrink (strik) {
                if(strik){
                    this.delayS = false;
                }else{
                    setTimeout(()=>{
                        this.delayS = true;
                    },200)
                }
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            let _this = this;
            window.onresize = function(event) {
                let w = document.documentElement.clientWidth || document.body.clientWidth;
                if(Number(w) < 1200){
                    _this.shrink = true;
                }
                if(Number(w) > 1200 || Number(w) == 1200){
                    _this.shrink = false;
                };
                //处理左侧列表高度自适应
                $('.sidebar-menu-con').height(window.innerHeight - 120);
            };
            this.init();
            //监听路由点击事件刷新
            this.Event.$on("refsh",function(name){
                _this.status = false;
                _this.$nextTick(()=>{
                    _this.status = true;
                    localStorage.setItem("currentRouter",name);
                })
            });
            //处理左侧列表高度自适应
            setTimeout(()=>{
                $('.sidebar-menu-con').height(window.innerHeight - 120);
            },300);
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        }
    };
</script>
