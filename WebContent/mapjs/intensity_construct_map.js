/**
 * Created by WUCAN on 2015/5/30.
 */

require([
    "esri/map",
    "esri/graphicsUtils",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/arcgis/utils",
    "esri/geometry/Extent",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "dojo/ready",
    "dojo/on",
    "dojo/io/script",
    "dojo/_base/connect",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/parser",
    "dojo/domReady!"
], function(Map,
    graphicsUtils,
    ArcGISDynamicMapServiceLayer,
    FeatureLayer,
    arcgisUtils,
    Extent,
    Query,
    QueryTask,
    ready,
    on,
    dojoIOScript,
    connect,
    arrayUtil,
    dom,
    parser) {

    /*  var DLMJ = 'DLMJ';
      var DLDM = 'DLDM';
      var urlCombo = Ext.getCmp('construct_layerUrls_Combo');
      var url = urlCombo.getValue(); //取得url
      var store;

      var queryTask = new QueryTask(url);
      var query = new Query();
      query.returnGeometry = false;
      query.outFields = [DLDM, DLMJ];
      query.where = "1=1";
      queryTask.execute(query, showResult);


      function showResult(results) {
          if (!results.features) {
              return;
          }
          var attrData = [];
          var resultCount = results.features.length;
          for (var i = 0; i < resultCount; i++) {
              var featureAttributes = results.features[i].attributes;
              var record = [];
              for (var attr in featureAttributes) {
                  record.push(featureAttributes[attr]);
              }
              attrData.push(record);
          }

          store = Ext.create('Ext.data.ArrayStore', {
              // store configs
              storeId: 'myStore',
              //data
              data: attrData,
              // reader configs
              fields: [
                  {name: DLDM, type: 'auto'},
                  {name: DLMJ, type: 'float'}
              ],
              autoLoad: true
          });


          //尚可供地面积
          store.clearFilter();
          store.filter(DLDM, 'A');
          var yjcczmj = store.sum(DLMJ);*/
    var kfqName = Ext.getCmp('construct_kfqName').getRawValue();
    var kfqMap = Ext.getCmp('construct_layerUrls_Combo').getRawValue();
    var landuseStore = Ext.StoreMgr.get('landKfqTypeStore'); //土地面积store
    var idealStore = Ext.StoreMgr.get('landIndexIdealStore'); //理想值store
    var indexValueStore = Ext.StoreMgr.get('landIndexValueStore'); //现状值store
    
    console.log(kfqName);
     console.log("idealStore"+idealStore);
     idealStore.load({
             params: {
                 searchKeyword: "",
                 markType:"理想值汇总"
             },
           });
    var record = landuseStore.findRecord('calcName', kfqMap);
    var idealRecord = idealStore.findRecord('kfqName', kfqMap);
    var indexValueRecord = indexValueStore.findRecord('kfqName', kfqMap);
    console.log("record"+record);
        console.log("idealRecord"+idealRecord);
            console.log("indexValueRecord"+indexValueRecord);

    if (!record || !idealRecord || !indexValueRecord) {
        Ext.Msg.alert('提示', '数据不存在，请检查是否完成程度评价');
        return;
    }

    var main_ideal = idealRecord.get('mainLanduseConstructIndustry');
    var main_indexValue = indexValueRecord.get('mainLanduseConstructIndustry');
    var dev_ideal = idealRecord.get('developLanduseConstructIndustry');
    var dev_indexValue = indexValueRecord.get('developLanduseConstructIndustry');

    var kfqType = record.get("kfqType");
    var main_yjcczmj = record.get("ma");
    var dev_yjcczmj = record.get("da");
    console.log(kfqName+kfqType);
    if (kfqType.indexOf("工业")>=0) {

        //现状值


        /*var selectStore = Ext.StoreMgr.get('landIntensityExpansionStore');
        var record1 = selectStore.findRecord('kfqMap', nameCombo.getRawValue());
        if (record1) {
            Ext.Msg.alert('提示', '[' + nameCombo.getRawValue() + ']数据已计算存入数据库，请勿重复计算。');
            return;
        }*/
        Ext.getCmp('construct_kfqName_field').setValue(kfqName);
        Ext.getCmp('construct_kfqMap_field').setValue(kfqMap);
        Ext.getCmp('construct_mainIndexValueField').setValue(main_indexValue.toFixed(2));
        Ext.getCmp('construct_mainIdealField').setValue(main_ideal.toFixed(2));

        Ext.getCmp('construct_developIndexValueField').setValue(dev_indexValue.toFixed(2));
        Ext.getCmp('construct_developIdealField').setValue(dev_ideal.toFixed(2));


        Ext.getCmp('construct_mainYjcczField').setValue(main_yjcczmj.toFixed(2));
        Ext.getCmp('construct_developYjcczField').setValue(dev_yjcczmj.toFixed(2));

        Ext.getCmp('construct_isCalculated').setValue('true');
    } else {
        Ext.Msg.alert('提示', '[' + kfqName + ']属于【' +kfqType+ '】开发区，无结构潜力。');
        return;
        /*Ext.getCmp('construct_mainIndexValueField').setValue(0.toFixed(2));
        Ext.getCmp('construct_mainIdealField').setValue(0.toFixed(2));

        Ext.getCmp('construct_developIndexValueField').setValue(0.toFixed(2));
        Ext.getCmp('construct_developIdealField').setValue(0.toFixed(2));


        Ext.getCmp('construct_mainYjcczField').setValue(0.toFixed(2));
        Ext.getCmp('construct_developYjcczField').setValue(0);
        Ext.getCmp('construct_isCalculated').setValue('true');*/
    }



});
