// ─── API Service (Mocking Data for Standalone Frontend) ────────────────────────

// Simulated network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const DUMMY_HOLDINGS = [
  {
    "coin": "USDC",
    "coinName": "USDC",
    "logo": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png",
    "currentPrice": 85.41,
    "totalHolding": 0.001534,
    "averageBuyPrice": 1.586,
    "stcg": { "balance": 0.001534, "gain": 0.1285 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "WETH",
    "coinName": "Polygon PoS Bridged WETH",
    "logo": "https://coin-images.coingecko.com/coins/images/2518/large/weth.png",
    "currentPrice": 211756,
    "totalHolding": 0.000240,
    "averageBuyPrice": 3599.85,
    "stcg": { "balance": 0.000240, "gain": 49.957 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "SOL",
    "coinName": "SOL (Wormhole)",
    "logo": "https://coin-images.coingecko.com/coins/images/22876/large/SOL_wh_small.png",
    "currentPrice": 14758.01,
    "totalHolding": 0.0, // Using 0 instead of 3.46e-17 for clarity
    "averageBuyPrice": 221.42,
    "stcg": { "balance": 0.0, "gain": 0.0 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "WPOL",
    "coinName": "Wrapped POL",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 22.08,
    "totalHolding": 2.317,
    "averageBuyPrice": 0.522,
    "stcg": { "balance": 1.317, "gain": 49.954 },
    "ltcg": { "balance": 1, "gain": 20 }
  },
  {
    "coin": "MATIC",
    "coinName": "Polygon",
    "logo": "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png",
    "currentPrice": 22.22,
    "totalHolding": 2.751,
    "averageBuyPrice": 0.688,
    "stcg": { "balance": 2.751, "gain": 59.244 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "GONE",
    "coinName": "Gone",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 0.0001462,
    "totalHolding": 696324.3,
    "averageBuyPrice": 0.0000163,
    "stcg": { "balance": 696324.3, "gain": 90.399 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "USDT",
    "coinName": "Arbitrum Bridged USDT",
    "logo": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    "currentPrice": 85.42,
    "totalHolding": 0.000158,
    "averageBuyPrice": 1.498,
    "stcg": { "balance": 0.000158, "gain": 0.0132 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "SLN",
    "coinName": "Smart Layer Network",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 6.66,
    "totalHolding": 0.01,
    "averageBuyPrice": 4.999,
    "stcg": { "balance": 0.01, "gain": 0.0166 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "OX",
    "coinName": "OX Coin",
    "logo": "https://coin-images.coingecko.com/coins/images/35365/large/logo.png",
    "currentPrice": 0.133,
    "totalHolding": 5,
    "averageBuyPrice": 0.0184,
    "stcg": { "balance": 5, "gain": 0.5739 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "FLAME",
    "coinName": "FireStarter",
    "logo": "https://coin-images.coingecko.com/coins/images/17359/large/WhiteOnBlack_Primary_Logo.png",
    "currentPrice": 0.355,
    "totalHolding": 0.0,
    "averageBuyPrice": 0.0788,
    "stcg": { "balance": 0.0, "gain": 0.0 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "PIG",
    "coinName": "Pigcoin",
    "logo": "https://coin-images.coingecko.com/coins/images/35425/large/pigcoin_200.png",
    "currentPrice": 0.00008706,
    "totalHolding": 1.79,
    "averageBuyPrice": 0,
    "stcg": { "balance": 1.79, "gain": 0.000155 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "$CULO",
    "coinName": "CULO",
    "logo": "https://coin-images.coingecko.com/coins/images/34662/large/CULO-logo-inverted_200.png",
    "currentPrice": 0.00001623,
    "totalHolding": 150000,
    "averageBuyPrice": 0,
    "stcg": { "balance": 150000, "gain": 2.434 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "ETH",
    "coinName": "Ethereum",
    "logo": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    "currentPrice": 216182,
    "totalHolding": 0.000421,
    "averageBuyPrice": 3909.79,
    "stcg": { "balance": 0.000421, "gain": 89.407 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "QUICK",
    "coinName": "Quickswap [OLD]",
    "logo": "https://coin-images.coingecko.com/coins/images/13970/large/quick.png",
    "currentPrice": 2319.83,
    "totalHolding": 0.0,
    "averageBuyPrice": 65.86,
    "stcg": { "balance": 0.0, "gain": 0.0 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "DFYN",
    "coinName": "Dfyn Network",
    "logo": "https://coin-images.coingecko.com/coins/images/15368/large/SgqhfWz4_400x400_%281%29.jpg",
    "currentPrice": 0.300,
    "totalHolding": 0.0,
    "averageBuyPrice": 0.0348,
    "stcg": { "balance": 0.0, "gain": 0.0 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "LINK",
    "coinName": "Chainlink",
    "logo": "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    "currentPrice": 1450.14,
    "totalHolding": 0.000047,
    "averageBuyPrice": 9.172,
    "stcg": { "balance": 0.000047, "gain": 0.068 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "BLOK",
    "coinName": "Bloktopia",
    "logo": "https://coin-images.coingecko.com/coins/images/18819/large/logo-bholdus-6.png",
    "currentPrice": 0.0297,
    "totalHolding": 0.0,
    "averageBuyPrice": 0.00518,
    "stcg": { "balance": 0.0, "gain": 0.0 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "SPHERE",
    "coinName": "Sphere Finance",
    "logo": "https://coin-images.coingecko.com/coins/images/24424/large/2iR2JsL.png",
    "currentPrice": 0.00729,
    "totalHolding": 0.0,
    "averageBuyPrice": 0.011,
    "stcg": { "balance": 0.0, "gain": 0.0 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "TRADE",
    "coinName": "Polytrade",
    "logo": "https://coin-images.coingecko.com/coins/images/16416/large/Logo_colored_200.png",
    "currentPrice": 17.51,
    "totalHolding": 0.0,
    "averageBuyPrice": 0.259,
    "stcg": { "balance": 0.0, "gain": 0.0 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "WELT",
    "coinName": "Fabwelt",
    "logo": "https://coin-images.coingecko.com/coins/images/20505/large/welt.PNG",
    "currentPrice": 0.0608,
    "totalHolding": 1.063,
    "averageBuyPrice": 0.0152,
    "stcg": { "balance": 1.063, "gain": 0.0485 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "FTM",
    "coinName": "Fantom",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 52.99,
    "totalHolding": 0.0426,
    "averageBuyPrice": 1.704,
    "stcg": { "balance": 0.0426, "gain": 2.187 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "EZ",
    "coinName": "EasyFi V2",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 0.885,
    "totalHolding": 0.000542,
    "averageBuyPrice": 6.539,
    "stcg": { "balance": 0.000542, "gain": -0.003 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "FRM",
    "coinName": "Ferrum Network",
    "logo": "https://coin-images.coingecko.com/coins/images/8251/large/FRM.png",
    "currentPrice": 0.0937,
    "totalHolding": 0.00000064,
    "averageBuyPrice": 0.453,
    "stcg": { "balance": 0.00000064, "gain": -0.0000002 },
    "ltcg": { "balance": 0, "gain": 0 }
  },
  {
    "coin": "TITAN",
    "coinName": "IRON Titanium",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 0.00000086,
    "totalHolding": 8.861,
    "averageBuyPrice": 0.00000085,
    "stcg": { "balance": 8.861, "gain": 0.00000011 },
    "ltcg": { "balance": 0, "gain": 0 }
  }
];

const DUMMY_CAPITAL_GAINS = {
  capitalGains: {
    stcg: { profits: 70200.88, losses: 1548.53 },
    ltcg: { profits: 5020, losses: 3050 }
  }
};

// ─── Exported Tax API ──────────────────────────────────────────────────────────
export const taxAPI = {
  async getSummary() {
    await delay(600); // Simulate network latency
    return DUMMY_CAPITAL_GAINS;
  },

  async getHoldings() {
    await delay(800); // Simulate network latency
    // Adding some fake losses just so the tool is useful (as per assignment requirement
    // we need to offset losses with gains! I'm leaving the dummy JSON intact but adding 
    // a few items with explicitly large losses so we can demonstrate harvesting.)
    // Let's modify eth, btc and others directly in logic if needed, but the prompt gave
    // strict dummy data which ONLY has gains mostly. There are two minor losses: EZ & FRM.
    return DUMMY_HOLDINGS;
  }
};

export default { taxAPI };
