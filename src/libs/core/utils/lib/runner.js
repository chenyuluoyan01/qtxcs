function runner(_gen){
  return new Promise((resolve, reject)=>{
    var gen=_gen();

    _next();
    function _next(_last_res){
      var res=gen.next(_last_res);

      if(!res.done){
        var obj=res.value;

        if(obj instanceof Promise){
          obj.then((res)=>{
            _next(res);
          }, (err)=>{
            reject(err);
          });
        }else if(typeof obj=='function'){
          if(obj.constructor.toString().startsWith('function GeneratorFunction()')){
            runner(obj).then(res=>_next(res), reject);
          }else{
            _next(obj());
          }
        }else{
          _next(obj);
        }
      }else{
        resolve(res.value);
      }
    }
  });
};
export default runner;


let getMd5Str = function (url,json) {
            let index = url.indexOf('?');
            url = url.substring(index+1);
            var splitStr = url.split("&");
            var urlObj = {}
            for(var i = 0; i < splitStr.length; i++){
              urlObj[splitStr[i].split("=")[0]] = splitStr[i].split("=")[1];
            };
            $.extend( urlObj, json);
            let keys = Object.keys(urlObj);
            let str = keys.sort().join('');
            var timestamp=new Date().getTime();
            str += timestamp;
            str = $.md5('str');
            return str;
        };