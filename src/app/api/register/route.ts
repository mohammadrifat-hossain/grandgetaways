import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
    const {email, name, password} = await request.json()

    const hashedPassword = await bcrypt.hash(password,12)

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}