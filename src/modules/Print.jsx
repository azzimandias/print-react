import {useState, useEffect} from "react";
import TitleChapter from "./chapters/TitleChapter";
import ContentsChapter from "./chapters/ContentsChapter";
import SpecificationChapter from "./chapters/SpecificationChapter";
import CharacteristicsChapter from "./chapters/CharacteristicsChapter";

const Print = ({ kpId, isPrint, type, info }) => {
    // Начальные значения
    const [pages, setPages] = useState({
        title: 1,       // Титульная страница всегда 1
        contents: 2,    // Оглавление
        spec: 3,       // Спецификация (начальное значение)
        characteristics: 4 // Характеристики (начальное значение)
    });

    // Обновляем номера страниц последовательно
    useEffect(() => {
        // После загрузки компонента вычисляем актуальные номера страниц
        setPages(prev => ({
            ...prev,
            contents: 2,
            spec: prev.contents + 1,
            characteristics: prev.spec + 1
        }));
    }, []);

    // Функция для обновления номера страницы конкретной главы
    const updateChapterPage = (chapter, newPage) => {
        setPages(prev => {
            const updated = {...prev, [chapter]: newPage};

            // Пересчитываем последующие страницы
            if (chapter === 'contents') {
                updated.spec = newPage + 1;
                updated.characteristics = updated.spec + 1;
            } else if (chapter === 'spec') {
                updated.characteristics = newPage;
            }

            return updated;
        });
    };

    return (
        <div className="print-container">
            <TitleChapter
                type={type}
                titleInfo={info.titleInfo}
            />

            <ContentsChapter
                pages={pages}
                pageNum={pages.contents}
                chapterNum={1}
                subChapterNum={1.1}
                changePage={(newPage) => updateChapterPage('contents', newPage)}
            />

            <SpecificationChapter
                kpId={kpId}
                pageNum={pages.spec}
                chapterNum={1}
                changePage={(newPage) => updateChapterPage('spec', newPage)}
            />

            <CharacteristicsChapter
                pageNum={pages.characteristics}
                subChapterNum={1.1}
                characteristicInfo={info.characteristicInfo}
                changePage={(newPage) => updateChapterPage('characteristics', newPage)}
            />
        </div>
    );
}

export default Print;
