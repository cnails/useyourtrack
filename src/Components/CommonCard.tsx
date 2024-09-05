interface IProps {
    className?: string;
    children?: JSX.Element[] | JSX.Element;
}

export const CommonCard = ({className, children}: IProps) => {
    const cn = ['rule-tile', className].join(' ');
    return (
        <div className={cn}>
            {children}
        </div>
    );
}