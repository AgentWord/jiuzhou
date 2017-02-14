/*
 * File: app/view/system_MapManage.js
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

Ext.define('MyApp.view.system_MapManage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.system_MapManage',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.selection.CheckboxModel'
    ],

    height: 588,
    width: 786,
    layout: 'fit',
    title: '地图管理',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'gridpanel',
            id: 'system_MapManageGrid',
            store: 'systemManageMapStore',
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'mapName',
                    text: '名称'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'mapGroup',
                    text: '标签信息'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'mapKey',
                    text: '键值'
                },
                {
                    xtype: 'gridcolumn',
                    width: 500,
                    dataIndex: 'mapUrl',
                    text: '图层地址'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'description',
                    text: '备注'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'system_MapManage_SearchKey'
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/search.png',
                            text: '查询',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/preview.png',
                            text: '预览'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/add.png',
                            text: '添加',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/edit.png',
                            text: '修改',
                            listeners: {
                                click: 'onButtonClick2'
                            }
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/delete.png',
                            text: '删除',
                            listeners: {
                                click: 'onButtonClick3'
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/attr.png',
                            text: '中英文对照设置',
                            listeners: {
                                click: 'onButtonClick31'
                            }
                        }
                    ]
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            }
        }
    ],

    onButtonClick: function(button, e, eOpts) {
        var getKeyword = Ext.getCmp('system_MapManage_SearchKey').getValue();
        var mystore = Ext.StoreMgr.get('systemManageMapStore'); //获得store对象
        //在load事件中添加参数
        mystore.load({
            params :{searchKeyword : getKeyword}
        });
    },

    onButtonClick1: function(button, e, eOpts) {
        var win = Ext.widget('system_MapAddWindow');
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        //获取数据
        var models = Ext.getCmp('system_MapManageGrid').getSelection();
        if (models.length === 0){
            Ext.Msg.alert('提示', '请选择一条数据后再修改信息。');
            return;
        } else if(models.length >1){
            Ext.Msg.alert('提示', '每次只能修改一条信息，请重新选择。');
            return;
        }
        //启动窗口
        var win = Ext.widget('system_MapAddWindow');
        win.setTitle('修改信息');
        win.show();

        //改变Ajax url
        var form = Ext.getCmp('system_MapAddForm').getForm();
        form.loadRecord(models[0]);
        form.url = 'update_Map';
    },

    onButtonClick3: function(button, e, eOpts) {
        //获取数据
        var records = Ext.getCmp('system_MapManageGrid').getSelection();
        if (records.length === 0){
           Ext.Msg.alert('提示', '请选择一条数据后再点击删除按钮。');
           return;
        }
        var  ids =new Array(records.length);
        for(var i = 0;i<records.length;i++){
            ids[i] = records[i].get("mapId");
        }
        if(ids.length ==1){
            Ext.Msg.confirm('提示', '您正在删除地图：' + records[0].get('mapName') + '，<br/> 地图链接为：'+records[0].get('mapUrl')+'，<br/> 确认删除？', getResult);
        }else{
            Ext.Msg.confirm('提示', '您正在删除<br/>[' +ids.length+']组地图数据。<br/> 确认删除？', getResult);
        }


        function getResult(confirm)
        {
            console.log('confirm:', confirm);
            if (confirm == "yes"){
                Ext.Ajax.request(
                {
                    url : 'del_MapById',
                    params :
                    {
                        mapIds : ids
                    },
                    success : function (response){
                        Ext.Msg.alert('成功提示', '记录删除成功。');
                        var mystore = Ext.StoreMgr.get('systemManageMapStore');
                        mystore.load();
                    },
                    failure : function (response){
                        Ext.Msg.alert('失败提示', '记录删除失败。');
                    }
                });
            }
        }
    },

    onButtonClick31: function(button, e, eOpts) {
        Ext.widget('sys_MapAttrNameIndexWindow').show();
    }

});