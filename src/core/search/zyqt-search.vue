<style lang="less">
    .z-search{
        width: 100%;
        padding: 14px 20px;
        border: 1px solid #dedede;
        border-left: 5px solid rgb(236, 104, 30);
        margin-bottom: 20px;
        transition: all .3s;
        .ivu-form-item{
            margin-bottom:0;
        }
        .f-label{
            display:inline-block;
            line-height: 36px;
        }
        .z-search-item{
            display:inline-block;
        }
    }
    .z-search:hover{
        box-shadow: 0 1px 4px rgba(0,0,0,.1);
        transition: all .3s;
    }
</style>

<template>
    <div class="z-search">
        <Form inline>
            <div class="z-search-item" v-for="(item,index) in searchData.list" :key ="'a'+index">
                <label class="f-label" v-if="!item.show">{{item.name}}</label>
                <!--输入框-->
                <FormItem v-if="item.type=='input'">
                    <Input type="text" style='width:120px;display: inline-block;' v-model="searchData.rel[item.id]" :placeholder="item.name"></Input>
                </FormItem>
                <!--选择框-->
                <FormItem v-if="item.type=='select'">
                  <Select v-model="searchData.rel[item.id]" :placeholder="item.name" style='width:140px;'>
                    <Option v-for="(todo,i) in searchData.source[item.source].list" :key="'b'+i" :value="todo[searchData.source[item.source].listId]">{{todo[searchData.source[item.source].listName]}}</Option>
                  </Select>
                </FormItem>
                <!--选择起止日期-->
                <FormItem v-if="item.type=='daterange'">
                    <DatePicker
                      :value="searchData.rel[item.id]"
                      @on-change="getDate"
                      format="yyyy-MM-dd"
                      type="daterange"
                      placement="bottom-end"
                      :placeholder="item.name"
                      style="width: 200px"
                    ></DatePicker>
                </FormItem>
            </div>
            <FormItem>
                <Button v-if='searchData.search==null||searchData.search!=false' type='primary' size='small'  icon="ios-search" @click='search'>搜索</Button>
            </FormItem>
            <FormItem>
                <Button v-if='searchData.add' size='small' type='info'  icon="plus" @click='add'>添加</Button>
            </FormItem>
            <FormItem>
                <Button v-if='searchData.save'  icon='checkmark' size='small' type='success' @click='save'>保存</Button>
            </FormItem>
            <FormItem>
            <Poptip
                placement='bottom'
                width='200'
                confirm
                title="还没有保存，确定要离开吗?"
                @on-ok="back"
            >
                <Button size='small' v-if='searchData.back' type='primary' icon="arrow-left-c">返回</Button>
            </Poptip>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    name: 'zyqtSearch',
    props: ["searchData"],
    components: {

    },
    data () {
        return {
            user:"",
        };
    },
    mounted () {
    },
    methods: {
        getDate: function(time){
            let id = "";
            for(let i in this.searchData.list){
                let tmp = this.searchData.list[i];
                if(tmp.type == "daterange"){
                    id = tmp.id;
                }
            }
            this.searchData.rel[id] = time;
        },
        add: function(){
            this.$emit("add")
        },
        save: function(){
            this.$emit("save")
        },
        back: function(){
            this.$emit("back")
        },
        search: function(){
            let rel = this.searchData.rel;
            let data = {};
            for(let o in rel){
                let tmp = rel[o];
                if($.isArray(tmp) && tmp.length>0){
                    data[o] = tmp.join(",");
                }else if(tmp.toString().length > 0){
                    data[o] = tmp;
                };
            };
            console.log(rel);
            this.$emit("getParam",data)
        }
    },
};
</script>
