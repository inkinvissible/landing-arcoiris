"use client"
import { useEffect, useRef } from 'react';

const GlobeComponent = () => {
    const globeRef = useRef(null);

    useEffect(() => {
        // Carga dinámica de librerías solo en cliente
        const loadGlobe = async () => {
            const [GlobeModule, d3Scale, d3Chromatic] = await Promise.all([
                import('globe.gl'),
                import('d3-scale'),
                import('d3-scale-chromatic')
            ]);

            const Globe = GlobeModule.default;
            const { scaleSequentialSqrt } = d3Scale;
            const { interpolateYlOrRd } = d3Chromatic;

            const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

            // Función para calcular valor por país
            const getVal = feat =>
                feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

            try {
                const response = await fetch('/datasets/ne_110m_admin_0_countries.geojson');
                const countries = await response.json();

                const maxVal = Math.max(...countries.features.map(getVal));
                colorScale.domain([0, maxVal]);

                // Destruir instancia previa si existe
                if (globeRef.current.globeInstance) {
                    globeRef.current.globeInstance._destructor();
                }

                // Crear nueva instancia del globo
                const world = Globe()
                    .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
                    .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
                    .lineHoverPrecision(0)
                    .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
                    .polygonAltitude(0.06)
                    .polygonCapColor(feat => colorScale(getVal(feat)))
                    .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
                    .polygonStrokeColor(() => '#111')
                    .polygonLabel(({ properties: d }) => `
            <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
            GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
            Population: <i>${d.POP_EST}</i>
          `)
                    .onPolygonHover(hoverD => world
                        .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
                        .polygonCapColor(d => d === hoverD ? 'steelblue' : colorScale(getVal(d)))
                    )
                    .polygonsTransitionDuration(300);

                // Renderizar en el contenedor
                world(globeRef.current);

                // Guardar instancia para limpieza
                globeRef.current.globeInstance = world;
            } catch (error) {
                console.error('Error loading globe data:', error);
            }
        };

        loadGlobe();

        // Limpieza al desmontar
        return () => {
            if (globeRef.current?.globeInstance) {
                globeRef.current.globeInstance._destructor();
                globeRef.current.globeInstance = null;
            }
        };
    }, []);

    return (
        <div
            ref={globeRef}
            style={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#000'
            }}
        />
    );
};

export default GlobeComponent;