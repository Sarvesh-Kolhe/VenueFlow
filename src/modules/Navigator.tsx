import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'motion/react';
import { Navigation, Clock, Users, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const SmartFlowNavigator: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [selectedRoute, setSelectedRoute] = useState<{from: string, to: string, saving: string} | null>(null);

    const REROUTES = [
        { from: "Gate 4", to: "Gate 7", saving: "8 mins", reason: "Blockage at Entrance 4" },
        { from: "Food Court", to: "Level 2 Eats", saving: "12 mins", reason: "Heavy Queue Density" },
        { from: "Section 104", to: "North Exit", saving: "15 mins", reason: "Post-match Surge" },
        { from: "Sky Lounge", to: "VIP Parking", saving: "6 mins", reason: "Elevator Service" }
    ];

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 600;
        
        const points = d3.range(50).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            value: Math.random()
        }));

        svg.selectAll('*').remove();

        // Heatmap colors aligned with theme green/dark
        const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, 1]);

        svg.selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 50)
            .attr('fill', d => colorScale(d.value))
            .attr('fill-opacity', 0.15)
            .attr('filter', 'blur(20px)');

        // Map Boundary
        svg.append('path')
            .attr('d', `M50,50 L750,50 L750,550 L50,550 Z`)
            .attr('fill', 'none')
            .attr('stroke', '#27272a')
            .attr('stroke-width', 2);

        const line = d3.line<[number, number]>().curve(d3.curveBasis);
        
        let pathData: [number, number][] = [[100, 500], [200, 350], [400, 250], [700, 100]];
        if (selectedRoute?.from === "Food Court") {
             pathData = [[700, 500], [500, 300], [300, 200], [100, 100]];
        }
        
        svg.append('path')
            .attr('d', line(pathData)!)
            .attr('fill', 'none')
            .attr('stroke', '#22c55e')
            .attr('stroke-width', 4)
            .attr('stroke-dasharray', '12,6')
            .append('animate')
            .attr('attributeName', 'stroke-dashoffset')
            .attr('from', '100')
            .attr('to', '0')
            .attr('dur', '4s')
            .attr('repeatCount', 'indefinite');

    }, [selectedRoute]);

    return (
        <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto bg-stadium-black min-h-screen">
             <header className="flex justify-between items-end border-b border-stadium-border pb-8">
                <div>
                     <h2 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">SmartFlow<span className="text-electric-green"> Nav</span></h2>
                    <p className="text-xs lg:text-sm text-text-secondary font-bold uppercase tracking-[0.3em] mt-2">Live Multi-Sector Crowd Heatmap • Operational Optimization</p>
                </div>
                <div className="hidden lg:flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Global Density</p>
                        <p className="text-2xl font-black text-white italic">42% <span className="text-electric-green text-sm not-italic uppercase">Stable</span></p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Heatmap Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-stadium-card border border-stadium-border rounded-[32px] overflow-hidden relative shadow-2xl group min-h-[500px] lg:min-h-[600px]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-transparent pointer-events-none" />
                        <svg ref={svgRef} viewBox="0 0 800 600" className="w-full h-full relative z-10 opacity-90" />
                        
                        <div className="absolute top-8 left-8 z-20 space-y-3">
                            <div className="bg-black/60 backdrop-blur-md border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                                <span className="w-2 h-2 bg-electric-green rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Telemetry Active</span>
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 z-20">
                            <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-[24px] flex items-center justify-between shadow-2xl border-l-4 border-l-electric-green">
                                <div>
                                    <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em] block mb-1">Active Optimized Route</span>
                                    <span className="font-black text-xl lg:text-2xl text-white tracking-tight uppercase italic">{selectedRoute ? `${selectedRoute.from} TO ${selectedRoute.to}` : "Main Access Gate 7"}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                     <div className="text-right">
                                        <p className="text-[10px] text-zinc-500 font-black uppercase">Latency</p>
                                        <p className="text-lg font-black text-electric-green italic uppercase">-{selectedRoute ? selectedRoute.saving : "4M"}</p>
                                     </div>
                                     <Navigation className="text-electric-green" size={32} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Concours', val: '94%', sub: 'DENSE', color: 'text-red-500' },
                            { label: 'North Exit', val: '12%', sub: 'CLEAR', color: 'text-electric-green' },
                            { label: 'Food Court', val: '68%', sub: 'BUSY', color: 'text-yellow-500' },
                            { label: 'Skybridge', val: '05%', sub: 'OPEN', color: 'text-electric-green' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-stadium-card border border-stadium-border p-5 rounded-2xl flex flex-col justify-between">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</span>
                                <div className="mt-2">
                                    <span className="text-2xl font-black text-white italic">{stat.val}</span>
                                    <p className={cn("text-[10px] font-black uppercase tracking-widest mt-1", stat.color)}>{stat.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rerouting Stack */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-2 mb-2">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Routing Directives</h3>
                        {selectedRoute && (
                            <button 
                                onClick={() => setSelectedRoute(null)} 
                                className="text-[10px] font-black text-electric-green uppercase tracking-widest border-b border-electric-green/30 pb-0.5 hover:border-electric-green transition-all"
                            >
                                Reset Analysis
                            </button>
                        )}
                    </div>
                    <div className="space-y-3">
                        {REROUTES.map((item, idx) => (
                            <motion.button 
                                key={idx}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedRoute(item)}
                                className={cn(
                                    "w-full text-left bg-stadium-card border p-6 rounded-[24px] flex flex-col shadow-md transition-all duration-300 relative overflow-hidden",
                                    selectedRoute?.from === item.from 
                                        ? "border-electric-green bg-electric-green/[0.03] ring-1 ring-electric-green/20" 
                                        : "border-stadium-border hover:border-white/10"
                                )}
                            >
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors font-black text-xs",
                                            selectedRoute?.from === item.from ? "bg-electric-green text-black" : "bg-black/40 text-electric-green"
                                        )}>
                                            {idx + 1}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-sm text-white tracking-tight uppercase italic">{item.from}</span>
                                            <ArrowRight size={14} className="text-electric-green" />
                                            <span className="text-electric-green font-black text-sm tracking-tight uppercase italic">{item.to}</span>
                                        </div>
                                    </div>
                                    <div className="bg-electric-green/10 px-3 py-1 rounded-full">
                                        <span className="text-[10px] font-black text-electric-green uppercase">-{item.saving}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed relative z-10">
                                    {item.reason} — Dynamic rerouting advised based on real-time flow saturation sensors.
                                </p>
                                {selectedRoute?.from === item.from && (
                                    <div className="absolute right-0 bottom-0 top-0 w-1 bg-electric-green" />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Operational Insights */}
                    <div className="bg-electric-green/5 border border-electric-green/10 p-6 rounded-[24px] mt-6">
                        <div className="flex items-center gap-3 mb-4 text-electric-green">
                            <Clock size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">Time Efficiency Insight</span>
                        </div>
                        <p className="text-sm text-white font-medium leading-relaxed italic">
                            "By utilizing Gate 7, your path avoids the 800-person bottleneck currently forming at the South Plaza."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
