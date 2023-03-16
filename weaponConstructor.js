//敵専用
function autoPilot(i){//雑魚敵の汎用移動AI
    return new Weapon(
        "controller", 
        i, 
        ()=>{},
        (self)=>{
            if(self.Arrived){
                self.target.x=Math.floor(Math.random()*can.width);
                self.target.y=Math.floor(Math.random()*can.height*0.6);
                culVec(self.parent, self.target);
                self.Arrived=false;
            }else{
                if(collCalCircles(self.target, self.parent)){
                    self.Arrived=true;
                }
            }
            self.parent.x+=self.parent.dx;
            self.parent.y+=self.parent.dy;
        },
        (self)=>{
            self.Arrived=true;
            self.target={x:0, y:0, size:10};
        }
    );
}



//player専用
function controller(i){//装備しているActorをマウスポインタ―と連動させる
    return new Weapon(
        "controller", 
        i, 
        ()=>{},
        (self)=>{
            if(!self.parent.hp){return;}
            culVec(self.parent, mouse);
            self.parent.x+=self.parent.dx;
            self.parent.y+=self.parent.dy;
        }
    );
}

function displayAmmo(i){
    return new Weapon(
        "displayAmmo",
        i,
        (self)=>{
            drawBlock(0, can.height-45, 30*self.parent.weaponSlot[self.parent.selectWeapon].mag, 20, 0, "gray", true);
            drawBlock(0, can.height-45, 30*self.parent.weaponSlot[self.parent.selectWeapon].ammo, 20, 0, "green", true);
            for(let x=1; x<=self.parent.weaponSlot[self.parent.selectWeapon].ammo; x++){
                drawLine(30*x, can.height-45, 30*x, can.height-25, 3, "white");
            }
        },
        ()=>{}
    )
}

function displayHP(i){
    return new Weapon(
        "displayHP",
        i,
        (self)=>{
            drawBlock(0, can.height-20, can.width, 20, 0, "red", true);
            drawBlock(0, can.height-20, can.width*(self.parent.hp/self.parent.maxhp), 20, 0, "orange", true);
        },
        ()=>{}
    )
}


//武器
function gun(i){
    return new Weapon(
        "gun",
        i,
        ()=>{},
        (self)=>{
            reload(self);
        },
        (self)=>{
            self.ammo=3;
            self.mag=3;
            self.reload=1/fps;
            self.shoot=()=>{makeBullet(
                self,
                new Bullet(
                    self.parent.x, 
                    self.parent.y, 
                    self.parent.team,
                    4,
                    {x:self.parent.x, y:0}, 
                    self.parent,
                    10, 
                    (self)=>{
                        for(let y=0; y<2; y++){dot(self.x, self.y+pixelSize*y, "yellow", self.size);}
                    },
                    (self)=>{
                        self.alive--;
                    },
                    (self, other)=>{other.takeDamage=1;self.alive=0;}
                )
                )
            };
        }
    )
}

function gun_twin(i){
    return new Weapon(
        "guntwin",
        i,
        ()=>{},
        (self)=>{
            reload(self);
        },
        (self)=>{
            self.ammo=6;
            self.mag=6;
            self.reload=0.75/fps;
            self.slot=-1;
            self.exit=7*pixelSize;
            self.shoot=()=>{
                if(self.ammo<2){return;}
                for(let c=0; c<2; c++){
                    makeBullet(
                        self,
                        new Bullet(
                            self.parent.x+self.slot*self.exit, 
                            self.parent.y, 
                            self.parent.team,
                            4,
                            {x:self.parent.x, y:self.parent.y-can.height}, 
                            self.parent,
                            10, 
                            (self)=>{
                                for(let y=0; y<2; y++){dot(self.x, self.y+pixelSize*y, "yellow", self.size);}
                            },
                            (self)=>{
                                self.alive--;
                            },
                            (self, other)=>{other.takeDamage=1;self.alive=0;}
                        )
                    );
                    self.slot=self.slot*(-1);
                }
            };
        }
    )
}

function missile(i){
    return new Weapon(
        "missile",
        i,
        (self)=>{
            self.gradetion=(self.gradetion+10)%255;
            drawBlock(30*(self.target.length), can.height-45, 30*(self.parent.weaponSlot[self.parent.selectWeapon].ammo-self.target.length)+2, 20, 0, "rgba(0, 0, 0, 0.5)", true);
            for(let x=1; x<=self.target.length; x++){
                drawLine(30*x, can.height-45, 30*x, can.height-25, 2, `rgba(255, ${self.gradetion}, 0, 1)`);
            }
        },
        (self)=>{
            let myVec, targetVec;
            reload(self);
            
            if(self.ammo>=1){
                myVec=new Vector(self.parent.x, self.parent.y, self.parent.x, 0);
                drawLine(myVec.sx, myVec.sy, myVec.gx, myVec.gy, 2, "red");
                for(let t of frames[0].actors){
                    if(self.parent.team==t.team){continue;}
                    targetVec=new Vector(t.x-4, t.y, t.x+4, t.y);
                    //drawLine(targetVec.sx, targetVec.sy, targetVec.gx, targetVec.gy, 3, "green");
                    if(self.target.length<Math.floor(self.ammo) && collCalVecs(myVec, targetVec) && !self.target.includes(t) && t.alive==cusualAlive){
                        self.target.push(t);
                        frames[0].effects.push(
                            new Effect(t.x, t.y, 2, 
                                (self)=>{
                                    drawBlock(self.target.x-15, self.target.y-15, 30, 30, 2, "rgba(255, 0, 0, 0.75)", false );
                                    drawLine(self.target.x-10, self.target.y, self.target.x-30, self.target.y, 2, "rgba(255, 0, 0, 0.75)");
                                    drawLine(self.target.x+10, self.target.y, self.target.x+30, self.target.y, 2, "rgba(255, 0, 0, 0.75)");
                                    drawLine(self.target.x, self.target.y-10, self.target.x, self.target.y-30, 2, "rgba(255, 0, 0, 0.75)");
                                    drawLine(self.target.x, self.target.y+10, self.target.x, self.target.y+30, 2, "rgba(255, 0, 0, 0.75)");
                                }, 
                                (self)=>{if(!self.parent.target.length || self.target.alive<cusualAlive){self.alive--;}},
                                (s)=>{s.target=t;s.parent=self;}
                            )
                        );
                    }
                }
            }
        },
        (self)=>{
            self.ammo=6;
            self.mag=6;
            self.reload=0.8/fps;
            self.slot=-1;
            self.exit=6*pixelSize;
            self.gradetion=0;
            self.target=[];

            self.shoot=()=>{
                for(let i=0; i<self.target.length; i++){
                makeBullet(
                    self,
                    new Bullet(
                        self.parent.x+self.exit*self.slot, 
                        self.parent.y, 
                        self.parent.team,
                        4,
                        self.target[i],//{x:self.parent.x, y:0},
                        self.parent,
                        -0.5, 
                        (self)=>{
                            //if(!enemy.hp){self.alive=0;}
                            //for(let y=0; y<1; y++){
                                dot(self.x-2, self.y-2, "white", pixelSize);
                                drawLine(self.x, self.y, self.x-self.dx*4, self.y-self.dy*4, 2, "rgba(255, 0, 0, 0.9)");
                                drawLine(self.x-self.dx*2, self.y-self.dy*2, self.x, self.y, 4, "white");
                                //drawLine(self.x-self.dy, self.y+self.dx, self.x+self.dy, self.y-self.dx, 2, "rgba(255, 255, 255, 1)");
                                drawLine(self.x-self.dy-self.dx*2, self.y+self.dx-self.dy*2, self.x+self.dy-self.dx*2, self.y-self.dx-self.dy*2, 2, "rgba(255, 255, 255, 1)");
                                
                            //}
                            
                        },
                        (self)=>{
                            self.alive--;
                            self.speed+=0.05;
                            if(self.alive<210 && self.alive>135){
                                if(self.alive%3==0){
                                    culVec(self, self.target);
                                    //self.dx-=Math.abs(enemy.x-self.x)/(enemy.x-self.x);
                                    //self.dy-=Math.abs(enemy.y-self.y)/(enemy.y-self.y);
                                }
                                self.dx=self.dx*1.1;
                                self.dy=self.dy*1.1;
                                //self.dy+=Math.abs(self.dy)/self.dy;
                            }
                            
                        },
                        (self, other)=>{other.takeDamage=2;self.alive=0;},
                        (self)=>{self.num=i;}
                    )
                );
                self.slot=self.slot*(-1);
                }
                self.target=[];
            };
        }
    )
}