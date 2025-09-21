# Agent Code Skill Example – CryptoMarket Assistant

## Overview
This example demonstrates how to build a simple AI agent using the SmythOS SDK that can fetch real-time cryptocurrency prices.  
The agent is called **CryptoMarket Assistant**. It uses a custom skill (`MarketData`) to get live market data for a specific coin from the **CoinGecko API**.  

It also shows two ways to interact with the agent:
1. **Prompting the agent** in natural language (e.g., "What are the current prices of Bitcoin and Ethereum?")  
2. **Calling the skill directly** with parameters (e.g., passing `{ coin_id: 'bitcoin' }`)  

## Files
- `index.js` → The main script that defines the CryptoMarket Assistant, adds the MarketData skill, and demonstrates how to run the agent.  

## How to Use
1. Clone the SmythOS examples repository (or open it in your environment).  
2. Navigate to this folder:
   ```bash
   cd examples/01-agent-code-skill
