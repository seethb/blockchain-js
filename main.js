const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp, data,previoushash=''){
        this.index =index;
        this.timestamp=timestamp;
        this.previoushash =previoushash;
        this.hash=this.calculateHash();
        this.data=data;
        this.nonce=0;
    }
    calculateHash(){
        return SHA256(this.index+this.previoushash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined"+this.hash);
    }
}
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisblock()];
        this.difficulty=4;
    }
    createGenesisblock(){
        return new Block(0,'01/01/2017',"Genesis Block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.mineBlock(4);
        //newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for (let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if (currentBlock.previoushash !== previousBlock.hash){
                return false;
            }
        }
        return true;

    }
}
let balablock=new Blockchain();
console.log('Mineblock 1');
balablock.addBlock(new Block(1,"20/10/2007",{amount:4}));
console.log('Mineblock 1');
balablock.addBlock(new Block(2,"21/10/2007",{amount:5}));
console.log('Is blockchain is valid'+balablock.isChainValid());
//balablock.chain[1].data = {amount : 600};
console.log('Is blockchain is valid'+balablock.isChainValid());
//console.log(JSON.stringify(balablock,null,4));

