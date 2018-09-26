<style lang="less">

</style>

<template>
    <div class="view-main">
        <views :detail="detail"  v-if='viewConfig.modal' :name="viewConfig.name" ref='view' />
    </div>
</template>

<script>
import views from './lib/view.vue'


export default {
    name: 'demo',
    components: {
        views
    },
    data () {
        return {
            refsh:true,
            detail:{},
            viewConfig:{
                modal:false,
                name:"view"
            }
        };
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData(){
            this.post(Api.factory.get,res=>{
              let initData = res.object || {};
              this.view(initData);
            });

        },
        //表格操作函数
        view: function(params){
            this.detail = params;
            $Vue.nextTick(()=>{
                this.viewConfig.modal = true;
            });
        },
    }
};
</script>
