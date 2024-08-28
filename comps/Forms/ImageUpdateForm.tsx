
// import { Input } from './FormInput'
// import { ActionButton } from '../Buttons/ActionButton'
// import { updateImageAction } from 'actions/images/updateImageAction'
 
// export function ImageUpdateForm({ btnColor, description, displayName, id, title }) {
//   return (
//     <form action={updateImageAction} className="w-full flex flex-col">
//       <input hidden name={"id"} defaultValue={id} />
//       <Input title="title" value={title} placeholder="title">
//         <button onClick={() => setIsEditing(!isEditing)}>
//           <span className={ICONLINED + " text-[20px] p-1" }>{"edit"}</span>
//         </button>
//       </Input>
//       <Input title="description" value={description} placeholder='description' />
//       <Input title="displayName" value={displayName} placeholder='display name'/> 
//       <ActionButton idleTxt={"update"} color={btnColor} btnType={"submit"} />
//     </form>
//   )
// }