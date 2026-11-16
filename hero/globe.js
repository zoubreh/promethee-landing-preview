/* Promethee landing, the planet seen through the f10 (9 Nov). One engine, three ideas (opts.mode):
   'lights' (A): the night of the f11, the lit world, a few soft links.  'web' (B): the links are the hero, lifted arcs with pulses.
   'dawn' (C): the pointer moves the sun, a crescent of day rises on the limb, the cities only shine on the night side.
   Three layers inside the scene: base (ray-cast sphere, rim and white halo), stars (static), live (people, cities, links, every frame).
   Scene space 1440 x 900, the same as planet.js. No colour: ivory on black. */
(function(){
var IV='237,234,228', D2R=Math.PI/180;
var CITIES=[
 [51.51,-0.13,1.0],[48.86,2.35,1.0],[52.52,13.40,0.6],[40.42,-3.70,0.7],[41.39,2.17,0.5],[45.46,9.19,0.55],[41.90,12.50,0.5],[52.37,4.90,0.45],
 [50.85,4.35,0.35],[53.48,-2.24,0.4],[52.49,-1.89,0.35],[55.95,-3.19,0.2],[55.86,-4.25,0.25],[53.35,-6.26,0.3],[51.90,-8.47,0.12],[38.72,-9.14,0.35],
 [41.15,-8.61,0.25],[43.26,-2.93,0.2],[43.36,-8.41,0.12],[44.84,-0.58,0.25],[47.22,-1.55,0.2],[48.11,-1.68,0.15],[43.60,1.44,0.25],[43.30,5.37,0.3],
 [45.76,4.84,0.3],[50.63,3.06,0.2],[50.11,8.68,0.35],[48.14,11.58,0.35],[53.55,9.99,0.35],[50.94,6.96,0.4],[51.23,6.78,0.3],[47.37,8.54,0.25],
 [46.20,6.14,0.15],[48.21,16.37,0.35],[50.08,14.44,0.3],[52.23,21.01,0.4],[47.50,19.04,0.3],[44.43,26.10,0.3],[37.98,23.73,0.3],[55.68,12.57,0.3],
 [59.33,18.07,0.3],[59.91,10.75,0.2],[60.17,24.94,0.2],[55.76,37.62,0.9],[59.93,30.36,0.5],[50.45,30.52,0.45],[41.01,28.98,0.9],[39.93,32.86,0.4],
 [30.04,31.24,0.9],[33.57,-7.59,0.4],[36.75,3.06,0.35],[36.81,10.18,0.25],[31.95,35.93,0.25],[33.89,35.50,0.25],[40.71,-74.01,1.0],[42.36,-71.06,0.45],
 [39.95,-75.17,0.45],[38.91,-77.04,0.45],[41.88,-87.63,0.7],[43.65,-79.38,0.6],[45.50,-73.57,0.45],[46.81,-71.21,0.15],[44.65,-63.57,0.12],[47.56,-52.71,0.08],
 [42.33,-83.05,0.35],[34.05,-118.24,0.9],[37.77,-122.42,0.6],[47.61,-122.33,0.4],[49.28,-123.12,0.3],[29.76,-95.37,0.5],[32.78,-96.80,0.5],[33.75,-84.39,0.45],
 [25.76,-80.19,0.45],[39.74,-104.99,0.3],[33.45,-112.07,0.35],[44.98,-93.27,0.3],[19.43,-99.13,0.9],[35.68,139.69,1.0],[34.69,135.50,0.6],[43.06,141.35,0.2],
 [37.57,126.98,0.8],[39.90,116.41,0.9],[39.13,117.20,0.5],[41.80,123.43,0.4],[45.80,126.53,0.3],[31.23,121.47,1.0],[22.54,114.06,0.7],[23.13,113.26,0.6],
 [30.57,104.07,0.5],[30.59,114.31,0.45],[34.34,108.94,0.4],[25.03,121.57,0.4],[1.35,103.82,0.5],[13.76,100.50,0.6],[28.61,77.21,0.9],[19.08,72.88,0.9],
 [12.97,77.59,0.6],[13.08,80.27,0.5],[22.57,88.36,0.6],[24.86,67.01,0.6],[31.55,74.34,0.5],[23.81,90.41,0.6],[35.69,51.39,0.6],[25.20,55.27,0.4],
 [24.71,46.68,0.35],[43.24,76.95,0.2],[41.30,69.24,0.25],[55.03,82.92,0.2],[56.84,60.60,0.2],[-6.21,106.85,0.8],[14.60,120.98,0.6],[-23.55,-46.63,0.9],
 [-22.91,-43.17,0.6],[-34.60,-58.38,0.7],[-12.05,-77.04,0.5],[4.71,-74.07,0.5],[-33.45,-70.67,0.4],[6.52,3.38,0.8],[-1.29,36.82,0.3],[-26.20,28.05,0.5],
 [-33.92,18.42,0.3],[9.03,38.74,0.3],[5.60,-0.19,0.3],[-33.87,151.21,0.5],[-37.81,144.96,0.4],
 // the Mediterranean rim, so both shores are inhabited
 [35.70,-0.63,0.3],[36.37,6.61,0.2],[34.74,10.76,0.15],[34.02,-6.83,0.3],[34.03,-5.00,0.2],[35.76,-5.83,0.15],[32.89,13.19,0.25],[39.47,-0.38,0.35],
 [37.39,-5.98,0.3],[36.72,-4.42,0.25],[37.99,-1.13,0.15],[39.57,2.65,0.12],[40.85,14.27,0.45],[38.12,13.36,0.3],[37.50,15.09,0.2],[41.12,16.87,0.2],
 [39.22,9.12,0.12],[40.64,22.94,0.25],[38.42,27.14,0.3],[36.90,30.70,0.15],[43.70,7.27,0.2],[44.41,8.93,0.2],[45.44,12.32,0.2],[44.49,11.34,0.25],
 [43.77,11.25,0.25],[45.07,7.69,0.3],[45.81,15.98,0.2],[44.79,20.45,0.3],[42.70,23.32,0.25],[43.85,18.36,0.12],[41.33,19.82,0.12],[42.43,-8.65,0.1],
 [41.65,-0.88,0.2],[39.47,-6.37,0.06],[37.88,-4.78,0.12],[38.35,-0.48,0.15],
 // the British Isles and the North Sea, the framing of the swing
 [53.80,-1.55,0.35],[53.41,-2.98,0.3],[51.45,-2.59,0.25],[54.98,-1.61,0.25],[54.60,-5.93,0.2],[51.48,-3.18,0.2],[57.15,-2.09,0.12],[53.27,-9.05,0.1],
 [51.92,4.48,0.3],[57.71,11.97,0.25],[56.16,10.20,0.15],[55.60,13.00,0.15],[53.08,8.80,0.2],[58.97,5.73,0.1],[52.63,1.30,0.12],[50.90,-1.40,0.2],
 [52.95,-1.15,0.2],[53.38,-1.47,0.2],[52.66,-8.63,0.1],[63.43,10.40,0.08],[60.39,5.32,0.12],[56.46,-2.97,0.1],[50.37,-4.14,0.12],[52.21,0.12,0.12]
];
function start(stage, opts){
  opts=opts||{};
  var MODE=opts.mode||'lights', W=1440, H=900, dpr=opts.dpr>0?opts.dpr:Math.min(2,window.devicePixelRatio||1);
  var OPEN=opts.openings, X0=OPEN[0].x0-30, X1=OPEN[2].x1+30, Y0=110, Y1=OPEN[0].y1+16;
  // ---- camera: above the sphere (radius 1, centre 0), pitched up so the limb crosses the arches at HY ----
  var D=opts.alt||1.28, FP=(opts.f||1.55)*H, HY=opts.horizon||300, CY=H/2;
  var A=Math.asin(1/D), P=A-Math.atan((CY-HY)/FP), F1=Math.sin(P), F2=-Math.cos(P), U1=Math.cos(P), U2=Math.sin(P);
  function proj(x,y,z,o){ var vz=z-D, zc=y*F1+vz*F2; if(zc<=0.01) return false; o[0]=W/2+FP*x/zc; o[1]=CY-FP*(y*U1+vz*U2)/zc; o[2]=FP/zc; return true; }
  // ---- rotation: longitude under the camera, latitude under the camera (tilt) ----
  var lon=(opts.lon0!=null?opts.lon0:20)*D2R, tilt=(opts.lat0!=null?opts.lat0:22)*D2R, vlon=0, vlat=0, follow=[0,0], fcur=[0,0];
  var cl,sl,ct,st;
  function setRot(){ cl=Math.cos(-lon); sl=Math.sin(-lon); ct=Math.cos(tilt); st=Math.sin(tilt); }
  var R3=[0,0,0];
  function rot(x,y,z){ var x1=x*cl+z*sl, z1=-x*sl+z*cl; R3[0]=x1; R3[1]=y*ct-z1*st; R3[2]=y*st+z1*ct; }
  function geo(la,lo){ la*=D2R; lo*=D2R; var c=Math.cos(la); return [c*Math.sin(lo),Math.sin(la),c*Math.cos(lo)]; }
  // ---- canvases ----
  function mk(scale){ var c=document.createElement('canvas'); c.width=Math.round(W*scale); c.height=Math.round(H*scale); c.setAttribute('aria-hidden','true'); c.style.cssText='position:absolute;left:0;top:0;width:100%;height:100%;display:block'; stage.appendChild(c); return c; }
  var BS=Math.min(dpr,1.6), base=mk(MODE==='dawn'?BS:dpr), live=mk(dpr), ctx=live.getContext('2d');
  live.style.cursor='grab';
  // ---- the sun (dawn only): a direction in camera space ----
  var SUN=[0,0,0], sunT=[0,0,0];
  function sunFrom(u,v){ var x=(u-0.5)*1.2, y=0.75, z=-0.2-0.2*v; var l=Math.hypot(x,y,z); return [x/l,y/l,z/l]; }
  if(MODE==='dawn'){ var s0=sunFrom(0.75,0.5); SUN=s0.slice(); sunT=s0.slice(); }
  // ---- base: ray-cast sphere. Inside: near-black body, a rim that brightens toward the limb (and the day side at dawn). Outside: the white halo ----
  var HALO=opts.halo||1, RIM=opts.rim||1;
  function renderBase(scale){
    var bw=base.width, bh=base.height, bc=base.getContext('2d'), img=bc.createImageData(bw,bh), d8=img.data;
    var dawn=MODE==='dawn';
    for(var j=0;j<bh;j++){ var sy=(j+0.5)/scale; if(sy>Y1+40){ for(var i0=0;i0<bw;i0++){ var q=(j*bw+i0)*4; d8[q]=6; d8[q+1]=7; d8[q+2]=7; d8[q+3]=255; } continue; }
      for(var i=0;i<bw;i++){ var sx=(i+0.5)/scale;
        var a=(sx-W/2)/FP, b=(CY-sy)/FP; var dx=a, dy=F1+b*U1, dz=F2+b*U2; var l=Math.hypot(dx,dy,dz); dx/=l; dy/=l; dz/=l;
        var bb=D*dz, c=D*D-1, disc=bb*bb-c, v=0;
        if(disc>0&&-bb-Math.sqrt(disc)>0){ var t=-bb-Math.sqrt(disc), nx=dx*t, ny=dy*t, nz=D+dz*t;
          var mu=-(nx*dx+ny*dy+nz*dz); var rim=Math.pow(1-mu,4.5);
          v=0.018+0.40*RIM*rim;
          if(dawn){ var ld=nx*SUN[0]+ny*SUN[1]+nz*SUN[2]; var day=Math.max(0,ld); var term=Math.exp(-Math.pow(ld/0.08,2)); var dl=Math.max(0,Math.min(1,(ld+0.02)/0.13)); dl=dl*dl*(3-2*dl); v=0.012+0.30*RIM*rim*(0.2+0.8*dl) + 0.50*dl*(0.55+0.45*rim)*(0.7+1.5*Math.max(0,ld)) + 0.05*term; }
        } else if(-bb>0){ var dist=Math.sqrt(Math.max(0,D*D-bb*bb))-1; if(dist<0) dist=0;
          var hv=0.95*Math.exp(-dist/0.0045)+0.30*Math.exp(-dist/0.022)+0.10*Math.exp(-dist/0.09);
          if(dawn){ var cx=dx*(-bb), cy2=dy*(-bb), cz=D+dz*(-bb), cn=Math.hypot(cx,cy2,cz); var sd=(cx*SUN[0]+cy2*SUN[1]+cz*SUN[2])/cn; hv*=0.25+1.1*Math.max(0,sd+0.15); }
          v=HALO*hv; }
        var g=Math.min(1,v); var q2=(j*bw+i)*4;
        d8[q2]=Math.round(6+(237-6)*g); d8[q2+1]=Math.round(7+(234-7)*g); d8[q2+2]=Math.round(7+(228-7)*g); d8[q2+3]=255; } }
    bc.putImageData(img,0,0);
  }
  // the limb on screen, for the stars: they only show in the sky
  function inSky(sx,sy){ var a=(sx-W/2)/FP, b=(CY-sy)/FP; var dx=a, dy=F1+b*U1, dz=F2+b*U2; var l=Math.hypot(dx,dy,dz); var bb=D*dz/l; return !(bb*bb-(D*D-1)>0&&-bb>0); }
  var STX=[],STY=[],STA=[],STR=[],STP=[],STW=[];
  (function(){ var s=7; function r(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }
    for(var k=0;k<(opts.stars||600);k++){ var x=X0+r()*(X1-X0), y=Y0+r()*(HY-Y0+60); var a=0.10+0.55*r()*r(), rr=0.35+0.6*r(), ph=r()*6.283, w=0.25+0.9*r(); if(!inSky(x,y)) continue; STX.push(x); STY.push(y); STA.push(a); STR.push(rr); STP.push(ph); STW.push(w); } })();
  function renderStars_unused(){ var sc=stars.getContext('2d'); sc.setTransform(dpr,0,0,dpr,0,0); var s=7; function r(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }
    for(var k=0;k<(opts.stars||600);k++){ var x=X0+r()*(X1-X0), y=Y0+r()*(HY-Y0+40); if(!inSky(x,y)) continue; var a=(0.12+0.5*r()*r()); sc.fillStyle='rgba('+IV+','+a.toFixed(3)+')'; sc.beginPath(); sc.arc(x,y,0.35+0.6*r(),0,6.2832); sc.fill(); } }
  // ---- land test on the coast rings (as planet.js) ----
  var coast=window.COAST||[], BAND=[], CA=opts.coastAlpha||0, CO=[];
  for(var cr0=0;cr0<coast.length;cr0++){ var R0=coast[cr0], arr=[]; for(var v0=0;v0<R0.length;v0++){ var gq=geo(R0[v0][1],R0[v0][0]); arr.push(gq[0],gq[1],gq[2]); } CO.push(arr); } for(var bq=0;bq<180;bq++) BAND.push([]);
  for(var ri=0;ri<coast.length;ri++){ var Rg=coast[ri]; for(var jj=0;jj<Rg.length-1;jj++){ var P0=Rg[jj], P1=Rg[jj+1]; if(P0[1]===P1[1]) continue;
    var l0=Math.max(0,Math.floor(Math.min(P0[1],P1[1])+90)), l1=Math.min(179,Math.floor(Math.max(P0[1],P1[1])+90)); for(var q=l0;q<=l1;q++) BAND[q].push(P0[0],P0[1],P1[0],P1[1]); } }
  function onLand(la,lo){ var E=BAND[Math.max(0,Math.min(179,Math.floor(la+90)))], c=0; for(var k=0;k<E.length;k+=4){ var ay=E[k+1], by=E[k+3]; if((ay>la)!==(by>la)){ var x=E[k]+(la-ay)*(E[k+2]-E[k])/(by-ay); if(x>lo) c++; } } return (c&1)===1; }
  // ---- the people: lights on land, dense around real cities ----
  var seed=11; function rnd(){ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; }
  function gauss(){ var u=rnd()||1e-9, v=rnd(); return Math.sqrt(-2*Math.log(u))*Math.cos(6.2831853*v); }
  var cw=[], cwt=0; for(var ci=0;ci<CITIES.length;ci++){ cwt+=0.2+CITIES[ci][2]; cw.push(cwt); }
  var NP=opts.people||9000, PX=new Float32Array(NP), PY=new Float32Array(NP), PZ=new Float32Array(NP), PA=new Float32Array(NP), PS=new Float32Array(NP), n=0, tries=0;
  while(n<NP&&tries<NP*30){ tries++; var la,lo,cityP=rnd()<(opts.cityShare||0.62);
    var gr=0; if(cityP){ var r0=rnd()*cwt, k0=0; while(cw[k0]<r0) k0++; var CT=CITIES[k0], sg=0.6+2.0*CT[2], g1=gauss(), g2=gauss(); gr=Math.hypot(g1,g2); la=CT[0]+g1*sg; lo=CT[1]+g2*sg/Math.max(0.3,Math.cos(la*D2R)); }
    else { la=Math.asin(rnd()*2-1)/D2R; lo=rnd()*360-180; }
    if(la>66||la<-56) continue; lo=((lo+540)%360)-180; if(!onLand(la,lo)) continue;
    var v3=geo(la,lo); PX[n]=v3[0]; PY[n]=v3[1]; PZ[n]=v3[2]; var core=cityP?Math.exp(-gr*gr*0.9):0; PA[n]=cityP?0.10+0.85*core+0.08*rnd():(opts.ruralAlpha||0.05)+(opts.ruralAlpha||0.05)*2*rnd()*rnd(); PS[n]=cityP?0.32+0.62*core:0.26+0.2*rnd(); n++; }
  NP=n;
  // the terrain: faint dots spread evenly on land, so the continents read in the dark (as the f11)
  var NT=opts.terrain||0, TX=new Float32Array(NT), TY=new Float32Array(NT), TZ=new Float32Array(NT), nt=0, tt=0;
  while(nt<NT&&tt<NT*6){ tt++; var la2=Math.asin(rnd()*2-1)/D2R, lo2=rnd()*360-180; if(la2>70||la2<-56||!onLand(la2,lo2)) continue; var w3=geo(la2,lo2); TX[nt]=w3[0]; TY[nt]=w3[1]; TZ[nt]=w3[2]; nt++; }
  NT=nt;
  // the cities that can hold links and be hovered
  var CN=[]; for(var c2=0;c2<CITIES.length;c2++){ if(CITIES[c2][2]>=(opts.cityMin||0.3)){ var gv=geo(CITIES[c2][0],CITIES[c2][1]); CN.push({v:gv,w:CITIES[c2][2],sx:0,sy:0,vis:0,deg:0}); } }
  // ---- constellation (opts.constellation): the coasts as chains of stars joined by hairlines, the cities as brighter stars joined to their neighbours ----
  var CONS=!!opts.constellation, CV=[], CS=[], CE=[];
  if(CONS){ var STEP=(opts.cstep||3)*D2R, cs=31; function cr(){ cs=(cs*1664525+1013904223)>>>0; return cs/4294967296; }
    for(var r1=0;r1<coast.length;r1++){ var Rg1=coast[r1]; if(Rg1.length<4) continue; var acc=0, pv=null, start=CV.length, n1=0;
      for(var v1=0;v1<Rg1.length;v1++){ var q1=geo(Rg1[v1][1],Rg1[v1][0]); if(pv){ acc+=Math.acos(Math.max(-1,Math.min(1,pv[0]*q1[0]+pv[1]*q1[1]+pv[2]*q1[2]))); } pv=q1;
        if(v1===0||acc>=STEP){ acc=0; if(Math.abs(Rg1[v1][1])>72) continue; CV.push({v:q1,a:0.35+0.65*cr()*cr(),s:0.5+0.9*cr()*cr(),ph:cr()*6.283,ring:r1}); n1++; } }
      if(n1<3){ CV.length=start; continue; }
      for(var k1=start;k1<CV.length-1;k1++) CS.push([k1,k1+1]); CS.push([CV.length-1,start]); } }
  // a four-pointed star sprite: a bright core, two fine spikes, a faint bloom
  var star=document.createElement('canvas'); star.width=star.height=48; (function(){ var c=star.getContext('2d'); var gr=c.createRadialGradient(24,24,0,24,24,24); gr.addColorStop(0,'rgba('+IV+',1)'); gr.addColorStop(0.08,'rgba('+IV+',0.85)'); gr.addColorStop(0.25,'rgba('+IV+',0.12)'); gr.addColorStop(1,'rgba('+IV+',0)'); c.fillStyle=gr; c.fillRect(0,0,48,48);
    c.globalCompositeOperation='lighter'; [[1,0.08],[0.08,1]].forEach(function(sc){ c.save(); c.translate(24,24); c.scale(sc[0],sc[1]); var g2=c.createRadialGradient(0,0,0,0,0,24); g2.addColorStop(0,'rgba('+IV+',0.9)'); g2.addColorStop(1,'rgba('+IV+',0)'); c.fillStyle=g2; c.beginPath(); c.arc(0,0,24,0,6.2832); c.fill(); c.restore(); }); })();
  if(CONS){ for(var i3=0;i3<CN.length;i3++){ var best3=[[9,-1],[9,-1]]; for(var j3=0;j3<CN.length;j3++){ if(i3===j3) continue; var d3=Math.acos(Math.max(-1,Math.min(1,CN[i3].v[0]*CN[j3].v[0]+CN[i3].v[1]*CN[j3].v[1]+CN[i3].v[2]*CN[j3].v[2]))); if(d3<best3[0][0]){ best3[1]=best3[0]; best3[0]=[d3,j3]; } else if(d3<best3[1][0]) best3[1]=[d3,j3]; }
      for(var b3=0;b3<2;b3++){ var jj3=best3[b3][1]; if(jj3<0||best3[b3][0]>(opts.cityLink||9)*D2R) continue; var a3=Math.min(i3,jj3), c3=Math.max(i3,jj3); if(!CE.some(function(e){ return e[0]===a3&&e[1]===c3; })) CE.push([a3,c3]); } } }
  // ---- the users (opts.clusters, v6, 16 Nov): the planet of before (the scattered lights of people, the coasts, the cities), dimmed, and on it
  // a few hundred users, placed like the people (loose around the cities, never on a lattice). The lines no longer join cities: a line leaves a
  // user who is in session and reaches another one nearby, who lights up in turn and passes it on. It spreads from place to place.
  // Now and then the picture of the newcomer shows above their dot, small. Hovering any user shows their picture and handle. Always above the dot.
  var CLU=!!opts.clusters, DOT=[], WAKE=0, PINS=[], LK=[], PENDL=[], nextSeed=0.6, hovDot=-1, FACE=null, NFACE=8, K=1;
  var MAXL=opts.links||6, PIN_HOLD=opts.pinHold||2.4;
  var NAMES=['ayo','lena','marco','sofia','noor','kenji','mara','theo','ines','hugo','julie','karim','nina','luca','emma','sami','alba','jonas','mila','yuki','omar','elsa','tom','lou'];
  if(CLU){ var cs3=53; function r3(){ cs3=(cs3*1664525+1013904223)>>>0; return cs3/4294967296; } function g3(){ var u=r3()||1e-9, v=r3(); return Math.sqrt(-2*Math.log(u))*Math.cos(6.2831853*v); }
    var NU=opts.users||260, tr3=0;
    while(DOT.length<NU&&tr3<NU*40){ tr3++; var r0u=r3()*cwt, ku=0; while(cw[ku]<r0u) ku++; var CU=CITIES[ku], sgu=0.5+1.7*CU[2], ga=g3(), gb=g3();
      var lau=CU[0]+ga*sgu, lou=CU[1]+gb*sgu/Math.max(0.3,Math.cos(lau*D2R)); if(lau>66||lau<-56) continue; lou=((lou+540)%360)-180; if(!onLand(lau,lou)) continue;
      var lit=r3()<0.12;
      DOT.push({v:geo(lau,lou),a:0.30+0.25*r3(),s:0.85+0.35*r3(),t0:lit?-30*r3():-1e9,life:lit?45+40*r3():0,tg:false,sx:0,sy:0,vis:0,
        face:Math.floor(r3()*(NFACE+3)),name:NAMES[Math.floor(r3()*NAMES.length)]+(10+Math.floor(r3()*90))}); }
    FACE=new Image(); FACE.src=opts.faces||'img/faces.jpg'; }
  // the limb under a given x (it curves down toward the sides): a picture that shows on its own never crosses the lit rim
  var LIMB={}; function limbY(x){ var k=Math.round(x/4); if(LIMB[k]==null){ var y=HY-12; while(y<700&&inSky(k*4,y)) y+=1; LIMB[k]=y; } return LIMB[k]; }
  function EO(x){ x=Math.max(0,Math.min(1,x)); return 1-Math.pow(1-x,3); }
  function level(d,t){ var ag=t-d.t0; if(ag<0||ag>=d.life+3) return 0; return ag<0.5?EO(ag/0.5):ag<d.life?1:1-(ag-d.life)/3; }
  // pin sizes are in page pixels (K = scene units per page pixel), so the picture keeps its size whatever the size of the hero
  function fits(d){ if(d.vis<0.3) return false; var h=(4+10+22+4)*K, w=15*K; if(d.sy-h<limbY(d.sx)+4) return false; for(var k=0;k<3;k++){ var q=OPEN[k]; if(d.sx>q.x0+w&&d.sx<q.x1-w&&d.sy<q.y1-6) break; } if(k===3) return false;
    for(var n=0;n<PINS.length;n++){ var pd=PINS[n].d; if(Math.hypot(pd.sx-d.sx,pd.sy-d.sy)<44*K) return false; } return true; }
  function pin(d,t,hov){ if(live.clientWidth<620) return null; var P={d:d,t0:t,out:-1,hov:!!hov}; PINS.push(P); return P; }
  function drawPins(t){
    for(var k=PINS.length-1;k>=0;k--){ var P=PINS[k], d=P.d;
      if(P.out<0&&(d.vis<0.2||(P.hov?DOT[hovDot]!==d:t-P.t0>PIN_HOLD))) P.out=t;
      var e=EO((t-P.t0)/0.18), tout=P.out>=0?(t-P.out)/0.14:0; if(tout>=1){ PINS.splice(k,1); continue; }
      var op=e*(1-EO(tout)), x=d.sx, y=d.sy, r=10*K, stem=10*K, sc=0.97+0.03*e;
      ctx.save(); ctx.globalAlpha=op; ctx.translate(x,y); ctx.scale(sc,sc);
      ctx.strokeStyle='rgba('+IV+',0.45)'; ctx.lineWidth=K; ctx.beginPath(); ctx.moveTo(0,-3.5*K); ctx.lineTo(0,-3.5*K-stem); ctx.stroke();
      var cy=-3.5*K-stem-r-K;
      ctx.fillStyle='rgba('+IV+',0.55)'; ctx.beginPath(); ctx.arc(0,cy,r+K,0,6.2832); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(0,cy,r,0,6.2832); ctx.clip();
      if(d.face<NFACE&&FACE&&FACE.complete&&FACE.naturalWidth){ ctx.drawImage(FACE,d.face*96,0,96,96,-r,cy-r,2*r,2*r); }
      else { ctx.fillStyle='#1C1D1D'; ctx.fillRect(-r,cy-r,2*r,2*r); ctx.fillStyle='#B4B4B0'; ctx.font='500 '+(9.5*K)+'px "DM Sans",system-ui,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(d.name.charAt(0).toUpperCase(),0,cy+0.5*K); }
      ctx.restore();
      // the handle: only for the person under the pointer, beside the picture (on the other side when the pillar is close)
      if(P.hov){ ctx.font='500 '+(11*K)+'px "DM Sans",system-ui,sans-serif'; ctx.textBaseline='middle'; var tx='@'+d.name, tw=ctx.measureText(tx).width, right=true;
        for(var q=0;q<3;q++){ var O=OPEN[q]; if(x>=O.x0&&x<=O.x1&&x+r+7*K+tw>O.x1-6*K) right=false; }
        ctx.textAlign=right?'left':'right'; var hx=(right?1:-1)*(r+7*K); ctx.lineJoin='round'; ctx.strokeStyle='#060707'; ctx.lineWidth=4*K; ctx.strokeText(tx,hx,cy); ctx.fillStyle='#EDEAE4'; ctx.fillText(tx,hx,cy); }
      ctx.restore(); } }
  function spawnFrom(a,t){ var c=[]; for(var q=0;q<DOT.length;q++){ var b=DOT[q]; if(b===a||b.tg||b.vis<0.25) continue; var om=Math.acos(Math.max(-1,Math.min(1,a.v[0]*b.v[0]+a.v[1]*b.v[1]+a.v[2]*b.v[2]))); if(om<1.2*D2R||om>16*D2R) continue; c.push([om+(level(b,t)>0?1:0),b,om]); }
    if(!c.length) return false; c.sort(function(m,n){ return m[0]-n[0]; }); var pk=c[Math.floor(rnd()*Math.min(8,c.length))], b2=pk[1], om2=pk[2];
    b2.tg=true; var gr=0.9+om2*2.4; LK.push({a:a,b:b2,t0:t,grow:gr,hold:0.3,shrink:gr,lift:Math.max(0.003,om2*0.12),arr:false}); return true; }
  function someone(t,lit){ var c=[]; for(var q=0;q<DOT.length;q++){ var d=DOT[q]; if(d.vis>0.3&&(level(d,t)>0.5)===lit) c.push(d); } return c.length?c[Math.floor(rnd()*c.length)]:null; }
  function drawClusters(t){
    K=live.clientWidth?W/live.clientWidth:1;
    for(var b=0;b<NB;b++) pb[b]=new Path2D(); var bestD=11*K, hv=-1, nd=0, glow=[];
    for(var i=0;i<DOT.length;i++){ var d=DOT[i]; d.vis=0; rot(d.v[0],d.v[1],d.v[2]); var fz=R3[2]*D-1; if(fz<=0.004||!proj(R3[0],R3[1],R3[2],o)) continue;
      var f=Math.min(1,fz/((D-1)*0.55)); d.sx=o[0]; d.sy=o[1]; if(o[0]<X0||o[0]>X1||o[1]<Y0||o[1]>Y1) continue; d.vis=f;
      var lv=level(d,t), a=d.a+(1-d.a)*lv, s=d.s+0.75*lv; if(lv>0.05) glow.push(d,lv*f);
      if(inside&&!drag){ var dm=Math.hypot(o[0]-mx,o[1]-my)-(i===hovDot?5*K:0)-(lv>0.5?2*K:0); if(dm<bestD){ bestD=dm; hv=i; } }
      var al=a*(0.2+0.8*f), bi=Math.min(NB-1,Math.floor(al*NB)), rr=s*(0.6+0.4*f); pb[bi].moveTo(o[0]+rr,o[1]); pb[bi].arc(o[0],o[1],rr,0,6.2832); nd++; }
    for(var b2=0;b2<NB;b2++){ ctx.fillStyle='rgba('+IV+','+((b2+0.5)/NB).toFixed(3)+')'; ctx.fill(pb[b2]); }
    ctx.globalCompositeOperation='lighter'; for(var g=0;g<glow.length;g+=2){ var gd=glow[g]; ctx.globalAlpha=0.5*glow[g+1]; ctx.drawImage(spr,gd.sx-7,gd.sy-7,14,14); } ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
    stat.people=nd;
    // the user under the pointer: one pin, which moves from a person to the next without coming in again
    if(hv!==hovDot){ hovDot=hv; if(hv>=0){ var hp=null; for(var h=0;h<PINS.length;h++) if(PINS[h].hov&&PINS[h].out<0) hp=PINS[h]; if(hp) hp.d=DOT[hv]; else pin(DOT[hv],t,true); } }
    // one more person in session (the counter): a line leaves toward a new user
    if(WAKE>0){ var src=someone(t,true)||someone(t,false); if(src){ if(level(src,t)<=0){ src.t0=t; src.life=40+40*rnd(); } spawnFrom(src,t); } WAKE--; }
    // it keeps going on its own: when few lines are left, one leaves again from someone in session
    if(!HOLD&&LK.length<2&&t>=nextSeed){ var s0=someone(t,true)||someone(t,false); if(s0){ if(level(s0,t)<=0){ s0.t0=t; s0.life=40+40*rnd(); } spawnFrom(s0,t); } nextSeed=t+0.7+rnd(); }
    for(var pq=PENDL.length-1;pq>=0;pq--){ if(t>=PENDL[pq].t){ var pe=PENDL.splice(pq,1)[0]; if(LK.length<MAXL&&pe.d.vis>0.2) spawnFrom(pe.d,t); } }
    ctx.lineWidth=opts.linkWidth||1; ctx.strokeStyle='rgba('+IV+','+(opts.linkAlpha||0.7)+')';
    for(var l=LK.length-1;l>=0;l--){ var L=LK[l], age=t-L.t0;
      if(!L.arr&&age>=L.grow){ L.arr=true; L.b.tg=false; L.b.t0=t; L.b.life=40+45*rnd();
        if(!HOLD){ PENDL.push({d:L.b,t:t+0.25+0.4*rnd()}); if(rnd()<0.5) PENDL.push({d:L.b,t:t+0.7+0.8*rnd()}); }
        var na=0; for(var n2=0;n2<PINS.length;n2++) if(!PINS[n2].hov) na++; if(na<3&&rnd()<0.55&&fits(L.b)) pin(L.b,t); }
      if(age>=L.grow+L.hold+L.shrink){ L.b.tg=false; LK.splice(l,1); continue; }
      var head=EIO(Math.min(1,age/L.grow)), tail=EIO(Math.max(0,Math.min(1,(age-L.grow-L.hold)/L.shrink))), on=false; ctx.beginPath();
      for(var s2=0;s2<=40;s2++){ var u=tail+(head-tail)*s2/40; slerp(L.a.v,L.b.v,u,ap); var hh=1+L.lift*Math.sin(Math.PI*u); rot(ap[0]*hh,ap[1]*hh,ap[2]*hh); if(hidden(R3[0],R3[1],R3[2])||!proj(R3[0],R3[1],R3[2],o)){ on=false; continue; } if(!on){ ctx.moveTo(o[0],o[1]); on=true; } else ctx.lineTo(o[0],o[1]); }
      ctx.stroke(); }
    stat.links=LK.length;
    drawPins(t);
    live.style.cursor=drag?'grabbing':hovDot>=0?'pointer':inside?'grab':'default';
  }
  var spr=document.createElement('canvas'); spr.width=spr.height=64; (function(){ var g=spr.getContext('2d'), gr=g.createRadialGradient(32,32,0,32,32,32); for(var q=0;q<=16;q++){ var u=q/16, a=Math.exp(-u*u*28)*0.95+Math.exp(-u*u*5)*0.16; gr.addColorStop(u,'rgba('+IV+','+(q===16?0:a).toFixed(4)+')'); } g.fillStyle=gr; g.fillRect(0,0,64,64); })();
  // ---- links: great circles between two cities, lifted, that draw themselves, hold, then fade ----
  var HOLD=!!opts.hold, WANT=0, EIO=function(x){ return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2; }, FLASH=[], PEND=[], LINKS=[], MAXL=opts.links||8, LIFT=opts.lift||[0.02,0.06], LIFE=opts.life||[10,22], PULSE=!!opts.pulses;
  function slerp(a,b,u,o){ var d=Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])), om=Math.acos(d), so=Math.sin(om)||1e-6, k1=Math.sin((1-u)*om)/so, k2=Math.sin(u*om)/so; o[0]=a[0]*k1+b[0]*k2; o[1]=a[1]*k1+b[1]*k2; o[2]=a[2]*k1+b[2]*k2; return om; }
  function spawn(t,from){ for(var tr=0;tr<60;tr++){ var i=from!=null?from:Math.floor(rnd()*CN.length), j=Math.floor(rnd()*CN.length); if(i===j) continue; var a=CN[i], b=CN[j];
      if(!(a.vis>0.1&&b.vis>0.1)) continue;
      var d=a.v[0]*b.v[0]+a.v[1]*b.v[1]+a.v[2]*b.v[2], om=Math.acos(Math.max(-1,Math.min(1,d))); if(om<6*D2R||om>(opts.maxArc||40)*D2R) continue;
      var gr=opts.relay?1.2+om*1.4:1.6+om*2.2; LINKS.push({a:i,b:j,t0:t,grow:gr,hold:0.35,shrink:gr,arrived:false,rl:opts.relay?Math.max(0.006,om*0.12):0,life:LIFE[0]+(LIFE[1]-LIFE[0])*rnd(),lift:(LIFT[0]+(LIFT[1]-LIFT[0])*rnd())*om/0.6,ph:rnd()}); a.deg++; b.deg++; return true; } return false; }
  // occlusion of a point above the surface: the segment camera -> point crosses the sphere
  function hidden(x,y,z){ var ex=x, ey=y, ez=z-D, L2=ex*ex+ey*ey+ez*ez, bb=(D*ez)/Math.sqrt(L2), c=D*D-1, disc=bb*bb-c; if(disc<=0||bb>=0) return false; var t=-bb-Math.sqrt(disc); return t<Math.sqrt(L2)-1e-4; }
  // ---- pointer: drag to turn the planet (inertia), hover a city ----
  var mx=-1e4, my=-1e4, drag=false, lx=0, ly=0, inside=false, HOV=-1;
  function toScene(e){ var r=live.getBoundingClientRect(); return [(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H]; }
  function inOpen(x,y){ for(var k=0;k<3;k++){ var o=OPEN[k]; if(x>=o.x0&&x<=o.x1&&y>=120&&y<=o.y1) return true; } return false; }
  live.addEventListener('pointerdown',function(e){ var p=toScene(e); if(!inOpen(p[0],p[1])) return; drag=true; lx=e.clientX; ly=e.clientY; vlon=0; vlat=0; live.style.cursor='grabbing'; e.preventDefault(); });
  window.addEventListener('pointermove',function(e){ var p=toScene(e); mx=p[0]; my=p[1]; inside=inOpen(mx,my);
    if(drag){ var r=live.getBoundingClientRect(), k=W/r.width; vlon=-(e.clientX-lx)*k*0.0016; vlat=(e.clientY-ly)*k*0.0012; lx=e.clientX; ly=e.clientY; lon+=vlon; tilt=Math.max(-0.2,Math.min(1.1,tilt+vlat)); }
    if(MODE==='dawn'&&inside){ sunT=sunFrom((mx-X0)/(X1-X0),Math.max(0,Math.min(1,(my-120)/(OPEN[0].y1-120)))); }
    if(MODE==='web'){ var u=inside?(mx-W/2)/(W/2):0, v=inside?(my-380)/300:0; follow=[u*0.05,v*0.03]; } });
  window.addEventListener('pointerup',function(){ drag=false; live.style.cursor='grab'; });
  // ---- frame ----
  var PVbuf=null;
  var stat={people:0,links:0}, o=[0,0,0], o2=[0,0,0], ap=[0,0,0], SPIN=(opts.spin||0.006);
  var NB=8, pb=[];
  function frame(t,dt){
    if(!drag){ lon+=vlon+SPIN*dt; tilt=Math.max(-0.2,Math.min(1.1,tilt+vlat)); vlon*=0.94; vlat*=0.94; }
    fcur[0]+=(follow[0]-fcur[0])*Math.min(1,dt*0.5); fcur[1]+=(follow[1]-fcur[1])*Math.min(1,dt*0.5);
    var lon0=lon, t0=tilt; lon+=fcur[0]; tilt+=fcur[1]; setRot(); lon=lon0; tilt=t0;
    if(MODE==='dawn'){ var ch=0; for(var s=0;s<3;s++){ var nv=SUN[s]+(sunT[s]-SUN[s])*Math.min(1,dt*2.2); if(Math.abs(nv-SUN[s])>1e-4) ch=1; SUN[s]=nv; } if(ch&&t-lastBase>0.06){ renderBase(baseScaleDawn); lastBase=t; } }
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(X0-10,Y0-10,X1-X0+20,Y1-Y0+20);
    ctx.save(); ctx.beginPath(); ctx.rect(X0,Y0,X1-X0,Y1-Y0); ctx.clip();
    // stars: each one breathes on its own clock
    for(var si=0;si<STX.length;si++){ var tw=0.55+0.45*Math.sin(t*STW[si]+STP[si]); ctx.fillStyle='rgba('+IV+','+(STA[si]*tw).toFixed(3)+')'; ctx.beginPath(); ctx.arc(STX[si],STY[si],STR[si],0,6.2832); ctx.fill(); }
    // constellation: hairlines first, then the stars on top
    if(CONS){ var PV=PVbuf||(PVbuf=new Float32Array(CV.length*3));
      for(var c4=0;c4<CV.length;c4++){ var V=CV[c4].v; rot(V[0],V[1],V[2]); var fz4=R3[2]*D-1; if(fz4<=0.004||!proj(R3[0],R3[1],R3[2],o)){ PV[c4*3+2]=-1; continue; } PV[c4*3]=o[0]; PV[c4*3+1]=o[1]; PV[c4*3+2]=Math.min(1,fz4/((D-1)*0.45)); }
      var LNA=opts.lineAlpha||0.22; ctx.lineWidth=0.6;
      for(var bk=0;bk<4;bk++){ ctx.beginPath(); var any=false;
        for(var s4=0;s4<CS.length;s4++){ var p1=CS[s4][0], p2=CS[s4][1], f1=PV[p1*3+2], f2=PV[p2*3+2]; if(f1<0||f2<0) continue; var ff=Math.min(f1,f2); if(Math.min(3,Math.floor(ff*4))!==bk) continue; ctx.moveTo(PV[p1*3],PV[p1*3+1]); ctx.lineTo(PV[p2*3],PV[p2*3+1]); any=true; }
        if(any){ ctx.strokeStyle='rgba('+IV+','+(LNA*(bk+0.5)/4).toFixed(3)+')'; ctx.stroke(); } }
      ctx.globalCompositeOperation='lighter';
      for(var c5=0;c5<CV.length;c5++){ var f5=PV[c5*3+2]; if(f5<0) continue; var x5=PV[c5*3], y5=PV[c5*3+1]; if(x5<X0||x5>X1||y5<Y0||y5>Y1) continue; var C5=CV[c5]; var tw5=0.7+0.3*Math.sin(t*0.7+C5.ph); var sz5=(5+7*C5.s)*(0.5+0.5*f5); ctx.globalAlpha=Math.min(1,C5.a*tw5*(0.3+0.7*f5)*(opts.starAlpha||0.8)); ctx.drawImage(star,x5-sz5/2,y5-sz5/2,sz5,sz5); }
      ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over'; }
    // coasts
    if(CA>0){ ctx.beginPath(); for(var cr=0;cr<CO.length;cr++){ var ring=CO[cr], pen=false; for(var cv=0;cv<ring.length;cv+=3){ rot(ring[cv],ring[cv+1],ring[cv+2]); var fzc=R3[2]*D-1;
          if(fzc<=0.01||!proj(R3[0],R3[1],R3[2],o)||o[0]<X0-20||o[0]>X1+20||o[1]<Y0||o[1]>Y1+20){ pen=false; continue; }
          if(!pen){ ctx.moveTo(o[0],o[1]); pen=true; } else ctx.lineTo(o[0],o[1]); } }
      ctx.strokeStyle='rgba('+IV+','+CA+')'; ctx.lineWidth=0.6; ctx.stroke(); }
    // terrain
    if(NT){ var tp=new Path2D(), TA=opts.terrainAlpha||0.07; for(var it=0;it<NT;it++){ rot(TX[it],TY[it],TZ[it]); var fzt=R3[2]*D-1; if(fzt<=0.004) continue;
        if(MODE==='dawn'){ var ldt=R3[0]*SUN[0]+R3[1]*SUN[1]+R3[2]*SUN[2]; if(ldt>0.05) continue; }
        if(!proj(R3[0],R3[1],R3[2],o)) continue; if(o[0]<X0||o[0]>X1||o[1]<Y0||o[1]>Y1) continue; var rt=0.9*(0.5+0.5*Math.min(1,fzt/((D-1)*0.5))); tp.rect(o[0]-rt,o[1]-rt,rt*2,rt*2); }
      ctx.fillStyle='rgba('+IV+','+TA+')'; ctx.fill(tp); }
    // people
    for(var b=0;b<NB;b++) pb[b]=new Path2D(); var nv2=0;
    var LMUL=opts.peopleAlpha||1;
    for(var i=0;i<NP;i++){ rot(PX[i],PY[i],PZ[i]); var fz=R3[2]*D-1; if(fz<=0.004) continue; if(!proj(R3[0],R3[1],R3[2],o)) continue; if(o[0]<X0||o[0]>X1||o[1]<Y0||o[1]>Y1) continue;
      var f=Math.min(1,fz/((D-1)*0.55)); var al=PA[i]*LMUL*(0.25+0.75*f);
      if(MODE==='dawn'){ var ld=R3[0]*SUN[0]+R3[1]*SUN[1]+R3[2]*SUN[2]; al*=Math.max(0,Math.min(1,(-ld+0.02)/0.18)); if(al<0.01) continue; }
      nv2++; var bi=Math.min(NB-1,Math.floor(al*NB)); var rr=PS[i]*(0.55+0.45*f); pb[bi].moveTo(o[0]+rr,o[1]); pb[bi].arc(o[0],o[1],rr,0,6.2832); }
    for(var b2=0;b2<NB;b2++){ ctx.fillStyle='rgba('+IV+','+((b2+0.5)/NB).toFixed(3)+')'; ctx.fill(pb[b2]); }
    // cities: project, glow
    HOV=-1; var best=CLU?-1:18;
    for(var k=0;k<CN.length;k++){ var C=CN[k]; rot(C.v[0],C.v[1],C.v[2]); var fz2=R3[2]*D-1; C.vis=0; if(fz2<=0.01||!proj(R3[0],R3[1],R3[2],o)) continue;
      var night=1; if(MODE==='dawn'){ var ld2=R3[0]*SUN[0]+R3[1]*SUN[1]+R3[2]*SUN[2]; night=Math.max(0,Math.min(1,(-ld2+0.02)/0.18)); }
      C.vis=Math.min(1,fz2/((D-1)*0.5))*night; C.sx=o[0]; C.sy=o[1]; C.n=[R3[0],R3[1],R3[2]];
      if(inside&&!drag){ var dd=Math.hypot(o[0]-mx,o[1]-my); if(dd<best&&C.vis>0.1){ best=dd; HOV=k; } } }
    if(CONS){ ctx.lineWidth=0.7; ctx.beginPath(); if(!CLU) for(var e5=0;e5<CE.length;e5++){ var A5=CN[CE[e5][0]], B5=CN[CE[e5][1]]; if(A5.vis<=0.05||B5.vis<=0.05) continue; ctx.moveTo(A5.sx,A5.sy); ctx.lineTo(B5.sx,B5.sy); } ctx.strokeStyle='rgba('+IV+','+(opts.figAlpha||0.32)+')'; ctx.stroke();
      ctx.globalCompositeOperation='lighter'; for(var k6=0;k6<CN.length;k6++){ var C6=CN[k6]; if(C6.vis<=0.02) continue; var sz6=(10+16*C6.w)*(0.5+0.5*C6.vis)*(k6===HOV?1.6:1); ctx.globalAlpha=Math.min(1,(0.55+0.45*C6.w)*C6.vis)*(opts.cityAlpha||1); ctx.drawImage(star,C6.sx-sz6/2,C6.sy-sz6/2,sz6,sz6); } ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over'; }
    ctx.globalCompositeOperation='lighter';
    var GL=opts.glow||1;
    for(var k2=0;k2<CN.length;k2++){ var C2=CN[k2]; if(C2.vis<=0.02||C2.sx<X0||C2.sx>X1||C2.sy<Y0||C2.sy>Y1) continue; var br=0.85+0.15*Math.sin(t*0.6+k2*1.7); var sz=(8+20*C2.w)*GL*(0.45+0.55*C2.vis)*(k2===HOV?1.8:1); ctx.globalAlpha=Math.min(1,(0.40+0.45*C2.w)*C2.vis*br*(k2===HOV?1.4:1))*(opts.cityAlpha||1); ctx.drawImage(spr,C2.sx-sz/2,C2.sy-sz/2,sz,sz); }
    ctx.globalAlpha=1;
    // links (none with the clusters: no line between two places)
    if(!CLU){
    if(opts.relay){ for(var pi=PEND.length-1;pi>=0;pi--){ if(t>=PEND[pi].t){ var pc=PEND.splice(pi,1)[0]; if(LINKS.length<MAXL+1&&CN[pc.c].vis>0.1) spawn(t,pc.c); } } }
    if(!HOLD&&LINKS.length<MAXL&&rnd()<dt*(opts.rate||1.2)) spawn(t);
    if(WANT>0){ for(var wq=0;wq<4&&WANT>0;wq++){ if(spawn(t)) WANT--; else break; } }
    var LA0=opts.linkAlpha||0.5, nl=0;
    var RELAY=!!opts.relay;
    if(RELAY){ ctx.globalCompositeOperation='source-over'; for(var fi=FLASH.length-1;fi>=0;fi--){ var F=FLASH[fi], ft=t-F.t0; if(ft>=1.6){ FLASH.splice(fi,1); continue; } var FC=CN[F.c]; if(FC.vis<=0.05) continue;
        var pu2=Math.min(1,ft/0.5)-1, pop=ft<0.5?1+2.70158*pu2*pu2*pu2+1.70158*pu2*pu2:1, fa2=ft<1?1:1-EIO((ft-1)/0.6);
        ctx.strokeStyle='rgba('+IV+','+(0.8*fa2*FC.vis).toFixed(3)+')'; ctx.lineWidth=0.9; ctx.beginPath(); ctx.arc(FC.sx,FC.sy,5.5*pop,0,6.2832); ctx.stroke(); }
      ctx.globalCompositeOperation='lighter'; }
    for(var e2=LINKS.length-1;e2>=0;e2--){ var E=LINKS[e2], age=t-E.t0;
      if(RELAY){ if(!E.arrived&&age>=E.grow){ E.arrived=true; FLASH.push({c:E.b,t0:t}); if(rnd()<0.8) PEND.push({c:E.b,t:t+0.25}); if(rnd()<0.35) PEND.push({c:E.a,t:t+0.4+rnd()*1.2}); }
        if(age>E.grow+E.hold+E.shrink){ CN[E.a].deg--; CN[E.b].deg--; LINKS.splice(e2,1); continue; } }
      else if(age>E.grow+E.life){ CN[E.a].deg--; CN[E.b].deg--; LINKS.splice(e2,1); continue; }
      var A0=CN[E.a], B0=CN[E.b]; if(A0.vis<=0.01&&B0.vis<=0.01&&MODE!=='web') continue;
      var head=Math.min(1,age/E.grow); head=RELAY?EIO(head):1-Math.pow(1-head,3); var tail=0, fade;
      if(RELAY){ var q=Math.max(0,Math.min(1,(age-E.grow-E.hold)/E.shrink)); tail=EIO(q); fade=1; }
      else { var x=(age-E.grow)/E.life; fade=x<0?1:x<0.7?1:1-(x-0.7)/0.3; fade=Math.max(0,fade); }
      var hl=(HOV>=0&&(E.a===HOV||E.b===HOV))?1:0; var al2=LA0*fade*(HOV>=0?(hl?1.8:0.45):1);
      ctx.beginPath(); var started=false, NS=RELAY?64:32, lastx=0, lasty=0, LF=RELAY?E.rl:E.lift;
      for(var s2=0;s2<=NS;s2++){ var u=tail+(head-tail)*s2/NS; slerp(A0.v,B0.v,u,ap); var hh=1+LF*Math.sin(Math.PI*u); rot(ap[0]*hh,ap[1]*hh,ap[2]*hh); if(hidden(R3[0],R3[1],R3[2])||!proj(R3[0],R3[1],R3[2],o)){ started=false; continue; }
        if(!started){ ctx.moveTo(o[0],o[1]); started=true; } else ctx.lineTo(o[0],o[1]); lastx=o[0]; lasty=o[1]; }
      ctx.strokeStyle='rgba('+IV+','+Math.min(1,al2).toFixed(3)+')'; ctx.lineWidth=(opts.linkWidth||0.8)*(hl?1.4:1); ctx.stroke(); nl++;
      if(!RELAY&&age<E.grow&&started){ ctx.globalCompositeOperation='lighter'; ctx.globalAlpha=0.9; ctx.drawImage(spr,lastx-7,lasty-7,14,14); ctx.globalAlpha=1; }
      // pulses: a light that runs along a settled link
      if(PULSE&&!RELAY&&age>=E.grow&&fade>0.05){ var pu=((t*0.22+E.ph)%1); slerp(A0.v,B0.v,pu,ap); var h2=1+E.lift*Math.sin(Math.PI*pu); rot(ap[0]*h2,ap[1]*h2,ap[2]*h2); if(!hidden(R3[0],R3[1],R3[2])&&proj(R3[0],R3[1],R3[2],o2)){ ctx.globalAlpha=Math.min(1,0.9*fade*(HOV>=0&&!hl?0.4:1)); ctx.drawImage(spr,o2[0]-6,o2[1]-6,12,12); ctx.globalAlpha=1; } } }
    }
    ctx.globalCompositeOperation='source-over';
    if(CLU) drawClusters(t);
    // the hovered city: a fine ring
    if(CLU){} else if(HOV>=0){ var H0=CN[HOV]; ctx.strokeStyle='rgba('+IV+',0.85)'; ctx.lineWidth=0.8; ctx.beginPath(); ctx.arc(H0.sx,H0.sy,6.5,0,6.2832); ctx.stroke(); live.style.cursor=drag?'grabbing':'pointer'; } else if(!drag) live.style.cursor=inside?'grab':'default';
    ctx.restore();
    if(!CLU){ stat.people=nv2; stat.links=nl; }
  }
  var baseScaleDawn=Math.min(BS,0.8), lastBase=-1;
  function glBase(){
    var gl=base.getContext('webgl',{antialias:false,premultipliedAlpha:false}); if(!gl) return false;
    var vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var fs='precision highp float;uniform vec2 R;uniform float S,D,FP,CY,F1,F2,U1,U2,HALO,RIM;'+
      'float sh(vec2 sp){vec3 d=normalize(vec3((sp.x-720.)/FP,F1+(CY-sp.y)/FP*U1,F2+(CY-sp.y)/FP*U2));float bb=D*d.z;if(-bb<=0.)return 0.;'+
      'float perp=sqrt(max(0.,D*D-bb*bb));float h=0.95*exp(-abs(perp-1.)/0.0045)+0.30*exp(-abs(perp-1.)/0.022)+0.035*exp(-abs(perp-1.)/0.09);'+
      'if(perp>=1.)return HALO*h;float t=-bb-sqrt(max(0.,bb*bb-(D*D-1.)));vec3 n=vec3(0.,0.,D)+d*t;float mu=clamp(-dot(n,d),0.,1.);'+
      'float rim=pow(1.-mu,4.5);return max(0.008+0.40*RIM*rim,HALO*1.35*exp(-(1.-perp)/0.0016));}'+
      'void main(){vec2 px=vec2(gl_FragCoord.x,R.y-gl_FragCoord.y);float v=0.;'+
      'for(int i=0;i<4;i++){vec2 o=vec2(mod(float(i),2.)-.5,floor(float(i)/2.)-.5)*.5;v+=sh((px+.5+o)/S);}v=min(1.,v/4.);'+
      'float dn=fract(sin(dot(px,vec2(12.9898,78.233)))*43758.5453)-.5;vec3 bg=vec3(6.,6.,6.)/255.,iv=vec3(237.,234.,228.)/255.;'+
      'gl_FragColor=vec4(mix(bg,iv,v)+dn/255.,1.);}';
    function sh(t,src){ var s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s); if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){ console.warn(gl.getShaderInfoLog(s)); return null; } return s; }
    var v=sh(gl.VERTEX_SHADER,vs), f=sh(gl.FRAGMENT_SHADER,fs); if(!v||!f) return false;
    var pr=gl.createProgram(); gl.attachShader(pr,v); gl.attachShader(pr,f); gl.linkProgram(pr); if(!gl.getProgramParameter(pr,gl.LINK_STATUS)) return false; gl.useProgram(pr);
    var b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    function u(n,x,y){ var l=gl.getUniformLocation(pr,n); if(y!=null) gl.uniform2f(l,x,y); else gl.uniform1f(l,x); }
    u('R',base.width,base.height); u('S',base.width/W); u('D',D); u('FP',FP); u('CY',CY); u('F1',F1); u('F2',F2); u('U1',U1); u('U2',U2); u('HALO',HALO); u('RIM',RIM);
    gl.viewport(0,0,base.width,base.height); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); return true;
  }
  setRot(); if(MODE!=='dawn'&&glBase()){} else if(MODE==='dawn'){ base.width=Math.round(W*baseScaleDawn); base.height=Math.round(H*baseScaleDawn); renderBase(baseScaleDawn); } else renderBase(BS);
  // prefill: a few links already there on the first frame
  if(!HOLD&&!CLU) for(var pf=0;pf<(opts.prefill||0);pf++){ setRot(); frameSilent(); }
  function frameSilent(){ for(var k=0;k<CN.length;k++){ var C=CN[k]; rot(C.v[0],C.v[1],C.v[2]); var fz2=R3[2]*D-1; C.vis=fz2>0.01?Math.min(1,fz2/((D-1)*0.5)):0; } spawn(-rnd()*6); }
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clock=0, last=0, raf=0, running=true, visible=true;
  function loop(now){ if(!running) return; var dt=last?Math.min(0.1,(now-last)/1000):0; last=now; if(visible){ clock+=dt; frame(clock,dt); } raf=requestAnimationFrame(loop); }
  if(reduce){ SPIN=0; frame(0,0); } else { if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ visible=es[0].isIntersecting; last=0; }).observe(live); } raf=requestAnimationFrame(loop); }
  return { base:base, live:live, release:function(){ HOLD=false; }, link:function(){ if(CLU) WAKE++; else WANT++; }, pins:function(){ return PINS.length; }, hover2:function(){ return hovDot>=0; }, stop:function(){ running=false; cancelAnimationFrame(raf); [base,live].forEach(function(c){ c.remove(); }); }, stats:function(){ return stat; }, cities:function(){ return CN.filter(function(c){ return c.vis>0.3&&c.sx>OPEN[0].x0+20&&c.sx<OPEN[2].x1-20&&c.sy>360&&c.sy<560; }).map(function(c){ return [c.sx,c.sy,c.w]; }); }, hover:function(){ return HOV; }, render:function(t){ running=false; cancelAnimationFrame(raf); frame(t,0); } };
}
window.PromGlobe={start:start};
})();
