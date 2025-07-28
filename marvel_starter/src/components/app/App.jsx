import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundy from "../errorBounadry/ErrorBoundry";

import decoration from '../../resources/img/vision.png';

const App = () =>  {

    const [selectedChar, setChar] = useState(null);

    

   const  onCharSelected = (id) => {
        setChar(id);
    }
   
        return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundy>
                    <RandomChar/>
                </ErrorBoundy>
                <div className="char__content">
                    <ErrorBoundy>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundy>
                    <ErrorBoundy>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundy>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
 
}

export default App;