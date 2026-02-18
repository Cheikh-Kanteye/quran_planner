export default function JuzLoading() {
  return (
    <main className="min-h-screen bg-teal-900 text-teal-50">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 bg-teal-950/95 border-b border-teal-800 px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="h-4 w-16 bg-teal-800 rounded animate-pulse" />
        <div className="h-4 w-px bg-teal-700" />
        <div className="flex-1">
          <div className="h-4 w-20 bg-teal-800 rounded animate-pulse mb-1" />
          <div className="h-3 w-32 bg-teal-800/60 rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-20 bg-teal-800 rounded-lg animate-pulse" />
          <div className="h-7 w-20 bg-teal-800 rounded-lg animate-pulse" />
        </div>
      </header>

      {/* Overview skeleton */}
      <div className="bg-teal-800 border-b border-teal-700 px-4 sm:px-8 py-4 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-3 w-12 bg-teal-700 rounded animate-pulse mb-1" />
              <div className="h-5 w-16 bg-teal-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="mt-3 h-2 bg-teal-900 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-teal-700 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        {/* Surah header skeleton */}
        <div className="bg-teal-950 border border-teal-700 rounded-2xl p-6 text-center space-y-3">
          <div className="h-8 w-48 bg-teal-800 rounded animate-pulse mx-auto" />
          <div className="h-5 w-32 bg-teal-800/70 rounded animate-pulse mx-auto" />
          <div className="h-4 w-24 bg-teal-800/50 rounded animate-pulse mx-auto" />
        </div>

        {/* Ayahs skeleton */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border-b border-teal-800/60 py-5">
            <div className="flex justify-end mb-3 gap-3">
              <div className="h-8 w-8 bg-teal-800 rounded-full animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div
                  className="h-6 bg-teal-800 rounded animate-pulse"
                  style={{ width: `${70 + Math.random() * 25}%` }}
                />
                <div
                  className="h-6 bg-teal-800/70 rounded animate-pulse ml-auto"
                  style={{ width: `${50 + Math.random() * 30}%` }}
                />
              </div>
            </div>
            <div className="pl-11 space-y-1">
              <div
                className="h-4 bg-teal-800/50 rounded animate-pulse"
                style={{ width: `${60 + Math.random() * 35}%` }}
              />
              <div
                className="h-4 bg-teal-800/40 rounded animate-pulse"
                style={{ width: `${40 + Math.random() * 30}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Loading message */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-teal-950 border border-gold-700 text-gold-400 text-sm px-4 py-2 rounded-full shadow-xl animate-pulse">
        Chargement du Juz en cours…
      </div>
    </main>
  );
}
