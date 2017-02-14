/*
 * File: app/view/sys_MapAddAttrNameIndexWindow.js
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

Ext.define('MyApp.view.sys_MapAddAttrNameIndexWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.sys_MapAddAttrNameIndexWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Hidden',
        'Ext.form.field.Checkbox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    height: 293,
    id: 'sys_MapAddAttrNameIndexWindow',
    width: 399,
    layout: 'fit',
    title: '添加字段中英文对照',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'sys_MapAttrNameIndexForm',
            bodyPadding: 10,
            jsonSubmit: true,
            url: 'add_MapAttrNameIndex',
            items: [
                {
                    xtype: 'hiddenfield',
                    anchor: '100%',
                    fieldLabel: '栏目组名',
                    labelAlign: 'right',
                    labelWidth: 70,
                    name: 'id'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '英文名称',
                    labelAlign: 'right',
                    labelWidth: 70,
                    name: 'enName',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '中文名称',
                    labelAlign: 'right',
                    labelWidth: 70,
                    name: 'cnName',
                    allowBlank: false
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    width: '',
                    fieldLabel: '字段单位',
                    labelAlign: 'right',
                    labelWidth: 70,
                    name: 'enable',
                    boxLabel: '',
                    checked: true
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '字段单位',
                    labelAlign: 'right',
                    labelWidth: 70,
                    name: 'unit'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: '来自表格',
                    labelAlign: 'right',
                    labelWidth: 70,
                    name: 'byTableName'
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    height: 60,
                    fieldLabel: '备注',
                    labelAlign: 'right',
                    labelWidth: 70,
                    name: 'comment'
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
                            xtype: 'button',
                            text: '取消',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            text: '确定',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp('sys_MapAddAttrNameIndexWindow').close();
    },

    onButtonClick: function(button, e, eOpts) {
        var win  = Ext.getCmp('sys_MapAddAttrNameIndexWindow');
        var title = win.getTitle();
        var myform = Ext.getCmp('sys_MapAttrNameIndexForm').getForm();
        if (myform.isValid())
        {
            myform.submit({
                //url : 'add_Map',
                success : function (form, action)
                {
                    Ext.Msg.alert('成功', title+'成功。');

                    var mystore = Ext.StoreMgr.get('sys_MapAttrNameIndexStore'); //获得store对象
                    mystore.reload();
                    win.close();
                },
                failure: function(form, action){
                    Ext.Msg.alert('失败', title+'失败，请重试。');
                    win.close();
                }
            });
        }
        else
        {
            Ext.Msg.alert('注意', '填写的信息有误，请检查！');
        }
    }

});