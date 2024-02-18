// Socket

import { useAccountStore } from 'src/core/accounts/accountStore';
import config from 'src/util/api/hub/config';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { useHubStore } from 'src/util/api/hub/hubStore';
import WalletHub from 'src/util/api/hub/modules/WalletHub';
import { useRouter } from 'vue-router';
import FaucetHub from 'src/util/api/hub/modules/FaucetHub';
import TradingHub from 'src/util/api/hub/modules/TradingHub';

const hubStore = useHubStore();

const socket = new HubConnectionBuilder()
  .withUrl(config.URL, {
    accessTokenFactory: () => useAccountStore().getToken
  })
  .build();

// Handlers
const walletHub = new WalletHub(socket);
const faucetHub = new FaucetHub(socket);
const tradingHub = new TradingHub(socket);

// On close
socket.onclose(async () => {
  hubStore.setConnectionStatus(socket.state);
});

// After successful login through regular api, connect() is automatically
// fired to add the user to a hub group on the server
const connect = async function() {
  if (socket.state === 'Disconnected') await socket.start();
  hubStore.setConnectionStatus(socket.state);
  //await socket.invoke(routes.account.login);
};

const closeConnection = async function() {
  await socket.stop();
};

const safeInvoke = async function(arg: string, route: string, req: object | null) {

  if (socket.state === 'Disconnected') {
    const accountStore = useAccountStore();
    const token = window.localStorage.getItem('token');
    if (token) {
      accountStore.setToken(token);
      accountStore.setIsLoggedIn(true);
      await connect();
    } else{
      const router = useRouter();
      await router.push('login')
    }
  }
  await socket.invoke(config.VERSION, arg, route, JSON.stringify(req));
};


// Fires after connecting to hub with an initialized account
socket.on('login', async (loadObject) => {
  const accountStore = useAccountStore();
  accountStore.setUsername(loadObject.account.username);
});


export default {
  walletHub,
  faucetHub,
  tradingHub,
  // General
  connect,
  closeConnection,
  safeInvoke
};
