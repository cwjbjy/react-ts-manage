"use strict";(self.webpackChunkreact_ts_manage=self.webpackChunkreact_ts_manage||[]).push([[406],{1593:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var i=n(9439),s=n(2791),r=n(6988),o=n(4484),a=n(2641),I=n(9389),c=n(8138),l=n(2360),d=n(5671),g=n(3144),E="bus_ws",u=function(){function e(t){var n=t.url,i=void 0===n?"":n,s=t.closeCallBack,r=void 0===s?function(){}:s;(0,d.Z)(this,e),this.url=void 0,this.closeCallBack=void 0,this.ws=void 0,this.heartCheck=void 0,this.ws=null,this.url="".concat("wss://wss.caowj.top").concat(i),this.closeCallBack=r;var o=this;this.heartCheck={timeID:null,reSet:function(){clearTimeout(this.timeID),this.bounce()},bounce:function(){this.timeID=setTimeout((function(){o.sendMessage({msg:{type:"heart",text:"putong"}})}),3e4)}}}return(0,g.Z)(e,[{key:"_heartBeat",value:function(){var e=this;setTimeout((function(){e.connect({}).then((function(){}))}),1e3)}},{key:"connect",value:function(e){var t=this,n=this;return this.ws=new WebSocket(this.url),new Promise((function(i){t.ws&&(t.ws.onopen=function(){this.readyState===this.OPEN&&(n.heartCheck.bounce(),"{}"!==JSON.stringify(e)&&n.sendMessage({msg:e}),i(null))},t.ws.onclose=function(){n.closeCallBack()},t.ws.onerror=function(e){console.warn("error",e),n._heartBeat()},t.ws.onmessage=function(e){var t=JSON.parse(e.data);"heart"===t.name||window.eventBus.emit(E,t),n.heartCheck.reSet()})}))}},{key:"sendMessage",value:function(e){var t=e.msg,n=void 0===t?{}:t;this.ws&&(this.ws.readyState===this.ws.OPEN?this.ws.send(JSON.stringify(n)):console.warn("\u8fde\u63a5\u5f02\u5e38"))}},{key:"close",value:function(e){var t=this;return new Promise((function(n){t.ws&&(t.sendMessage({msg:e}),t.ws.close(),n(null))}))}}]),e}(),h=new(function(){function e(){(0,d.Z)(this,e),this.WSInstance=void 0,this.WSInstance=null}return(0,g.Z)(e,[{key:"open",value:function(e){var t=e.params,n=e.closeCallBack;this.WSInstance=new u({closeCallBack:n}),this.WSInstance.connect(t).then((function(){r.ZP.success("\u8fde\u63a5\u6210\u529f")})).catch((function(){r.ZP.error("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5")}))}},{key:"sendMessage",value:function(e){this.WSInstance&&this.WSInstance.sendMessage({msg:e})}},{key:"close",value:function(e){this.WSInstance&&this.WSInstance.close(e).then((function(){r.ZP.success("\u5173\u95ed\u6210\u529f")}))}}]),e}()),f=n(7539),S=n.p+"static/media/chatShowV2.0.535397e73d436f4a2d7c.png",k=n(3470),V=n(184),x=function(){var e=(0,s.useState)([]),t=(0,i.Z)(e,2),n=t[0],l=t[1],d=(0,s.useState)(!1),g=(0,i.Z)(d,2),u=g[0],x=g[1],Q=(0,s.useState)(!1),C=(0,i.Z)(Q,2),v=C[0],Y=C[1],A=(0,s.useState)(""),N=(0,i.Z)(A,2),y=N[0],J=N[1],B=(0,s.useMemo)((function(){var e;return null===(e=f.ls.get("userInfo"))||void 0===e?void 0:e.userName}),[]),Z=(0,k.Z)().fileName,w=(0,s.useState)(!1),G=(0,i.Z)(w,2),b=G[0],H=G[1],j=(0,s.useState)(!0),T=(0,i.Z)(j,2),P=T[0],X=T[1],K=(0,s.useState)(),U=(0,i.Z)(K,2),z=U[0],W=U[1],R=(0,s.useRef)(null);(0,s.useEffect)((function(){return window.eventBus.on(E,(function(e){W(e)})),function(){window.eventBus.off(E)}}),[]),(0,s.useEffect)((function(){z&&l((function(e){return e.concat(z)}))}),[z]);var D=(0,s.useCallback)((function(){l([])}),[]),M=(0,s.useCallback)((function(){var e={type:"setName",name:B,image:"".concat("https://wen.caowj.top/images/").concat(Z)};h.open({params:e,closeCallBack:D}),H(!0),X(!1)}),[B,Z,D]),O=(0,s.useCallback)((function(){h.close({type:"close"}),H(!1),X(!0)}),[]),F=(0,s.useCallback)((function(){b?""!==y&&(h.sendMessage({type:"chat",text:y}),J("")):r.ZP.error("\u8bf7\u5148\u8fde\u63a5")}),[b,y]);return(0,V.jsxs)(p,{children:[(0,V.jsxs)(o.Z,{hoverable:!0,children:[(0,V.jsxs)(m,{children:[(0,V.jsx)(a.ZP,{type:"primary",onClick:M,disabled:b,children:"\ud83d\udcde \u8fde\u63a5"}),(0,V.jsx)(a.ZP,{type:"primary",onClick:O,disabled:P,children:"\u274c \u5173\u95ed"}),(0,V.jsx)(a.ZP,{type:"primary",onClick:function(){return x(!0)},children:"\u4f7f\u7528\u8bf4\u660e"}),(0,V.jsx)(a.ZP,{type:"primary",onClick:function(){return Y(!0)},children:"\u67e5\u770b\u6548\u679c\u56fe"})]}),(0,V.jsxs)("div",{className:"chat",children:[(0,V.jsx)("div",{className:"chat-content",ref:R,children:(0,V.jsx)("div",{children:n.length>0&&n.map((function(e,t){return(0,V.jsxs)("dl",{className:e.name===B?"info-right":"info-left",children:[(0,V.jsx)("dt",{children:e.image?(0,V.jsx)("img",{src:e.image,className:"headPortrait",alt:"\u56fe\u7247\u52a0\u8f7d\u5931\u8d25"}):(0,V.jsx)("img",{src:"data:image/png;base64,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",className:"headPortrait",alt:"\u52a0\u8f7d\u5931\u8d25"})}),(0,V.jsxs)("dd",{children:[(0,V.jsx)("div",{className:"txt-name",children:e.name}),(0,V.jsx)("div",{children:(0,V.jsx)("span",{className:"txt-content",children:e.text})})]})]},t)}))})}),(0,V.jsxs)("div",{className:"chart-button",children:[(0,V.jsx)(I.Z,{placeholder:"\u8bf7\u8f93\u5165",value:y,onChange:function(e){return J(e.target.value)},onPressEnter:F}),(0,V.jsx)(a.ZP,{type:"primary",onClick:F,children:"\u53d1\u9001"})]})]})]}),(0,V.jsxs)(c.Z,{title:"\u4f7f\u7528\u8bf4\u660e",open:u,footer:null,onCancel:function(){return x(!1)},children:[(0,V.jsx)("div",{children:"1.\u70b9\u51fb\u8fde\u63a5\uff1b"}),(0,V.jsx)("div",{children:"2.\u4f7f\u7528\u53e6\u4e00\u4e2a\u6d4f\u89c8\u5668\uff0c\u767b\u5f55\u53e6\u4e00\u4e2a\u8d26\u6237\uff0c\u70b9\u51fb\u8fde\u63a5\uff1b\u6216\u8005\u4f7f\u7528\u53e6\u4e00\u53f0\u7535\u8111\u767b\u5f55\u53e6\u4e00\u4e2a\u8d26\u6237"}),(0,V.jsx)("div",{children:"3.\u8f93\u5165\u6d88\u606f\uff0c\u70b9\u51fb\u53d1\u9001\u6216\u8005\u56de\u8f66\u53d1\u9001\uff1b"})]}),(0,V.jsx)(c.Z,{title:"\u6548\u679c\u56fe",wrapClassName:"app-img-modal",open:v,footer:null,onCancel:function(){return Y(!1)},width:"90%",children:(0,V.jsx)("img",{src:S,alt:"\u52a0\u8f7d\u5931\u8d25",className:"pic"})})]})},m=l.ZP.div.withConfig({componentId:"sc-lq0nrx-0"})(["margin-bottom:20px;.ant-btn{margin-right:10px;}"]),p=l.ZP.div.withConfig({componentId:"sc-lq0nrx-1"})(["padding:10px;.pic{width:100%;height:auto;}.app-img-modal{.ant-modal-body{height:76vh;overflow:auto;}}.chat{border:1px solid #000;box-sizing:border-box;width:353px;height:524px;position:relative;}.chat-content{height:480px;overflow-y:auto;padding:10px;.txt-name{margin-bottom:10px;}.txt-content{word-break:break-all;background-color:#0083ff;border-radius:3px;padding:5px 12px;color:#fff;}.info-right{text-align:right;padding-right:47px;dt{right:0;display:flex;align-items:center;justify-content:flex-end;}}.info-left{text-align:left;padding-left:47px;dt{left:0;display:flex;justify-content:flex-start;align-items:center;}}dl{position:relative;margin-bottom:20px;dt{width:60px;height:60px;position:absolute;top:0;}}}.headPortrait{width:40px;height:40px;border-radius:50%;}.chart-button{width:100%;position:absolute;bottom:0;display:flex;}"])}}]);