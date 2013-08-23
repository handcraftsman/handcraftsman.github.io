((function(){var a,b;a=jQuery,b={},b.Line=function(){function c(c){if(!(this instanceof b.Line))return new b.Line(c);typeof c.element=="string"?this.el=a(document.getElementById(c.element)):this.el=a(c.element),this.options=a.extend({},this.defaults,c);if(this.options.data===void 0||this.options.data.length===0)return;this.el.addClass("graph-initialised"),this.precalc(),this.redraw()}return c.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],ymax:"auto",marginTop:25,marginRight:25,marginBottom:30,marginLeft:25,numLines:5,gridLineColor:"#aaa",gridTextColor:"#888",gridTextSize:12,gridStrokeWidth:.5,hoverPaddingX:10,hoverPaddingY:5,hoverMargin:10,hoverFillColor:"#fff",hoverBorderColor:"#ccc",hoverBorderWidth:2,hoverOpacity:.95,hoverLabelColor:"#444",hoverFontSize:12,smooth:!0},c.prototype.precalc=function(){var b,c,d,e,f,g=this;this.options.data.sort(function(a,b){return(a[g.options.xkey]<b[g.options.xkey])-(b[g.options.xkey]<a[g.options.xkey])}),this.columnLabels=a.map(this.options.data,function(a){return a[g.options.xkey]}),this.seriesLabels=this.options.labels,this.series=[],f=this.options.ykeys;for(d=0,e=f.length;d<e;d++)b=f[d],this.series.push(a.map(this.options.data,function(a){return a[b]}));this.xvals=a.map(this.columnLabels,function(a){return g.parseYear(a)}),this.xmin=Math.min.apply(null,this.xvals),this.xmax=Math.max.apply(null,this.xvals),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1);if(typeof this.options.ymax=="string"&&this.options.ymax.slice(0,4)==="auto")return c=Math.max.apply(null,Array.prototype.concat.apply([],this.series)),this.options.ymax.length>5?this.options.ymax=Math.max(parseInt(this.options.ymax.slice(5),10),c):this.options.ymax=c},c.prototype.redraw=function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,ba=this;this.el.empty(),p=function(a){return!isNaN(a-0)},this.r=new Raphael(this.el[0]),s=this.measureText(this.options.ymax,this.options.gridTextSize).width+this.options.marginLeft,I=this.el.width()-s-this.options.marginRight,h=this.el.height()-this.options.marginTop-this.options.marginBottom,f=I/(this.xmax-this.xmin),g=h/(p(this.options.ymax)?this.options.ymax:h),D=function(a){return ba.xvals.length===1?s+I/2:s+(a-ba.xmin)*f},E=function(a){return ba.options.marginTop+h-(p(a)?a*g:g)},t=h/(this.options.numLines===1?2:this.options.numLines-1);for(o=0,T=this.options.numLines-1;0<=T?o<=T:o>=T;0<=T?o++:o--)M=this.options.marginTop+o*t,H=Math.round((this.options.numLines-1-o)*this.options.ymax/(this.options.numLines===1?1:this.options.numLines-1)),isNaN(H)&&(H=""),this.r.text(s-this.options.marginLeft/2,M,H).attr("font-size",this.options.gridTextSize).attr("fill",this.options.gridTextColor).attr("text-anchor","end"),this.r.path("M"+s+","+M+"H"+(s+I)).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth);y=null,L=50;for(o=U=Math.ceil(this.xmin),V=Math.floor(this.xmax);U<=V?o<=V:o>=V;U<=V?o++:o--)q=this.r.text(D(o),this.options.marginTop+h+this.options.marginBottom/2,o).attr("font-size",this.options.gridTextSize).attr("fill",this.options.gridTextColor),r=q.getBBox(),y===null||y<=r.x?y=r.x+r.width+L:q.remove();d=function(){var a,b,c,d;c=this.xvals,d=[];for(a=0,b=c.length;a<b;a++)J=c[a],d.push(D(J));return d}.call(this),A=[],W=this.series;for(P=0,R=W.length;P<R;P++)z=W[P],A.push(a.map(z,function(a,b){return{x:d[b],y:E(a)}}));for(o=X=A.length-1;X<=0?o<=0:o>=0;X<=0?o++:o--)e=A[o],e.length>1&&(u=this.createPath(e,this.options.marginTop,s,this.options.marginTop+h,s+I),this.r.path(u).attr("stroke",this.options.lineColors[o]).attr("stroke-width",this.options.lineWidth));B=function(){var a,b;b=[];for(o=0,a=A.length-1;0<=a?o<=a:o>=a;0<=a?o++:o--)b.push([]);return b}();for(o=Y=A.length-1;Y<=0?o<=0:o>=0;Y<=0?o++:o--){Z=A[o];for(Q=0,S=Z.length;Q<S;Q++)b=Z[Q],c=this.r.circle(b.x,b.y,this.options.pointSize).attr("fill",this.options.lineColors[o]).attr("stroke-width",1).attr("stroke","#ffffff"),B[o].push(c)}l=this.options.hoverFontSize*1.5*(this.series.length+1),k=this.r.rect(-10,-l/2-this.options.hoverPaddingY,20,l+this.options.hoverPaddingY*2,10).attr("fill",this.options.hoverFillColor).attr("stroke",this.options.hoverBorderColor).attr("stroke-width",this.options.hoverBorderWidth).attr("opacity",this.options.hoverOpacity),K=this.r.text(0,this.options.hoverFontSize*.75-l/2,"").attr("fill",this.options.hoverLabelColor).attr("font-weight","bold").attr("font-size",this.options.hoverFontSize),n=this.r.set(),n.push(k),n.push(K),O=[];for(o=0,_=this.series.length-1;0<=_?o<=_:o>=_;0<=_?o++:o--)N=this.r.text(0,this.options.hoverFontSize*1.5*(o+1.5)-l/2,"").attr("fill",this.options.lineColors[o]).attr("font-size",this.options.hoverFontSize),O.push(N),n.push(N);return G=function(b){var c,e,f,g,i;n.show(),K.attr("text",ba.columnLabels[b]);for(c=0,i=ba.series.length-1;0<=i?c<=i:c>=i;0<=i?c++:c--)O[c].attr("text",""+ba.seriesLabels[c]+": "+(p(ba.series[c][b])?ba.commas(ba.series[c][b]):ba.series[c][b]));return e=Math.max.apply(null,a.map(O,function(a){return a.getBBox().width})),e=Math.max(e,K.getBBox().width),k.attr("width",e+ba.options.hoverPaddingX*2),k.attr("x",-ba.options.hoverPaddingX-e/2),g=Math.min.apply(null,a.map(ba.series,function(a){return E(a[b])})),g>l+ba.options.hoverPaddingY*2+ba.options.hoverMargin+ba.options.marginTop?g=g-l/2-ba.options.hoverPaddingY-ba.options.hoverMargin:g=g+l/2+ba.options.hoverPaddingY+ba.options.hoverMargin,g=Math.max(ba.options.marginTop+l/2+ba.options.hoverPaddingY,g),g=Math.min(ba.options.marginTop+h-l/2-ba.options.hoverPaddingY,g),f=Math.min(s+I-e/2-ba.options.hoverPaddingX,d[b]),f=Math.max(s+e/2+ba.options.hoverPaddingX,f),n.attr("transform","t"+f+","+g)},i=function(){return n.hide()},m=a.map(d.slice(1),function(a,b){return(a+d[b])/2}),x=null,v=Raphael.animation({r:this.options.pointSize+3},25,"linear"),w=Raphael.animation({r:this.options.pointSize},25,"linear"),j=function(a){var b,c,d;if(x!==null&&x!==a)for(b=0,d=B.length-1;0<=d?b<=d:b>=d;0<=d?b++:b--)B[b][x].animate(w);if(a!==null&&x!==a){for(b=0,c=B.length-1;0<=c?b<=c:b>=c;0<=c?b++:b--)B[b][a].animate(v);G(a)}x=a;if(a===null)return i()},F=function(a){var b,c,d;a-=ba.el.offset().left,d=[];for(b=c=m.length;c<=0?b<=0:b>=0;c<=0?b++:b--){if(b===0||m[b-1]>a){j(b);break}d.push(void 0)}return d},this.el.mousemove(function(a){return F(a.pageX)}),C=function(a){var b;return b=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0],F(b.pageX),b},this.el.bind("touchstart",C),this.el.bind("touchmove",C),this.el.bind("touchend",C),j(0)},c.prototype.createPath=function(b,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s;n="";if(this.options.smooth){i=this.gradients(b);for(j=0,s=b.length-1;0<=s?j<=s:j>=s;0<=s?j++:j--)g=b[j],j===0?n+="M"+g.x+","+g.y:(h=i[j],l=b[j-1],m=i[j-1],k=(g.x-l.x)/4,o=l.x+k,q=Math.min(e,l.y+k*m),p=g.x-k,r=Math.min(e,g.y-k*h),n+="C"+o+","+q+","+p+","+r+","+g.x+","+g.y)}else n="M"+a.map(b,function(a){return""+a.x+","+a.y}).join("L");return n},c.prototype.gradients=function(b){return a.map(b,function(a,c){return c===0?(b[1].y-a.y)/(b[1].x-a.x):c===b.length-1?(a.y-b[c-1].y)/(a.x-b[c-1].x):(b[c+1].y-b[c-1].y)/(b[c+1].x-b[c-1].x)})},c.prototype.measureText=function(a,b){var c,d;return b==null&&(b=12),d=this.r.text(100,100,a).attr("font-size",b),c=d.getBBox(),d.remove(),c},c.prototype.parseYear=function(a){var b,c,d,e,f,g,h,i,j,k;return g=a.toString(),c=g.match(/^(\d+) Q(\d)$/),e=g.match(/^(\d+)-(\d+)$/),f=g.match(/^(\d+)-(\d+)-(\d+)$/),c?parseInt(c[1],10)+(parseInt(c[2],10)*3-1)/12:e?parseInt(e[1],10)+(parseInt(e[2],10)-1)/12:f?(k=parseInt(f[1],10),d=parseInt(f[2],10),b=parseInt(f[3],10),h=(new Date(k,d-1,b)).getTime(),i=(new Date(k,0,1)).getTime(),j=(new Date(k+1,0,1)).getTime(),k+(h-i)/(j-i)):parseInt(a,10)},c.prototype.commas=function(a){return Math.max(0,a).toFixed(0).replace(/(?=(?:\d{3})+$)(?!^)/g,",")},c}(),window.Morris=b})).call(this);