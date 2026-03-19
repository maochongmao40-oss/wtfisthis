import React from 'react';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const interests = [
    "vibe coding", "户外运动", "当代艺术", "techno 音乐", "赛博朋克2077", 
    "国际交换项目", "社交媒体", "城市探索", "爵士乐", "house music", 
    "长跑", "纪录片", "独立电影", "人类学", "LGBTQ+ 权利", "冥想"
  ];

  const infoGroups = [
    { label: "身份", content: "大学生" },
    { label: "正在做的事", content: "vibe coding（文科生，愿意尝试代码）、想学 Blender、探索 AI 与视觉结合" },
    { label: "擅长与关心的方向", content: "艺术设计、游戏设计、市场营销、平面设计" }
  ];

  return (
    <section className="p-6 md:p-24 bg-background border-b-4 border-foreground grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
      <div className="md:col-span-5 flex flex-col justify-center">
        <h2 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter mb-12 leading-[0.8] relative">
          关于我<br />About
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary -z-10" />
        </h2>
        <div className="space-y-12">
          {infoGroups.map((group, index) => (
            <div key={index} className="border-l-8 border-primary pl-8 py-2 hover:bg-secondary/50 transition-colors">
              <span className="block text-sm uppercase font-black text-muted-foreground mb-2 tracking-widest">
                {group.label}
              </span>
              <p className="text-xl md:text-3xl font-black leading-tight uppercase">
                {group.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-7 flex flex-col justify-center">
        <div className="bg-primary p-8 md:p-16 h-full border-4 border-foreground shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-background rotate-45 translate-x-1/2 -translate-y-1/2 border-l-4 border-foreground" />
          
          <h3 className="text-3xl md:text-5xl font-black uppercase mb-12 relative z-10 tracking-tight">
            兴趣标签 / INTERESTS
          </h3>
          
          <div className="flex flex-wrap gap-4 relative z-10">
            {interests.map((interest, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-background text-foreground border-4 border-foreground hover:bg-black hover:text-white px-6 py-3 text-lg md:text-xl font-black transition-all cursor-default uppercase rounded-none"
              >
                {interest}
              </Badge>
            ))}
          </div>

          {/* Decorative Swiss Grid */}
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 bg-grid-pattern bg-grid-size" />
        </div>
      </div>
    </section>
  );
};

export default About;
