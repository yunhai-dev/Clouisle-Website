import Link from 'next/link';

const localeRedirectScript = `
(() => {
  const preferred = navigator.language?.toLowerCase().startsWith('zh') ? '/zh/' : '/en/';
  window.location.replace(preferred);
})();
`;

export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <script dangerouslySetInnerHTML={{ __html: localeRedirectScript }} />
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Clouisle</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100">Choose your language</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Redirecting you automatically. If nothing happens, choose a language below.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href="/en/" className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-100 transition hover:border-white/20 hover:bg-white/5">
            English
          </Link>
          <Link href="/zh/" className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-100 transition hover:border-white/20 hover:bg-white/5">
            中文
          </Link>
        </div>
      </div>
    </main>
  );
}
