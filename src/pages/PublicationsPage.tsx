import { Publications, Clients } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function PublicationsPage() {
  const { content, lang } = useContent();
  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'الأعمال والتكريمات' : 'Travaux & Distinctions'}
        titleLine1={lang === 'ar' ? 'المنشورات' : 'Publications'}
        titleLine2={lang === 'ar' ? 'والمساهمات' : '& contributions'}
        description={
          (lang === 'ar' && content.publicationsIntroAr ? content.publicationsIntroAr : content.publicationsIntro) ||
          (lang === 'ar'
            ? 'مؤلفات، مقالات، جوائز ودراسات تحمل صوت المكتب في قضايا القانون والمجتمع.'
            : 'Ouvrages, articles, prix et policy briefs portant la voix du cabinet sur des sujets de droit et de société.')
        }
      />
      <Publications />
      <Clients />
    </>
  );
}
