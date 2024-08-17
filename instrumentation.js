import connect from '@/mongo/index.js'

export async function register() {
    await connect()
}
