import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText, Clock, Users, BarChart2 } from 'lucide-react';

interface Strategy {
  id: number;
  title: string;
  date: string;
  description: string;
  sharpeRatio: number;
  period: string;
  frequency: string;
  assetClass: string;
  chartImage: string;
}

const tradingStrategies: Strategy[] = [
  {
    id: 1,
    title: "Momentum Strategies",
    date: "August 15, 1996",
    description: "This strategy shows significant intermediate-horizon return continuation in stocks, showing that stocks with high returns over the past 3 to 5 years continue to perform well in the future, yielding about 1% per month for the following year.",
    sharpeRatio: 1.45,
    period: "1990 - 2023",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Value and Momentum Everywhere",
    date: "June 21, 2013",
    description: "This strategy finds consistent value and momentum return premia across eight diverse markets and asset classes, with negative correlation between value and momentum strategies within and across asset classes, making a combined value/momentum portfolio produce high risk-adjusted returns.",
    sharpeRatio: 1.65,
    period: "1995 - 2022",
    frequency: "Monthly",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Fundamental Analysis, Future Earnings, and Stock Prices",
    date: "May 2, 2002",
    description: "A fundamental analysis strategy using a set of financial statement variables generates an annual return of 7.3%, even after controlling for known risk factors. The returns are particularly strong for small and medium-size firms.",
    sharpeRatio: 1.22,
    period: "1991 - 2021",
    frequency: "Quarterly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Time-Series Momentum",
    date: "May 14, 2012",
    description: "This strategy shows that a simple time-series momentum approach produces strong returns across asset classes. The strategy goes long assets that have had positive returns over the last 12 months and short those with negative returns, realizing near-zero correlation with conventional asset classes.",
    sharpeRatio: 1.76,
    period: "1990 - 2023",
    frequency: "Monthly",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Trend-Following in Financial Markets",
    date: "October 25, 2014",
    description: "This strategy demonstrates that trend-following approach generate significant positive returns across diverse asset classes over the last century, performing best during extreme market environments.",
    sharpeRatio: 1.29,
    period: "1990 - 2022",
    frequency: "Daily",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Commodity Momentum and Basis",
    date: "September 17, 2012",
    description: "This strategy shows that combining futures basis and past price performance (momentum) leads to significant commodity strategy returns, finding evidence of 'backwardation' as a partial explanation for commodity risk premiums.",
    sharpeRatio: 1.32,
    period: "1995 - 2022",
    frequency: "Monthly",
    assetClass: "Commodities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 7,
    title: "Tactical Value of Commodity Futures",
    date: "March 2, 2006",
    description: "This strategy exploits the persistent risk premium in commodity futures, which exhibits low correlation with equity markets. By systematically capturing this premium, the strategy enhances portfolio diversification and improves risk-adjusted returns when combined with traditional stock and bond exposures.",
    sharpeRatio: 1.19,
    period: "1990 - 2023",
    frequency: "Monthly",
    assetClass: "Commodities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 8,
    title: "Quality Minus Junk",
    date: "October 29, 2013",
    description: "This strategy systematically goes long high-quality stocks—characterized by profitability, stable growth, and lower risk—and shorts low-quality counterparts. By capturing the quality premium, the strategy aims to achieve superior risk-adjusted returns consistently across different markets.",
    sharpeRatio: 1.53,
    period: "1990 - 2025",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 9,
    title: "Momentum in International Stock Returns",
    date: "June 15, 2011",
    description: "This multi-factor strategy leverages persistent anomalies observed in global equity markets. It captures the value premium—particularly strong among small-cap stocks—and exploits momentum effects, which tend to diminish with firm size. The strategy provides return streams that are largely unexplained by traditional market risk factors.",
    sharpeRatio: 1.36,
    period: "1990 - 2021",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 10,
    title: "Options Trading Activity and Stock Price Behavior",
    date: "April 22, 2004",
    description: "This strategy capitalizes on the predictive power of options trading volume, identifying stocks with abnormal options activity as signals of future price movements. By systematically incorporating options volume into the trading process, the strategy aims to generate consistent abnormal returns.",
    sharpeRatio: 1.27,
    period: "1996 - 2022",
    frequency: "Daily",
    assetClass: "Options",
    chartImage: "/placeholder.svg"
  },
  {
    id: 11,
    title: "Volatility-Managed Portfolios",
    date: "December 3, 2016",
    description: "This strategy dynamically scales exposure to equity factors—such as momentum, value, and profitability—based on recent realized volatility. By inversely adjusting position sizes to volatility, the strategy reduces overall risk while significantly enhancing the Sharpe ratio and improving risk-adjusted performance.",
    sharpeRatio: 1.48,
    period: "1990 - 2023",
    frequency: "Daily",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 12,
    title: "FX Carry Trade",
    date: "July 10, 2006",
    description: "This strategy exploits interest rate differentials across currencies by systematically going long high-yielding currencies and shorting low-yielding ones. Historically, the FX carry trade has delivered positive excess returns, especially during periods of low market volatility.",
    sharpeRatio: 1.25,
    period: "1995 - 2023",
    frequency: "Daily",
    assetClass: "FX",
    chartImage: "/placeholder.svg"
  },
  {
    id: 13,
    title: "FX Momentum Strategy",
    date: "March 5, 2003",
    description: "This strategy captures momentum effects in the FX market by going long currencies with strong recent performance and shorting those with weak performance. Empirical evidence shows that FX momentum yields significant abnormal returns, especially when combined with trend-following techniques.",
    sharpeRatio: 1.40,
    period: "1992 - 2023",
    frequency: "Daily",
    assetClass: "FX",
    chartImage: "/placeholder.svg"
  },
  {
    id: 14,
    title: "FX Statistical Arbitrage (Pair Trading)",
    date: "November 12, 2009",
    description: "This strategy identifies co-integrated or highly correlated currency pairs and exploits short-term deviations from their equilibrium relationship. By simultaneously going long the undervalued currency and short the overvalued one, the strategy profits as prices revert to their mean, generating stable and market-neutral returns.",
    sharpeRatio: 1.35,
    period: "2000 - 2023",
    frequency: "Daily",
    assetClass: "FX",
    chartImage: "/placeholder.svg"
  }

];

const StrategyCard = ({ strategy }: { strategy: Strategy }) => (
  <div className="glass-card p-6 rounded-xl hover:shadow-glow-lime transition-all duration-300">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <div className="aspect-[4/3] bg-signaledge-card/50 rounded-lg overflow-hidden">
          <img src={strategy.chartImage} alt={strategy.title} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-1 text-white">{strategy.title}</h2>
        <p className="text-signaledge-gray-light text-sm mb-3">{strategy.date}</p>
        <p className="text-signaledge-gray-light mb-4">{strategy.description}</p>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-3 mb-2">
            <div className="inline-flex items-center px-3 py-1 bg-signaledge-card/80 rounded-full text-sm text-signaledge-gray-light">
              <Clock size={14} className="mr-1 text-signaledge-lime" /> {strategy.frequency}
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-signaledge-card/80 rounded-full text-sm text-signaledge-gray-light">
              <Users size={14} className="mr-1 text-signaledge-lime" /> {strategy.assetClass}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-signaledge-card p-3 rounded-lg mr-4 flex items-center justify-center">
              <BarChart2 size={20} className="text-signaledge-lime" />
            </div>
            <div>
              <div className="text-signaledge-gray-light text-sm">Sharpe Ratio</div>
              <div className="text-white font-bold text-xl">{strategy.sharpeRatio}</div>
            </div>
            <div className="ml-10">
              <div className="text-signaledge-gray-light text-sm">Period</div>
              <div className="text-white font-semibold">{strategy.period}</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-2">
            <button className="bg-signaledge-lime hover:bg-signaledge-lime-hover text-black font-medium px-4 py-2 rounded-lg flex items-center transition-colors">
              <FileText size={18} className="mr-2" /> VIEW PAPER
            </button>
            <button className="border border-signaledge-lime text-signaledge-lime hover:bg-signaledge-lime/10 font-medium px-4 py-2 rounded-lg flex items-center transition-colors">
              <BarChart2 size={18} className="mr-2" /> BACKTEST
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TradingStrategies = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-signaledge-background transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <main className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Trending <span className="text-gradient">Trading Strategies</span>
          </h1>
          <p className="text-signaledge-gray-light max-w-3xl mb-16">
            Explore our collection of research-backed trading strategies with proven performance across different asset classes and time periods.
          </p>
          
          <div className="space-y-8">
            {tradingStrategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TradingStrategies;

