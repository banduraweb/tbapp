import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { Preloader } from "./Preloader";

const DummyChart = () => {
    const { pathname } = useLocation();

    const [content, setContent] = useState([]);
    const { loading, request } = useHttp();

    const loadedCurrentContent = useCallback(async () => {
        try {
            const data = await request(
                `http://localhost:8585/api/content/tbcontent${pathname}`,
                "GET",
                null,
                {}
            );
            setContent(data);
        } catch (e) {}
    }, [request, pathname]);

    useEffect(() => {
        loadedCurrentContent();
    }, [loadedCurrentContent]);

    if (loading) {
        return <Preloader />;
    }

    return (
        <>
            {content.map(({ content, tab_owner, _id }) => (
                <ul key={_id}>
                    <li>{content}</li>
                    <li>{tab_owner}</li>
                </ul>
            ))}
        </>
    );
};

export default DummyChart;
