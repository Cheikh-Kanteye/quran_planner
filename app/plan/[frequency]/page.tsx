import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JUZ_DATA,
  SURAHS,
  FREQUENCY_LABELS,
  getDayPlan,
  type JuzInfo,
} from "@/lib/quran-data";

interface Props {
  params: Promise<{ frequency: string }>;
}

function getSurahName(number: number): string {
  return SURAHS.find((s) => s.number === number)?.nameTranslit ?? `Sourate ${number}`;
}

function getJuzLabel(juz: JuzInfo): string {
  const start = getSurahName(juz.startSurah);
  const end = getSurahName(juz.endSurah);
  if (juz.startSurah === juz.endSurah) {
    return start;
  }
  return `${start} → ${end}`;
}

const PRAYERS = ["Fajr", "Dhouhr", "Asr", "Maghrib", "Isha"] as const;

const PRAYER_COLORS = ["#7dd3fc", "#fcd34d", "#fdba74", "#fca5a5", "#a5b4fc"] as const;

export default async function PlanPage({ params }: Readonly<Props>) {
  const { frequency: freqStr } = await params;
  const frequency = Number.parseInt(freqStr, 10);

  if (Number.isNaN(frequency) || frequency < 1 || frequency > 5) {
    notFound();
  }

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const pagesPerPrayer = frequency * 4;
  const pagesPerDay = pagesPerPrayer * 5;

  return (
    <main className="min-h-screen bg-teal-900 text-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-teal-950 border-b border-teal-700 px-6 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="text-teal-400 hover:text-gold-400 transition-colors text-sm flex items-center gap-1"
        >
          ← Retour
        </Link>
        <div className="h-5 w-px bg-teal-700" />
        <div>
          <h1 className="text-lg font-bold text-gold-400 leading-tight">
            {FREQUENCY_LABELS[frequency]}
          </h1>
          <p className="text-teal-300 text-xs">
            {pagesPerPrayer} pages / prière · {pagesPerDay} pages / jour · 30 jours
          </p>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <span className="text-teal-500 text-xs">Plan Ramadan complet</span>
        </div>
      </header>

      {/* Info banner */}
      <div className="bg-teal-800 border-b border-teal-700 px-6 py-3 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gold-400">✦</span>
          <span className="text-teal-200">
            Lectures par jour :{" "}
            <strong className="text-white">{frequency}×</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400">✦</span>
          <span className="text-teal-200">
            Juz par prière :{" "}
            <strong className="text-white">{pagesPerPrayer} pages (~{(frequency / 5).toFixed(1)} Juz)</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400">✦</span>
          <span className="text-teal-200">
            Total : <strong className="text-white">{frequency} lecture{frequency > 1 ? "s" : ""} du Coran</strong>
          </span>
        </div>
      </div>

      {/* 30-day grid */}
      <section className="flex-1 px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-teal-700" />
          <h2 className="text-gold-400 text-sm font-semibold uppercase tracking-widest">
            Plan 30 jours — Ramadan
          </h2>
          <div className="h-px flex-1 bg-teal-700" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map((day) => {
            const juzList = getDayPlan(day, frequency);
            const totalReadings = frequency;
            const readingNum = Math.ceil((day * frequency) / 30);

            return (
              <div
                key={day}
                className="bg-teal-800 border border-teal-700 rounded-xl overflow-hidden hover:border-gold-500 transition-colors group"
              >
                {/* Day header */}
                <div className="bg-teal-950 px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-gold-400 font-bold text-lg">
                      Jour {day}
                    </span>
                    <span className="text-teal-500 text-xs ml-2">
                      Ramadan {day}
                    </span>
                  </div>
                  {totalReadings > 1 && (
                    <span className="text-teal-500 text-xs">
                      Lecture {readingNum}
                    </span>
                  )}
                </div>

                {/* Juz list */}
                <div className="px-4 py-3 space-y-3">
                  {juzList.map((juz) => (
                    <Link
                      key={juz.number}
                      href={`/juz/${juz.number}`}
                      className="block bg-teal-900 hover:bg-teal-700 border border-teal-700 hover:border-gold-500 rounded-lg px-3 py-2.5 transition-all group/juz"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-gold-400 font-semibold text-sm leading-tight">
                            Juz {juz.number}
                          </p>
                          <p className="text-teal-200 text-xs mt-0.5 leading-tight truncate">
                            {getJuzLabel(juz)}
                          </p>
                          <p className="text-teal-500 text-xs mt-0.5 italic">
                            {juz.nameFrench}
                          </p>
                        </div>
                        <span className="text-teal-500 group-hover/juz:text-gold-400 transition-colors text-sm shrink-0 mt-0.5">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Prayer split indicator */}
                <div className="px-4 pb-3 pt-0">
                  <div className="flex gap-1">
                    {PRAYERS.map((p, i) => (
                      <div
                        key={p}
                        title={p}
                        className={`flex-1 h-1.5 rounded-full bg-teal-700 group-hover:opacity-100 opacity-60 transition-opacity`}
                        style={{ backgroundColor: PRAYER_COLORS[i] }}
                      />
                    ))}
                  </div>
                  <p className="text-teal-600 text-xs mt-1.5 text-right">
                    {pagesPerPrayer} pages × 5 prières
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Juz reference */}
      <section className="px-4 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-teal-700" />
          <h2 className="text-gold-400 text-sm font-semibold uppercase tracking-widest">
            Référence des 30 Juz
          </h2>
          <div className="h-px flex-1 bg-teal-700" />
        </div>

        <div className="bg-teal-950 border border-teal-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-teal-800">
                  <th className="px-4 py-3 text-left text-gold-400 font-semibold">Juz</th>
                  <th className="px-4 py-3 text-left text-teal-400 font-semibold">Nom</th>
                  <th className="px-4 py-3 text-left text-teal-400 font-semibold">Début</th>
                  <th className="px-4 py-3 text-left text-teal-400 font-semibold">Fin</th>
                  <th className="px-4 py-3 text-left text-teal-400 font-semibold">Lire</th>
                </tr>
              </thead>
              <tbody>
                {JUZ_DATA.map((juz, i) => (
                  <tr
                    key={juz.number}
                    className={`border-b border-teal-800/50 hover:bg-teal-800 transition-colors ${i % 2 === 0 ? "" : "bg-teal-900/30"
                      }`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="text-gold-400 font-bold">{juz.number}</span>
                    </td>
                    <td className="px-4 py-2.5 text-teal-300 italic text-xs">
                      {juz.nameFrench}
                    </td>
                    <td className="px-4 py-2.5 text-teal-200 text-xs">
                      {getSurahName(juz.startSurah)} {juz.startAyah === 1 ? "" : `:${juz.startAyah}`}
                    </td>
                    <td className="px-4 py-2.5 text-teal-200 text-xs">
                      {getSurahName(juz.endSurah)} :{juz.endAyah}
                    </td>
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/juz/${juz.number}`}
                        className="text-gold-400 hover:text-gold-300 text-xs font-medium transition-colors"
                      >
                        Lire →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="bg-teal-950 border-t border-teal-800 py-6 px-6 text-center">
        <p className="text-teal-500 text-xs">
          Textes fournis par alquran.cloud · Traduction française de Muhammad Hamidullah
        </p>
      </footer>
    </main>
  );
}
