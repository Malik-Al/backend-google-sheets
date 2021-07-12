import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');
const keys = require('../../keys.json');
import config from '../config'
const urlSheets = config();


@Injectable()
export class Spreadsheets {
constructor() {}

  async resClient() {
    const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [ urlSheets.googleapis ]);
    client.authorize(async function (error, tokens) {
      if (error) {
        console.log(error);
      }
      return client
    });

    const resultData = {};
    return this.gsrunName(client)
      .then(async (i) => {
        for (const item of i) {
          const result = await this.gsrun(client, item);
          resultData[item] = result;
        }
        return resultData
      })
  }


  // Sheets data
  async gsrun(cl, name) { //cl for client
      const gsapi = google.sheets({ version: 'v4', auth: cl });
      const opt = {
        spreadsheetId: urlSheets.urlGoogleSheets,
        range: name,
      };
      const dataObtained = await gsapi.spreadsheets.values.get(opt);
      const dataOne = dataObtained.data?.values?.[0];
      const dataArray = dataObtained.data.values;
      await dataArray?.shift();
      const objects = dataArray?.map(
        student => Object.fromEntries(
          student.map((value, index) => [dataOne[index], value])
        )
      );
      return objects
    }

    // Name sheets
  async gsrunName(cl) { //cl for client
      const gsapi = google.sheets({ version: 'v4', auth: cl });
      const opt = {
        spreadsheetId: urlSheets.urlGoogleSheets,
      };
      const dataOb = (await gsapi.spreadsheets.get(opt)).data.sheets;
      const result = dataOb.map(({ properties: { title } }) => title);
      return result
    }


}


