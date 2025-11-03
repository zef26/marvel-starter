import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        if (!id) return;
        updateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const updateData = async () => {
        clearError();

        try {
            let result;
            if (dataType === 'comic') {
                result = await getComic(id);
            } else if (dataType === 'character') {
                result = await getCharacter(id);
            }
            setData(result);
        } catch (e) {
            console.error('Ошибка при получении данных:', e);
        }
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default SinglePage;
