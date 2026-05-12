export interface NoctemContent {
  hero_title: string
  hero_subtitle: string
  about_title: string
  about_heading: string
  about_description: string
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