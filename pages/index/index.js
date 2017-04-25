//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    cityArray: ['上海', '北京', '广州'],
    cityIndex: 0, //所选城市
    lineIndex: 0, //所选地铁线路
    stopIndex: 0, //所选提醒站点
    objectArray: [
      {id: 0,name: '上海',line:[1,2,3,4,5,6,7,8,9,10],stop:[
        [{name:'富锦路',lon:121.431023,lat:31.39867},
        {name:'友谊西路',lon:121.434336,lat:31.38774},
        {name:'宝安公路',lon:121.437357,lat:31.376207},
        {name:'共富新村',lon:121.440458,lat:31.361557},
        {name:'呼兰路',lon:121.444185,lat:31.345991},
        {name:'通河新村',lon:121.447817,lat:31.337798},
        ],

        [{name:'徐泾东',lon:0,lat:0},
        {name:'虹桥火车站',lon:0,lat:0},
        {name:'虹桥2号航站楼',lon:'',lat:''},
        {name:'淞虹路',lon:'',lat:''},
        {name:'北新泾',lon:'',lat:''},
        {name:'咸宁路',lon:'',lat:''},
        ],

        [{name:'江杨北路',lon:121.446217,lat:31.414218},
        {name:'铁力路',lon:121.467851,lat:31.414261},
        {name:'友谊路',lon:121.48254,lat:31.40993},
        {name:'宝杨路',lon:121.486126,lat:31.401287},
        {name:'水产路',lon:121.494718,lat:31.387101},
        {name:'淞滨路',lon:'',lat:''},
        {name:'张华浜路',lon:'',lat:''},
        {name:'淞发路',lon:'',lat:''},
        {name:'长江南路',lon:'',lat:''},
        {name:'殷高西路',lon:'',lat:''},
        {name:'江湾镇',lon:'',lat:''},
        {name:'大柏树',lon:'',lat:''},
        {name:'赤峰路',lon:'',lat:''},
        {name:'虹口足球场',lon:'',lat:''},
        {name:'东宝兴路',lon:'',lat:''},
        {name:'宝山路',lon:121.483032,lat:31.257464},
        ]
      ]},
      {id: 1,name: '北京',line:[1,2,3,4,5,6,7,8,9,10]},
      {id: 2,name: '广州',line:[1,2,3,4,5,6,7,8,9,10]}
    ],
    lon:0, //当前经度
    lat:0, //当前纬度
    dis:0, //距离
    speed:0, 
  },
  //事件处理函数
  bindCityChange: function(e) {
    this.setData({
      cityIndex: e.detail.value,
      lineIndex: 0,
      stopIndex: 0,
    });
    this.handlerDistance();
  },
  bindLineChange: function(e) {
    this.setData({
      lineIndex: e.detail.value,
      stopIndex: 0,
    });
    this.handlerDistance();
  },
  bindStopChange: function(e) {
    this.setData({
      stopIndex: e.detail.value
    });
    this.handlerDistance();
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  handlerDistance:function(){
    //当前经纬度
    var lat1 = this.data.lat;
    var lon1 = this.data.lon;
    //目的地经纬度
    var lat2 = this.data.objectArray[this.data.cityIndex]['stop'][this.data.lineIndex][this.data.stopIndex]['lat'];
    var lon2 = this.data.objectArray[this.data.cityIndex]['stop'][this.data.lineIndex][this.data.stopIndex]['lon'];

    var s = util.latLonDistance(lat1,lon1,lat2,lon2);
    
    console.log(s);

    this.setData({dis:s});
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

    setInterval(function(){
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          that.setData({
            lon:res.longitude,
            lat:res.latitude,
            speed:res.speed
          });

          that.handlerDistance();
        }
      })
    },3000);

    

  }
})