
import { Input } from './FormInput'
import { ActionButton } from '../Buttons/ActionButton'
import { uploadImageAction } from 'actions/images/createImage'
 
export function ImageCreateForm({ uploaderId, btnColor }) {
  return (
    <form action={uploadImageAction} className="w-full flex flex-col">
            <input type="hidden" name="uploaderId" defaultValue={uploaderId} />
      <Input title="title" placeholder={"title"} />
      <Input title="description" placeholder={"description"} />
      <Input title="displayName" placeholder={"display name"} />
      <div className='flex justify-between items-center my-2'>
        <input className='text-xs' type="file" name="image" required />   
        <ActionButton idleTxt={"create"} loadingTxt='...creating' color={btnColor} btnType={"submit"}/>
      </div>
    </form>
  )
}