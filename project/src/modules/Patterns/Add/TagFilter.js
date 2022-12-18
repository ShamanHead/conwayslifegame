import {
    React,
    useState,
    useEffect,
    useMemo
} from "react";

export default function TagFilter(props) {
   
    const [tagList, setTagList] = useState([]),
        [selectedList, setSelectedList] = useState([]),
        [selectedFrontendList, setSelectedFrontendList] = useState([]),
        handlerUpdate = props.handlerUpdate

    useEffect(() => {
        fetch('http://localhost:81/tag/get')
            .then((response) => response.json())
            .then((response) => {
                setTagList(response.data);
            })
    }, [])
    
    const [meanList, setMeanList] = useState([])

    useEffect(() => {
        setMeanList(tagList.map((el) => {
            return <div onClick={handleSelectedChange} data-key={el.id} key={el.id}>{el.name}</div>;
        }))
    }, tagList)

    function handleSelectedChange(e) {
        let value = parseInt(e.currentTarget.getAttribute("data-key")),
            index = selectedList.indexOf(value)

        e.currentTarget.classList.toggle("active")

        if(index === -1) {
            selectedList.push(value)
        } else {
            selectedList.splice(index, 1);
        }

        let frontend = [];

        selectedList.map((el) => {
            tagList.map((el2) => {
                if(el === el2.id) {
                    frontend.push(
                        <div key={el2.id}
                            class="item"
                            style={{border: "3px solid #" + el2.hex}}>
                            {el2.name}
                        </div>
                    );
                }
            })
        })

        setSelectedFrontendList(frontend)

        if(handlerUpdate !== null) {
            handlerUpdate(selectedList)
        }

        console.log(frontend); 
    }

    function handleInputChange(e) {
        let value = e.currentTarget.value,
            results = [];
            
        if(value === '') {
            setMeanList(
                tagList.map((el) => {
                    if(selectedList.indexOf(el.id) !== -1) {
                        return <div onClick={handleSelectedChange} className="active" data-key={el.id} key={el.id}>{el.name}</div>;
                    } else {
                        return <div onClick={handleSelectedChange} data-key={el.id} key={el.id}>{el.name}</div>;
                    }
                })
            )

            return false;
        }

        tagList.map((el) => {
            if(el.name.includes(value)) {
                console.log(selectedList, el, selectedList.indexOf(el.id));
                if(selectedList.indexOf(el.id) !== -1) {
                    results.push(<div onClick={handleSelectedChange} className="active" data-key={el.id} key={el.id}>{el.name}</div>);
                } else {
                    results.push(<div onClick={handleSelectedChange} data-key={el.id} key={el.id}>{el.name}</div>);
                }
            }
        });

        setMeanList(results);

    }

    return (
        <div className="tag-list">
            <input placeholder="Tag" onChange={handleInputChange} class="tag-input mt-5 mb-5" />
            <div className="selected-tags">
                {selectedFrontendList}
            </div> 
            <div className="mean-list">
                {meanList}
            </div>
        </div>
    )

}
