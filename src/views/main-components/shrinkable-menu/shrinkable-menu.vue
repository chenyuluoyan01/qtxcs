<style lang="less">
    @import './styles/menu.less';
</style>

<template>
    <div style='background:#f8f8f8' class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <sidebar-menu
            v-show="!shrink"
            :menu-theme="theme"
            :menu-list="menuList"
            :open-names="openNames"
            @on-change="handleChange"
            style='background:#fbfbfb'
        ></sidebar-menu>
        <sidebar-menu-shrink
            v-show="shrink"
            :menu-theme="theme"
            :menu-list="menuList"
            :icon-color="shrinkIconColor"
            @on-change="handleChange"
            style='background:#fbfbfb'
        ></sidebar-menu-shrink>
    </div>
</template>

<script>
import sidebarMenu from './components/sidebarMenu.vue';
import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
import util from '@/libs/util';
export default {
    name: 'shrinkableMenu',
    components: {
        sidebarMenu,
        sidebarMenuShrink
    },
    props: {
        shrink: {
            type: Boolean,
            default: false
        },
        menuList: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            default: 'dark',
            validator (val) {
                return util.oneOf(val, ['dark', 'light']);
            }
        },
        beforePush: {
            type: Function
        },
        openNames: {
            type: Array
        }
    },
    mounted(){
    },
    computed: {
        bgColor () {
            return this.theme === 'dark' ? '#495060' : '#fff';
        },
        shrinkIconColor () {
            return this.theme === 'dark' ? '#fff' : '#495060';
        }
    },
    methods: {
        handleChange (path) {
            /*let willpush = true;
            if (this.beforePush !== undefined) {
                if (!this.beforePush(name)) {
                    willpush = false;
                }
            }
            if (willpush) {
                this.$router.push({
                    name: name
                });
            }
            this.$emit('on-change', name);*/
            if(typeof path == 'object'){
                this.$router.push({
                    path: path.path+`?itemCode=${path.param}`
                });
            }else{
                this.$router.push({
                    path: path
                });
            }

            this.$emit('on-change', path);
        }
    }
};
</script>
