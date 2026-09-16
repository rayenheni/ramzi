import { Practice } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function ExpertisesPage() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="Domaines d'intervention"
        titleLine1="Expertises"
        titleLine2="& pratique"
        description={content.practiceIntro}
      />
      <Practice />
    </>
  );
}
