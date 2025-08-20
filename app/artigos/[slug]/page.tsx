import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArtigos, getArtigosbySlug } from "@/lib/artigos";
import { formatDate } from "@/lib/formatDate";
type Props = {params: {slug: string;};};

export async function generateStaticParams() {
  const artigos = await getAllArtigos();
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = await props; // ✅ await para resolver o promise
  const artigo = await getArtigosbySlug(params.slug);

  if (!artigo) {
    return { title: "Artigo não encontrado", description: "Este artigo não existe." };
  }

  const url = `https://my-blog.vercel.app/artigos/${artigo.slug}`;
  const ogImage = `/og-default.png`;

  return {
    title: artigo.title,
    description: artigo.description,
    openGraph: {
      type: "article",
      title: artigo.title,
      description: artigo.description,url,images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: artigo.title,
      description: artigo.description,
      images: [ogImage],
    },
  };
}

export default async function ArtigoPage(props: Props) {
  const { params } = await props; // ✅ await também aqui
  const artigo = await getArtigosbySlug(params.slug);

  if (!artigo) notFound();

  return (
    <article>
      <h1>{artigo.title}</h1>
      <p style={{ opacity: 0.8 }}>
        Por <strong>{artigo.author}</strong> em {formatDate(artigo.date)}
      </p>
      <div dangerouslySetInnerHTML={{ __html: artigo.content }} />
    </article>
  );
}
