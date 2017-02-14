/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
    models: [
        'thematic_LanduseIndexValueModel',
        'costInfoModel'
    ],
    stores: [
        'thematic_LanduseIndexValueStore',
        'landKfqSpTypeComboStore'
    ],
    views: [
        'thematic_LanduseIndexValue',
        'myKfqMap',
        'enterprise_IntensityScoreCheck',
        'kfq_preview',
        'thematic_landuseDataImport',
        'achievement_importWin',
        'projectManagement',
        'db_projectInfoAddWindow',
        'db_projectInfoWindow',
        'baoXIaoManagement',
        'baoXiao_chailv',
        'baoXiao_richang'
    ],
    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MainView');
    }

});
