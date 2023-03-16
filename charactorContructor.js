function deployActor(type, i, w){
    let p;
    p = type;
    p.itemSlot=i;
    p.weaponSlot=w;
    return p;
}


function Fighter(x, y, team, clr){
    return new Actor(
        x, 
        y,
        team,
        3.5,
        10,
        (self)=>{
            //if(self.alive==cusualAlive)
            
            drawPixelGraph(self);
            //drawPoint(self.x, self.y, self.size, "pink");
        },
        (self)=>{
            if(self.alive==cusualAlive)moveWithPixel(self);
        },

        (self)=>{
            self.death=(self)=>{if(self.hp<=0){
                self.alive--;
                for(let p of self.pixels){
                    if(p.dx==0 && p.dy==0 && self.takeDamage>1){
                        p.dx=Math.random()*8-4;
                        p.dy=Math.random()*4;
                    }
                    p.dy+=0.2;
                }
                self.dy+=0.1;
            }}
            self.clr=clr;
            self.Dot = [
                [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
                [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
                [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
                [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
            ];
            
            self.pixels=[];
            //self.Dot=[[1]];
            self.pixels.push(new Pixel(self.x, self.y, self.clr, pixelSize))
            for(let y=-7.5; y<=6.5; y++){
                for(let x=-7.5; x<=6.5; x++){
                    if(self.Dot[y+7.5][x+7.5])self.pixels.push(new Pixel(self.x+pixelSize*x, self.y+pixelSize*y, self.clr, pixelSize*(15-x)));
                }
            }
        },
    );
}

//shootBullet(player.x, player.y-pixelSize*6, 4, {x:player.x, y:0}, player, 8, (self)=>{dot(self.x, self.y, "red", self.size)}, (self, other)=>{other.takeDamage=1;self.alive=0;});
//x, y, size, target, parent, speed, main, hit