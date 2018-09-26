<style lang="less">
    .lib-check{
        padding: 10px;
    }
</style>

<template>
    <div class="clear flex">
        <Menu v-if="status" @on-select='tab' theme="light" active-name="A" style='width:60px;float:left'>
            <MenuItem  :name="index" v-for = '(item , index) in brandMap' :key='"xvs"+index'>{{index}}</MenuItem>
        </Menu>
        <div style="float:left"  v-for = '(item , index) in brandMap' :key='"xvf"+index' v-show='index == nowIndex'>
            <div class="inline-block lib-check" v-for='(c,i) in item'>
                <CheckboxGroup v-model='aimIds'>
                    <Checkbox
                        :label='c.brandId'
                        :disabled='handelDisable(c.brandId)'
                        @click.native='handleChange(c.brandId)'
                    >{{c.brandName}}</Checkbox>
                </CheckboxGroup>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'brandChoose',
    components: {

    },
    data () {
        return {
            aimIds:[],
            status:false,
            nowIndex:"A",
            brandMap:{}
        }
    },
    watch:{
        'aimIds':function(val,oldVal){
            if(val.length<oldVal.length){
                for(let i in oldVal){
                    if(val.indexOf(oldVal[i]) == -1){
                        this.$Event.$emit("delBrand",oldVal[i])
                    }
                }
            }
        }
    },
    mounted () {
        //this.utils.delData("aimIds");
        let tmp = this.utils.getData("aimIds");
        if($.isArray(tmp)){
            this.aimIds = tmp
        };
        this.getAllBrand();
    },
    methods: {
        getAllBrand(){
            this.post(Api.car.brand.get,res=>{
                let list = res.object || [];
                let map = {};
                let brandMap = this.utils.groupBykey(this.handelBrand(list),"capital");
                let keys = Object.keys(brandMap);
                keys = keys.sort();
                keys.map(o=>{
                    map[o] = brandMap[o];
                });
                this.brandMap = map;
                $Vue.nextTick(()=>{
                    this.status = true;
                });
            });
        },
        handelDisable(id){
            let tmp = this.utils.getData("aimIdsS");
            if(tmp.indexOf(id) == -1){
                return false
            }else{
                return true
            }
        },
        handelBrand(list){
            list.map(item=>{
                let capital = this.utils.makePy(item.brandName.substring(0,1));
                if($.isArray(capital)){
                    capital = capital[0];
                };
                item.capital = capital;
            });
            return list
        },
        tab(index){
            this.nowIndex = index;
            $(".ivu-modal-body").scrollTop(0)
        },
        ok(){},
        handleChange(id){
            //alert(id)
        },
        save(){
            this.utils.setData("aimIds",this.aimIds);
        }
    }
};
</script>
