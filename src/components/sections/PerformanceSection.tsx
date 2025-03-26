
import React, { useEffect, useRef } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Play } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const performanceData = [
  { month: 'Jan', roi: 2.8 },
  { month: 'Feb', roi: 3.2 },
  { month: 'Mar', roi: 3.7 },
  { month: 'Apr', roi: 3.1 },
  { month: 'May', roi: 4.2 },
  { month: 'Jun', roi: 3.6 },
  { month: 'Jul', roi: 3.9 },
  { month: 'Aug', roi: 3.5 },
  { month: 'Sep', roi: 3.3 },
  { month: 'Oct', roi: 3.8 },
  { month: 'Nov', roi: 3.4 },
  { month: 'Dec', roi: 3.2 },
];

interface MetricCardProps {
  icon: string;
  title: string;
  value: string;
  delay: number;
}

const MetricCard = ({ icon, title, value, delay }: MetricCardProps) => (
  <div 
    className="opacity-0 translate-y-10 transition-all duration-700 metric-card"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Card className="glass-card h-full hover:shadow-glow-lime transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl mb-2 text-signaledge-lime">{icon}</div>
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-signaledge-lime">{value}</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const VideoCard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const playVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  
  return (
    <div className="opacity-0 translate-y-10 transition-all duration-700 metric-card" 
      style={{ transitionDelay: '700ms' }}>
      <div className="rounded-xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-signaledge-lime/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div 
            onClick={playVideo} 
            className="w-16 h-16 rounded-full bg-signaledge-lime/90 flex items-center justify-center cursor-pointer group-hover:bg-signaledge-lime transition-colors"
          >
            <Play size={32} fill="black" className="ml-1" />
          </div>
        </div>
        <video 
          ref={videoRef}
          className="rounded-xl w-full h-full object-cover" 
          poster="/placeholder.svg" 
          muted
          loop
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stock-trading-monitor-with-animated-charts-34557-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const PerformanceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.metric-card');
            elements.forEach(el => {
              el.classList.add('opacity-100');
              el.classList.remove('opacity-0', 'translate-y-10');
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const chartConfig = {
    roi: {
      label: 'ROI',
      color: '#a3e635', // Using the signaledge-lime color
    },
  };
  
  return (
    <section className="py-24 px-6 bg-signaledge-section">
      <div className="section-container" ref={sectionRef}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Historical <span className="text-gradient">Performance</span>
        </h2>
        <p className="text-signaledge-gray-light text-center max-w-2xl mx-auto mb-16">
          Our proven trading signals consistently deliver exceptional results
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          <MetricCard 
            icon="🔹" 
            title="Avg. Monthly ROI" 
            value="3.5%" 
            delay={100} 
          />
          <MetricCard 
            icon="🔹" 
            title="Win Rate" 
            value="58%" 
            delay={200} 
          />
          <MetricCard 
            icon="🔹" 
            title="Sharpe Ratio" 
            value="2.1" 
            delay={300} 
          />
          <MetricCard 
            icon="🔹" 
            title="Maximum Drawdown" 
            value="5.27%" 
            delay={400} 
          />
          <MetricCard 
            icon="🔹" 
            title="Trade Frequency" 
            value="~3,500/month" 
            delay={500} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-xl mb-4 opacity-0 translate-y-10 transition-all duration-700 metric-card" style={{ transitionDelay: '600ms' }}>
            <h3 className="text-xl font-semibold mb-4 text-center">Monthly ROI Performance</h3>
            <div className="h-[250px] w-full">
              <ChartContainer className="h-full" config={chartConfig}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a3e635" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fill: '#9ca3af' }} />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: '#9ca3af' }}
                    domain={[0, 5]}
                  />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-signaledge-card p-2 border border-muted rounded-md">
                            <p className="text-sm">{`${label}: ${payload[0].value}%`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="roi" 
                    stroke="#a3e635" 
                    fillOpacity={1} 
                    fill="url(#roiGradient)" 
                    name="roi"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
          
          <VideoCard />
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
