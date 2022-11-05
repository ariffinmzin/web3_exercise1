window.Buffer = require('buffer/').Buffer;

const Tx = require('ethereumjs-tx')

//const web3 = new Web3('https://goerli.infura.io/v3/8c872481bb2149cb809038d5d7c76e54');
const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/8c872481bb2149cb809038d5d7c76e54"))

//const address = "0xd389F76AeE66B7b94D5Cec2FAf623A9dB3E6473D"; //wallet
const address = "0xB6b5847eA6f7608537acE3a56F8a29BbB8F7a6A4";

//web3.eth.defaultAccount = web3.eth.accounts[0];

var ABI = [
{
  "inputs": [
    {
      "internalType": "string",
      "name": "_fName",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "_age",
      "type": "uint256"
    }
  ],
  "name": "setInstructor",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "getInstructor",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
}
];
    
var CoursetroContract = new web3.eth.Contract(ABI, address);

async function initContractLogic() {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    //web3.eth.wallet.add('e9f79d11f48c68b19ea2e1e9db852e7770ceb265547bb8f0af01698d9a358445');

    console.log(account)
     window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log(accounts[0])
       });


    const privateKey1 = Buffer.from('e9f79d11f48c68b19ea2e1e9db852e7770ceb265547bb8f0af01698d9a358445', 'hex');

    //const myData = CoursetroContract.methods.setInstructor("abu",12).encodeABI();

    

    const contract_Address = '0xB6b5847eA6f7608537acE3a56F8a29BbB8F7a6A4';

    $('#button').on('click', function() { 

    const myData = CoursetroContract.methods.setInstructor($('#name').val().trim(), $('#age').val().trim()).encodeABI();

    web3.eth.getTransactionCount(account, (err, txCount) => {
    // Build the transaction
    
    const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       contract_Address,
    value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
    gasLimit: web3.utils.toHex(2100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
    data: myData  
    }

    // Sign the transaction
    const tx = new Tx(txObject);
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
    console.log("Transaction " + tx);
    });

  
  });

  updateHtmlData();

});  //click button





/*
       let provider = window.ethereum;
if (provider) {
const account = await provider.request({ method: "eth_requestAccounts" });
this.web3 = new Web3(provider);
var CoursetroContract = new web3.eth.Contract(ABI, address);
}
*/






    /*
    var currentAccounts = await web3.eth.getAccounts();
    console.log(currentAccounts);
    */

    





    /*

    //working

    $('#button').on('click', function() {    
      
        //const getData = CoursetroContract.methods.setInstructor($('#name').val().trim(), $('#age').val().trim());
        // finally pass this data parameter to send Transaction
        //web3.eth.sendTransaction({ to:0xB6b5847eA6f7608537acE3a56F8a29BbB8F7a6A4, from:account, data: getData }).on('transactionHash', function(hash)
        
      
                                                                                            //send function
        CoursetroContract.methods.setInstructor($('#name').val().trim(), $('#age').val().trim()).send({from: account}).on('transactionHash', function(hash)
        {
            console.log('hash', hash);
        }).on('confirmation', function(confirmationNumber, receipt) {
            updateHtmlData();
        }).catch(function(error) {
            console.log(error, 'error');
        });
    });

    function updateHtmlData() {               //call function
        CoursetroContract.methods.getInstructor().call(function(error, result){
            if (error) {
                console.log(error, 'error')
            } else {
                console.log(result, 'result');
                $('#name').val(result[0]);
                $('#age').val(result[1]);
            }
        });
    }
    updateHtmlData();

     */
} //initContractLogic



initContractLogic();

function updateHtmlData() {  

  /*
  Courses.getInstructor(function(error, result){
    if(!error){
      $(“#instructor”).html(result[0]+’ (‘+result[1]+’ years old)’);
      console.log(result);
      }
   else
     console.error(error);
   });
   */
  
                                 //call function
  CoursetroContract.methods.getInstructor().call(function(error, result){
      if (error) {
          console.log(error, 'error')
      } else {
          console.log(result, 'result');
          //$('#name').val(result[0]);
          //$('#age').val(result[1]);
          $('#instructor').html(result[0]+' ('+result[1]+' years old)');
      }
  });
}

