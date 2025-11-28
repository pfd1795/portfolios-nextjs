'use client';
import Link from 'next/link';
import Image from 'next/image';
// Hooks
import { useClipboard } from '@/libs/hooks/useClipboard';
import { useThemeController } from '@/libs/hooks/useThemeController';
// Icons
import { GitHubIcon, GmailIcon, LinkedInIcon } from '@/utils/icons';
// Pictures
import photoProfile from '@/utils/images/profile.png';
// Lang
import dataLeng from '@/lang/lang-es.json';
import { Button } from '@/components/common/Button';

// &quot; = ''

export default function Home() {
  const { tones } = useThemeController();
  const { copied, copyToClipboard } = useClipboard();

  const projects = [
    {
      id: 1,
      title: "CRUD tareas",
      description: "Aplicación para crear, leer, actualizar y eliminar datos de tareas. Ideal para aprender manejo de estado y formularios.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
      tech: ["React", "Next.js", "Tailwind CSS"],
      link: "/projects"
    },
    {
      id: 2,
      title: "Juego de Memoria",
      description: "Un divertido juego para ejercitar la memoria, usando componentes dinámicos y lógica de juego en React.",
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=500&fit=crop",
      tech: ["React", "Next.js", "Tailwind CSS"],
      link: "/memory-game"
    }
  ];

  return (
    <>
      <section className="space-y-4">
        <p className='text-stone-200'>
          <strong className="text-5xl text-nowrap pl-4 md:pl-10 mr-2">{dataLeng.HomePage.intro.welcomeMessage}</strong>
          <br className="md:hidden" />
          <span className="text-2xl text-nowrap">{dataLeng.HomePage.intro.introText}</span>
        </p>

        <div className="px-4">
          <figure className={`${tones.bgColor.dark} outline-2 ${tones.outlineColor.normal} float-right md:float-left w-40 h-40 md:h-48 md:w-48 rounded-full m-2 md:m-4 overflow-hidden`}>
            <Image src={photoProfile} alt="photo profile" />
          </figure>

          <div className="space-y-6">
            <p className="text-stone-200">
              <span className="ml-4"></span>
              {dataLeng.HomePage.intro.description.greeting} <strong className="text-xl italic">{dataLeng.HomePage.intro.description.name}</strong>{dataLeng.HomePage.intro.description.role}
            </p>

            <p>En esta web encontrarás una colección de proyectos y aplicaciones desarrolladas específicamente con el ecosistema <strong className="text-xl italic">React, Next.js</strong> y <strong className="text-xl italic">TailwindCSS</strong>.</p>

            <p>Aquí encontrarás desde aplicaciones prácticas hasta proyectos creativos que demuestran diferentes aspectos del desarrollo frontend.</p>

            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">React</div>
                <div className="text-sm text-stone-300">Library</div>
              </div>

              <div className="text-stone-300 text-3xl">+</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Next.js</div>
                <div className="text-sm text-stone-300">Framework</div>
              </div>

              <div className="text-stone-300 text-3xl">+</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">Tailwind</div>
                <div className="text-sm text-stone-300">CSS</div>
              </div>
            </div>

            <hr className={`border ${tones.borderColor.normal} rounded-xl`} />

            <div className="flex justify-center md:justify-end pt-1 gap-x-10">
              <a
                href="https://pfd1795.github.io/pfd1795/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 ${tones.bgColor.normal} hover:${tones.bgColor.dark} px-4 py-2 rounded-xl font-bold transition-all transform hover:scale-105`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Visitar Portfolio</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>

              <Link href="https://www.linkedin.com/in/pfd-dev/" title="LinkedIn" target="_blank" className={`bg-white text-sky-600 hover:text-sky-500 hover:underline border-4 border-white hover:${tones.borderColor.normal} rounded-xl`}>
                <LinkedInIcon width={48} height={48} />
              </Link>

              <div className="relative inline-block">
                <div
                  onClick={() => copyToClipboard("pfd1795@gmail.com")}
                  title="Copiar correo"
                  className={`bg-white text-sky-600 hover:text-sky-500 hover:underline border-4 border-white hover:${tones.borderColor.normal} rounded-xl cursor-pointer`}
                >
                  <GmailIcon width={48} height={48} />
                </div>

                {copied &&
                  <span className="bg-green-600 text-stone-200 absolute top-full mt-1 left-1/2 transform -translate-x-1/2 rounded-xl py-1 px-2 text-nowrap">
                    ¡Correo copiado!
                  </span>
                }
              </div>

              <Link href="https://github.com/pfd1795" title="GitHub" target="_blank" className={`bg-white text-sky-600 hover:text-sky-500 hover:underline border-4 border-white hover:${tones.borderColor.normal} rounded-xl`}>
                <GitHubIcon width={48} height={48} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className=' mt-20'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Proyectos Destacados
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Explora mis aplicaciones interactivas que demuestran diferentes capacidades y patrones de desarrollo.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`group bg-stone-800 rounded-xl overflow-hidden border-2 ${tones.borderColor.normal} hover:${tones.borderColor.light} transition-all duration-300`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/20"></div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-stone-300 leading-relaxed">
                    {project.description}
                  </p>

                  <Link href={project.link}>
                    <Button
                      title='Ver Proyecto'
                      text='Ver Proyecto'
                      rightIcon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      }
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
