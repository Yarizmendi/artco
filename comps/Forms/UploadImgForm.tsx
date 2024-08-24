
import { uploadImageAction } from 'actions/images/createImage'
import { ActionButton } from '../Buttons/ActionButton'
import { Input } from './FormInput'
 
export function UploadImgForm({ uploaderId }) {
  return (
    <form action={uploadImageAction} className="w-full flex flex-col">
      <input className="dark:bg-slate-900 border-b dark:border-slate-100 border-slate-500 text-sm font-light my-4 py-2" type={"search"} placeholder={"Search artwork"} /> 
      <Input type="text" title="displayName" labelName={"display"} />
      <Input type="text" title="description" />
      <div className='flex justify-between items-center my-8'>
        <input className='text-xs' type="file" name="image" />   
        <ActionButton idleTxt="upload" color="orange" />
      </div>
      <input type="hidden" name="uploaderId" defaultValue={uploaderId} />
    </form>
  );
}