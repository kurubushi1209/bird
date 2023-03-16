class Actor{
    constructor(x, y, team, speed, size, draw, main, addParams){
        this.x=x;
        this.y=y;
        this.team=team;
        this.dx=0;
        this.dy=0;
        this.speed=speed;
        this.size=size;
        this.draw = draw;
        this.main = main;
        this.liveTime=0;
        this.maxhp=1;
        this.hp=1;
        this.takeDamage=0;
        this.Transparent=0;//透過
        this.itemSlot = [];
        this.weaponSlot=[];
        this.selectWeapon=0;
        this.alive = cusualAlive;
        this.damage =(self, other)=>{
            self.hp-=self.takeDamage;
        }
        this.death = (self)=>{if(!self.hp)self.alive=0;}
        addParams!=undefined ? addParams(this) : false;
    }

    Draw(){
        this.draw(this);
        for(let i of this.itemSlot){i.draw(i);}
        if(this.weaponSlot.length)this.weaponSlot[this.selectWeapon].draw(this.weaponSlot[this.selectWeapon]);
        //for(let w of this.weaponSlot){w.draw(w);}
    }
    Main(){
        this.main(this);
        this.death(this);
        for(let i of this.itemSlot){i.main(i);}
        if(this.weaponSlot.length){this.weaponSlot[this.selectWeapon].main(this.weaponSlot[this.selectWeapon]);}
        //for(let w of this.weaponSlot){w.main(w);}
        if(this.Transparent)this.Transparent--;
    }
  }

class Bullet{//弾
    constructor(x, y, team, size, target, parent, speed, draw, main, hit, addParams){
        this.x=x;
        this.y=y;
        this.team=team;
        this.size=size;
        this.target=target;//{x: , y:} or Actor
        this.parent=parent;

        this.speed=speed;
        this.dx=0;
        this.dy=0;
        culVec(this, this.target);

        this.main=main;
        this.draw=draw;
        this.hit=hit;
        this.alive=240;
        addParams!=undefined ? addParams(this) : false;
    }

    Draw(){
        this.draw(this, this.target);
    }
    Main(){
        this.main(this, this.target);
        this.x+=this.dx;
        this.y+=this.dy;
    }
}

class Button{//触ると処理が発生するオブジェクトを作る
  constructor(x, y, w, h, func, draw){
      this.x=x;
      this.y=y;
      this.w=w;//横の判定
      this.h=h;//縦の判定
      this.func=func;//押された時の処理
      this.draw=draw;//ボタンを描画する処理
  }
}

class Effect{
    constructor(x, y, alive, draw, main, addParams){
        this.x=x;
        this.y=y;
        this.alive=alive
        this.draw=draw;
        this.main=main;
        addParams!=undefined ? addParams(this) : false;
    }
    
    Draw(){
        this.draw(this);
    }
    Main(){
        this.main(this);
    }
}

class Pixel{
    constructor(x, y, clr){
        this.x=x;
        this.y=y;
        this.clr=clr;

        this.dx=0;
        this.dy=0;
        //addParams!=undefined ? addParams(this) : false;
    }

    draw(){
        dot(this.x, this.y, this.clr);
        this.x+=this.dx;
        this.y+=this.dy;
    }
}


class Vector{
  constructor(sx, sy, gx, gy){
    this.sx=sx;
    sx!=gx ? this.gx=gx : this.gx=gx*1.0001;//計算誤差を防ぐために少しだけずらす
    this.sy=sy;
    this.gy=gy;
    this.t = (gy-sy)/(this.gx-sx);
  }
  calTilt(){//傾きをもとめる
    this.t = (this.gy-this.sy)/(this.gx-this.sx);
  }
}

class Weapon{
    constructor(name, parent, draw, main,addParams){
        this.name=name;
        this.parent=parent;
        this.draw=draw;
        this.main=main;
        addParams!=undefined ? addParams(this) : false;
    }
    Draw(){

    }
    Main(){

    }
}




let player = Fighter(can.width/2, 800, 1, "rgba(0, 255, 0, 1)");

player.itemSlot.push(controller(player),  displayAmmo(player), displayHP(player));
player.weaponSlot.push(gun(player), gun_twin(player), missile(player));

let enemy = Fighter(200, 200, 2, "rgba(255, 0, 0, 1)");
enemy.itemSlot.push(autoPilot(enemy));

frames.push(new Game_Main());

