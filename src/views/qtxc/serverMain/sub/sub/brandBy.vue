<style lang="less">

</style>

<template>
    <div>
        <template v-for = '(item,index) in aimList' v-if='status'>
            <brand-box :item='item'/>
        </template>
    </div>
</template>

<script>
import brandBox from './lib/brandBox.vue'
export default {
    name: 'brandBy',
    props:["goodType"],
    components: {
        brandBox
    },
    data () {
        return {
            status:true,
            storage:{},
            aimTypeId:[],
            aimIds:[],
            aimList:[]
        }
    },
    mounted () {
        this.getBrand();
        let aimIds = this.utils.getData("aimIds");
        if($.isArray(aimIds)){
            this.aimIds = aimIds;
        };

        let _this = this;

        //执行删除逻辑
        this.$Event.$on('delBrand',function(brandId){
            let index = _this.aimIds.indexOf(brandId);
            if(index != -1){
                _this.aimIds.splice(index,1);

                //设置 aimIds
                _this.utils.setData("aimIds",_this.aimIds);


                //设置 typeMap
                let typeMap = _this.utils.getData("typeMap");
                typeMap[brandId] = [];
                _this.utils.setData("typeMap",typeMap);
                typeMap = _this.utils.getData("typeMap")

                //设置 aimTypeId
                let aimTypeId = [];
                for(let o in typeMap){
                if(typeMap[o].length>0){
                     aimTypeId = aimTypeId.concat(typeMap[o]);
                    };
                };
                _this.utils.setData("aimTypeId",aimTypeId);

                _this.aimTypeId = _this.utils.getData('aimTypeId');
                _this.aimList = _this.getTransData(_this.aimTypeId,_this.aimIds,_this.storage);
                _this.status = false;
                $Vue.nextTick(()=>{
                    _this.status = true;
                })
            }
        });
    },
    methods: {
        getTransData: function(aimTypeId,aimIds,storage){
            let typeMap = {};
            for(let o in storage){
                typeMap[o] = []
            };
            for(let o in storage){
                for(let i in storage[o].carsList||[]){
                    let tmp = storage[o].carsList[i].cardTypeList || [];
                    for(let j in tmp){
                        for(let k in aimTypeId){
                            if(aimTypeId[k] == tmp[j].cardTypeId){
                                typeMap[o].push(tmp[j].cardTypeId);
                            }
                        }
                    }
                }
            };
            this.utils.setData('typeMap',typeMap);
            let aimList = [];
            for(let i in aimIds){
                let tmpId = aimIds[i];
                aimList.push(storage[tmpId])
            };
            return aimList
        },
        getBrand: function(){
            //不知为何一定要放在一个异步操作里面
            this.post(Api.banner.get,(res)=>{
                let storage = this.utils.getData("brandMap");
                this.storage = storage;
                let aimTypeId = this.utils.getData('aimTypeId');
                if($.isArray(aimTypeId)){
                    this.aimTypeId = aimTypeId;
                };
                this.aimList = this.getTransData(this.aimTypeId,this.aimIds,storage);
            })
        },
        resolveByPrice: function(list){
            let mList = [{title:"全部",expand:true,children:[]}];
            if(list.length>0){
                let main = this.utils.assign(list);
                for(let i in main){
                    main[i].title = this.utils.resolveDec(this.consumptionLeveList,main[i].consumptionLevel);
                    main[i].expand = true;
                    if(main[i].cardBrandList == null){
                        main[i].children = []
                    }else{
                        main[i].children = this.utils.assign(main[i].cardBrandList)
                    }
                };
                for(let i in main){
                    let tmp = main[i].children;
                    for(let j in tmp){
                        tmp[j].title = tmp[j].brandName;
                        //tmp[j].expand = true;
                        if(tmp[j].cardTypeList == null){
                            tmp[j].children = []
                        }else{
                            tmp[j].children = this.utils.assign(tmp[j].cardTypeList)
                        }
                    }
                };
                for(let i in main){
                    let tmp1 = main[i].children;
                    for(let j in tmp1){
                        let tmp2 = tmp1[j].children;
                        for(let k in tmp2){
                            tmp2[k].title = tmp2[k].carTypeName;
                            tmp2[k].children = []
                        }
                    }
                };
                mList[0].children = main;
            };
            return mList
        },
        resolveByBrand: function(list){
            let mList = [{title:"全部",expand:true,children:[]}];
            if(list.length>0){
                let main = this.utils.assign(list);
                for(let i in main){
                    main[i].title = main[i].brandName;
                    main[i].expand = true;
                    if(main[i].carsList == null){
                        main[i].children = []
                    }else{
                        main[i].children = this.utils.assign(main[i].carsList)
                    }
                };
                for(let i in main){
                    let tmp = main[i].children;
                    for(let j in tmp){
                        tmp[j].title = tmp[j].carsName;
                        //tmp[j].expand = true;
                        if(tmp[j].cardTypeList == null){
                            tmp[j].children = []
                        }else{
                            tmp[j].children = this.utils.assign(tmp[j].cardTypeList)
                        }
                    }
                };
                for(let i in main){
                    let tmp1 = main[i].children;
                    for(let j in tmp1){
                        let tmp2 = tmp1[j].children;
                        for(let k in tmp2){
                            tmp2[k].title = tmp2[k].carTypeName;
                            tmp2[k].children = []
                        }
                    }
                };
                mList[0].children = main;
                return main
            };
        }
    }
};
</script>
