import { Button, Card } from "antd";
import CrossIcon from '../Icons/cross.svg?react';
import { useState } from "react";

export const ReviewModal = ({isOpen}: {isOpen: boolean}) => {
    const [_isOpen, setIsOpen] = useState(isOpen);
    // TODO: рест для оценки трека?
    if (!isOpen) {
        return null;
    }

    return (
        <div className='revenueExpandedCard expandedCard'>
            <Card className="custom-card" style={{'--color-1': '#46FF40', '--color-2': '#12940E'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'end', margin: '-45px 0 8px 0'}}>
                    {/* TODO: оценку можно просто пропустить? */}
                    <CrossIcon onClick={() => setIsOpen(false)} />
                </div>
                <div style={{fontSize: '38px'}}>👍🏼</div>
                <div style={{color: '#fff', fontSize: '30px', fontWeight: '600', paddingTop: '10px'}}>Оцени трек<br />и оставь отзыв!</div>
                <Button type="primary" htmlType="submit" className='mainButton revenueExpandedButton' onClick={() => {}}>
                    Отправить
                </Button>
            </Card>
        </div>
    )
}