import { ArrowLeft } from 'lucide-react';
import { cn } from '../../ui/utils';

interface UpdatePageHeroStat {
  label: string;
  value: string;
  helper?: string;
}

interface UpdatePageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  stats: UpdatePageHeroStat[];
  gradientFrom: string;
  gradientTo: string;
  accent?: string;
  onNavigateHome: () => void;
}

export function UpdatePageHero({
  eyebrow,
  title,
  description,
  stats,
  gradientFrom,
  gradientTo,
  accent = 'text-white/70',
  onNavigateHome,
}: UpdatePageHeroProps) {
  return (
    <div className={cn('relative isolate overflow-hidden text-white py-12 sm:py-16 lg:py-20', `bg-gradient-to-br ${gradientFrom} ${gradientTo}`)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)] opacity-60" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-white/10 blur-3xl opacity-70" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 box-border">
        <button
          type="button"
          onClick={onNavigateHome}
          className="group inline-flex items-center gap-2 text-white/80 transition-all duration-300 hover:text-white hover:gap-3"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm sm:text-base">Back to Latest Updates</span>
        </button>

        <div className="space-y-4 mt-6 sm:mt-8">
          <p className={cn('uppercase tracking-[0.15em] text-xs sm:text-sm font-medium', accent)}>{eyebrow}</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-4xl">{title}</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">{description}</p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <p className="text-xs font-semibold tracking-wide uppercase text-white/70 mb-2">{stat.label}</p>
              <p className="text-lg sm:text-xl font-bold text-white">{stat.value}</p>
              {stat.helper && <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">{stat.helper}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
