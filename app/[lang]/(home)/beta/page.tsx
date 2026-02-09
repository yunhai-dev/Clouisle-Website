import type { Metadata } from 'next';

interface BetaPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: BetaPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === 'zh';

  return {
    title: isZh ? '申请内测' : 'Apply for Beta',
    description: isZh
      ? '申请加入云屿内测计划'
      : 'Apply to join the Clouisle beta program',
  };
}

export default async function BetaPage({ params }: BetaPageProps) {
  const { lang } = await params;
  const isZh = lang === 'zh';

  return (
    <div className="flex min-h-screen flex-col items-center pt-20">
      <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-12 text-center">
        <h1 className="cl-gradient-heading-accent text-4xl font-semibold leading-tight lg:text-5xl">
          {isZh ? '申请内测' : 'Apply for Beta'}
        </h1>
        <p className="mt-4 text-base text-zinc-400">
          {isZh
            ? '填写以下表单，申请加入云屿内测计划'
            : 'Fill out the form below to apply for the Clouisle beta program'}
        </p>
      </div>
      <div className="w-full flex-1 px-4 pb-12">
        <iframe
          src="https://kcn74mk3dg4m.feishu.cn/share/base/form/shrcncjTIOqCG0LHs5VS7Y1fuGc"
          className="mx-auto block h-[80vh] w-full max-w-4xl rounded-xl border border-white/10"
          style={{ background: 'rgba(255,255,255,0.03)' }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
