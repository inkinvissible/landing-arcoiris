import Hero from "@/components/Hero"
import ScrollableCardSection from "@/components/ScrollableCardSection";
import {recommendedDestinations} from "@/utils/destinations-utils";
import FeaturedArticlesSection from "@/components/FeaturedArticlesSection";
import {mainStory, sideStories} from "@/utils/ofertas-utils";
import Callout from "@/components/Callout";
import {novedades} from "@/utils/novedades-utils";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import {client} from "@/lib/sanity";
import {novedadesQuery} from "@/lib/queries";
import {mapSanityNovedades} from "@/utils/transformNovedades";


export default async function Home() {
    const rawNovedades = await client.fetch(novedadesQuery);
    const novedadesData = mapSanityNovedades(rawNovedades);
    return (
        <>
            <Hero/>
            <div id="destino">
                <ScrollableCardSection
                    sectionTitle="Destinos Recomendados"
                    sectionSubtitle="Explora lugares increíbles que hemos seleccionado para ti."
                    cardsData={recommendedDestinations}
                    cardsToShow={4}
                    buttonText={"Creá tu viaje"}
                />
            </div>
            <div id="ofertas">
                <FeaturedArticlesSection
                    sectionTitle="Nuestras ofertas destacadas"
                    mainArticle={mainStory}
                    sideArticles={sideStories}
                />
            </div>

            <Callout/>
            <div id="novedades">
                <ScrollableCardSection
                    sectionTitle="Nuestras novedades"
                    sectionSubtitle="Descubre las últimas noticias y actualizaciones de nuestros destinos."
                    cardsData={novedadesData}
                    cardsToShow={4}
                    buttonText={"Quiero consultar"}
                />
            </div>
            <div id="sobre-nosotros">
                <About/>
            </div>
            <div id="galeria">
                <Gallery/>
            </div>
            <Footer/>

        </>
    )
}
