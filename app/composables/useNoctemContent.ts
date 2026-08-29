export interface PlanFeature {
  feature_text: string
}

export interface PlanCard {
  plan_title: string
  plan_description: string
  plan_features: PlanFeature[]
}

export interface ClientLogo {
  url: string
  alt?: string
  file_name?: string
}

export interface NoctemContent {
  hero_title: string
  hero_subtitle: string
  about_title: string
  about_heading: string
  about_description: string
  about_images?: string[]
  stats_years: string
  stats_projects: string
  stats_island: string
  services_title: string
  service1_title: string
  service1_description: string
  service2_title: string
  service2_description: string
  service3_title: string
  service3_description: string
  service4_title: string
  service4_description: string
  clients_title: string
  clients_heading: string
  clients_logos?: ClientLogo[]
  plans_title: string
  plans_heading: string
  plans_description: string
  plans_cards: PlanCard[]
  contact_title: string
  contact_description: string
  contact_email: string
  contact_location: string
  contact_social: string
}

const defaultContent: NoctemContent = {
  hero_title: 'Noctem Studio',
  hero_subtitle: 'Estudio profesional de content creators',
  about_title: 'Nosotros',
  about_heading: 'El arte de <strong>ver</strong>',
  about_description: 'Nacido en las horas silenciosas entre el atardecer y el amanecer, Noctem es un estudio de fotografía enraizado en la belleza salvaje de Mallorca. Nos inspiramos en la filosofía japonesa del <em>wabi-sabi</em> — encontrar la perfección en la imperfección, la belleza en lo efímero.\n\nCada encuadre es una meditación. Cada sombra, una historia. No solo capturamos momentos — honramos el espacio que ocupan.',
  stats_years: '8+',
  stats_projects: '200+',
  stats_island: '島',
  services_title: 'Lo que <strong>ofrecemos</strong>',
  service1_title: 'Sesiones de Retrato',
  service1_description: 'Retratos íntimos y dirigidos que revelan el paisaje interior del sujeto. En estudio o en localización por toda Mallorca.',
  service2_title: 'Bodas y Elopements',
  service2_description: 'Documentando historias de amor con contención y poesía. Desde fugas silenciosas en la Tramuntana hasta celebraciones completas.',
  service3_title: 'Editorial y Comercial',
  service3_description: 'Narrativa de marca a través de una lente con intención. Moda, producto y lifestyle con precisión editorial.',
  service4_title: 'Impresiones de Arte',
  service4_description: 'Ediciones limitadas de nuestra serie personal. Cada pieza está firmada a mano y numerada en papel de archivo.',
  clients_title: 'Clientes',
  clients_heading: 'Marcas que <strong>confían</strong> en nosotros',
  clients_logos: [],
  plans_title: 'Producción de contenido <strong>audiovisual</strong>',
  plans_heading: 'Packs mensuales',
  plans_description: 'Fotografía, vídeo y reels para comunicación digital. Cada pack incluye briefing previo, producción, postproducción y entrega optimizada para redes sociales y web.',
  plans_cards: [
    {
      plan_title: 'Pack Bajo — Contenido Base',
      plan_description: 'Para negocios que quieren empezar con contenido profesional mensual sin asumir una producción intensiva.',
      plan_features: [
        { feature_text: 'Briefing previo al shooting para definir objetivos y prioridades' },
        { feature_text: '1 shooting mensual de hasta 6 horas' },
        { feature_text: 'Fotografía profesional y vídeo vertical para redes sociales' },
        { feature_text: 'Selección y edición de hasta 20 fotografías' },
        { feature_text: '1 reel vertical editado de 15 a 40 segundos' },
        { feature_text: '1 reel vertical sencillo optimizado para redes sociales' },
        { feature_text: 'Grafismos adaptados a la marca: logotipo, textos y subtítulos' },
        { feature_text: '1 ronda de modificaciones incluida' },
      ],
    },
    {
      plan_title: 'Pack Normal — Contenido Pro',
      plan_description: 'Opción recomendada para empresas que necesitan constancia, variedad visual y contenido suficiente para publicar durante el mes.',
      plan_features: [
        { feature_text: 'Briefing previo a cada shooting' },
        { feature_text: '2 shootings mensuales de hasta 6 horas cada uno' },
        { feature_text: 'Planificación previa de contenidos a grabar' },
        { feature_text: 'Fotografía profesional y contenido videográfico' },
        { feature_text: 'Selección y edición de hasta 35 fotografías' },
        { feature_text: '1 reel vertical editado de 15 a 50 segundos' },
        { feature_text: '3 reels verticales sencillos optimizados para redes sociales' },
        { feature_text: 'Grafismos de marca y 1 ronda de modificaciones' },
      ],
    },
    {
      plan_title: 'Pack Alto — Contenido Premium',
      plan_description: 'Para marcas que necesitan mayor volumen, más planificación y una imagen mensual más completa.',
      plan_features: [
        { feature_text: 'Briefing previo y reunión mensual de planificación creativa' },
        { feature_text: '2 shootings mensuales de hasta 6 horas cada uno' },
        { feature_text: 'Fotografía profesional y vídeo con enfoque comercial' },
        { feature_text: 'Recursos para reels, anuncios, stories, web y comunicación corporativa' },
        { feature_text: 'Selección y edición de hasta 50 fotografías' },
        { feature_text: '2 reels verticales editados de 15 a 60 segundos' },
        { feature_text: '2 reels verticales sencillos optimizados para redes sociales' },
        { feature_text: 'Mini calendario mensual orientativo de publicación' },
        { feature_text: '2 rondas de modificaciones incluidas' },
      ],
    },
  ],
  contact_title: 'Creemos <strong>juntos</strong>',
  contact_description: 'Con base en Mallorca, disponibles en todo el mundo. Aceptamos un número limitado de proyectos cada temporada para garantizar la profundidad de atención que cada historia merece.',
  contact_email: 'mamadouxph@gmail.com',
  contact_location: 'Palma de Mallorca, España',
  contact_social: '@noctem.st'
}

export const useNoctemContent = async () => {
  const config = useRuntimeConfig()
  
  try {
    const data = await $fetch<NoctemContent>(`${config.public.apiEndpoint}/noctem`)
    return { data, error: null }
  } catch (err) {
    console.warn('Failed to fetch noctem content, using defaults')
    return { data: defaultContent, error: err }
  }
}

export const useNoctemContentSync = () => {
  return defaultContent
}