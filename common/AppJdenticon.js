import Jdenticon from "react-jdenticon";

const AppJdenticon = (props) => {
    const { size = "40", value } = props;
    return <Jdenticon size={size} value={value}/>;
};

export default AppJdenticon;
