/**
 * Created by WUCAN on 2015/5/21.
 */

require([
    "esri/map",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/arcgis/utils",
    "dojo/ready",
    "dojo/on",
    "dojo/_base/connect",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/parser",
    "dojo/domReady!"
], function (Map,
             ArcGISDynamicMapServiceLayer,
             FeatureLayer,
             arcgisUtils,
             ready,
             on,
             connect,
             arrayUtil,
             dom,
             parser) {

    var WKID = 4326;

    var map;
    var layer;
    var infoTemplate;
    var extInfoWindow;
    var extInfoWindowGrid;

    ready(function () {//65.3447265625,4.21875, 135.7470703125, 53.61328125
        parser.parse();

        var initExtent = new esri.geometry.Extent({
            //"xmin": 127.1441,"ymin": 45.5246,"xmax": 127.8857,"ymax": 45.9402,
            "xmin": 127.11561563720703,
            "ymin": 45.666310369873045,
            "xmax": 127.29946497192383,
            "ymax": 45.8012362121582,
            "spatialReference": {"wkid": WKID}
        });
        map = new esri.Map("enterprise_IntensityDynamicMonitor_div");
        //地图
        dojo.declare("TianDiTiledMapServiceLayer", esri.layers.TiledMapServiceLayer, {
            constructor: function () {
                this.spatialReference = new esri.SpatialReference({wkid: WKID});
                this.initialExtent = (this.fullExtent =
                    new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
                this.tileInfo = new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "compressionQuality": 0,
                    "origin": {"x": -180, "y": 90},
                    "spatialReference": {"wkid": WKID},
                    "lods": [
                        {"level": 0, "resolution": 0.703125, "scale": 295497593.05875},
                        {"level": 1, "resolution": 0.3515625, "scale": 147748796.529375},
                        {"level": 2, "resolution": 0.17578125, "scale": 73874398.264688},
                        {"level": 3, "resolution": 0.087890625, "scale": 36937199.132344},
                        {"level": 4, "resolution": 0.0439453125, "scale": 18468599.566172},
                        {"level": 5, "resolution": 0.02197265625, "scale": 9234299.783086},
                        {"level": 6, "resolution": 0.010986328125, "scale": 4617149.891543},
                        {"level": 7, "resolution": 0.0054931640625, "scale": 2308574.945771},
                        {"level": 8, "resolution": 0.00274658203125, "scale": 1154287.472886},
                        {"level": 9, "resolution": 0.001373291015625, "scale": 577143.736443},
                        {"level": 10, "resolution": 0.0006866455078125, "scale": 288571.86822143558},
                        {"level": 11, "resolution": 0.00034332275390625, "scale": 144285.93411071779},
                        {"level": 12, "resolution": 0.000171661376953125, "scale": 72142.967055358895},
                        {"level": 13, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447},
                        {"level": 14, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724},
                        {"level": 15, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619},
                        {"level": 16, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309},
                        {"level": 17, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655}]
                });
                this.loaded = true;
                this.onLoad(this);
            },
            getTileUrl: function (level, row, col) {
                var levelMap = "";
                if (level < 10) {
                    levelMap = "A0512_EMap";
                } else if (level < 12) {
                    levelMap = "B0627_EMap1112";
                } else if (level < 18) {
                    levelMap = "siwei0608";
                }
                return "http://t1.tianditu.cn/DataServer?T=vec_c&" + levelMap + "&X=" + col + "&Y=" + row + "&L=" + (level * 1 + 1);
            }
        });
        //文字标注

        dojo.declare("TianDiBiaoZhuMapServiceLayer", TianDiTiledMapServiceLayer, {
            getTileUrl: function (level, row, col) {
                return "http://t1.tianditu.cn/DataServer?T=cva_c&X=" + col + "&Y=" + row + "&L=" + (level * 1 + 1);
            }
        });

        //影像地图
        dojo.declare("TianDiYXMapServiceLayer", TianDiTiledMapServiceLayer, {
            getTileUrl: function (level, row, col) {//wmts
                return "http://t1.tianditu.cn/DataServer?T=img_c&X=" + col + "&Y=" + row + "&L=" + (level * 1 + 1);
            }
        });


        map.addLayer(new TianDiTiledMapServiceLayer());
        map.addLayer(new TianDiBiaoZhuMapServiceLayer());

        map.setExtent(initExtent);

        on(map, "extent-change", onExtentChange);

        //加载图层
        var url = "http://localhost:6080/arcgis/rest/services/binxi2013/MapServer/5";
        layer = new FeatureLayer(url, {
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"]
        });
        map.addLayer(layer);

        //属性window
        on(layer, "click", featureLayerClick);

        function featureLayerClick(event) {
            if (!extInfoWindow) {
                extInfoWindow = Ext.widget("mapInfoWindow");
                extInfoWindow.on("close", function (panel, eOpts) {
                    extInfoWindow = null;
                    extInfoWindowGrid = null;
                });
            }

            if (!extInfoWindowGrid) {
                extInfoWindowGrid = Ext.getCmp("mapInfoWindowGrid");
            }

            var feature = event.graphic;
            var attr = feature.attributes;
            extInfoWindowGrid.setSource(attr);

            var ptClick = event.screenPoint;
            extInfoWindow.showAt(ptClick.x + 265, ptClick.y + 145);
        }


        function onExtentChange(delta, extent, levelChange, lod) {
            console.log(delta);
        }
    });
    //dojo.addOnLoad(init);
});