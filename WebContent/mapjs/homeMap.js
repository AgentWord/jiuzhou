/**
 * Created by CDB on 2017/2/10.
 */
    var map = new BMap.Map("map");
	//map.centerAndZoom(new BMap.Point(116.37231894589,39.976018510037), 14);
	map.addControl(new BMap.NavigationControl());    //地图平移缩放控件PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。
	map.addControl(new BMap.OverviewMapControl());   //添加缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
	map.addControl(new BMap.ScaleControl());     //比例尺控件，默认位于地图左下方，显示地图的比例关系。
	map.addControl(new BMap.MapTypeControl());   //地图类型控件，默认位于地图右上方。
	map.addControl(new BMap.GeolocationControl());   //定位控件，针对移动端开发，默认位于地图左下方。
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
	var point = new BMap.Point(116.379802, 40.047272);
	map.centerAndZoom(point, 18);
	var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
     '<img src="images/login/logo.png" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
     '地址：北京市海淀区宝盛里观林园3-4-602.<br/>电话：(010)58803082<br/>简介：北京世纪九州软件有限公司位于北京市海淀区林萃桥地铁站附近，奥林匹克森林公园以北。' +
   '</div>';
	 var searchInfoWindow = null;
		searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
				title  : "北京世纪九州软件有限公司",      //标题
				width  : 330,             //宽度
				height : 115,              //高度
				panel  : "panel",         //检索结果面板
				enableAutoPan : true,     //自动平移
				searchTypes   :[
					BMAPLIB_TAB_SEARCH,   //周边检索
					BMAPLIB_TAB_TO_HERE,  //到这里去
					BMAPLIB_TAB_FROM_HERE //从这里出发
				]
			});
		
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);// 将标注添加到地图中
	 marker.enableDragging(); //marker可拖拽
	 marker.addEventListener("click", function(e){
		    searchInfoWindow.open(marker);
	    })
	    
	searchInfoWindow.open(marker);
	 
	/*var opts = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "北京世纪九州软件有限公司", // 信息窗口标题
			enableMessage:true,
			anchor:"ANCHOR_UPPERRIGHT",
			offset: new BMap.Size(0, -13)

		};
	var infoWindow = new BMap.InfoWindow("地址：北京市海淀区宝盛里观林园3-4-602;电话：010-62998085.", opts);  // 创建信息窗口对象
	infoWindow.enableCloseOnClick();
	map.openInfoWindow(infoWindow, point);
	marker.addEventListener("click", function(){
		map.openInfoWindow(infoWindow,point); //开启信息窗口
*/		

	