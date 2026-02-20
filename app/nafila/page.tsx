"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TOTAL_DAYS = 30;

type DayRecord = {
  objectif: number;
  accompli: number;
};

type History = Record<number, DayRecord>; // clé = numéro du jour 1..30

function getTodayIndex(): number {
  // Pour une vraie app Ramadan, on calculerait le jour depuis le début du Ramadan.
  // Ici on utilise le stockage pour laisser l'utilisateur naviguer librement.
  // On retourne le jour courant basé sur localStorage ou 1 par défaut.
  if (typeof window === "undefined") return 1;
  const stored = localStorage.getItem("nafila_current_day");
  return stored ? parseInt(stored) : 1;
}

export default function NafilaPage() {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [history, setHistory] = useState<History>({});
  const [loaded, setLoaded] = useState(false);

  // Charger depuis localStorage
  useEffect(() => {
    const day = getTodayIndex();
    setCurrentDay(day);
    const raw = localStorage.getItem("nafila_history");
    if (raw) {
      setHistory(JSON.parse(raw));
    }
    setLoaded(true);
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("nafila_history", JSON.stringify(history));
  }, [history, loaded]);

  const todayRecord: DayRecord = history[currentDay] ?? { objectif: 8, accompli: 0 };

  const setObjectif = (val: number) => {
    if (val < 2) return;
    setHistory((prev) => ({
      ...prev,
      [currentDay]: { ...todayRecord, objectif: val },
    }));
  };

  const addRakaa = () => {
    if (todayRecord.accompli >= todayRecord.objectif) return;
    setHistory((prev) => ({
      ...prev,
      [currentDay]: { ...todayRecord, accompli: todayRecord.accompli + 2 },
    }));
  };

  const removeRakaa = () => {
    if (todayRecord.accompli <= 0) return;
    setHistory((prev) => ({
      ...prev,
      [currentDay]: { ...todayRecord, accompli: todayRecord.accompli - 2 },
    }));
  };

  const progress =
    todayRecord.objectif > 0
      ? Math.min(100, Math.round((todayRecord.accompli / todayRecord.objectif) * 100))
      : 0;

  const isComplete = todayRecord.accompli >= todayRecord.objectif;

  const switchDay = (day: number) => {
    setCurrentDay(day);
    localStorage.setItem("nafila_current_day", String(day));
  };

  const getDayStatus = (day: number) => {
    const rec = history[day];
    if (!rec || rec.accompli === 0) return "empty";
    if (rec.accompli >= rec.objectif) return "complete";
    return "partial";
  };

  if (!loaded) return null;

  return (
    <main className="min-h-screen bg-teal-900 text-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-teal-950 border-b border-teal-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-teal-400 hover:text-white transition text-sm">
            ← Accueil
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl select-none">☽</span>
          <div className="text-center">
            <h1 className="text-xl font-bold text-yellow-400 leading-tight">Nafila du jour</h1>
            <p className="text-teal-300 text-xs">Ramadan Kareem 🤍</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-teal-300 text-sm font-amiri">رمضان كريم</p>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-8">

        {/* Carte principale du jour */}
        <section className="bg-teal-800 border border-teal-700 rounded-2xl p-6 shadow-xl">

          {/* Titre jour */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => switchDay(Math.max(1, currentDay - 1))}
              disabled={currentDay === 1}
              className="w-9 h-9 rounded-full bg-teal-700 hover:bg-teal-600 disabled:opacity-30 transition flex items-center justify-center text-lg"
            >
              ‹
            </button>
            <div className="text-center">
              <p className="text-teal-400 text-xs uppercase tracking-widest">Ramadan</p>
              <h2 className="text-2xl font-bold text-white">Jour {currentDay}</h2>
            </div>
            <button
              onClick={() => switchDay(Math.min(TOTAL_DAYS, currentDay + 1))}
              disabled={currentDay === TOTAL_DAYS}
              className="w-9 h-9 rounded-full bg-teal-700 hover:bg-teal-600 disabled:opacity-30 transition flex items-center justify-center text-lg"
            >
              ›
            </button>
          </div>

          {/* Texte religieux */}
          <div className="bg-teal-950 border border-teal-700 rounded-xl p-4 mb-6 text-sm text-teal-200 leading-relaxed">
            La prière <strong className="text-yellow-400">Nafila</strong> est une prière surérogatoire recommandée.
            Elle se prie généralement par unités de <strong className="text-yellow-400">2 rakʿa</strong>.
            Fixez votre objectif selon votre capacité et votre intention. 🤲
          </div>

          {/* Sélecteur objectif */}
          <div className="mb-6">
            <p className="text-teal-400 text-xs uppercase tracking-widest text-center mb-3">
              Objectif de rakʿa
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setObjectif(todayRecord.objectif - 2)}
                disabled={todayRecord.objectif <= 2}
                className="w-11 h-11 rounded-full bg-teal-700 hover:bg-teal-600 disabled:opacity-30 transition text-xl font-bold"
              >
                −
              </button>
              <div className="text-center">
                <span className="text-5xl font-bold text-yellow-400">{todayRecord.objectif}</span>
                <p className="text-teal-400 text-xs mt-1">rakʿa prévues</p>
              </div>
              <button
                onClick={() => setObjectif(todayRecord.objectif + 2)}
                className="w-11 h-11 rounded-full bg-teal-700 hover:bg-teal-600 transition text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-teal-300">Progression</span>
              <span className="text-yellow-400 font-semibold">
                {todayRecord.accompli} / {todayRecord.objectif} rakʿa
              </span>
            </div>
            <div className="w-full bg-teal-950 rounded-full h-4 overflow-hidden border border-teal-700">
              <div
                className="h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: isComplete
                    ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                    : "linear-gradient(90deg, #0d9488, #14b8a6)",
                }}
              />
            </div>
            <p className="text-right text-xs mt-1 text-teal-400">{progress}%</p>
          </div>

          {/* Boutons accompli */}
          <div className="flex gap-3">
            <button
              onClick={removeRakaa}
              disabled={todayRecord.accompli <= 0}
              className="flex-1 border border-teal-600 text-teal-300 py-3 rounded-xl hover:bg-teal-700 disabled:opacity-30 transition font-semibold"
            >
              − 2 rakʿa
            </button>
            <button
              onClick={addRakaa}
              disabled={isComplete}
              className="flex-1 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white py-3 rounded-xl transition font-semibold"
            >
              + 2 rakʿa accomplies ✅
            </button>
          </div>

          {/* Félicitation */}
          {isComplete && (
            <div className="mt-4 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-center py-3 rounded-xl text-sm font-medium">
              🎉 Objectif du jour atteint ! بارك الله فيك
            </div>
          )}
        </section>

        {/* Historique 30 jours */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-teal-700" />
            <h3 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest">
              Historique Ramadan
            </h3>
            <div className="h-px flex-1 bg-teal-700" />
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
            {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
              const status = getDayStatus(day);
              const isToday = day === currentDay;

              return (
                <button
                  key={day}
                  onClick={() => switchDay(day)}
                  className={`
                    aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all duration-200
                    ${isToday ? "ring-2 ring-yellow-400 scale-110" : "hover:scale-105"}
                    ${status === "complete" ? "bg-yellow-400 text-teal-900" : ""}
                    ${status === "partial" ? "bg-teal-600 text-white" : ""}
                    ${status === "empty" ? "bg-teal-800 border border-teal-700 text-teal-400" : ""}
                  `}
                >
                  <span>{day}</span>
                  {status === "complete" && <span className="text-[8px]">✓</span>}
                  {status === "partial" && <span className="text-[8px]">◑</span>}
                </button>
              );
            })}
          </div>

          {/* Légende */}
          <div className="flex gap-4 mt-4 justify-center text-xs text-teal-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> Complet
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-teal-600 inline-block" /> Partiel
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-teal-800 border border-teal-700 inline-block" /> Vide
            </span>
          </div>

          {/* Résumé global */}
          <div className="mt-5 bg-teal-800 border border-teal-700 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-yellow-400">
                {Object.values(history).filter((r) => r.accompli >= r.objectif && r.objectif > 0).length}
              </p>
              <p className="text-teal-400 text-xs mt-1">Jours complets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-300">
                {Object.values(history).reduce((acc, r) => acc + r.accompli, 0)}
              </p>
              <p className="text-teal-400 text-xs mt-1">Rakʿa totales</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-300">
                {Object.keys(history).filter((k) => (history[+k]?.accompli ?? 0) > 0).length}
              </p>
              <p className="text-teal-400 text-xs mt-1">Jours actifs</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-teal-950 border-t border-teal-800 py-4 px-6 text-center">
        <p className="text-gold-700 text-sm font-amiri text-yellow-700">بسم الله الرحمن الرحيم</p>
      </footer>
    </main>
  );
}