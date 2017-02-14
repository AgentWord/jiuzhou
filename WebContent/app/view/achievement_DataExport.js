/*
 * File: app/view/achievement_DataExport.js
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

Ext.define('MyApp.view.achievement_DataExport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.achievement_DataExport',

    requires: [
        'MyApp.view.achievement_DataExportViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'achievement_dataexport'
    },
    height: 756,
    width: 1007,
    layout: 'border',
    title: '成果上传导出',
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'form',
            dock: 'top',
            height: 40,
            id: 'queryFileForm',
            width: 150,
            layout: 'absolute',
            bodyPadding: 0,
            title: '',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'kfqnameText',
                            width: 280,
                            fieldLabel: '开发区',
                            labelWidth: 50,
                            name: 'kfqname',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            autoSelect: false,
                            displayField: 'kfqmc',
                            queryMode: 'local',
                            store: 'kfqInfoStore',
                            valueField: 'kfqdm'
                        },
                        {
                            xtype: 'combobox',
                            id: 'kfqyearText',
                            width: 140,
                            fieldLabel: '年度',
                            labelWidth: 40,
                            name: 'kfqyear',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            editable: false,
                            forceSelection: true,
                            store: [
                                2010,
                                2011,
                                2012,
                                2013,
                                2014,
                                2015,
                                2016,
                                2017,
                                2018,
                                2019,
                                2020,
                                2021,
                                2022,
                                2023,
                                2024,
                                2025,
                                2026,
                                2027,
                                2028,
                                2029,
                                2030
                            ],
                            listeners: {
                                change: 'onKfqyearTextChange'
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var kfqname=Ext.getCmp('kfqnameText').getDisplayValue();
                                var kfqdm=Ext.getCmp('kfqnameText').value;
                                var kfqyear=Ext.getCmp('kfqyearText').value;
                                var mystore = Ext.StoreMgr.get('achievementFileStore'); //获得store对象
                                mystore.reload({
                                    params:{
                                        kfqmc:kfqname,
                                        kfqyear:kfqyear,
                                        kfqdm:kfqdm
                                    }
                                });
                            },
                            icon: 'images/table/search.png',
                            text: '查询'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var kfqdm=Ext.getCmp('kfqnameText').value;
                                var kfqname=Ext.getCmp('kfqnameText').getDisplayValue();
                                if(kfqname===null||kfqname===''){Ext.Msg.alert('提示','请输入开发区名称');return;}
                                var kfqyear=Ext.getCmp('kfqyearText').value;
                                if(kfqyear===null||kfqyear===''){Ext.Msg.alert('提示','请输入评价年度');return;}

                                var html='<iframe src=\'office/supplementfiles.html?';
                                html+='kfqname='+kfqdm+'-'+kfqname+'&kfqyear='+kfqyear;
                                var win=Ext.widget('achievement_importWin');
                                win.html=html+'\' frameborder=0 width=100% height=100%></iframe>';
                                win.show();

                            },
                            icon: 'images/table/upload.png',
                            text: '上传文件'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var kfqname=Ext.getCmp('kfqnameText').getDisplayValue().trim();
                                var kfqdm=Ext.getCmp('kfqnameText').value;
                                if(kfqname===null||kfqname===""){
                                    alert("请输入开发区名称");
                                    return;
                                }
                                var kfqyear=Ext.getCmp('kfqyearText').value;

                                var url="achieve/export_file_zip?kfqname="+kfqname+"&kfqyear="+kfqyear+'&kfqdm='+kfqdm;
                                window.open(url);
                            },
                            icon: 'images/table/download.png',
                            text: '打包导出'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var kfqname=Ext.getCmp('kfqnameText').getDisplayValue().trim();
                                var kfqdm=Ext.getCmp('kfqnameText').value;
                                if(kfqname===null||kfqname===""){
                                    alert("请输入开发区名称");
                                    return;
                                }
                                var kfqyear=Ext.getCmp('kfqyearText').value;
                                var grid = Ext.getCmp('achievementfileGridPanel');
                                var record = grid.getSelectionModel().getSelection();
                                var length=record.length;
                                console.log(kfqname+kfqyear+length);
                                if(length === 0){
                                    Ext.Msg.alert('提示','请先选择您要导出的表格（至少1条）！');
                                    return;
                                }else if(kfqname===''){
                                    Ext.Msg.alert('提示','请先选择开发区！');
                                    return;
                                }else if(kfqyear===''&&kfqyear.length!=4){
                                    Ext.Msg.alert('提示','请先选择评价年度！');
                                    return;
                                }
                                var ids=[length];
                                for(var i=0;i<length;i++){
                                    ids[i]=record[i].get('id');
                                }
                                console.log('ids:'+ids);
                                Ext.Msg.confirm('提示', '删除文件不可恢复，确认删除所选文件记录吗？<br>', getResult);
                                function getResult(confirm)
                                {
                                    if (confirm == "yes"){
                                        Ext.Ajax.request(
                                        {
                                            url : 'achieve/delete_files',
                                            params :{ids:ids},
                                            success : function (response){
                                                console.log("delete file success");
                                                console.log(JSON.stringify(response.responseText));
                                                var re=response.responseText;
                                                if(re=="true"){
                                                    Ext.Msg.alert('提示', '删除文件成功');
                                                    var kfqdm=Ext.getCmp('kfqnameText').value;
                                                    var kfqname=Ext.getCmp('kfqnameText').getDisplayValue();
                                                    var kfqyear=Ext.getCmp('kfqyearText').value;
                                                    var mystore = Ext.StoreMgr.get('achievementFileStore'); //获得store对象
                                                    mystore.reload({
                                                        params:{
                                                            kfqmc:kfqname,
                                                            kfqyear:kfqyear,
                                                            kfqdm:kfqdm
                                                        }
                                                    });
                                                }else{
                                                    Ext.Msg.alert('提示', '删除文件失败');
                                                }
                                            },
                                            failure : function (response){
                                                //failedResult();
                                                Ext.Msg.alert('提示', '删除文件失败');
                                            }
                                        });
                                    }
                                }
                            },
                            icon: 'images/table/delete2.png',
                            text: '批量删除'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var kfqdm=Ext.getCmp('kfqnameText').value;
                                var kfqname=Ext.getCmp('kfqnameText').getDisplayValue();
                                if(kfqname===null||kfqname===''){Ext.Msg.alert('提示','请输入开发区名称');return;}
                                var kfqyear=Ext.getCmp('kfqyearText').value;
                                if(kfqyear===null||kfqyear===''){Ext.Msg.alert('提示','请输入评价年度');return;}

                                var html='<iframe src=\'office/uploadfiles.html?';
                                html+='kfqname='+kfqdm+'-'+kfqname+'&kfqyear='+kfqyear;
                                var win=Ext.widget('achievement_importHisWin');
                                win.html=html+'\' frameborder=0 width=100% height=100%></iframe>';
                                win.show();

                            },
                            icon: 'images/table/upload.png',
                            text: '历史成果上传'
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            region: 'center',
            autoScroll: true,
            id: 'achievementfileGridPanel',
            title: '',
            store: 'achievementFileStore',
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'kfqName',
                    text: '开发区'
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    dataIndex: 'kfqYear',
                    text: '年份'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'filetype',
                    text: '数据类型'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'filename',
                    text: '文件名'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'filesize',
                    text: '文件大小'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'uploader',
                    text: '上传人'
                },
                {
                    xtype: 'gridcolumn',
                    width: 160,
                    dataIndex: 'uploadTime',
                    text: '上传时间'
                },
                {
                    xtype: 'actioncolumn',
                    width: 60,
                    dataIndex: 'readCount',
                    text: '预览',
                    icon: 'images/table/search.png',
                    items: [
                        {
                            handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                var filetype=record.get('filetype').toLowerCase();
                                var types=['.doc','.jpg','.docx','.png','.xls','.xlsx','.shp'];
                                var canread=false;
                                for(var i=0;i<types.length;i++){
                                    if(filetype==types[i]){
                                        canread=true;break;
                                    }
                                }
                                if(!canread){
                                    Ext.Msg.alert('提示', '暂不支持该类型文件预览');
                                    return;
                                }
                                var nwin = window.open();
                                var filepath=record.get('filepath');
                                var filename=record.get('filename');
                                var groupFilepath=record.get('groupFilepath');
                                console.log(filepath);
                                if(filetype=='.shp'){
                                    var href="public/mapUpload/shppreview.html?filepath="+filepath+"&filename="+filename;
                                    href+="&groupFilepath="+groupFilepath;
                                    nwin.location=href;
                                }
                                else{
                                    Ext.Ajax.request({
                                        url : 'achieve/read_word',
                                        params :
                                        {filepath:filepath,
                                            filename:filename,
                                            groupFilepath:groupFilepath
                                        },
                                        success : function (response){
                                            console.log("read word success");
                                            console.log(JSON.stringify(response.responseText));
                                            //me.openUrl(response.responseText);
                                            var s=response.responseText;
                                            if(s!=='null'&&s!==''){
                                            nwin.location=response.responseText;}
                                            else{
                                                nwin.close();
                                                Ext.Msg.alert('失败提示', '读取文件错误');
                                            }
                                        },
                                        failure : function (response){
                                            nwin.close();
                                            Ext.Msg.alert('失败提示', '读取文件失败');
                                        }
                                    });
                                }
                            },
                            icon: 'images/table/search.png'
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    width: 60,
                    dataIndex: 'noticeState',
                    text: '删除',
                    icon: '',
                    items: [
                        {
                            handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                var id=record.get('id');
                                var filename=record.get('filename');
                                Ext.Msg.confirm('提示', '删除文件不可恢复，确认删除该文件记录吗？<br>'+filename, getResult);
                                function getResult(confirm)
                                {
                                    if (confirm == "yes"){
                                        console.log(id);
                                        Ext.Ajax.request(
                                        {
                                            url : 'achieve/delete_file',
                                            params :
                                            {id:id},
                                            success : function (response){
                                                console.log("delete file success");
                                                console.log(JSON.stringify(response.responseText));
                                                var re=response.responseText;
                                                if(re=="true"){
                                                    Ext.Msg.alert('提示', '删除文件成功');
                                                    var kfqdm=Ext.getCmp('kfqnameText').value;
                                                    var kfqname=Ext.getCmp('kfqnameText').getDisplayValue();
                                                    var kfqyear=Ext.getCmp('kfqyearText').value;
                                                    var mystore = Ext.StoreMgr.get('achievementFileStore'); //获得store对象
                                                    mystore.reload({
                                                        params:{
                                                            kfqmc:kfqname,
                                                            kfqyear:kfqyear,
                                                            kfqdm:kfqdm
                                                        }
                                                    });
                                                }else{
                                                    Ext.Msg.alert('提示', '删除文件失败');
                                                }

                                            },
                                            failure : function (response){
                                                //failedResult();
                                                Ext.Msg.alert('提示', '删除文件失败');
                                            }
                                        });
                                    }
                                }
                            },
                            icon: 'images/table/delete2.png'
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    hidden: true,
                    width: 80,
                    dataIndex: 'noticeState',
                    text: '下载',
                    items: [
                        {
                            handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                var id=record.get('id');
                                var filepath=record.get('filepath');
                                var filename=record.get('filename');
                                var groupFilepath=record.get('groupFilepath');
                                console.log(id);
                                var url="achieve/export_file?filename="+filename+"&filepath="+filepath+"&groupFilepath="+groupFilepath;
                                window.open(url);
                            },
                            icon: 'images/table/download.png'
                        }
                    ]
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        //此方法文件路径中有空格，不适用 用replace方法把空格替换为%20
                        var filepath=record.get('filepath').replace(/\s+/g,"%20");
                        var filename=record.get('filename').replace(/\s+/g,"%20");
                        var groupFilepath=record.get('groupFilepath').replace(/\s+/g,"%20");
                        return '<a href=achieve/export_file?filepath='+filepath+"&filename="+filename+"&groupFilepath="+groupFilepath+">导出</a>";
                    },
                    width: 60,
                    dataIndex: 'noticeState',
                    text: '下载'
                }
            ],
            features: [
                {
                    ftype: 'grouping',
                    groupHeaderTpl: [
                        '{name}({rows.length} 个)'
                    ],
                    hideGroupedHeader: true,
                    startCollapsed: true
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            }
        }
    ],

    onKfqyearTextChange: function(field, newValue, oldValue, eOpts) {
        var kfqname=Ext.getCmp('kfqnameText').getDisplayValue();
        console.log(kfqname);
        if(kfqname===null||kfqname==="")return;
        var kfqdm=Ext.getCmp('kfqnameText').value;
        var kfqyear=newValue;
        var mystore = Ext.StoreMgr.get('achievementFileStore'); //获得store对象
        mystore.reload({
            params:{
                   kfqmc:kfqname,
                   kfqyear:kfqyear,
                kfqdm:kfqdm
        }
        });
    }

});