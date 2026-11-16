const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Find boundaries of header and hero in index.html
const s3Start = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';

const s3Idx = indexHtml.indexOf(s3Start);
const s4Idx = indexHtml.indexOf(s4Start);

console.log('s3Idx:', s3Idx, 's4Idx:', s4Idx);

const newHeroSection = `<div id="shopify-section-template--16889120686294__hero_b6MgCY" class="shopify-section hero__section">

<style>
  :root {
    --ink: #0e1f10;
    --glass: rgba(242, 250, 235, 0.65);
    --accent: #0c1d0f;
  }

  /* Header contrast against water canvas */
  #header, #header a, #header span, #header button, #header .nav-item {
    color: var(--ink) !important;
  }
  #header svg path, #header svg stroke, #header svg circle, #header svg line {
    stroke: var(--ink) !important;
  }
  #header .logo svg path, #header .logo path, #header .logo text {
    fill: var(--ink) !important;
  }

  .water-hero-container {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    overflow: hidden;
    background: #b9d6a8;
  }

  #water {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 1;
  }

  /* Content Overlay */
  .water-hero-overlay {
    position: absolute;
    inset: 0;
    z-index: 5;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 40px 60px 40px;
  }

  .water-hero-content {
    max-width: 800px;
  }

  .water-hero-title {
    font-family: "ITC Garamond Condensed", "Playfair Display", Georgia, serif;
    font-size: clamp(38px, 5.5vw, 76px);
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 24px;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
  }

  .water-hero-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    border-radius: 9999px;
    background: var(--accent);
    color: #FFFFFF !important;
    font-family: 'Montserrat', 'Apercu', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    pointer-events: auto;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 16px rgba(12, 29, 15, 0.25);
  }
  .water-hero-btn:hover {
    background: #1e3822;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(12, 29, 15, 0.35);
  }

  /* Scroll Down Indicator */
  .water-scroll-indicator {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.55em;
    color: var(--ink);
    z-index: 5;
    pointer-events: none;
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    .water-hero-overlay {
      padding: 0 20px 48px 20px;
    }
    .water-hero-title {
      font-size: 36px;
    }
  }
</style>

<div class="water-hero-container">
  <canvas id="water" aria-hidden="true"></canvas>

  <div class="water-hero-overlay">
    <div class="container w-full">
      <div class="water-hero-content">
        <h1 class="water-hero-title">
          Extra Virgin Olive Oil makes everything better.
        </h1>
        <a href="/collections/all" class="water-hero-btn">
          SHOP NOW
        </a>
      </div>
    </div>
  </div>

  <div class="water-scroll-indicator">SCROLL DOWN</div>
</div>

<script>
(function(){
  var c = document.getElementById('water');
  if (!c) return;
  var gl = c.getContext('webgl');
  if (!gl) {
    c.style.background = 'radial-gradient(ellipse at 50% 50%, #dfe5ee, #8fa0ba)';
    return;
  }

  var vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var fs = \`precision highp float;uniform vec2 R;uniform float T;
float ph,pr,DY,JK,AF,SY;vec2 IC;vec3 DC;
vec3 LD(){return normalize(vec3(-.35,.7,.5));}
float H(vec2 p){
 float d=length(p);float a=atan(p.y,p.x+1e-4);
 float e1=length(p-IC);float w=e1-(pr*6.+.2);
 d+=(.03*sin(a*3.+T*.2)+.02*sin(a*5.-T*.3+1.))*smoothstep(.3,2.,d);
 float h=cos(pow(d+.001,.85)*3.4-T*1.1)*(.5+.5*exp(-d*.2))*smoothstep(.1,1.6,d);
 h+=.3*cos(d*2.1-T*.7+1.)*exp(-d*.15)*smoothstep(.1,1.6,d);
 h+=cos(w*4.)*exp(-w*w*.5)*(1.-pr)*step(.4,ph);
 h+=exp(-e1*e1*10.)*(-cos(pr*9.)*exp(-pr*4.))*1.6*step(.4,ph);
 return h*.11*AF;}
vec3 env(vec3 r){
 float y=clamp(r.y,-.2,1.);
 vec3 c=mix(vec3(.5,.67,.48),vec3(.96,.99,.92),smoothstep(.28,.7,y));
 c=mix(c,vec3(.5,.68,.46),smoothstep(.86,1.,y)*.6);
 return c+pow(max(dot(r,LD()),0.),10.)*.15;}
float smn(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float map(vec3 p){
 if(ph<.4){vec3 q=p-DC;q.x+=q.y*.12*sin(T*9.);float sx=1./sqrt(SY);q/=vec3(sx,SY,sx);return (length(q)-.28)*.7;}
 return 1e3;}
vec3 nrm(vec3 p){vec2 e=vec2(.004,0.);
 return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
vec3 envD(vec3 r){
 vec3 c=env(r);
 float bx=(1.-smoothstep(.2,.3,abs(r.x+.32)))*(1.-smoothstep(.18,.27,abs(r.y-.5)));
 float st=(1.-smoothstep(.02,.06,abs(r.x-.62)))*(1.-smoothstep(.3,.4,abs(r.y-.45)));
 c=mix(c,vec3(1.,1.,.96),bx*.95);
 c=mix(c,vec3(.9,1.,.86),st*.6);
 return mix(c,vec3(.3,.42,.28),smoothstep(.14,.02,r.y)*.7);}
vec3 wApprox(vec2 xz){float d=length(xz);float l=mix(.5,.5+.5*cos(pow(d+.001,.85)*3.4-T*1.1),exp(-d*.3));
 return mix(vec3(.5,.68,.47),vec3(.93,.98,.88),l);}
vec3 dropCol(vec3 rd,vec3 n){
 float nv=max(dot(n,-rd),0.);float F=.03+.97*pow(1.-nv,5.);
 vec3 rf=reflect(rd,n);vec3 re=envD(rf);
 vec3 r1=refract(rd,n,.68);vec3 ne=n-2.*dot(n,r1)*r1;
 vec3 q=DC+ne*.28;
 vec3 r2=refract(r1,-ne,1.47);if(dot(r2,r2)<.01)r2=reflect(r1,-ne);
 vec3 tr;
 float tt=-q.y/min(r2.y,-.02);tr=mix(envD(r2),wApprox((q+r2*tt).xz-IC),smoothstep(0.,-.2,r2.y));
 float th=-.56*dot(n,r1);
 vec3 body=tr*exp(-vec3(.1,.03,.35)*th*2.)*mix(.45,1.,smoothstep(.12,.6,nv));
 body+=vec3(.95,1.,.7)*smoothstep(.4,.9,-n.y)*smoothstep(0.,.7,nv)*.4;
 float sp=max(dot(rf,LD()),0.);
 return mix(body,re,F*1.1+.04)+pow(sp,150.)*1.5;}
void main(){
 vec2 p=(gl_FragCoord.xy-.5*R)/R.y;
 ph=fract(T/3.6);pr=clamp((ph-.4)/.6,0.,1.);
 float kk=floor(T/3.6)+1.;IC=vec2(fract(sin(kk*12.9898)*43758.5453)-.5,fract(sin(kk*78.233)*12345.679)-.5)*vec2(1.5,.9);
 float f=clamp(ph/.4,0.,1.);DY=4.6-4.3*f*f;SY=1.+.14*sin(T*13.)*(1.-.3*f)+.14*f;DC=vec3(IC.x+.12*sin(f*5.+kk)*(1.-f),DY,IC.y);JK=sin(clamp((ph-.4)/.2,0.,1.)*3.14159);
 vec3 ro=vec3(0.,4.2,-4.4);vec3 fw=normalize(vec3(0.,0.,.2)-ro);
 vec3 rt=normalize(cross(vec3(0.,1.,0.),fw));vec3 up=cross(fw,rt);
 vec3 rd=normalize(fw*.85+rt*p.x+up*p.y);
 float tw=1e4;vec3 col=vec3(.75,.88,.7);AF=1.;
 if(rd.y<-.001){
  float t=-ro.y/rd.y;AF=exp(-.07*max(t-7.,0.));
  for(int i=0;i<3;i++){vec3 q=ro+rd*t;t=(ro.y-H(q.xz))/(-rd.y);}
  tw=t;vec3 q=ro+rd*t;float e=.04+.012*t;
  vec3 nn=normalize(vec3(-(H(q.xz+vec2(e,0.))-H(q.xz-vec2(e,0.)))/(2.*e)*1.4,1.,-(H(q.xz+vec2(0.,e))-H(q.xz-vec2(0.,e)))/(2.*e)*1.4));
  float cv=max(dot(nn,-rd),0.);float F=.5+.5*pow(1.-cv,3.);
  vec3 Rr=reflect(rd,nn);vec3 e0=env(Rr);
  if(ph<.6){vec3 c=vec3(0.,ph<.4?DY+.1:.05+.9*JK,0.);vec3 oc=q-c;float bb=dot(oc,Rr);float cc=dot(oc,oc)-.25;float ds=bb*bb-cc;
   if(ds>0.){float th=-bb-sqrt(ds);if(th>0.){vec3 hn=normalize(oc+Rr*th);e0=mix(e0,dropCol(Rr,hn),.0);}}}
  vec3 body=vec3(.66,.8,.62)*(.8+.2*nn.y);
  col=mix(body,e0,F)+pow(max(dot(Rr,LD()),0.),60.)*.3;
  if(ph<.4){vec2 sc=IC+vec2(.5*DY,-.71*DY);float d2=length(q.xz-sc);
   col*=1.-.22*exp(-d2*d2*5.);col+=vec3(1.,1.,.85)*exp(-d2*d2*40.)*.18;}
  col=mix(col,vec3(.8,.9,.76),smoothstep(10.,26.,t)*.5);
 }
 if(ph<.6){float td=0.;bool hit=false;
  for(int i=0;i<56;i++){float d=map(ro+rd*td);if(d<.003){hit=true;break;}td+=d;if(td>tw||td>30.)break;}
  if(hit&&td<tw)col=dropCol(rd,nrm(ro+rd*td));}
 col*=1.-.22*smoothstep(.35,1.,length(p*vec2(.8,1.1)));
 gl_FragColor=vec4(col,1.);}\`;

  function sh(t,s){
    var o=gl.createShader(t);
    gl.shaderSource(o,s);
    gl.compileShader(o);
    return o;
  }

  var pr=gl.createProgram();
  gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));
  gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(pr);
  gl.useProgram(pr);

  var b=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,b);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);

  var loc=gl.getAttribLocation(pr,'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

  var uR=gl.getUniformLocation(pr,'R'), uT=gl.getUniformLocation(pr,'T');

  function size(){
    var s=Math.min(window.devicePixelRatio||1, 1.25);
    c.width=c.clientWidth*s;
    c.height=c.clientHeight*s;
    gl.viewport(0,0,c.width,c.height);
  }
  size();
  window.addEventListener('resize', size);

  var m=/[?&]t=([\\d.]+)/.exec(location.search);
  var TT=m?parseFloat(m[1]):null;
  var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t0=performance.now();

  function f(n){
    gl.uniform2f(uR, c.width, c.height);
    gl.uniform1f(uT, TT!==null ? TT : (still ? 1.5 : (n-t0)/1000));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!still) requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
})();
</script>

</div>

`;

const before = indexHtml.substring(0, s3Idx);
const after = indexHtml.substring(s4Idx);
const integratedHtml = before + newHeroSection + after;

fs.writeFileSync('index.html', integratedHtml);
console.log('Applied WebGL water hero to index.html! Length:', integratedHtml.length);
