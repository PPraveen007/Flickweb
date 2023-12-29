import { useState } from "react"
import { projectFirestore } from "../firebase/config";

export default function AddDataScreen() {
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [picUrl, setPicUrl] = useState<string>('');
    const [stars, setStars] = useState<string>('');
    const [gen, setGen] = useState<string>('');
    const [season, setSeason] = useState<string>('');
    const [videoLink, setVideoLink] = useState<string>('');
    const [mediaType, setMediaType] = useState<string>('');

    const mediaSet = projectFirestore.collection('mediaList');

    const mediaUpload = (e: any) => {
        const time = Date.now();
        const data = {
            mediaType: mediaType,
            mediaName: name,
            mediaId: `${name}.${time}`,
            mediaBio: bio,
            mediaPic: picUrl,
            mediaStar: stars,
            mediaGenre: gen,
            mediaSeaon: season,
            mediaVideo: videoLink,
            mediaComments: [],
            mediaLikes: [],
            trending: false,
        }
        if (mediaType === "Movie" || mediaType === "Show") {
            mediaSet.doc(`${mediaType}.${time}`).set(data)
                .then(() => { alert("Movie Upload Sucess") })
                .catch((error) => { alert("Error" + error) })
        } else { alert("Invalid Type") }
        e.preventDefault()
    }

    return (
        <div>
            <h3>This is movie Uplaoder</h3>
            <form >
                <label htmlFor="type">Media Type</label><br />
                <input type="text" onChange={(e) => setMediaType(e.target.value)} required={true} id="type" name="type" /><br />
                <label htmlFor="mediaName">Media Name</label><br />
                <input type="text" onChange={(e) => setName(e.target.value)} required={true} id="mediaName" name="mediaName" /><br />
                <label htmlFor="mediaBio">Media Bio</label><br />
                <input type="text" onChange={(e) => setBio(e.target.value)} required={true} id="mediaBio" name="mediaBio" /><br />
                <label htmlFor="mediaPic">Media Pic Url</label><br />
                <textarea onChange={(e) => setPicUrl(e.target.value)} required={true} id="mediaPic" name="mediaPic" /><br />
                <label htmlFor="mediaStar">Media Stars</label><br />
                <input type="number" max={5} onChange={(e) => setStars(e.target.value)} required={true} id="mediaStar" name="mediaStar" /><br />
                <label htmlFor="mediaGen">Media Genre</label><br />
                <input type="text" onChange={(e) => setGen(e.target.value)} required={true} id="mediaGen" name="mediaGen" /><br />
                <label htmlFor="mediaSeason">Media Season</label><br />
                <input type="number" onChange={(e) => setSeason(e.target.value)} required={true} id="mediaSeason" name="mediaSeason" /><br />
                <label htmlFor="mediavideo">Media Video Link</label><br />
                <input type="text" onChange={(e) => setVideoLink(e.target.value)} required={true} id="mediavideo" name="mediavideo" /><br />
                <br />
                <input type="submit" onClick={(e) => mediaUpload(e)} value="Submit" />
            </form>
        </div>
    )
}