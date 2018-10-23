var $_GET = (function(){
  var url = window.document.location.href.toString();
  var u = url.split("?");
  var localHref = u[0];
  if(typeof(u[1]) == "string"){
    u = u[1].split("&");
    var get = {};
    for(var i in u){
      var j = u[i].split("=");
      get[j[0]] = j[1];
    }
    return get;
  } else {
    return {};
  }
})();
var page = $_GET['page'];
var keyword = $_GET['keyword'];
var url = window.document.location.href.toString();
var u = url.split("?");
var localHref = u[0];
function dividePage(num){
  if(keyword == undefined){
    var id = 1;
    if(num > 10){
      var pages = "<li id=\"back\" onclick=\"back()\"><span><span aria-hidden=\"true\">«</span></span></li>";
      while(num > 10*(id-1)){
        pages += "<li id=\"page"+id+"\" onclick=\"turnTo("+id+")\"><span>"+id+"</span></li>";
        id++;
      }
      id--;
      pages += "<li id=\"next\" onclick=\"next()\"><span><span aria-hidden=\"true\">»</span></span></li>";
      document.getElementById("pages").innerHTML = pages;
    }else{
      var pages = "";
      pages += "<li id=\"back\" onclick=\"back()\"><span><span aria-hidden=\"true\">«</span></span></li><li id=\"page1\"><span>1</span></li><li id=\"next\" onclick=\"next()\"><span><span aria-hidden=\"true\">»</span></span></li>";
      document.getElementById("pages").innerHTML = pages;
    }
    if(page*10 > num+10){
      window.location.href = localHref+"?page=1";
    }
    if(page == 1 || page == undefined){
      page = 1;
      $("#back").addClass("disabled");
      $("#page1").addClass("active");
      if(num <= 10){
        $("#next").addClass("disabled");
        for(i=1; i<=num; i++){
          $("#"+i).css('display','block');
        }
      }else{
        for(i=num; i>num-10; i--){
          $("#"+i).css('display','block');
        }
      }
    }else if(id == page){
      $("#next").addClass("disabled");
      $("#page"+page).addClass("active");
      var begin = (num - page*10 + 10);
      for(i=begin; i>0; i--){
        $("#"+i).css('display','block');
      }
    }else{
      $("#page"+page).addClass("active");
      var begin = (num - page*10 + 10);
      for(i=begin; i>begin-10; i--){
        $("#"+i).css('display','block');
      }
    }
  }
}
function back(){
  page--;
  window.location.href = (localHref+"?page="+page);
}
function next(){
  page++;
  window.location.href = (localHref+"?page="+page);
}
function turnTo(page){
  window.location.href = (localHref+"?page="+page);
}