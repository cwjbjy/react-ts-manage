"use strict";(self.webpackChunkreact_ts_manage=self.webpackChunkreact_ts_manage||[]).push([[727],{2531:function(a,e,t){t.r(e);var n=t(9439),s=t(2791),r=t(7106),o=t(9286),i=t(8474),l=t(6988),c=t(4484),u=t(8502),p=t(2360),d=t(7539),h=t(2162),m=t(6452),g=t(3470),f=t(184),j=function(a){var e="image/jpeg"===a.type||"image/png"===a.type;e||l.ZP.error("You can only upload JPG/PNG file!");var t=a.size/1024/1024<2;return t||l.ZP.error("Image must smaller than 2MB!"),e&&t};e.default=function(){var a=(0,g.Z)(),e=a.fileName,t=a.setFileName,l=(0,s.useState)(!1),p=(0,n.Z)(l,2),x=p[0],w=p[1],Z=(0,s.useMemo)((function(){var a;return null===(a=d.ls.get(m.CD))||void 0===a?void 0:a.userName}),[]),y=(0,i.Z)(h.gJ,{manual:!0,onSuccess:function(a){t(a.data[0].photo)}}).run,C=(0,f.jsxs)("div",{children:[x?(0,f.jsx)(r.Z,{}):(0,f.jsx)(o.Z,{}),(0,f.jsx)("div",{style:{marginTop:8},children:"Upload"})]}),N=(0,s.useCallback)((function(a){"uploading"!==a.file.status?"done"===a.file.status&&(y({user_name:Z}),w(!1)):w(!0)}),[y,Z]);return(0,f.jsx)(v,{children:(0,f.jsxs)(c.Z,{hoverable:!0,children:[(0,f.jsx)("p",{style:{marginBottom:20},children:(0,f.jsx)("strong",{children:"\u4e0a\u4f20\u5934\u50cf\u529f\u80fd\uff0c\u4e0a\u4f20\u5b8c\u53ef\u70b9\u51fb\u9996\u9875\u89c2\u770b\u6548\u679c"})}),(0,f.jsx)(u.Z,{name:"file",data:{user_name:Z},listType:"picture-card",className:"avatar-uploader",showUploadList:!1,action:"".concat("https://wen.caowj.top/api","/uploadImage"),beforeUpload:j,onChange:N,headers:{authorization:"Bearer ".concat(d.ls.get(m.LA))},children:e?(0,f.jsx)("img",{src:"".concat("https://wen.caowj.top/images/").concat(e),alt:"avatar",style:{width:"100%"}}):C}),(0,f.jsx)("p",{className:"ant-upload-hint",children:"\u53ea\u80fd\u4e0a\u4f20jpg/png\u6587\u4ef6\uff0c\u4e14\u4e0d\u8d85\u8fc72MB"})]})})};var v=p.ZP.div.withConfig({componentId:"sc-1ra8yta-0"})(["padding:10px;.avatar-uploader > .ant-upload{width:178px;height:178px;}"])}}]);