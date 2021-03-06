/*
 * File: app/view/law_Manage.js
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

Ext.define('MyApp.view.law_Manage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.law_Manage',

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
    title: '法律法规管理',

    items: [
        {
            xtype: 'gridpanel',
            id: 'law_ManageGrid',
            store: 'law_RegulationStore',
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'lawType',
                    text: '法律类型'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'lawTitle',
                    text: '标题'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'publishDept',
                    text: '颁发部门'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'lawEditor',
                    text: '编辑人'
                },
                {
                    xtype: 'gridcolumn',
                    width: 350,
                    dataIndex: 'description',
                    text: '法律概要'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'lawManage_SearchText'
                        },
                        {
                            xtype: 'button',
                            handler: function() {
                                var searchKeyword = Ext.getCmp('lawManage_SearchText').getValue();
                                var mystore = Ext.StoreMgr.get('law_RegulationStore'); //获得store对象
                                //在load事件中添加参数
                                mystore.load({
                                    params :{searchKeyword : searchKeyword}
                                });
                            },
                            icon: 'images/table/search.png',
                            text: '查询'
                        },
                        {
                            xtype: 'button',
                            handler: function() {
                                Ext.widget('law_TypesManagerWindow').show();
                            },
                            icon: 'images/table/preview.png',
                            text: '栏目管理'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            handler: function() {
                                var xtype = 'law_Import';
                                var mainView = Ext.getCmp('mainView');
                                mainView.removeAll();
                                mainView.add(Ext.widget(xtype));
                            },
                            icon: 'images/table/add.png',
                            text: '添加'
                        },
                        {
                            xtype: 'button',
                            handler: function() {
                                //获取数据
                                var records = Ext.getCmp('law_ManageGrid').getSelection();
                                if (records.length === 0){
                                    Ext.Msg.alert('提示', '请选择一条数据后再修改信息。');
                                    return;
                                } else if(records.length >1){
                                    Ext.Msg.alert('提示', '每次只能修改一条信息，请重新选择。');
                                    return;
                                }
                                //启动窗口
                                var xtype = 'law_Import';
                                var mainView = Ext.getCmp('mainView');
                                mainView.removeAll();
                                mainView.add(Ext.widget(xtype));

                                //改变Ajax url
                                var form = Ext.getCmp('law_ImportForm').getForm();
                                form.loadRecord(records[0]);
                                //form.load({    url:'update_law'});
                                form.url = 'update_law';
                            },
                            icon: 'images/table/edit.png',
                            text: '修改'
                        },
                        {
                            xtype: 'button',
                            handler: function() {
                                //获取数据
                                var records = Ext.getCmp('law_ManageGrid').getSelection();
                                if (records.length === 0){
                                    Ext.Msg.alert('提示', '请选择一条数据后再点击删除按钮。');
                                    return;
                                }else if(records.length >1){
                                    Ext.Msg.alert('提示', '每次只能删除一条法律。');
                                    return;
                                }
                                var id = records[0].get("id");
                                var columnName= records[0].get("lawTitle");
                                Ext.Msg.confirm('提示', '您正在删除<br/>[' +columnName+']栏目。<br/> 确认删除？', getResult);


                                function getResult(confirm)
                                {
                                    console.log('confirm:', confirm);
                                    if (confirm == "yes"){
                                        Ext.Ajax.request(
                                        {
                                            url : 'del_law',
                                            params :
                                            {
                                                id : id
                                            },
                                            success : function (response){
                                                Ext.Msg.alert('成功提示', '记录删除成功。');
                                                var mystore = Ext.StoreMgr.get('law_RegulationStore');
                                                mystore.load();
                                            },
                                            failure : function (response){
                                                Ext.Msg.alert('失败提示', '记录删除失败。');
                                            }
                                        });
                                    }
                                }
                            },
                            icon: 'images/table/delete.png',
                            text: '删除'
                        },
                        {
                            xtype: 'button',
                            href: 'http://localhost:8080/landuse/public/homeIndex.html',
                            icon: 'images/table/connect.png',
                            text: '链接到对外发布平台'
                        }
                    ]
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            }
        }
    ]

});