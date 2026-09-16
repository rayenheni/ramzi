import { About } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function CabinetPage() {
  const { content, lang } = useContent();
  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'المكتب' : 'Le Cabinet'}
        titleLine1={lang === 'ar' ? 'مكتب المحاماة' : "Cabinet d'Avocat"}
        titleLine2={lang === 'ar' && content.heroLastNameAr ? content.heroLastNameAr : content.heroLastName}
        description={
          lang === 'ar'
            ? 'نهج قانوني صارم، حديث وشخصي، في خدمة رجال الأعمال، الأفراد والمؤسسات.'
            : 'Une approche juridique rigoureuse, moderne et personnalisée, au service des entrepreneurs, des particuliers et des institutions.'
        }
      />
      <About />
    </>
  );
}
