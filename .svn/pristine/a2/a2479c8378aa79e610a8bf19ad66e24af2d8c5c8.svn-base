import Vue from 'vue'
import makePy from '../../getPY.js'
let utils = {};
utils.makePy = makePy;
utils.getData = function( key ){
  let data = {};
  let tmp = localStorage.getItem(key);
  if( tmp == null || tmp == undefined ){
    tmp = {};
  }else{
    tmp = JSON.parse(tmp)
  };
  data = tmp;
  return data;
};


utils.setData = function( key , value ) {
  localStorage.setItem(key , JSON.stringify(value))
}

utils.delData = function( key ) {
  localStorage.removeItem( key );
}

utils.testForm = function(){
  if($(".error-mark").length == 0){
      return true
  }else{
      return false
  }
};

utils.resolveForm = function(_this,cb){
    let $this = this;
    try{
      _this.formData.initF = true;
      _this.$parent.$parent[_this.name].loading = true;
    }catch(e){}
    $Vue.nextTick(()=>{
        if(_this.utils.testForm()){
            cb.call($this)
        }else{
            _this.$Message.warning('温馨提示: 请补全表单必填项！');
            try{
              _this.$parent.$parent[_this.name].loading = false;
            }catch(e){}
        }
    });
};

utils.refshData = function(_this){
  _this.refsh = false;
  $Vue.nextTick(()=>{
      _this.refsh = true;
  });
};

utils.setObjItem = function(arr,key,val){
  for(let i in arr){
    arr[i][key] = val
  };
  return arr
}

utils.formatDate = function(date, fmt) {
  date = new Date(date);
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

utils.getObjByKeys = function(obj1,obj2){
  for(let o in obj1){
    obj1[o] = obj2[o];
  };
  return obj1
}

utils.resolveDec = function(obj,id){
  let key = obj.listId;
  let value = obj.listName;
  let list = obj.list;
  let Dec = '';
  for(let i in list){
    if(list[i][key] == id){
      Dec = list[i][value];
    }
  };
  return Dec
}

utils.refshPage = function(){
  $(".ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected").click();
}

utils.getSingleItem = function(obj,key){
  let arr = [];
  let arr1 = [];
  for(let i in obj){
    arr.push(obj[i][key])
  };
  arr = $.unique(arr);

  for(let i in arr){
    arr1[i] = {}
  }
  for(let i in arr){
    arr1[i][key] = arr[i]
  }
  return arr1
}

utils.assign = function(obj){
  return JSON.parse(JSON.stringify(obj))
}

utils.testPhone = function(phone){
  let re = /(^0\d{2,3}-?\d{7,8}$)|(^1[34578]\d{9}$)/;
  return re.test(phone)
}

utils.clearTypes = function(){
  utils.delData("aimIds");
  utils.delData("aimTypeId");
  utils.delData("typeMap")
};

utils.groupBykey = function(list,key){
  let keys = [];
  let map = {};
  list.map(item=>{
    keys.push(item[key])
  });
  keys = [...new Set(keys)];
  keys.map(e=>{
    map[e] = [];
  });
  keys.map(e=>{
    list.map(item=>{
      if(item[key] == e){
        map[e].push(item)
      }
    })
  });
  return map;
};

utils.loading = {};
utils.loading.show = (_this)=>{
  _this.$Spin.show({
      render: (h) => {
          return h('div', [
              h('Icon', {
                  'class': 'demo-spin-icon-load',
                  props: {
                      type: 'load-c',
                      size: 18
                  }
              }),
              h('div', 'Loading')
          ])
      }
  });
};
utils.loading.hide = (_this) =>{
  _this.$Spin.hide();
}
utils.upBrandMap = function(_this){
  _this.post(Api.car.type.getByBrand,(res)=>{
      let brandMap = res.object || {};
      _this.utils.setData("brandMap",brandMap);
  });
};
utils.dialog = {};
utils.dialog.show = function(config){
  let dom = `<div class="iview-modal">
      <div class="iview-mask"></div>
      <div class="iview-modal-body">
          <div class="iview-modal-content">
            <div class='header-wrap'>
              <div class='header-inner'>温馨提示</div>
            </div>
            <div class='body-wrap'>
              <p><i class="ivu-icon ivu-icon-help-circled" style='color:#f90'></i> 本页数据还没有保存，确认跳转页面吗？</p>
            </div>
            <div class='footer-wrap'>
              <button type="button" class="ivu-btn ivu-btn-text fuckL"><span>取消</span></button>
              <button type="button" class="ivu-btn  ivu-btn-primary fuckM"><span>确定</span></button>
            </div>
          </div>
      </div>
  </div>`;
  $("body").append(dom);
  $(".iview-modal").fadeIn(300);
  $(".fuckL").click(function(){
    $(".iview-modal").fadeOut(300).remove();
  })
  $(".fuckM").click(function(){
    $(".iview-modal").fadeOut(600).remove();
    config.ok()
  })
};




Vue.prototype.utils = utils;

Vue.filter("formatDate",(date)=>{
  return utils.formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss')
})
