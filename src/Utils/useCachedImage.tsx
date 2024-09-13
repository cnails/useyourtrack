import { useState, useEffect, useRef } from 'react';

// Кэш для хранения загруженных изображений
const imageCache: Record<string, string> = {};

const useCachedImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    // При размонтировании компонента меняем флаг isMounted
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Если изображение уже в кэше, используем его
    console.log(imageCache);
    
    if (imageCache[src]) {
      setImageSrc(imageCache[src]);
      setLoading(false);
    } else {
      // Если изображение не в кэше, загружаем его
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // Кэшируем изображение
        imageCache[src] = img.src;
        // Если компонент всё ещё смонтирован, обновляем состояние
        if (isMounted.current) {
          setImageSrc(img.src);
          setLoading(false);
        }
      };
    }
  }, [src]);

  return [imageSrc, loading];
};

export default useCachedImage;
