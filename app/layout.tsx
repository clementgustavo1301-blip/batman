import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['700', '900'],
    variable: '--font-montserrat',
})

export const metadata: Metadata = {
    title: 'Batman Central | Detective Portfolio',
    description: 'A premium Dark Knight-inspired detective portfolio showcasing projects through villain case files and Batman equipment archives.',
    keywords: ['portfolio', 'developer', 'Batman', 'detective', 'interactive'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
            <body
                className="antialiased bg-[#0A0A0A] text-[#E8D5B5]"
                style={{ backgroundColor: '#0A0A0A', color: '#E8D5B5' }}
            >
                {children}
            </body>
        </html>
    )
}
