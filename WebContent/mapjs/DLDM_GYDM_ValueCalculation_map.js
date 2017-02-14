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

    var DLMJ = 'DLMJ';
    var DLDM = 'DLDM';
    var GYDM = 'GYDM';
    var GXDM = 'GXDM';
    var JZMJ = 'JZMJ';
    var JZJDMJ = 'JZJDMJ'; //建筑基地面积
    var JDZMJ = 'JDZMJ';
    var GDZCTZZE = 'GDZCTZZE'; //固定资产投资总额
    var GYSSZE = 'GYSSZE'; //工业税收总额
    var TDXZQK = 'TDXZQK'; //土地闲置情况（未建成条件下）
    var KFQPJFW = 'KFQPJFW';
    var CZRK = 'CZRK';
    var ESCYSSZE = 'ESCYSSZE';
    var isFinish = false;


    var urlCombo = Ext.getCmp('survey_layerUrls_Combo1');
    var url = urlCombo.getValue(); //取得url
    var m_store;
    var d_store;
    var store;
    var kfqname = urlCombo.getRawValue();
    var selectStore = Ext.StoreMgr.get('landIndexValueStore');
    var record = selectStore.findRecord('kfqName', kfqname);
    if (record) {
        Ext.Msg.confirm('提示', '[' + kfqname + ']数据已进行指标值计算是否重新计算？', getResult);

    } else
        getResult("yes");

    function getResult(confirm) {
        if (confirm == "no")
            return;
        else {

            var queryTask = new QueryTask(url);
            var query = new Query();
            query.returnGeometry = false;
            query.outFields = [DLDM, GYDM, GXDM, KFQPJFW, DLMJ, JZMJ, JZJDMJ, JDZMJ, GDZCTZZE, GYSSZE, CZRK, ESCYSSZE, TDXZQK];
            query.where = "1=1";
            queryTask.execute(query, showResult);


            function showResult(results) {
                if (!results.features) {
                    return;
                }
                var m_attrData = [];
                var d_attrData = [];
                var resultCount = results.features.length;
                console.log("总记录数：" + resultCount);
                for (var i = 0; i < resultCount; i++) {

                    var featureAttributes = results.features[i].attributes;
                    var m_record = [];
                    var d_record = [];
                    for (var attr in featureAttributes) {
                        if (featureAttributes["KFQPJFW"] == "主区")
                            m_record.push(featureAttributes[attr]);
                        else
                            d_record.push(featureAttributes[attr]);

                    }
                    m_attrData.push(m_record);
                    d_attrData.push(d_record);
                }

                m_store = Ext.create('Ext.data.ArrayStore', {
                    // store configs
                    storeId: 'mym_store',
                    //data
                    data: m_attrData,
                    // reader configs
                    fields: [
                        { name: 'DLDM', type: 'auto' },
                        { name: 'GYDM', type: 'auto' },
                        { name: 'GXDM', type: 'auto' },
                        { name: 'KFQPJFW', type: 'auto' },
                        { name: 'DLMJ', type: 'float' },
                        { name: 'JZMJ', type: 'float' },
                        { name: 'JZJDMJ', type: 'float' },
                        { name: 'JDZMJ', type: 'float' },
                        { name: 'GDZCTZZE', type: 'float' },
                        { name: 'GYSSZE', type: 'float' },
                        { name: 'CZRK', type: 'auto' },
                        { name: 'ESCYSSZE', type: 'float' },
                        { name: 'TDXZQK', type: 'auto' },

                    ],
                    autoLoad: true
                });
                d_store = Ext.create('Ext.data.ArrayStore', {
                    // store configs
                    storeId: 'myd_store',
                    //data
                    data: d_attrData,
                    // reader configs
                    fields: [
                        { name: 'DLDM', type: 'auto' },
                        { name: 'GYDM', type: 'auto' },
                        { name: 'GXDM', type: 'auto' },
                        { name: 'KFQPJFW', type: 'auto' },
                        { name: 'DLMJ', type: 'float' },
                        { name: 'JZMJ', type: 'float' },
                        { name: 'JZJDMJ', type: 'float' },
                        { name: 'JDZMJ', type: 'float' },
                        { name: 'GDZCTZZE', type: 'float' },
                        { name: 'GYSSZE', type: 'float' },
                        { name: 'CZRK', type: 'auto' },
                        { name: 'ESCYSSZE', type: 'float' },
                        { name: 'TDXZQK', type: 'auto' },

                    ],
                    autoLoad: true
                });

                //主区计算

                //================按照建设状况划分---------------------------------------  
                //已建成城镇建设用地
                m_store.filter(DLDM, 'A');
                var A = m_store.sum(DLMJ); //已建成城镇建设用地面积
                console.log("已建成城镇建设用地面积：" + A);
                var zjzmj = m_store.sum(JZMJ); //总建筑面积（万平米）
                var jzjdmj = m_store.sum(JZJDMJ); //建筑基地面积
                var gdzctzze = m_store.max(GDZCTZZE); //固定资产投资总额。
                var gyssze = m_store.max(GYSSZE); //工业用地地均税收总额。
                var escyssze = m_store.max(ESCYSSZE); //二三产业税收总额
                var czrk = m_store.max(CZRK); //常住人口
                console.log("总建筑面积：" + zjzmj + "；建筑基地面积：" + jzjdmj + ";固定资产投资总额=" + gdzctzze + "工业用地地均税收总额=" + gyssze);
                //住宅用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A1');
                var A1 = m_store.sum(DLMJ); //住宅用地

                //工矿仓储用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A2');
                var A2 = m_store.sum(DLMJ); //工矿仓储用地
                var gkjzmj = m_store.sum(JZMJ); //工矿建筑面积
                var gkjzjdmj = m_store.sum(JDZMJ); //工矿建筑基地面积
                console.log("工矿建筑面积：" + gkjzmj + "工矿建筑基地面积：" + gkjzjdmj + "工矿仓储面积" + A2);

                //街巷用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A31');
                var A31 = m_store.sum(DLMJ); //街巷用地

                //其他交通运输用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A32');
                var A32 = m_store.sum(DLMJ); //其他交通运输用地

                //商服用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A4');
                var A4 = m_store.sum(DLMJ); //商服用地

                //公园与绿地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A51');
                var A51 = m_store.sum(DLMJ); //公园与绿地

                //其他公共管理与 公共服务用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A52');
                var A52 = m_store.sum(DLMJ); //其他公共管理与 公共服务用地

                //其他城镇建设用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'A6');
                var A6 = m_store.sum(DLMJ); //其他城镇建设用地

                //已建成农村工矿仓储用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'B11');
                var B11 = m_store.sum(DLMJ); //已建成农村工矿仓储用地

                //其他已建成农村建设用地
                m_store.clearFilter();
                m_store.filter(DLDM, 'B12');
                var B12 = m_store.sum(DLMJ); //其他已建成农村建设用地

                //已达到供地条件的 其他土地
                m_store.clearFilter();
                m_store.filter(DLDM, 'B21');
                var B21 = m_store.sum(DLMJ); //已达到供地条件的 其他土地  

                //未达到供地条件的 其他土地
                m_store.clearFilter();
                m_store.filter(DLDM, 'B22');
                var B22 = m_store.sum(DLMJ); //未达到供地条件的 其他土地

                //河湖及其蓄滞洪区土地
                m_store.clearFilter();
                m_store.filter(DLDM, 'C1');
                var C1 = m_store.sum(DLMJ); //河湖及其蓄滞洪区土地

                //自然、生态保护区土地
                m_store.clearFilter();
                m_store.filter(DLDM, 'C2');
                var C2 = m_store.sum(DLMJ); //自然、生态保护区土地

                //其他不可建设土地
                m_store.clearFilter();
                m_store.filter(DLDM, 'C3');
                var C3 = m_store.sum(DLMJ); //其他不可建设土地
                //================按照供应类型划分--------------------------------------- 
                //划拨土地
                m_store.clearFilter();
                m_store.filter(GYDM, 'D1');
                var D1 = m_store.sum(DLMJ); //划拨土地

                //有偿使用且未到期土地
                m_store.clearFilter();
                m_store.filter(GYDM, 'D21');
                var D21 = m_store.sum(DLMJ); //有偿使用且未到期土地

                //有偿使用且已到期但未处置土地
                m_store.clearFilter();
                m_store.filter(GYDM, 'D22');
                var D22 = m_store.sum(DLMJ); //有偿使用且已到期但未处置土地

                //尚可划拨土地
                m_store.clearFilter();
                m_store.filter(GYDM, 'E1');
                var E1 = m_store.sum(DLMJ); //尚可划拨土地

                //尚可供应工矿仓储用地
                m_store.clearFilter();
                m_store.filter(GYDM, 'E21');
                var E21 = m_store.sum(DLMJ); //尚可供应工矿仓储用地

                //其他尚可有偿使用土地
                m_store.clearFilter();
                m_store.filter(GYDM, 'E22');
                var E22 = m_store.sum(DLMJ); //其他尚可有偿使用土地

                //不可供应土地
                m_store.clearFilter();
                m_store.filter(GYDM, 'F');
                var F = m_store.sum(DLMJ); //不可供应土地

                //闲置土地
                m_store.clearFilter();
                m_store.filter(DLDM, 'G');
                var G = m_store.sum(DLMJ); //闲置土地

                //一类高新技术产业用地
                m_store.clearFilter();
                m_store.filter(GXDM, 'H1');
                var H1 = m_store.sum(DLMJ); //一类高新技术产业用地

                //二类高新技术产业用地
                m_store.clearFilter();
                m_store.filter(GXDM, 'H2');
                var H2 = m_store.sum(DLMJ); //二类高新技术产业用地





                //发展方向区统计

                //================按照建设状况划分---------------------------------------  
                //已建成城镇建设用地
                d_store.filter(DLDM, 'A');
                var d_A = d_store.sum(DLMJ); //已建成城镇建设用地面积
                console.log("已建成城镇建设用地面积：" + d_A);
                var d_zjzmj = d_store.sum(JZMJ); //总建筑面积
                var d_jzjdmj = d_store.sum(JZJDMJ); //建筑基地面积
                var d_gdzctzze = d_store.max(GDZCTZZE); //固定资产投资总额。
                var d_gyssze = d_store.max(GYSSZE); //工业用地地均税收总额。
                var d_escyssze = d_store.max(ESCYSSZE); //二三产业税收总额
                var d_czrk = d_store.max(CZRK); //常住人口
                //住宅用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A1');
                var d_A1 = d_store.sum(DLMJ); //住宅用地

                //工矿仓储用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A2');
                var d_A2 = d_store.sum(DLMJ); //工矿仓储用地
                var d_gkjzmj = d_store.sum(JZMJ); //工矿建筑面积
                var d_gkjzjdmj = d_store.sum(JDZMJ); //工矿建筑基地面积
                //街巷用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A31');
                var d_A31 = d_store.sum(DLMJ); //街巷用地

                //其他交通运输用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A32');
                var d_A32 = d_store.sum(DLMJ); //其他交通运输用地

                //商服用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A4');
                var d_A4 = d_store.sum(DLMJ); //商服用地

                //公园与绿地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A51');
                var d_A51 = d_store.sum(DLMJ); //公园与绿地

                //其他公共管理与 公共服务用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A52');
                var d_A52 = d_store.sum(DLMJ); //其他公共管理与 公共服务用地

                //其他城镇建设用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'A6');
                var d_A6 = d_store.sum(DLMJ); //其他城镇建设用地

                //已建成农村工矿仓储用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'B11');
                var d_B11 = d_store.sum(DLMJ); //已建成农村工矿仓储用地

                //其他已建成农村建设用地
                d_store.clearFilter();
                d_store.filter(DLDM, 'B12');
                var d_B12 = d_store.sum(DLMJ); //其他已建成农村建设用地

                //已达到供地条件的 其他土地
                d_store.clearFilter();
                d_store.filter(DLDM, 'B21');
                var d_B21 = d_store.sum(DLMJ); //已达到供地条件的 其他土地  

                //未达到供地条件的 其他土地
                d_store.clearFilter();
                d_store.filter(DLDM, 'B22');
                var d_B22 = d_store.sum(DLMJ); //未达到供地条件的 其他土地

                //河湖及其蓄滞洪区土地
                d_store.clearFilter();
                d_store.filter(DLDM, 'C1');
                var d_C1 = d_store.sum(DLMJ); //河湖及其蓄滞洪区土地

                //自然、生态保护区土地
                d_store.clearFilter();
                d_store.filter(DLDM, 'C2');
                var d_C2 = d_store.sum(DLMJ); //自然、生态保护区土地

                //其他不可建设土地
                d_store.clearFilter();
                d_store.filter(DLDM, 'C3');
                var d_C3 = d_store.sum(DLMJ); //其他不可建设土地
                //================按照供应类型划分--------------------------------------- 
                //划拨土地
                d_store.clearFilter();
                d_store.filter(GYDM, 'D1');
                var d_D1 = d_store.sum(DLMJ); //划拨土地

                //有偿使用且未到期土地
                d_store.clearFilter();
                d_store.filter(GYDM, 'D21');
                var d_D21 = d_store.sum(DLMJ); //有偿使用且未到期土地

                //有偿使用且已到期但未处置土地
                d_store.clearFilter();
                d_store.filter(GYDM, 'D22');
                var d_D22 = d_store.sum(DLMJ); //有偿使用且已到期但未处置土地

                //尚可划拨土地
                d_store.clearFilter();
                d_store.filter(GYDM, 'E1');
                var d_E1 = d_store.sum(DLMJ); //尚可划拨土地

                //尚可供应工矿仓储用地
                d_store.clearFilter();
                d_store.filter(GYDM, 'E21');
                var d_E21 = d_store.sum(DLMJ); //尚可供应工矿仓储用地

                //其他尚可有偿使用土地
                d_store.clearFilter();
                d_store.filter(GYDM, 'E22');
                var d_E22 = d_store.sum(DLMJ); //其他尚可有偿使用土地

                //不可供应土地
                d_store.clearFilter();
                d_store.filter(GYDM, 'F');
                var d_F = d_store.sum(DLMJ); //不可供应土地

                //闲置土地
                d_store.clearFilter();
                d_store.filter(DLDM, 'G');
                var d_G = d_store.sum(DLMJ); //闲置土地

                //一类高新技术产业用地
                d_store.clearFilter();
                d_store.filter(GXDM, 'H1');
                var d_H1 = d_store.sum(DLMJ); //一类高新技术产业用地

                //二类高新技术产业用地
                d_store.clearFilter();
                d_store.filter(GXDM, 'H2');
                var d_H2 = d_store.sum(DLMJ); //二类高新技术产业用地 

                //工矿仓储比例
                var gkccRate = A2 / A;
                //住宅比例
                var zzRate = A1 / A;

                //计算地区工业类型
                var kfqType = Ext.getCmp('intensity_index_kfqType');
                var kfqArea = Ext.getCmp('survey_KfqArea_Combo1').getRawValue();
                if (kfqArea.indexOf("保税") > -1 || kfqArea.indexOf("加工区") > -1) {
                    kfqType.setValue('工业主导型开发区');
                    // return;
                }

                if (gkccRate > 0.30 && zzRate < 0.25) {
                    kfqType.setValue('工业主导型开发区');
                } else if (gkccRate <= 0.30 && zzRate >= 0.25) {
                    kfqType.setValue('产城融合型开发区');
                } else {
                    kfqType.setValue('其他类型开发区');
                }

                var B = B11 + B12 + B21 + B22;
                var D = D1 + D21 + D22;
                var E = E1 + E21 + E22;

                var d_B = d_B11 + d_B12 + d_B21 + d_B22;
                var d_D = d_D1 + d_D21 + d_D22;
                var d_E = d_E1 + d_E21 + d_E22;
                console.log("进入计算模块");
                if (kfqType.getValue() == '工业主导型开发区') {
                    //form 表单的选择

                    Ext.getCmp('intensity_index_tabPanel').setActiveTab('indensity_index_industryTab');
                    //指标现状值的计算         主区      
                    //
                    console.log("进入工业计算模块");
                    //土地供应率
                    var tdgyRate = (D / (A + B21)) * 100;

                    //土地建成率
                    var tdjcRate = (A / D) * 100;
                    //工业用地率
                    var gyydRate = gkccRate * 100;
                    //综合容积率
                    var zhrjRate = zjzmj / A;
                    if (zhrjRate > 100)
                        zhrjRate = zhrjRate / 10000;
                    //建筑密度
                    var jzmd = (jzjdmj / A) * 100;
                    if (jzmd > 100)
                        jzmd = jzmd / 10000;
                    //工业用地综合容积率
                    var gyydzhrjRate = gkjzmj / A2;
                    if (gyydzhrjRate > 100)
                        gyydzhrjRate = gyydzhrjRate / 10000;
                    //工业用地建筑系数
                    var gyydjzxs = (gkjzjdmj / A2) * 100;
                    if (gyydjzxs > 100)
                        gyydjzxs = gyydjzxs / 10000;
                    //固定资产投资强度
                    var gdzctzqd = gdzctzze / A2;
                    //工业用地地均税收
                    var gyyddjss = gyssze / A2;
                    //土地闲置率
                    var tdxzRate = (G / D) * 100;

                    console.log("土地闲置率=" + tdxzRate);

                    //指标现状值的计算         发展方向区
                    if (d_A != 0) {
                        //土地开发率
                        var tdkfRate = ((d_A + d_B21) / (d_A + d_B)) * 100;
                        console.log("土地开发率=" + tdkfRate);
                        //工业用地率
                        var d_gyydRate = (d_A2 / d_A) * 100;
                        //综合容积率
                        var d_zhrjRate = d_zjzmj / d_A;
                        if (d_zhrjRate > 100)
                            d_zhrjRate = d_zhrjRate / 10000;
                        //建筑密度
                        var d_jzmd = (d_jzjdmj / d_A) * 100;
                        if (d_jzmd > 100)
                            d_jzmd = d_jzmd / 10000;
                        //工业用地综合容积率
                        var d_gyydzhrjRate = d_gkjzmj / d_A2;
                        if (d_gyydzhrjRate > 100)
                            d_gyydzhrjRate = d_gyydzhrjRate / 10000;
                        //工业用地建筑系数
                        var d_gyydjzxs = (d_gkjzjdmj / d_A2) * 100;
                        if (d_gyydjzxs > 100)
                            d_gyydjzxs = d_gyydjzxs / 10000;
                        //固定资产投资强度
                        var d_gdzctzqd = d_gdzctzze / d_A2;
                        //工业用地地均税收
                        var d_gyyddjss = d_gyssze / d_A2;
                        //土地闲置率
                        var d_tdxzRate = (G / d_D) * 100;
                    }

                    //赋值计算

                    Ext.getCmp('projectId').setValue("");
                    Ext.getCmp('intensity_standard_markTypeIndustryFormText1').setValue("指标值汇总");
                    Ext.getCmp('intensity_standard_kfqNameIndustryFormText1').setValue(urlCombo.getRawValue());
                    Ext.getCmp('intensity_standard_kfqTypeIndustryFormText1').setValue(kfqType.getValue());

                    Ext.getCmp('mainLanduseDegreeSupply').setValue(tdgyRate);
                    Ext.getCmp('mainLanduseDegreeBuild').setValue(tdjcRate);
                    Ext.getCmp('mainLanduseConstructIndustry').setValue(gyydRate);
                    Ext.getCmp('mainLanduseIntensityRatio').setValue(zhrjRate);
                    Ext.getCmp('mainLanduseIntensityDensity').setValue(jzmd);
                    Ext.getCmp('mainLanduseIntensitySumratio').setValue(gyydzhrjRate);
                    Ext.getCmp('mainLanduseIntensityBuildindex').setValue(gyydjzxs);
                    Ext.getCmp('mainBenefitInexportAssets').setValue(gdzctzqd);
                    Ext.getCmp('mainBenefitInexportTax').setValue(gyyddjss);
                    Ext.getCmp('mainPerformanceManageIdle').setValue(tdxzRate);

                    Ext.getCmp('developLanduseDegreeDevratio').setValue(tdkfRate);
                    Ext.getCmp('developLanduseConstructIndustry').setValue(d_gyydRate);
                    Ext.getCmp('developLanduseIntensityRatio').setValue(d_zhrjRate);
                    Ext.getCmp('developLanduseIntensityDensity').setValue(d_jzmd);
                    Ext.getCmp('developLanduseIntensitySumratio').setValue(d_gyydzhrjRate);
                    Ext.getCmp('developLanduseIntensityBuildindex').setValue(d_gyydjzxs);
                    Ext.getCmp('developBenefitInexportAssets').setValue(d_gdzctzqd);
                    Ext.getCmp('developBenefitInexportTax').setValue(d_gyyddjss);
                    Ext.getCmp('developPerformanceManageIdle').setValue(d_tdxzRate);

                    isFinish = true;

                } else {
                    Ext.getCmp('intensity_index_tabPanel').setActiveTab('indensity_index_cityTab');
                    //指标现状值的计算         主区      
                    console.log("进入产城融合计算模块");

                    //土地供应率
                    var cc_tdgyRate = (D / (A + B21)) * 100;
                    //土地建成率
                    var cc_tdjcRate = (A / D) * 100;

                    //综合容积率
                    var cc_zhrjRate = zjzmj / A;
                    if (cc_zhrjRate > 100)
                        cc_zhrjRate = cc_zhrjRate / 10000;
                    //建筑密度
                    var cc_jzmd = (jzjdmj / A) * 100;
                    if (cc_jzmd > 100)
                        cc_jzmd = cc_jzmd / 10000;

                    //综合地均税收
                    var cc_zhdjss = escyssze / A;
                    console.log(cc_zhdjss);
                    //人口密度
                    var cc_rkmd = czrk / A;
                    //土地闲置率
                    var cc_tdxzRate = (G / D) * 100;


                    //指标现状值的计算         发展方向区


                    //土地开发率
                    var cc_tdkfRate = ((d_A + d_B21) / (d_A + d_B)) * 100;


                    //综合容积率
                    var cc_d_zhrjRate = d_zjzmj / d_A;
                    if (cc_d_zhrjRate > 100)
                        cc_d_zhrjRate = cc_d_zhrjRate / 10000;
                    //建筑密度
                    var cc_d_jzmd = (d_jzjdmj / d_A) * 100;
                    if (cc_d_jzmd > 100)
                        cc_d_jzmd = cc_d_jzmd / 10000;
                    //综合地均税收
                    var cc_d_zhdjss = d_escyssze / d_A;

                    //人口密度
                    var cc_d_rkmd = d_czrk / d_A;
                    //土地闲置率
                    var cc_d_tdxzRate = (G / d_D) * 100;

                    //赋值计算

                    Ext.getCmp('ccprojectId').setValue("");
                    Ext.getCmp('intensity_standard_markTypeCityFormText1').setValue("指标值汇总");
                    Ext.getCmp('intensity_standard_kfqNameCityFormText1').setValue(urlCombo.getRawValue());
                    Ext.getCmp('intensity_standard_kfqTypeCityFormText1').setValue(kfqType.getValue());

                    Ext.getCmp('ccmainLanduseDegreeSupply').setValue(cc_tdgyRate);
                    Ext.getCmp('ccmainLanduseDegreeBuild').setValue(cc_tdjcRate);

                    Ext.getCmp('ccmainLanduseIntensityRatio').setValue(cc_zhrjRate);
                    Ext.getCmp('ccmainLanduseIntensityDensity').setValue(cc_jzmd);
                    Ext.getCmp('ccmainBenefitInexportTax').setValue(cc_zhdjss);
                    Ext.getCmp('ccmainBenefitInexportPopulation').setValue(cc_rkmd);
                    Ext.getCmp('ccmainPerformanceManageIdle').setValue(cc_tdxzRate);

                    Ext.getCmp('ccdevelopLanduseDegreeDevratio').setValue(cc_tdkfRate);
                    Ext.getCmp('ccdevelopLanduseIntensityRatio').setValue(cc_d_zhrjRate);
                    Ext.getCmp('ccdevelopLanduseIntensityDensity').setValue(cc_d_jzmd);
                    Ext.getCmp('ccdevelopBenefitInexportTax').setValue(cc_d_zhdjss);
                    Ext.getCmp('ccdevelopBenefitInexportPopulation').setValue(cc_d_rkmd);
                    Ext.getCmp('ccdevelopPerformanceManageIdle').setValue(cc_d_tdxzRate);
                    isFinish = true;

                }

                if (isFinish) {
                    console.log("计算完毕！");
                    var combo = Ext.getCmp('survey_layerUrls_Combo1');
                    var value = combo.getValue();
                    //var rawValue = combo.getRawValue();
                    if (!value) {
                        Ext.Msg.alert('提示', '请先选择开发区再进行指标现状值计算。');
                        return;
                    }

                    //获取Form
                    var formId;
                    var activeTabId = Ext.getCmp('intensity_index_tabPanel').getActiveTab().getId();
                    if (activeTabId.indexOf('industry') >= 0) {
                        console.log(activeTabId);
                        formId = 'intensity_standard_industryForm1';
                    } else {
                        formId = 'intensity_standard_cityForm1';
                    }
                    var form = Ext.getCmp(formId).getForm();

                    //保存数据
                    if (form.isValid()) {

                        form.submit({
                            waitMsg: '正在保存数据，请稍候。',
                            waitTitle: '提示',
                            url: 'add_indexWeight',
                            success: function(form, action) {
                                Ext.Msg.alert('成功', '指标现状值结果保存成功。');
                                //form.reset();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('失败', '记录保存失败，请重试。');
                            }
                        });
                    } else {
                        Ext.Msg.alert('注意', '填写的信息有误，请检查！');
                    }

                }

            }

            /*function save() {
                //判断是否选择combo
                var combo = Ext.getCmp('survey_layerUrls_Combo1');
                var value = combo.getValue();
                //var rawValue = combo.getRawValue();
                if (!value) {
                    Ext.Msg.alert('提示', '请先选择开发区再进行指标现状值计算。');
                    return;
                }

                //获取Form
                var formId;
                var activeTabId = Ext.getCmp('intensity_index_tabPanel').getActiveTab().getId();
                if (activeTabId.indexOf('industry') >= 0) {
                    console.log(activeTabId);
                    formId = 'intensity_standard_industryForm1';
                } else {
                    formId = 'intensity_standard_cityForm1';
                }
                var form = Ext.getCmp(formId).getForm();

                //保存数据
                if (form.isValid()) {

                    form.submit({
                        //aitMsg: '正在保存数据，请稍候。',
                        //waitTitle: '提示',
                        url: 'add_indexWeight',
                        success: function(form, action) {
                            Ext.Msg.alert('成功', '指标现状值结果保存成功。');
                           // form.reset();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('失败', '记录保存失败，请重试。');
                        }
                    });
                } else {
                    Ext.Msg.alert('注意', '填写的信息有误，请检查！');
                }*/
        }
    }


});
