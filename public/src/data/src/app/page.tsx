"use client";
import React, { useState } from 'react';
import { CLOSET_DATA } from '@/data/items';

export default function ClosetPage() {
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  // 切換選擇邏輯
  const toggle = (item: any) => {
    if (selected.find(i => i.id === item.id)) {
      setSelected(selected.filter(i => i.id !== item.id));
    } else if (selected.length < 3) {
      setSelected([...selected, item]);
    }
  };

  // 模擬 AI 點評邏輯
  const askAI = () => {
    setLoading(true);
    setTimeout(() => {
      const items = selected.map(i => i.name).join(' + ');
      const hasUq = selected.some(i => i.uq !== "N/A");
      
      let text = `【AI點評】：你選擇了 ${items}。`;
      if (hasUq) {
        text += " 運用 Uniqlo 單品穿出質感是高手的表現。";
      }
      text += " 這套層次感鮮明，建議搭配深色系鞋款來穩住視覺重心。";
      
      setComment(text);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 pb-40 text-black">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter">CLOSET.AI</h1>
        <p className="text-zinc-400 text-sm">數位衣櫥點評 Beta</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {CLOSET_DATA.map(item => (
          <div 
            key={item.id} 
            onClick={() => toggle(item)}
            className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer ${
              selected.find(i => i.id === item.id) 
              ? 'bg-black text-white border-black shadow-xl scale-95' 
              : 'bg-white border-transparent shadow-sm'
            }`}
          >
            <div className="text-[10px] opacity-40 uppercase font-bold tracking-widest mb-1">{item.style}</div>
            <div className="font-bold text-lg leading-tight">{item.name}</div>
            <div className="text-xs opacity-60 mt-2">{item.color}</div>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-lg border-t border-zinc-100 rounded-t-[3rem] shadow-2xl">
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {selected.map(i => (
              <span key={i.id} className="bg-zinc-100 px-3 py-1 rounded-full text-[10px] font-bold">
                {i.name}
              </span>
            ))}
          </div>
          <button 
            onClick={askAI} 
            disabled={loading}
            className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "分析中..." : "讓 AI 點評這套穿搭"}
          </button>
          {comment && (
            <div className="mt-4 p-5 bg-zinc-100 rounded-2xl text-sm leading-relaxed text-zinc-800 animate-in fade-in slide-in-from-bottom-2">
              {comment}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
