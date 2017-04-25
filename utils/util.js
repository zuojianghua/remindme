function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function rad(d){
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}

function latLonDistance(lat1,lon1,lat2,lon2){
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lon1) - rad(lon2);

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000 * 1000;
  return s.toFixed(1);
}

module.exports = {
  formatTime: formatTime,
  latLonDistance: latLonDistance
}
