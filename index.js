require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: true });

const names = ["Chung", "Nhật", "Thiện", "Hải Anh"];

const getNameForToday = () => {
  const today = new Date();
  const index = today.getDate() % names.length; // Xoay vòng theo ngày trong tháng
  return names[index];
};

const sendReminder = () => {
  const name = getNameForToday();
  const message = `🔔 Nhắc nhở: Hôm nay đến lượt **${name}** lau nhà! 🧹🧼`;
  bot.sendMessage(CHAT_ID, message, { parse_mode: "Markdown" });
};
sendReminder()
cron.schedule(
  "* * * * *",
  () => {
    console.log("Đang gửi tin nhắn nhắc nhở...");
    sendReminder();
  },
  {
    timezone: "Asia/Ho_Chi_Minh",
  }
);

console.log("Bot Telegram đã chạy...");
