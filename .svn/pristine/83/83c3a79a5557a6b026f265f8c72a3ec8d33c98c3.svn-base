<style lang="less">
</style>

<template>
    <Poptip
        confirm
        placement="left"
        title="确定要删除吗?"
        style="text-align:left"
        @on-ok="del"
    >
        <span class="btn">删除</span>
    </Poptip>
</template>

<script>
export default {
    name: 'zyqtDel',
    props:[],
    data () {
        return {
            init:false,
            modal:false
        };
    },
    mounted () {
    },
    methods: {
        del: function(){
            this.$emit("del")
        }
    },
    components: {

    }
};
</script>
