
export default function OptionCollection({id, title}) {
  return (
    <>
        <option value='' className="hidden"></option>
        <option value={id}>{title}</option>
    </>
  )
}
