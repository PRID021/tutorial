import{j as s}from"./jsx-runtime.BPj4-Rfu.js";import{r as g}from"./index.SSXOyoI7.js";/* empty css                       */import{m as c}from"./motion.D6v1sI3p.js";class u{constructor(t=0,i="Network Error"){this.status=t,this.text=i}}const R=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},r={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:R()},y=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},T=(e,t="https://api.emailjs.com")=>{if(!e)return;const i=y(e);r.publicKey=i.publicKey,r.blockHeadless=i.blockHeadless,r.storageProvider=i.storageProvider,r.blockList=i.blockList,r.limitRate=i.limitRate,r.origin=i.origin||t},w=async(e,t,i={})=>{const o=await fetch(r.origin+e,{method:"POST",headers:i,body:t}),a=await o.text(),n=new u(o.status,a);if(o.ok)return n;throw n},v=(e,t,i)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||typeof i!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},H=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},j=e=>e.webdriver||!e.languages||e.languages.length===0,x=()=>new u(451,"Unavailable For Headless Browser"),V=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},E=e=>!e.list?.length||!e.watchVariable,N=(e,t)=>e instanceof FormData?e.get(t):e[t],k=(e,t)=>{if(E(e))return!1;V(e.list,e.watchVariable);const i=N(t,e.watchVariable);return typeof i!="string"?!1:e.list.includes(i)},L=()=>new u(403,"Forbidden"),C=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a string"},K=async(e,t,i)=>{const o=Number(await i.get(e)||0);return t-Date.now()+o},P=async(e,t,i)=>{if(!t.throttle||!i)return!1;C(t.throttle,t.id);const o=t.id||e;return await K(o,t.throttle,i)>0?!0:(await i.set(o,Date.now().toString()),!1)},S=()=>new u(429,"Too Many Requests"),_=async(e,t,i,o)=>{const a=y(o),n=a.publicKey||r.publicKey,d=a.blockHeadless||r.blockHeadless,m=r.storageProvider||a.storageProvider,p={...r.blockList,...a.blockList},f={...r.limitRate,...a.limitRate};return d&&j(navigator)?Promise.reject(x()):(v(n,e,t),H(i),i&&k(p,i)?Promise.reject(L()):await P(location.pathname,f,m)?Promise.reject(S()):w("/api/v1.0/email/send",JSON.stringify({lib_version:"4.3.3",user_id:n,service_id:e,template_id:t,template_params:i}),{"Content-type":"application/json"}))},F=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},M=e=>typeof e=="string"?document.querySelector(e):e,B=async(e,t,i,o)=>{const a=y(o),n=a.publicKey||r.publicKey,d=a.blockHeadless||r.blockHeadless,m=r.storageProvider||a.storageProvider,p={...r.blockList,...a.blockList},f={...r.limitRate,...a.limitRate};if(d&&j(navigator))return Promise.reject(x());const b=M(i);v(n,e,t),F(b);const l=new FormData(b);return k(p,l)?Promise.reject(L()):await P(location.pathname,f,m)?Promise.reject(S()):(l.append("lib_version","4.3.3"),l.append("service_id",e),l.append("template_id",t),l.append("user_id",n),w("/api/v1.0/email/send-form",l))},q={init:T,send:_,sendForm:B,EmailJSResponseStatus:u},h={initial:{y:500,opacity:0},animate:{y:0,opacity:1,transition:{duration:.5,staggerChildren:.1}}},z=()=>{const e=g.useRef(),[t,i]=g.useState(!1),[o,a]=g.useState(!1),n=d=>{d.preventDefault(),q.sendForm("service_yvb5o8c","template_sp4s8eh",e.current,"d0QKRV88ARa8AKoKu").then(m=>{a(!0)},m=>{i(!0)})};return s.jsx("section",{children:s.jsxs(c.div,{className:"contact",variants:h,initial:"initial",whileInView:"animate",children:[s.jsxs(c.div,{variants:h,className:"textContainer",children:[s.jsx("h1",{children:"Let's work together"}),s.jsxs(c.div,{variants:h,className:"item",children:[s.jsx("h2",{children:"Mail"}),s.jsx("span",{children:"hoangduc.uit.dev@gmail.com"})]}),s.jsxs(c.div,{variants:h,className:"item",children:[s.jsx("h2",{children:"Address"}),s.jsx("span",{children:"30/3 Bach Dang Street - Tan Binh District - Ho Chi Minh City·"})]}),s.jsxs(c.div,{variants:h,className:"item",children:[s.jsx("h2",{children:"Phone"}),s.jsx("span",{children:"(+84) 0376 385 401"})]})]}),s.jsxs("div",{className:"formContainer",children:[s.jsx(c.div,{className:"phoneSvg",initial:{opacity:1},transition:{delay:3,duration:1},whileInView:{opacity:0},children:s.jsx("svg",{width:"450px",height:"450px",viewBox:"0 0 32.666 32.666",children:s.jsx(c.path,{strokeWidth:.2,initial:{pathLength:0},whileInView:{pathLength:1},transition:{duration:3},fill:"none",d:`M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
            M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0
            C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01
            c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319
            c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529
            c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814
            c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001
            c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459
            c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084
            c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292
            c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095
            l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719
            C32.666,7.326,25.339,0,16.333,0z`})})}),s.jsxs(c.form,{ref:e,onSubmit:n,initial:{opacity:0},transition:{delay:4,duration:1},whileInView:{opacity:1},children:[s.jsx("input",{type:"text",required:!0,placeholder:"Name",name:"name"}),s.jsx("input",{type:"email",required:!0,placeholder:"Email",name:"email"}),s.jsx("textarea",{rows:"8",placeholder:"Message",name:"message"}),s.jsx("button",{children:"Submit"}),t&&"Error",o&&"Success"]})]})]})})};export{z as default};
