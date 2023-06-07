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
    }
},
computed:{
    SpecialAttackStatus () {
        return this.counter%3 !== 0;
    }
},
watch:{
    playersHealth (val){
        if (val <= 0 && this.monsterHealth > 0){
            this.playersHealth=0;
            this.gameStatus=true;
            this.lose=true;
        }else if (val > 0 && this.monsterHealth <= 0) {
            this.monsterHealth = 0;
            this.gameStatus = true;
            this.win=true;
        }else if (val <= 0 && this.monsterHealth <= 0){
            this.gameStatus = true;
            this.draw=true;
        }
    },
    // monsterHealth (val){
    //     if (val <= 0 && this.playersHealth > 0 ){
    //         this.monsterHealth = 0;
    //         this.gameStatus=true;
    //         this.win = true;
    //     }else if(val <= 0 && this.playersHealth <= 0 ){
    //         this.gameStatus = true;
    //         this.draw=true;
    //     }
    // },
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
        this.battleLog('Monster','Attack',attack)
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
        this.battleLog('Player','Sp-Attack',attack)
    },
    HealPlayer(){
        const attack =Math.floor(getRandomNum(8,12));
        if (this.playersHealth+attack >= 100){
            this.playersHealth=100;
            this.counter++;
        }else{
            this.playersHealth+=attack;
            this.counter++;
            this.battleLog('Player','Heal',attack)
        }
    },
    surrender () {
        this.playersHealth=0;
        // console.log("*****0******");
        this.battleLog('Player','surrendered',this.playersHealth)
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
        console.log("*********",this.logArray[0]['who'])
    },
},
})

app.mount("#game")