import Vue from 'vue';
import $ from 'jquery'
import md5 from '@/libs/jquery.md5.js'
window.md5 = md5;
window.$ = $;
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import './styles/reset.css'
import './styles/mybootstrap.css'
import VueI18n from 'vue-i18n';
import util from './libs/util';
import './libs/core/utils/util.js'
import zyqtHttp from './libs/core/utils/zyqt_http.js'
import Api from './libs/api/api.js'
import './libs/staticData.js'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'https://via.placeholder.com/150x150/a8a8a8/fff?text=SunnyFix',
    loading:require('../static/img/loading.gif')
})
Vue.use(VueI18n);
Vue.use(iView);

//引入封装的HTTP模块
Vue.use(zyqtHttp);

//引入接口部分
window.Api = Api;

window.$Vue = Vue;

let Event = new Vue();
Vue.prototype.$Event = Event;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        //util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
