import { Button, Card } from "antd";
import CrossIcon from '../Icons/cross.svg?react';
import { useState } from "react";
import { StarRating } from "./StartRating";

export const ReviewModal = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
    // TODO: рест для оценки трека?
    if (!isOpen) {
        return null;
    }

    return (
        <div className='revenueExpandedCard expandedCard'>
            <Card className="custom-card" style={{'--color-1': '#46FF40', '--color-2': '#12940E'}}>
                <div style={{fontSize: '50px', paddingRight: '15px', transform: 'rotate(-20deg)'}}>👍🏼</div>
                <div style={{fontSize: '50px', paddingRight: '15px', transform: 'scaleX(-1) rotate(-20deg) translate(-10px, -25px)'}}>👎🏼</div>
                <div style={{color: '#fff', fontSize: '30px', fontWeight: '600'}}>Оцени прослушанный трек!</div>
                <StarRating />
                <Button type="primary" htmlType="submit" className='mainButton revenueExpandedButton' onClick={onClose}>
                    Отправить
                </Button>
            </Card>
        </div>
    )
}