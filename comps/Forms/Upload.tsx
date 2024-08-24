
import { uploadImageAction } from 'actions/images/createImage'
import { ActionButton } from '../Buttons/ActionButton'
import { Input } from './FormInput'
 
export function UploadImgForm({ uploaderId }) {
  return (
    <form action={uploadImageAction} className="w-full flex flex-col">
      <input className="dark:bg-slate-900 border-b dark:border-slate-100 border-slate-500 text-sm font-light my-4" type={"search"} placeholder={"search"} /> 
      <Input type="text" title="displayName" />
      <Input type="text" title="descripion" />
      <div className='flex justify-between'>
        <input className='text-xs my-4' type="file" name="image" />   
        <ActionButton idleTxt="upload" color="green" />
      </div>
      <input type="hidden" name="uploaderId" value={uploaderId} />
    </form>
  );
}