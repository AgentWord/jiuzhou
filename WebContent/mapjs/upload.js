/**
 * 
 */

function setImagePreview(avalue) {

        var docObj = document.getElementById("doc");
        var imgObjPreview = document.getElementById("preview");
        var form=document.forms["demoForm"];
        var file=form["file"].files[0];
       // var form1 = document.forms["demoForm"];
        if (file) {
            //var file1 = form1["file"].files[0];
            console.log(file.name);
            var fileSize = 0;
            if (file.size > 1024 * 1024)
                fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            else
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            document.getElementById('fileName').innerHTML = '名称: ' + file.name;
            document.getElementById('fileSize').innerHTML = '大小: ' + fileSize;
            document.getElementById('fileType').innerHTML = '类型: ' + file.type;
          
        }
        else
            imgObjPreview.src=null;
        

        if (docObj.files && docObj.files[0]) {

            //火狐下，直接设img属性
            imgObjPreview.style.display = 'block';
            imgObjPreview.style.width = '300';
            imgObjPreview.style.height = '360';
            //imgObjPreview.src = docObj.files[0].getAsDataURL();

            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            console.log("图片的url："+window.URL.createObjectURL(docObj.files[0])+"名称："+docObj.files[0].name);
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
            //imagepreview.src=window.URL.createObjectURL(docObj.files[0]);
        } else {
            //IE下，使用滤镜
            docObj.select();
            var imgSrc = document.selection.createRange().text;
            var localImagId = document.getElementById("localImag");
            //必须设置初始大小
            localImagId.style.width = "300px";
            localImagId.style.height = "360px";
            //图片异常的捕捉，防止用户修改后缀来伪造图片
            try {
                localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
            } catch (e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            imgObjPreview.style.display = 'none';
            document.selection.empty();
        }
        return true;
    }
   
    function uploadAndSubmit() {

       var form = document.forms["demoForm"];
        if (form["file"].files.length > 0) {
            // 寻找表单域的 <input type="file" ... /> 标签

            var file = form["file"].files[0];
            // try sending 
            var reader = new FileReader();

            reader.onloadstart = function() {
                // 这个事件在读取开始时触发
                console.log("onloadstart");
                document.getElementById("bytesTotal").textContent = file.size;
            };
            reader.onprogress = function(p) {
                // 这个事件在读取进行中定时触发
                console.log("onprogress");
                document.getElementById("bytesRead").textContent = p.loaded;
            };

            reader.onload = function() {
                // 这个事件在读取成功结束后触发
                console.log("load complete");
            };

            reader.onloadend = function() {
                // 这个事件在读取结束后，无论成功或者失败都会触发
                if (reader.error) {
                    console.log(reader.error);
                } else {
                    document.getElementById("bytesRead").textContent = file.size;
                  
                    var xhr = new XMLHttpRequest();
                    
                    xhr.open( "POST", "uploadFiles.jsp?fileName="+file.name, true);
                    //两次encodeURI编码  
                    //浏览器的兼容
                    if (!XMLHttpRequest.prototype.sendAsBinary) {
                        XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
                            function byteValue(x) {
                                return x.charCodeAt(0) & 0xff;
                            }
                            var ords = Array.prototype.map.call(datastr, byteValue);
                            var ui8a = new Uint8Array(ords);
                            this.send(ui8a.buffer);
                        };

                    }

                    // xhr.overrideMimeType("application/octet-stream");
                    xhr.sendAsBinary(reader.result);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                console.log("上传完成");
                                alert(file.name + "上传成功！");
                                console.log("response: " + xhr.responseText);
                            };
                        };
                    };
                }

            };

            reader.readAsBinaryString(file);
        } else {
            alert("请选择要上传的文件");
        }
    }

    function imgPreview() {
        var previewImag = document.getElementById("preview");
        previewImag.src = "http://localhost:8080/landuse/public/image/timg.jpg";
    }
     function imgPreview1() {
        //var previewImag = document.getElementById("preview");
        //previewImag.src = "http://localhost:8080/landuse/public/image/timg.jpg";
        window.open("http://localhost:8080/landuse/public/image/timg.jpg");
    }
    //js方法  

    function funTestDown() {
        console.log("进入下载");
        var down=document.getElementById("download");
              
         down.innerHTML="下载文件";
         down.src="http://localhost:8080/landuse/public/image/nihao.docx";   
         down.click();             
    };   
         function getFileName()
         {
           var N=  document.forms["demoForm"]["file"].files[0];
            console.log(N.name);
            return N.name;

         }
        
   /* function downloadFile(url) {   
        try{ 
            var elemIF = document.createElement("iframe");   
            elemIF.src = url;   
            elemIF.style.display = "none";   
            document.body.appendChild(elemIF);   
        }catch(e){ 
 
        }
    }; */
