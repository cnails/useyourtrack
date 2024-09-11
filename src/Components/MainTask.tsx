import { Card, Typography } from 'antd';
import { useState } from 'react';
import { TaskModal } from './TaskModal';
import CrossIcon from '../Icons/cross.svg?react';

const { Title, Text } = Typography;

export const MainTask = ({openTaskModal}: {openTaskModal: () => void}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    // openTaskModal();
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`full-width-container ${isExpanded ? 'expanded' : ''}`}>
        <Card className="custom-card">
        {isExpanded ? (
          <>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', margin: '-45px 0 8px 0'}}>
              <CrossIcon onClick={() => setIsExpanded(false)} />
            </div>
            <TaskModal setOpen={() => setIsExpanded(false)} />
          </>
        ) : (
          <>
            <div className="circle-container">
                <div className="outer_Circle" onClick={handleClick}>
                    <div className="circle">
                    <img src="https://s3-alpha-sig.figma.com/img/5a98/e819/84f80fdcb7aaa30221cbc3a8b98fa528?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qlkLnby8OrSFH8Zo5fOq8ccQhOtAmxDxusSBPs2tQH3rRHauu7AtXHkXexVPnV~v9F8YQbFoOJU9aAw90F5D~RdCHtXbpWYlSTlAtOJ3Q70pAuAgsg4wkKsNLRDcWixEaGckKwyI0H7mr97qVfr9D9lt0MBpDHo3-Ih6Ilg8qWL077irnvdMJVOB-GdOz9SevMLy8BNO65-VCpnp-Uo3orojZVuQVugEUVDrGNoik41g4jnIOpiMeyY-69k9yBKGR2PUmV7z2KLKoQLbTJOWxF4U~C84Lseib~7vTtc4UaP0iL9yDpQPs~ghR0PA13~shvrtFgMv8hD4GJQHUlXSUA__" alt="Custom Icon" className="circle-image" />
                </div>
            </div>
            </div>
            <Title level={3} className="mainTask_title">Epic</Title>
            <Text className="description">Выполнено заданий: 5</Text>
          </>
        )}
        </Card>
    </div>
  );
};
