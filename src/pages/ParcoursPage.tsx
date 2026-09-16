import { Experience, International } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function ParcoursPage() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="Parcours"
        titleLine1="Expériences"
        titleLine2="& engagements"
        description={content.experienceIntro}
      />
      <Experience />
      <International />
    </>
  );
}
