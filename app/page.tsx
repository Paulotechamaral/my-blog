import slugify from "slugify";
import Link from "next/link";
import { getAllArtigos } from "@/lib/artigos";
import { formatDate } from "@/lib/formatDate";

export default async function HomePage() {
  const artigos = await getAllArtigos();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {artigos.map((a) => {
          const slug = slugify(a.slug, { lower: true, strict: true }); 
          return (
            <li key={slug}>
              <Link href={`/artigos/${slug}`}>
                {a.title} - {formatDate(a.date)}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
