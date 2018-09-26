<style lang="less">
</style>

<template>
    <Table border :columns="columns" :data="data"></Table>
</template>

<script>
export default {
    /*黄色
    #f56a00
    #f78833*/

    name: 'zyqtTable',
    props: ['titles','list'],
    components: {

    },
    data () {
        return {
            columns:[],
            data:[]
        };
    },
    mounted () {
        let titles = this.titles;
        for(let i in titles){
            if(titles[i].btns != undefined){
                titles[i].render = (h, params) => {
                    let btnList = [];
                    for(let j in titles[i].btns){
                        let tmp = titles[i].btns[j];
                        btnList.push(
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$parent[tmp.on](params.row)
                                    }
                                }
                            }, tmp.text)
                        )
                    };
                    return h('div',btnList)
                };
                this.columns.push(titles[i])
            }else{
                this.columns.push(titles[i])
            }
        };
        this.data = this.list;
    },
    methods: {

    },
};
</script>
