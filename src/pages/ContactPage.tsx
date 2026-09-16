import { Contact } from '../sections';
import { PageHeader } from '../components/shared';
import { useContent } from '../lib/content';

export default function ContactPage() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        titleLine1="Parlons de"
        titleLine2="votre dossier"
        description={content.contactIntro}
      />
      <Contact />
    </>
  );
}
