// area
$("ul.area-list > li:not(:has(a))").hide();

let actualCode = `
setTimeout(function() {
  document.dispatchEvent(new CustomEvent('connectExtension', {detail: areaUrlList}));
}, 0);
`;
let script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();

// Event listener
document.addEventListener('connectExtension', function(e) {
  let msg = {
    title: $(".activityT.title").text(),
    url: location.origin,
    list: []
  };
  //console.log(e.detail);
  $("ul.area-list > li.select_form_b a, ul.area-list > li.select_form_a a").each(function(index) {
    console.log("find area info " + $(this).text() + " - " + e.detail[$(this).attr("id")]);
    let text = $(this).text();
    let url = e.detail[$(this).attr("id")];
    msg.list[index] = {text, url};
  });

  chrome.runtime.sendMessage(msg);
});
