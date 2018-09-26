<style lang="less">
.opbtn{font-size:14px; color: #f56a00;cursor: pointer}
.opbtn:hover{color:#f78833 }
</style>

<template>
    <Table stripe :columns="columns" :data="data"></Table>
</template>

<script>
export default {
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
            titles[i].align = 'center';
            if(titles[i].btns != undefined){
                titles[i].render = (h, params) => {
                    let btnList = [];
                    for(let j in titles[i].btns){
                        let tmp = titles[i].btns[j];
                        let stu = (titles[i].btns.length-1 == j);
                        let text = "";
                        if(!stu){
                            text = tmp.text + " -";
                        }else{
                            text = tmp.text;
                        };
                        //删除 冻结的时候需要 气泡拦截
                        if (tmp.text == '冻结') {
                            btnList.push(
                                h(
                                    "Poptip",

                                    {
                                        props: {
                                            title: '您确定冻结吗？',
                                            confirm: true,
                                            width:200
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.$parent[tmp.on](params.row);
                                            }
                                        }
                                    },

                                    [
                                        h('span', {
                                            'class': {
                                                opbtn: true,
                                            },
                                            style: {
                                                marginRight: '6px'
                                            }
                                        }, text)
                                    ]
                                )
                            );
                        }else if(tmp.text == '删除'){
                            btnList.push(
                                h("Poptip",{
                                props: {
                                    title: '您确定删除吗？',
                                    confirm: true,
                                    width:200
                                },
                                on: {
                                    'on-ok': () => {
                                        this.$parent[tmp.on](params.row);
                                    }
                                }
                                },[h('span', {
                                        'class': {
                                            opbtn: true
                                        },
                                        style: {
                                            marginRight: '6px'
                                        }
                                    }, text)
                                ])
                            )
                        }else{
                            btnList.push(
                                h('span', {
                                    'class': {
                                        opbtn: true
                                    },
                                    style: {
                                        marginRight: '6px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$parent[tmp.on](params.row)
                                        }
                                    }
                                }, text)
                            )
                        };
                        //删除 冻结的时候需要 气泡拦截
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
