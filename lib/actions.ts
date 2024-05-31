"use server"

import{z} from "zod";
import {prisma} from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";

const ContactSchema = z.object({
    name : z.string().min(6),
    phone : z.string().min(11),
});

export const saveContact = async (prevSate : any,formData : FormData) =>{
    const ValidatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!ValidatedFields.success){
        return {
            Error : ValidatedFields.error.flatten().fieldErrors
        }
    }
    try{
        await prisma.contact.create({
            data:{
                name : ValidatedFields.data.name,
                phone : ValidatedFields.data.phone
            }
        })
    } catch(error){
        return {message : "failed to create contact"}
    }
    revalidatePath("/contact");
    redirect("/contact");
}

export const updateContact = async (id : string, prevSate : any,formData : FormData) =>{
    const ValidatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!ValidatedFields.success){
        return {
            Error : ValidatedFields.error.flatten().fieldErrors
        }
    }
    try{
        await prisma.contact.update({
            data:{
                name : ValidatedFields.data.name,
                phone : ValidatedFields.data.phone
            },
            where : {id},

        })
    } catch(error){
        return {message : "failed to update contact"}
    }
    revalidatePath("/contact");
    redirect("/contact");
}

export const deleteContact = async (id : string) =>{
    
    try{
        await prisma.contact.delete({
            where : {id},
        })
    } catch(error){
        return {message : "failed to delete contact"}
    }
    revalidatePath("/contact");
}