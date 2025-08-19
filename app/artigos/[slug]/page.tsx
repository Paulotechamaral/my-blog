import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArtigos, getArtigosbySlug } from "@/lib/artigos";
import { formatDate } from "@/lib/formatDate";

type Props = { params: { slug: string } };

// --- 10.1: SSG ---
export async function generateStaticParams() {
  const artigos = await getAllArtigos();
  return artigos.map((a) => ({ slug: a.slug }));
}

// --- 10.2: SEO dinâmico ---
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = await props; // ✅ aguarda os params
  const artigo = await getArtigosbySlug(params.slug);

  if (!artigo) {
    return {
      title: "Artigo não encontrado",
      description: "Este artigo não existe.",
    };
  }

  const url = `https://my-blog.vercel.app/artigos/${artigo.slug}`;
  const ogImage = `/og-default.png`;

  return {
    title: artigo.title,
    description: artigo.description,
    openGraph: {
      type: "article",
      title: artigo.title,
      description: artigo.description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: artigo.title,
      description: artigo.description,
      images: [ogImage],
    },
  };
}


// --- 10.3: Página do artigo ---
export default async function ArtigoPage(props: Props) {
  // aguarda o params
  const { params } = await props;
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

