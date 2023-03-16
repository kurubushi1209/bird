let v1 = {sx:0, gx:700, sy:0, gy:700, clr:"black"};
let v2 = {sx:700, gx:0, sy:0, gy:700, clr:"black"};


function culVec(i, g){//次の目的地までの進行方向を計算 
    let mag = Math.sqrt((g.x-i.x)**2+(g.y-i.y)**2);
    Math.abs((g.x-i.x)/mag*i.speed)<Math.abs(g.x-i.x) ? i.dx = (g.x-i.x)/mag*i.speed : i.dx=0;
    Math.abs((g.y-i.y)/mag*i.speed)<Math.abs(g.y-i.y) ? i.dy = (g.y-i.y)/mag*i.speed : i.dy=0;
    //console.log(i.dx, i.dy);
}

function collCalCircles(a, b){//円の当たり判定を求める
    if( ( b.x - a.x ) **2 + ( b.y-a.y ) **2 <= (a.size+b.size) **2){
        return true;
    }else{
        return false;
    }
}
function collCalVecs(a, b){//線分の当たり判定を求める
    let ta = (a.gy-a.sy)/(a.gx-a.sx);//a.t;
    let tb = (b.gy-b.sy)/(b.gx-b.sx);//b.t;
    let x = (b.sy-a.sy+ta*a.sx-tb*b.sx)/(ta-tb);

    let r = (x-b.sx) / (b.gx-b.sx);
    let r2= (x-a.gx) / (a.sx-a.gx);
    let hit =0<r && r<1 && 0<r2 && r2<1;

    if(hit){return true;}
    else{return false;}
}
console.log(collCalVecs(v1, v2))

function collCalObjects(actors, bullets){
    for(let a of actors){
        for(let b of bullets){

        }
    }
}

function dot(x, y, clr, size){
    size==undefined ? size=pixelSize : false;
    drawBlock(x, y, size, size, size*0.1, clr, true);
}

function drawBlock(x, y, w, h, lw, clr, fill){
    ctx.beginPath();
    if(fill){
        ctx.fillStyle=clr;
        ctx.fillRect(x, y, w, h);
    }
    ctx.strokeStyle=clr;
    ctx.lineWidth=lw+0.001;
    ctx.rect( x, y, w, h );
    ctx.stroke();
    
    ctx.closePath();
}

function drawLine(sx, sy, gx, gy, lw, clr, edge){
  ctx.beginPath();
  edge==undefined ? ctx.lineCap = "butt" : ctx.lineCap = edge;;
  ctx.moveTo(sx, sy);
  ctx.lineTo(gx, gy);
  ctx.strokeStyle=clr;
  ctx.lineWidth =lw;
  ctx.stroke();
  ctx.closePath();
}

function drawPixelGraph(i){
    for(let p of i.pixels){
        if(i.Transparent%3==0)p.draw();
    }
}
function moveWithPixel(i){//移動
    for(let p of i.pixels){
        p.x+=i.dx;
        p.y+=i.dy;
    }
}

function drawPoint(x, y, size, clr){
    ctx.beginPath () ;
    ctx.arc(x, y, size, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
    ctx.fillStyle=clr;
    ctx.fill();
    ctx.closePath();
}

function drawEdge(x, y, size, lw, clr){
    ctx.beginPath () ;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.strokeStyle=clr;
    ctx.lineWidth =lw;
    ctx.stroke();
    ctx.closePath();
}

function drawEdge2(x, y, rx, ry, lw, clr, ang){
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI * 1);
    ctx.strokeStyle=clr;
    ctx.lineWidth=lw;
    ctx.stroke();
    ctx.closePath();
}

function pushButton(btn){
    for(let b of btn){
        if(collCalCircles(mouse, b)){
            b.func();
        }
    }
}


function reload(w){
    w.ammo+=w.reload;
    if(w.mag<w.ammo){w.ammo=w.mag;}
}

function makeBullet(weapon, type){
    if(!Math.floor(weapon.ammo))return;
    weapon.ammo--;
    frames[0].bullets.push(type);
}



setInterval(()=>{//要改善（1frameラグあり）
    ctx.clearRect(0, 0, can.clientWidth, can.height);
    drawBlock(0, 0, 1000, 1000, 2, "rgba(0, 0, 0, 1", true);
    frames[0].main();
    //frames[0].draw();
    for(let f of frames){f.draw();}
}, 1000/fps);
