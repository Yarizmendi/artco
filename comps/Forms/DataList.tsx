

export function Datalist({ title, list, dataArr }: { title: string, list?: string, dataArr: any[] }) {
    return (
        <div className={"font-light text-sm"}>
            <label htmlFor={title}>{title}:</label>
            <select 
              // multiple
              name={title} 
              id={list} 
              className="dark:bg-slate-950 w-full py-1 px-2 rounded" >
              {dataArr.map((st, idx) => <option className="text-sm font-light" key={idx} value={st._id}>{ st.label || st.title || st.uniform } </option> )}
            </select>
        </div>
    )
}

export function BoolSelect({ title, list, dataArr }: { title: string, list?: string, dataArr: any[] }) {
    return (
        <div className={"font-light text-sm"}>
            <label htmlFor={title}>{title}:</label>
            <select 
              name={title} 
              id={list} 
              className="dark:bg-slate-950 w-full px-2 rounded" >
              {dataArr.map((st, idx) => <option key={idx} className="text-sm font-light" defaultValue={ st }>{ st } </option> )}
            </select>
        </div>
    )
}

