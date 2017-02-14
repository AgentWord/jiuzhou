/*
 * File: app/view/kfq_manager.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.kfq_manager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kfq_manager',

    requires: [
        'MyApp.view.kfq_managerViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.ComboBox'
    ],

    viewModel: {
        type: 'kfq_manager'
    },
    height: 614,
    width: 1051,
    layout: 'border',
    title: '开发区信息管理',
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combobox',
                    id: 'survey_KfqArea_Combo4',
                    fieldLabel: '选择地区',
                    submitValue: false,
                    displayField: 'name',
                    store: 'thematic_LCCT_KFQStore',
                    valueField: 'value',
                    listeners: {
                        change: 'onComboboxChange1'
                    }
                },
                {
                    xtype: 'combobox',
                    id: 'survey_layerUrls_Combo4',
                    width: 250,
                    fieldLabel: '选择年份',
                    labelWidth: 60,
                    name: '',
                    submitValue: false,
                    displayField: 'mapName',
                    store: 'survey_IndexCurrent_MapStore',
                    valueField: 'mapUrl'
                },
                {
                    xtype: 'button',
                    handler: function() {
                        //加入地图的js文件
                        var head = document.getElementsByTagName('head')[0];
                        var script= document.createElement("script");
                        script.type = "text/javascript";
                        script.src="mapjs/KfqDataImport.js";//survey_IndexCurrentValueCalculation_map.js";
                        head.appendChild(script);
                    },
                    text: '导入'
                },
                {
                    xtype: 'button',
                    handler: function() {
                        var myform = Ext.getCmp('survey_IndexCurrentValue_Form').getForm();
                        if (myform.isValid())
                        {
                            myform.submit({
                                url : 'add_landKfqType',
                                success : function (form, action)
                                {
                                    Ext.Msg.alert('成功', '本次计算结果添加成功。');
                                    var mystore = Ext.StoreMgr.get('landKfqTypeStore'); //获得store对象
                                    mystore.reload();
                                    myform.reset();
                                },
                                failure: function(form, action){
                                    Ext.Msg.alert('失败', '添加失败，请重试。');
                                }
                            });
                        }
                        else
                        {
                            Ext.Msg.alert('注意', '填写的信息有误，请检查！');
                        }
                    },
                    hidden: true,
                    text: '保存计算结果'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        var  mystore=Ext.StoreMgr.get('zd_checkStore');
                        console.log(mystore.getCount());
                        mystore.filter("dldm", 'A');
                        console.log(mystore.getCount());
                        var store=new Ext.data.ArrayStore();
                        store=mystore;
                        console.log(store.getCount());

                        var yjcczzmj = store.sum("dlmj");
                        console.log(yjcczzmj);
                        store.clearFilter();
                        store.filter("dldm", 'A2');
                        store.filter("gysj", '2006-12');

                        console.log(store.getCount());
                        var mj = store.sum("dlmj");
                        console.log(mj);
                        store.clearFilter();
                        console.log(store.getCount());
                    },
                    hidden: true,
                    text: 'MyButton'
                }
            ]
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        region: 'center',
                        id: 'kfqInfo_grid',
                        columnLines: true,
                        store: 'kfqInfoStore',
                        columns: [
                            {
                                xtype: 'rownumberer',
                                width: 61,
                                align: 'center',
                                text: '序号'
                            },
                            {
                                xtype: 'actioncolumn',
                                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                                    if (colIndex === undefined || colIndex < 2) {
                                        return;
                                    }
                                    var win = Ext.widget('kfqChangeWindow');
                                    win.show();

                                    var form = Ext.getCmp('kfqChangeForm').getForm();
                                    form.loadRecord(record);

                                },
                                width: 95,
                                dataIndex: 'date',
                                menuText: '',
                                text: '变更调整',
                                icon: 'images/table/edit.png'
                            },
                            {
                                xtype: 'actioncolumn',
                                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                                    Ext.Msg.confirm('您正在删除', '开发区：' + record.get('kfqmc') + '，<br/> 确认删除？', getResult);
                                    function getResult(confirm)
                                    {
                                        console.log('confirm:', confirm);
                                        if (confirm == "yes"){
                                            var roleId = record.get("id");
                                            Ext.Ajax.request(
                                            {
                                                url : 'del_kfqInfo',
                                                params :
                                                {
                                                    id : roleId
                                                },
                                                success : function (response){
                                                    Ext.Msg.alert('成功提示', '操作成功。');
                                                    var mystore = Ext.StoreMgr.get('kfqInfoStore');
                                                    mystore.load();
                                                },
                                                failure : function (response){
                                                    Ext.Msg.alert('失败提示', '操作失败。');

                                                }
                                            });
                                        }
                                    }
                                },
                                width: 50,
                                dataIndex: 'date',
                                text: '撤区',
                                icon: 'images/table/delete.png'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'kfqmc',
                                text: '开发区名称'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 96,
                                dataIndex: 'kfqjb',
                                text: '开发区级别'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'kfqsplx',
                                text: '开发区审批类型'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'kfqpjlx',
                                text: '开发区评价类型'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 116,
                                dataIndex: 'slsj',
                                text: '开发区设立时间'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'spdw',
                                text: '开发区审批单位'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'gljg',
                                text: '开发区管理机构'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'gljgdz',
                                text: '开发区管理机构地址'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'zdcy',
                                text: '开发区主导产业'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'sptdzmj',
                                text: '开发区依法审批土地总面积（hm2）'
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'txt_search_key',
                                        width: 162,
                                        fieldLabel: '',
                                        emptyText: '请输入搜索关键字',
                                        listeners: {
                                            change: 'onTxt_search_keyChange'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        handler: function(button, e) {
                                            var getKeyword = Ext.getCmp('txt_search_key').getValue();
                                            console.log("keyword:",getKeyword);
                                            var mystore = Ext.StoreMgr.get('kfqInfoStore'); //获得store对象
                                            //在load事件中添加参数
                                            mystore.load(
                                            {
                                                params :
                                                {
                                                    searchKeyword : getKeyword
                                                }
                                            }
                                            );

                                        },
                                        id: 'but_search',
                                        icon: 'images/table/search.png',
                                        text: '搜索'
                                    },
                                    {
                                        xtype: 'button',
                                        handler: function(button, e) {
                                            Ext.getCmp('txt_search_key').setValue('');
                                            var mystore = Ext.StoreMgr.get('kfqInfoStore'); //获得store对象
                                            mystore.load();
                                            Ext.getCmp('kfqjb').setValue('');
                                            Ext.getCmp('kfqpjlx').setValue('');
                                            Ext.getCmp('kfqmc').setValue('');
                                        },
                                        id: 'refresh_button',
                                        icon: 'images/table/refresh.png',
                                        text: '刷新'
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'kfqjb',
                                        width: 181,
                                        fieldLabel: '开发区级别',
                                        labelWidth: 80,
                                        delimiter: '',
                                        displayField: 'kfqjb',
                                        store: [
                                            '',
                                            '国家级',
                                            '省级',
                                            '示范区'
                                        ],
                                        valueField: 'kfqjb',
                                        listeners: {
                                            change: 'onEnt_landuse_gradeCombo1Change'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'kfqpjlx',
                                        width: 190,
                                        fieldLabel: '开发区类型',
                                        labelWidth: 80,
                                        displayField: 'kfqpjlx',
                                        store: [
                                            '',
                                            '工业主导型',
                                            '产城融合型'
                                        ],
                                        valueField: 'kfqpjlx',
                                        listeners: {
                                            change: 'onEnt_landuse_typeCombo1Change'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        hidden: true,
                                        id: 'kfqmc',
                                        width: 220,
                                        fieldLabel: '选择开发区',
                                        labelWidth: 80,
                                        displayField: 'kfqmc',
                                        store: 'kfqInfoStore',
                                        valueField: 'kfqmc',
                                        listeners: {
                                            change: 'onKfqInfo_selectKfq_ComboChange'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        hidden: true,
                                        id: 'ent_landuse_yearCombo1',
                                        width: 190,
                                        fieldLabel: '选择年份',
                                        labelWidth: 80,
                                        store: [
                                            '2016',
                                            '2015',
                                            '2014',
                                            '2013',
                                            '2012',
                                            '2011',
                                            '2010'
                                        ],
                                        valueField: 'mapUrl'
                                    },
                                    {
                                        xtype: 'button',
                                        handler: function() {
                                            var win=Ext.widget('kfq_add');
                                            win.show();
                                        },
                                        itemId: 'but_add',
                                        icon: 'images/table/add.png',
                                        text: '新增开发区'
                                    },
                                    {
                                        xtype: 'button',
                                        handler: function() {
                                            var grid = Ext.getCmp('kfqInfo_grid');
                                            var records = grid.getSelection();
                                            if (records.length === 0) {
                                                Ext.Msg.alert('提示', '请选择一条数据后再点击编辑按钮。');
                                                return;
                                            } else if (records.length > 1) {
                                                Ext.Msg.alert('提示', '每次只能编辑一条信息。');
                                                return;
                                            }

                                            var win = Ext.widget('kfqChangeWindow');
                                            win.show();

                                            var form = Ext.getCmp('kfqChangeForm');
                                            //console.log("record:",record);//console.log("record2:",records[0]);
                                            form.loadRecord(records[0]);


                                            //var form = Ext.getCmp('form_kfqinfo_add').getForm();
                                            //form.loadRecord(record);

                                        },
                                        id: 'changeButton',
                                        itemId: '',
                                        icon: 'images/table/edit.png',
                                        text: '变更'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onTxt_search_keyChange: function(field, newValue, oldValue, eOpts) {
        var mystore = Ext.StoreMgr.get('kfqInfoStore'); //获得store对象
        //在load事件中添加参数
        mystore.load(
        {
            params :
            {
                searchKeyword : newValue
            }
        }
        );

    },

    onEnt_landuse_gradeCombo1Change: function(field, newValue, oldValue, eOpts) {
        var mystore = Ext.StoreMgr.get('kfqInfoStore'); //获得store对象
        var kfqpjlx=Ext.getCmp('kfqpjlx').getValue();
        var kfqmc=Ext.getCmp('kfqmc').getValue();
        console.log(newValue);
        //在load事件中添加参数
        mystore.load(
        {
         params :
            {
                kfqjb:newValue,
                kfqpjlx:kfqpjlx,
                kfqmc:kfqmc


            }
        }

        );

    },

    onEnt_landuse_typeCombo1Change: function(field, newValue, oldValue, eOpts) {
        var mystore = Ext.StoreMgr.get('kfqInfoStore'); //获得store对象
        var kfqjb=Ext.getCmp('kfqjb').getValue();
        var kfqmc=Ext.getCmp('kfqmc').getValue();
        console.log(newValue);
        //在load事件中添加参数
        mystore.load(
        {
         params :
            {
                kfqjb:kfqjb,
                kfqpjlx:newValue,
                kfqmc:kfqmc


            }
        }

        );

    },

    onKfqInfo_selectKfq_ComboChange: function(field, newValue, oldValue, eOpts) {
        var mystore = Ext.StoreMgr.get('kfqInfoStore'); //获得store对象
        var kfqjb=Ext.getCmp('kfqjb').getValue();
        var kfqpjlx=Ext.getCmp('kfqpjlx').getValue();
        console.log(newValue);
        //在load事件中添加参数
        mystore.load(
        {
         params :
            {
                kfqjb:kfqjb,
                kfqpjlx:kfqpjlx,
                kfqmc:newValue


            }
        }

        );

    },

    onComboboxChange1: function(field, newValue, oldValue, eOpts) {
        var store = Ext.StoreMgr.get('survey_IndexCurrent_MapStore');
        store.clearFilter();
        store.filter('mapKey',newValue);
    }

});