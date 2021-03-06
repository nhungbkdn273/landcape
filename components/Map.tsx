import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  lazy,
  Suspense,
} from 'react';
import Spinner from './Spinner';

const GoogleMapReact = lazy(() => import('google-map-react'));

const GoogleMap = ({ location, draggable }, ref) => {
  const [center, setCenter] = useState({
    lat: +location?.lat,
    lng: +location?.lng,
  });

  const loadMap = (map, maps) => {
    let marker = new maps.Marker({
      position: center,
      map,
      draggable,
    });

    maps.event.addListener(marker, 'drag', () => onDragMarket(marker), {
      passive: true,
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      location: center,
    }),
    [center]
  );

  const onDragMarket = useCallback((marker) => {
    setTimeout(() => {
      setCenter({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      });
    }, 500);
  }, []);

  return (
    <div className='h-[400px] w-full mt-[30px]'>
      <Suspense fallback={<Spinner />}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDJXPMrpL6gtbhBUSH_UUMkjB-eYJBDtf8' }}
          defaultCenter={center}
          defaultZoom={8}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
        />
      </Suspense>
    </div>
  );
};

export default forwardRef(GoogleMap);
