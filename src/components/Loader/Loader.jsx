
import React from "react";
import { GooeyCircleLoader } from "react-loaders-kit";

function Loader() {

    const loaderProps = {
        loading: true,
        size: 275,
        duration: 2,
        colors: ["#99fffe", "#f42e00", "#042549"],
    };

    return (
        <div className="loader flex justify-center items-center flex-col min-h-[92vh]">
            <GooeyCircleLoader {...loaderProps} />
            <h2>Loading...</h2>
        </div>
    );
}

export default Loader;