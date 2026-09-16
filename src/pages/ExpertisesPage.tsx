import { Practice } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function ExpertisesPage() {
  const { content, lang } = useContent();
  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'مجالات التدخل' : "Domaines d'intervention"}
        titleLine1={lang === 'ar' ? 'الخبرات' : 'Expertises'}
        titleLine2={lang === 'ar' ? '& الممارسة' : '& pratique'}
        description={lang === 'ar' && content.practiceIntroAr ? content.practiceIntroAr : content.practiceIntro}
      />
      <Practice />
    </>
  );
}
