import TelegramBot from "node-telegram-bot-api";
import { getSearchKeyword } from "../../utils/getSearchKeyword";

import { PornHub } from 'pornhub.js'
// const { PornHub } = require('pornhub.js')
// const pornhub = new PornHub()
const pornhub = new PornHub();
export const handlePornhub = (bot: TelegramBot) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    return async (msg: any) => {
        const chatId = msg.chat.id;
        try {
            const res = await pornhub.searchVideo(getSearchKeyword())
            // const res = await
            //     pornhub.search('Video', getSearchKeyword());
            // const videos = res.data;
            const index = Math.floor(Math.random() * res.data.length);
            const video = res.data[index];
            console.log(JSON.stringify(video));
            bot.sendMessage(chatId, video.url)
            const result2 = await pornhub.video(video.url);
            const videoDownload = result2
            console.log(JSON.stringify(videoDownload));
            bot.sendVideo(chatId, videoDownload.videos[0].url);
        } catch (e) {
            console.log(e);
        }
        // bot.sendVideo(chatId, temp);
        // send back the matched "whatever" to the chat
    }

}