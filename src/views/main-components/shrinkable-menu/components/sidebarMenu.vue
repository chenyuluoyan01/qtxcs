<style lang="less">
    @import '../styles/menu.less';
</style>

<template><!-- :open-names="openNames" -->
    <Menu ref="sideMenu" :active-name="acName" :itemCode='acName' class='big-menu' accordion  :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="(item,index) in menuList">
            <!-- <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
            </MenuItem> -->

            <Submenu class="view-title" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon v-if = 'item.icon' :type="item.icon" :size="14"></Icon>
                    <img v-if = 'item.img' alt="" :src="item.img" style="width:18px;height:18px;margin-right:5px;">
                    <span class="layout-text" style="color:#575757">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name" @click.native='refsh(child.name)'>
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    data(){
        return {
            acName:this.menuList[0].children[0].name
        }
    },
    methods: {
        changeMenu (active) {
            this.acName = active;
            console.log(this.menuList);
            for(let i in this.menuList){
                for(let j in this.menuList[i].children){
                    let tmp = this.menuList[i].children[j];
                    if(tmp.name == active){
                        console.log(active);
                        console.log(tmp);
                        console.log(this.menuList[i].path+"/"+tmp.path);
                        this.$emit('on-change', this.menuList[i].path+"/"+tmp.path);
                        return false
                    }
                }
            }
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        },
        refsh (name) {
            this.Event.$emit("refsh",name)
        }
    },
    mounted (){
        $(".ivu-menu-submenu-title").eq(0).click();
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
