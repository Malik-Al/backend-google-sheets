import * as dotenv from 'dotenv';

dotenv.config();
export default function() {
  return ({
    database: process.env.DATABASE_MONGODB || 'mongodb+srv://malik:0159kb@cluster0.gzxcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    urlGoogleSheets: process.env.GOOGLE_API || '1cH0VLuRxn886VMXB3-aNUe6nBvnViDU66nyxN8xGJIo',
    googleapis: process.env.GOOGLE_AUTH || 'https://www.googleapis.com/auth/spreadsheets'
  });
}