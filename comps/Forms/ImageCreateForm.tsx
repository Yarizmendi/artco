
import { Input } from './FormInput'
import { ActionButton } from '../Buttons/ActionButton'
import { uploadImageAction } from 'actions/images/createImage'
 
interface ICreateForm {
  uploaderId: string,
  btnColor?: string,
  mutate?: any
}

export function ImageCreateForm({ uploaderId, btnColor="green", mutate } : ICreateForm ) {
  return (
    <form action={ async formData => {
      await uploadImageAction(formData)
      mutate()
    }} className="flex flex-col gap-2">
      <input type="hidden" name="uploaderId" defaultValue={uploaderId} />
      <Input title="title" placeholder={"title"} />
      <Input title="description" placeholder={"description"} />
      <Input title="displayName" placeholder={"display name"} />
      <div className='flex justify-between items-center'>
        <input className='text-xs' type="file" name="image" required />   
        <ActionButton idleTxt={"create"} loadingTxt='...creating' color={btnColor} btnType={"submit"}/>
      </div>
    </form>
  )
}