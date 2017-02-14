/*
 * File: app/view/task_DynamicInspect.js
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

Ext.define('MyApp.view.task_DynamicInspect', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.task_DynamicInspect',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.toolbar.Separator'
    ],

    height: 588,
    width: 786,
    layout: 'fit',
    title: '动态巡查任务',

    items: [
        {
            xtype: 'gridpanel',
            columns: [
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    text: '任务下达时间'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'string',
                    text: '开始时间'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    text: '截止时间'
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'bool',
                    text: '任务状态'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'number',
                    text: '执行人'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    text: '实施时间'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    text: '完成时间'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'number',
                    text: '描述备注'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'number',
                    text: '返回数据'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield'
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
                            text: '下达任务'
                        },
                        {
                            xtype: 'button',
                            text: '接受数据'
                        },
                        {
                            xtype: 'button',
                            text: '查看巡查路线'
                        },
                        {
                            xtype: 'button',
                            text: '浏览巡查结果'
                        }
                    ]
                }
            ]
        }
    ]

});