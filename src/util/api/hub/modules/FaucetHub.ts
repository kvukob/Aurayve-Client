import routes from 'src/util/api/hub/routes';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import hub from 'src/util/api/hub';
import { Notify } from 'quasar';
import { HubResponse } from 'src/util/api/types';

export default class FaucetHub {
  socket: HubConnection;

  constructor(socket: HubConnection) {
    this.socket = socket;

    ////////////////////////////////////////
    //     Hub Responses
    ////////////////////////////////////////
    socket.on(routes.faucet.claim, (response: HubResponse<null>) => {
      if (response.success) {
        Notify.create({
          message: response.message,
          icon: 'las la-check-square',
          color: 'dark-page',
          iconColor: 'positive',
          position: 'bottom-right',
          group: false,
          classes: 'q-pa-lg'
        });
      }
      else if(!response.success) {
        Notify.create({
          message: response.message,
          icon: 'las la-times',
          color: 'dark-page',
          iconColor: 'negative',
          position: 'bottom-right',
          group: false,
          classes: 'q-pa-lg'
        });
      }
    });
  }

  ////////////////////////////////////////
  //     Hub Requests
  ////////////////////////////////////////
  async claim() {
    await hub.safeInvoke('faucet', routes.faucet.claim, null);
  }
}
