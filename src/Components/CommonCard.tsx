export const CommonCard = (props: any) => {
    const {className, children} = props;
    const cn = ['rule-tile', className].join(' ');
    return (
        <div {...props} className={cn}>
            {children}
        </div>
    );
}
