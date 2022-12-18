export const pages = {
    'about' : [
        <>
            <div className="page-article">
                <h2 className="page-article__title">What is this project about?</h2>
                <span className="page-article__content">
                    This project is about cellular automata named "Game Of Life", devised by the British mathematician John Horton Conway in 1970. 
                </span>
            </div>
            <div className="page-article">
                <h2 className="page-article__title">Motivation</h2>
                <span className="page-article__content">
                    This project is mine course work, im just interested in some automates, such as Conway's life game, so I decided to pass course work with project in which topic I am interested in and of which I could be proud.
                </span>
            </div>
            <div className="page-article">
                <h2 className="page-article__title">Code</h2>
                <span className="page-article__content">
                    This project distributed under MIT license, so anyone can access the source code of the project. More on <a className="page-link" href="https://github.com/ShamanHead/conwayslifegame">github repository</a>.  
                </span>
            </div>
            <div className="page-article">
                <h2 className="page-article__title">Funding</h2>
                <span className="page-article__content">
                    You may provide financial support for this project by donating via Open Collective. Thank you for your support!  
                </span>
            </div>
        </>
        ],
    'learn' : [
        <>
            <div className="page-article">
                <h2 className="page-article__title">Game of Life Explanation</h2>
                <span className="page-article__content">
                    The Game of Life is not your typical computer game. It is a cellular automaton, and was invented by Cambridge mathematician John Conway. 
                    <br/>
                    <br/>
                    This game became widely known when it was mentioned in an article published by Scientific American in 1970. It consists of a grid of cells which, based on a few mathematical rules, can live, die or multiply. Depending on the initial conditions, the cells form various patterns throughout the course of the game.
                </span>
            </div>
            <br/>
            <div className="page-article">
                <h2 className="page-article__title">Rules</h2>
                <div className="article-element">
                    <div className="article-element__top">For a space that is populated:</div>
                    <div className="article-element-component">
                        <div className="article-element-component__left">
                            Each cell with one or no neighbors dies, as if by solitude.
                        </div>
                        <div className="article-element-component__right">
                        </div>
                    </div>
                    <div className="article-element-component">
                        <div className="article-element-component__left">
                            Each cell with four or more neighbors dies, as if by overpopulation.
                        </div>
                        <div className="article-element-component__right">
                        </div>
                    </div>
                    <div className="article-element-component">
                        <div className="article-element-component__left">
                            Each cell with two or three neighbors survives.
                        </div>
                        <div className="article-element-component__right">
                        </div>
                    </div>
                </div>
            </div>
        </>
 
    ]
}
