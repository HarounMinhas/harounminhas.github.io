import ReactMarkdown from 'react-markdown';

type ProjectMarkdownSectionProps = {
  title: string;
  description?: string;
  content: string;
};

const ProjectMarkdownSection = ({ title, description, content }: ProjectMarkdownSectionProps) => {
  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="space-y-2 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description ? <p className="text-sm text-gray-600">{description}</p> : null}
      </div>
      <article className="prose prose-slate max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </section>
  );
};

export default ProjectMarkdownSection;
