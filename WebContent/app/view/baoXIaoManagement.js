/*
 * File: app/view/baoXIaoManagement.js
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

Ext.define('MyApp.view.baoXIaoManagement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.baoXIaoManagement',

    requires: [
        'MyApp.view.chaiLuBaoXiaoViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.column.Number',
        'Ext.toolbar.Paging',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Fill'
    ],

    viewModel: {
        type: 'baoxiaomanagement'
    },
    height: 450,
    width: 808,
    layout: 'border',
    title: '项目信息管理',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'center',
            layout: 'border',
            title: '',
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    autoScroll: true,
                    id: 'projectInfo1',
                    title: '',
                    sortableColumns: false,
                    store: 'projectInfoStore',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            width: 30,
                            dataIndex: '',
                            text: ''
                        },
                        {
                            xtype: 'actioncolumn',
                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                if (colIndex === undefined || colIndex < 2) {
                                    return;
                                }
                                var win = Ext.widget('db_projectInfoWindow');
                                win.show();

                                var form = Ext.getCmp('db_projectInfoWindowForm').getForm();
                                form.loadRecord(record);

                            },
                            width: 53,
                            align: 'center',
                            text: '详情',
                            icon: 'images/table/search.png'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 80,
                            dataIndex: 'proId',
                            text: '项目编号'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 244,
                            align: 'center',
                            dataIndex: 'proName',
                            text: '项目名称'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proStatus',
                            text: '项目状态'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'proMoney',
                            text: '项目总金额'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'proIncome',
                            text: '已到账金额'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'proCost',
                            text: '未到账金额'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proZhuguan',
                            text: '项目主管单位'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proHezuo',
                            text: '项目合作单位'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proStartTime',
                            text: '项目开始时间'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proEndTime',
                            text: '项目结束时间'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proManager',
                            text: '项目经理'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proTeam',
                            text: '项目参与人员'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proApplication',
                            text: '项目申请人'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proCheck',
                            text: '申请审核人'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'proBz',
                            text: '备注'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            hidden: true,
                            width: 360,
                            displayInfo: true,
                            emptyMsg: '无数据',
                            store: 'projectInfoStore'
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'baoXiaoType',
                                    width: 199,
                                    fieldLabel: '报销类型',
                                    labelWidth: 60,
                                    editable: false,
                                    displayField: 'name',
                                    store: 'baoXiaoTypeStore',
                                    valueField: 'value',
                                    listeners: {
                                        change: 'onEnt_landuse_typeCombo1Change1'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    hidden: true,
                                    id: 'searchKeyword_zdInfo4',
                                    fieldLabel: '',
                                    emptyText: '输入搜索关键字',
                                    listeners: {
                                        change: 'onSearchKeyword_zdInfoChange'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        Ext.getCmp('projectName').setValue("");
                                        var mystore = Ext.StoreMgr.get('projectInfoStore'); //获得store对象
                                        mystore.load ({
                                            params: {
                                                // specify params for the first page load if using paging

                                                searchKeyword: "",

                                            }
                                        });
                                    },
                                    icon: 'images/table/refresh.png',
                                    text: '刷新'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var type=Ext.getCmp('baoXiaoType').getValue();

                                        if(type===null){
                                            Ext.Msg.alert('提示', '请先选择报销类型。');
                                            return;
                                        }

                                        var win = Ext.widget(type);
                                        //console.log(win);
                                        win.show();


                                    },
                                    icon: 'images/table/add.png',
                                    text: '新建报销项目'
                                },
                                {
                                    xtype: 'tbseparator'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var grid = Ext.getCmp('projectInfo');
                                        var records = grid.getSelection();
                                        if (records.length === 0) {
                                            Ext.Msg.alert('提示', '请选择一条数据后再点击编辑按钮。');
                                            return;
                                        } else if (records.length > 1) {
                                            Ext.Msg.alert('提示', '每次只能编辑一条信息。');
                                            return;
                                        }

                                        var win = Ext.widget('db_projectInfoAddWindow');
                                        win.show();
                                        Ext.getCmp('db_projectInfoAddWindow').setTitle("修改项目信息");
                                        //var form = Ext.widget('db_UserWindowForm');
                                        var form = Ext.getCmp('db_projectInfoAddWindowForm').getForm();
                                        form.url="update_ProjectInfo";
                                        //console.log("form:",form.url);

                                        form.loadRecord(records[0]);


                                    },
                                    icon: 'images/table/add.png',
                                    text: '编辑记录'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var grid = Ext.getCmp('projectInfo');
                                        var records = grid.getSelection();
                                        if (records.length === 0) {
                                            Ext.Msg.alert('提示', '请选择一条数据后再点击删除按钮。');
                                            return;
                                        } else if (records.length > 1) {
                                            Ext.Msg.alert('提示', '每次只能操作一条数据。');
                                            return;
                                        }
                                        var record = records[0];
                                        var Id=record.get('id');
                                        Ext.Msg.confirm('您正在删除', '项目编号：' + record.get('proId') + ',项目名称为：'+record.get('proName')+'，<br/> 确认删除？', getResult);
                                        function getResult(confirm)
                                        {

                                            if (confirm == "yes"){

                                                //console.log('userId:',Id);
                                                Ext.Ajax.request(
                                                {
                                                    url : 'del_ProjectInfo',
                                                    params :
                                                    {
                                                        Id : Id
                                                    },
                                                    success : function (response){
                                                        Ext.Msg.alert('成功提示', '数据删除成功。');

                                                        var mystore = Ext.StoreMgr.get('projectInfoStore');
                                                        mystore.load();
                                                    },
                                                    failure : function (response){

                                                        Ext.Msg.alert('失败提示', '记录删除失败。');
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    icon: 'images/table/add.png',
                                    text: '删除记录'
                                }
                            ]
                        }
                    ],
                    selModel: {
                        selType: 'checkboxmodel'
                    }
                }
            ],
            listeners: {
                activate: 'onPanelActivate'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'textfield',
                    id: 'projectCount1',
                    fieldLabel: '总计',
                    labelWidth: 30,
                    editable: false,
                    listeners: {
                        afterrender: 'onProjectCountAfterRender'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        var mystore = Ext.StoreMgr.get('projectInfoStore'); //获得store对象
                        mystore.load({
                            params:{
                                searchKeyword:"已提交"
                            }
                        });
                    },
                    icon: 'images/table/add.png',
                    text: '全部报销记录'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        var mystore = Ext.StoreMgr.get('projectInfoStore'); //获得store对象
                        mystore.load({
                            params:{
                                searchKeyword:"已开始"
                            }
                        });
                    },
                    icon: 'images/table/add.png',
                    text: '待报销记录'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        var mystore = Ext.StoreMgr.get('projectInfoStore'); //获得store对象
                        mystore.load({
                            params:{
                                searchKeyword:"已完成"
                            }
                        });
                    },
                    icon: 'images/table/add.png',
                    text: '已报销记录'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        var mystore = Ext.StoreMgr.get('projectInfoStore'); //获得store对象
                        mystore.load({
                            params:{
                                searchKeyword:"已完成"
                            }
                        });
                    },
                    icon: 'images/table/add.png',
                    text: '审核未通过记录'
                }
            ]
        }
    ],

    onEnt_landuse_typeCombo1Change1: function(field, newValue, oldValue, eOpts) {

        var mystore = Ext.StoreMgr.get('projectInfoStore'); //获得store对象
        //在load事件中添加参数
        mystore.load(
            {
                params :
                {
                    searchKeyword : newValue,

                }
            }
        );

    },

    onSearchKeyword_zdInfoChange: function(field, newValue, oldValue, eOpts) {
        var getKeyword = Ext.getCmp('searchKeyword_zdInfo').getValue();
        console.log("keyword:",getKeyword);
        var mystore = Ext.StoreMgr.get('zd_infoStore'); //获得store对象
        var kfqmc = Ext.getCmp('kfqmc1').getValue();
        console.log("kfqmc:",kfqmc);
        if(kfqmc !== null){
            console.log("kfqmc1:",kfqmc);
           mystore.filter("kfqmc",kfqmc);
        }
        //在load事件中添加参数
        mystore.load(
            {
                params :
                {
                    searchKeyword : newValue,
                    isPass:3,
                    start:0,
                    limit:1000
                }
            }
        );
        var kfqmc = Ext.getCmp('kfqmc1').getValue();
        console.log("kfqmc:",kfqmc);
        if(kfqmc !== null){
            console.log("kfqmc1:",kfqmc);
           mystore.filter("kfqmc",kfqmc);
        }
        //mystore.reload();
    },

    onPanelActivate: function(component, eOpts) {
        var store=Ext.StoreMgr.get('zd_infoStore');
        store.load ({
            params: {
                // specify params for the first page load if using paging
                start: 0,
                limit: 1000,
                // other params
                searchKeyword: '',
                isPass:3
            }
        });

        // store.load({
        //    params: {
        //         // specify params for the first page load if using paging
        //         start: 0,
        //         limit: 10,
        //         // other params
        //         searchKeyword: ''
        //     },
        //     callback: function(records, operation, success) {
        //                 for(var index in records){
        //                     var isPass = records[index].get('isPass');
        //                     console.log("ispass:",isPass);
        // //                     if(isPass == 3){

        // //                     }
        //                 }
        //                 //form.loadRecord(recordIdeal);

        // //         var dldmvalue = records[0].get('dldm');
        // //         var dldm = Ext.getCmp('dldm');
        // //         dldm.setValue(dldmvalue);
        // //         console.log("dldmvalue:",dldmvalue);
        // //         console.log("dldm:",dldm);
        //     }
        // });
    },

    onProjectCountAfterRender: function(component, eOpts) {
        // var storeCount=Ext.StoreMgr.get('projectInfoStore').getCount();
        // Ext.getCmp("projectCount").setValue(storeCount);
    }

});