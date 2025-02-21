interface ButtonProps {
    name: string,
    isBeam: boolean,
    containerClass: string
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`btn ${props.containerClass}`}>
        {props.isBeam && (
            <span className="relative flex h-3 w-3">
                <span className="btn-ping"/>
                <span className="btn-ping_dot"/>
            </span>
        )}
        {props.name}
    </button>
  )
}

export default Button