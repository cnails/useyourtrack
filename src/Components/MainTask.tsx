import { Card, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { TaskModal } from './TaskModal';
import CrossIcon from '../Icons/cross.svg?react';
import useCachedImage from '../Utils/useCachedImage';

const { Title, Text } = Typography;

const levelsInfo = [
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/1dc6/9006/af82d808801b3ffc7676e4c8c4161d6b?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y5Oh7G2KFgVut5d7lx~3k~sAukxUu5xgt2OxMgKdjA-MAz2v27rBSHeJeyx33Yt~EzpHuI1AB5WyLxC1XpK2ebXAF0gkSLwjPvym827w8BrCQZtfAdR-OaSzmpjXoKuYppEsvxmisC6Sz2SEcIuSaiq0c6JtbWKR2YluKgwwmXcIQ1LVbtG8MHB~NSvRGpnkWOkGb~P7JkvZWX2eYilOiigaQV-lhWPzb8adUWfh1KDF1JGw0bdg9WNEWzxHQUINsZTF7WFVVIvpa9CjyOI~hFumREv00gpBbvM8kTNIUEcYZxT7uARvTORc2Z1OqjF2YEaQ-6AUxIJhQGNHW-zhUQ__',
    title: 'Start',
    color_1: '#743114',
    color_2: '#452010',
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/1f40/7dd4/31af3582467c4b285817c975227ada06?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iYvrlZ9kijfAL~vI91MM18JyugoikJEWblIGq0iiFREfmQEb0UVBVBeokJmgdGGxkTWCQPsAW-S2JMwI~VCgR-e-c7XyJEO~unf388dpf3G4FWseKiO0WfUCU1LIJIjrIC4HyRNJuw5yeo7kDvo77iftLb4wBQ~43WqmpS-uvN7tUD-EoIcae-hTCY4wATjO3p0v6QTpbRlzMK2~7rodD0ewnnSDUD52bPxM7aCgldad5DjQJHCky4x05TEIdgcMWqjlKZL0~qL5eYkUnrVAkfbyh3Ho3U6fbmgzwo5VLoxl9oWm1y4~at6Iw003ARZl9QSZk~KDDft9TSqsYFxAPg__',
    title: 'Base',
    color_1: '#B81A14',
    color_2: '#7B0500',
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/7ac2/8a6c/a22ea914eb0ce403bd099f672a25cd23?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMUc16XVwyQ2xcbC9gIAKEwJ1-Mrq4LgATNp0G78cDaYPwRO85dUx7onV1PptF19jcALPtrmdKZ1NH7aENTqpz7aBjZ2pPquI5-f3MHjDQntbfK8OYipzMWJhvKRhcmddYBOUmdXT7~zlXJ6hl1h8jqMYwoo-c4RK8TM6uxZUfM03qrCWuxqY54zzxkT1JTVzpH8MI3nHPtHA1QgXrdAll4ABonjdd8jxOV9UP24DBKHdyY4rSYXjn0Nb4aO1wP0d09uhHqv4QEvmpinLOzVHOvut16fO8AUylQ6JL4FVvxzEIrtHCPadDssPjOi3arPJ3VFTwnW2afSAuNHNMDkAQ__',
    title: 'Base +',
    color_1: '#EC5300',
    color_2: '#AC1100',
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/7ac2/8a6c/a22ea914eb0ce403bd099f672a25cd23?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMUc16XVwyQ2xcbC9gIAKEwJ1-Mrq4LgATNp0G78cDaYPwRO85dUx7onV1PptF19jcALPtrmdKZ1NH7aENTqpz7aBjZ2pPquI5-f3MHjDQntbfK8OYipzMWJhvKRhcmddYBOUmdXT7~zlXJ6hl1h8jqMYwoo-c4RK8TM6uxZUfM03qrCWuxqY54zzxkT1JTVzpH8MI3nHPtHA1QgXrdAll4ABonjdd8jxOV9UP24DBKHdyY4rSYXjn0Nb4aO1wP0d09uhHqv4QEvmpinLOzVHOvut16fO8AUylQ6JL4FVvxzEIrtHCPadDssPjOi3arPJ3VFTwnW2afSAuNHNMDkAQ__',
    title: 'Standart',
    color_1: '#F06800',
    color_2: '#964100',
  },

  // {
  //   imageSrc: 'https://s3-alpha-sig.figma.com/img/6d3f/d005/0c9dfaa7b71058ee8894ab1078ba89b2?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ri-UWaxdiTWvy3ro6vclqU-KTDZRN6uSpO340pN6qNT62RBwFyehxs~hCTAxCjXJOOGPFRoYRXDu4uidCH7ii06mRDND9fZnwTi33JSsnGK4hbReUeEiGlSC5cMxL6LUf6PPDDhqDTAsylffYrXB~TwvxxPbSfh98VlgqPX2WcVnsKEGB3IZSEKZ0jwRhbaozBULD69vEYwmpxtizmlKBPIw0B52URzqX47AU12az2pXCPr6F8R9IMf~i4WD5PB119myRuRN8gTh6BOAVzM~dCG02QzqYJF8G8l0G6wdopaPuxnU~aIB9WzmufjVBbTzpI7Y4h8jAmmXs7KXBZI7xQ__',
  //   title: 'Platinum',
  //   color_1: '#7FA467',
  //   color_2: '#445E27',
  // },
  // {
  //   imageSrc: 'https://s3-alpha-sig.figma.com/img/6b30/9833/25e20fafd750fd2161af722a557306ed?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WqBmKuE4Uyb8ougTjYpziINrcU10Uy02MQx0wglg5FVH5N6aMW6dXZLEA3~aL62pyLvL6Ppkjd0C1bHa40YyAiw5dB2iXox0CyfVoEPByqx-fMLPfMxtWMtyYeHEXjFg44qQcjgrU0pWszMCw1HSAwvPv9X2dbg7NZMw5-PTYLdh6ZkS8l3o8uKn7dtCPhNceRpWnjE1l5djftAl1kCoMvlPhAgA340tn8OxKMjfH6y6BylulLHpARyQKd6DYDy6cyJRmNCTlkvlHZA-jbzbHUdem5s1kIQXcipL9YSvu4ht0QH-98vVmJw8Ctpouw3oITdqZYUIiLx4LvGFm8dvLA__',
  //   title: 'Grand',
  //   color_1: '#00D75A',
  //   color_2: '#006836',
  // }
]

export const MainTask = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {imageSrc, title, color_1, color_2} = levelsInfo[0];
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
                    <img src={imageSrc as string} alt="Custom Icon" className="circle-image" />
                </div>
            </div>
            </div>
            <Title level={3} className="mainTask_title">{title}</Title>
            <Text className="description">Выполнено заданий: 5</Text>
          </>
        )}
        </Card>
    </div>
  );
};
