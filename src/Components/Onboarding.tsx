import { Button, Card, Carousel } from "antd"
import { useEffect, useRef, useState } from "react";
import LogoIcon from '../Icons/logo.svg?react';

const onboardingSteps = [
    {
        text: 'Здесь музыканты продвигают треки, а слушатели зарабатывают на прослушиваниях. Выполняй задания и получай за это реальные вознаграждения!',
    },
    {
        text: 'Нажимай на наушники и получай задание на прослушивание треков. Следуй инструкции выполнения, загружай отчеты и копи монеты',
    },
    {
        text: 'За некоторые задания вы получаете и рубли и внутреннюю монету umt, за некоторые задания вы получаете только монеты umt, подробнее на экране баланса',
    },
    {
        text: 'Прокачивай свой уровень в приложении и тебе будут приходить более дорогие задания. Подробнее в разделе уровней на главном экране',
    },
];

export const Onboarding = ({needToShow}: {needToShow: boolean}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const carouselRef = useRef<any>(null); // Реф для управления каруселью
    const [isOpen, setIsOpen] = useState(needToShow);

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
    
        return () => {
          document.body.style.overflow = '';
        };
      }, [isOpen]);

    const handleChange = (_, next) => {
        setCurrentStep(next);
    }

    // Функция для переключения на следующий слайд
    const next = () => {
        if (currentStep !== (onboardingSteps.length - 1)) {
            carouselRef.current.next();
        } else {
            setIsOpen(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className='expandedCard onboardingExpandedCard'>
            <Card className="custom-card onboarding" style={{'--color-1': '#46FF40', '--color-2': '#12940E'}}>
                {/* <div style={{fontSize: '38px'}}>{userData?.balance_rub! >= 400 ? '🔎' : '❌'}</div>
                <div style={{color: '#fff', fontSize: '30px', fontWeight: '600', paddingTop: '10px'}}>{userData?.balance_rub! >= 400 ? 'Ваша заявка отправлена на проверку' : 'Вывод доступен от 400₽'}</div> */}
                <div style={{fontSize: '30px', fontWeight: '600', color: '#fff', lineHeight: '35px'}}>Добро пожаловать<br />на сервис</div>
                <br />
                <LogoIcon />
                <Carousel style={{overflow: 'visible'}} ref={carouselRef} arrows infinite={false} beforeChange={handleChange} prevArrow={<></>} nextArrow={<></>}>
                    {onboardingSteps.map(({text}) => {
                        return (
                            <div>
                                <div className="onboardingCarouselContentWrapper">
                                    <div className="onboardingCarouselStep">{currentStep + 1}</div>
                                    <div className="onboardingCarouselText">{text}</div>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
                <Button type="primary" htmlType="submit" className='mainButton' onClick={next} style={{marginTop: '24px'}}>
                    Дальше
                </Button>
            </Card>
        </div>
    )
}