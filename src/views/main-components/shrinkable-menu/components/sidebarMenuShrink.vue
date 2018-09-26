<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                        <img v-if = 'item.img' alt="" :src="item.img" style="width:18px;height:18px;margin-right:5px;">
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <!-- <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon v-if = 'item.icon' :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></Icon>
                        <img v-if = 'item.img' alt="" :src="item.img" style="width:20px;height:20px;margin-right:5px;">
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].name" :key="'d' + index"><Icon :type="item.children[0].icon || item.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
        }
    },
    methods: {
        changeMenu (active) {
            for(let i in this.menuList){
                for(let j in this.menuList[i].children){
                    let tmp = this.menuList[i].children[j];
                    if(tmp.name == active){
                        let obj = {
                            path:this.menuList[i].path+"/"+tmp.path,
                            param:active
                        }
                        this.$emit('on-change',obj);
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
        }
    }
};
</script>
