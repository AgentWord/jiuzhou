/*
 * File: app/view/db_RoleRightSettingWindow.js
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

Ext.define('MyApp.view.db_RoleRightSettingWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.db_RoleRightSettingWindow',

    requires: [
        'MyApp.view.db_RoleInfoAddWindowViewModel2',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'db_rolerightsettingwindow'
    },
    height: 400,
    id: 'db_RoleRightSettingWindow',
    width: 651,
    layout: 'fit',
    title: '角色权限设置',
    defaultListenerScope: true,

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        autoScroll: true,
                        id: 'db_roleRightSettingGrid',
                        store: 'uRightInfoStore',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 300,
                                dataIndex: 'rightName',
                                text: '权限名称'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 200,
                                dataIndex: 'description',
                                text: '描述'
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
                                        xtype: 'label',
                                        text: '为角色：'
                                    },
                                    {
                                        xtype: 'textfield',
                                        hidden: true,
                                        id: 'db_roleRightSet_RoleIdField',
                                        width: 100,
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'db_roleRightSet_RoleField',
                                        width: 100,
                                        readOnly: true
                                    },
                                    {
                                        xtype: 'label',
                                        text: '设置权限。该角色具有：'
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'db_roleRightSet_RoleNameField',
                                        width: 140,
                                        readOnly: true,
                                        displayField: 'displayName',
                                        store: 'system_roleNameStore',
                                        valueField: 'roleName'
                                    },
                                    {
                                        xtype: 'label',
                                        text: '权限。'
                                    },
                                    {
                                        xtype: 'tbfill'
                                    },
                                    {
                                        xtype: 'button',
                                        text: '保存设置',
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
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

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.getCmp('db_RoleRightSettingWindow');
        var grid = Ext.getCmp('db_roleRightSettingGrid');
        var records = grid.getSelection();
        var rightIds = [];
        for(var i in records){
            rightIds.push(records[i].get('rightId'));
        }
        var roleId;
        var roleIdField = Ext.getCmp('db_roleRightSet_RoleIdField');
        if(roleIdField){
            roleId = roleIdField.getValue();
        }
        if(rightIds.length === 0 || !roleId){
            Ext.Msg.alert('失败', '保存失败，设置错误。');
        }

        Ext.Ajax.request({
            url: 'add_RoleRight',
            params: {
                "roleId" : roleId,
                "rightIds":rightIds
            },
            success: function(){
                Ext.Msg.alert('成功', '角色权限设置成功！。');
                win.close();
            },
            failure: function(){console.log('failure');}
        });
    }

});