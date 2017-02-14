/*
 * File: app/view/db_projectInfoWindow.js
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

Ext.define('MyApp.view.db_projectInfoWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.db_projectInfoWindow',

    requires: [
        'MyApp.view.db_RightInfoAddWindowViewModel2',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.HtmlEditor',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.toolbar.Spacer'
    ],

    viewModel: {
        type: 'db_projectinfowindow'
    },
    height: 629,
    id: 'db_projectInfoWindow',
    width: 630,
    layout: 'fit',
    title: '查看项目详情',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'db_projectInfoWindowForm',
            layout: 'auto',
            bodyPadding: 10,
            jsonSubmit: true,
            url: 'add_ProjectInfo',
            items: [
                {
                    xtype: 'fieldset',
                    height: 104,
                    width: 615,
                    layout: 'absolute',
                    title: '项目基本信息',
                    items: [
                        {
                            xtype: 'textfield',
                            x: 0,
                            y: 10,
                            id: 'proName1',
                            width: 400,
                            fieldLabel: '项目名称',
                            labelWidth: 70,
                            name: 'proName',
                            readOnly: false,
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            x: 0,
                            y: 50,
                            id: 'proId1',
                            width: 240,
                            fieldLabel: '项目编号',
                            labelWidth: 70,
                            name: 'proId',
                            readOnly: false,
                            allowBlank: false
                        },
                        {
                            xtype: 'displayfield',
                            x: 270,
                            y: 50,
                            width: 160,
                            fieldLabel: '项目支出',
                            labelWidth: 70,
                            name: 'proCost'
                        },
                        {
                            xtype: 'displayfield',
                            x: 440,
                            y: 50,
                            width: 160,
                            fieldLabel: '资金剩余',
                            labelWidth: 70,
                            name: 'proCostRemain'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 449,
                    width: 615,
                    title: '项目详细信息',
                    items: [
                        {
                            xtype: 'numberfield',
                            id: 'proMoney1',
                            width: 400,
                            fieldLabel: '项目金额',
                            labelWidth: 70,
                            name: 'proMoney',
                            allowBlank: false,
                            emptyText: '0',
                            validateBlank: true
                        },
                        {
                            xtype: 'numberfield',
                            id: 'proIncome1',
                            width: 400,
                            fieldLabel: '到账金额',
                            labelWidth: 70,
                            name: 'proIncome',
                            emptyText: '0',
                            validateBlank: true
                        },
                        {
                            xtype: 'numberfield',
                            id: 'proRemain1',
                            width: 400,
                            fieldLabel: '剩余金额',
                            labelWidth: 70,
                            name: 'proRemain',
                            readOnly: false,
                            editable: false,
                            emptyText: '0',
                            validateBlank: true
                        },
                        {
                            xtype: 'textfield',
                            width: 400,
                            fieldLabel: '主管单位',
                            labelWidth: 70,
                            name: 'proZhuguan',
                            allowBlank: false,
                            validateBlank: true
                        },
                        {
                            xtype: 'textfield',
                            width: 400,
                            fieldLabel: '合作单位',
                            labelWidth: 70,
                            name: 'proHezuo',
                            validateBlank: true
                        },
                        {
                            xtype: 'datefield',
                            width: 400,
                            fieldLabel: '开始时间',
                            labelWidth: 70,
                            name: 'proStartTime',
                            allowBlank: false,
                            validateBlank: true,
                            format: 'Y-m-d'
                        },
                        {
                            xtype: 'datefield',
                            width: 400,
                            fieldLabel: '结束时间',
                            labelWidth: 70,
                            name: 'proEndTime',
                            allowBlank: false,
                            validateBlank: true,
                            format: 'Y-m-d'
                        },
                        {
                            xtype: 'combobox',
                            width: 400,
                            fieldLabel: '项目经理',
                            labelWidth: 70,
                            name: 'proManager',
                            allowBlank: false,
                            validateBlank: true,
                            displayField: 'trueName',
                            store: 'uUserInfoStore'
                        },
                        {
                            xtype: 'textfield',
                            width: 400,
                            fieldLabel: '参与人员',
                            labelWidth: 70,
                            name: 'proTeam',
                            validateBlank: true
                        },
                        {
                            xtype: 'htmleditor',
                            height: 96,
                            fieldLabel: '项目简介',
                            labelWidth: 70,
                            name: 'proBz'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '项目状态',
                            name: 'proStatus'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '项目申请人',
                            name: 'proApplication'
                        }
                    ]
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
                            text: '关闭',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 30
                        }
                    ]
                }
            ]
        }
    ],

    onButtonClick1: function(button, e, eOpts) {
        var win = Ext.getCmp('db_projectInfoWindow');
        win.close();
    }

});