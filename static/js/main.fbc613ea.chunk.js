(this["webpackJsonpmj-chakra-ui-app"]=this["webpackJsonpmj-chakra-ui-app"]||[]).push([[0],{148:function(e,t,n){e.exports=n(165)},165:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),l=n(29),c=n.n(l),o=n(102),i=n(68),s=n(84),m=n(45),u=Object(s.a)({styles:{global:{body:{fontFamily:"'Lato', sans-serif;",color:"#2A2D30"}}},colors:Object(i.a)(Object(i.a)({},m.b.colors),{},{primary:"#318E86",accent:"#ED7737",bg:{gray:"#F7F6F4"},brand:{900:"#1a365d",800:"#153e75",700:"#2a69ac"},sidebar:{bg:"#2a3b50"},text:{secondary:"#b7b7b7"},btn:{primary:"#3B76FB"}}),metrics:{sidebar:200,header:"10vh"}}),d=n(39),g=n(171),h=function(e){var t=e.children,n=(e.style,Object(d.a)(e,["children","style"]));return r.a.createElement(g.a,n,t)},E=n(42),b=n(13),f=n(3),p=n(15),v=n(182),y=n(111),w=n(112),j=n(174),x=n(184),O=n(176),C=n(177),S=n(183),k=r.a.createContext(),z=k;function I(){var e=r.a.useContext(k);if(void 0===e)throw new Error("useAppContext must be used within an AppProvider");return e}var L=n(114),A=n(178),F=function(e){var t=Object(L.a)({initialValues:{username:"",password:""},onSubmit:function(t){e.login(t)}}),n=t.handleChange,a=t.values,l=t.handleSubmit;return r.a.createElement(j.a,{textAlign:"center",pt:"60px",minW:"50%"},r.a.createElement(x.a,{src:"/images/logogeneric.png",d:"inline-block",w:"300px",alt:"Your Logo"}),r.a.createElement("br",null),r.a.createElement(O.a,{as:"h4",mt:"50px",size:"lg"},"Login"),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:l},r.a.createElement(C.a,null,r.a.createElement(S.a,{value:a.username,className:"",bg:"white",size:"lg",mb:"4",onChange:n,name:"username",placeholder:"Username"}),r.a.createElement(S.a,{onChange:n,className:"",bg:"white",size:"lg",mb:"4",value:a.password,name:"password",type:"password",placeholder:"Password"}),r.a.createElement(w.a,{leftIcon:r.a.createElement(A.a,null),isLoading:e.loading,className:"inputShadow",loadingText:"Logging in...",colorScheme:"blue",type:"submit"},"Secure Login"))))},T=function(e){var t=Object(b.g)(),n=Object(a.useState)({loading:!1,error:null,data:null}),l=Object(f.a)(n,2),c=l[0],o=l[1],i=c.loading,s=c.error,m=c.data,u=I().setAuthenticated,d=Object(p.useToast)();Object(a.useEffect)((function(){s&&d({status:"error",title:"Error login",description:"You are not authorized - "+s.message})}),[s,d]),Object(a.useEffect)((function(){m&&(u(!0),sessionStorage.setItem("@login",m.login.access_token),t.push("/"),d({status:"success",title:"Login success",description:"You are successfully loggedIn"}))}),[m,t,u,d]);r.a.useRef();var h=function(){return o({error:{message:"Login Failed!"},data:null,loading:!1})};return r.a.createElement(g.a,{w:"100%",h:"100vh",className:"",bg:"white"},r.a.createElement(g.a,{h:"100vh",w:["100%","100%","50%"],className:"",align:"center",direction:"column"},r.a.createElement(F,{login:function(e){console.log("login click",e),o({loading:!0,error:null,data:null})},loading:i}),r.a.createElement(v.a,{returnFocusOnClose:!1,isOpen:i,onClose:h,placement:"right",closeOnBlur:!1},r.a.createElement(v.g,null,r.a.createElement("span",null)),r.a.createElement(v.d,{zIndex:4},r.a.createElement(v.f,{fontWeight:"semibold"},"Login Action"),r.a.createElement(v.b,null),r.a.createElement(v.c,null),r.a.createElement(v.e,{d:"flex",justifyContent:"flex-end"},r.a.createElement(y.a,{size:"sm"},r.a.createElement(w.a,{colorScheme:"red",onClick:h},"Failed"),r.a.createElement(w.a,{colorScheme:"green",onClick:function(){return o({data:{login:{access_token:!0}},loading:!1,error:null})}},"Success")))))),r.a.createElement(g.a,{h:"100vh",w:[0,0,"50%"],bg:"#e6f2ff",justifyContent:"center"},r.a.createElement(j.a,null,r.a.createElement(x.a,{src:"/images/login.jpg"}))))},W=n(113),B=n(63),N=function(e){var t=e.isFlex,n=e.heading,a=e.children,l=Object(d.a)(e,["isFlex","heading","children"]),c=t?g.a:j.a;return r.a.createElement(c,Object.assign({bg:"white",w:"100%",h:"90vh",p:"20px"},l),n?r.a.createElement(O.a,{size:"lg",mb:1},n):null,a)},D=function(e){return r.a.createElement(N,{bg:"gray.50"},"Namaste")},R=(n(100),function(e){var t=e.fixed,n=e.children,a=Object(d.a)(e,["fixed","children"]),l=Object(p.useTheme)(),c=t?{position:"fixed",zIndex:100,top:0,right:0}:{left:0};return r.a.createElement(g.a,Object.assign({h:l.metrics.header,borderBottom:"1px",borderColor:"gray.200",left:[0,0,0,l.metrics.sidebar]},a,{style:c,bg:"white"}),n)}),P=function(e){var t=Object(p.useTheme)();return r.a.createElement(g.a,{paddingX:10,direction:"column",alignItems:"center",justifyContent:"center",h:t.metrics.header},r.a.createElement(O.a,{color:"gray.700",fontSize:"xl"},"Welcome"))},Y=r.a.createContext(),H=Y,J=function(e){var t=Object(a.useMemo)((function(){return{}}),[]);return r.a.createElement(H.Provider,{value:t},r.a.createElement(g.a,{w:"100%",h:"100vh",bg:"gray.50"},e.children))},M=n(180),V=(n(179),function(e){var t=Object(p.useTheme)();return r.a.createElement(g.a,{direction:"column",w:[0,0,0,t.metrics.sidebar],h:"100vh",borderRight:"1px",borderColor:"gray.200",bg:"white"},e.children)}),_=function(e){var t=e.icon,n=Object(d.a)(e,["icon"]),a=Object(p.useTheme)();return r.a.createElement(M.a,Object.assign({h:a.metrics.header,w:a.metrics.header,color:"gray.400",fontSize:a.fontSizes.xl,style:{aspectRatio:1,borderRadius:0},bg:"transparent",icon:t},n))},U=n(47),X=n(181),$={open:{y:0,opacity:1,transition:{y:{stiffness:1e3,velocity:-100}}},closed:{y:-20,opacity:0,transition:{y:{stiffness:1e3}}}},q=function(e){var t=e.icon,n=e.title,a=e.to,l=e.opened,c=e.chevron,o=Object(p.useTheme)(),i=Object(b.h)(),s=Object(b.f)(a,{path:i.pathname,exact:!0}),m="function"===typeof t?t():r.a.isValidElement(t)?t:void 0,u=a?E.b:"a";return r.a.createElement(U.b.li,{initial:"closed",animate:"open",exit:"closed",variants:$,style:{borderLeft:s&&"3px solid ".concat(o.colors.orange[300]),color:o.colors.gray[800]}},r.a.createElement(U.b.div,{whileHover:{x:3,color:"black"},whileTap:{scale:.99}},r.a.createElement(u,{style:{fontSize:o.fontSizes.sm,fontWeight:o.fontWeights.medium,display:"flex",alignItems:"center",justifyContent:"space-between",padding:10,paddingLeft:20},to:a},r.a.createElement(g.a,{alignItems:"center",fontWeight:s?"bold":"400",fontSize:"md"},r.a.createElement(j.a,{w:8},m),n),c?r.a.createElement(U.b.div,{animate:{rotate:l?90:0}},r.a.createElement(X.a,null)):null)))},G=function(e){var t=e.children,n=e.icon,l=e.title,c=(e.root,Object(a.useState)(!l)),o=Object(f.a)(c,2),i=o[0],s=o[1],m=Object(a.useRef)(null);return r.a.createElement("nav",{ref:m},l?r.a.createElement("div",{onClick:function(){return s((function(e){return!e}))}},r.a.createElement(q,{icon:n,opened:i,chevron:!0,title:l})):null,r.a.createElement(U.a,{initial:!l},i?r.a.createElement(U.b.ul,{key:"content",initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto",transition:{staggerChildren:.07,delayChildren:.2}},collapsed:{opacity:0,height:0,transition:{duration:.3,staggerChildren:.05,staggerDirection:-1}}},transition:{duration:.3},style:{paddingLeft:l?10:5,listStyle:"none"}},t):null))},K=function(e){return r.a.createElement(J,null,r.a.createElement(V,null,r.a.createElement(g.a,{flex:1,pt:20,overflow:"auto"},r.a.createElement(j.a,{w:"100%"},r.a.createElement(G,{root:!0,bg:"white"},r.a.createElement(q,{title:"Home",to:"/",icon:r.a.createElement(B.a,null)}),r.a.createElement(q,{title:"Item1",to:"/item1",icon:r.a.createElement(B.b,null)}),r.a.createElement(q,{title:"Item2",to:"/item2",icon:r.a.createElement(B.c,null)}))))),r.a.createElement(Q,null))},Q=function(e){var t=I().setAuthenticated,n=Object(p.useTheme)();return r.a.createElement(j.a,{flex:1,overflowY:"auto"},r.a.createElement(R,{fixed:!0,justifyContent:"space-between",alignItems:"center"},r.a.createElement(g.a,{justifyContent:"space-between",w:"100%"},r.a.createElement(j.a,null,r.a.createElement(P,null)),r.a.createElement(j.a,null,r.a.createElement(_,{icon:r.a.createElement(W.a,{fontSize:"30px",color:"#5DADE2"}),onClick:function(){t(!1),sessionStorage.removeItem("@login")}})))),r.a.createElement(g.a,{flex:1,pt:n.metrics.header},r.a.createElement(Z,null)))},Z=function(){return r.a.createElement(b.d,null,r.a.createElement(b.b,{exact:!0,path:"/",component:D}),r.a.createElement(b.b,{exact:!0,path:"/item1",component:ee}),r.a.createElement(b.b,{exact:!0,path:"/item2",component:ee}))},ee=function(e){return r.a.createElement(g.a,{flex:1,p:10,justify:"space-between",bg:"white",h:"200vh"},r.a.createElement(C.a,null,r.a.createElement("div",null,"Test Component")))},te=function(e){return r.a.createElement(b.d,null,r.a.createElement(b.b,{path:"/",component:K}))},ne=function(e){return I().isAuthenticated?r.a.createElement(b.b,e):r.a.createElement(b.a,{to:"/login"})},ae=function(e){return r.a.createElement(E.a,null,r.a.createElement(b.d,null,r.a.createElement(b.b,{path:"/login",component:T}),r.a.createElement(ne,{path:"/",component:te})))},re=function(e){var t=e.children,n=Object(a.useState)((function(){return!!sessionStorage.getItem("@login")})),l=Object(f.a)(n,2),c=l[0],o=l[1],i=Object(a.useMemo)((function(){return{isAuthenticated:c,setAuthenticated:o}}),[c]);return r.a.createElement(z.Provider,{value:i},t)},le=n(167),ce=function(e){var t=e.message,n=void 0===t?"Loading...":t,a=e.absolute;return r.a.createElement(g.a,{zIndex:99999,style:a?{position:"absolute",top:0,bottom:0,left:0,right:0}:{},direction:"column",sx:{background:"rgba(255,255,255,0.5)"},w:"100%",h:"100vh",justifyContent:"center",alignItems:"center"},r.a.createElement(O.a,{size:"sm"},n),r.a.createElement(le.a,{mt:4,size:"lg"}))};function oe(){return r.a.createElement(h,{bg:"gray.900"},r.a.createElement(ae,null))}var ie=function(){return r.a.createElement(o.a,{theme:u},r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(ce,null)},r.a.createElement(re,null,r.a.createElement(oe,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(ie,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[148,1,2]]]);
//# sourceMappingURL=main.fbc613ea.chunk.js.map