import type { JSX } from 'react'
import type { TuonoRouteProps } from 'tuono'

interface IndexProps {
  api_status: string,
  db_status: string
}

export default function IndexPage({
  data,
  isLoading,
}: TuonoRouteProps<IndexProps>): JSX.Element {

  // Removed useEffect and useState for API status fetch as requested.
  // The data for api_status and db_status now comes directly from the props.

  if (isLoading) {
    return <div className="loading-container"><h1>Carregando...</h1></div>
  }

  // Debug log for the CTA button
  const handleCtaClick = () => {
    console.log('Botão "Comece Agora!" clicado!');
  };

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <h1 className="hero-title">Bem-vindo ao LexCore AI</h1>
        <h2 className="hero-subtitle">{}</h2> {/* Keep this if there's a dynamic subtitle expected */}
        <p className="hero-description">
          O LexCore AI é uma plataforma inovadora que utiliza inteligência artificial para auxiliar profissionais e estudantes do direito.
          Descubra como a tecnologia pode simplificar pesquisas jurídicas, automatizar tarefas e oferecer insights valiosos para o seu dia a dia.
        </p>
        <button className="cta-button" onClick={handleCtaClick}>Comece Agora!</button>
        {/* Displaying API and DB status from props */}
        <div>API: {data.api_status}   DB: {data.db_status}</div>
      </section>

      <section className="features-section">
        <h3 className="section-title">Nossas Principais Funcionalidades</h3>
        <div className="feature-cards-grid">
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h4 className="feature-card-title">Pesquisa Jurídica Inteligente</h4>
            <p className="feature-card-description">Acelere suas pesquisas com nossa IA que analisa documentos complexos.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">✍️</span>
            <h4 className="feature-card-title">Automação de Documentos</h4>
            <p className="feature-card-description">Gere petições e contratos com eficiência e precisão.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💡</span>
            <h4 className="feature-card-title">Insights e Análises</h4>
            <p className="feature-card-description">Obtenha dados estratégicos para tomar decisões mais informadas.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h3 className="section-title">LexCore AI em Números</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <p className="stat-label">Documentos Processados</p>
          </div>
          <div className="stat-item">
            <span className="stat-number">200+</span>
            <p className="stat-label">Usuários Ativos</p>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <p className="stat-label">Satisfação do Cliente</p>
          </div>
        </div>
      </section>
    </div>
  )
}
