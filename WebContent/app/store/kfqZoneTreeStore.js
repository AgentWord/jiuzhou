/*
 * File: app/store/kfqZoneTreeStore.js
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

Ext.define('MyApp.store.kfqZoneTreeStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'kfqZoneTreeStore',
            root: {
                text: 'Root',
                id: 'root',
                expanded: true,
                children: [
                    {
                        id: '1',
                        text: 'First node',
                        leaf: false,
                        children: [
                            {
                                id: '3',
                                text: 'First child node',
                                leaf: true
                            },
                            {
                                id: '4',
                                text: 'Second child node',
                                leaf: true
                            }
                        ]
                    },
                    {
                        id: '2',
                        text: 'Second node',
                        leaf: true
                    }
                ]
            },
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});