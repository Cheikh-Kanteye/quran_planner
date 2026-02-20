"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LAST_NIGHTS = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const DOUAS = [
  {
    arabe: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allāhumma innaka ʿafuwwun tuḥibbu l-ʿafwa faʿfu ʿannī",
    traduction: "Ô Allah, Tu es Le Pardonneur, Tu aimes pardonner, alors pardonne-moi.",
    source: "Doua de Laylat al-Qadr — Rapporté par at-Tirmidhî",
  },
  {
    arabe: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbanā ātinā fī d-dunyā ḥasanatan wa fī l-ākhirati ḥasanatan wa qinā ʿadhāba n-nār",
    traduction: "Notre Seigneur, accorde-nous une belle récompense ici-bas et dans l'au-delà, et préserve-nous du châtiment du Feu.",
    source: "Sourate Al-Baqara, verset 201",
  },
];

const IBADAH_LIST = [
  { id: "salat", label: "Salat al-Layl", emoji: "🌙" },
  { id: "coran", label: "Lecture du Coran", emoji: "📖" },
  { id: "dhikr", label: "Dhikr", emoji: "🤍" },
  { id: "doua", label: "Douas & Istighfar", emoji: "🤲" },
  { id: "sadaqa", label: "Sadaqa", emoji: "💛" },
];

type NightRecord = {
  ibadah: string[];
  note: string;
};

type History = Record<number, NightRecord>;

export default function LaylatulQadrPage() {
  const [currentNight, setCurrentNight] = useState<number>(21);
  const [history, setHistory] = useState<History>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("laylatul_qadr_history");
    if (raw) setHistory(JSON.parse(raw));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("laylatul_qadr_history", JSON.stringify(history));
  }, [history, loaded]);

  const record: NightRecord = history[currentNight] ?? { ibadah: [], note: "" };

  const toggleIbadah = (id: string) => {
    const current = record.ibadah;
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    setHistory((prev) => ({
      ...prev,
      [currentNight]: { ...record, ibadah: updated },
    }));
  };

  const setNote = (note: string) => {
    setHistory((prev) => ({
      ...prev,
      [currentNight]: { ...record, note },
    }));
  };

  const getNightStatus = (night: number) => {
    const rec = history[night];
    if (!rec || rec.ibadah.length === 0) return "empty";
    if (rec.ibadah.length >= IBADAH_LIST.length) return "complete";
    return "partial";
  };

  const progress = Math.round((record.ibadah.length / IBADAH_LIST.length) * 100);

  if (!loaded) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-950 via-teal-900 to-teal-950 text-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-teal-950 border-b border-teal-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-teal-400 hover:text-white transition text-sm">
          ← Accueil
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold text-yellow-400">Les 10 Dernières Nuits</h1>
          <p className="text-teal-300 text-xs">ليلة القدر — Laylat al-Qadr</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-teal-400 text-sm font-amiri">رمضان كريم</p>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-8">

        {/* Intro */}
        <section className="bg-teal-950/60 border border-teal-800 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-2">⭐</div>
          <h2 className="text-yellow-400 font-bold text-lg mb-2">
            Laylat al-Qadr — La Nuit du Destin
          </h2>
          <p className="text-teal-200 text-sm leading-relaxed">
            Cette nuit vaut <strong className="text-yellow-400">mille mois</strong> d&apos;adoration.
            Elle se trouve parmi les nuits impaires des 10 derniers jours du Ramadan.
            Multipliez vos actes d&apos;adoration ces nuits-là.
          </p>
          <p className="text-teal-300 text-xs mt-2 font-amiri">
            إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ — Sourate Al-Qadr, verset 1
          </p>
        </section>

        {/* Sélecteur de nuit */}
        <section>
          <p className="text-teal-400 text-xs uppercase tracking-widest text-center mb-3">
            Choisissez une nuit
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {LAST_NIGHTS.map((night) => {
              const status = getNightStatus(night);
              const isOdd = night % 2 !== 0;
              const isSelected = night === currentNight;
              return (
                <button
                  key={night}
                  onClick={() => setCurrentNight(night)}
                  className={`
                    aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all duration-200
                    ${isSelected ? "ring-2 ring-yellow-400 scale-110" : "hover:scale-105"}
                    ${status === "complete" ? "bg-yellow-400 text-teal-900" : ""}
                    ${status === "partial" ? "bg-teal-700 text-white" : ""}
                    ${status === "empty" && isOdd ? "bg-teal-900 border border-teal-600 text-teal-300" : ""}
                    ${status === "empty" && !isOdd ? "bg-teal-800 border border-teal-700 text-teal-400" : ""}
                  `}
                >
                  <span>{night}</span>
                  {isOdd && status === "empty" && <span className="text-[8px]">✦</span>}
                  {status === "complete" && <span className="text-[8px]">✓</span>}
                  {status === "partial" && <span className="text-[8px]">◑</span>}
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3 justify-center text-xs text-teal-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-teal-900 border border-teal-600 inline-block" /> Nuit impaire ✦
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> Complète
            </span>
          </div>
        </section>

        {/* Tracker ibadah */}
        <section className="bg-teal-800 border border-teal-700 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">
              Nuit {currentNight}
              {currentNight % 2 !== 0 && (
                <span className="ml-2 text-yellow-400 text-sm">✦ Nuit impaire</span>
              )}
            </h3>
            <span className="text-teal-400 text-sm">{record.ibadah.length}/{IBADAH_LIST.length}</span>
          </div>

          {/* Barre de progression */}
          <div className="mb-5">
            <div className="w-full bg-teal-950 rounded-full h-3 overflow-hidden border border-teal-700">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background:
                    progress === 100
                      ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                      : "linear-gradient(90deg, #0d9488, #14b8a6)",
                }}
              />
            </div>
            <p className="text-right text-xs mt-1 text-teal-400">{progress}%</p>
          </div>

          {/* Liste ibadah */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {IBADAH_LIST.map(({ id, label, emoji }) => {
              const done = record.ibadah.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleIbadah(id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                    done
                      ? "bg-yellow-400/10 border-yellow-400/40 text-yellow-300"
                      : "bg-teal-900 border-teal-700 text-teal-300 hover:border-teal-500"
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-sm font-medium leading-tight">{label}</span>
                  {done && <span className="ml-auto text-yellow-400 text-xs">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Note personnelle */}
          <div>
            <p className="text-teal-400 text-xs uppercase tracking-widest mb-2">
              Note personnelle (optionnel)
            </p>
            <textarea
              value={record.note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Mes intentions, douas du cœur, ressentis de cette nuit..."
              rows={3}
              className="w-full bg-teal-950 border border-teal-700 rounded-xl px-4 py-3 text-sm text-teal-100 placeholder-teal-600 focus:outline-none focus:border-yellow-400 resize-none transition"
            />
          </div>

          {record.ibadah.length === IBADAH_LIST.length && (
            <div className="mt-4 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-center py-3 rounded-xl text-sm font-medium">
              ⭐ Nuit complète ! بارك الله فيك
            </div>
          )}
        </section>

        {/* Douas recommandées */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-teal-700" />
            <h3 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest">
              Douas recommandées
            </h3>
            <div className="h-px flex-1 bg-teal-700" />
          </div>

          <div className="flex flex-col gap-4">
            {DOUAS.map((doua, i) => (
              <div
                key={i}
                className="bg-teal-800 border border-teal-700 rounded-xl p-5"
              >
                <p className="text-yellow-300 text-xl font-amiri text-right leading-loose mb-3">
                  {doua.arabe}
                </p>
                <p className="text-teal-300 text-xs italic mb-2">{doua.transliteration}</p>
                <p className="text-teal-100 text-sm leading-relaxed mb-2">{doua.traduction}</p>
                <p className="text-teal-500 text-xs">{doua.source}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-teal-950 border-t border-teal-800 py-4 px-6 text-center">
        <p className="text-yellow-700 text-sm font-amiri">بسم الله الرحمن الرحيم</p>
      </footer>
    </main>
  );
}