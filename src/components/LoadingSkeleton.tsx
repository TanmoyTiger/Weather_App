import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Hero Skeleton */}
      <div className="w-full h-80 rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 p-8 flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-300 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-32 bg-slate-300/80 dark:bg-slate-700/80 rounded-md" />
          </div>
          <div className="h-6 w-28 bg-slate-300/80 dark:bg-slate-700/80 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="space-y-3">
            <div className="h-16 w-36 bg-slate-300 dark:bg-slate-700 rounded-xl" />
            <div className="h-5 w-48 bg-slate-300/80 dark:bg-slate-700/80 rounded-md" />
          </div>
          <div className="flex justify-end">
            <div className="h-24 w-32 bg-slate-300 dark:bg-slate-700 rounded-2xl" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-slate-300/60 dark:bg-slate-700/60 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl p-4 space-y-3">
            <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
            <div className="h-8 w-20 bg-slate-300 dark:bg-slate-700 rounded" />
            <div className="h-2 w-full bg-slate-300/60 dark:bg-slate-700/60 rounded-full" />
          </div>
        ))}
      </div>

      {/* Forecast Row Skeleton */}
      <div className="h-40 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl p-4" />
    </div>
  );
};
