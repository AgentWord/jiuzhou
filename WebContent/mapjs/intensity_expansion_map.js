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
    /*
        var DLMJ = 'DLMJ';
        var GYDM = 'GYDM';
        var KFQPJFW="KFQPJFW";
        var urlCombo = Ext.getCmp('expansion_layerUrls_Combo');
        var url = urlCombo.getValue(); //取得url
        var store;

        var queryTask = new QueryTask(url);
        var query = new Query();
        query.returnGeometry = false;
        query.outFields = [GYDM, DLMJ,KFQPJFW];
        query.where = "1=1";
        queryTask.execute(query, showResult);


        function showResult(results) {
            if (!results.features) {
                return;
            }
            var m_attrData = [];
            var d_attrData = [];
            var resultCount = results.features.length;
            console.log("总记录数："+resultCount);
            for (var i = 0; i < resultCount; i++) {
                
                var featureAttributes = results.features[i].attributes;
                var m_record = [];
                var d_record = [];
                for (var attr in featureAttributes) {
                    //console.log(featureAttributes["KFQPJFW"]);
                    if(featureAttributes["KFQPJFW"]=="主区")
                      m_record.push(featureAttributes[attr]);
                    else
                      d_record.push(featureAttributes[attr]);
                        
                }
                m_attrData.push(m_record);
                d_attrData.push(d_record);
                //console.log(m_attrData);
            }

            m_store = Ext.create('Ext.data.ArrayStore', {
                // store configs
                storeId: 'myStore',
                //data
                data: m_attrData,
                // reader configs
                fields: [
                    {name: GYDM, type: 'auto'},
                    {name: DLMJ, type: 'float'},
                    {name: KFQPJFW, type: 'float'}
                ],
                autoLoad: true
            });
            d_store = Ext.create('Ext.data.ArrayStore', {
                // store configs
                storeId: 'myStore',
                //data
                data: d_attrData,
                // reader configs
                fields: [
                    {name: GYDM, type: 'auto'},
                    {name: DLMJ, type: 'float'},
                    {name: KFQPJFW, type: 'float'}
                
                ],
                autoLoad: true
            });

            //尚可供地面积
            m_store.clearFilter();
            m_store.filter(GYDM, 'E');
            var skgdmj = m_store.sum(DLMJ);
            //尚可供应工矿仓储面积
            m_store.clearFilter();
            m_store.filter(GYDM, 'E21');
            var skgkcc = m_store.sum(DLMJ);

             //尚可供地面积  发展方向区
            d_store.clearFilter();
            d_store.filter(GYDM, 'E');
            var d_skgdmj = d_store.sum(DLMJ);
            //尚可供应工矿仓储面积
            d_store.clearFilter();
            d_store.filter(GYDM, 'E21');
            var d_skgkcc = d_store.sum(DLMJ);*/

    var nameCombo = Ext.getCmp('expansion_layerUrls_Combo');
    var mystore = Ext.StoreMgr.get('landKfqTypeStore');
    var record = mystore.findRecord('calcName', nameCombo.getRawValue());
    var selectStore = Ext.StoreMgr.get('landIntensityExpansionStore');
    var record1 = selectStore.findRecord('kfqMap', nameCombo.getRawValue());
    if (record1) {
        Ext.Msg.alert('提示', '[' + nameCombo.getRawValue() + ']数据已计算存入数据库，请勿重复计算。');
        return;
    }
    var skgdmj = record.get("me");
    var skgkcc = record.get("me21");
    var d_skgdmj = record.get("de");
    var d_skgkcc = record.get("de21");
    Ext.getCmp('expansion_mainskgytdmj_field').setValue(skgdmj.toFixed(2));
    Ext.getCmp('expansion_mainskgygkcc_field').setValue(skgkcc.toFixed(2));
    Ext.getCmp('expansion_developskgytdmj_field').setValue(d_skgdmj.toFixed(2));
    Ext.getCmp('expansion_developskgygkcc_field').setValue(d_skgkcc.toFixed(2));

    Ext.getCmp('expansion_isCalculated').setValue('true');


});
