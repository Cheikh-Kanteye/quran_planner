import Link from "next/link";
import { PRAYERS, FREQUENCY_LABELS } from "@/lib/quran-data";

const FREQUENCIES = [1, 2, 3, 4, 5];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-teal-900 text-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-teal-950 border-b border-teal-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gold-400 text-3xl select-none">☽</span>
          <div>
            <h1 className="text-xl font-bold text-gold-400 leading-tight">
              Coran Ramadan
            </h1>
            <p className="text-teal-300 text-xs">Plan de lecture complet</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-teal-300 text-sm font-amiri">رمضان كريم</p>
          <p className="text-teal-400 text-xs">Ramadan Mubarak</p>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-10 text-center max-w-3xl mx-auto">
        <div className="text-gold-400 text-5xl mb-4 select-none">✦</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Lisez le Coran en entier
          <br />
          <span className="text-gold-400">pendant le Ramadan</span>
        </h2>
        <p className="text-teal-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Choisissez votre rythme de lecture. L&apos;application vous guidera
          jour après jour, prière après prière, avec le texte arabe et sa
          traduction française pour méditer et comprendre.
        </p>
      </section>

      {/* ✨ Carte Nafila du jour */}
      <section className="px-4 sm:px-8 pb-8 max-w-4xl mx-auto w-full">
        <Link href="/nafila">
          <div className="group relative overflow-hidden rounded-2xl border border-teal-600 bg-teal-800 hover:bg-teal-700 transition-all duration-300 shadow-xl cursor-pointer">
            {/* Décoration fond */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-600 text-8xl select-none pointer-events-none group-hover:text-teal-500 transition-colors">
              ☽
            </div>

            <div className="relative z-10 flex items-center gap-5 px-6 py-5">
              {/* Icône */}
              <div className="bg-teal-950 border border-teal-600 rounded-xl w-14 h-14 flex items-center justify-center text-2xl flex-shrink-0 group-hover:border-gold-400 transition-colors">
                🌙
              </div>

              {/* Texte */}
              <div className="flex-1">
                <p className="text-xs text-teal-400 uppercase tracking-widest font-semibold mb-1">
                  Prière volontaire
                </p>
                <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                  Nafila du jour
                </h3>
                <p className="text-teal-300 text-sm mt-1">
                  Fixez votre objectif de rakʿa et suivez votre progression
                </p>
              </div>

              {/* Flèche */}
              <div className="text-teal-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all text-xl flex-shrink-0">
                →
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Reading Frequency Grid */}
      <section className="px-4 sm:px-8 pb-12 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-teal-700" />
          <h3 className="text-gold-400 text-sm font-semibold uppercase tracking-widest">
            Choisissez votre fréquence
          </h3>
          <div className="h-px flex-1 bg-teal-700" />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-teal-700 shadow-2xl">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="bg-teal-950">
                <th className="px-4 py-4 text-left text-teal-400 text-xs font-semibold uppercase tracking-wider w-36">
                  <span className="block leading-tight">Nombre</span>
                  <span className="block leading-tight">de lecture</span>
                </th>
                {PRAYERS.map((prayer) => (
                  <th
                    key={prayer}
                    className="px-4 py-4 text-center text-gold-400 font-bold text-base"
                  >
                    {prayer}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FREQUENCIES.map((freq, idx) => {
                const pages = freq * 4;
                return (
                  <tr
                    key={freq}
                    className={`group transition-colors cursor-pointer ${
                      idx % 2 === 0 ? "bg-teal-800" : "bg-teal-900"
                    } hover:bg-teal-600`}
                  >
                    <td className="px-4 py-5 border-t border-teal-700">
                      <Link
                        href={`/plan/${freq}`}
                        className="block font-semibold text-teal-100 group-hover:text-white transition-colors"
                      >
                        {FREQUENCY_LABELS[freq]}
                      </Link>
                    </td>
                    {PRAYERS.map((prayer) => (
                      <td
                        key={prayer}
                        className="px-4 py-5 text-center border-t border-teal-700"
                      >
                        <Link
                          href={`/plan/${freq}`}
                          className="block group-hover:scale-105 transition-transform"
                        >
                          <span className="text-gold-400 font-bold text-2xl block leading-none">
                            {pages}
                          </span>
                          <span className="text-teal-300 text-xs mt-1 block">
                            pages
                          </span>
                        </Link>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-center text-teal-400 text-sm mt-5">
          Cliquez sur une ligne pour voir votre plan de lecture sur 30 jours
        </p>
      </section>

      {/* How it works */}
      <section className="px-6 pb-16 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-teal-700" />
          <h3 className="text-gold-400 text-sm font-semibold uppercase tracking-widest">
            Comment ça fonctionne
          </h3>
          <div className="h-px flex-1 bg-teal-700" />
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: "📖",
              title: "Choisissez votre rythme",
              desc: "Sélectionnez combien de fois vous souhaitez lire le Coran pendant le Ramadan (1 à 5 fois).",
            },
            {
              icon: "🗓️",
              title: "Suivez le plan 30 jours",
              desc: "Chaque jour correspond à un Juz avec 5 sessions de prière pour répartir votre lecture.",
            },
            {
              icon: "🌙",
              title: "Méditez et comprenez",
              desc: "Lisez avec le texte arabe et sa traduction française pour approfondir votre compréhension.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-teal-800 border border-teal-700 rounded-xl p-5 flex flex-col gap-3"
            >
              <span className="text-3xl">{icon}</span>
              <h4 className="text-gold-300 font-semibold text-base">{title}</h4>
              <p className="text-teal-200 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-teal-950 border-t border-teal-800 py-6 px-6 text-center">
        <p className="text-teal-500 text-xs">
          Textes fournis par{" "}
          <span className="text-teal-400">alquran.cloud</span> · Traduction
          française de Muhammad Hamidullah
        </p>
        <p className="text-gold-700 text-sm mt-1 font-amiri">
          بسم الله الرحمن الرحيم
        </p>
      </footer>
    </main>
  );
}