'use client';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ComparisonProps {
  original: string;
  compressed: string;
  className?: string;
}

export default function ComparisonSlider({ original, compressed, className }: ComparisonProps) {
  return (
    <div className={`rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg ${className}`}>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={original} alt="Original" />}
        itemTwo={<ReactCompareSliderImage src={compressed} alt="Compressed" />}
        position={50}
        style={{ height: '300px', width: '100%', objectFit: 'contain' }}
      />
      <div className="flex justify-between bg-slate-100 p-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
        <span>Original</span>
        <span>Compressed</span>
      </div>
    </div>
  );
}