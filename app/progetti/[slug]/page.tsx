import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProjectCarousel from '../../../components/project-carousel'
import { featuredProjectImages, getProject, projects } from '../../../lib/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({
  params,
}: PageProps<'/progetti/[slug]'>) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="page project-page">
      <section className="project-hero">
        <p className="eyebrow">{project.category}</p>
        <h1 className="project-title">{project.title}</h1>
      </section>

      <section className="project-detail-image">
        <img src={project.image} alt="" />
      </section>

      <section className="project-detail-content">
        <p>{project.content.map((paragraph) => (
    <span key={paragraph}>
      {paragraph}
      <br />
      <br />
    </span>
  ))}</p>

        <div className="project-media-block">
          <ProjectCarousel images={featuredProjectImages} />

          <div className="project-media-text">
            <p className="section-label">Archivio visivo</p>
            <p>
              Una selezione di immagini accompagna il progetto come traccia
              visiva: materiali, dettagli e atmosfere che ampliano il racconto
              oltre il testo.
            </p>
          </div>
        </div>

        <p className="project-closing-text">
          Il progetto prosegue come spazio di relazione tra immagini, materiali
          e domande aperte. Ogni elemento contribuisce a costruire un racconto
          che resta disponibile a nuove letture, attraversamenti e forme di
          partecipazione.
        </p>

        <Link className="program-archive-action" href="/progetti">
          Torna ai progetti
        </Link>
      </section>
    </main>
  )
}
