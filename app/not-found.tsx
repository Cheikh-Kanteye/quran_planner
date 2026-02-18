import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-teal-900 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-gold-400 text-8xl font-bold mb-4 select-none">
          ☽
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Page introuvable</h1>
        <p className="text-teal-300 text-sm mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="bg-gold-500 hover:bg-gold-400 text-teal-950 font-semibold px-6 py-3 rounded-xl transition-colors inline-block"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
