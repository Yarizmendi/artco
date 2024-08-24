

export function Input({ type, title, value, placeholder, labelName }: { type?: string, title: string, value?: any, placeholder?: string, style?: any, labelName?: string }) {
    const InputCmpt = () => {
        if ( type == "textarea" ) return <textarea name={ title } />
        else if ( type == "textures" ) {}
        else return <input className={"dark:bg-slate-950 bg-slate-200 py-1 px-2 rounded"} name={title} type={type} defaultValue={value} placeholder={placeholder} />
    }
    return (
        <div className='flex flex-col my-1 font-light text-sm'>
            <InputCmpt />
            <label className={"text-xs self-end px-2 py-1"}>{labelName || title }</label>
        </div>
    )
}