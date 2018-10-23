var id = 1;
var inputContent = new Array;
var ids = new Array;
var Content = "";
var mainContent = "";
function addTitle(){
  var content = document.getElementById("article_content");
  SaveAll();
  ids[id-1] = 1;
  content.innerHTML += '<div id="'+id+'" class="input-group"><span class="input-group-addon">分标题</span><input type="text" class="form-control" id="input'+id+'"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="del('+id+')"><span class="glyphicon glyphicon-trash"></span></button></span></div>';
  ShowAll();
  AutoTextarea();
  id++;
}
function addContent(){
  var content = document.getElementById("article_content");
  SaveAll();
  ids[id-1] = 2;
  content.innerHTML += '<div id="'+id+'" class="input-group"><span class="input-group-addon">正文</span><textarea class="form-control" id="input'+id+'"></textarea><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="del('+id+')"><span class="glyphicon glyphicon-trash"></span></button></span></div>';
  ShowAll();
  AutoTextarea();
  id++;
}
function addPicture(){
  var content = document.getElementById("article_content");
  SaveAll();
  ids[id-1] = 4;
  content.innerHTML += '<div id="'+id+'" class="input-group"><span class="input-group-addon">图片链接</span><input type="text" class="form-control" id="input'+id+'"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="del('+id+')"><span class="glyphicon glyphicon-trash"></span></button></span></div>';
  ShowAll();
  AutoTextarea();
  id++;
}
function addLink(){
  var content = document.getElementById("article_content");
  SaveAll();
  ids[id-1] = 3;
  content.innerHTML += '<div id="'+id+'" class="input-group"><span class="input-group-addon">文本</span><input type="text" class="form-control" id="input'+id+'"><span class="input-group-addon">超链接</span><input type="text" class="form-control" id="input'+(id+1)+'"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="del('+id+')"><span class="glyphicon glyphicon-trash"></span></button></span></div>';
  ShowAll();
  AutoTextarea();
  id += 2;
}
function addVideo(){
  var content = document.getElementById("article_content");
  SaveAll();
  ids[id-1] = 5;
  content.innerHTML += '<div id="'+id+'" class="input-group"><span class="input-group-addon">视频链接</span><input type="text" class="form-control" id="input'+id+'"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="del('+id+')"><span class="glyphicon glyphicon-trash"></span></button></span></div>';
  ShowAll();
  AutoTextarea();
  id++;
}
function del(id){
  var container = document.getElementById("article_content");
  var myNode = document.getElementById(id);
  container.removeChild(myNode);
  if(ids[id-1] == 3){
    inputContent[id] = "";
    ids[id] = 0;
  }
  inputContent[id-1] = "";
  ids[id-1] = 0;
}
function SaveAll(){
  if(id != 1){
    for(i=1; i<id; i++){
      if(ids[i-1] != 0){
        var input = document.getElementById("input"+i);
        inputContent[i-1] = input.value;
      }
    }
  }
}
function ShowAll(){
  if(id != 1){
    for(i=1; i<id; i++){
      if(ids[i-1] != 0){
        var input = document.getElementById("input"+i);
        input.value = inputContent[i-1];
      }
    }
  }
}
function AutoTextarea(){
  for(i=1; i<=id; i++){
    if(ids[i-1] == 2){
      var input = document.getElementById("input"+i);
      autoTextarea(input);
    }
  }
}
function getContent(){
  if(id != 1){
    var time = 1;
    for(i=1; i<=id; i++){
      switch(ids[i-1]){
        case 1:
        Content += "<h2 class=\"post-title\">"+document.getElementById("input"+i).value+"</h2><hr>";
        break;
        case 2:
        Content += "<p>"+document.getElementById("input"+i).value+"</p>";
        break;
        case 3:
        Content += "<a href=\""+document.getElementById("input"+(i+1)).value+"\">"+document.getElementById("input"+i).value+"</a>";
        break;
        case 4:
        Content += "<center><img class=\"img-responsive\" src=\""+document.getElementById("input"+i).value+"\"></center>";
        break;
        case 5:
        Content += "<center>\
<div class=\"video-btn\" id=\"video-btn\">\
<div class=\"video-area\" id=\"video-area\">\
<iframe src=\""+document.getElementById("input"+i).value+"\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"> </iframe>\
</div>\
</div></center>";
        break;
        default:
        time--;
        break;
      }
      if(time == 2){
        mainContent = Content;
      }
      time++;
    }
  }else{
    alert("尚未填写任何正文内容！");
  }
}
function Submit(){
  getContent();
  var output = "";
  output += "<!DOCTYPE html>\
<html style=\"overflow-x:hidden\">\
<head>\
<meta charset = \"utf-8\">\
<title>活动|";
    output += document.getElementById("title").value;
    output += "</title>\
<meta http-equiv = \"X-UA-Compatible\" content = \"IE=Edge\">\
<meta name = \"viewport\" content = \"width=device-width, initial-scale=1\">\
<meta name=\"renderer\" content=\"webkit\">\
<meta name = \"author\" content = \"Big_Uncle\">\
<link rel = \"icon\" href = \"../../../../Qmaker.jpg\">\
<link rel = \"stylesheet\" href = \"../../../../css/bootstrap.min.css\">\
<link rel = \"stylesheet\" href = \"../../../../css/article.css\">\
<link rel = \"stylesheet\" href = \"../../../../css/video.css\">\
</head>\
<body style=\"padding-top:10vh;background-color:rgb(232,232,232)\">\
<div id=\"top\">\
<div id=\"bottomNav\" class=\"bottomNav\">\
<div>\
<a href=\"../../../../\" class=\"nav-link\">空间介绍</a>\
<a href=\"../../../../activity.html\" class=\"nav-link self\">活动</a>\
<a href=\"../../../../robomaster.html\" class=\"nav-link\">RoboMaster</a>\
</div>\
</div>\
</div>\
<div class=\"article\">\
<header style=\"text-align:center\">\
<h1 style=\"font-size:1.7em\">";
    output += document.getElementById("title").value;
    output += "</h1>\
<div class=\"post-meta\">\
<span class=\"glyphicon glyphicon-time\"></span><span>发表时间：";
    var myDate = new Date();
    var date = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
    output += (date +"&nbsp;|&nbsp;</span><span class=\"glyphicon glyphicon-user\"></span><span>作者：");
    output += document.getElementById("author").value;
    output += "</span></div></header><div class=\"post-body\">";
    output += Content;
    output += "<br>\
<div class=\"post-button\">\
<a href=\"../../../../activity.html\" class=\"abutton\">« 返回</a>\
</div>\
</div>\
</div>\
<div style=\"margin:20px;text-align:center\">\
<div class=\"Copyright\">\
<span class=\"glyphicon glyphicon-copyright-mark\"></span><span>&nbsp;2014-<text id=\"year\"></text>&nbsp;&nbsp;|&nbsp;&nbsp;</span><span class=\"glyphicon glyphicon-user\"></span><span>&nbsp;青年创客空间</span>\
</div>\
</div>\
<script src = \"../../../../js/jquery.min.js\"></script>\
<script src = \"../../../../js/bootstrap.min.js\"></script>\
<script>\
var date=new Date;\
var year=date.getFullYear();\
document.getElementById('year').innerHTML = year;\
</script>\
</body>\
</html>";
    //alert(output);
    Download(output, "article.html");
    var brief = "";
    brief += "<div class=\"article\"><header style=\"text-align:center\"><h1 style=\"font-size:1.7em\">";
    brief += document.getElementById("title").value;
    brief += "</h1><div class=\"post-meta\"><span class=\"glyphicon glyphicon-time\"></span><span>发表时间：";
    brief += (myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+"&nbsp;|&nbsp;</span><span class=\"glyphicon glyphicon-user\"></span><span>作者：大叔</span>\
</div></header><div class=\"post-body\">");
    brief += mainContent;
    //alert(mainContent);
    brief += "<div class=\"post-button\">\
<a href=\"activity/"+myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate()+"/article1.html\" class=\"abutton\">阅读全文&nbsp;»</a>\
</div></div></div>";
    alert(brief);
    Content = "";
    mainContent = "";
}
var Download = function (content, filename) {
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};