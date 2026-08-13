import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects } from '../../../lib/projects'

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
        {project.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <Link className="map-link" href="/progetti">
          Torna ai progetti
        </Link>
      </section>
    </main>
  )
}
