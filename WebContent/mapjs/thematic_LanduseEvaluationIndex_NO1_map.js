     // 评价指标1：土地开发率、综合容积率、建筑密度、固定资产投资强度、综合地均税收

     //分主区和发展方向区
     //
     require([], function() {


         /*
         1.获取要进行统计的store：landIndexIntensityValueStore；
         2.筛选开发区类型：工业、产城
         3.
         */
         var mian_recordValue = [];
         var dev_recordValue = [];
         var storeId = 'landIndexValueStore';
         //Ext.getCmp('thematicIndexType_KFQCombo').setRawValue('指标现状值');
        // var indexType = Ext.getCmp('thematicIndexType_KFQCombo').getRawValue();
      /*   if (indexType != "指标现状值") {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
             storeId = "landIndexIntensityValueStore";
             console.log(storeId);         }*/
         var echartDivId = "thematic_LanduseIndexValue_echart";
         var kfqName = Ext.getCmp('thematicIndexValue_KFQCombo').getRawValue();
         var mystore = Ext.StoreMgr.get(storeId); //landIndexIntensityValueStore
         var record = mystore.findRecord('kfqName', kfqName);
         if(!record){
         	Ext.Msg.alert('提示',kfqName+'没有通过集约度评价，请先完成开发区的集约度评价！');
         	return;
         }
         var kfqType = Ext.getCmp('thematicIndexValue_KFQCombo').getValue();
         var title = kfqName + "集约度评价指标统计";
         if (kfqType.indexOf('工业') >= 0) {
             //工业主导型
             //获取指标值
             //主区

             var store = Ext.StoreMgr.get('landIndexMetaStore');
             store.load({
                     params: {
                         searchKeyword: 'c'
                     },
                     callback: function(records, operation, success) {

                         for (var index in records) {
                             var main_rec = [];
                             var dev_rec = [];
                             var key = records[index].get('indexKey');
                             var indexName = records[index].get('indexName');
                             var indexValue = record.get(key);
                             if (key.indexOf('main') >= 0) {
                                 main_rec.push(indexName);
                                 main_rec.push(indexValue);
                                 mian_recordValue.push(main_rec);
                             } else {
                                 dev_rec.push(indexName);
                                 dev_rec.push(indexValue);
                                 dev_recordValue.push(dev_rec);
                             }
                             //console.log("key=" + indexValue);




                             //console.log(weightValue+'/'+idealValue+'='+standardValue,key);
                         }
                         /*var all=[];
                         for (var i in mian_recordValue){
                         	var rec=[];
                         	var key=mian_recordValue[i][0];
                         	var keyValue=mian_recordValue[i][1]+dev_recordValue[i][1];
                         	rec.push(key);
                         	rec.push(keyValue);
                         	all.push(rec);

                         }*/

                         console.log(mian_recordValue);
                         console.log(dev_recordValue);
                         //console.log(all);
                         var legendNames = getLegendName(mian_recordValue);
                         var row1 = getColumnValue(mian_recordValue, 1); // 第一列的数据
                         console.log("第一列数据：" + row1);
                         var gridStore = Ext.create('Ext.data.ArrayStore', {
                             // store configs
                             storeId: 'sta_IndexValueStore',
                             //data
                             data: mian_recordValue,
                             // reader configs
                             fields: [
                                 { name: 'indexName', type: 'auto' },
                                 { name: 'indexValue', type: 'float' }
                             ],

                             autoLoad: true
                         });
                         var column = [
                             { "header": "指标名称", "dataIndex": "indexName", width: 250 },
                             { "header": "指标值", "dataIndex": "indexValue", width: 250 },
                         ];
                         console.log("gridStore=" + gridStore.data.items);
                         var grid = Ext.getCmp('thematic_LanduseIndexValue_Grid');
                         //console.log("第一次打印grid" + grid);
                         grid.reconfigure(gridStore, column);
                         var chartStore = Ext.data.StoreManager.get('thematic_LanduseIndexValueStore');
                         chartStore.setData(gridStore.data.items);
                         var jsonData = Ext.pluck(chartStore.data.items, 'data'); // 从store获取数据

                         var echartsData = Object.keys(jsonData).map(function(k) {

                             return jsonData[k];

                         });

                         //var echartsLegend = getLegendName(echartsData);

                         var echartsLegendType = getLegendType(echartsData);
                         console.log(echartsLegendType);
                         //echartsLegendType.shift(); //删除数组第一项，																			
                         // echartsLegendType.pop(); //删除数组最后一项
                         var row1 = getRowValue(echartsData, 0); // 第一列的数据
                         var row2 = getRowValue(echartsData, 1);
                         var row3 = getRowValue(echartsData, 2);
                         var row4 = getRowValue(echartsData, 3);
                         var row5 = getRowValue(echartsData, 4);
                         var row6 = getRowValue(echartsData, 5);
                         var row7 = getRowValue(echartsData, 6);
                         var row8 = getRowValue(echartsData, 7);
                         var row9 = getRowValue(echartsData, 8);
                         var row10 = getRowValue(echartsData, 9);
                         var row11 = getRowValue(echartsData, 10);
                         console.log("第一列的数据" + row1);
                         // 基于准备好的dom，初始化echarts实例
                         var myChart = echarts.init(document.getElementById(echartDivId));
                         // 指定图表的配置项和数据
                         option = {
                             title: {
                                 x: 'center',
                                 text: title
                             },
                             tooltip: {
                                 trigger: 'axis',

                             },
                             legend: {
                                 orient: 'vertical',
                                 x: 'left',
                                 data: legendNames
                             },
                             grid: {
                                 left: '20%',
                                 right: '4%',
                                 bottom: '3%',
                                 containLabel: true
                             },
                             toolbox: {
                                 show: true,
                                 feature: {
                                     dataView: { show: true, readOnly: false },
                                     magicType: { show: true, type: ['line', 'bar'] },
                                     restore: { show: true },
                                     saveAsImage: { show: true }
                                 }
                             },
                             calculable: true,
                             xAxis: [{
                                 type: 'category',
                                 data: [title] // ' //[echartsLegendType[1],echartsLegendType[2]]
                             }],
                             yAxis: [{
                                 type: 'value'
                             }],
                             series: [

                                 {
                                     name: legendNames[0],
                                     type: 'bar',
                                     data: row1
                                 }, {
                                     name: legendNames[1],
                                     type: 'bar',
                                     data: row2
                                 }, {
                                     name: legendNames[2],
                                     type: 'bar',
                                     data: row3
                                 }, {
                                     name: legendNames[3],
                                     type: 'bar',
                                     data: row4
                                 }, {
                                     name: legendNames[4],
                                     type: 'bar',
                                     data: row5
                                 }, {
                                     name: legendNames[5],
                                     type: 'bar',
                                     data: row6
                                 }, {
                                     name: legendNames[6],
                                     type: 'bar',
                                     data: row7
                                 }, {
                                     name: legendNames[7],
                                     type: 'bar',
                                     data: row8
                                 }, {
                                     name: legendNames[8],
                                     type: 'bar',
                                     data: row9
                                 }, {
                                     name: legendNames[9],
                                     type: 'bar',
                                     data: row10
                                 }, {
                                     name: legendNames[10],
                                     type: 'bar',
                                     data: row11
                                 }
                             ]
                         };


                         // 使用刚指定的配置项和数据显示图表。
                         myChart.setOption(option);


                     }
                 })
                 //var echartsLegend = getLegendName(recordValue); // 横坐标


             /* var fieldsArr=[];
               var field = {
            "name": "Index",
            "type": "string"
        };
        fieldsArr.push(field);
        var field1={
        	"name": 'Value', "type": 'float'
        }*/
             //新建一个store  一个grid
             //var chartStore = Ext.data.StoreManager.get('thematic_LanduseIndexValueStore');

             //显示表格
             //var columnsArr = [];


             /*var column = { "header": "指标名称", "dataIndex": "Index", width: 250 };
             columnsArr.push(column);
             var columnValue = {
                 xtype: 'numbercolumn',
                 format: '0.00',
                 "header": "指标值",
                 "dataIndex": "Value",
                 width: 250
             };
             columnsArr.push(columnValue);

             console.log("运行到这里了吗？");
             var grid = Ext.getCmp('thematic_LanduseIndexValue_Grid');
             console.log("第一次打印grid" + grid);
             grid.reconfigure(gridStore, columnsArr);
             console.log("第二次打印grid" + grid);
             // echarts
             var chartStore = Ext.data.StoreManager.get('thematic_LanduseIndexValueStore');
             chartStore.setData(gridStore.data.items);
             //打印store里面的数据
             console.log("内容：" + gridStore.data.items);
             chartStore.reload();*/
             // 获得图表类型


             //发展方向区

         } else {
             //产城融合型

         }

         function getLegendName(dataArr) {
             var legendNames = [];
             for (var i in dataArr) {
                 // console.log("i代表什么==" + i);
                 legendNames.push(dataArr[i][0]);
             }
             return legendNames;
         }
         // 获取柱状图数据种类
         function getLegendType(dataArr) {
             if (dataArr && dataArr[0]) {
                 return Object.keys(dataArr[0]); // 取二级属性的名称
             }
         }

         // 获取数组列的数值
         function arrayColumn(arr, n) {

             return arr.map(x[n]);
         }

         function getColumnValue(dataArr, index) {
             var colValues = [];
             if (dataArr && Object.keys(dataArr[0]).length > index + 1) {
                 var keyNames = Object.keys(dataArr[0]); // 取二级属性的名称

                 for (var i in dataArr) {
                     var colName = keyNames[index];
                     var value = dataArr[i][colName];
                     colValues.push(value);
                 }
             }
             return colValues;
         }

         function getRowValue(dataArr, index) {
             var rowValues = [];
             //console.log("dataArr长度"+dataArr.length);
             if (dataArr.length - 1 < index)
                 return rowValues;

             var len = Object.keys(dataArr[0]).length;
             if (dataArr && len > 1) {
                 var keyNames = Object.keys(dataArr[0]); // 取二级属性的名称
                 keyNames.shift();
                 keyNames.pop();
                 for (var i in keyNames) {
                     var rowName = keyNames[i];
                     var value = dataArr[index][rowName];
                     rowValues.push(value);
                 }

             }
             return rowValues;
         }

     })
