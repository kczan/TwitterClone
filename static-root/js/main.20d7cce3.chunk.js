(this.webpackJsonptwittercloneweb=this.webpackJsonptwittercloneweb||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(5),o=n.n(r);n(16);function l(e){var t=e.author,n=e.includeFullName;t=t||{};var a=n&&"".concat(t.first_name," ").concat(t.last_name," ");return t!=={}&&c.a.createElement(c.a.Fragment,null,c.a.createElement("p",{className:" text-muted"},a,c.a.createElement("span",{className:"",style:{cursor:"pointer"},onClick:function(e){e.preventDefault(),window.location.href="/profile/".concat(t.username)}},"@",t.username)))}function s(e){var t=e.author;return t=t||{},c.a.createElement("span",{className:"mx-1 px-3 py-2 rounded-circle bg-dark text-white"},t[0])}var i=n(1),u=n(2),m=n.n(u),f=n(4);function d(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var c=n[a].trim();if(c.substring(0,e.length+1)===e+"="){t=decodeURIComponent(c.substring(e.length+1));break}}return t}function p(e,t,n,a){return b.apply(this,arguments)}function b(){return(b=Object(f.a)(m.a.mark((function e(t,n,a,c){var r,o,l,s,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=d("csrftoken"),c&&(r=JSON.stringify(c)),e.prev=2,l={},"POST"!==t){e.next=13;break}return s={method:t,body:r,headers:{"Content-Type":"application/json"}},o&&(s.headers={"Content-Type":"application/json","X-CSRFToken":o}),e.next=9,fetch("http://localhost:8000/api/".concat(n),s);case 9:403===(l=e.sent).status&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"),e.next=16;break;case 13:return e.next=15,fetch("http://localhost:8000/api/".concat(n));case 15:l=e.sent;case 16:if(!l.ok){e.next=23;break}return e.next=19,l.json();case 19:i=e.sent,a(i,l.status),e.next=24;break;case 23:throw new Error("Request Failed!");case 24:e.next=29;break;case 26:e.prev=26,e.t0=e.catch(2),console.log(e.t0);case 29:case"end":return e.stop()}}),e,null,[[2,26]])})))).apply(this,arguments)}function w(){return(w=Object(f.a)(m.a.mark((function e(t,n){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("GET","profile/".concat(t),n,[]);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return(h=Object(f.a)(m.a.mark((function e(t,n,a){var c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c={action:"".concat(n&&n).toLowerCase()},p("POST","profile/".concat(t,"/follow"),a,c);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e,t){return E.apply(this,arguments)}function E(){return(E=Object(f.a)(m.a.mark((function e(t,n){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("GET","profile/search/".concat(t),n,[]);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=n(9),j=n.n(O);function g(e){return c.a.createElement("span",{className:e.className},j()(e.children).format("0 a"))}function y(e){var t=e.user,n=e.didFollowToggle,a=e.profileLoading,r=e.inSearch,o=t&&t.is_following?"Unfollow":"Follow";o=a?"Loading...":o;var l="p-2 bg-light";!r&&(l+=" w-25");return t?c.a.createElement("div",{className:"m-3 p-2"},c.a.createElement("a",Object.assign({},r?{href:"/profile/".concat(t.username)}:{},{className:"nounderline"}),c.a.createElement("div",null,c.a.createElement(s,{author:t}),c.a.createElement("div",{className:"pt-3 ml-1"},t.first_name," ",t.last_name," "),c.a.createElement("div",{className:"ml-1 text-muted small"},"@",t.username),c.a.createElement("section",{id:"bio-section",className:l},c.a.createElement("p",{className:"d-inline pr-3"},c.a.createElement(g,null,t.follower_count),1===t.followers_count?"follower":"followers"),"|",c.a.createElement("p",{className:"d-inline pl-3"},c.a.createElement(g,null,t.following_count)," followed"),c.a.createElement("p",{className:"text-truncate font-italic pt-2"},t.bio)))),c.a.createElement("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault(),n&&!a&&n(o)}},o)):null}function N(e){var t=e.username,n=e.inSearch,r=Object(a.useState)(!1),o=Object(i.a)(r,2),l=o[0],s=o[1],u=Object(a.useState)(null),m=Object(i.a)(u,2),f=m[0],d=m[1],p=Object(a.useState)(!1),b=Object(i.a)(p,2),v=b[0],E=b[1],O=function(e,t){200===t&&d(e)};Object(a.useEffect)((function(){!1===l&&(s(!0),function(e,t){w.apply(this,arguments)}(t,O))}),[l,s,t]);return!1===l?"Loading...":f&&c.a.createElement(y,{user:f,didFollowToggle:function(e){!function(e,t,n){h.apply(this,arguments)}(t,e,(function(e,t){200===t&&d(e),E(!1)})),E(!0)},profileLoading:v,inSearch:n})}function x(e){var t=e.username,n=Object(a.useState)([]),r=Object(i.a)(n,2),o=r[0],l=r[1],s=Object(a.useState)([]),u=Object(i.a)(s,2),m=u[0],f=u[1],d=Object(a.useState)(null),p=Object(i.a)(d,2),b=p[0],w=p[1],h=Object(a.useState)(!1),E=Object(i.a)(h,2),O=E[0],j=E[1];Object(a.useEffect)((function(){if(!1===O){v(t,(function(e,t){200===t&&(w(e.next),j(!0),l(e.results))}))}}),[j,O,l,t]);return 0===o.length?c.a.createElement("div",{className:"mx-auto col-10 text-center text-large"},c.a.createElement("h2",null,"Sorry, couldn't find anything!")):c.a.createElement(c.a.Fragment,null,o.map((function(e){return c.a.createElement(N,{username:e.username,inSearch:!0})})),null!==b&&c.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!==b){v(t,(function(e,t){200===t&&(w(e.next),f(m))}),b)}},className:"btn btn-outline-primary"},"Load next"))}var k=n(3);function S(){return(S=Object(f.a)(m.a.mark((function e(t,n){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("POST","tweets/create-tweet/",n,{content:t});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(){return(T=Object(f.a)(m.a.mark((function e(t,n,a){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("POST","tweets/action/",a,{id:t,action:n});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(e,t,n){return F.apply(this,arguments)}function F(){return(F=Object(f.a)(m.a.mark((function e(t,n,a){var c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c="tweets/",t&&(c+="?username=".concat(t)),null!==a&&void 0!==a&&(c=a.replace("http://localhost:8000/api/","")),p("GET",c,n,[]);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e,t){return L.apply(this,arguments)}function L(){return(L=Object(f.a)(m.a.mark((function e(t,n){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a="tweets/feed/",null!==n&&void 0!==n&&(a=n.replace("http://localhost:8000/api/","")),p("GET",a,t,[]);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return(_=Object(f.a)(m.a.mark((function e(t,n){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p("GET","tweets/".concat(t),n,[]);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e){var t=c.a.createRef(),n=e.didTweet,a=function(e,t){201===t?n(e):(console.log(e),alert("An error occured please try again"))};return c.a.createElement("div",{className:e.className},c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),function(e,t){S.apply(this,arguments)}(t.current.value,a),t.current.value=""}},c.a.createElement("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),c.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"},"Tweet")))}var P=n(10);function D(e){var t=e.tweet,n=e.action,a=e.didPerformAction,r=t.likes?t.likes:0,o=n.btnClass?n.btnClass:"btn btn-primary btn-sm",l=n.type?n.type.toUpperCase():"Action";t.likes>=2&&"like"===n.type&&(l+="S");var s=function(e,t){console.log(t,e),200!==t&&201!==t||!a||a(e,t)},i="like"===n.type?"".concat(r," ").concat(l):l;return c.a.createElement("button",{className:o,id:"".concat(n.type,"_").concat(t.id),onClick:function(e){e.preventDefault(),function(e,t,n){T.apply(this,arguments)}(t.id,n.type,s)}},i," ")}function q(e){var t=e.tweet,n=e.retweeter;return t.og_tweet?c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-11 mx-2 p-3 border rounded"},c.a.createElement(G,{hideActions:!0,className:"mx-1",tweet:t.og_tweet}),c.a.createElement("span",{className:"mb-0 small text-muted"},"Retweeted via ",c.a.createElement(l,{author:n,includeFullName:!1})))):null}function G(e){var t=e.className?e.className:"col-10 mx-auto col-md-6 bg-light",n=e.tweet,r=e.didRetweet,o=e.hideActions,u=Object(a.useState)(e.tweet?e.tweet:null),m=Object(i.a)(u,2),f=m[0],d=m[1],p=window.location.pathname.match(Object(P.a)(/([0-9]+)/,{tweetid:1})),b=p?p.groups.tweetid:-1,w="".concat(n.id)==="".concat(b),h=function(e,t){200===t?d(e):201===t&&r&&r(e)};return c.a.createElement("div",{className:t},c.a.createElement("div",{className:"d-flex"},c.a.createElement("div",{className:""},c.a.createElement(s,{author:n.author})),c.a.createElement("div",{className:"col-11"},c.a.createElement("div",{className:"ml-2"},n.author?c.a.createElement(l,{author:n.author,includeFullName:!0}):c.a.createElement("span",{className:"col-1 mb-6"}),c.a.createElement("p",null,n.content),c.a.createElement(q,{retweeter:n.author,tweet:n})),c.a.createElement("div",{className:"btn btn-group px-0 button-container"},c.a.createElement("span",{className:"bg-light p-2 border rounded "},f&&!0!==o&&c.a.createElement(c.a.Fragment,null,c.a.createElement(D,{tweet:f,didPerformAction:h,action:{type:"like",btnClass:"btn btn-primary btn-sm ml-1 single-action-btn"}}),c.a.createElement(D,{tweet:f,didPerformAction:h,action:{type:"unlike",btnClass:"btn btn-primary btn-sm ml-1 single-action-btn"}}),c.a.createElement(D,{tweet:f,didPerformAction:h,action:{type:"retweet",btnClass:"btn btn-outline-success btn-sm ml-1 single-action-btn"}})),!0===w?null:c.a.createElement("button",{className:"btn btn-outline-primary btn-sm ml-1",onClick:function(e){e.preventDefault(),window.location.href="/".concat(n.id)}},"View"))))))}function I(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),r=n[0],o=n[1],l=Object(a.useState)([]),s=Object(i.a)(l,2),u=s[0],m=s[1],f=Object(a.useState)(null),d=Object(i.a)(f,2),p=d[0],b=d[1],w=Object(a.useState)(!1),h=Object(i.a)(w,2),v=h[0],E=h[1];Object(a.useEffect)((function(){var t=Object(k.a)(e.newTweets).concat(r);t.length!==u.length&&m(t)}),[e.newTweets,r,u]),Object(a.useEffect)((function(){if(!1===v){C(e.username,(function(e,t){200===t&&(b(e.next),o(e.results),E(!0),m(e.results))}))}}),[r,E,v,e.username]);var O=function(e){var t=Object(k.a)(r);t.unshift(e),o(t);var n=Object(k.a)(u);n.unshift(u),m(n)};return c.a.createElement(c.a.Fragment,null,u.map((function(e){return c.a.createElement(G,{tweet:e,didRetweet:O,key:e.id,className:"mx-3 py-1 my-3"})})),null!==p&&c.a.createElement("button",{onClick:function(t){if(t.preventDefault(),null!==p){C(e.username,(function(e,t){if(200===t){b(e.next);var n=Object(k.a)(u).concat(e.results);o(n),m(n)}}),p)}},className:"btn btn-outline-primary"},"Load next"))}function B(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),r=n[0],o=n[1],l=Object(a.useState)([]),s=Object(i.a)(l,2),u=s[0],m=s[1],f=Object(a.useState)(null),d=Object(i.a)(f,2),p=d[0],b=d[1],w=Object(a.useState)(!1),h=Object(i.a)(w,2),v=h[0],E=h[1];Object(a.useEffect)((function(){var t=Object(k.a)(e.newTweets).concat(r);t.length!==u.length&&m(t)}),[e.newTweets,r,u]),Object(a.useEffect)((function(){if(!1===v){A((function(e,t){200===t&&(b(e.next),o(e.results),E(!0))}))}}),[r,E,v,e.username]);var O=function(e){var t=Object(k.a)(r);t.unshift(e),o(t);var n=Object(k.a)(u);n.unshift(u),m(n)};return c.a.createElement(c.a.Fragment,null,u.map((function(e){return c.a.createElement(G,{tweet:e,didRetweet:O,key:e.id,className:"mx-3 py-1 my-3"})})),null!==p&&c.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!==p){A((function(e,t){if(200===t){b(e.next);var n=Object(k.a)(u).concat(e.results);o(n),m(n)}}),p)}},className:"btn btn-outline-primary"},"Load next"))}function J(e){var t=e.tweetId,n=Object(a.useState)(!1),r=Object(i.a)(n,2),o=r[0],l=r[1],s=Object(a.useState)(null),u=Object(i.a)(s,2),m=u[0],f=u[1],d=function(e,t){200===t?f(e):alert("There was an error finding your tweet")};return Object(a.useEffect)((function(){!1===o&&(l(!0),function(e,t){_.apply(this,arguments)}(t,d))}),[o,l,t]),null===m?null:c.a.createElement(G,{tweet:m,className:e.className})}function U(e){return c.a.createElement("nav",{className:"navbar"},c.a.createElement("ul",{className:"navbar-nav"},e.children))}function W(e){var t=Object(a.useState)(!1),n=Object(i.a)(t,2),r=n[0],o=n[1],l=Object(a.useRef)();Object(a.useEffect)((function(){return document.addEventListener("mousedown",s),function(){document.removeEventListener("mousedown",s)}}),[]);var s=function(e){l.current.contains(e.target)||(e.clientX<.8*window.innerWidth||e.clientY>.3*window.innerHeight)&&o(!1)};return c.a.createElement("li",{className:"nav-item"},c.a.createElement("a",{href:e.href,className:"icon-button",ref:l,onClick:function(){return o(!r)}},e.icon),r&&e.children)}function X(e){var t=e.username;function n(e){return c.a.createElement("a",{href:e.href,className:"menu-item"},e.children)}return c.a.createElement("div",{className:"dropdown"},c.a.createElement(n,{href:"/profile/".concat(t)},"Profile"),c.a.createElement(n,{href:"/update-profile"},"Settings"))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=document.getElementById("tweets"),V=c.a.createElement;if(H){var Y=V((function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),r=n[0],o=n[1],l="false"!==e.canTweet;return c.a.createElement("div",{className:e.className},!0===l&&c.a.createElement(R,{didTweet:function(e){var t=Object(k.a)(r);t.unshift(e),o(t)},className:"col-md-4 mx-auto tweet-create-form"}),c.a.createElement(I,Object.assign({newTweets:r},e)))}),H.dataset);o.a.render(Y,H)}var $=document.getElementById("tweets-feed");if($){var z=V((function(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),r=n[0],o=n[1];return c.a.createElement("div",{className:e.className},c.a.createElement(R,{didTweet:function(e){var t=Object(k.a)(r);t.unshift(e),o(t)},className:"col-md-4 mx-auto tweet-create-form"}),c.a.createElement(B,Object.assign({newTweets:r},e)))}),$.dataset);o.a.render(z,$)}document.querySelectorAll(".tweet-detail").forEach((function(e){var t=V(J,e.dataset);o.a.render(t,e)})),document.querySelectorAll(".tweet-profile-badge").forEach((function(e){var t=V(N,e.dataset);o.a.render(t,e)})),document.querySelectorAll(".profile-search-element").forEach((function(e){var t=V(x,e.dataset);o.a.render(t,e)}));var K=document.getElementById("navbar-component"),M=V((function(e){var t=e.username;return c.a.createElement(U,null,c.a.createElement(W,{href:"/trending",icon:c.a.createElement("i",{className:"fas fa-fire"})}),c.a.createElement(W,{href:"/global",icon:c.a.createElement("i",{className:"fas fa-globe-americas"})}),c.a.createElement(W,{icon:c.a.createElement("i",{className:"fa fa-user-cog"})},c.a.createElement(X,{username:t})))}),K.dataset);o.a.render(M,K),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.20d7cce3.chunk.js.map