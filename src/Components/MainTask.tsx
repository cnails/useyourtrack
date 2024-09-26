import { Card, Typography } from 'antd';
import { useState } from 'react';
import { TaskModal } from './TaskModal';
import CrossIcon from '../Icons/cross.svg?react';
import useCachedImage from '../Utils/useCachedImage';
import { useGetTgUser } from '../api';


// TODO: прогресс уровня

const { Title, Text } = Typography;
// TODO: MainTask сделать ниже
// TODO: открывать тот же фрейм после сворачивания
// TODO: сворачивание чувствительное. Можно поправить?

const isProd = true;
import hp1 from '../assets/hp1.webp';
import hp2 from '../assets/hp2.webp';
import hp3 from '../assets/hp3.webp';
import hp4 from '../assets/hp4.webp';
import hp5 from '../assets/hp5.webp';
import hp6 from '../assets/hp6.webp';
import hp7 from '../assets/hp7.webp';
import hp8 from '../assets/hp8.webp';
import hp9 from '../assets/hp9.webp';

function getImageUrl(levelId: number) {
  hp1 && hp2 && hp3 && hp4 && hp5 && hp6 && hp7 && hp8 && hp9;

  return !isProd ? eval(`hp${levelId}`) : `/hp${levelId}.webp`;
}

export const levelsInfo = [
  {
    imageSrc: getImageUrl(1),
    title: 'Base',
    color_1: '#743114',
    color_2: '#452010',
    umt_limit: 1500,
  },
  {
    imageSrc: getImageUrl(2),
    title: 'Professional',
    color_1: '#B81A14',
    color_2: '#7B0500',
    umt_limit: 3500,
  },
  {
    imageSrc: getImageUrl(3),
    title: 'Bronze',
    color_1: '#EC5300',
    color_2: '#AC1100',
    umt_limit: 7000,
  },
  {
    imageSrc: getImageUrl(4),
    title: 'Silver',
    color_1: '#F06800',
    color_2: '#964100',
    umt_limit: 11000,
  },
  {
    imageSrc: getImageUrl(5),
    title: 'Gold',
    color_1: '#FBB929',
    color_2: '#C5901C',
    umt_limit: 15000,
  },
  {
    imageSrc: getImageUrl(6),
    title: 'Premium',
    color_1: '#F3FF52',
    color_2: '#89920B',
    umt_limit: 22000,
  },
  {
    imageSrc: getImageUrl(7),
    title: 'Elite',
    color_1: '#C4EA02',
    color_2: '#839C03',
    umt_limit: 31000,
  },
  {
    imageSrc: getImageUrl(8),
    title: 'Supreme',
    color_1: '#46FF40',
    color_2: '#12940E',
    umt_limit: 40000,
  },
  {
    imageSrc: getImageUrl(9),
    title: 'Legendary',
    color_1: '#7FA467',
    color_2: '#445E27',
  },
]

export const MainTask = () => {
  const {data: userData, isLoading} = useGetTgUser();
  const [isExpanded, setIsExpanded] = useState(false);
  if (isLoading) return null;
  const {imageSrc, title, color_1, color_2} = levelsInfo[userData?.level_id! - 1];
  const colorProps = {'--color-1': color_1, '--color-2': color_2} as any;
  // const imageSrc = "https://s3-alpha-sig.figma.com/img/5a98/e819/84f80fdcb7aaa30221cbc3a8b98fa528?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qlkLnby8OrSFH8Zo5fOq8ccQhOtAmxDxusSBPs2tQH3rRHauu7AtXHkXexVPnV~v9F8YQbFoOJU9aAw90F5D~RdCHtXbpWYlSTlAtOJ3Q70pAuAgsg4wkKsNLRDcWixEaGckKwyI0H7mr97qVfr9D9lt0MBpDHo3-Ih6Ilg8qWL077irnvdMJVOB-GdOz9SevMLy8BNO65-VCpnp-Uo3orojZVuQVugEUVDrGNoik41g4jnIOpiMeyY-69k9yBKGR2PUmV7z2KLKoQLbTJOWxF4U~C84Lseib~7vTtc4UaP0iL9yDpQPs~ghR0PA13~shvrtFgMv8hD4GJQHUlXSUA__";
  // функция по загрузке всех картинок
  // const [imageSrc, loading] = useCachedImage(imageUrl);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`full-width-container ${isExpanded ? 'expanded' : ''}`}>
        <Card className="custom-card" style={colorProps}>
        {isExpanded ? (
          <>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', margin: '-45px 0 8px 0'}}>
              <CrossIcon onClick={() => setIsExpanded(false)} />
            </div>
            <TaskModal onClose={() => setIsExpanded(false)} />
          </>
        ) : (
          <>
            <div className="circle-container">
                <div className="outer_Circle" onClick={handleClick} style={colorProps}>
                    <div className="circle">
                    <img src={imageSrc} alt="Custom Icon" className="circle-image" />
                </div>
            </div>
            </div>
            <Title level={3} className="mainTask_title">{title}</Title>
            <Text className="description">Выполнено заданий: {userData?.approved_tasks}</Text>
          </>
        )}
        </Card>
    </div>
  );
};
