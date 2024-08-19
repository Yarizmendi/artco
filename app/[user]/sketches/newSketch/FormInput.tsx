

export function Input({ type, title, value, placeholder }: { type?: string, title: string, value?: string, placeholder?: string }) {
    const InputCmpt = () => {
        if ( type == "textarea" ) return <textarea name={ title } />
        else if ( type == "textures" ) {}
        else return <input name={title} type={type} defaultValue={value} placeholder={placeholder} />
    }
    return (
        <div className='flex flex-col mt-2'>
        <label>{title}</label>
        <InputCmpt />
        </div>
    )
}