
import { Input } from './FormInput'
import { ActionButton } from '../Buttons/ActionButton'
import { uploadImageAction } from 'actions/images/createImage'
 
interface ICreateForm {
  uploaderId: string,
  btnColor?: string
}

export function ImageCreateForm({ uploaderId, btnColor } : ICreateForm ) {
  return (
    <form action={uploadImageAction} className="flex flex-col w-1/3 gap-2 mr-[20px]">
      <input type="hidden" name="uploaderId" defaultValue={uploaderId} />
      <Input title="title" placeholder={"title"} />
      <Input title="description" placeholder={"description"} />
      <Input title="displayName" placeholder={"display name"} />
      <div className='flex justify-between items-center'>
        <input className='text-xs' type="file" name="image" required />   
        <ActionButton idleTxt={"create"} loadingTxt='...creating' color={"green"} btnType={"submit"}/>
      </div>
    </form>
  )
}