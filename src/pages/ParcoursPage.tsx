import { Experience, International } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function ParcoursPage() {
  const { content, lang } = useContent();
  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'المسار' : 'Parcours'}
        titleLine1={lang === 'ar' ? 'الخبرات' : 'Expériences'}
        titleLine2={lang === 'ar' ? '& الالتزامات' : '& engagements'}
        description={lang === 'ar' && content.experienceIntroAr ? content.experienceIntroAr : content.experienceIntro}
      />
      <Experience />
      <International />
    </>
  );
}
