/*
 * File: app/view/survey_TypicalEnterprise.js
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

Ext.define('MyApp.view.survey_TypicalEnterprise', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.survey_TypicalEnterprise',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Number',
        'Ext.grid.View'
    ],

    height: 671,
    width: 786,
    layout: 'border',
    title: '典型企业调查',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'center',
            split: true,
            html: '<div id = "survey_TypicalEnterprise_div" style = "width=100%;height:100%;"></div>',
            id: 'survey_TypicalEnterprise_MapPanel',
            layout: 'fit',
            title: '',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'ent_check_gradeCombo1',
                            width: 181,
                            fieldLabel: '开发区级别',
                            labelWidth: 80,
                            store: [
                                '全部',
                                '国家级',
                                '省级',
                                '示范区'
                            ],
                            valueField: 'mapUrl'
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'ent_check_typeCombo1',
                            width: 190,
                            fieldLabel: '开发区类型',
                            labelWidth: 80,
                            store: [
                                '全部',
                                '工业主导型',
                                '产城融合型'
                            ],
                            valueField: 'mapUrl'
                        },
                        {
                            xtype: 'combobox',
                            id: 'survey_TypicalEnterprise_LayerCombo',
                            width: 300,
                            fieldLabel: '选择开发区',
                            labelWidth: 80,
                            displayField: 'mapName',
                            store: 'systemMapQYYDLayerStore',
                            valueField: 'mapUrl'
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'ent_check_yearCombo1',
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
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top'
                }
            ],
            listeners: {
                afterrender: 'onPanelAfterRender1'
            }
        },
        {
            xtype: 'gridpanel',
            region: 'south',
            split: true,
            height: 250,
            id: 'survey_TypicalEnterpriseGrid',
            collapsed: true,
            title: '属性数据',
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'numbercolumn',
                    width: 80,
                    dataIndex: 'DXDM',
                    text: '企业代码',
                    format: '0,000'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'QYMC',
                    text: '企业名称'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'QYDZ',
                    text: '企业地址'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'SSPJFW',
                    text: '所属评价范围'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'HYLB',
                    text: '行业类别'
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    dataIndex: 'HYDM',
                    text: '行业代码',
                    format: '0,000'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'QYRS',
                    text: '企业人数/人',
                    format: '0,000'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'YJZTZ',
                    text: '预计总投资/万元'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'WCTZ',
                    text: '完成总投资/万元'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'ZSR',
                    text: '总收入/万元'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'ZCZ',
                    text: '总产值/万元'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'SSZE',
                    text: '税收总额/万元'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'QYYDMJ',
                    text: '企业用地面积/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'CFPT',
                    text: '厂房配套面积/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'XZBG',
                    text: '行政办公面积/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'LTCD',
                    text: '露天操作面积/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'NBYLD',
                    text: '内部预留地/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'DLTCC',
                    text: '道路停车场/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'LD',
                    text: '绿地面积/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'QT',
                    text: '其他面积/公顷'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'ZJZMJ',
                    text: '总建筑面积/万平方米'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'RJL',
                    text: '容积率'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'JDZMJ',
                    text: '基底总面积/万平方米'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'JZXS',
                    text: '建筑系数/%'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'BZ',
                    text: '备注'
                }
            ]
        }
    ],

    onPanelAfterRender1: function(component, eOpts) {
        //加入地图的js文件
        var head = document.getElementsByTagName('head')[0];
        var script= document.createElement("script");
        script.type = "text/javascript";
        script.src="mapjs/survey_TypicalEnterprise_map.js";
        head.appendChild(script);
    }

});