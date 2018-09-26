<style lang="less">

</style>

<template>
    <div>

    </div>
</template>

<script>
export default {
    name: 'demo',
    props: ["id"],
    components: {

    },
    data () {
        return {}
    },
    mounted () {
        this.init()
    },
    methods: {
        init: function(){
            this.getPromise()
        },
        getPromise: function(){
            let roleId = this.id;
            let data = {roleId:roleId};
            this.get(Api.role.getP,data,(res)=>{
                console.log(res)
            })
        }
    }
};
</script>
