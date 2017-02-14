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
], function (Map,
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

    var DLMJ = 'DLMJ';
    var DLDM = 'DLDM';
    var GYDM ='GYDM';
    var JZMJ='JZMJ';
    var JZJDMJ='JZJDMJ';//建筑基地面积
    var JDZMJ='JDZMJ';
    var GDZCTZZE='GDZCTZZE';//固定资产投资总额
    var GYSSZE='GYSSZE';//工业税收总额
    var TDXZQK='TDXZQK';//土地闲置情况（未建成条件下）
    var KFQPJFW='KFQPJFW';
    var urlCombo = Ext.getCmp('survey_layerUrls_Combo');
    var url = urlCombo.getValue(); //取得url
    var store;

    var queryTask = new QueryTask(url);
    var query = new Query();
    query.returnGeometry = false;
    query.outFields = [DLDM, GYDM,KFQPJFW,DLMJ,JZMJ,JZJDMJ,JDZMJ,GDZCTZZE,GYSSZE,TDXZQK];
    query.where = "1=1";
    queryTask.execute(query, showResult);


    function showResult(results) {
        if (!results.features) {
            return;
        }
        var attrData = [];
        var resultCount = results.features.length;
        console.log("总记录数："+resultCount);
        for (var i = 0; i < resultCount; i++) {
            var featureAttributes = results.features[i].attributes;
            var record = [];
            for (var attr in featureAttributes) {
            	if(featureAttributes["KFQPJFW"]=="主区")
            	//console.log(featureAttributes["KFQPJFW"]);
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
                {name: 'DLDM', type: 'auto'},
                {name: 'GYDM', type: 'auto'},
                {name: 'KFQPJFW', type: 'auto'},
                {name: 'DLMJ', type: 'float'},
                {name: 'JZMJ', type: 'float'},
                {name: 'JZJDMJ', type: 'float'},
                {name: 'JDZMJ', type: 'float'},
                {name: 'GDZCTZZE', type: 'float'},
                {name: 'GYSSZE', type: 'float'},
                {name: 'TDXZQK', type: 'auto'}
                
            ],
            autoLoad: true
        });


        //总面积
        store.filter(DLDM, 'A');
        var yjcczzmj = store.sum(DLMJ);//已建成城镇建设用地面积
        console.log("已建成城镇建设用地面积："+yjcczzmj);
       //
        store.clearFilter();
        store.filter(DLDM, 'A');
        var zjzmj=store.sum(JZMJ);//总建筑面积
        var jzjdmj=store.sum(JZJDMJ);//建筑基地面积
        var gdzctzze=store.max(GDZCTZZE);//固定资产投资总额。
        var gyssze=store.max(GDZCTZZE);//工业用地地均税收总额。
        console.log("总建筑面积："+zjzmj+"；建筑基地面积："+jzjdmj+";固定资产投资总额="+gdzctzze+"工业用地地均税收总额="+gyssze);
        //工矿仓储面积
        store.clearFilter();
        store.filter(DLDM, 'A2');
        var gkcczmj = store.sum(DLMJ);
        var gkjzmj=store.sum(JZMJ);//工矿建筑面积
        var gkjzjdmj=store.sum(JDZMJ);//工矿建筑基地面积
        console.log("工矿建筑面积："+gkjzmj+"工矿建筑基地面积："+gkjzjdmj+"工矿仓储面积"+gkjzjdmj);
        //工矿仓储比例
        var gkccRate = gkcczmj / yjcczzmj;
        //住宅面积
        store.clearFilter();
        store.filter(DLDM, 'A1');
        var zzzmj = store.sum(DLMJ);
        //住宅比例
        var zzRate = zzzmj / yjcczzmj;
        //已供应国有建设用地面积
        store.clearFilter();
        store.filter(GYDM,'D');
        var ygymj=store.sum(DLMJ);//已供应面积
        
        console.log("D="+ygymj+"过滤记录："+store.getCount());
       
        //已达供地条件土地面积
        store.clearFilter();
        store.filter(GYDM,'E');
        var skgymj=store.sum(DLMJ);//尚可供应面积
        
        //未建成城镇建设用地
        store.clearFilter();
        store.filter(DLDM,'B');
        var wjcmj=store.sum(DLMJ);//未建成面积
        
        /*//总建筑面积
        store.clearFilter();
        store.filter(DLDM,'A');
       
        var wjcmj=store.sum(DLMJ);//总建筑面积
*/        
        /*store.filter(GYDM,'D1');
        var D1zmj=store.sum(DLMJ);
        console.log(D1zmj.toFixed(3));
        store.clearFilter();
        store.filter(GYDM,'D21');
        var D21zmj=store.sum(DLMJ);
        store.clearFilter();
        store.filter(GYDM,'D22');
        var D22zmj=store.sum(DLMJ);
        var Dzmj=D1zmj+D21zmj+D22zmj;
        console.log("D1+D22+D23="+Dzmj.toFixed(3));*/
        
        
        //
        Ext.getCmp('survey_index_yjcczzmjText').setValue(yjcczzmj.toFixed(3));
        Ext.getCmp('survey_index_gkccmjText').setValue(gkcczmj.toFixed(3));
        Ext.getCmp('survey_index_gkccRateText').setValue(gkccRate.toFixed(3));
        Ext.getCmp('survey_index_zzmjText').setValue(zzzmj.toFixed(3));
        Ext.getCmp('survey_index_zzmjRateText').setValue(zzRate.toFixed(3));

        //赋值
        Ext.getCmp('index_ygygyjsyd').setValue(ygymj.toFixed(3));
        Ext.getCmp('index_ydgdtjtd').setValue((ygymj+skgymj).toFixed(3));
        Ext.getCmp('index_yjcczjsyd').setValue(yjcczzmj.toFixed(3));
        Ext.getCmp('index_gkccmj').setValue(gkcczmj.toFixed(3));
        Ext.getCmp('index_zjzmj').setValue(zjzmj.toFixed(3));
        
        Ext.getCmp('index_jzjdmj').setValue(jzjdmj.toFixed(3));
        Ext.getCmp('index_gkzjzmj').setValue(gkjzmj.toFixed(3));
        Ext.getCmp('index_gkjzjdmj').setValue(gkjzjdmj.toFixed(3));
        Ext.getCmp('index_gdzctzze').setValue(gdzctzze.toFixed(3));
        Ext.getCmp('index_gyssze').setValue(gyssze.toFixed(3));
        
        Ext.getCmp('survey_index_CalcNameText').setValue(urlCombo.getRawValue());
       // Ext.getCmp('survey_index_DzmjText').setValue(Dzmj.toFixed(3));
        //console.log(Dzmj.toFixed(3));
        //计算地区工业类型
        var kfqTypeCombo = Ext.getCmp('survey_index_kfqTypeCombo');
        var kfqArea = Ext.getCmp('survey_KfqArea_Combo').getRawValue();
        if (kfqArea.indexOf("保税") > -1 || kfqArea.indexOf("加工区") > -1) {
            kfqTypeCombo.setValue('工业主导型开发区');
            return;
        }

        var gkccRate = Ext.getCmp('survey_index_gkccRateText').getValue();
        var zzRate = Ext.getCmp('survey_index_zzmjRateText').getValue();

        if (gkccRate == "") {
            Ext.Msg.alert('提示', '请先计算现状值再计算开发区类型。');
            return;
        }

        if (gkccRate > 0.30 && zzRate < 0.25) {
            kfqTypeCombo.setValue('工业主导型开发区');
        } else if (gkccRate <= 0.30 && zzRate >= 0.25) {
            kfqTypeCombo.setValue('产城融合型开发区');
        } else {
            kfqTypeCombo.setValue('其他类型开发区');
        }


    }

});