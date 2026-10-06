import { notFound } from 'next/navigation'
import LegalDocument from '@/components/dashboard/legal/legal-document'
import { getLegalDocument, LEGAL_DOCUMENTS } from '@/components/dashboard/legal/content'

export function generateStaticParams() {
  return LEGAL_DOCUMENTS.map((doc) => ({ slug: doc.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLegalDocument(slug)

  if (!doc) notFound()

  return <LegalDocument doc={doc} />
}
