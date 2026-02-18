'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { JuzData, AyahWithTranslation } from '@/lib/api';
import type { JuzInfo, Surah } from '@/lib/quran-data';

interface JuzViewerProps {
  juzNumber: number;
  juzInfo: JuzInfo;
  surahMeta: Record<
    number,
    Pick<Surah, 'nameArabic' | 'nameTranslit' | 'nameFrench' | 'ayahCount' | 'revelationType'>
  >;
}

function toArabicNumeral(n: number): string {
  return n
    .toString()
    .split('')
    .map((d) => '٠١٢٣٤٥٦٧٨٩'[Number.parseInt(d)])
    .join('');
}

function groupBySurah(ayahs: AyahWithTranslation[]): Map<number, AyahWithTranslation[]> {
  const map = new Map<number, AyahWithTranslation[]>();
  for (const ayah of ayahs) {
    if (!map.has(ayah.surahNumber)) map.set(ayah.surahNumber, []);
    map.get(ayah.surahNumber)!.push(ayah);
  }
  return map;
}

// ── Surah header ──────────────────────────────────────────────────────────────
function SurahHeader({
  surahNumber,
  meta,
  showBismillah,
}: {
  surahNumber: number;
  meta: JuzViewerProps['surahMeta'][number] | undefined;
  showBismillah: boolean;
}) {
  if (!meta) return null;
  return (
    <div className="bg-teal-950 border border-teal-700 rounded-2xl overflow-hidden mb-6">
      <div className="px-6 py-5 text-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gold-700/40" />
          <span className="text-gold-600 text-xs">✦</span>
          <div className="h-px flex-1 bg-gold-700/40" />
        </div>
        <p className="arabic-text text-3xl text-gold-400 font-bold mb-1" dir="rtl">
          {meta.nameArabic}
        </p>
        <p className="text-white font-semibold text-lg">{meta.nameTranslit}</p>
        <p className="text-teal-300 text-sm">{meta.nameFrench}</p>
        <div className="flex items-center justify-center gap-3 mt-3 text-xs text-teal-500">
          <span>Sourate {surahNumber}</span>
          <span>·</span>
          <span>{meta.ayahCount} versets</span>
          <span>·</span>
          <span>{meta.revelationType}</span>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="h-px flex-1 bg-gold-700/40" />
          <span className="text-gold-600 text-xs">✦</span>
          <div className="h-px flex-1 bg-gold-700/40" />
        </div>
      </div>
      {showBismillah && (
        <div className="bg-teal-900 border-t border-teal-800 px-6 py-4 text-center">
          <p className="arabic-text text-gold-300 text-2xl" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-teal-400 text-xs mt-1">
            Au nom d&apos;Allah, le Tout Miséricordieux, le Très Miséricordieux
          </p>
        </div>
      )}
    </div>
  );
}

// ── Single ayah ───────────────────────────────────────────────────────────────
function AyahRow({ ayah, idx }: { ayah: AyahWithTranslation; idx: number }) {
  return (
    <div
      className={`border-b border-teal-800/60 py-5 px-3 rounded-lg transition-colors hover:bg-teal-800/40 ${
        idx % 2 !== 0 ? 'bg-teal-800/20' : ''
      }`}
    >
      <div className="flex items-start gap-3 justify-end mb-3">
        <div className="order-first mt-1 shrink-0">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gold-700/50 text-gold-600 text-xs font-medium">
            {ayah.numberInSurah}
          </span>
        </div>
        <p
          className="arabic-text text-right text-teal-50 text-xl sm:text-2xl flex-1 leading-loose"
          dir="rtl"
          lang="ar"
        >
          {ayah.arabicText}{' '}
          <span className="text-gold-500 text-base">﴿{toArabicNumeral(ayah.numberInSurah)}﴾</span>
        </p>
      </div>
      <div className="pl-11">
        <p className="text-teal-200 text-sm leading-relaxed">
          <span className="text-teal-500 font-medium mr-1">{ayah.numberInSurah}.</span>
          {ayah.frenchText}
        </p>
      </div>
    </div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function ReadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Surah tab bar skeleton */}
      <div className="flex gap-2 overflow-hidden">
        {[80, 110, 70].map((w) => (
          <div
            key={w}
            className="h-9 bg-teal-800 rounded-full animate-pulse shrink-0"
            style={{ width: w }}
          />
        ))}
      </div>
      {/* Surah header skeleton */}
      <div className="bg-teal-950 border border-teal-700 rounded-2xl p-6 text-center space-y-3">
        <div className="h-8 w-48 bg-teal-800 rounded animate-pulse mx-auto" />
        <div className="h-5 w-32 bg-teal-800/70 rounded animate-pulse mx-auto" />
        <div className="h-4 w-24 bg-teal-800/50 rounded animate-pulse mx-auto" />
      </div>
      {/* Ayah rows skeleton */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-b border-teal-800/60 py-5">
          <div className="flex justify-end mb-3 gap-3">
            <div className="h-8 w-8 bg-teal-800 rounded-full animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div
                className="h-6 bg-teal-800 rounded animate-pulse"
                style={{ width: `${72 + (i % 3) * 9}%` }}
              />
              <div
                className="h-6 bg-teal-800/60 rounded animate-pulse ml-auto"
                style={{ width: `${52 + (i % 4) * 8}%` }}
              />
            </div>
          </div>
          <div className="pl-11 space-y-1">
            <div
              className="h-4 bg-teal-800/50 rounded animate-pulse"
              style={{ width: `${62 + (i % 3) * 10}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Surah tab bar ─────────────────────────────────────────────────────────────
function SurahTabs({
  surahNumbers,
  currentIdx,
  meta,
  onSelect,
}: {
  surahNumbers: number[];
  currentIdx: number;
  meta: JuzViewerProps['surahMeta'];
  onSelect: (idx: number) => void;
}) {
  const tabRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view
  useEffect(() => {
    const container = tabRef.current;
    if (!container) return;
    const active = container.querySelector('[data-active="true"]') as HTMLElement | null;
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIdx]);

  return (
    <div
      ref={tabRef}
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      style={{ scrollbarWidth: 'none' }}
    >
      {surahNumbers.map((surahNum, idx) => {
        const isActive = idx === currentIdx;
        const name = meta[surahNum]?.nameTranslit ?? `S.${surahNum}`;
        return (
          <button
            key={surahNum}
            data-active={isActive}
            onClick={() => onSelect(idx)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
              isActive
                ? 'bg-gold-500 text-teal-950 border-gold-500 shadow-md scale-105'
                : 'bg-teal-800 text-teal-300 border-teal-700 hover:bg-teal-700 hover:text-white'
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function JuzViewer({ juzNumber, juzInfo, surahMeta }: JuzViewerProps) {
  const [juzData, setJuzData] = useState<JuzData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSurahIdx, setCurrentSurahIdx] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const prevJuz = juzNumber > 1 ? juzNumber - 1 : null;
  const nextJuz = juzNumber < 30 ? juzNumber + 1 : null;

  const loadJuz = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentSurahIdx(0); // reset to first surah on new juz
    try {
      const res = await fetch(`/api/juz/${juzNumber}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Erreur ${res.status}`);
      }
      const data: JuzData = await res.json();
      setJuzData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [juzNumber]);

  useEffect(() => {
    loadJuz();
  }, [loadJuz]);

  const surahGroups = juzData ? groupBySurah(juzData.ayahs) : null;
  const surahNumbers = surahGroups ? Array.from(surahGroups.keys()) : [];

  // Derived values for current surah page
  const currentSurahNumber = surahNumbers[currentSurahIdx] ?? null;
  const currentAyahs =
    currentSurahNumber && surahGroups ? (surahGroups.get(currentSurahNumber) ?? []) : [];
  const isFirstSurah = currentSurahIdx === 0;
  const isLastSurah = currentSurahIdx === surahNumbers.length - 1;
  const showBismillah =
    currentSurahNumber !== null &&
    currentSurahNumber !== 1 &&
    currentSurahNumber !== 9 &&
    currentAyahs[0]?.numberInSurah === 1;

  function goToSurah(idx: number) {
    setCurrentSurahIdx(idx);
    // Small delay so state updates before scroll
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <main className="min-h-screen bg-teal-900 text-teal-50">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-teal-950/95 backdrop-blur border-b border-teal-800 px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link
          href="/"
          className="text-teal-400 hover:text-gold-400 transition-colors text-sm shrink-0"
        >
          ← Accueil
        </Link>
        <div className="h-4 w-px bg-teal-700" />
        <div className="flex-1 min-w-0">
          <h1 className="text-gold-400 font-bold text-base leading-tight">Juz {juzNumber}</h1>
          <p className="text-teal-400 text-xs truncate">{juzInfo.nameFrench}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {prevJuz && (
            <Link
              href={`/juz/${prevJuz}`}
              className="bg-teal-800 hover:bg-teal-700 border border-teal-700 text-teal-300 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              ← {prevJuz}
            </Link>
          )}
          {nextJuz && (
            <Link
              href={`/juz/${nextJuz}`}
              className="bg-teal-800 hover:bg-gold-500 hover:text-teal-950 border border-teal-700 hover:border-gold-500 text-teal-300 text-xs px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              {nextJuz} →
            </Link>
          )}
        </div>
      </header>

      {/* ── Juz overview ── */}
      <div className="bg-teal-800 border-b border-teal-700 px-4 sm:px-8 py-3 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-sm">
          {[
            { label: 'Juz', value: `${juzNumber} / 30`, accent: true },
            { label: 'Versets', value: juzData ? String(juzData.ayahs.length) : '—' },
            {
              label: 'Début',
              value: `${surahMeta[juzInfo.startSurah]?.nameTranslit ?? ''}${juzInfo.startAyah !== 1 ? ` :${juzInfo.startAyah}` : ''}`,
            },
            {
              label: 'Fin',
              value: `${surahMeta[juzInfo.endSurah]?.nameTranslit ?? ''} :${juzInfo.endAyah}`,
            },
          ].map(({ label, value, accent }) => (
            <div key={label}>
              <span className="text-teal-400 text-xs block">{label}</span>
              <span className={`font-medium ${accent ? 'text-gold-400 text-xl' : 'text-white text-sm'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="mt-2">
          <div className="h-1.5 bg-teal-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-500 rounded-full"
              style={{ width: `${(juzNumber / 30) * 100}%` }}
            />
          </div>
          <p className="text-teal-600 text-xs mt-0.5 text-right">
            {Math.round((juzNumber / 30) * 100)}% du Coran
          </p>
        </div>
      </div>

      {/* ── Reading area ── */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-8 py-6">

        {/* Loading */}
        {loading && <ReadingSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-white font-semibold text-lg mb-2">Impossible de charger le Juz</p>
            <p className="text-teal-300 text-sm mb-6 font-mono bg-teal-950 rounded-lg px-3 py-2 inline-block">
              {error}
            </p>
            <br />
            <button
              onClick={loadJuz}
              className="mt-4 bg-gold-500 hover:bg-gold-400 text-teal-950 font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && surahGroups && (
          <>
            {/* ── Surah tab bar ── */}
            <div className="mb-6">
              <p className="text-teal-500 text-xs mb-2">
                Sourate {currentSurahIdx + 1} sur {surahNumbers.length} dans ce Juz
              </p>
              <SurahTabs
                surahNumbers={surahNumbers}
                currentIdx={currentSurahIdx}
                meta={surahMeta}
                onSelect={goToSurah}
              />
            </div>

            {/* ── Current surah header ── */}
            <SurahHeader
              surahNumber={currentSurahNumber!}
              meta={surahMeta[currentSurahNumber!]}
              showBismillah={showBismillah}
            />

            {/* ── Ayahs ── */}
            <div>
              {currentAyahs.map((ayah, idx) => (
                <AyahRow key={ayah.number} ayah={ayah} idx={idx} />
              ))}
            </div>

            {/* ── In-page surah navigation ── */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {/* Previous surah */}
              <div>
                {!isFirstSurah ? (
                  <button
                    onClick={() => goToSurah(currentSurahIdx - 1)}
                    className="flex items-center gap-2 bg-teal-800 hover:bg-teal-700 border border-teal-700 text-teal-200 hover:text-white px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <span>←</span>
                    <div>
                      <p className="text-xs text-teal-400">Précédente</p>
                      <p className="text-sm font-medium">
                        {surahMeta[surahNumbers[currentSurahIdx - 1]]?.nameTranslit}
                      </p>
                    </div>
                  </button>
                ) : prevJuz ? (
                  <Link
                    href={`/juz/${prevJuz}`}
                    className="flex items-center gap-2 bg-teal-800 hover:bg-teal-700 border border-teal-700 text-teal-300 px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <span>←</span>
                    <div>
                      <p className="text-xs text-teal-400">Juz précédent</p>
                      <p className="text-sm font-medium">Juz {prevJuz}</p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Surah counter pill */}
              <div className="text-center">
                <span className="bg-teal-800 border border-teal-700 text-teal-300 text-xs px-3 py-1.5 rounded-full">
                  {currentSurahIdx + 1} / {surahNumbers.length}
                </span>
              </div>

              {/* Next surah */}
              <div>
                {!isLastSurah ? (
                  <button
                    onClick={() => goToSurah(currentSurahIdx + 1)}
                    className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-teal-950 px-4 py-2.5 rounded-xl transition-colors font-medium"
                  >
                    <div className="text-right">
                      <p className="text-xs opacity-70">Suivante</p>
                      <p className="text-sm font-bold">
                        {surahMeta[surahNumbers[currentSurahIdx + 1]]?.nameTranslit}
                      </p>
                    </div>
                    <span>→</span>
                  </button>
                ) : nextJuz ? (
                  <Link
                    href={`/juz/${nextJuz}`}
                    className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-teal-950 px-4 py-2.5 rounded-xl transition-colors font-medium"
                  >
                    <div className="text-right">
                      <p className="text-xs opacity-70">Juz suivant</p>
                      <p className="text-sm font-bold">Juz {nextJuz}</p>
                    </div>
                    <span>→</span>
                  </Link>
                ) : (
                  <div className="bg-teal-800 border border-teal-700 text-teal-400 px-4 py-2.5 rounded-xl text-center">
                    <p className="text-xs">Terminé !</p>
                    <p className="text-sm font-medium text-gold-400">Mâ shâ Allâh ✦</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
