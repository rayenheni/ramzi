import { Publications, Clients } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function PublicationsPage() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="Travaux & Distinctions"
        titleLine1="Publications"
        titleLine2="& contributions"
        description={
          content.publicationsIntro ||
          'Ouvrages, articles, prix et policy briefs portant la voix du cabinet sur des sujets de droit et de société.'
        }
      />
      <Publications />
      <Clients />
    </>
  );
}
