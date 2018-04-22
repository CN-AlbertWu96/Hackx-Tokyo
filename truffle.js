var HDWalletProvider = require('truffle-hdwallet-provider')
var mnenontic = 'dial crystal drill arena demise monster alone calm volcano shoot all attend'

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    ropsten: {
        provider: function(){
            return new HDWalletProvider(mnenontic,'	https://ropsten.infura.io/UpE93Td4dFCicvWfH5ls')
        },
        network_id: 1,
        gas: 2000000
    },
    dev: {
      host: "localhost",
      port: 8545,
      network_id: 2 // Match any network id
    }
  }
};
