(this.webpackJsonptwittercloneweb=this.webpackJsonptwittercloneweb||[]).push([[0],{10:function(e,t,n){e.exports=n(17)},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(7),o=n.n(r),s=(n(15),n(4)),i=n(2),l=n(1),u=n.n(l),m=n(3);function f(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var c=n[a].trim();if(c.substring(0,e.length+1)===e+"="){t=decodeURIComponent(c.substring(e.length+1));break}}return t}function p(e,t,n,a){return b.apply(this,arguments)}function b(){return(b=Object(m.a)(u.a.mark((function e(t,n,a,c){var r,o,s,i,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=f("csrftoken"),c&&(r=JSON.stringify(c)),e.prev=2,s={},"POST"!==t){e.next=13;break}return i={method:t,body:r,headers:{"Content-Type":"application/json"}},o&&(i.headers={"Content-Type":"application/json","X-CSRFToken":o}),e.next=9,fetch("http://localhost:8000/api/".concat(n),i);case 9:403===(s=e.sent).status&&(window.location.href="/login?showLoginRequired=true"),e.next=16;break;case 13:return e.next=15,fetch("http://localhost:8000/api/".concat(n));case 15:s=e.sent;case 16:if(!s.ok){e.next=23;break}return e.next=19,s.json();case 19:l=e.sent,a(l,s.status),e.next=24;break;case 23:throw new Error("Request Failed!");case 24:e.next=29;break;case 26:e.prev=26,e.t0=e.catch(2),console.log(e.t0);case 29:case"end":return e.stop()}}),e,null,[[2,26]])})))).apply(this,arguments)}function d(){return(d=Object(m.a)(u.a.mark((function e(t,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("POST","tweets/create-tweet/",n,{content:t});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return(w=Object(m.a)(u.a.mark((function e(t,n,a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("POST","tweets/action/",a,{id:t,action:n});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return(h=Object(m.a)(u.a.mark((function e(t,n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a="tweets/",t&&(a+="?username=".concat(t)),p("GET",a,n,[]);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return(v=Object(m.a)(u.a.mark((function e(t,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("GET","tweets/".concat(t),n,[]);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){var t=c.a.createRef(),n=e.didTweet,a=function(e,t){201===t?n(e):(console.log(e),alert("An error occured please try again"))};return c.a.createElement("div",{className:e.className},c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),function(e,t){d.apply(this,arguments)}(t.current.value,a),t.current.value=""}},c.a.createElement("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),c.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"},"Tweet")))}var E=n(9);function O(e){var t=e.tweet,n=e.action,a=e.didPerformAction,r=t.likes?t.likes:0,o=n.btnClass?n.btnClass:"btn btn-primary btn-sm",s=n.type?n.type.toUpperCase():"Action";t.likes>=2&&"like"===n.type&&(s+="S");var i=function(e,t){console.log(t,e),200!==t&&201!==t||!a||a(e,t)},l="like"===n.type?"".concat(r," ").concat(s):s;return c.a.createElement("button",{className:o,id:"".concat(n.type,"_").concat(t.id),onClick:function(e){e.preventDefault(),function(e,t,n){w.apply(this,arguments)}(t.id,n.type,i)}},l," ")}function j(e){var t=e.tweet;return t.og_tweet?c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-11 mx-auto p-3 border rounded"},c.a.createElement(k,{hideActions:!0,className:"mx-1",tweet:t.og_tweet}),c.a.createElement("p",{className:"mb-0 small text-muted"},"Retweet"))):null}function k(e){var t=e.className?e.className:"col-10 mx-auto col-md-6 bg-light",n=e.tweet,r=e.didRetweet,o=e.hideActions,s=Object(a.useState)(e.tweet?e.tweet:null),l=Object(i.a)(s,2),u=l[0],m=l[1],f=window.location.pathname.match(Object(E.a)(/([0-9]+)/,{tweetid:1})),p=f?f.groups.tweetid:-1,b="".concat(n.id)==="".concat(p),d=function(e,t){200===t?m(e):201===t&&r&&r(e)};return c.a.createElement("div",{className:t},c.a.createElement("div",null,c.a.createElement("p",null,n.id," - ",n.content),c.a.createElement(j,{tweet:n})),c.a.createElement("div",{className:"btn btn-group"},c.a.createElement("span",{className:"bg-light p-2 border"},u&&!0!==o&&c.a.createElement(c.a.Fragment,null,c.a.createElement(O,{tweet:u,didPerformAction:d,action:{type:"like",btnClass:"btn btn-primary btn-sm ml-1"}}),c.a.createElement(O,{tweet:u,didPerformAction:d,action:{type:"unlike",btnClass:"btn btn-primary btn-sm ml-1"}}),c.a.createElement(O,{tweet:u,didPerformAction:d,action:{type:"retweet",btnClass:"btn btn-outline-success btn-sm ml-1"}})),!0===b?null:c.a.createElement("button",{className:"btn btn-outline-primary btn-sm ml-1",onClick:function(e){e.preventDefault(),window.location.href="/".concat(n.id)}},"View"))))}function g(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),r=n[0],o=n[1],l=Object(a.useState)([]),u=Object(i.a)(l,2),m=u[0],f=u[1],p=Object(a.useState)(!1),b=Object(i.a)(p,2),d=b[0],w=b[1];Object(a.useEffect)((function(){var t=Object(s.a)(e.newTweets).concat(r);t.length!==m.length&&f(t)}),[e.newTweets,r,m]),Object(a.useEffect)((function(){if(!1===d){!function(e,t){h.apply(this,arguments)}(e.username,(function(e,t){200===t&&(o(e),w(!0))}))}}),[r,w,d,e.username]);var v=function(e){var t=Object(s.a)(r);t.unshift(e),o(t);var n=Object(s.a)(m);n.unshift(m),f(n)};return m.map((function(e){return c.a.createElement(k,{tweet:e,didRetweet:v,key:e.id,className:"mx-2"})}))}function N(e){var t=e.tweetId,n=Object(a.useState)(!1),r=Object(i.a)(n,2),o=r[0],s=r[1],l=Object(a.useState)(null),u=Object(i.a)(l,2),m=u[0],f=u[1],p=function(e,t){200===t?f(e):alert("There was an error finding your tweet")};return Object(a.useEffect)((function(){!1===o&&(s(!0),function(e,t){v.apply(this,arguments)}(t,p))}),[o,s,t]),null===m?null:c.a.createElement(k,{tweet:m,className:e.className})}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var x=document.getElementById("tweets"),T=c.a.createElement;if(x){var S=T((function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),r=n[0],o=n[1],l="false"!==e.canTweet;return c.a.createElement("div",{className:e.className},!0===l&&c.a.createElement(y,{didTweet:function(e){var t=Object(s.a)(r);t.unshift(e),o(t)},className:"col-12 mb-3"}),c.a.createElement(g,Object.assign({newTweets:r},e)))}),x.dataset);o.a.render(S,x)}document.querySelectorAll(".tweet-detail").forEach((function(e){var t=T(N,e.dataset);o.a.render(t,e)})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.9e2f96bb.chunk.js.map