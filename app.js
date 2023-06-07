function getRandomNum (min,max) {
    return Math.random()*(max-min)+min;
}

const app=Vue.createApp({
data(){
    return {
        playersHealth:100,
        monsterHealth:100,
        counter:0,
        gameStatus:false,
        win:false,
        lose:false,
        draw:false,
        logArray:[],
        StatusArray:["lost!","Win","Draw"],
        status:'',
    }
},
computed:{
    SpecialAttackStatus () {
        return this.counter%3 !== 0;
    }
},
watch:{
    gameStatus (val){
        if(val === true){
          return val  
        }
    }
},
methods:{
    attacPlayer () {
        const attack =Math.floor(getRandomNum(8,12));
        this.playersHealth-=attack;
        this.counter++;
        this.battleLog('Monster','Attack',attack);
        this.WatchHealths();
    },
    attacMonster () {
        const attack =Math.floor(getRandomNum(4,8));
        this.monsterHealth-=attack;
        this.battleLog('Player','Attack',attack)
        this.attacPlayer();
    },
    SpecialAttack () {
        const attack =Math.floor(getRandomNum(8,12));
        this.monsterHealth-=attack;
        this.counter++;
        this.battleLog('Player','Sp-Attack',attack);
        this.WatchHealths();
    },
    HealPlayer(){
        const attack =Math.floor(getRandomNum(8,12));
        if (this.playersHealth+attack >= 100){
            this.playersHealth=100;
            this.counter++;
            this.WatchHealths();
        }else{
            this.playersHealth+=attack;
            this.counter++;
            this.battleLog('Player','Heal',attack);
            this.WatchHealths();
        }
    },
    surrender () {
        this.playersHealth=0;
        // console.log("*****0******");
        this.battleLog('Player','surrendered',this.playersHealth);
        this.WatchHealths();
    },
    resetGame () {
        this.playersHealth = 100;
        this.monsterHealth = 100;
        this.counter = 0;
        this.gameStatus = false;
        this.logArray=[];
    },
    battleLog (who,type,value){
        this.logArray.unshift({'who':who,'type':type,'value':value});
    },
    WatchHealths (){
        console.log("player",this.playersHealth,"Monster",this.monsterHealth)
        if (this.playersHealth <= 0 && this.monsterHealth > 0){
            this.playersHealth=0;
            this.gameStatus=true;
            this.status=this.StatusArray[0];
            return this.status;
        }else if (this.playersHealth > 0 && this.monsterHealth <= 0) {
            this.monsterHealth = 0;
            this.gameStatus = true;
            this.status=this.StatusArray[1];
            return this.status;
        }else if (this.playersHealth <= 0 && this.monsterHealth <= 0){
            this.gameStatus = true;
            this.status=this.StatusArray[2];
            return this.status;
        }
    },
},
})

app.mount("#game")