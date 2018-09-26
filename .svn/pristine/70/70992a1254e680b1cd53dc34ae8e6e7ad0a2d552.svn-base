import Vue from 'vue'
let statics = {};
let name = 'keyLabel';
let id = 'keyValue'
statics.car = {
  getconsumptionLevel: function(){
    let consumptionLevel =
    {
      listName:name,
      listId:id,
      list:[
          {
              keyLabel:'实用型',
              keyValue:'syx'
          },
          {
              keyLabel:'经济型',
              keyValue:'jjx'
          },
          {
              keyLabel:'中档',
              keyValue:'zd'
          },
          {
              keyLabel:'中高档',
              keyValue:'zgd'
          },
          {
              keyLabel:'高档',
              keyValue:'gd'
          },
          {
              keyLabel:'豪华',
              keyValue:'hh'
          },
          {
              keyLabel:'超豪华',
              keyValue:'chh'
          }
      ]
    };
    return consumptionLevel
  }
};
statics.user = {
  status: function(){
    let userStatusList = {
      listName:name,
      listId:id,
      list:[
        {
          keyLabel:'正常',
          keyValue:'0'
        },
        {
          keyLabel:'冻结',
          keyValue:'1'
        }
      ]
    };
    return userStatusList
  },
  serviceStatus: function(){
    let factoryStatus = {
      listName:name,
      listId:id,
      list:[
        {
          keyLabel:'营业中',
          keyValue:'Y'
        },
        {
          keyLabel:'暂停营业',
          keyValue:'N'
        }
      ]
    };
    return factoryStatus
  },
  factoryLevel:function(){
    let factoryLevel = {
      listName:name,
      listId:id,
      list:[
        {
          keyLabel:'一类',
          keyValue:'1'
        },
        {
          keyLabel:'二类',
          keyValue:'2'
        },
        {
          keyLabel:'三类',
          keyValue:'3'
        }
      ]
    };
    return factoryLevel
  }
}
statics.msg = {
  getMessageType:function(_this,cb){
    let self = this;
    _this.get(Api.msg.mechanicsScience.get,(res)=>{
      let obj = {
        listName:"keyLabel",
        listId:"keyValue",
        list:res.object||[]
      }
      cb.call(self,obj)
    })
  }
}
Vue.prototype.staticBy = statics;
