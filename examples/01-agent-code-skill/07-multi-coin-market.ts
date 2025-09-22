import { Agent } from '@smythos/sdk';

async function main() {
    const agent = new Agent({
        id: 'crypto-market-assistant',
        name: 'CryptoMarket Assistant',
        behavior: 'You are a crypto price tracker. Given one or more coin IDs, fetch their current prices in USD and return them in a clean, readable format.',
        model: 'gpt-4o',
    });

    // Skill to fetch market data for a single coin
    agent.addSkill({
        name: 'MarketData',
        description: 'Fetch current price, market cap, and 24h change for a given cryptocurrency.',
        process: async ({ coin_id }: { coin_id: string }) => {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Coin not found');
                const data = await response.json();

                const price = data.market_data.current_price.usd;
                const change = data.market_data.price_change_percentage_24h.toFixed(2);
                const cap = data.market_data.market_cap.usd;

                return {
                    name: data.name,
                    symbol: data.symbol.toUpperCase(),
                    price: `$${price.toLocaleString()}`,
                    change: `${change}% (24h)`,
                    marketCap: `$${cap.toLocaleString()}`
                };
            } catch (err) {
                return { error: `Could not fetch data for ${coin_id}.` };
            }
        },
    });

    // Helper function for multiple coins
    async function getMultipleCoins(coins: string[]) {
        const results = [];
        for (const coin of coins) {
            const result = await agent.call('MarketData', { coin_id: coin });
            results.push(result);
        }

        // Format response
        return results.map(r =>
            'error' in r
                ? r.error
                : `${r.name} (${r.symbol}): ${r.price} | Market Cap: ${r.marketCap} | Change: ${r.change}`
        ).join('\n');
    }

    // Example usage
    const output = await getMultipleCoins(['bitcoin', 'ethereum', 'dogecoin']);
    console.log(output);
}

main();
