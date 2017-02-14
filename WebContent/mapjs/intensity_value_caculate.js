require([
        "esri/map",
        "esri/graphicsUtils",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/arcgis/utils",
        "esri/geometry/Extent",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "dojo/ready",
        "dojo/on",
        "dojo/io/script",
        "dojo/_base/connect",
        "dojo/_base/array",
        "dojo/dom",
        "dojo/parser",
        "dojo/domReady!"
    ],
    function(Map,
        graphicsUtils,
        ArcGISDynamicMapServiceLayer,
        FeatureLayer,
        arcgisUtils,
        Extent,
        Query,
        QueryTask,
        ready,
        on,
        dojoIOScript,
        connect,
        arrayUtil,
        dom,
        parser) {
        //判断是否选择combo
        var combo = Ext.getCmp('intensity_value_combo');
        var value = combo.getValue();
        var rawValue = combo.getRawValue();
        if (!value) {
            Ext.Msg.alert('提示', '请先选择评价编号再进行指标标准化处理。');
            return;
        }
        //由combo获取record
        var storeWeight = Ext.StoreMgr.get('landIndexWeightStore');
        var storeStandard = combo.getStore();

        var recordWeight = storeWeight.findRecord(combo.valueField || combo.displayField, value);
        var recordStandard = storeStandard.findRecord(combo.valueField || combo.displayField, value);
        if (!recordWeight) {
            Ext.Msg.alert('提示', '未找到"' + value + '"编号为[' + rawValue + ']的评价指标权重数据，请重新评价。');
            return;
        }
        if (!recordStandard) {
            Ext.Msg.alert('提示', '未找到"' + value + '"编号为[' + rawValue + ']的指标标准化数据，请重新计算。');
            return;
        }
        //获取Form
        var formId = Ext.getCmp('intensity_value_activeFormId').getValue();
        if (!formId) {
            return;
        }
        var form = Ext.getCmp(formId).getForm();

        //计算集约度分值
        var store = Ext.StoreMgr.get('landIndexMetaStore');
        var storeFilter = Ext.StoreMgr.get('landIndexMetaFilterStore');
        var isDeal = false;
        store.load({
            params: {
                searchKeyword: 'b'
            },
            callback: function(records, operation, success) {
                for (var index in records) {
                    var key = records[index].get('indexKey');
                    var id = records[index].get('id');

                    var sum = 0;
                    for (var startIndex = 0; startIndex < storeFilter.getCount();) {
                        var getIndex = storeFilter.find('pid', id, startIndex, true, true);
                        if (getIndex < 0) {
                            break;
                        }
                        startIndex = getIndex + 1;
                        var record = storeFilter.getAt(getIndex);
                        var pid = record.get('pid');
                        if (pid != id) {
                            continue;
                        }
                        var cKey = record.get('indexKey');
                        var weightValue = recordWeight.get(cKey);
                        var standardValue = recordStandard.get(cKey);
                        sum += weightValue * standardValue;
                    }
                    recordStandard.set(key, sum);

                }
                form.loadRecord(recordStandard);
                store.load({
                    params: {
                        searchKeyword: 'a'
                    },
                    callback: function(records, operation, success) {
                        for (var index in records) {
                            var key = records[index].get('indexKey');
                            var id = records[index].get('id');

                            var sum = 0;
                            for (var startIndex = 0; startIndex < storeFilter.getCount();) {
                                var getIndex = storeFilter.find('pid', id, startIndex, true, true);
                                if (getIndex < 0) {
                                    break;
                                }
                                startIndex = getIndex + 1;
                                var record = storeFilter.getAt(getIndex);
                                var pid = record.get('pid');
                                if (pid != id) {
                                    continue;
                                }
                                var cKey = record.get('indexKey');
                                var weightValue = recordWeight.get(cKey);
                                var standardValue = recordStandard.get(cKey);
                                sum += weightValue * standardValue;
                            }
                            recordStandard.set(key, sum);

                        }
                        form.loadRecord(recordStandard);
                        store.load({
                            params: {
                                searchKeyword: 'mm'
                            },
                            callback: function(records, operation, success) {
                                for (var index in records) {
                                    var key = records[index].get('indexKey');
                                    var id = records[index].get('id');

                                    var sum = 0;
                                    for (var startIndex = 0; startIndex < storeFilter.getCount();) {
                                        var getIndex = storeFilter.find('pid', id, startIndex, true, true);
                                        if (getIndex < 0) {
                                            break;
                                        }
                                        startIndex = getIndex + 1;
                                        var record = storeFilter.getAt(getIndex);
                                        var pid = record.get('pid');
                                        if (pid != id) {
                                            continue;
                                        }
                                        var cKey = record.get('indexKey');
                                        var weightValue = recordWeight.get(cKey);
                                        var standardValue = recordStandard.get(cKey);
                                        sum += weightValue * standardValue;
                                    }
                                    recordStandard.set(key, sum);

                                }
                                form.loadRecord(recordStandard);
                                store.load({
                                    params: {
                                        searchKeyword: 'sum'
                                    },
                                    callback: function(records, operation, success) {
                                        for (var index in records) {
                                            var key = records[index].get('indexKey');
                                            var id = records[index].get('id');

                                            var sum = 0;
                                            for (var startIndex = 0; startIndex < storeFilter.getCount();) {
                                                var getIndex = storeFilter.find('pid', id, startIndex, true, true);
                                                if (getIndex < 0) {
                                                    break;
                                                }
                                                startIndex = getIndex + 1;
                                                var record = storeFilter.getAt(getIndex);
                                                var pid = record.get('pid');
                                                if (pid != id) {
                                                    continue;
                                                }
                                                var cKey = record.get('indexKey');
                                                var weightValue = recordWeight.get(cKey);
                                                var standardValue = recordStandard.get(cKey);
                                                sum += weightValue * standardValue;
                                            }
                                            recordStandard.set(key, sum);

                                        }
                                        form.loadRecord(recordStandard);

                                    }
                                });

                            }
                        });

                    }
                });
                isDeal = true;
            }

        });
        if (isDeal) {
            //保存数据
            if (form.isValid()) {
                //Ext.getCmp('intensity_standard_markTypeIndustryFormText').setValue('集约度分值');
                //Ext.getCmp('intensity_standard_markTypeCityFormText').setValue('集约度分值');
                form.submit({
                    url: 'update_indexWeight',
                    success: function(form, action) {
                        Ext.Msg.alert('成功', '集约度分值计算并保存成功。');
                        combo.getStore().reload();
                        //form.reset();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('失败', '记录保存失败，请重试。');
                    }
                });
            } else {
                Ext.Msg.alert('注意', '填写的信息有误，请检查！');
            }
        }
    });
