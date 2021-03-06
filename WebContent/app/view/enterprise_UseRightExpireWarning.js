/*
 * File: app/view/enterprise_UseRightExpireWarning.js
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

Ext.define('MyApp.view.enterprise_UseRightExpireWarning', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.enterprise_UseRightExpireWarning',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.toolbar.Separator'
    ],

    html: '<div id="map" ></div>',
    layout: 'fit',
    title: '闲置土地监控',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'gridpanel',
            store: 'enterprise_ExpireAlertStore',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kfqdm',
                    text: '开发区代码'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kfqmc',
                    text: '开发区名称'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'tbbh',
                    text: '图斑编号'
                },
                {
                    xtype: 'gridcolumn',
                    width: 111,
                    dataIndex: 'qymc',
                    text: '用地类型'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sspjfw',
                    text: '土地闲置情况'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'hylb',
                    text: '认定闲置依据'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'dqsj',
                    text: '闲置时间'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'ent_useRightExpire_searchField'
                        },
                        {
                            xtype: 'button',
                            icon: 'images/table/search.png',
                            text: '搜索',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            text: '全部闲置土地',
                            listeners: {
                                click: 'onButtonClick2'
                            }
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            text: '已到期企业',
                            listeners: {
                                click: 'onButtonClick21'
                            }
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            text: '三月内到期企业',
                            listeners: {
                                click: 'onButtonClick11'
                            }
                        }
                    ]
                }
            ]
        }
    ],

    onButtonClick: function(button, e, eOpts) {
        var keyword = Ext.getCmp('ent_useRightExpire_searchField').getValue();
        var mystore = Ext.StoreMgr.get('enterprise_ExpireAlertStore'); //获得store对象
        //在load事件中添加参数
        mystore.load({
            params: {
                searchKeyword: keyword,
                inmonths: ''
            }
        });

    },

    onButtonClick2: function(button, e, eOpts) {
        var mystore = Ext.StoreMgr.get('enterprise_ExpireAlertStore'); //获得store对象
        //在load事件中添加参数
        mystore.load({
            params: {
                searchKeyword: '',
                inmonths: ''
            }
        });

    },

    onButtonClick21: function(button, e, eOpts) {
        var mystore = Ext.StoreMgr.get('enterprise_ExpireAlertStore'); //获得store对象
        //在load事件中添加参数
        mystore.load({
            params: {
                searchKeyword: '',
                inmonths: 0
            }
        });

    },

    onButtonClick11: function(button, e, eOpts) {
        var mystore = Ext.StoreMgr.get('enterprise_ExpireAlertStore'); //获得store对象
        //在load事件中添加参数
        mystore.load({
            params: {
                searchKeyword: '',
                inmonths: 3
            }
        });

    }

});