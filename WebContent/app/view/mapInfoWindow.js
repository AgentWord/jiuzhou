/*
 * File: app/view/mapInfoWindow.js
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

Ext.define('MyApp.view.mapInfoWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.mapInfoWindow',

    requires: [
        'Ext.grid.property.Grid'
    ],

    height: 229,
    width: 253,
    layout: 'fit',
    title: '属性信息',
    titleCollapse: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'propertygrid',
            id: 'mapInfoWindowGrid',
            titleCollapse: true,
            source: {
                'Property 1': 'String',
                'Property 2': true,
                'Property 3': '2015-05-23T15:57:54',
                'Property 4': 123
            },
            listeners: {
                beforereconfigure: 'onMapInfoWindowGridBeforeReconfigure'
            }
        }
    ],

    onMapInfoWindowGridBeforeReconfigure: function(gridpanel, store, columns, oldStore, oldColumns, eOpts) {
        var source = gridpanel.getSource();
        if(!source){
            return;
        }
        //获取中英文对照表
        var nameIndexStore = Ext.StoreMgr.get('sys_MapAttrNameIndexStore');
        var nameIndexRecords = nameIndexStore.getRange();
        var nameIndex = {};
        for(var i in nameIndexRecords){
            var name = nameIndexRecords[i].data;
            nameIndex[name.enName] = name.cnName;
        }

        //替换
        var newSource = {};
        for(var name in source){
            var cnName = nameIndex[name];
            if(cnName){
                newSource[cnName]=source[name];
            }else{
                newSource[name] = source[name];
            }
        }
        gridpanel.setSource(newSource);
    }

});