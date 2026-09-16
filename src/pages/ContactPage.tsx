import { Contact } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function ContactPage() {
  const { content, lang } = useContent();
  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'اتصل بنا' : 'Contact'}
        titleLine1={lang === 'ar' ? 'لنناقش' : 'Parlons de'}
        titleLine2={lang === 'ar' ? 'ملفكم' : 'votre dossier'}
        description={lang === 'ar' && content.contactIntroAr ? content.contactIntroAr : content.contactIntro}
      />
      <Contact />
    </>
  );
}
