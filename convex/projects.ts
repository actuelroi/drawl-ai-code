import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args:{
        mane: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert('projects',{
            name: args.mane,
            ownerId: "123"
            
        })
    }
})


export const get = query({
    args: {},
    handler: async (ctx)=>{
     
    const identity = await ctx.auth.getUserIdentity()
    
    if(!identity){
        throw new Error('Not authorized')
    }

     await ctx.db.query('projects').collect();
    }
})