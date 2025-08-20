import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArtigos, getArtigosbySlug } from "@/lib/artigos";
import { formatDate } from "@/lib/formatDate";

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // <- precisa aguardar o params
  const artigo = await getArtigosbySlug(slug);

  if (!artigo) return notFound();

  return (
    <article>
      <h1>{artigo.title}</h1>
      <p>Por {artigo.author} em {formatDate(artigo.date)}</p>
      <div dangerouslySetInnerHTML={{ __html: artigo.content }} />
    </article>
  );
}

export async function generateStaticParams() {
  const artigos = await getAllArtigos();
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigosbySlug(slug);

  if (!artigo) return { title: "Artigo não encontrado" };

  return {
    title: artigo.title,
    description: artigo.description || artigo.content.slice(0, 150)
  };
}
