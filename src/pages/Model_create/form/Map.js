import * as React from 'react';

export const DisplayMap = ({wrapSetCordinate}) => {
    // Create a reference to the HTML element we want to put the map on
    const mapRef = React.useRef(null);

    /**
     * Create the map instance
     * While `useEffect` could also be used here, `useLayoutEffect` will render
     * the map sooner
     */
    React.useLayoutEffect(() => {
        // `mapRef.current` will be `undefined` when this hook first runs; edge case that
        if (!mapRef.current) return;
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "ArkalUN2dEqrgDg6UlDh8urEkNPFaW06aKZUwsx4u_A"
        });
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: { lat: 50, lng: 5 },
            zoom: 4,
            pixelRatio: window.devicePixelRatio || 1
        });

        var marker = new H.map.Marker({ lat: 48.8567, lng: 2.3508 }, {
            volatility: true
        });
        marker.draggable = true;
        hMap.addObject(marker);

        hMap.addEventListener('dragstart', function (ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                var targetPosition = hMap.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
            }
        }, false);


        // re-enable the default draggability of the underlying hMap
        // when dragging has completed
        hMap.addEventListener('dragend', function (ev) {
            var target = ev.target;
            var coord = hMap.screenToGeo(ev.currentPointer.viewportX,
                ev.currentPointer.viewportY);

            const lat = Math.abs(coord.lat.toFixed(4)) + ((coord.lat > 0) ? 'N' : 'S')

            const long = Math.abs(coord.lng.toFixed(4)) + ((coord.lng > 0) ? 'E' : 'W')

            wrapSetCordinate(lat, long)

            if (target instanceof H.map.Marker) {
                behavior.enable();
            }
        }, false);

        // Listen to the drag event and move the position of the marker
        // as necessary
        hMap.addEventListener('drag', function (ev) {
            var target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                target.setGeometry(hMap.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
            }
        }, false);

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

        const ui = H.ui.UI.createDefault(hMap, defaultLayers);

        // This will act as a cleanup to run once this hook runs again.
        // This includes when the component un-mounts
        return () => {
            hMap.dispose();
        };
    }, [mapRef]); // This will run this hook every time this ref is updated

    return <div className="map" ref={mapRef} style={{ height: "30vh", borderRadius: '10px' }} />;
};


export default DisplayMap