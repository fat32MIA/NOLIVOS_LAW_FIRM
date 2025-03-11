import { NextResponse } from "next/server"

// Tipos para las noticias
interface NewsItem {
  id: string
  title: string
  summary: string
  link: string
  published: string
  image_url?: string
  category?: string
  state?: string
  state_name?: string
  html_content?: string
}

// Estados de EE.UU.
const US_STATES = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
}

// Generar noticias de ejemplo para ICE
const generateMockIceNews = (count: number): NewsItem[] => {
  const news: NewsItem[] = []
  const states = Object.keys(US_STATES)

  for (let i = 0; i < count; i++) {
    const state = states[Math.floor(Math.random() * states.length)]
    news.push({
      id: `ice-${i}`,
      title: `ICE detiene a miembros de pandilla en operativo en ${US_STATES[state as keyof typeof US_STATES]}`,
      summary: `Agentes de ICE detuvieron a varios miembros de pandillas durante un operativo en ${US_STATES[state as keyof typeof US_STATES]}. La operación forma parte de los esfuerzos continuos para combatir la actividad criminal relacionada con pandillas.`,
      link: "https://www.ice.gov/news/releases/example",
      published: new Date(Date.now() - i * 86400000).toISOString(),
      image_url: "/placeholder.svg?height=200&width=300",
      state,
      state_name: US_STATES[state as keyof typeof US_STATES],
    })
  }

  return news
}

// Generar noticias de ejemplo para USCIS
const generateMockUscisNews = (count: number): NewsItem[] => {
  const news: NewsItem[] = []
  const categories = ["alert", "news"]

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    news.push({
      id: `uscis-${i}`,
      title:
        category === "alert"
          ? `Alerta: Cambios en el proceso de solicitud de ${i % 2 === 0 ? "asilo" : "naturalización"}`
          : `USCIS anuncia nuevas medidas para ${i % 2 === 0 ? "reducir tiempos de procesamiento" : "mejorar servicios en línea"}`,
      summary:
        category === "alert"
          ? `USCIS ha implementado cambios importantes en el proceso de solicitud que afectan a los solicitantes. Es fundamental que los solicitantes revisen los nuevos requisitos y procedimientos antes de presentar su solicitud.`
          : `USCIS ha anunciado nuevas medidas destinadas a mejorar la eficiencia y accesibilidad de sus servicios. Estas medidas incluyen actualizaciones tecnológicas y cambios en los procedimientos.`,
      link: "https://www.uscis.gov/news/alerts/example",
      published: new Date(Date.now() - i * 86400000).toISOString(),
      image_url: "/placeholder.svg?height=200&width=300",
      category,
    })
  }

  return news
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "all"
  const state = searchParams.get("state") || null
  const category = searchParams.get("category") || null
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

  let news: NewsItem[] = []

  if (type === "ice" || type === "all") {
    const iceNews = generateMockIceNews(type === "all" ? Math.floor(limit / 2) : limit)
    news = [...news, ...iceNews]
  }

  if (type === "uscis" || type === "all") {
    const uscisNews = generateMockUscisNews(type === "all" ? Math.floor(limit / 2) : limit)
    news = [...news, ...uscisNews]
  }

  // Aplicar filtros
  if (state) {
    news = news.filter((item) => item.state === state)
  }

  if (category) {
    news = news.filter((item) => item.category === category)
  }

  // Limitar resultados
  if (news.length > limit) {
    news = news.slice(0, limit)
  }

  return NextResponse.json({
    success: true,
    count: news.length,
    news,
  })
}

