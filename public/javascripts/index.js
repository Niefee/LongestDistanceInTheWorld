var x=document.getElementById("demo");
var location_longitude=document.getElementById("location_longitude");
var location_latitude=document.getElementById("location_latitude");
var location_pos=document.getElementById("location_pos");
var longitude=0,//经度
    latitude=0;//纬度
var mp = new BMap.Map('map');
var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
var myGeo = new BMap.Geocoder();
var isGetlocation=false;
mp.centerAndZoom(point, 11);
//根据地址获取信息
//mp.centerAndZoom(new BMap.Point(116.404, 39.915), 11);


function initialize() {
    getLocation();
}

function getLocation()
{
if (navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(showPosition,showError,{enableHighAccuracy:true,});
}
else
{
    x.innerHTML="该浏览器不支持获取地理位置。";
}
}
//成功获取地理位置
function showPosition(pos) {
    isGetlocation=true;
    longitude=pos.coords.longitude;
    latitude=pos.coords.latitude;
    x.innerHTML=`目前位置：`;
    location_longitude.innerHTML=`${longitude>0?'东经：':'西经：'}${longitude.toFixed(5)}`;
    location_latitude.innerHTML=`${latitude>0?'北纬：':'南纬：'}${latitude.toFixed(5)}`;
    location_pos.innerHTML='goog';
      mp.panTo(new BMap.Point(longitude,latitude));
      mp.setZoom(13);

      myGeo.getLocation(new BMap.Point(longitude, latitude), function(result){
          if (result){
              console.log(result);
              location_pos.innerHTML=`所在地区：${result.addressComponents.province}${result.addressComponents.city}`;
          }
      });
}
//无法获取地理位置
function showError(error)
{
    isGetlocation=false;
    switch(error.code)
    {
        case error.PERMISSION_DENIED:
            x.innerHTML="用户拒绝对获取地理位置的请求。";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML="位置信息是不可用的。";
            break;
        case error.TIMEOUT:
            x.innerHTML="请求用户地理位置超时。";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML="未知错误。";
            break;
    }
}
window.onload = function () {
    //loadScript();
    initialize();
};


function goToAnOtherSide(position)
{
    if(isGetlocation){
        var newAddress=new BMap.Point(longitude-180,-latitude);
        mp.panTo(newAddress);
        mp.setZoom(8);
        x.innerHTML=`目前位置：`;
        location_latitude.innerHTML=`${-latitude>0?'北纬：':'南纬：'}${(latitude).toFixed(3)}`;
        location_longitude.innerHTML=`${longitude-180>0?'东经：':'西经：'}${(180-longitude).toFixed(3)}`;
        myGeo.getLocation(newAddress, function(result){
            if (result){
                console.log(result);
                location_pos.innerHTML=`所在地区：${result.addressComponents.province}${result.addressComponents.city}`;
            }
        });
    }else{
        alert('无法获取当前位置')
    }
}
