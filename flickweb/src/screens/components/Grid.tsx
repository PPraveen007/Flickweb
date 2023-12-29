import { useRef } from 'react'
import { AiFillPlayCircle, AiFillStar } from 'react-icons/ai'
import { GrNext, GrPrevious } from 'react-icons/gr'
import PrimaryButton from './primaryButton'
import { useHistory } from 'react-router'

export default function ShowGrid(props: any) {

    const scrollRef = useRef<any>(null);
    const gridCard = useRef<any>(null);
    const history = useHistory();

    const gridScroller = (direction: any) => {
        var scrollAmount = gridCard.current.offsetWidth * 2.5;
        if (direction === "Next") { scrollRef.current.scrollLeft += scrollAmount }
        if (direction === "Prev") { scrollRef.current.scrollLeft -= scrollAmount }
    }

    const cardTap = (cardData: any) => {
        const routeData = {
            genre: cardData.mediaGenre.replace(/ /g, "").split("|"),
            docId: `${cardData.mediaType}.${cardData.mediaId.split(".")[1]}`
        }
        history.push({ pathname: '/watch', search: `?${cardData.mediaName.replace(" ", '-')}/`, hash: `${cardData.mediaId.replace(" ", "-")}`, state: routeData });
    }

    return (
        props.data.length !== 0 ?
            <div key={props.gridKey} className="base-flex show-grid">
                <div className="base-flex grid-wrapper">
                    <div className="base-flex grid-head">
                        <h3>{props.title}</h3>
                        <div className="base-flex grid-button-holder">
                            <PrimaryButton onClick={() => gridScroller("Prev")} ><GrPrevious size={15} /></PrimaryButton>
                            <PrimaryButton onClick={() => gridScroller("Next")}><GrNext size={15} /></PrimaryButton>
                        </div>
                    </div>
                    <div className="grid-holder" ref={scrollRef}>
                        {props.data.map((item: any, index: any) => (
                            <a onClick={() => cardTap(item)} ref={gridCard} key={index} className="grid-card">
                                <img src={item.mediaPic} alt="Movie or Show Grid Thumbnail" />
                                <div className="base-flex gird-data">
                                    <div className="base-flex play-show">
                                        <AiFillPlayCircle size={50} />
                                    </div>
                                    <div className="base-flex">
                                        <h3>{item.mediaName}</h3>
                                        <span>{item.mediaGenre}</span>
                                        <span className="base-flex"><AiFillStar />{item.mediaStar} | {item.mediaSeaon} {item.mediaType === "Movie" ? "hrs" : "Season"}</span>
                                    </div>
                                </div>
                            </a>
                        ))
                        }
                    </div>
                </div>
            </div>
            :
            <></>
    )
}