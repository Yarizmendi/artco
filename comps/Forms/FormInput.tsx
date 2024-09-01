

export function Input({ type, title, value, placeholder, required=false }: { type?: string, title: string, value?: any, placeholder?: string, style?: any, labelName?: string, required? }) {
  return <input className={"text-sm font-light flex w-full dark:bg-slate-950 bg-slate-200 px-2 rounded w-full"} name={title} type={type} defaultValue={value} placeholder={placeholder} required={required} /> 
}