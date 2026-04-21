import { useInViewAnimation } from '../hooks/useInViewAnimation';

const projects = [
  {
    name: 'evr',
    description: 'From idea to millions raised for a web3 AI product',
    image: 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  },
  {
    name: 'Automation Machines',
    description: 'Streamlining industrial automation processes',
    image: 'https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif',
  },
  {
    name: 'xPortfolio',
    description: 'Modern portfolio management platform',
    image: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  },
];

function ProjectItem({ name, description, image }: (typeof projects)[number]) {
  const { ref, inView } = useInViewAnimation<HTMLElement>();
  return (
    <article ref={ref} className="space-y-6">
      <div className={`ml-20 md:ml-28 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h4 className="font-mondwest text-2xl font-semibold text-[#051A24] md:text-3xl">{name}</h4>
        <p className="mt-2 text-sm text-[#051A24]/70 md:text-base">{description}</p>
      </div>
      <img src={image} alt={name} className="w-full rounded-2xl object-cover shadow-lg" />
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-12">
      <div className="flex flex-col gap-16 md:gap-20">
        {projects.map((project) => (
          <ProjectItem key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
