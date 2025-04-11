import {useState} from "react";
import TitleChapter from "./chapters/TitleChapter";
import ContentsChapter from "./chapters/ContentsChapter";

const Print = ({ isPrint, type, info }) => {
    const [pages, setPages] = useState(2);
    const [chapterNum, setChapterNum] = useState(1);
    const [subChapterNum, setSubChapterNum] = useState(1.1);
    return (
        <div>
            {(
                <div className="print-container">
                    <TitleChapter
                        type={type}
                        titleInfo={info.titleInfo}
                    />
                    <ContentsChapter
                        pages={pages}
                        chapterNum={chapterNum}
                        subChapterNum={subChapterNum}
                        changePage={newPage => setPages(newPage)}
                    />
                </div>
            )}
        </div>
    );
}

export default Print;
