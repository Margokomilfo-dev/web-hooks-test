import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

export const getToken = async (
  apiKey = 'h1vj52BCQuqF5lTss5waRQ',
  apiSecret = '4PcG7q38lAq8bsoSBazbx4aBYVqsNFSmMRPX',
) => {
  const payload = {
    iss: apiKey, //API Key (zoom+team1@it-incubator.ru)
    exp: new Date().getTime() + 5000,
  };
  return jwt.sign(payload, apiSecret); //API Secret(zoom+teamMargo@it-incubator.ru)
};

export const axiosZoom = axios.create({
  baseURL: 'https://api.zoom.us/v2',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createMeeting() {
    try {
      const token = await getToken();
      const res = await axiosZoom.post(
        `/users/me/meetings`,
        {
          topic: 'test',
          settings: {
            meeting_authentication: true,
            waiting_room: false,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (e: any) {
      console.log('error in create zoom meeting');
    }
  }
  async createEvent(dto: any) {
    console.log(dto);
  }
}
