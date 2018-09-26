<style lang="less">
</style>

<template>
    <Poptip
        confirm
        title="确定要冻结吗?"
        style="text-align:left"
        placement="left"
        @on-ok="freeze"
    >
        <span class="btn">冻结</span>
    </Poptip>
</template>

<script>
export default {
    name: 'zyqtFreeze',
    props:[],
    data () {
        return {
            modal:false
        };
    },
    mounted () {
    },
    methods: {
        freeze: function(){
            this.$emit("freeze")
        }
    },
    components: {

    }
};
</script>
