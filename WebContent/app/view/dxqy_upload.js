/*
 * File: app/view/dxqy_upload.js
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

Ext.define('MyApp.view.dxqy_upload', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dxqy_upload',

    requires: [
        'MyApp.view.zd_informationViewModel1',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'dxqy_upload'
    },
    height: 445,
    width: 1010,
    layout: 'border',
    title: '典型企业信息填报',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'gridpanel',
            region: 'center',
            id: 'dxqy_uploadlist',
            title: '',
            store: 'dxqy_uploadStore',
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 30,
                    dataIndex: 'zdId',
                    text: ''
                },
                {
                    xtype: 'actioncolumn',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        // var win = Ext.widget('dxqy_photoupload');
                        // console.log(win);
                        // win.show();

                        if (colIndex === undefined || colIndex < 2) {
                            return;
                        }
                        var win = Ext.widget('dxqy_photoupload');

                        var form = Ext.getCmp('photoInfoForm').getForm();
                        form.loadRecord(record);
                        if(record.get('isphoto')==1){
                            var photoName= record.get('photosName');
                            var photoPath= record.get('photosPath');
                            Ext.Ajax.request({
                                url:'achieve/read_word',
                                params:{
                                    filename:photoName,
                                    filepath:photoPath,
                                    groupFilepath:""
                                },
                                success:function(response){
                                    var winPre=Ext.getCmp('photoPreviewPanel');
                                    if(response===''){
                                        winPre.html='<span>无法预览图片</span>';
                                    }
                                    else winPre.html='<img id="blah" src="'+response.responseText+'" alt="your image" width="80%" style="margin-left:10px;margin-right:10px"/>';
                                    win.show();
                                },
                                failure:function(response){
                                    Ext.Msg.alert('失败','图片预览失败');
                                    win.show();
                                }
                            });
                        }else win.show();


                    },
                    width: 95,
                    align: 'center',
                    dataIndex: 'isinfo',
                    text: '添加照片',
                    icon: 'images/table/photo_ico.png'
                },
                {
                    xtype: 'actioncolumn',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        // var win = Ext.widget('dxqy_mapupload');
                        // console.log(win);
                        // win.show();

                        if (colIndex === undefined || colIndex < 2) {
                            return;
                        }
                        var params="filepath="+filepath+"&filename="+filename;
                        var qymc=record.get('qymc');
                        var id=record.get('id');
                        var tbrq=record.get('tbrq');
                        var params="qymc="+qymc+"&id="+id+"&tbrq="+tbrq;

                        if(record.get('ismap')===1){
                            var filepath=record.get('filePath');
                            var index=filepath.lastIndexOf('/');
                            if(index<=0){
                                Ext.Msg.alert('提示','解析文件路径出错');
                                params+='&pre=false';
                            }else{
                                var filename=filepath.substring(index+1);
                                filepath=filepath.substr(0,index)+'/';
                                params+="&filepath="+filepath+"&filename="+filename+"&pre=true";
                            }
                        }else params+='&pre=false';

                        var win = Ext.widget('dxqy_mapupload');

                        win.html="<iframe src='public/mapUpload/dxqy_mapupload.html?"+params+"'scrolling='yes' frameborder=0 width=100% height=100%></iframe>";
                        win.show();
                        var form = Ext.getCmp('mapinfoForm').getForm();
                        form.loadRecord(record);

                    },
                    align: 'center',
                    dataIndex: 'isphoto',
                    text: '添加位置',
                    icon: 'images/table/position.png'
                },
                {
                    xtype: 'actioncolumn',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        if (colIndex === undefined || colIndex < 2) {
                            return;
                        }
                        //var button=Ext.getCmp('but_save');
                        var win = Ext.widget('dxqy_adduplod');
                        win.setTitle("查看信息");
                        //button.setHidden(true);
                        win.show();

                        var form = Ext.getCmp('dxqy_addinformation').getForm();
                        form.loadRecord(record);


                    },
                    width: 83,
                    align: 'center',
                    dataIndex: 'isinfo',
                    text: '查看信息',
                    icon: 'images/table/preview.png'
                },
                {
                    xtype: 'actioncolumn',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        if (colIndex === undefined || colIndex < 2) {
                            return;
                        }
                        if(record.get('isphoto')===0){
                            Ext.Msg.alert('提示','尚未上传图片');
                            return;
                        }
                        var photoName= record.get('photosName');
                        var photoPath= record.get('photosPath');
                        console.log(photoName);
                        console.log(photoPath);
                        Ext.Ajax.request({
                            url:'achieve/read_word',
                            params:{
                                filename:photoName,
                                filepath:photoPath,
                                groupFilepath:""
                            },
                            success:function(response){
                                var win = Ext.widget('dxqy_photoPreview');

                                var form = Ext.getCmp('photoInfoForm1').getForm();
                                form.loadRecord(record);
                                var winPre=Ext.getCmp('photoPreviewPanel1');
                                if(response===''){
                                    winPre.html='<span>无法预览图片</span>';
                                    return;
                                }
                                else winPre.html='<img id="blah1" src="'+response.responseText+'" alt="your image" width="80%" style="margin-left:10px;margin-right:10px"/>';
                                console.log(win.html);
                                win.show();
                            },
                            failure:function(response){
                                Ext.Msg.alert('失败','操作失败');
                            }
                        });
                    },
                    align: 'center',
                    dataIndex: 'isphoto',
                    text: '预览照片',
                    icon: 'images/table/search.png'
                },
                {
                    xtype: 'actioncolumn',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        if(record.get('ismap')===0){
                            Ext.Msg.alert('提示','未上传位置');
                            return;
                        }
                        var filepath=record.get('filePath');
                        var index=filepath.lastIndexOf('/');
                        if(index<=0){
                            Ext.Msg.alert('提示','解析文件路径出错');
                            return;
                        }

                        var filename=filepath.substring(index+1);
                        filepath=filepath.substr(0,index)+'/';
                        var win=Ext.widget('dxqy_mapPreview');
                        var params="filepath="+filepath+"&filename="+filename;
                        win.html="<iframe src='public/mapUpload/shppreview.html?"+params+"'scrolling='yes' frameborder=0 width=100% height=100%></iframe>";
                        win.show();
                    },
                    align: 'center',
                    dataIndex: 'ismap',
                    text: '预览位置',
                    icon: 'images/table/search.png'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'qymc',
                    text: '企业名称'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'qydz',
                    text: '企业地址'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'zdbh',
                    text: '宗地编号'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sspjfw',
                    text: '所属评价范围'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'hylb',
                    text: '行业类别'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'hydm',
                    text: '行业代码'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'qyrs',
                    text: '企业人数'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sbnf',
                    text: '上报年份'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kfqmc',
                    text: '所属开发区'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kfqdm',
                    text: '开发区代码'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kfqlx',
                    text: '开发区类型'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'wctz',
                    text: '实际完成累计固定资产投资'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'yjztz',
                    text: '预计固定资产总投资'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'zcz',
                    text: '总产值'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'zsr',
                    text: '总收入'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ssze',
                    text: '税收总额'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'qyydmj',
                    text: '企业用地面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cfpt',
                    text: '厂房及配套用地面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ltcd',
                    text: '露天堆场,露天操作场地面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'dltcc',
                    text: '企业内部道路停车场面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'xzbg',
                    text: '企业内部行政办公及生活服务设施用地面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'qt',
                    text: '其他用地面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nbyld',
                    text: '厂区内部预留地面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ld',
                    text: '绿地面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'zjzmj',
                    text: '总建筑面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'jzxs',
                    text: '建筑系数'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'jdzmj',
                    text: '建筑物构筑物基底,露天堆场和露天操作场地总面积'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'rjl',
                    text: '容积率'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'photosPath',
                    text: '照片路径'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'photosName',
                    text: '照片名称'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'tbrq',
                    text: '填报日期'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'filePath',
                    text: '位置文件路径'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'shzt',
                    text: '审核状态'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'bz',
                    text: '备注'
                }
            ],
            selModel: {
                selType: 'checkboxmodel'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'searchKeyword_busInfo',
                            fieldLabel: '',
                            emptyText: '输入搜索关键字',
                            listeners: {
                                change: 'onSearchKeyword_busInfoChange'
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                Ext.getCmp('searchKeyword_busInfo').setValue('');
                                var mystore = Ext.StoreMgr.get('dxqy_uploadStore'); //获得store对象
                                mystore.load();
                            },
                            icon: 'images/table/refresh.png',
                            text: '刷新'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {

                                //var win=Ext.widget('dxqy_adduplod');
                                //win.show();
                                //mainView.disable();
                                var win = Ext.widget('dxqy_adduplod');
                                console.log(win);
                                win.show();
                            },
                            icon: 'images/table/add.png',
                            text: '添加'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                //获取数据
                                var models = Ext.getCmp('dxqy_uploadlist').getSelection();
                                if (models.length === 0){
                                    Ext.Msg.alert('提示', '请选择一条数据后再修改信息。');
                                    return;
                                } else if(models.length >1){
                                    Ext.Msg.alert('提示', '每次只能修改一条信息，请重新选择。');
                                    return;
                                }
                                //启动窗口
                                var win = Ext.widget('dxqy_adduplod');
                                win.setTitle('修改宗地信息');
                                win.show();

                                //改变Ajax url
                                var form = Ext.getCmp('dxqy_addinformation').getForm();
                                form.loadRecord(models[0]);
                                form.url = 'update_dxInfo';

                                var form1 = Ext.getCmp('photoInfo').getForm();
                                form1.loadRecord(models[0]);
                                form1.url = 'update_dxInfo';

                                var form2 = Ext.getCmp('mapinfo').getForm();
                                form2.loadRecord(models[0]);
                                form2.url = 'update_dxInfo';
                            },
                            icon: 'images/table/edit.png',
                            text: '编辑'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var grid = Ext.getCmp('dxqy_uploadlist');
                                var records = grid.getSelection();
                                if (records.length === 0) {
                                    Ext.Msg.alert('提示', '请选择一条数据后再点击删除按钮。');
                                    return;
                                } else if (records.length > 1) {
                                    Ext.Msg.alert('提示', '每次只能 一条信息。');
                                    return;
                                }
                                var record = records[0];

                                Ext.Msg.confirm('您正在删除', '企业名称为：' + record.get('qymc') + '，企业代码为：'+record.get('dxdm')+'，<br/> 确认删除？', getResult);
                                function getResult(confirm)
                                {
                                    console.log('confirm:', confirm);
                                    if (confirm == "yes"){
                                        var id = record.get("id");
                                        console.log('id:',id);
                                        Ext.Ajax.request(
                                        {
                                            url : 'del_dxinfo',
                                            params :
                                            {
                                                id : id
                                            },
                                            success : function (response){
                                                Ext.Msg.alert('成功提示', '记录删除成功。');
                                                //successResult();
                                                var mystore = Ext.StoreMgr.get('dxqy_uploadStore');
                                                mystore.load();
                                            },
                                            failure : function (response){
                                                failedResult();
                                                Ext.Msg.alert('失败提示', '记录删除失败。');
                                            }
                                        });
                                    }
                                }
                            },
                            icon: 'images/table/delete.png',
                            text: '删除'
                        }
                    ]
                }
            ]
        }
    ],

    onSearchKeyword_busInfoChange: function(field, newValue, oldValue, eOpts) {
        var getKeyword = Ext.getCmp('searchKeyword_busInfo').getValue();
        console.log("keyword:",getKeyword);
        var mystore = Ext.StoreMgr.get('dxqy_uploadStore'); //获得store对象
        //在load事件中添加参数
        mystore.load(
            {
                params :
                {
                    searchKeyword : getKeyword
                }
            }
        );
    }

});