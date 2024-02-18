import routes from 'src/util/api/hub/routes';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { useWalletStore } from 'src/core/wallet/walletStore';
import hub from 'src/util/api/hub';

const walletStore = useWalletStore();
export default class WalletHub {
  socket: HubConnection;

  constructor(socket: HubConnection) {
    this.socket = socket;

    ////////////////////////////////////////
    //     Hub Responses
    ////////////////////////////////////////
    socket.on(routes.wallet.getWallet, (response) => {
      if (response.success)
        walletStore.setWallet(response.data);
    });
  }

  ////////////////////////////////////////
  //     Hub Requests
  ////////////////////////////////////////
  async getWallet() {
    await hub.safeInvoke('wallet', routes.wallet.getWallet, null );
  }
}
