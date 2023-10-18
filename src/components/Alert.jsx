
export default function Alert({message, error}) {
    return (
      <>
      <div className="text-center">
          <p className={`${error ? 'text-danger font-normal text-mini' : 'text-success font-normal text-mini'}`}>
            {message}
          </p>
      </div>
      </>
    )
}