class Title{
    constructor(){
        this.select=2520;
    }
    main(){

    }
    draw(){
        drawBlock(100, 100, 10, 100, 0, "red", true);
    }
}

class Game_Main{
    constructor(addActors){//addActorsは配列で定義。ゲーム開始時にactorにみんなぶち込まれます
        this.actors=[];
        this.bullets=[];
        this.effects=[];
        this.timer=0;

        this.actors.push(player);
        for(let i=1; i<=8; i++){
            this.actors[i]=Fighter(200, 200, 2, "rgba(255, 255, 0, 1)");
            this.actors[i].itemSlot.push(autoPilot(this.actors[i]));
        }
        if(addActors!=undefined)for(let i of addActors){this.actors.push(i);}
    }
    main(){
        for(let b=0; b<this.bullets.length; b++){//弾の処理
            this.bullets[b].Main();
            if(this.bullets[b].alive<0){
                this.bullets.splice(b, 1); b--;
            }
        }

        for(let a=0; a<this.actors.length; a++){//キャラクターの処理
            this.actors[a].Main();
            if(this.actors[a].alive<0){
                this.actors.splice(a, 1); a--;
            }
        }

        for(let e=0; e<this.effects.length; e++){//エフェクトの処理
            this.effects[e].Main();
            if(this.effects[e].alive<0){
                this.effects.splice(e, 1); e--;
            }
        }

        //当たり判定
        for(let a of this.actors){
            for(let b of this.bullets){
                if(a.alive<cusualAlive){continue;}
                if(collCalCircles(a, b) && a.team!=b.team){
                    b.hit(b, a);
                    a.damage(a, b);
                }
            }
        }
        timer++;
    }
    draw(){
        for(let b=0; b<this.bullets.length; b++){//弾の処理
            this.bullets[b].Draw();
        }

        for(let a=0; a<this.actors.length; a++){//キャラクターの処理
            this.actors[a].Draw();
        }
        for(let e=0; e<this.effects.length; e++){//エフェクトの処理
            this.effects[e].Draw();
        }
    }
    
    mouse(){
        player.weaponSlot[player.selectWeapon].shoot(player.weaponSlot[0]);
        //shoot(player, FighterBullet(player.x-2, player.y-pixelSize*6, player, {x:player.x, y:0}));
    }
    key(){
        player.selectWeapon=(player.selectWeapon+1)%player.weaponSlot.length;
        console.log(player.selectWeapon)
    }
}
