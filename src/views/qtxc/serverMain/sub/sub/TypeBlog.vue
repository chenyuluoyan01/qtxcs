<style lang="less">

</style>
<template>
    <div>
        <template v-for='(e,j) in brandLists' v-if='init'>
            <Poptip
                confirm
                title="确定要删除吗?"
                @on-ok="delOk(e.brandId)"
                v-model='e.visibel'
                :key='"brand"+e.brandId'
            >
                <Badge overflow-count = '10000'  class='mbrage' style='margin-right:30px;'>
                    <Tag
                        style='width:150px;'
                        type="dot"
                        :closable='handleClose(e.brandId)'
                        color="yellow"
                        @on-close='e.visibel=true'
                        @click.native='views(e.brandId)'
                    ><b>{{e.brandName}}</b></Tag>
                </Badge>
            </Poptip>
        </template>
        <brandBox :item='currentView' v-if='boxInit'></brandBox>
    </div>
</template>
<script>
import brandBox from './lib/brandBox.vue'
export default {
    name: 'typebog',
    props:["brandList"],
    components: {
        brandBox
    },
    data () {
        return {
            init:true,
            boxInit:false,
            currentView:{},
            brandLists:[]
        }
    },
    mounted () {
        this.utils.loading.hide(this);
        this.brandLists = this.utils.assign(this.brandList)
    },
    methods: {
        views(brandId){
            let brandMap = this.utils.getData("brandMap");
            let currentView = brandMap[brandId];
            this.currentView = currentView;
            this.boxInit = true;
        },
        handleClose(id){
            let tmp = this.utils.getData("aimIdsS");
            if(tmp.indexOf(id) == -1){
                return true
            }else{
                return false
            }
        },
        delOk(brandId){
            let brandMap = this.utils.getData("brandMap");
            let currentView = brandMap[brandId];
            let ids = [];
            currentView.carsList.map((item,index)=>{
                item.cardTypeList.map(e=>{
                    ids.push(e.cardTypeId)
                })
            });
            let aimIds = this.utils.getData("aimIds");
            let aimTypeId = this.utils.getData("aimTypeId");
            aimIds.splice(aimIds.indexOf(brandId),1);
            this.brandList.map((item,i)=>{
                if(item.brandId == brandId){
                    this.brandLists.splice(i,1);
                }
            });
            aimTypeId.map((id,i)=>{
                if( ids.indexOf(id) != -1 ){
                    aimTypeId.splice(i,1);
                }
            });
            this.utils.setData("aimIds",aimIds);
            this.utils.setData("aimTypeId",aimTypeId);
        },
    }
};
</script>
