

export function Datalist({ list, dataArr }: { list?: string, dataArr: any[] }) {
    return (
        <div className={"mb-4"}>
            <input className="dark:bg-slate-950 w-full py-1 px-2 rounded" list={list} />
            <datalist id={list}>
              {dataArr.map( st => <option key={ st._id.toString() } value={ st._id.toString() }>{ st.uniform || st.title } </option> )}
            </datalist>
        </div>
    )
}