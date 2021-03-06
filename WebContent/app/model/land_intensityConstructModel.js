/*
 * File: app/model/land_intensityConstructModel.js
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

Ext.define('MyApp.model.land_intensityConstructModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.Number'
    ],

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            name: 'kfqName'
        },
        {
            name: 'kfqMap'
        },
        {
            name: 'calcDate'
        },
        {
            type: 'float',
            name: 'mainYjcczmj'
        },
        {
            type: 'float',
            name: 'mainBuildWeight'
        },
        {
            type: 'float',
            name: 'mainBuildIdeal'
        },
        {
            type: 'float',
            name: 'mainConstruct'
        },
        {
            type: 'float',
            name: 'developYjcczmj'
        },
        {
            type: 'float',
            name: 'developBuildWeight'
        },
        {
            type: 'float',
            name: 'developBuildIdeal'
        },
        {
            type: 'float',
            name: 'developConstruct'
        },
        {
            type: 'float',
            name: 'description'
        }
    ]
});