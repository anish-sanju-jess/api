import * as cheerio from 'cheerio';
import { fetch } from 'undici';



export class Scrap {
    BASE_URL = "https://tldr.tech/api/latest/";
    page;
    constructor(page = 'tech') {
        this.page = this.BASE_URL.concat(page);
        console.log(this.page)
    }

     async latest(page = 'tech') {
        const data = await this.scrap(page);
        const rawStories = data.props.pageProps.stories;
        const stories = [];
        for (const story of rawStories) {
            stories.push({
                id: story.id,
                url: story.url,
                title: story.title,
                tldr: this.cleanText(story.tldr),
                date: story.date,
                category: story.category,
                newsletter: story.newsletter
            });
        }
        return stories;
    }

   
    async scrap(page) {
        this.page = this.BASE_URL.concat(page);
        const response = await fetch(this.page);
        const text = await response.text();
        const $ = cheerio.load(text);
        const script = $('script[type="application/json"]').html();
        return JSON.parse(script);
    }

    cleanText(text) {
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    }
    
}

console.log(new Scrap('ai'))
