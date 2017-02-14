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



    var urlCombo = Ext.getCmp('survey_layerUrls_Combo5');
    var url = urlCombo.getValue(); //取得url
    var mapYear = urlCombo.getRawValue();
    var kfqname = Ext.getCmp('survey_KfqArea_Combo5').getRawValue();
    var selectStore = Ext.StoreMgr.get('zd_infoStore');
    var record = selectStore.findRecord('kfqmc', kfqname);
    if (record) {
        Ext.Msg.alert('提示', '[' + kfqname + ']数据已存入数据库，请勿重复导入。');
        return;
    }
    var queryTask = new QueryTask(url);
    console.log(url);
    var query = new Query();
    query.returnGeometry = false;
    query.outFields = ["MBBSM", "YSDM","KFQDM", "KFQMC", "KFQPJFW","KFQPJLX", "TBBH","DLMC", "DLDM","DLMJ", "QS","GYSJ", "GYLX","GYDM", "TDZPG", "SYNX","TDSYZ","PZYT","PZDM","GHYT", "GHDM","GHJZMJ", "GHJDMJ", "GHRJL", "GHJZMD","BZ", "RDYJ","DLMC1", "DLDM1","DLMJ1", "DLMC2", "DLDM2","DLMJ2","JDZMJ", "GXLB","GXDM","GXYDMJ","GXZSBL", "GXSR",'GXSS',"JZMJ", "JZJDMJ"]
    query.where = "1=1"; //"ESSSZE", 
    queryTask.execute(query, showResult);



function showResult(results) {
    var attrData = [];
    var resultCount = results.features.length;
    for (var i = 0; i < resultCount; i++) {
        var featureAttributes = results.features[i].attributes;
        var record = [];
        for (var attr in featureAttributes) {
            var av = featureAttributes[attr];
            var v;
            if (isNumber(av)) {
                v = av;//.toFixed(2)
            } else {
                v = av;
            }
            record.push(v);
        }
        attrData.push(record); //将属性表内的数据放到数组中
    }

    console.log("数组长度：" + attrData.length);
    console.log(attrData);
    console.log("Value：" + attrData[0][2]);

    for (var i = 0; i < attrData.length; i++) {
        var j = 0;
        var form = new Ext.form.Panel({
            frame: true,
            xtype: 'form',
            id: 'addInfoForm',
            jsonSubmit: true,
            defaults: {
                xtype: "textfield",
                width: 180
            },
            items: [
                { name: "tbnf", value: mapYear },
                { name: "mbbsm", value: attrData[i][j++] },
                { name: "ysdm", value: attrData[i][j++] },
                { name: "kfqdm", value: attrData[i][j++] },
                { name: "kfqmc", value: attrData[i][j++] },
                { name: "kfqpjfw", value: attrData[i][j++] },
                { name: "kfqpjlx", value: attrData[i][j++] },
                { name: "tbbh", value: attrData[i][j++] },
                { name: "dlmc", value: attrData[i][j++] },
                { name: "dldm", value: attrData[i][j++] },
                { name: "dlmj", value: attrData[i][j++].toFixed(2) },
                // {name: "tdxzqk", value:""},
                { name: "qs", value: attrData[i][j++] },
                { name: "gysj", value: attrData[i][j++] },
                { name: "gylx", value: attrData[i][j++] },
                { name: "gydm", value: attrData[i][j++] },
                { name: "tdzpg", value: attrData[i][j++] },
                { name: "synx", value: attrData[i][j++] },
                { name: "tdsyz", value: attrData[i][j++] },
                { name: "pzyt", value: attrData[i][j++] },
                { name: "pzdm", value: attrData[i][j++] },
                { name: "ghyt", value: attrData[i][j++] },
                { name: "ghdm", value: attrData[i][j++] },
                { name: "ghjzmj", value: attrData[i][j++].toFixed(2) },
                { name: "ghjdmj", value: attrData[i][j++].toFixed(2) },
                { name: "ghrjl", value: attrData[i][j++] },
                { name: "ghjzmd", value: attrData[i][j++] },
                { name: "bz", value: attrData[i][j++] },
                { name: "rdyj", value: attrData[i][j++] },
                { name: "dlmc1", value: attrData[i][j++] },
                { name: "dldm1", value: attrData[i][j++] },
                { name: "dlmj1", value: attrData[i][j++] },
                { name: "dlmc2", value: attrData[i][j++] },
                { name: "dldm2", value: attrData[i][j++] },
                { name: "dlmj2", value: attrData[i][j++] },
                { name: "jdzmj", value: attrData[i][j++].toFixed(2) },
                { name: "gxlb", value: attrData[i][j++] },
                { name: "gxdm", value: attrData[i][j++] },
                { name: "gxydmj", value: attrData[i][j++].toFixed(2) },
                { name: "gxzsbl", value: attrData[i][j++] },
                { name: "gxsr", value: attrData[i][j++].toFixed(2) },
                { name: "gxss", value: attrData[i][j++].toFixed(2) },
                { name: "jzmj", value: attrData[i][j++].toFixed(2) },
                { name: "jzjdmj", value: attrData[i][j++].toFixed(2) },
                {name:"isPass",value:3}
            ]

        })

        var myForm = Ext.getCmp('addInfoForm').getForm();
        myForm.submit({
            url: 'add_zdinfomation',
            success: function(form, action) {
                // Ext.Msg.alert('成功', '内容添加成功。');
                console.log(i + "添加成功")

            },
            failure: function(form, action) {
                Ext.Msg.alert('失败', '内容添加失败，请重试。');
                //return;
            }
        });
    }
    selectStore.reload();
    Ext.Msg.alert('完成', attrData.length+'条数据导入，'+'目前数据库中数据总数：'+selectStore.getCount()+"条");
}
})
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//选择第一个
/*
    var storeKFQ = Ext.data.StoreManager.lookup('thematic_LCCT_KFQStore');
    if (storeKFQ.getCount() > 0) {
        var model = storeKFQ.getAt(0);
        KFQCombo.select(model);
    }
*/


