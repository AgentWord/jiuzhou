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

    /*var DLMJ = 'DLMJ';
    var DLDM = 'DLDM';
    var urlCombo = Ext.getCmp('intension_layerUrls_Combo');
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
        store.filter(DLDM, 'A2');
        var dldmGkccmj = store.sum(DLMJ);*/

    var kfqName = Ext.getCmp('intension_layerUrls_Combo').getRawValue();
    var landuseStore = Ext.StoreMgr.get('landKfqTypeStore'); //土地面积store
    var idealStore = Ext.StoreMgr.get('landIndexIdealStore'); //理想值store
    var indexValueStore = Ext.StoreMgr.get('landIndexValueStore'); //现状值store

    console.log("idealStore"+idealStore.getCount());
    console.log("landuseStore"+landuseStore.getCount());
    console.log("indexValueStore"+indexValueStore.getCount());
    var record = landuseStore.findRecord('calcName', kfqName);
    var idealRecord = idealStore.findRecord('kfqName', kfqName);
    var indexValueRecord = indexValueStore.findRecord('kfqName', kfqName);
    if (!record || !idealRecord || !indexValueRecord) {
        Ext.Msg.alert('提示', '数据不存在，请检查是否完成程度评价');
        return;
    }
    //获得值
    var main_gyydzhrjl_indexValue = indexValueRecord.get('mainLanduseIntensitySumratio');
    var main_gyydjzxs_indexValue = indexValueRecord.get('mainLanduseIntensityBuildindex');
    var main_gyydgdzc_indexValue = indexValueRecord.get('mainBenefitInexportAssets');
    var main_gyyddjss_indexValue = indexValueRecord.get('mainBenefitInexportTax');
    var main_zhdjss_indexValue = indexValueRecord.get('ccmainBenefitInexportTax');

    var dev_gyydzhrjl_indexValue = indexValueRecord.get('developLanduseIntensitySumratio');
    var dev_gyydjzxs_indexValue = indexValueRecord.get('developLanduseIntensityBuildindex');
    var dev_gyydgdzc_indexValue = indexValueRecord.get('developBenefitInexportAssets');
    var dev_gyyddjss_indexValue = indexValueRecord.get('developBenefitInexportTax');
    var dev_zhdjss_indexValue = indexValueRecord.get('ccdevelopBenefitInexportTax');

    var main_gyydzhrjl_ideal = idealRecord.get('mainLanduseIntensitySumratio');
    var main_gyydjzxs_ideal = idealRecord.get('mainLanduseIntensityBuildindex');
    var main_gyydgdzc_ideal = idealRecord.get('mainBenefitInexportAssets');
    var main_gyyddjss_ideal = idealRecord.get('mainBenefitInexportTax');
    var main_zhdjss_ideal = idealRecord.get('ccmainBenefitInexportTax');

    var dev_gyydzhrjl_ideal = idealRecord.get('developLanduseIntensitySumratio');
    var dev_gyydjzxs_ideal = idealRecord.get('developLanduseIntensityBuildindex');
    var dev_gyydgdzc_ideal = idealRecord.get('developBenefitInexportAssets');
    var dev_gyyddjss_ideal = idealRecord.get('developBenefitInexportTax');
    var dev_zhdjss_ideal = idealRecord.get('ccdevelopBenefitInexportTax');

    //var dev_ideal = idealRecord.get('developLanduseConstructIndustry');
    //var dev_indexValue = indexValueRecord.get('developLanduseConstructIndustry');

    var kfqType = record.get("kfqType");
    var main_gkcczmj = record.get("ma2");
    var dev_gkczmj = record.get("da2");
    var kfqType = Ext.getCmp('intension_kfqType').getValue();
    //计算

    var intension_mainSumratioIntension = main_gkcczmj * (main_gyydzhrjl_ideal - main_gyydzhrjl_indexValue) / main_gyydzhrjl_ideal;
    var intension_mainBuildrateIntension = main_gkcczmj * (main_gyydjzxs_ideal - main_gyydjzxs_indexValue) / main_gyydjzxs_ideal;
    var intension_mainAssetIntension = main_gkcczmj * (main_gyydgdzc_ideal - main_gyydgdzc_indexValue) / main_gyydgdzc_ideal;
    var intension_mainTaxIntension = main_gkcczmj * (main_gyyddjss_ideal - main_gyyddjss_indexValue) / main_gyyddjss_ideal;
    var intension_mainSumtaxIntension = main_gkcczmj * (main_zhdjss_ideal - main_zhdjss_indexValue) / main_zhdjss_ideal;

    var intension_developSumratioIntension = dev_gkczmj * (dev_gyydzhrjl_ideal - dev_gyydzhrjl_indexValue) / dev_gyydzhrjl_ideal;
    var intension_developBuildrateIntension = dev_gkczmj * (dev_gyydjzxs_ideal - dev_gyydjzxs_indexValue) / dev_gyydjzxs_ideal;
    var intension_developAssetIntension = dev_gkczmj * (dev_gyydgdzc_ideal - dev_gyydgdzc_indexValue) / dev_gyydgdzc_ideal;
    var intension_developTaxIntension = dev_gkczmj * (dev_gyyddjss_ideal - dev_gyyddjss_indexValue) / dev_gyyddjss_ideal;
    var intension_developSumtaxIntension = dev_gkczmj * (dev_zhdjss_ideal - dev_zhdjss_indexValue) / dev_zhdjss_ideal;
    if (kfqType.indexOf('工业') < 0) {
        intension_mainSumtaxIntension = intension_developSumtaxIntension = 0;
    } else {
        intension_mainSumratioIntension = intension_mainBuildrateIntension = intension_mainAssetIntension = intension_mainTaxIntension = 0;
        intension_developSumratioIntension = intension_developBuildrateIntension = intension_developAssetIntension = intension_developTaxIntension = 0;
    }

    //赋值
    Ext.getCmp('intension_mainGkccmj_field').setValue(main_gkcczmj.toFixed(2));
    Ext.getCmp('intension_developGkccmj_field').setValue(dev_gkczmj.toFixed(2));

    Ext.getCmp('intension_mainSumratioWeight_field').setValue(main_gyydzhrjl_indexValue);
    Ext.getCmp('intension_mainBuildrateWeight_field').setValue(main_gyydjzxs_indexValue);
    Ext.getCmp('intension_mainAssetWeight_field').setValue(main_gyydgdzc_indexValue);
    Ext.getCmp('intension_mainTaxWeight_field').setValue(main_gyyddjss_indexValue);
    Ext.getCmp('intension_mainSumtaxWeight_field').setValue(main_zhdjss_indexValue);

    Ext.getCmp('intension_developSumratioWeight_field').setValue(dev_gyydzhrjl_indexValue);
    Ext.getCmp('intension_developBuildrateWeight_field').setValue(dev_gyydjzxs_indexValue);
    Ext.getCmp('intension_developAssetWeight_field').setValue(dev_gyydgdzc_indexValue);
    Ext.getCmp('intension_developTaxWeight_field').setValue(dev_gyyddjss_indexValue);
    Ext.getCmp('intension_developSumtaxWeight_field').setValue(dev_zhdjss_indexValue);

    Ext.getCmp('intension_mainSumratioIdeal_field').setValue(main_gyydzhrjl_ideal);
    Ext.getCmp('intension_mainBuildrateIdeal_field').setValue(main_gyydjzxs_ideal);
    Ext.getCmp('intension_mainAssetIdeal_field').setValue(main_gyydgdzc_ideal);
    Ext.getCmp('intension_mainTaxIdeal_field').setValue(main_gyyddjss_ideal);
    Ext.getCmp('intension_mainSumtaxIdeal_field').setValue(dev_zhdjss_ideal);

    Ext.getCmp('intension_developSumratioIdeal_field').setValue(dev_gyydzhrjl_ideal);
    Ext.getCmp('intension_developBuildrateIdeal_field').setValue(dev_gyydjzxs_ideal);
    Ext.getCmp('intension_developAssetIdeal_field').setValue(dev_gyydgdzc_ideal);
    Ext.getCmp('intension_developTaxIdeal_field').setValue(dev_gyyddjss_ideal);
    Ext.getCmp('intension_developSumtaxIdeal_field').setValue(dev_zhdjss_ideal);

    Ext.getCmp('intension_mainSumratioIntension_field').setValue(intension_mainSumratioIntension.toFixed(2));
    Ext.getCmp('intension_mainBuildrateIntension_field').setValue(intension_mainBuildrateIntension.toFixed(2));
    Ext.getCmp('intension_mainAssetIntension_field').setValue(intension_mainAssetIntension.toFixed(2));
    Ext.getCmp('intension_mainTaxIntension_field').setValue(intension_mainTaxIntension.toFixed(2));
    Ext.getCmp('intension_mainSumtaxIntension_field').setValue(intension_mainSumtaxIntension.toFixed(2));

    Ext.getCmp('intension_developSumratioIntension_field').setValue(intension_developSumratioIntension.toFixed(2));
    Ext.getCmp('intension_developBuildrateIntension_field').setValue(intension_developBuildrateIntension.toFixed(2));
    Ext.getCmp('intension_developAssetIntension_field').setValue(intension_developAssetIntension.toFixed(2));
    Ext.getCmp('intension_developTaxIntension_field').setValue(intension_developTaxIntension.toFixed(2));
    Ext.getCmp('intension_developSumtaxIntension_field').setValue(intension_developSumtaxIntension.toFixed(2));

    Ext.getCmp('intension_isCalculated').setValue('true');

    /*
       function caculate() {
        var mainGkccmj = Ext.getCmp('intension_mainGkccmj_field').getValue();
        var devGkccmj=Ext.getCmp('intension_developGkccmj_field').getValue();
        
        var intension_mainBuildrateWeight = Ext.getCmp('intension_mainBuildrateWeight_field').getValue();
        var intension_mainSumratioWeight = Ext.getCmp('intension_mainSumratioWeight_field').getValue();
        var intension_mainAssetWeight = Ext.getCmp('intension_mainAssetWeight_field').getValue();
        var intension_mainTaxWeight = Ext.getCmp('intension_mainTaxWeight_field').getValue();
        var intension_mainSumtaxWeight = Ext.getCmp('intension_mainSumtaxWeight_field').getValue();
        var intension_developSumratioWeight = Ext.getCmp('intension_developSumratioWeight_field').getValue();
        var intension_developBuildrateWeight = Ext.getCmp('intension_developBuildrateWeight_field').getValue();
        var intension_developAssetWeight = Ext.getCmp('intension_developAssetWeight_field').getValue();
        var intension_developTaxWeight = Ext.getCmp('intension_developTaxWeight_field').getValue();
        var intension_developSumtaxWeight = Ext.getCmp('intension_developSumtaxWeight_field').getValue();

        var intension_mainSumratioIdeal = Ext.getCmp('intension_mainSumratioIdeal_field').getValue();
        var intension_mainBuildrateIdeal = Ext.getCmp('intension_mainBuildrateIdeal_field').getValue();
        var intension_mainAssetIdeal = Ext.getCmp('intension_mainAssetIdeal_field').getValue();
        var intension_mainTaxIdeal = Ext.getCmp('intension_mainTaxIdeal_field').getValue();
        var intension_mainSumtaxIdeal = Ext.getCmp('intension_mainSumtaxIdeal_field').getValue();
        var intension_developSumratioIdeal = Ext.getCmp('intension_developSumratioIdeal_field').getValue();
        var intension_developBuildrateIdeal = Ext.getCmp('intension_developBuildrateIdeal_field').getValue();
        var intension_developAssetIdeal = Ext.getCmp('intension_developAssetIdeal_field').getValue();
        var intension_developTaxIdeal = Ext.getCmp('intension_developTaxIdeal_field').getValue();
        var intension_developSumtaxIdeal = Ext.getCmp('intension_developSumtaxIdeal_field').getValue();

        var intension_mainSumratioIntension = mainGkccmj * (intension_mainSumratioIdeal - intension_mainBuildrateWeight) / intension_mainSumratioIdeal;
        var intension_mainBuildrateIntension = mainGkccmj * (intension_mainBuildrateIdeal - intension_mainSumratioWeight) / intension_mainBuildrateIdeal;
        var intension_mainAssetIntension = mainGkccmj * (intension_mainAssetIdeal - intension_mainAssetWeight) / intension_mainAssetIdeal;
        var intension_mainTaxIntension = mainGkccmj * (intension_mainTaxIdeal - intension_mainTaxWeight) / intension_mainTaxIdeal;
        var intension_mainSumtaxIntension = mainGkccmj * (intension_mainSumtaxIdeal - intension_mainSumtaxWeight) / intension_mainSumtaxIdeal;
        
        var intension_developSumratioIntension = devGkccmj * (intension_developSumratioIdeal - intension_developSumratioWeight) / intension_developSumratioIdeal;
        var intension_developBuildrateIntension = devGkccmj * (intension_developBuildrateIdeal - intension_developBuildrateWeight) / intension_developBuildrateIdeal;
        var intension_developAssetIntension = devGkccmj * (intension_developAssetIdeal - intension_developAssetWeight) / intension_developAssetIdeal;
        var intension_developTaxIntension = devGkccmj * (intension_developTaxIdeal - intension_developTaxWeight) / intension_developTaxIdeal;
        var intension_developSumtaxIntension = devGkccmj * (intension_developSumtaxIdeal - intension_developSumtaxWeight) / intension_developSumtaxIdeal;

        var kfqType = Ext.getCmp('intension_kfqType').getValue();

        Ext.getCmp('intension_mainSumratioIntension_field').setValue(intension_mainSumratioIntension.toFixed(2));
        Ext.getCmp('intension_mainBuildrateIntension_field').setValue(intension_mainBuildrateIntension.toFixed(2));
        Ext.getCmp('intension_mainAssetIntension_field').setValue(intension_mainAssetIntension.toFixed(2));
        Ext.getCmp('intension_mainTaxIntension_field').setValue(intension_mainTaxIntension.toFixed(2));
        
        if (kfqType.indexOf('工业') >= 0) {
            Ext.getCmp('intension_mainTaxIntension_field').setValue(intension_mainTaxIntension.toFixed(2));
        } else {
            Ext.getCmp('intension_mainSumtaxIntension_field').setValue(intension_mainSumtaxIntension.toFixed(2));
        }

        Ext.getCmp('intension_developSumratioIntension_field').setValue(intension_developSumratioIntension.toFixed(2));
        Ext.getCmp('intension_developBuildrateIntension_field').setValue(intension_developBuildrateIntension.toFixed(2));
        Ext.getCmp('intension_developAssetIntension_field').setValue(intension_developAssetIntension.toFixed(2));
        if (kfqType.indexOf('工业') >= 0) {
            Ext.getCmp('intension_developTaxIntension_field').setValue(intension_developTaxIntension.toFixed(2));
        } else {
            Ext.getCmp('intension_developSumtaxIntension_field').setValue(intension_developSumtaxIntension.toFixed(2));
        }
    }*/
});
