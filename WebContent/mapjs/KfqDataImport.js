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
    //要进行开发区信息的导入
    /*1.选择URl
    2.建立一个Query  把需要的字段筛选进一个数组中。
    3.建立一个store存储数据。
    4.
    */
    //声明字段
    var MBBSM = "MBBSM";
    var YSDM = "YSDM";
    var KFQMC = "KFQMC";
    var KFQDM = "KFQDM";
    var KFQJB = "KFQJB";
    var KFQSPLX = 'KFQSPLX';
    var KFQPJFW = 'KFQPJFW';
    var SLSJ = 'SLSJ';
    var SPDW = 'SPDW';
    var GLJG = 'GLJG';
    var GLJGDZ = 'GLJGDZ';
    var ZDCY = 'ZDCY';
    var SPTDZMJ = 'SPTDZMJ';
    var KFQPJMJ = 'KFQPJMJ';
    var KFQPJLX = 'KFQPJLX';
    var TDKFL = 'TDKFL';
    var CZRK = 'CZRK';
    var GDZCTZZE = 'GDZCTZZE';
    var ESCYSSZE = 'ESCYSSZE';
    var GYZSR = 'GYZSR';
    var GYSSZE = 'GYSSZE';
    var GXZSR = 'GXZSR';
    var GXSSZE = 'GXSSZE';
    var field = [MBBSM, YSDM, KFQDM,KFQMC,  KFQJB, KFQSPLX, KFQPJFW, SLSJ, SPDW, GLJG, GLJGDZ, ZDCY, SPTDZMJ, KFQPJMJ, KFQPJLX, TDKFL, CZRK, GDZCTZZE, ESCYSSZE, GYZSR, GYSSZE, GXZSR, GXSSZE];

    var urlCombo = Ext.getCmp('survey_layerUrls_Combo4');
    var url = urlCombo.getValue(); //取得url

    var kfqname = Ext.getCmp('survey_KfqArea_Combo4').getRawValue();
    var selectStore = Ext.StoreMgr.get('kfqInfoStore');
    var record = selectStore.findRecord('kfqmc', kfqname);
    if (record) {
        Ext.Msg.alert('提示', '[' + kfqname + ']数据已存入数据库，请勿重复导入。');
        return;
    }
    var queryTask = new QueryTask(url);
    var query = new Query();
    query.returnGeometry = false;
    query.outFields = field;
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
    
console.log(m_attrData);
    var m_store = Ext.create('Ext.data.ArrayStore', {
        // store configs
        storeId: 'Kfqm_store',
        //data
        data: m_attrData,
        // reader configs
        fields: [
            { name: MBBSM, type: 'auto' },
            { name: YSDM, type: 'auto' },
            { name: KFQDM ,type: 'auto' },
            { name: KFQMC, type: 'auto' },
            { name: KFQJB, type: 'auto' },
            { name: KFQSPLX, type: 'auto' },
            { name: KFQPJFW, type: 'auto' },
            { name: SLSJ, type: 'auto' },
            { name: SPDW, type: 'auto' },
            { name: GLJG, type: 'auto' },
            { name: GLJGDZ, type: 'auto' },
            { name: ZDCY, type: 'auto' },
            { name: SPTDZMJ, type: 'float' },
            { name: KFQPJMJ, type: 'float' },
            { name: KFQPJLX, type: 'auto' },
            { name: TDKFL, type: 'float' },
            { name: CZRK, type: 'float' },
            { name: GDZCTZZE, type: 'float' },
            { name: ESCYSSZE, type: 'float' },
            { name: GYZSR, type: 'float' },
            { name: GYSSZE, type: 'float' },
            { name: GXZSR, type: 'float' },
            { name: GXSSZE, type: 'float' }


        ],
        autoLoad: true
    });
    var d_store = Ext.create('Ext.data.ArrayStore', {
        // store configs
        storeId: 'Kfqd_store',
        //data
        data: d_attrData,
        // reader configs
        fields: [
            { name: MBBSM, type: 'auto' },
            { name: YSDM, type: 'auto' },
            { name: KFQDM, type: 'auto' },
            { name: KFQMC, type: 'auto' },
            { name: KFQJB, type: 'auto' },
            { name: KFQSPLX, type: 'auto' },
            { name: KFQPJFW, type: 'auto' },
            { name: SLSJ, type: 'auto' },
            { name: SPDW, type: 'auto' },
            { name: GLJG, type: 'auto' },
            { name: GLJGDZ, type: 'auto' },
            { name: ZDCY, type: 'auto' },
            { name: SPTDZMJ, type: 'float' },
            { name: KFQPJMJ, type: 'float' },
            { name: KFQPJLX, type: 'auto' },
            { name: TDKFL, type: 'float' },
            { name: CZRK, type: 'float' },
            { name: GDZCTZZE, type: 'float' },
            { name: ESCYSSZE, type: 'float' },
            { name: GYZSR, type: 'float' },
            { name: GYSSZE, type: 'float' },
            { name: GXZSR, type: 'float' },
            { name: GXSSZE, type: 'float' }

        ],
        autoLoad: true
    });

    //主区计算
    //console.log(m_attrData);
    var m_records = m_store.findRecord('KFQPJFW', "主区");
    console.log(m_records);
    var mbbsm = m_records.get("MBBSM");
    var ysdm = m_records.get(YSDM);
    var kfqmc = m_records.get(KFQMC);
    var kfqdm = m_records.get(KFQDM);
    var kfqjb = m_records.get(KFQJB);
    var kfqsplx = m_records.get(KFQSPLX);
    // var kfqpjfw=m_records.get(KFQPJFW);
    var slsj = m_records.get(SLSJ);
    var spdw = m_records.get(SPDW);
    var gljg = m_records.get(GLJG);
    var gljgdz = m_records.get(GLJGDZ);
    var zdcy = m_records.get(ZDCY);
    var sptdzmj = m_records.get(SPTDZMJ);
    var kfqpjlx = m_records.get(KFQPJLX);

    var kfqpjmj = m_records.get(KFQPJMJ);
    var tdkfl = m_records.get(TDKFL);
    var czrk = m_records.get(CZRK);
    var gdzctzze = m_records.get(GDZCTZZE);
    var escyssze = m_records.get(ESCYSSZE);
    var gyzsr = m_records.get(GYZSR);
    var gyssze = m_records.get(GYSSZE);
    var gxzsr = m_records.get(GXZSR);
    var gxssze = m_records.get(GXSSZE);
    //计算发展方向区
    var d_records = d_store.findRecord('KFQPJFW', "发展方向区");
if(d_records){
    var d_kfqpjmj = d_records.get(KFQPJMJ);
    var d_tdkfl = d_records.get(TDKFL);
    var d_czrk = d_records.get(CZRK);
    var d_gdzctzze = d_records.get(GDZCTZZE);
    var d_escyssze = d_records.get(ESCYSSZE);
    var d_gyzsr = d_records.get(GYSSZE);
    var d_gyssze = d_records.get(GYSSZE);
    var d_gxzsr = d_records.get(GXZSR);
    var d_gxssze = d_records.get(GXSSZE);

}
else{
    d_kfqpjmj=d_tdkfl=d_czrk=d_gdzctzze=d_escyssze=d_gyzsr=d_gyssze=d_gxzsr=d_gxssze=0;
}



    var form = new Ext.form.Panel({
        frame: true,
        xtype: 'form',
        id: 'addkfqInfoForm',
        jsonSubmit: true,
        defaults: {
            xtype: "textfield",
            width: 180
        },
        items: [
            // {name: "tbnf", value:yearNum},


            { name: "kfqdm", value: kfqdm },
            { name: "kfqmc", value: kfqmc },
            { name: "kfqjb", value: kfqjb },
            { name: "kfqsplx", value: kfqsplx },
            //{name: "kfqpjfw",value:kfqpjfw},
            { name: "slsj", value: slsj },
            { name: "spdw", value: spdw },
            { name: "gljg", value: gljg },
            { name: "gljgdz", value: gljgdz },
            { name: "zdcy", value: zdcy },
            { name: "sptdzmj", value: sptdzmj },
            { name: "kfqpjlx", value: kfqpjlx },

            { name: "mkfqpjmj", value: kfqpjmj.toFixed(2) },
            { name: "dkfqpjmj", value: d_kfqpjmj.toFixed(2) },
            { name: "mtdkfl", value: tdkfl.toFixed(2) },
            { name: "dtdkfl", value: d_tdkfl.toFixed(2) },
            { name: "mczrk", value: czrk.toFixed(0) },
            { name: "dczrk", value: d_czrk.toFixed(0) },
            { name: "mgdzctzze", value: gdzctzze.toFixed(2) },
            { name: "dgdzctzze", value: d_gdzctzze.toFixed(2) },
            { name: "mescyssze", value: escyssze.toFixed(2) },
            { name: "descyssze", value: d_escyssze.toFixed(2) },
            { name: "mgyzsr", value: gyzsr.toFixed(2) },
            { name: "dgyzsr", value: d_gyzsr.toFixed(2) },
            { name: "mgyssze", value: gyssze.toFixed(2) },
            { name: "dgyssze", value: d_gyssze.toFixed(2) },
            { name: "mgxzsr", value: gxzsr.toFixed(2) },
            { name: "dgxzsr", value: d_gxzsr.toFixed(2) },
            { name: "mgxssze", value: gxssze.toFixed(2) },
            { name: "dgxssze", value: d_gxssze.toFixed(2) }

        ],

    })

    var myForm = Ext.getCmp('addkfqInfoForm').getForm();
    myForm.submit({
        url: 'add_kfqInfo',
        success: function(form, action) {
            Ext.Msg.alert('成功', '内容添加成功。');
          Ext.StoreMgr.get('kfqInfoStore').reload();

        },
        failure: function(form, action) {
            Ext.Msg.alert('失败', '内容添加失败，请重试。');
            //return;
        }
    });
}

});
