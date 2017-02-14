/*
 * File: app/view/MainView.js
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

Ext.define('MyApp.view.MainView', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainview',

    requires: [
        'MyApp.view.MainViewViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.toolbar.Fill',
        'Ext.menu.Menu',
        'Ext.menu.Item'
    ],

    viewModel: {
        type: 'mainview'
    },
    itemId: 'mainView',
    layout: 'border',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'north',
            height: 90,
            html: '<h1 style="color:#197bc1;;font-family:Microsoft YaHei;margin:10px 0px 0px 35px;"> 北京世纪九州公司管理系统',
            itemId: 'headerPanel',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    height: 43,
                    width: 150,
                    items: [
                        {
                            xtype: 'button',
                            id: 'homePanel',
                            text: '主页',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '当前时间：'
                        },
                        {
                            xtype: 'label',
                            height: 40,
                            html: '<p id="time">当前时间：</p>',
                            text: '',
                            listeners: {
                                afterrender: 'onLabelAfterRender'
                            }
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'label',
                            text: '当前用户：'
                        },
                        {
                            xtype: 'label',
                            html: '<%=request.getUserPrincipal().getName();%>',
                            id: 'mainview_curUernameLabel',
                            text: 'admin',
                            listeners: {
                                render: 'onMainview_curUernameLabelRender'
                            }
                        },
                        {
                            xtype: 'button',
                            href: 'j_spring_security_logout',
                            hrefTarget: '_parent',
                            text: '退出'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            id: 'mainLeftMenuPanel',
            itemId: 'menuPanel',
            width: 250,
            layout: 'accordion',
            collapseDirection: 'left',
            items: [
                {
                    xtype: 'panel',
                    title: '项目客户管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu1',
                            placeholderCollapseHideMode: 2,
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'projectManagement',
                                    hideOnClick: false,
                                    text: '项目管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'enterprise_kfqIntensity',
                                    hideOnClick: false,
                                    text: '客户管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    hideMode: 'visibility',
                                    id: 'enterprise_UseRightExpireWarning',
                                    hideOnClick: false,
                                    text: '其他'
                                }
                            ],
                            listeners: {
                                click: 'onMenu1Click'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    collapsed: true,
                    title: '财务报销管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'baoXIaoManagement',
                                    hideOnClick: false,
                                    text: '报销管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'kfq_manager1',
                                    hideOnClick: false,
                                    text: '开发区信息管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'zdxx_upload',
                                    hideOnClick: false,
                                    text: '日常报销'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'dxqy_upload1',
                                    hideOnClick: false,
                                    text: '借还款'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    hideMode: 'visibility',
                                    id: 'kfq_uploadDataCheck1',
                                    hideOnClick: false,
                                    text: '开发区填报数据审核'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click91'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    collapsed: true,
                    title: '工资福利管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'taskNotice',
                                    hideOnClick: false,
                                    text: '任务下发'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'kfq_manager',
                                    hideOnClick: false,
                                    text: '工资查询'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'zdxx_upload2',
                                    hideOnClick: false,
                                    text: '补助申请'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'dxqy_upload',
                                    hideOnClick: false,
                                    text: '数据填报【典型企业】'
                                },
                                {
                                    xtype: 'menuitem',
                                    hideMode: 'visibility',
                                    id: 'kfq_uploadDataCheck',
                                    hideOnClick: false,
                                    text: '工资表单'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    hideMode: 'visibility',
                                    id: 'system_test',
                                    hideOnClick: false,
                                    text: '功能测试'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click9'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: '公司人事管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'survey_DataReceive',
                                    hideOnClick: false,
                                    text: '社保缴纳'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'survey_DataManager',
                                    hideOnClick: false,
                                    text: '人员入/离职'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'survey_zdxx',
                                    hideOnClick: false,
                                    text: '人事考评'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'survey_TypicalEnterprise',
                                    hideOnClick: false,
                                    text: '人事变动'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'survey_Landuse',
                                    hideOnClick: false,
                                    text: '档案管理'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click2'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    title: '',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityuse_IndexCurrentValue',
                                    hideOnClick: false,
                                    text: '指标现状值计算'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityuse_IndexWeightDetermine',
                                    hideOnClick: false,
                                    text: '指标权重确定'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityuse_IndexIdealValueBinding',
                                    hideOnClick: false,
                                    text: '指标理想值绑定'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityuse_IndexStandard',
                                    hideOnClick: false,
                                    text: '指标标准化处理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityuse_IntensityScoreCalculation',
                                    hideOnClick: false,
                                    text: '集约度分值计算'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    title: '集约潜力测算',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityPotential_Expansion',
                                    hideOnClick: false,
                                    text: '扩展潜力测算'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityPotential_Construct',
                                    hideOnClick: false,
                                    text: '结构潜力测算'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityPotential_Intension',
                                    hideOnClick: false,
                                    text: '强度潜力测算'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'intensityPotential_Manage',
                                    hideOnClick: false,
                                    text: '管理潜力测算'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: '公司部门管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu2',
                            placeholderCollapseHideMode: 2,
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'thematic_landuseValueCalculation',
                                    hideOnClick: false,
                                    text: '董事会'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'thematic_LanduseConstructionContrast',
                                    hideOnClick: false,
                                    text: '研发部'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'thematic_LanduseConstructionChangeTrend',
                                    hideOnClick: false,
                                    text: '项目部'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'thematic_LanduseIndexValue',
                                    hideOnClick: false,
                                    text: '市场部'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'thematic_LanuseIntensityPotentialTrend',
                                    hideOnClick: false,
                                    text: '行政办公室'
                                }
                            ],
                            listeners: {
                                click: 'onMenu2Click'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    title: '任务管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'task_Report',
                                    hideOnClick: false,
                                    text: '举报任务'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'task_DynamicInspect',
                                    hideOnClick: false,
                                    text: '动态巡查任务'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'task_Locate',
                                    hideOnClick: false,
                                    text: '任务定位'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'task_Release',
                                    hideOnClick: false,
                                    text: '任务下发'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click3'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: '通知信息管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'notice_Publish',
                                    hideOnClick: false,
                                    text: '通知发布'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'notice_Browse',
                                    hideOnClick: false,
                                    text: '内容浏览'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'notice_Manage',
                                    hideOnClick: false,
                                    text: '通知管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'notice_Columns',
                                    hideOnClick: false,
                                    text: '栏目管理'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click4'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    title: '法律法规管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'law_Import',
                                    hideOnClick: false,
                                    text: '法律法规导入'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'law_Manage',
                                    hideOnClick: false,
                                    text: '法律法规管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'law_Search',
                                    hideOnClick: false,
                                    text: '法律法规查询'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click5'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    title: '成果数据管理',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'achievement_DataImportDatabase',
                                    hideOnClick: false,
                                    text: '成果数据入库'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'achievement_DataImportDB',
                                    hideOnClick: false,
                                    text: '历史成果入库'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'achievement_DataIBrowse',
                                    hideOnClick: false,
                                    text: '成果数据浏览'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'achievement_DataIEdit',
                                    hideOnClick: false,
                                    text: '成果数据编辑'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'achievement_ExcelExport',
                                    hideOnClick: false,
                                    text: '数据报表导出'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'achievement_DataExport',
                                    hideOnClick: false,
                                    text: '成果上传导出'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click7'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    title: '成果数据上报',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'achievement_UploadDataManage',
                                    hideOnClick: false,
                                    text: '上报数据管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'achievement_DataUpload',
                                    hideOnClick: false,
                                    text: '数据上报'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click6'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: '系统管理维护',
                    items: [
                        {
                            xtype: 'menu',
                            floating: false,
                            itemId: 'menu3',
                            items: [
                                {
                                    xtype: 'menuitem',
                                    id: 'system_checkManage',
                                    hideOnClick: false,
                                    text: '审核管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'system_UserManage',
                                    hideOnClick: false,
                                    text: '人员信息管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'system_RightManage',
                                    hideOnClick: false,
                                    text: '系统权限管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    id: 'system_DepartmentManage',
                                    hideOnClick: false,
                                    text: '部门信息管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'system_MapManage',
                                    hideOnClick: false,
                                    text: '地图管理'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'system_Log',
                                    hideOnClick: false,
                                    text: '系统日志'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'system_DataSearch',
                                    hideOnClick: false,
                                    text: '数据查询'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'system_DataEdit',
                                    hideOnClick: false,
                                    text: '数据编辑'
                                },
                                {
                                    xtype: 'menuitem',
                                    hidden: true,
                                    id: 'system_DataManage',
                                    hideOnClick: false,
                                    text: '数据管理'
                                }
                            ],
                            listeners: {
                                click: 'onMenu3Click8'
                            }
                        }
                    ]
                }
            ],
            listeners: {
                beforerender: 'onMenuPanelBeforeRender'
            }
        },
        {
            xtype: 'panel',
            region: 'center',
            id: 'mainView',
            layout: 'fit'
        }
    ],
    listeners: {
        afterrender: 'onMainViewAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var xtype = button.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onLabelAfterRender: function(component, eOpts) {
        document.getElementById('time').innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());
        setInterval("document.getElementById('time').innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());",1000);
    },

    onMainview_curUernameLabelRender: function(component, eOpts) {
        Ext.Ajax.request({
            url: 'get_currentUsername',
            success: function(response) {
                var username = response.responseText;
                if (username) {
                    Ext.getCmp('mainview_curUernameLabel').text = username;
                    //component.text = username;
                    //console.log("username:",username);
                } else {
                    //console.log("errorrr.");
                }
            },
            failure: function(conn, response, options, eOpts) {
                console.log("请求错误。");
            }
        });
    },

    onMenu1Click: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click91: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click9: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click2: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click1: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu2Click: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click3: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click4: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click5: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click7: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click6: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenu3Click8: function(menu, item, e, eOpts) {
        var xtype = item.id;
        var mainView = Ext.getCmp('mainView');
        mainView.removeAll();
        mainView.add(Ext.widget(xtype));
    },

    onMenuPanelBeforeRender: function(component, eOpts) {

        console.log("权限管理开始..");
        Ext.Ajax.request({
            url: 'get_currentUserRight',
            success: function(response) {
                var result = JSON.parse(response.responseText);
                if (result.success) {
                    var rightMap = result.root;
                    var children = component.query('panel');
                    for (var index in children) {
                        var child = children[index];
                        if (child && child.xtype == 'panel') {
                            var title = child.title;
                            var isShow = rightMap[title];
                            if (!isShow || isShow=='undefined') {
                                child.setHidden(true);
                            }
                        }
                    }
                } else {
                    console.log("errorrr.");
                }
            },
            failure: function(conn, response, options, eOpts) {
                console.log("请求错误。");
            }
        });
    },

    onMainViewAfterRender: function(component, eOpts) {
        var xtype = 'homePanel';
                var mainView = Ext.getCmp('mainView');
                mainView.removeAll();
                mainView.add(Ext.widget(xtype));
    }

});