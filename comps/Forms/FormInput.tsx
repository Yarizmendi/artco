

export function Input({ type, title, value, placeholder, children }: { type?: string, title: string, value?: any, placeholder?: string, style?: any, labelName?: string, children? }) {
    return (
        <div className='flex flex-col my-1 font-light text-sm'>
            <div className="flex w-full dark:bg-slate-950 bg-slate-200">
            { children }
              <input className={"dark:bg-slate-950 bg-slate-200 py-1 px-2 rounded"} name={title} type={type} defaultValue={value} placeholder={placeholder} required /> 
            </div>
        </div>
    )
}