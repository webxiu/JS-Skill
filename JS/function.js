/*
 * 1.小时倒计时
 * 2.随机生成Guid
 * 3.判断PC还是手机
 * 4.判断是否在微信打开
 * 5.转义特殊字符
 * 6.处理路径---如果url目录地址与图片地址不一致
 * 7.传入数据库的时间字符串转换时间差(用于发布文章/动态等,xxx小时前)
 * 8.将时间戳转换成日期 //1507477547--->2017.10.08
 */



//1.小时倒计时  countDownFn(小时,分钟,35,59);
    function countDownFn(minuteDom, secondDom, startMinute, startSecound) {
      var min = startMinute;
      var sec = startSecound;
      minuteDom.innerHTML = min;
      secondDom.innerHTML = sec;
      var timer = setInterval(function () {
        sec--;
        sec = sec < 10 ? '0' + sec : sec;
        if (sec < 1) {
          sec = 59;
          min--;
          minuteDom.innerHTML = min;
        }
        if (min < 10) {
          minuteDom.innerHTML = '0' + min;
        }
        secondDom.innerHTML = sec;
        if (min < 0) {
          min = 0;
          sec = 0;
          minuteDom.innerHTML = '0' + min;
          secondDom.innerHTML = '0' + sec;
          clearInterval(timer)
        }
      }, 1000)
    }
//2.随机生成Guid
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
    console.log(generateUUID());//ef4f58be-e596-4b71-b9bb-328ed468e7b82
//3.判断PC还是手机
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad",  "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    if(IsPC()){
        //电脑要执行的操作
    }
//4.判断是否在微信打开
    function isWeixin () {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        var isAndroid = ua.indexOf('android') != -1;
        var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
        if (!isWeixin) {
            document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
            document.body.innerHTML = '请在微信客户端打开链接';
        }
    }
//5.转义特殊字符
    function html_encode(str){
      var s = '';
      if (str.length==0) return "";
      s = str.replace(/&/g,"&amp;");
      s = s.replace(/</g,"&lt;");
      s = s.replace(/>/g,"&gt;");
      s = s.replace(/\s/g,"&nbsp;");
      s = s.replace(/\'/g,"&#39;");
      s = s.replace(/\"/g,"&quot;");
      s = s.replace(/\n/g,"<br/>");
      return s;
    }

//6.处理路径---如果url目录地址与图片地址不一致(例如地址多一个"/api"的处理)
  function transUrlForImg(data){//data对象中的地址
      // 转大文件效率高些
      let contentStr = JSON.stringify(data.content,function(key,value){
          if(typeof value === 'string' && value.indexOf('http://localhost:80/api') != -1){
              return value.replace(/http:\/\/localhost:80\/api/g,'http://localhost:80');
          }
          return value;
      });

      // let content = contentStr.replace(/http:\/\/localhost:80\/api/g,'http://localhost:80');
      return JSON.parse(contentStr)
  }
// 7.传入数据库的时间字符串转换时间差(用于发布文章/动态等,xxx小时前)
  function getDateDistance(time){
      //把年月日,时分秒 转换为 毫秒数
      var minute = 1000 * 60;//1分钟是多少秒
      var hour = minute * 60;//1小时是多少秒...依此类推
      var day = hour * 24;
      var week = day * 7;
      var halfmonth = day * 15;
      var month = day * 30;
      var year = month * 12;
      var halfyear = month * 12/2;
      var year5 = month * 12 * 5;

      var date = new Date()
      var end = new Date(time)
      //两个时间差的毫秒数
      var dis =  date.getTime() - end.getTime();
      if (dis<0) {return '未来'};

     //时间差的毫秒数
      var minD   = dis/minute;
      var hourD  = dis/hour;
      var dayD   = dis/day;
      var weekD  = dis/week;
      var halfmonth  = dis/halfmonth;
      var monthD = dis/month;
      var yearD = dis/year;
      var halfyear = dis/halfyear;
      var year5D = dis/year5;


      if(year5D > 1){
          return '5年前';//5年
      }else if(yearD>=1 && yearD<=5){
          return parseInt(yearD)+'年前';
      }else if(halfyear>=1 && halfyear<=2){
          return '半年前';//半年前
      }else if(monthD>=1 && monthD<=6){
          return parseInt(monthD)+'个月前';
      }else if(halfmonth>=1 && monthD<=2){
          return '半个月前';
      }else if(weekD>=1 && weekD<=3){
          return parseInt(weekD)+'周前';
      }else if(dayD>=1 && dayD<=6){
          return parseInt(dayD)+'天前';
      }else if(hourD>=1 &&hourD<=24){
          return parseInt(hourD)+'小时前';
      }else if(minD>=1&& minD <=59){
          return parseInt(minD)+'分钟前';
      }else if(dis>0 && dis <= minute){
          return '刚刚';
      }
    }
    // console.log(getDateDistance('2019-06-03 18:59:00'))

// 8.将时间戳转换成日期
  function formatDate(time){//1507477547---->2017.10.08
        let date = new Date(time * 1000);
        let fmt = 'yyyy.MM.dd';
        if(/(y+)/.test(fmt)) { // 年
          let year = date.getFullYear().toString();
          fmt = fmt.replace(RegExp.$1, year);
        }
        if(/(M+)/.test(fmt)) { // 月
          let mouth = date.getMonth() + 1;
          if(mouth < 10) {
            mouth = '0' + mouth;
          }
          fmt = fmt.replace(RegExp.$1, mouth);
        }
        if(/(d+)/.test(fmt)) { // 日
          let mydate = date.getDate();
          if(mydate < 10) {
            mydate = '0' + mydate;
          }
          fmt = fmt.replace(RegExp.$1, mydate);
        }
        return fmt;
    };










