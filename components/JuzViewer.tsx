'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { JuzData, AyahWithTranslation } from '@/lib/api';
import type { JuzInfo, Surah } from '@/lib/quran-data';

// ── Types ─────────────────────────────────────────────────────────────────────
interface JuzViewerProps {
  juzNumber: number;
  juzInfo: JuzInfo;
  surahMeta: Record<
    number,
    Pick<Surah, 'nameArabic' | 'nameTranslit' | 'nameFrench' | 'ayahCount' | 'revelationType'>
  >;
}

// ── Audio constants ───────────────────────────────────────────────────────────
const RECITERS = [
  { id: 'Alafasy_128kbps',               label: 'Mishary Al-Afasy' },
  { id: 'AbdurRahmaanAs-Sudais_192kbps', label: 'Abdul Rahman Al-Sudais' },
  { id: 'Husary_128kbps',                label: 'Mahmoud Al-Husary' },
  { id: 'Ghamadi_40kbps',                label: 'Saad Al-Ghamdi' },
] as const;

type ReciterId = (typeof RECITERS)[number]['id'];

function ayahAudioUrl(surahNum: number, ayahInSurah: number, reciter: ReciterId): string {
  const s = String(surahNum).padStart(3, '0');
  const a = String(ayahInSurah).padStart(3, '0');
  return `https://everyayah.com/data/${reciter}/${s}${a}.mp3`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
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

// ── Audio player (controlled — audio state lives in JuzViewer) ────────────────
function SurahAudioPlayer({
  ayahs,
  playerIdx,
  isPlaying,
  isAudioLoading,
  reciter,
  onPlayPause,
  onPrev,
  onNext,
  onReciterChange,
}: {
  ayahs:          AyahWithTranslation[];
  playerIdx:      number;
  isPlaying:      boolean;
  isAudioLoading: boolean;
  reciter:        ReciterId;
  onPlayPause:    () => void;
  onPrev:         () => void;
  onNext:         () => void;
  onReciterChange:(r: ReciterId) => void;
}) {
  const currentAyah = ayahs[playerIdx];
  const progress    = ayahs.length > 0 ? ((playerIdx + 1) / ayahs.length) * 100 : 0;

  return (
    <div className="bg-teal-950 border border-gold-700/30 rounded-xl px-4 py-3 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {/* Reciter selector */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-gold-500 text-sm shrink-0">🎙</span>
          <select
            value={reciter}
            onChange={(e) => onReciterChange(e.target.value as ReciterId)}
            className="bg-teal-800 border border-teal-600 text-teal-200 text-xs rounded-lg px-2 py-1.5 max-w-[160px] focus:outline-none focus:border-gold-500 transition-colors"
          >
            {RECITERS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPrev}
            disabled={playerIdx === 0}
            title="Verset précédent"
            className="w-8 h-8 flex items-center justify-center text-teal-400 hover:text-white disabled:text-teal-700 transition-colors"
          >
            ⏮
          </button>

          <button
            onClick={onPlayPause}
            title={isPlaying ? 'Pause' : 'Lire'}
            className="w-10 h-10 rounded-full bg-gold-500 hover:bg-gold-400 text-teal-950 flex items-center justify-center font-bold text-lg transition-colors shadow-md"
          >
            {isAudioLoading ? (
              <span className="text-xs animate-pulse">…</span>
            ) : isPlaying ? (
              '⏸'
            ) : (
              '▶'
            )}
          </button>

          <button
            onClick={onNext}
            disabled={playerIdx === ayahs.length - 1}
            title="Verset suivant"
            className="w-8 h-8 flex items-center justify-center text-teal-400 hover:text-white disabled:text-teal-700 transition-colors"
          >
            ⏭
          </button>
        </div>

        {/* Ayah counter */}
        <span className="text-teal-400 text-xs ml-auto">
          {isPlaying && currentAyah ? (
            <span className="text-gold-400 font-medium">
              Verset {currentAyah.numberInSurah}
            </span>
          ) : (
            'Verset'
          )}{' '}
          <span className="text-teal-500">
            {playerIdx + 1} / {ayahs.length}
          </span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-2.5 h-1 bg-teal-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-teal-600 text-xs mt-1">Lecture automatique verset par verset</p>
    </div>
  );
}

// ── Surah header ──────────────────────────────────────────────────────────────
function SurahHeader({
  surahNumber,
  meta,
  showBismillah,
}: {
  surahNumber:  number;
  meta:         JuzViewerProps['surahMeta'][number] | undefined;
  showBismillah:boolean;
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
function AyahRow({
  ayah,
  idx,
  isActive,
  onPlay,
}: {
  ayah:     AyahWithTranslation;
  idx:      number;
  isActive: boolean;
  onPlay:   (ayah: AyahWithTranslation) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      rowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  return (
    <div
      ref={rowRef}
      className={`border-b py-5 px-3 rounded-lg transition-all ${
        isActive
          ? 'bg-teal-700/40 border-l-4 border-l-gold-500 border-b-teal-700'
          : `border-b-teal-800/60 hover:bg-teal-800/40 ${idx % 2 !== 0 ? 'bg-teal-800/20' : ''}`
      }`}
    >
      {/* Arabic */}
      <div className="flex items-start gap-3 justify-end mb-3">
        {/* Number badge + audio icon stacked */}
        <div className="order-first mt-1 shrink-0 flex flex-col items-center gap-1">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-xs font-medium transition-colors ${
              isActive
                ? 'border-gold-500 text-gold-400 bg-gold-500/10'
                : 'border-gold-700/50 text-gold-600'
            }`}
          >
            {ayah.numberInSurah}
          </span>
          <button
            onClick={() => onPlay(ayah)}
            title={isActive ? 'Arrêter' : `Écouter le verset ${ayah.numberInSurah}`}
            className={`text-sm leading-none transition-all ${
              isActive
                ? 'text-gold-400 animate-pulse scale-110'
                : 'text-teal-600 hover:text-gold-400 hover:scale-110'
            }`}
          >
            {isActive ? '⏸' : '🔊'}
          </button>
        </div>

        <p
          className="arabic-text text-right text-teal-50 text-xl sm:text-2xl flex-1 leading-loose"
          dir="rtl"
          lang="ar"
        >
          {ayah.arabicText}{' '}
          <span className={`text-base ${isActive ? 'text-gold-400' : 'text-gold-500'}`}>
            ﴿{toArabicNumeral(ayah.numberInSurah)}﴾
          </span>
        </p>
      </div>

      {/* French translation */}
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
      <div className="flex gap-2 overflow-hidden">
        {[80, 110, 70].map((w) => (
          <div key={w} className="h-9 bg-teal-800 rounded-full animate-pulse shrink-0" style={{ width: w }} />
        ))}
      </div>
      <div className="bg-teal-950 border border-teal-700 rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-teal-800 rounded w-40 mx-auto" />
      </div>
      <div className="bg-teal-950 border border-teal-700 rounded-2xl p-6 text-center space-y-3">
        <div className="h-8 w-48 bg-teal-800 rounded animate-pulse mx-auto" />
        <div className="h-5 w-32 bg-teal-800/70 rounded animate-pulse mx-auto" />
        <div className="h-4 w-24 bg-teal-800/50 rounded animate-pulse mx-auto" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-b border-teal-800/60 py-5">
          <div className="flex justify-end mb-3 gap-3">
            <div className="h-8 w-8 bg-teal-800 rounded-full animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-teal-800 rounded animate-pulse" style={{ width: `${72 + (i % 3) * 9}%` }} />
              <div className="h-6 bg-teal-800/60 rounded animate-pulse ml-auto" style={{ width: `${52 + (i % 4) * 8}%` }} />
            </div>
          </div>
          <div className="pl-11">
            <div className="h-4 bg-teal-800/50 rounded animate-pulse" style={{ width: `${62 + (i % 3) * 10}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Surah tabs ────────────────────────────────────────────────────────────────
function SurahTabs({
  surahNumbers,
  currentIdx,
  meta,
  onSelect,
}: {
  surahNumbers: number[];
  currentIdx:   number;
  meta:         JuzViewerProps['surahMeta'];
  onSelect:     (idx: number) => void;
}) {
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tabRef.current;
    if (!container) return;
    const active = container.querySelector('[data-active="true"]') as HTMLElement | null;
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [currentIdx]);

  return (
    <div ref={tabRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
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
  const [juzData, setJuzData]                     = useState<JuzData | null>(null);
  const [error, setError]                         = useState<string | null>(null);
  const [loading, setLoading]                     = useState(true);
  const [currentSurahIdx, setCurrentSurahIdx]     = useState(0);

  // ── Audio state (single Audio element shared by player bar + per-ayah buttons)
  const [playerIdx, setPlayerIdx]                 = useState(0);
  const [isPlaying, setIsPlaying]                 = useState(false);
  const [isAudioLoading, setIsAudioLoading]       = useState(false);
  const [reciter, setReciter]                     = useState<ReciterId>('Alafasy_128kbps');
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);

  const audioRef        = useRef<HTMLAudioElement | null>(null);
  const playerIdxRef    = useRef(playerIdx);
  const reciterRef      = useRef(reciter);
  const currentAyahsRef = useRef<AyahWithTranslation[]>([]);
  playerIdxRef.current  = playerIdx;
  reciterRef.current    = reciter;

  const contentRef = useRef<HTMLDivElement>(null);
  const prevJuz    = juzNumber > 1  ? juzNumber - 1 : null;
  const nextJuz    = juzNumber < 30 ? juzNumber + 1 : null;

  // Derived reading data
  const surahGroups     = juzData ? groupBySurah(juzData.ayahs) : null;
  const surahNumbers    = surahGroups ? Array.from(surahGroups.keys()) : [];
  const currentSurahNum = surahNumbers[currentSurahIdx] ?? null;
  const currentAyahs    = currentSurahNum && surahGroups ? (surahGroups.get(currentSurahNum) ?? []) : [];
  currentAyahsRef.current = currentAyahs;

  const isFirstSurah  = currentSurahIdx === 0;
  const isLastSurah   = currentSurahIdx === surahNumbers.length - 1;
  const showBismillah =
    currentSurahNum !== null &&
    currentSurahNum !== 1 &&
    currentSurahNum !== 9 &&
    currentAyahs[0]?.numberInSurah === 1;

  // ── Initialize a single Audio element once ────────────────────────────────
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.onended = () => {
      const idx   = playerIdxRef.current;
      const ayahs = currentAyahsRef.current;
      if (idx < ayahs.length - 1) {
        const next = ayahs[idx + 1];
        setPlayerIdx(idx + 1);
        setIsAudioLoading(true);
        audio.src = ayahAudioUrl(next.surahNumber, next.numberInSurah, reciterRef.current);
        audio.play()
          .then(() => { setIsAudioLoading(false); setPlayingAyahNumber(next.number); })
          .catch(() => { setIsAudioLoading(false); setIsPlaying(false); setPlayingAyahNumber(null); });
      } else {
        setIsPlaying(false);
        setPlayingAyahNumber(null);
      }
    };

    audio.onerror = () => {
      setIsAudioLoading(false);
      setIsPlaying(false);
      setPlayingAyahNumber(null);
    };

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // ── Core: play ayah at index idx in currentAyahs ──────────────────────────
  function playFromIdx(idx: number) {
    const audio = audioRef.current;
    const ayah  = currentAyahs[idx];
    if (!audio || !ayah) return;

    audio.pause();
    audio.src = ayahAudioUrl(ayah.surahNumber, ayah.numberInSurah, reciter);
    setPlayerIdx(idx);
    setIsAudioLoading(true);

    audio.play()
      .then(() => {
        setIsAudioLoading(false);
        setIsPlaying(true);
        setPlayingAyahNumber(ayah.number);
      })
      .catch(() => {
        setIsAudioLoading(false);
        setIsPlaying(false);
        setPlayingAyahNumber(null);
      });
  }

  function stopAudio() {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.src = ''; }
    setIsPlaying(false);
    setIsAudioLoading(false);
    setPlayingAyahNumber(null);
  }

  // ── Player bar handlers ───────────────────────────────────────────────────
  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      setPlayingAyahNumber(null);
    } else {
      playFromIdx(playerIdx);
    }
  }

  function handlePrev() {
    if (playerIdx > 0) playFromIdx(playerIdx - 1);
  }

  function handleNext() {
    if (playerIdx < currentAyahs.length - 1) playFromIdx(playerIdx + 1);
  }

  function handleReciterChange(r: ReciterId) {
    setReciter(r);
    // If currently playing, restart current ayah with new reciter
    if (isPlaying) {
      const audio = audioRef.current;
      const ayah  = currentAyahs[playerIdx];
      if (!audio || !ayah) return;
      audio.pause();
      audio.src = ayahAudioUrl(ayah.surahNumber, ayah.numberInSurah, r);
      setIsAudioLoading(true);
      audio.play()
        .then(() => { setIsAudioLoading(false); setPlayingAyahNumber(ayah.number); })
        .catch(() => { setIsAudioLoading(false); setIsPlaying(false); setPlayingAyahNumber(null); });
    }
  }

  // ── Per-ayah 🔊 button: jumps player to that ayah and plays ──────────────
  function handleAyahPlay(ayah: AyahWithTranslation) {
    // Toggle off if same ayah is playing
    if (playingAyahNumber === ayah.number) {
      stopAudio();
      return;
    }
    const idx = currentAyahs.findIndex((a) => a.number === ayah.number);
    if (idx !== -1) playFromIdx(idx);
  }

  // ── Data loading ──────────────────────────────────────────────────────────
  const loadJuz = useCallback(async () => {
    stopAudio();
    setPlayerIdx(0);
    setLoading(true);
    setError(null);
    setCurrentSurahIdx(0);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [juzNumber]);

  useEffect(() => { loadJuz(); }, [loadJuz]);

  function goToSurah(idx: number) {
    stopAudio();
    setPlayerIdx(0);
    setCurrentSurahIdx(idx);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  return (
    <main className="min-h-screen bg-teal-900 text-teal-50">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-teal-950/95 backdrop-blur border-b border-teal-800 px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link href="/" className="text-teal-400 hover:text-gold-400 transition-colors text-sm shrink-0">
          ← Accueil
        </Link>
        <div className="h-4 w-px bg-teal-700" />
        <div className="flex-1 min-w-0">
          <h1 className="text-gold-400 font-bold text-base leading-tight">Juz {juzNumber}</h1>
          <p className="text-teal-400 text-xs truncate">{juzInfo.nameFrench}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {prevJuz && (
            <Link href={`/juz/${prevJuz}`} className="bg-teal-800 hover:bg-teal-700 border border-teal-700 text-teal-300 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
              ← {prevJuz}
            </Link>
          )}
          {nextJuz && (
            <Link href={`/juz/${nextJuz}`} className="bg-teal-800 hover:bg-gold-500 hover:text-teal-950 border border-teal-700 hover:border-gold-500 text-teal-300 text-xs px-3 py-1.5 rounded-lg transition-colors font-medium">
              {nextJuz} →
            </Link>
          )}
        </div>
      </header>

      {/* ── Juz overview ── */}
      <div className="bg-teal-800 border-b border-teal-700 px-4 sm:px-8 py-3 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-sm">
          {[
            { label: 'Juz',     value: `${juzNumber} / 30`, accent: true },
            { label: 'Versets', value: juzData ? String(juzData.ayahs.length) : '—' },
            { label: 'Début',   value: `${surahMeta[juzInfo.startSurah]?.nameTranslit ?? ''}${juzInfo.startAyah !== 1 ? ` :${juzInfo.startAyah}` : ''}` },
            { label: 'Fin',     value: `${surahMeta[juzInfo.endSurah]?.nameTranslit ?? ''} :${juzInfo.endAyah}` },
          ].map(({ label, value, accent }) => (
            <div key={label}>
              <span className="text-teal-400 text-xs block">{label}</span>
              <span className={`font-medium ${accent ? 'text-gold-400 text-xl' : 'text-white text-sm'}`}>{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <div className="h-1.5 bg-teal-900 rounded-full overflow-hidden">
            <div className="h-full bg-gold-500 rounded-full" style={{ width: `${(juzNumber / 30) * 100}%` }} />
          </div>
          <p className="text-teal-600 text-xs mt-0.5 text-right">{Math.round((juzNumber / 30) * 100)}% du Coran</p>
        </div>
      </div>

      {/* ── Reading area ── */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-8 py-6">

        {loading && <ReadingSkeleton />}

        {!loading && error && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-white font-semibold text-lg mb-2">Impossible de charger le Juz</p>
            <p className="text-teal-300 text-sm mb-4 font-mono bg-teal-950 rounded-lg px-3 py-2 inline-block">{error}</p>
            <br />
            <button onClick={loadJuz} className="mt-4 bg-gold-500 hover:bg-gold-400 text-teal-950 font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && surahGroups && (
          <>
            {/* Surah tabs */}
            <div className="mb-5">
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

            {/* Global audio player bar */}
            <SurahAudioPlayer
              ayahs={currentAyahs}
              playerIdx={playerIdx}
              isPlaying={isPlaying}
              isAudioLoading={isAudioLoading}
              reciter={reciter}
              onPlayPause={handlePlayPause}
              onPrev={handlePrev}
              onNext={handleNext}
              onReciterChange={handleReciterChange}
            />

            {/* Surah header */}
            <SurahHeader
              surahNumber={currentSurahNum!}
              meta={surahMeta[currentSurahNum!]}
              showBismillah={showBismillah}
            />

            {/* Ayahs — each has a 🔊 icon below its number */}
            <div>
              {currentAyahs.map((ayah, idx) => (
                <AyahRow
                  key={ayah.number}
                  ayah={ayah}
                  idx={idx}
                  isActive={ayah.number === playingAyahNumber}
                  onPlay={handleAyahPlay}
                />
              ))}
            </div>

            {/* In-page surah navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                {!isFirstSurah ? (
                  <button
                    onClick={() => goToSurah(currentSurahIdx - 1)}
                    className="flex items-center gap-2 bg-teal-800 hover:bg-teal-700 border border-teal-700 text-teal-200 hover:text-white px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <span>←</span>
                    <div>
                      <p className="text-xs text-teal-400">Précédente</p>
                      <p className="text-sm font-medium">{surahMeta[surahNumbers[currentSurahIdx - 1]]?.nameTranslit}</p>
                    </div>
                  </button>
                ) : prevJuz ? (
                  <Link href={`/juz/${prevJuz}`} className="flex items-center gap-2 bg-teal-800 hover:bg-teal-700 border border-teal-700 text-teal-300 px-4 py-2.5 rounded-xl transition-colors">
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

              <span className="bg-teal-800 border border-teal-700 text-teal-300 text-xs px-3 py-1.5 rounded-full">
                {currentSurahIdx + 1} / {surahNumbers.length}
              </span>

              <div>
                {!isLastSurah ? (
                  <button
                    onClick={() => goToSurah(currentSurahIdx + 1)}
                    className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-teal-950 px-4 py-2.5 rounded-xl transition-colors font-medium"
                  >
                    <div className="text-right">
                      <p className="text-xs opacity-70">Suivante</p>
                      <p className="text-sm font-bold">{surahMeta[surahNumbers[currentSurahIdx + 1]]?.nameTranslit}</p>
                    </div>
                    <span>→</span>
                  </button>
                ) : nextJuz ? (
                  <Link href={`/juz/${nextJuz}`} className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-teal-950 px-4 py-2.5 rounded-xl transition-colors font-medium">
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
