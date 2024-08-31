
"use server"
import connect from 'mongo/index.js'
import InputModel from '@/mongo/models/input.model.js'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createShaderAction ( formData: FormData ) {
    const shaderInputBody = {
        icon: formData.get("icon"),
        label: formData.get("label"),
        type: formData.get("type"),
        uniform: formData.get("uniform"),
        description: formData.get("description"),
        settings: {
            min: formData.get("min"),
            max: formData.get("max"),
            step: formData.get("step"),
            value: formData.get("value"),
        }
    }
    await connect()
    await InputModel.create(shaderInputBody)
    revalidatePath(`/motions`)
    redirect("/motions")
}

export async function createInput(inputBody) {
    await connect()
    await InputModel.create(inputBody)
}