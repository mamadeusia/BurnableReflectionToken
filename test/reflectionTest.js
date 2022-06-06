const { assert, expect, should } = require("chai");
const { allowedNodeEnvironmentFlags } = require("process");
const { Writable } = require("stream");

const Reflect = artifacts.require("REFLECT");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("REFLECTION", (accounts) =>  {
    let CONTRACT_ADDRESS ; 
    let ADMIN_ROLE = accounts[0];
    let reflection ; 
    let hundredBN =new web3.utils.BN("10000"); 
    
    let fiveBN = new web3.utils.BN("500");

    let nineBN = new web3.utils.BN("9");
    
    let tenBN = new web3.utils.BN("10");

    before(async ()=> {
        reflection = await Reflect.deployed();
        // await transferToAllAccounts();

    });

    // it("should admin address balance be total balance" , async ()=> {
    //     const totalBalance = await reflection.totalSupply();
    //     const adminBalance = await reflection.balanceOf(ADMIN_ROLE);
    //     console.log(totalBalance.toString());
    //     // assert.equal(totalBalance, adminBalance, "admin balance ");
    // });
    it("should send transaction from admin to another account" , async ()=>{
        //given
            const totalBalance = await reflection.totalSupply();
            const toBalance = await reflection.balanceOf(accounts[1]);
            const fromBalance = await reflection.balanceOf(ADMIN_ROLE);
            const transferAmount = 200000_000000000;
        //when  
            await reflection.transfer( accounts[1] ,  transferAmount , {
                from:ADMIN_ROLE,
            });
        //then
            const toBalancePrime = await reflection.balanceOf(accounts[1]);
            const fromBalancePrime = await reflection.balanceOf(ADMIN_ROLE);
            const totalBalancePrime = await reflection.totalSupply();

            assert.equal(
                toBalancePrime.toString(),
                new web3.utils.BN(toBalance).add(new web3.utils.BN(transferAmount)).toString()
            );
            assert.equal(
                fromBalancePrime.toString(),
                new web3.utils.BN(fromBalance).sub(new web3.utils.BN(transferAmount)).toString()
            );
            assert.equal(totalBalance.toString(), totalBalancePrime.toString());


    });
    // it("should accounts transfer to each other " , async ()=>{
    //     //given
    //         const totalBalance = await reflection.totalSupply();
    //         const toBalance = await reflection.balanceOf(accounts[2]);
    //         const fromBalance = await reflection.balanceOf(accounts[1]);
    //         const transferAmount = 1000000000;
    //         // const burnAmount = 
    //         const transferAmountBN =new web3.utils.BN(transferAmount);

    //     //when  
    //     await reflection.transfer( accounts[2] ,  transferAmount , {
    //         from:accounts[1],
    //     });
    //     //then
    //     const toBalancePrime = await reflection.balanceOf(accounts[2]);
    //     const fromBalancePrime = await reflection.balanceOf(accounts[1]);
    //     const totalBalancePrime = await reflection.totalSupply();

    //     assert.equal(
    //         toBalancePrime.toString(),
    //         new web3.utils.BN(toBalance).add(new web3.utils.BN(transferAmount).mul(nineBN).div(tenBN)).toString()
    //     );
    //     assert.equal(
    //         fromBalancePrime.toString(),
    //         new web3.utils.BN(fromBalance).sub(new web3.utils.BN(transferAmount)).toString()
    //     );
        
    //     //assert.equal(totalBalance.toString(), totalBalancePrime.toString());
    //     assert.equal(totalBalancePrime.toString() , new web3.utils.BN(totalBalance).sub(new web3.utils.BN(transferAmount).mul(fiveBN).div(hundredBN)).toString());

    // });

    // it("should accounts transfer to each otherd " , async ()=>{
    //     //given
    //         const totalBalance = await reflection.totalSupply();
    //         const toBalance = await reflection.balanceOf(accounts[2]);
    //         const fromBalance = await reflection.balanceOf(accounts[1]);
    //         const transferAmount = 100000;
    //         // const burnAmount = 
    //         const transferAmountBN =new web3.utils.BN(transferAmount);

    //     //when  
    //     await reflection.transfer( accounts[2] ,  transferAmount , {
    //         from:accounts[1],
    //     });
    //     //then
    //     const toBalancePrime = await reflection.balanceOf(accounts[2]);
    //     const fromBalancePrime = await reflection.balanceOf(accounts[1]);
    //     const totalBalancePrime = await reflection.totalSupply();

    //     assert.equal(
    //         toBalancePrime.toString(),
    //         new web3.utils.BN(toBalance).add(new web3.utils.BN(transferAmount).mul(nineBN).div(tenBN)).toString()
    //     );
    //     assert.equal(
    //         fromBalancePrime.toString(),
    //         new web3.utils.BN(fromBalance).sub(new web3.utils.BN(transferAmount)).toString()
    //     );
        
    //     //assert.equal(totalBalance.toString(), totalBalancePrime.toString());
    //     assert.equal(totalBalancePrime.toString() , new web3.utils.BN(totalBalance).sub(new web3.utils.BN(transferAmount).mul(fiveBN).div(hundredBN)).toString());

    // });

    // it("should Burn true value after bunch of transacions" , async ()=>{
    //     //given 
    //         const transferAmount = 10000;

    //         const totalBalance = await reflection.totalSupply();

    //     //when
    //         await transferRandom();
    //         // await new Promise(resolve => setTimeout(resolve, 3000));

    //     //then

    //         const totalBalancePrime = await reflection.totalSupply();
    //         console.log("totalBalancePrime :: ",totalBalancePrime.toString());
    //         console.log("totalBalance      :: ",totalBalance.toString());

    //         assert.equal(totalBalancePrime.toString() , new web3.utils.BN(totalBalance).sub(new web3.utils.BN(transferAmount).mul(fiveBN).div(hundredBN).mul(tenBN)).toString());

    // });



    // async function transferToAllAccounts(){
    //     const transferAmount = 1000000000;
    //     let promises = [] ; 
    //     for(let i = 1 ; i <10 ;i++ ){
    //         promises.push( reflection.transfer( accounts[i] ,  transferAmount , {
    //                         from:accounts[0],
    //                     }));
    //     }
    //     await Promise.all(promises);
    // }

    it("should 100 transacions success" , async ()=>{
        //let rand = Math.floor(Math.random() * 90000) + 10001;//creat rand number between 10000 - 100000
        const transferAmount = 100_000000000;

        for(let i = 1 ; i <= 1000 ; i++){
            let fromBalanceBefore = await reflection.balanceOf(accounts[1]);
            let toBalanceBefore = await reflection.balanceOf(accounts[2]);
            let fromRownedBefore = await reflection.rOwned(accounts[1]);
            let toRownedBefore = await reflection.rOwned(accounts[2]);    
            let tTotalBalanceBefore = await reflection.totalSupply();
            let rTotalBalanceBefore = await reflection.rTotalSupply();
            let rateBefore = await reflection.getRate();
            // let burnBefore = await reflection.calcBurn();

            console.log("*************************************************************************");
            console.log(`tx number: ${i}`);
            console.log(`before tx, fromAccount Balance: ${fromBalanceBefore}`);    
            console.log(`before tx, toAccount Balance: ${toBalanceBefore}`);
            console.log(`before tx, fromAccount Rowned: ${fromRownedBefore}`);    
            console.log(`before tx, toAccount Rowned: ${toRownedBefore}`);
            console.log(`before tx, tTotal: ${tTotalBalanceBefore}`);
            console.log(`before tx, rTotal: ${rTotalBalanceBefore}`);            
            console.log(`before tx, rate: ${rateBefore}`);
            // console.log(`before tx, burn: ${burnBefore}`);

            await reflection.transfer( accounts[2] ,  transferAmount , {
                from:accounts[1],
            });

            
            let toBalanceAfter = await reflection.balanceOf(accounts[2]);
            let fromBalanceAfter = await reflection.balanceOf(accounts[1]);
            let fromRownedAfter = await reflection.rOwned(accounts[1]);
            let toRownedAfter = await reflection.rOwned(accounts[2]);  
            let tTotalBalanceAfter = await reflection.totalSupply();
            let rTotalBalanceAfter = await reflection.rTotalSupply();
            let rateAfter = await reflection.getRate();
            // let burnAfter = await reflection.calcBurn(new web3.utils.BN(fiveBN).mul());

            console.log("---------------------------------------");
            console.log(`after tx, fromAccount Balance: ${fromBalanceAfter}`);    
            console.log(`after tx, toAccount Balance: ${toBalanceAfter}`);
            console.log(`after tx, fromAccount Rowned: ${fromRownedAfter}`);    
            console.log(`after tx, toAccount Rowned: ${toRownedAfter}`);
            console.log(`after tx, tTotal: ${tTotalBalanceAfter}`);
            console.log(`after tx, rTotal: ${rTotalBalanceAfter}`);            
            console.log(`after tx, rate: ${rateAfter}`);
            // console.log(`after tx, burn: ${burnAfter}`);     

            let tFee = new web3.utils.BN(transferAmount).mul(fiveBN).div(hundredBN);
            let tBurn = new web3.utils.BN(transferAmount).mul(fiveBN).div(hundredBN);
            assert.equal(tTotalBalanceAfter.toString() , 
                new web3.utils.BN(tTotalBalanceBefore).sub(tBurn).toString(), "tTotalBalance failed");

            let rFee = tFee.mul(rateBefore);
            let rBurn = tBurn.mul(rateBefore);
            assert.equal(rTotalBalanceAfter.toString(), 
                new web3.utils.BN(rTotalBalanceBefore).sub(rFee).sub(rBurn).toString(), "rTotalBalance failed");

            let rAmount = new web3.utils.BN(transferAmount).mul(rateBefore);
            let rTransferAmount = new web3.utils.BN(rAmount).sub(rFee).sub(rBurn);
            assert.equal(fromBalanceAfter.toString(), 
                fromRownedBefore.sub(new web3.utils.BN(rAmount)).div(rateAfter).toString(), "Balance from account failed");

            assert.equal(toBalanceAfter.toString(), 
                toRownedBefore.add(new web3.utils.BN(rTransferAmount)).div(rateAfter).toString(), "Balance to account failed");
        }

    });

});
