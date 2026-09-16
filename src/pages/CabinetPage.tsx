import { About } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function CabinetPage() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="Le Cabinet"
        titleLine1="Cabinet d'Avocat"
        titleLine2={content.heroLastName}
        description="Une approche juridique rigoureuse, moderne et personnalisée, au service des entrepreneurs, des particuliers et des institutions."
      />
      <About />
    </>
  );
}
