import {useState} from "react";
import TitleChapter from "./chapters/TitleChapter";
import ContentsChapter from "./chapters/ContentsChapter";
import SpecificationChapter from "./chapters/SpecificationChapter";

const Print = ({ kpId, isPrint, type, info }) => {
    const [pageNum, setPageNum] = useState(2);
    const [chapterNum, setChapterNum] = useState(1);
    const [subChapterNum, setSubChapterNum] = useState(1.1);

    const changePageNum = (newPageNum) => {
        setPageNum(prevPageNum => Math.max(prevPageNum, newPageNum));
    };

    return (
        <div>
            {(
                <div className="print-container">
                    <TitleChapter
                        type={type}
                        titleInfo={info.titleInfo}
                    />
                    <ContentsChapter
                        pageNum={pageNum}
                        chapterNum={chapterNum}
                        subChapterNum={subChapterNum}
                        changePage={changePageNum}
                    />
                    <SpecificationChapter
                        kpId={kpId}
                        pageNum={pageNum}
                        chapterNum={chapterNum}
                        changePage={changePageNum}
                    />
                </div>
            )}
        </div>
    );
}

export default Print;
