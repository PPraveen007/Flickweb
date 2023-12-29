import { BiPlayCircle } from 'react-icons/bi'

export default function PrimaryButton(props: any) {
    return (
        <a onClick={props.onClick} className={`base-flex primary-btn ${props.size} ${props.color} ${props.disabled && "disabled"}`}>
            {props.type === "Play" && <BiPlayCircle size={25} />}
            {props.children}
            {props.title && <h4>{props.title}</h4>}
        </a>
    )
}