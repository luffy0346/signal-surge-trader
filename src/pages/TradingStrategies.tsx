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
    title: "Betting Against Beta",
    date: "May 10, 2013",
    description: "The study presents a model of varying leverage and margin constraints, confirming five predictions: high beta leads to low alpha, a betting against beta (BAB) strategy yields positive returns, tighter funding constraints reduce BAB returns, liquidity risk compresses betas, and constrained investors hold riskier assets.",
    sharpeRatio: 1.31,
    period: "1990 - 2025",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/lovable-uploads/5be3d1c2-6783-434c-bdde-7fe20475f9e1.png"
  },
  {
    id: 2,
    title: "Pairs Trading: Performance of a Relative Value Arbitrage Rule",
    date: "December 28, 1998",
    description: "Pairs trading, tested over 1962-2002, yields average annualized excess returns up to 11%, surpassing transaction costs and indicating profits from temporary mis-pricing linked to a unique common factor in returns.",
    sharpeRatio: 1.30,
    period: "1990 - 2025",
    frequency: "Daily",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Momentum Strategies",
    date: "August 15, 1996",
    description: "This paper documents significant intermediate-horizon return continuation in stocks, showing that stocks with high returns over the past 3 to 12 months continue to perform well in the future, yielding about 1% per month for the following year.",
    sharpeRatio: 1.45,
    period: "1990 - 2023",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Value and Momentum Everywhere",
    date: "June 21, 2013",
    description: "The paper finds consistent value and momentum return premia across eight diverse markets and asset classes, with negative correlation between value and momentum strategies within and across asset classes, making a combined value/momentum portfolio produce high risk-adjusted returns.",
    sharpeRatio: 1.65,
    period: "1995 - 2022",
    frequency: "Monthly",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 5,
    title: "The Cross-Section of Volatility and Expected Returns",
    date: "January 15, 2006",
    description: "Using data from 1963 to 2002, this study found stocks with high idiosyncratic volatility have low average returns, contradicting typical models. This effect is stronger for small stocks and remains robust across different time periods and markets.",
    sharpeRatio: 1.28,
    period: "1990 - 2025",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 6,
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
    id: 7,
    title: "Time-Series Momentum",
    date: "May 14, 2012",
    description: "We document that a simple time-series momentum strategy produces strong returns across asset classes. The strategy goes long assets that have had positive returns over the last 12 months and short those with negative returns, realizing near-zero correlation with conventional asset classes.",
    sharpeRatio: 1.76,
    period: "1990 - 2023",
    frequency: "Monthly",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 8,
    title: "The Term Structure of Variance Risk Premium",
    date: "July 20, 2015",
    description: "This paper studies the term structure of variance risk premium, finding that it is negative for short horizons and becomes positive for longer horizons. Strategies exploiting this structure yield significant alpha over traditional risk factors.",
    sharpeRatio: 1.15,
    period: "2000 - 2022",
    frequency: "Daily",
    assetClass: "Options",
    chartImage: "/placeholder.svg"
  },
  {
    id: 9,
    title: "Global Factor Premiums",
    date: "March 15, 2019",
    description: "This study establishes global evidence for six factor premiums: value, momentum, carry, seasonality, low risk, and quality, across four major asset classes. The factors show consistent performance both in the cross-section and time-series dimensions.",
    sharpeRatio: 1.42,
    period: "1990 - 2024",
    frequency: "Monthly",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 10,
    title: "Currency Carry Trade Regimes",
    date: "April 28, 2011",
    description: "This paper identifies two distinct regimes for currency carry trades with different risk-return properties. High interest rate currencies deliver higher returns with crash risk in normal times, but underperform with heavy losses during market distress periods.",
    sharpeRatio: 1.25,
    period: "1996 - 2020",
    frequency: "Daily",
    assetClass: "Currencies",
    chartImage: "/placeholder.svg"
  },
  {
    id: 11,
    title: "Dissecting Investment Strategies in the Cross Section and Time Series",
    date: "September 10, 2017",
    description: "This paper explores dynamic investment strategies, showing that value, momentum, and trend strategies deliver strong performance across asset classes, especially when applied in a diversified manner.",
    sharpeRatio: 1.35,
    period: "1995 - 2023",
    frequency: "Weekly",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 12,
    title: "Trend-Following in Financial Markets",
    date: "October 25, 2014",
    description: "This paper demonstrates that trend-following strategies generate significant positive returns across diverse asset classes over the last century, performing best during extreme market environments.",
    sharpeRatio: 1.29,
    period: "1990 - 2022",
    frequency: "Daily",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 13,
    title: "Value and Profitability in the Cross-Section of Returns",
    date: "June 5, 2013",
    description: "This study finds that profitability, like book-to-market, has power to predict the cross-section of average stock returns, and a four-factor model including market, size, value, and profitability factors captures much of the cross-section of returns.",
    sharpeRatio: 1.38,
    period: "1990 - 2020",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 14,
    title: "Commodity Momentum and Basis",
    date: "September 17, 2012",
    description: "This research shows that combining futures basis and past price performance (momentum) leads to significant commodity strategy returns, finding evidence of 'backwardation' as a partial explanation for commodity risk premiums.",
    sharpeRatio: 1.32,
    period: "1995 - 2022",
    frequency: "Monthly",
    assetClass: "Commodities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 15,
    title: "The Strategic and Tactical Value of Commodity Futures",
    date: "March 2, 2006",
    description: "This paper shows that commodity futures have a risk premium that is largely independent of equity market returns, providing significant diversification benefits when added to a traditional portfolio of stocks and bonds.",
    sharpeRatio: 1.19,
    period: "1990 - 2023",
    frequency: "Monthly",
    assetClass: "Commodities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 16,
    title: "Quality Minus Junk",
    date: "October 29, 2013",
    description: "This paper shows that high-quality stocks—those that are profitable, growing, and safer—deliver high risk-adjusted returns. A quality-minus-junk (QMJ) factor that goes long high-quality stocks and shorts low-quality stocks earns significant returns across markets.",
    sharpeRatio: 1.53,
    period: "1990 - 2025",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 17,
    title: "Carry and Trend in Lots of Places",
    date: "February 8, 2018",
    description: "This research documents the returns to carry and trend strategies across diverse asset classes, showing that these strategies generate strong risk-adjusted returns when implemented in a consistent manner.",
    sharpeRatio: 1.41,
    period: "1992 - 2022",
    frequency: "Monthly",
    assetClass: "Multi-asset",
    chartImage: "/placeholder.svg"
  },
  {
    id: 18,
    title: "Size, Value, and Momentum in International Stock Returns",
    date: "June 15, 2011",
    description: "This study finds consistent size, value, and momentum returns in international stock markets, with value premiums larger for small stocks while momentum returns decrease with firm size, and a global market risk factor insufficient to explain average returns.",
    sharpeRatio: 1.36,
    period: "1990 - 2021",
    frequency: "Monthly",
    assetClass: "Equities",
    chartImage: "/placeholder.svg"
  },
  {
    id: 19,
    title: "Options Trading Activity and Stock Price Behavior",
    date: "April 22, 2004",
    description: "This paper finds that options trading volume contains information about future stock price movements, with a strategy based on options volume signals generating significant abnormal returns.",
    sharpeRatio: 1.27,
    period: "1996 - 2022",
    frequency: "Daily",
    assetClass: "Options",
    chartImage: "/placeholder.svg"
  },
  {
    id: 20,
    title: "Volatility-Managed Portfolios",
    date: "December 3, 2016",
    description: "This paper shows that scaling a strategy by the inverse of its recent past volatility reduces its volatility by about a third while significantly improving its Sharpe ratio. This approach works well for equity factors like momentum, value, and profitability.",
    sharpeRatio: 1.48,
    period: "1990 - 2023",
    frequency: "Daily",
    assetClass: "Multi-asset",
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

