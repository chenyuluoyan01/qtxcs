import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers,otherRouter, appRouter} from './router';

Vue.use(VueRouter);


// 路由配置
const RouterConfig = {
    //mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    let token = localStorage.getItem("token");
    if(token == null || token == undefined){
        if(to.name == "login"){
            next()
        }else{
            next({
                name: 'login'
            });
        };
    }else{
        Util.toDefaultPage([...routers], to.name, router, next);
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
