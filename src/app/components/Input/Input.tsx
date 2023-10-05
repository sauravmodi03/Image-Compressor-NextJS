
export default function Input({handleOnChange} : {handleOnChange:any}) {
  return (
    <div className="w-48 h-12 bg-red-900 rounded-2xl grid justify-items-center m-auto">
      <label className="m-auto" htmlFor="input-file" >Select Image</label>
      <input
        className=""
        type="file"
        id="input-file"
        accept="image/*"
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
    </div>
  )
}
