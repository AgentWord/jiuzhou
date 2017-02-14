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
         var dataStoreId = 'landKfqTypeStore';
         var indexStoreId = 'staKfqConstructStore';
         var kfqInfoStoreId = 'kfqInfoStore';
         var kfqName = Ext.getCmp('the_kfqNameCombo').getRawValue();
         var kfqGrade = "省级";
         var kfqYear = "2013";
         var kfqType = Ext.getCmp('the_kfqtypeCombo').getValue();
         var kfqsplx=Ext.getCmp('the_kfqSpTypeCombo').getValue();
         var kfqjb=Ext.getCmp('the_kfqGradeCombo').getValue();

         //地域+开发区+时间+统计类型
         var title = "黑龙江省开发区土地利用状况统计";
         var gridId = 'thematic_jzzk_Grid';
         var chartStoreId = 'thematic_LanduseIndexValueStore';
         var echartDivId = "thematic_LanduseConstructionChangeTrend_echart";
         //var searchKeyword = "";
         var filterName = "kfqType";
         var filterValue;
         var statisticType = Ext.getCmp('the_statisticType').getValue();
         if (!statisticType) {
             Ext.Msg.alert('提示', "请选择统计类型!");
             return;
         }

         console.log("searchKeyword" + statisticType);

         //开发区类型统计（工业主导型产融合型）
         var dataStore = Ext.StoreMgr.get(dataStoreId);
         dataStore.clearFilter();
         if(kfqjb){
             filterName="kfqjb";
             dataStore.filter(filterName, kfqjb);

         }        
         if (kfqType) {
                 filterName="kfqType";
                 dataStore.filter(filterName, kfqType);
             
         }
         if(kfqsplx){
                 filterName="kfqsplx";
                 dataStore.filter(filterName, kfqsplx);
         }
         if (kfqName) {
             filterName = 'caclName';
             dataStore.filter(filterName, kfqName);
         }
         console.log(dataStore.getCount());
         if(dataStore.getCount()<=0){
            Ext.Msg.alert("提示","对不起，您要统计的数据不存在，请重新选择统计条件");
            return;
         }


         var indexStore = Ext.StoreMgr.get(indexStoreId);
         indexStore.load({
             params: {
                 searchKeyword: statisticType
             },
             callback: function(records, operation, success) {

                 for (var index in records) {
                     var main_rec = [];
                     var dev_rec = [];
                     var key = records[index].get('mainField');
                     var indexName = records[index].get('dlmc');
                     var indexValue = dataStore.sum(key).toFixed(3);
                     if (key.indexOf('m') >= 0) {
                         main_rec.push(indexName);
                         main_rec.push(indexValue);
                         mian_recordValue.push(main_rec);
                     } else {
                         dev_rec.push(indexName);
                         dev_rec.push(indexValue);
                         dev_recordValue.push(dev_rec);
                     }
                 }




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
                     { "header": "名称", "dataIndex": "indexName", width: 250 },
                     { "header": "面积", "dataIndex": "indexValue", width: 250 },
                 ];
                 //console.log("gridStore=" + gridStore.data.items);
                 var grid = Ext.getCmp(gridId);
                 //console.log("第一次打印grid" + grid);
                 grid.reconfigure(gridStore, column);
                 var chartStore = Ext.data.StoreManager.get(chartStoreId);
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
                 var row12 = getRowValue(echartsData, 11);
                 var row13 = getRowValue(echartsData, 12);
                 var row14 = getRowValue(echartsData, 13);
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
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row1
                         }, {
                             name: legendNames[1],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row2
                         }, {
                             name: legendNames[2],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row3
                         }, {
                             name: legendNames[3],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row4
                         }, {
                             name: legendNames[4],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row5
                         }, {
                             name: legendNames[5],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row6
                         }, {
                             name: legendNames[6],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row7
                         }, {
                             name: legendNames[7],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row8
                         }, {
                             name: legendNames[8],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row9
                         }, {
                             name: legendNames[9],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row10
                         }, {
                             name: legendNames[10],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row11
                         }, {
                             name: legendNames[11],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row12
                         }, {
                             name: legendNames[12],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row13
                         }, {
                             name: legendNames[13],
                             type: 'bar',
                             label: {
                                 normal: {
                                     show: true
                                 }
                             },
                             data: row14
                         }
                     ]
                 };


                 // 使用刚指定的配置项和数据显示图表。
                 myChart.setOption(option);


             }
         })



         //发展方向区

         /*} else {
                         //产城融合型

                     }
*/
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
