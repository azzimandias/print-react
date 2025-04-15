import { Flex, Input, Radio, Button } from 'antd';
import './App.css';
import { useEffect, useState } from "react";
import Print from "./modules/Print";

function App() {
    const [kpId] = useState(92006);
    const [type] = useState(1);
    const [isPrint, setIsPrint] = useState(false);
    const [email, setEmail] = useState('');
    const [currency, setCurrency] = useState({ label: '$', value: '1' });

    const options = [
        { label: '$', value: '1' },
        { label: '€', value: '2' },
        { label: '₽', value: '3' },
    ];

    const [titleInfo, setTitleInfo] = useState({ manager: {}, contactPerson: {} });
    const [characteristicInfo, setCharacteristicInfo] = useState({});

    useEffect(() => {
        getInfoFromServer();
    }, []);

    const getInfoFromServer = () => {
        try {
            fetch(`/test.json`)
                .then(res => res.json())
                .then(res => {
                    setTitleInfo(res.titleInfo);
                    setCharacteristicInfo(res.characteristicInfo);
                });
        } catch (e) {
            console.log(e);
        }
    }

    const handlePrint = () => {
        setIsPrint(true);
    }

    useEffect(() => {
        if (isPrint) {
            const timer = setTimeout(() => {
                window.print();
                setIsPrint(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isPrint]);

    const handleCurrencyChange = (e) => {
        const selectedValue = e.target.value;
        const selectedOption = options.find(opt => opt.value === selectedValue);
        setCurrency(selectedOption || { label: '$', value: '1' });
    }

    return (
        <div className="App">
            <div className="edit-fields-wrapper">
                <Flex gap="middle" vertical>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Radio.Group
                        block
                        options={options}
                        value={currency.value}
                        onChange={handleCurrencyChange}
                        optionType="button"
                        buttonStyle="solid"
                    />
                    <Button type="primary" onClick={handlePrint}>
                        Печать
                    </Button>
                </Flex>
            </div>

            {isPrint && (
                <Print
                    kpId={kpId}
                    type={type}
                    info={{
                        titleInfo,
                        characteristicInfo
                    }}
                    email={email}
                    currency={currency}
                />
            )}
        </div>
    );
}

export default App;