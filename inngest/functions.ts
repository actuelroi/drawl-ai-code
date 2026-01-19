import { firecrawl } from "@/lib/firecrawl";
import { inngest } from "./client";

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';



const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
    { id: "demo-generate" },

    { event: "demo/generate" },



    async ({ event, step }) => {
        
        const { prompt} = event.data as {prompt: string}
        
        const urls = await step.run('Extract-urls', async()=>{
           return prompt.match(URL_REGEX ) ?? [];
        }) as string[];

        const scrapedContent = await step.run('scrape-uls', async ()=>{
            const results = await Promise.all(
                urls.map(async (url)=>{
                    const result= await firecrawl.scrape(
                        url,
                        {formats: ['markdown']}
                    )
                    return result.markdown ?? null
                })
            )
            return results.filter(Boolean).join('\n\n')
        })

        const finalPrompt = scrapedContent ? `Context:\n${scrapedContent}\n\nQuestion: ${prompt}`: prompt

       await step.run('generate-test', async ()=>{
        return await generateText({
            model: openai.responses('gpt-4o'),
            prompt: finalPrompt
        })
       })
    },
);