"use client";

import Link from "next/link";
import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function JuzError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-teal-900 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Impossible de charger le Juz
        </h1>
        <p className="text-teal-300 text-sm mb-2 leading-relaxed">
          Une erreur s&apos;est produite lors du chargement du texte coranique.
          Vérifiez votre connexion internet et réessayez.
        </p>
        {error.message && (
          <p className="text-teal-500 text-xs mb-6 font-mono bg-teal-950 rounded-lg px-3 py-2">
            {error.message}
          </p>
        )}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="bg-gold-500 hover:bg-gold-400 text-teal-950 font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="text-teal-400 hover:text-gold-400 transition-colors text-sm"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
