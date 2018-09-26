<style lang="less">
.mark{
    font-size: 18px;
}
</style>

<template>
    <div class="view-main">
        <!--列表页面-->
        <div class="list-page">
            <!--搭电救援-->
            <div class="padding-middle" v-if='$route.name == "rush_hellp_dd"'>
                <Form>
                    <FormItem label="开启搭电救援：">
                        <RadioGroup v-model='powerFix'>
                            <Radio label="Y">开启</Radio>
                            <Radio label="N">关闭</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="单次救援价格：">
                        <span class="mark main-color">{{powerPrice}}</span> 元
                    </FormItem>
                    <FormItem>
                        <Button type='primary' size='small' @click='save(dd,{powerPrice:powerPrice,powerFix:powerFix})'>确定</Button>
                    </FormItem>
                </Form>
            </div>


            <!--拖车救援-->
            <div class="padding-middle" v-if='$route.name == "rush_hellp_tc"'>
                <Form>
                    <FormItem label="开启拖车服务：">
                        <RadioGroup v-model='towingService'>
                            <Radio label="Y">开启</Radio>
                            <Radio label="N">关闭</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="公里计算：">
                        <span class="mark main-color">{{minimumKm}}</span> km内 <span class="mark main-color">{{priceMinimumKm}}</span> 元/次，超出部分按 <span class="mark main-color">{{pricePerKm}}</span> 元/公里计算
                    </FormItem>
                    <FormItem>
                        <Button type='primary' size='small' @click='save(tc,{minimumKm:minimumKm,priceMinimumKm:priceMinimumKm,towingService:towingService})'>确定</Button>
                    </FormItem>
                </Form>
            </div>

            <!--换胎救援-->
            <div class="padding-middle" v-if='$route.name == "rush_hellp_ht"'>
                <Form>
                    <FormItem label="开启换胎服务：">
                        <RadioGroup v-model='changeTyres'>
                            <Radio label="Y">开启</Radio>
                            <Radio label="N">关闭</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="单次换胎价格： ">
                        <span class="mark main-color">{{changeTyre}}</span> 元
                    </FormItem>
                    <FormItem>
                        <Button type='primary' size='small' @click='save(ht,{priceChangeTyre:changeTyre,changeTyre:changeTyres})'>确定</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'demo',
    components: {},
    data () {
        return {
            powerPrice:0,
            changeTyre:0,
            minimumKm:0,
            priceMinimumKm:0,
            pricePerKm:0,
            powerFix:"N",
            towingService:"N",
            changeTyres:"N",
            dd:Api.factory.rush.dd,
            tc:Api.factory.rush.tc,
            ht:Api.factory.rush.ht
        };
    },
    mounted () {
        this.getData()
    },
    methods: {
        //分页组件吐出数据
        getData: function(){
            this.post(Api.server.getSingle,(res)=>{
                let obj = res.object || {};
                this.powerPrice = obj.powerPrice;
                this.changeTyre = obj.changeTyre;
                this.minimumKm = obj.minimumKm;
                this.priceMinimumKm = obj.priceMinimumKm;
                this.pricePerKm = obj.pricePerKm;
            });
            this.post(Api.factory.server.get, res => {
                let obj = res.object;
                this.changeTyres = obj.changeTyre;
                this.powerFix = obj.powerFix;
                this.towingService = obj.towingService;
            })
        },
        save: function(url,data){
            this.post(url,data,res=>{
                this.$Message.success("操作成功！")
            });
        }
    }
};
</script>
