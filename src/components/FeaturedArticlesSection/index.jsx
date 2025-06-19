// src/components/FeaturedArticlesSection/index.jsx
import ArticleItem from './ArticleItem';

export default function FeaturedArticlesSection({
                                                    sectionTitle,
                                                    cardsData
                                                }) {
    // Verificamos que existan datos
    if (!cardsData || cardsData.length === 0) {
        console.warn("FeaturedArticlesSection requiere un array 'cardsData' con al menos un elemento.");
        return null;
    }

    // Dividimos los datos: el primero será el principal y el resto secundarios
    const mainArticle = cardsData[0];
    const sideArticles = cardsData.slice(1);

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-[#392761] dark:bg-[#392761]dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {sectionTitle && (
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 dark:text-white text-center mb-8 md:mb-12">
                        {sectionTitle}
                    </h2>
                )}

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch min-h-[400px]">
                    {/* Oferta destacada */}
                    <div className="md:w-1/2 w-full h-full flex">
                        <ArticleItem {...mainArticle} isFeatured={true} />
                    </div>
                    {/* Ofertas secundarias */}
                    <div className="md:w-1/2 w-full flex flex-col gap-4 md:gap-6 h-full">
                        {sideArticles.slice(0, 3).map((article, idx) => (
                            <div key={article.id || idx} className="h-full flex flex-1">
                                <ArticleItem {...article} isFeatured={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}