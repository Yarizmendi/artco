

export function Input({ type, title, value, placeholder }: { type?: string, title: string, value?: any, placeholder?: string }) {
    const InputCmpt = () => {
        if ( type == "textarea" ) return <textarea name={ title } />
        else if ( type == "textures" ) {}
        else return <input className="bg-slate-200 dark:bg-slate-950 text-md" name={title} type={type} defaultValue={value} placeholder={placeholder} />
    }
    return (
        <div className='flex flex-col my-2'>
            <InputCmpt />
            <label className="text-xs self-end">{title}</label>
        </div>
    )
}