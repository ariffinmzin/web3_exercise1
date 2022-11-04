const Web3 = require('web3')
const rpcURL = "https://goerli.infura.io/v3/8c872481bb2149cb809038d5d7c76e54"; // Your RCP URL goes here
const web3 = new Web3(rpcURL)

web3.eth.getBlockNumber(function (error, result) {
    console.log(result)
  })

  /*
  async function getBlockNumber() {
    const latestBlockNumber = await web3.eth.getBlockNumber()
    console.log(latestBlockNumber)
    return latestBlockNumber
  }
  
  getBlockNumber()
  */