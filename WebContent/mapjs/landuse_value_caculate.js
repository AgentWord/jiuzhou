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

            var GYZSR = 'GYZSR';
            var GXZSR = 'GXZSR';
            var GXSSZE = 'GXSSZE';
            var GXYDMJ = 'GXYDMJ';

            var KFQJB = 'KFQJB';
            var KFQSPLX = 'KFQSPLX';
            var urlCombo = Ext.getCmp('survey_layerUrls_Combo');
            var url = urlCombo.getValue(); //取得url
            var m_store;
            var d_store;
            var store;

            //设置不可重复计算
            /*1.找到判断唯一值：开发区名称：宾西2013 
              2.获取grid/store中记录：record
              3。判断能否找到对应记录。

            */

            var kfqname = urlCombo.getRawValue();
            var selectStore = Ext.StoreMgr.get('landKfqTypeStore');
            var record = selectStore.findRecord('calcName', kfqname);
            if (record) {
                Ext.Msg.alert('提示', '[' + kfqname + ']数据已计算存入数据库，请勿重复计算。');
                return;
            }

            var queryTask = new QueryTask(url);
            var query = new Query();
            query.returnGeometry = false;
            query.outFields = [KFQJB, KFQSPLX, DLDM, GYDM, GXDM, KFQPJFW, DLMJ, JZMJ, JZJDMJ, JDZMJ, GDZCTZZE, GYSSZE, CZRK, ESCYSSZE, TDXZQK, GYZSR, GXZSR, GXSSZE, GXYDMJ];
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
                        { name: 'KFQJB', type: 'auto' },
                        { name: 'KFQSPLX', type: 'auto' },
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
                        { name: GYZSR, type: 'float' },
                        { name: GXZSR, type: 'float' },
                        { name: GXSSZE, type: 'float' },
                        { name: GXYDMJ, type: 'float' },

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
                        { name: 'KFQJB', type: 'auto' },
                        { name: 'KFQSPLX', type: 'auto' },
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
                        { name: GYZSR, type: 'float' },
                        { name: GXZSR, type: 'float' },
                        { name: GXSSZE, type: 'float' },
                        { name: GXYDMJ, type: 'float' },

                    ],
                    autoLoad: true
                });

                //主区计算
                //console.log(m_attrData);
                var m_records=m_store.findRecord('DLDM',"A");
            
                //================按照建设状况划分---------------------------------------  
                var kfqjb = m_records.get("KFQJB");
                var kfqsplx = m_records.get("KFQSPLX");
                var zmj = m_store.sum(DLMJ);
                //已建成城镇建设用地
                m_store.filter(DLDM, 'A');
                var A = m_store.sum(DLMJ); //已建成城镇建设用地面积
                console.log("已建成城镇建设用地面积：" + A);
                var zjzmj = m_store.sum(JZMJ); //总建筑面积（万平米）
                if (zjzmj > 10000)
                    zjzmj = zjzmj / 10000;
                var jzjdmj = m_store.sum(JZJDMJ); //建筑基地面积
                if (jzjdmj > 10000)
                    jzjdmj = jzjdmj / 10000;
                var gdzctzze = m_store.max(GDZCTZZE); //固定资产投资总额。
                var gyssze = m_store.max(GYSSZE); //工业用地地均税收总额。
                var escyssze = m_store.max(ESCYSSZE); //二三产业税收总额
                var czrk = m_store.max(CZRK); //常住人口
                var gyzsr = m_store.max(GYZSR);
                var gxzsr = m_store.max(GXZSR); //高新总收入
                var gxssze = m_store.max(GXSSZE); //高新税收总额
                var gxydmj = m_store.sum(GXYDMJ); //高新用地面积
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
                if (gkjzmj > 10000)
                    gkjzmj = gkjzmj / 10000;

                var gkjzjdmj = m_store.sum(JDZMJ); //工矿建筑基地面积
                if (gkjzjdmj > 10000)
                    gkjzjdmj = gkjzjdmj / 10000;
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
                m_store.filter(TDXZQK, '是');
                var G = m_store.sum(DLMJ); //闲置土地

                //一类高新技术产业用地
                m_store.clearFilter();
                m_store.filter(GXDM, 'H1');
                var H1 = m_store.sum(GXYDMJ); //一类高新技术产业用地

                //二类高新技术产业用地
                m_store.clearFilter();
                m_store.filter(GXDM, 'H2');
                var H2 = m_store.sum(GXYDMJ); //二类高新技术产业用地





                //发展方向区统计

                //================按照建设状况划分---------------------------------------  
                //已建成城镇建设用地
                var d_zmj = d_store.sum(DLMJ);
                d_store.filter(DLDM, 'A');
                var d_A = d_store.sum(DLMJ); //已建成城镇建设用地面积
                console.log("已建成城镇建设用地面积：" + d_A);
                var d_zjzmj = d_store.sum(JZMJ); //总建筑面积
                var d_jzjdmj = d_store.sum(JZJDMJ); //建筑基地面积
                var d_gdzctzze = d_store.max(GDZCTZZE); //固定资产投资总额。
                if (!d_gdzctzze)
                    d_gdzctzze = 0;
                var d_gyssze = d_store.max(GYSSZE); //工业用地地均税收总额。
                if (!d_gyssze)
                    d_gyssze = 0;
                var d_escyssze = d_store.max(ESCYSSZE); //二三产业税收总额
                if (!d_escyssze)
                    d_escyssze = 0;
                var d_czrk = d_store.max(CZRK); //常住人口
                var d_gyzsr = d_store.max(GYZSR);
                if (!d_gyzsr)
                    d_gyzsr = 0;
                var d_gxzsr = d_store.max(GXZSR); //高新总收入
                if (!d_gxzsr)
                    d_gxzsr = 0;
                var d_gxssze = d_store.max(GXSSZE); //高新税收总额
                if (!d_gxssze)
                    d_gxssze = 0;
                var d_gxydmj = d_store.sum(GXYDMJ); //高新用地面积
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
                d_store.filter(TDXZQK, '是');
                var d_G = d_store.sum(DLMJ); //闲置土地

                //一类高新技术产业用地
                d_store.clearFilter();
                d_store.filter(GXDM, 'H1');
                var d_H1 = d_store.sum(GXYDMJ); //一类高新技术产业用地

                //二类高新技术产业用地
                d_store.clearFilter();
                d_store.filter(GXDM, 'H2');
                var d_H2 = d_store.sum(GXYDMJ); //二类高新技术产业用地 


                //工矿仓储比例
                var gkccRate = A2 / A;
                //住宅比例
                var zzRate = A1 / A;
                console.log("住宅比例：" + zzRate);
                /* //赋值 
                  Ext.getCmp('survey_index_yjcczzmjText').setValue(A.toFixed(2));
                  Ext.getCmp('survey_index_gkccmjText').setValue(A2.toFixed(2));
                  Ext.getCmp('survey_index_gkccRateText').setValue(gkccRate.toFixed(2));
                  Ext.getCmp('survey_index_zzmjText').setValue(A1.toFixed(2));
                  Ext.getCmp('survey_index_zzmjRateText').setValue(zzRate.toFixed(2));   
                  */
                //计算地区工业类型
                var kfqType = "";
                var kfqArea = Ext.getCmp('survey_KfqArea_Combo').getRawValue();
                if (kfqArea.indexOf("保税") > -1 || kfqArea.indexOf("加工区") > -1) {
                    kfqType = '工业主导型开发区';
                    // return;
                }
                /*
                        var gkccRate = Ext.getCmp('survey_index_gkccRateText').getValue();
                        var zzRate = Ext.getCmp('survey_index_zzmjRateText').getValue();*/

                /* if (gkccRate == "") {
                     Ext.Msg.alert('提示', '请先计算现状值再计算开发区类型。');
                     return;
                 }*/

                if (gkccRate > 0.30 && zzRate < 0.25) {
                    kfqType = '工业主导型开发区';
                } else if (gkccRate <= 0.30 && zzRate >= 0.25) {
                    kfqType = '产城融合型开发区';
                } else {
                    kfqType = '其他类型开发区';
                }

                var A3 = A31 + A32;
                var A5 = A51 + A52;
                var B = B11 + B12 + B21 + B22;
                var B1 = B11 + B12;
                var B2 = B21 + B22;
                var C = C1 + C2 + C3;
                var D = D1 + D21 + D22;
                var D2 = D21 + D22;
                var E = E1 + E21 + E22;
                var E2 = E21 + E22;
                var H = H1 + H2;
                //增加字段及数据
                var ygdmj = A + B21; //已达到供地条件的土地面积
                var wgdmj = zmj - ygdmj - C; //未达到供地条件的土地面积


                var d_A3 = d_A31 + d_A32;
                var d_A5 = d_A51 + d_A52;
                var d_B = d_B11 + d_B12 + d_B21 + d_B22;
                var d_B1 = d_B11 + d_B12;
                var d_B2 = d_B21 + d_B22;
                var d_C = d_C1 + d_C2 + d_C3;
                var d_D = d_D1 + d_D21 + d_D22;
                var d_D2 = d_D21 + d_D22;
                var d_E = d_E1 + d_E21 + d_E22;
                var d_E2 = d_E21 + d_E22;
                var d_H = d_H1 + d_H2;
                var d_ygdmj = d_A + d_B21; //已达到供地条件的土地面积
                var d_wgdmj = d_zmj - d_ygdmj - d_C; //未达到供地条件的土地面积



                console.log("进入计算模块");
                console.log('已达到供地条件的土地面积' + wgdmj);
                console.log("开发区级别" + kfqjb);
               /* if (!kfqType == '') {*/
                    //form 表单的选择

                    
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


                        //赋值计算


                    } else {
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
                        var cc_zhdjss = escyssze / A2;

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
                        var cc_d_zhdjss = d_escyssze / d_A2;

                        //人口密度
                        var cc_d_rkmd = d_czrk / d_A;
                        //土地闲置率
                        var cc_d_tdxzRate = (G / d_D) * 100;


                    }

                    //form表单提交数据
                    var form = new Ext.form.Panel({
                        frame: true,
                        xtype: 'form',
                        id: 'addValueForm',
                        jsonSubmit: true,
                        defaults: {
                            xtype: "textfield",
                            width: 180
                        },
                        items: [

                            { name: "calcName", value: urlCombo.getRawValue() },
                            { name: "kfqjb", value: kfqjb },
                            { name: "kfqsplx", value: kfqsplx },

                            { name: "kfqType", value: kfqType },
                            { name: "jcczzmj", value: A.toFixed(2) },
                            { name: "gkcczmj", value: A2.toFixed(2) },
                            { name: "zzzmj", value: A1.toFixed(2) },
                            { name: "gkccRate", value: gkccRate.toFixed(2) },
                            { name: "zzRate", value: zzRate.toFixed(5) },
                            { name: "ma", value: A.toFixed(2) },
                            { name: "ma1", value: A1.toFixed(2) },
                            { name: "ma2", value: A2.toFixed(2) },
                            { name: "ma3", value: A3.toFixed(2) },
                            { name: "ma31", value: A31.toFixed(2) },
                            { name: "ma32", value: A32.toFixed(2) },
                            { name: "ma4", value: A4.toFixed(2) },
                            { name: "ma5", value: A5.toFixed(2) },
                            { name: "ma51", value: A51.toFixed(2) },
                            { name: "ma52", value: A52.toFixed(2) },
                            { name: "mb", value: B.toFixed(2) },

                            { name: "mb1", value: B1.toFixed(2) },
                            { name: "mb11", value: B11.toFixed(2) },
                            { name: "mb12", value: B12.toFixed(2) },
                            { name: "mb2", value: B2.toFixed(2) },
                            { name: "mb21", value: B21.toFixed(2) },
                            { name: "mb22", value: B22.toFixed(2) },
                            { name: "mc", value: C.toFixed(2) },
                            { name: "mc1", value: C1.toFixed(2) },
                            { name: "mc2", value: C2.toFixed(2) },
                            { name: "mc3", value: C3.toFixed(2) },
                            { name: "md", value: D.toFixed(2) },
                            { name: "md1", value: D1.toFixed(2) },
                            { name: "md2", value: D2.toFixed(2) },
                            { name: "md21", value: D21.toFixed(2) },
                            { name: "md22", value: D22.toFixed(2) },
                            { name: "me", value: E.toFixed(2) },
                            { name: "me1", value: E1.toFixed(2) },
                            { name: "me2", value: E2.toFixed(2) },
                            { name: "me21", value: E21.toFixed(2) },
                            { name: "me22", value: E22.toFixed(2) },
                            { name: "mf", value: F.toFixed(2) },
                            { name: "mg", value: G.toFixed(2) },
                            { name: "mh", value: H.toFixed(2) },
                            { name: "mh1", value: H1.toFixed(2) },
                            { name: "mh2", value: H2.toFixed(2) },
                            { name: "mzjzmj", value: zjzmj.toFixed(2) },
                            { name: "mgkjzzmj", value: gkjzmj.toFixed(2) },
                            { name: "mjzjdzmj", value: jzjdmj.toFixed(2) },
                            { name: "mgkjdzmj", value: gkjzjdmj.toFixed(2) },

                            { name: "mygdmj", value: ygdmj.toFixed(2) },
                            { name: "mwgdmj", value: wgdmj.toFixed(2) },

                            { name: "mgdzctzze", value: gdzctzze.toFixed(2) },
                            { name: "mescyssze", value: escyssze.toFixed(2) },
                            { name: "mgyzsr", value: gyzsr.toFixed(2) },
                            { name: "mgyssze", value: gyssze.toFixed(2) },
                            { name: "mgxzsr", value: gxzsr.toFixed(2) },
                            { name: "mgxssze", value: gxssze.toFixed(2) },

                            { name: "da", value: d_A.toFixed(2) },
                            { name: "da1", value: d_A1.toFixed(2) },
                            { name: "da2", value: d_A2.toFixed(2) },
                            { name: "da3", value: d_A3.toFixed(2) },
                            { name: "da31", value: d_A31.toFixed(2) },
                            { name: "da32", value: d_A32.toFixed(2) },
                            { name: "da4", value: d_A4.toFixed(2) },
                            { name: "da5", value: d_A5.toFixed(2) },
                            { name: "da51", value: d_A51.toFixed(2) },
                            { name: "da52", value: d_A52.toFixed(2) },
                            { name: "db", value: d_B.toFixed(2) },

                            { name: "db1", value: d_B1.toFixed(2) },
                            { name: "db11", value: d_B11.toFixed(2) },
                            { name: "db12", value: d_B12.toFixed(2) },
                            { name: "db2", value: d_B21.toFixed(2) },
                            { name: "db21", value: d_B21.toFixed(2) },
                            { name: "db22", value: d_B22.toFixed(2) },
                            { name: "dc", value: d_C.toFixed(2) },
                            { name: "dc1", value: d_C1.toFixed(2) },
                            { name: "dc2", value: d_C2.toFixed(2) },
                            { name: "dc3", value: d_C3.toFixed(2) },
                            { name: "dd", value: d_D.toFixed(2) },
                            { name: "dd1", value: d_D1.toFixed(2) },
                            { name: "dd2", value: d_D2.toFixed(2) },
                            { name: "dd21", value: d_D21.toFixed(2) },
                            { name: "dd22", value: d_D22.toFixed(2) },
                            { name: "de", value: d_E.toFixed(2) },
                            { name: "de1", value: d_E1.toFixed(2) },
                            { name: "de2", value: d_E2.toFixed(2) },
                            { name: "de21", value: d_E21.toFixed(2) },
                            { name: "de22", value: d_E22.toFixed(2) },
                            { name: "df", value: d_F.toFixed(2) },
                            { name: "dg", value: d_G.toFixed(2) },
                            { name: "dh", value: d_H.toFixed(2) },
                            { name: "dh1", value: d_H1.toFixed(2) },
                            { name: "dh2", value: d_H2.toFixed(2) },
                            { name: "dzjzmj", value: d_zjzmj.toFixed(2) },
                            { name: "dgkjzzmj", value: d_gkjzmj.toFixed(2) },
                            { name: "djzjdzmj", value: d_jzjdmj.toFixed(2) },
                            { name: "dgkjdzmj", value: d_gkjzjdmj.toFixed(2) },
                            { name: "dygdmj", value: d_ygdmj.toFixed(2) },
                            { name: "dwgdmj", value: d_wgdmj.toFixed(2) },
                            { name: "dgdzctzze", value: d_gdzctzze.toFixed(2) },
                            { name: "descyssze", value: d_escyssze.toFixed(2) },
                            { name: "dgyzsr", value: d_gyzsr.toFixed(2) },
                            { name: "dgyssze", value: d_gyssze.toFixed(2) },
                            { name: "dgxzsr", value: d_gxzsr.toFixed(2) },
                            { name: "dgxssze", value: d_gxssze.toFixed(2) }

                        ],

                    });
                    var myForm = Ext.getCmp('addValueForm').getForm();
                    myForm.submit({
                        url: 'add_landKfqType',
                        success: function(form, action) {
                            // Ext.Msg.alert('成功', '内容添加成功。');
                            Ext.Msg.alert('成功', '内容添加完成！');

                            console.log("添加成功");
                            var mystore = Ext.StoreMgr.get('landKfqTypeStore'); //获得store对象

                            mystore.reload();
                            /*var grid = Ext.getCmp('landuseValueGird');
                            grid.reconfigure(mystore);*/


                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('失败', '内容添加失败，请重试。');
                            //return;
                        }
                    });


                }


            });
