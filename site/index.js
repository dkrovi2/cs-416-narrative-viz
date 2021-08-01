var scenes = ["scene-0", "scene-1", "scene-2"];
var current_scene = 0;

function activateLinkNav(linkId) {
  d3.select("#scene-0-link").attr("class", "nav-link")
  d3.select("#scene-1-link").attr("class", "nav-link")
  d3.select("#scene-2-link").attr("class", "nav-link")

  d3.select("#" + linkId).attr("class", "nav-link active")
}

function enablePageNav(pageNavId) {
  d3.select("#page-nav-home").attr("class", "page-item disabled")
  d3.select("#page-nav-prev").attr("class", "page-item disabled")
  d3.select("#page-nav-next").attr("class", "page-item disabled")

  d3.select("#" + pageNavId).attr("class", "page-item")
}

function disablePageNav(pageNavId) {
  d3.select("#page-nav-home").attr("class", "page-item")
  d3.select("#page-nav-prev").attr("class", "page-item")
  d3.select("#page-nav-next").attr("class", "page-item")

  d3.select("#" + pageNavId).attr("class", "page-item disabled")
}

function enableAllPageNav() {
  d3.select("#page-nav-home").attr("class", "page-item")
  d3.select("#page-nav-prev").attr("class", "page-item")
  d3.select("#page-nav-next").attr("class", "page-item")
}

function showScene(sceneId) {
  d3.select("#scene-0").style("display", "none")
  d3.select("#scene-1").style("display", "none")
  d3.select("#scene-2").style("display", "none")

  d3.select("#" + sceneId).style("display", "")
}

enablePageNav("page-nav-next")
showScene("scene-0")
activateLinkNav("scene-0-link")

d3.select("#page-nav-home").on("click", function (d) {
  enablePageNav("page-nav-next")
  showScene("scene-0")
  activateLinkNav("scene-0-link")
  current_scene = 0;
});


d3.select("#page-nav-prev").on("click", function (d) {
  switch (current_scene) {
    case 1:
      enablePageNav("page-nav-next")
      showScene("scene-0")
      activateLinkNav("scene-0-link")
      current_scene = 0;
      break;
    case 2:
      enableAllPageNav()
      showScene("scene-1")
      activateLinkNav("scene-1-link")
      current_scene = 1;
      break;
  }
});


d3.select("#page-nav-next").on("click", function (d) {
  switch (current_scene) {
    case 0:
      enableAllPageNav();
      showScene("scene-1")
      activateLinkNav("scene-1-link")
      current_scene = 1;
      break;
    case 1:
      disablePageNav("page-nav-next")
      showScene("scene-2")
      activateLinkNav("scene-2-link")
      current_scene = 2;
      break;
  }
});

