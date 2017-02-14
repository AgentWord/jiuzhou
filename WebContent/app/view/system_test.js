/*
 * File: app/view/system_test.js
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

Ext.define('MyApp.view.system_test', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.system_test',

    requires: [
        'MyApp.view.business_uploadPhotoViewModel1',
        'Ext.form.field.File',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.TextArea',
        'Ext.form.field.Date',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Date',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'system_test'
    },
    height: 518,
    width: 959,
    layout: 'border',
    title: '企业上传图片数据',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            width: '30%',
            layout: 'border',
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    autoScroll: true,
                    height: 175,
                    layout: 'absolute',
                    title: '图片信息录入',
                    listeners: {
                        afterrender: 'onPanelAfterRender1'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            x: 10,
                            y: 10,
                            fieldLabel: '上传文件'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    region: 'north',
                    height: '50%',
                    id: 'photo_info1',
                    layout: 'absolute',
                    jsonSubmit: true,
                    url: 'add_Photos',
                    items: [
                        {
                            xtype: 'button',
                            handler: function() {
                                var myform = Ext.getCmp('photo_info').getForm();
                                //var choose=Ext.getCmp('choosePicture').value;
                                //var photo_path=Ext.getCmp('photo_path');
                                //var path=Ext.widget('photoPath').value;
                                if (myform.isValid())
                                {
                                    console.log("控件有效");

                                    //sconsole.log(choose);
                                    myform.submit({
                                        //url : 'add_picture',
                                        success : function (form, action)
                                        {
                                            console.log("成功进入");
                                            Ext.Msg.alert('成功', '图片上传成功。');
                                            var mystore = Ext.StoreMgr.get('Business_photoStore'); //获得store对象
                                            mystore.reload();
                                            var xtype = 'business_uploadPhoto';
                                            var mainView = Ext.getCmp('mainView');
                                            mainView.removeAll();
                                            mainView.add(Ext.widget(xtype));
                                        },
                                        failure: function(form, action){
                                            Ext.Msg.alert('失败', '图片上传失败，请重试。');
                                        }
                                    });
                                }
                                else
                                {
                                    Ext.Msg.alert('注意', '填写的信息有误，请检查！');
                                }
                            },
                            x: 400,
                            y: 190,
                            text: '提交审核'
                        },
                        {
                            xtype: 'textareafield',
                            x: 30,
                            y: 170,
                            width: 360,
                            fieldLabel: '备注',
                            labelWidth: 70,
                            name: 'other',
                            value: '无'
                        },
                        {
                            xtype: 'textfield',
                            x: 30,
                            y: 130,
                            id: 'title_photo1',
                            fieldLabel: '图片标题',
                            labelWidth: 70,
                            name: 'photoTitle'
                        },
                        {
                            xtype: 'textfield',
                            x: 30,
                            y: 80,
                            fieldLabel: '上传用户',
                            labelWidth: 70,
                            name: 'uploadUser',
                            value: '企业用户'
                        },
                        {
                            xtype: 'textfield',
                            x: 30,
                            y: 0,
                            fieldLabel: '项目编号',
                            labelWidth: 70,
                            name: 'proCode',
                            value: '20160710****'
                        },
                        {
                            xtype: 'textfield',
                            x: 30,
                            y: 40,
                            id: 'photoPath3',
                            width: 400,
                            fieldLabel: '图片路径',
                            labelWidth: 70,
                            name: 'photoPath',
                            submitValue: false,
                            blankText: '此项不能为空',
                            emptyText: '本地图片路径',
                            maxLengthText: 'The maximum length for this field is {200}'
                        },
                        {
                            xtype: 'datefield',
                            x: 280,
                            y: 80,
                            width: 170,
                            fieldLabel: '日期',
                            labelWidth: 30,
                            name: 'upDate',
                            format: 'Y-m-d'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    title: '图片列表',
                    store: 'Business_photoStore',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            width: 60,
                            dataIndex: 'string',
                            text: '序号'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            defaultWidth: 200,
                            dataIndex: 'photoTitle',
                            text: '图片标题'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'uploadUser',
                            text: '上传用户'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'upDate',
                            text: '上传时间'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'center',
            html: '<div id="localImag" style="width:100%,height:100%;"><img id="preview" src="images/login/login_center_left.jpg" width="100%" height="100%" style="display: block; width: 100%; height: 100%;"></div>',
            layout: 'border',
            animCollapse: false,
            collapseDirection: 'left',
            collapseFirst: false,
            collapsed: false,
            collapsible: false,
            title: '图片预览',
            titleAlign: 'center',
            titleCollapse: false
        },
        {
            xtype: 'panel',
            region: 'east',
            html: '<p>\n<!-- 用于文件上传的表单元素 -->\n<form name="demoForm" id="demoForm" method="post" enctype="multipart/form-data" action="javascript: uploadAndSubmit();">\n<p>选择上传文件:\n\n<!-- //选择实现了图片上传前的预览 -->\n<td align="left" style="padding-top:10px;">\n<input type="file" name="file" id="doc" style="width:300px;" onchange="javascript:setImagePreview();">\n\n</td>\n</p>\n<div id="fileName"></div>\n<div id="fileSize"></div>\n<div id="fileType"></div>\n<p>\n<input type="submit" value="确认上传" />\n</p>\n\n</form>\n\n<div>上传进度: <span id="bytesRead">  </span> / <span id="bytesTotal"></span> </div>\n<p>\n<input type="submit" value="预览图片" onclick="imgPreview();" />\n</p>\n<p>\n<input type="submit"   value="下载" onclick="funTestDown();"/>\n<a id="download"></a>\n</p>\n</p>',
            width: '40%',
            title: 'My Panel',
            listeners: {
                afterrender: 'onPanelAfterRender'
            }
        }
    ],

    onPanelAfterRender1: function(component, eOpts) {
        /*Ext.create('Ext.form.Panel', {
            title: '上传照片',
            width: 400,
            bodyPadding: 10,
            frame: true,
            renderTo: Ext.getBody(),
            items: [{
                xtype: 'filefield',
                name: 'photo',
                fieldLabel: 'Photo',
                labelWidth: 50,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择照片'
            }],

            buttons: [{
                text: 'Upload',
                handler: function() {
                    var form = this.up('form').getForm();
                    if(form.isValid()){
                        form.submit({
                            url: 'mapjs/uploadFiles.jsp',
                            waitMsg: '正在上传照片...',
                            success: function(fp, o) {
                                Ext.Msg.alert('上传成功', 'Your photo "' + o.result.file + '" has been uploaded.');
                            }
                        });
                    }
                }
            }]
        });*/
    },

    onPanelAfterRender: function(component, eOpts) {
        //加入地图的js文件
        var head = document.getElementsByTagName('head')[0];
        var script= document.createElement("script");
        script.type = "text/javascript";
        script.language="javascript";
        script.src="mapjs/upload.js";
        script.charset="UTF-8";
        head.appendChild(script);
    }

});