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

export default function Home() {
    return (
        <>
            <Hero/>
            <ScrollableCardSection
                sectionTitle="Destinos Recomendados"
                sectionSubtitle="Explora lugares increíbles que hemos seleccionado para ti."
                cardsData={recommendedDestinations}
                cardsToShow={4}
                buttonText={"Creá tu viaje"}
            />
            <FeaturedArticlesSection
                sectionTitle="Nuestras ofertas destacadas"
                mainArticle={mainStory}
                sideArticles={sideStories}
            />
            <Callout />
            <ScrollableCardSection
                sectionTitle="Nuestras novedades"
                sectionSubtitle="Descubre las últimas noticias y actualizaciones de nuestros destinos."
                cardsData={novedades}
                cardsToShow={4}
                buttonText={"Quiero consultar"}
            />
            <About />
            <Gallery />
            <Footer />

        </>
    )
}
