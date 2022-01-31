type PropTypes = {
    children: React.ReactNode;
    translateX: number;
    translateY: number;
};

const Body = (props: PropTypes) => {
    const translateX = !isNaN(props.translateX) ? props.translateX : 0;
    const translateY = !isNaN(props.translateY) ? props.translateY : 0;

    return (
        <div
            className="monolieta-virtual-scroll__body"
            style={{
                transform: `translate(${translateX}px, ${translateY}px)`,
            }}
        >
            {props.children}
        </div>
    );
};

export default Body;
