import Link from 'next/link'
import { projects } from '../../lib/projects'

export default function ProgettiPage() {
  return (
    <main className="page projects-page">
      <section className="projects-hero">
        <p className="eyebrow">Progetti</p>
        <h1 className="projects-title">
          Mostre, incontri
          <br />
          e residenze.
        </h1>
      </section>

      <section className="projects-list">
        {projects.map((project) => (
          <Link
            className="project-preview"
            href={`/progetti/${project.slug}`}
            key={project.slug}
          >
            <span className="project-preview-category">{project.category}</span>
            <div className="project-preview-row">
              <div className="project-preview-image">
                <img src={project.image} alt="" />
              </div>
              <h2>{project.title}</h2>
              <p>{project.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
