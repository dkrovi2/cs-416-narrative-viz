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

function moveTo(scene) {
  switch(scene) {
    case 0:
      activateLinkNav("scene-0-link")
      showScene("scene-0")
      enablePageNav("page-nav-next")
      d3.selectAll("#scene-0 > *").remove();
      renderScene0()
      break;
    case 1:
      activateLinkNav("scene-1-link")
      showScene("scene-1")
      enableAllPageNav()
      d3.selectAll("#scene-1 > *").remove();
      renderScene1()
      break;
    case 2:
      activateLinkNav("scene-2-link")
      showScene("scene-2")
      disablePageNav("page-nav-next")
      d3.selectAll("#scene-2 > *").remove();
      renderScene2()
      break;
  }
}

moveTo(current_scene)
d3.select("#scene-0-link").on("click", function (d) {
  current_scene = 0;
  moveTo(current_scene)
});
d3.select("#scene-1-link").on("click", function (d) {
  current_scene = 1;
  moveTo(current_scene)
});
d3.select("#scene-2-link").on("click", function (d) {
  current_scene = 2;
  moveTo(current_scene)
});

d3.select("#page-nav-home").on("click", function (d) {
  current_scene = 0;
  moveTo(current_scene)
});

d3.select("#page-nav-prev").on("click", function (d) {
  switch (current_scene) {
    case 1:
      current_scene = 0;
      moveTo(current_scene)
          break;
    case 2:
      current_scene = 1;
      moveTo(current_scene)
      break;
  }
});


d3.select("#page-nav-next").on("click", function (d) {
  switch (current_scene) {
    case 0:
      current_scene = 1;
      moveTo(current_scene)
      break;
    case 1:
      current_scene = 2;
      moveTo(current_scene)
      break;
  }
});

