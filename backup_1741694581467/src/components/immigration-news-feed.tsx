"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, ExternalLink, RefreshCw, Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export function ImmigrationNewsFeed() {
  const [newsTab, setNewsTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [iceNews, setIceNews] = useState<NewsItem[]>([])
  const [uscisNews, setUscisNews] = useState<NewsItem[]>([])
  const [stateFilter, setStateFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [reportUrl, setReportUrl] = useState<string | null>(null)

  // Estados de EE.UU. para filtrar noticias de ICE
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

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchNews()
  }, [])

  // Función para cargar noticias
  const fetchNews = async () => {
    setIsLoading(true)
    try {
      // Cargar todas las noticias
      const allResponse = await fetch("/api/immigration-news?type=all&limit=20")
      const allData = await allResponse.json()

      // Cargar noticias de ICE
      const iceResponse = await fetch("/api/immigration-news?type=ice&limit=10")
      const iceData = await iceResponse.json()

      // Cargar noticias de USCIS
      const uscisResponse = await fetch("/api/immigration-news?type=uscis&limit=10")
      const uscisData = await uscisResponse.json()

      setAllNews(allData.news || [])
      setIceNews(iceData.news || [])
      setUscisNews(uscisData.news || [])
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para generar un reporte
  const generateReport = async () => {
    setIsGeneratingReport(true)
    try {
      // En un entorno real, esta sería una llamada a tu API para generar el reporte
      // Por ahora, simulamos un reporte
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular URL de reporte
      setReportUrl("reporte_noticias_inmigracion_20240311.html")
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGeneratingReport(false)
    }
  }

  // Filtrar noticias según los filtros seleccionados
  const getFilteredNews = () => {
    let filteredNews: NewsItem[] = []

    switch (newsTab) {
      case "ice":
        filteredNews = iceNews
        if (stateFilter !== "all") {
          filteredNews = filteredNews.filter((news) => news.state === stateFilter)
        }
        break
      case "uscis":
        filteredNews = uscisNews
        if (categoryFilter !== "all") {
          filteredNews = filteredNews.filter((news) => news.category === categoryFilter)
        }
        break
      default:
        filteredNews = allNews
        break
    }

    return filteredNews
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Noticias de Inmigración</CardTitle>
            <CardDescription>Últimas noticias y alertas de inmigración de fuentes oficiales</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchNews} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualizar
                </>
              )}
            </Button>
            <Button size="sm" onClick={generateReport} disabled={isGeneratingReport || isLoading}>
              {isGeneratingReport ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generar Reporte
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <Tabs defaultValue="all" value={newsTab} onValueChange={setNewsTab}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="ice">ICE</TabsTrigger>
              <TabsTrigger value="uscis">USCIS</TabsTrigger>
            </TabsList>

            {/* Filtros específicos según la pestaña seleccionada */}
            {newsTab === "ice" && (
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    {Object.entries(US_STATES).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {newsTab === "uscis" && (
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="alert">Alertas</SelectItem>
                    <SelectItem value="news">Noticias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <TabsContent value="all" className="m-0">
            {renderNewsContent(getFilteredNews(), isLoading)}
          </TabsContent>

          <TabsContent value="ice" className="m-0">
            {renderNewsContent(getFilteredNews(), isLoading)}
          </TabsContent>

          <TabsContent value="uscis" className="m-0">
            {renderNewsContent(getFilteredNews(), isLoading)}
          </TabsContent>
        </Tabs>
      </CardContent>

      {reportUrl && (
        <CardFooter className="pt-2 border-t">
          <div className="w-full flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Reporte generado exitosamente</span>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Descargar Reporte
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

// Función auxiliar para renderizar el contenido de noticias
function renderNewsContent(news: NewsItem[], isLoading: boolean) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-[100px] w-[100px] rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontraron noticias con los filtros seleccionados</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 h-[150px] relative">
              <img
                src={item.image_url || "/placeholder.svg?height=150&width=150"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                {item.category && (
                  <Badge variant={item.category === "alert" ? "destructive" : "secondary"}>
                    {item.category === "alert" ? "Alerta" : "Noticia"}
                  </Badge>
                )}
                {item.state && <Badge variant="outline">{item.state_name}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(item.published).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm mb-4">{item.summary}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                Leer más <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

