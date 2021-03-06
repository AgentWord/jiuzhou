/*
 * File: app/view/survey_DataManager.js
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

Ext.define('MyApp.view.survey_DataManager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.survey_DataManager',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.selection.CheckboxModel'
    ],

    height: 731,
    width: 1017,
    layout: 'fit',
    title: '调查数据管理',

    items: [
        {
            xtype: 'gridpanel',
            store: 'survey_dataManagerStore',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'surveyDate',
                    text: '调查时间'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'surveyName',
                    text: '调查人'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'surveyAddress',
                    text: '调查地址'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kfqmc',
                    text: '开发区名称'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kfqdm',
                    text: '开发区代码'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'surveyData',
                    text: '调查数据'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: ''
                        },
                        {
                            xtype: 'button',
                            text: '搜索'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: '数据接收'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: '预览'
                        },
                        {
                            xtype: 'button',
                            text: '通过并变更'
                        },
                        {
                            xtype: 'button',
                            text: '拒绝'
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