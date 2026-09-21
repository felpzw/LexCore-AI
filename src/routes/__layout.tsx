import type { JSX } from 'react'
import { Link, TuonoScripts } from 'tuono' // Import TuonoScripts
import type { TuonoLayoutProps } from 'tuono'

import '../styles/global.css' // Importa o CSS global

export default function RootLayout({ children }: TuonoLayoutProps): JSX.Element {
  // Simple console logs for button testing, as requested.
  // These will appear in the browser's developer console when the links are clicked.
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    console.log(`Navegando para: ${path}`);
    // If you need to prevent default navigation for some reason, uncomment the line below.
    // e.preventDefault();
  };

  return (
    <html lang="pt">
      <head>
        <title>LexCore AI</title>
      </head>
      <body className="dashboard-body">
        <aside className="sidebar">
          <h1 className="sidebar-title">📚 LexCore AI</h1>
          <nav className="sidebar-nav">
            <Link href="/casos" className="sidebar-link" onClick={(e) => handleLinkClick(e, '/casos')}>
              📁 Casos Jurídicos
            </Link>
            <Link href="/clientes" className="sidebar-link" onClick={(e) => handleLinkClick(e, '/clientes')}>
              🧑 Clientes
            </Link>
            <Link href="/documentos" className="sidebar-link" onClick={(e) => handleLinkClick(e, '/documentos')}>
              📄 Documentos
            </Link>
            <Link href="/ia-integrada" className="sidebar-link" onClick={(e) => handleLinkClick(e, '/ia-integrada')}>
              🤖 IA Integrada
            </Link>
            <Link href="/relatorios" className="sidebar-link" onClick={(e) => handleLinkClick(e, '/relatorios')}>
              📊 Relatórios
            </Link>
            <Link href="/configuracoes" className="sidebar-link" onClick={(e) => handleLinkClick(e, '/configuracoes')}>
              ⚙️ Configurações
            </Link>
          </nav>
        </aside>
        <main className="main-content">{children}</main>
        <TuonoScripts /> {/* This is the crucial addition */}
      </body>
    </html>
  )
}
