import type { Artigo } from "../types/Artigo";
import raw from "@/data/artigos.json";
import slugify from "slugify";

const artigos = raw as Artigo[];

export function slugFromtitle(title: string){
    return slugify(title, { lower: true, strict: true, locale: 'pt' });
}

export async function getAllArtigos(): Promise<(Artigo & { slug: string })[]>{
    return artigos.map((a) => ({...a, slug: slugFromtitle(a.title)}));
}

export async function getArtigosbySlug(slug:string) {
    const list = await getAllArtigos();
    return list.find((a) => a.slug === slug) ?? null;
    
}