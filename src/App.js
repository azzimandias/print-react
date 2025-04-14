import './App.css';
import EditFields from "./modules/EditFields";
import {useEffect, useState} from "react";
import Print from "./modules/Print";

function App() {
    const [kpId, setKpId] = useState(92006);
    const [type, setType] = useState(1);
    const [isPrint, setIsPrint] = useState(false);

    const [titleInfo, setTitleInfo] = useState({manager: {}, contactPerson: {}});
    const [specialsInfo, setSpecialsInfo] = useState({});
    const [choiceInfo, setChoiceInfo] = useState({});
    const [schemeInfo, setSchemeInfo] = useState({});
    const [placingInfo, setPlacingInfo] = useState({});
    const [schemesInfo, setSchemesInfo] = useState({});
    const [placingsInfo, setPlacingsInfo] = useState({});
    const [recomendationInfo, setRecommendationInfo] = useState({});
    const [acousticInfo, setAcousticInfo] = useState({});
    const [reverbInfo, setReverbInfo] = useState({});
    const [directSplInfo, setDirectSplInfo] = useState({});
    const [totalSplInfo, setTotalSplInfo] = useState({});
    const [stiInfo, setStiInfo] = useState({});
    const [alconsInfo, setAlconsInfo] = useState({});
    const [conclusionsInfo, setConclusionsInfo] = useState({});
    const [characteristicInfo, setCharacteristicInfo] = useState({});

    useEffect(() => {
        getInfoFromServer();
    }, []);

    const getInfoFromServer = () => {
        try {
            //const response = await fetch(`http://zend2.arstel.su/kpischet/infoToPrint?bid_id=${kpId}`)
            fetch(`/test.json`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setTitleInfo(res.titleInfo);
                    setSpecialsInfo(res.specialsInfo);
                    setChoiceInfo(res.choiceInfo);
                    setSchemeInfo(res.schemeInfo);
                    setPlacingInfo(res.placingInfo);
                    setSchemesInfo(res.schemesInfo);
                    setPlacingsInfo(res.placingsInfo);
                    setRecommendationInfo(res.recomendationInfo);
                    setAcousticInfo(res.acousticInfo);
                    setReverbInfo(res.reverbInfo);
                    setDirectSplInfo(res.directSplInfo);
                    setTotalSplInfo(res.totalSplInfo);
                    setStiInfo(res.stiInfo);
                    setAlconsInfo(res.alconsInfo);
                    setConclusionsInfo(res.conclusionsInfo);
                    setCharacteristicInfo(res.characteristicInfo);
                });
        } catch (e) {
            console.log(e);
        }
    }

    const startPrint = () => {
        setIsPrint(true);
    }

    const stopPrint = () => {
        setIsPrint(false);
    }

    return (
      <div className="App">
          <EditFields
              startPrint={startPrint}
              stopPrint={stopPrint}
          />
          <Print
              kpId={kpId}
              type={type}
              isPrint={isPrint}
              info={
                  {
                      titleInfo,
                      specialsInfo,
                      choiceInfo,
                      schemeInfo,
                      placingInfo,
                      schemesInfo,
                      placingsInfo,
                      recomendationInfo,
                      acousticInfo,
                      reverbInfo,
                      directSplInfo,
                      totalSplInfo,
                      stiInfo,
                      alconsInfo,
                      conclusionsInfo,
                      characteristicInfo
                  }
              }
          />
      </div>
    );
}

export default App;
