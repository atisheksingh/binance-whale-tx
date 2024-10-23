const axios = require('axios');

const BITQUERY_API_URL = 'https://streaming.bitquery.io/graphql';
const { BITQUERY_API_KEY } = process.env;

const NETWORKS = {
  1: "eth",
  56: "bsc",
  97: "bsc_testnet",
  5: "goerli",
  4: "rinkeby",
  3: "ropsten",
  11155111: "sepolia",
  61: "classic",
  63: "mordor",
  6: "kotti",
  212: "astor",
  137: "polygon",
  42161: "arbitrum",
  43114: "avalanche",
  10: "optimism",
  250: "fantom",
  25: "cronos",
  8217: "klaytn",
  32659: "fusion",
  128: "huobi",
  1284: "moonbeam",
  42220: "celo",
  7700: "canto",
  1313161554: "aurora",
}

const query = `
query WhalesMonitor($network: evm_network!, $count: Int!, $min: String!) {
  EVM(network: $network) {
    Transactions(
      limit: {count: $count}
      where: {Transaction: {Value: {ge: $min}}}
      orderBy: {descending: Block_Date}
    ) {
      ChainId
      Transaction {
        Hash
        From
        To
        Value
        ValueInUSD
        GasPrice
      }
    }
  }
}
`;

async function getTopWhales(networkId, count, min) {
  if (!NETWORKS[networkId]) throw new Error('Network not supported');

  try {
    const variables = {
      network: NETWORKS[networkId],
      count,
      min: min.toString()
    };

    const response = await axios.post(
      BITQUERY_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer ory_at_AGNHDhM-tEzzP1p4ckWNzIXEWr0sSloOxAZP3hJdP08.PDgKq0sUAR2RQnY7BvY0vFbH1xauEhnubGoT1OMEhgw"
        }
      }
    )
      ;

    return response.data.data.EVM.Transactions;
  } catch (e) {
    console.error('getTopWhales', e);
  }
}

module.exports = { getTopWhales };
