import "./global.css"
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://meu-blog.com"),
    title: {
        default: "Meu Blog com Next.js",
        template: "%s | Meu Blog",
    },
    description: "Um blog criado com Next.js, onde compartilho meus conhecimentos e experiências.",
    openGraph: {
        type: "website",
        title: "Meu Blog com Next.js",
        description: "Um blog criado com Next.js, onde compartilho meus conhecimentos e experiências.",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@seu_usuario",
    },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="pt-BR">
            <body>
                <header style={{ padding: 16}}>
                    <h1>Meu Blog</h1>
                    </header>
                <main style={{ padding: 16}}>{children}</main>
                <footer style={{ padding: 16, opacity: 0.7 }}>
                    © {new Date().getFullYear()} Meu Blog
                </footer>
            </body>
        </html>
    );
}

