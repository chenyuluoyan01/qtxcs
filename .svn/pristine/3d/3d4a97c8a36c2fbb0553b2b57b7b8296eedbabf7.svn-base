let getMd5Str = function (url,json) {
    let index = url.indexOf('?');
    var urlObj = {}
    if(index!=-1){
        url = url.substring(index+1);
        var splitStr = url.split("&");
        for(var i = 0; i < splitStr.length; i++){
          urlObj[splitStr[i].split("=")[0]] = splitStr[i].split("=")[1];
        };
    };
    if(json == undefined){
        json = {}
    };
    $.extend( urlObj,json);
    for(let o in urlObj){
        if(o == 'sunnyfix_sign'){
            delete urlObj[o]
        }
    };
    let keys = Object.keys(urlObj);
    keys = keys.sort();
    let str = "";
    for(let i in keys){
        let o = keys[i];
        str = str+o+urlObj[o]
    };
    str = md5(str);
    return str;
};

export default getMd5Str