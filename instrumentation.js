import connect from '@/mongo/db.js'

export async function register() {
    await connect()
}
