import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const {  getComic, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        if (!id) return;
        updateData();
        
    }, [id]);

    const updateData = async () => {
        clearError();

        try {
            let result;
            if (dataType === 'comic') {
                result = await getComic(id)
                .then(() => setProcess('confirmed'));
            } else if (dataType === 'character') {
                result = await getCharacter(id)
                .then(() => setProcess('confirmed'));
            }
            setData(result);
        } catch (e) {
            console.error('Ошибка при получении данных:', e);
        }
    };



    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    );
};

export default SinglePage;
