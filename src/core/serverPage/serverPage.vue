<style lang="less">

</style>

<template>
    <div class="view-main">
        <!--列表页面-->
        <div class="list-page">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="width-60">序号</th>
                        <th>项目名称</th>
                        <th>说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(item,index) in list" :key='index+"xc"'>
                        <td>{{index+1}}</td>
                        <td>{{item.itemName}}</td>
                        <td>{{item.description}}</td>
                    </tr>
                    <tr v-if='list.length == 0'><td colspan="3">暂无数据</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    name: 'serverPage',
    props:['itemCat'],
    components: {
    },
    data () {
        return {
            list:[]
        };
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData: function(){
            this.post(Api.server.get,{itemCat:this.itemCat},(res)=>{
                this.list = res.object;
            })
        }
    }
};
</script>
