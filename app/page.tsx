import Link from 'next/link';
import { getAllArtigos } from '../lib/artigos';
import { formatDate } from '../lib/formatDate';

export const revalidate = 60; 

export default async function HomePage() {
    const artigos = await getAllArtigos();

    return (
        <section>
            <h2>Artigos</h2>
            <ul style={{display : 'grid', gap: 16, padding: 0, listStyle: 'none'}}>
                {artigos.map((a) => (
                    <li key={a.slug} style={{border: '1px solid #eee', padding: 16, borderRadius: 8}}>
                        <h3>
                            <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
                        </h3>
                        <p style={{margin: "4px 0"}}>
                            Por <strong>{a.author}</strong> . {formatDate(a.date)}
                        </p>
                        <p style ={{margin: "4px 0"}}>{a.description}</p>
                        <p style ={{margin: "4px 0"}}>
                            <Link href={`/artigos/${a.slug}`}>Leia mais</Link>
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}