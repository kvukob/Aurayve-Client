import routes from 'src/util/api/hub/routes';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import hub from 'src/util/api/hub';
import { Notify } from 'quasar';
import { HubResponse } from 'src/util/api/types';
import { useTradingStore } from 'src/core/trading/tradingStore';
import { PoolList } from 'src/core/trading/types';

export default class TradingHub {
  socket: HubConnection;

  constructor(socket: HubConnection) {
    this.socket = socket;

    ////////////////////////////////////////
    //     Hub Responses
    ////////////////////////////////////////
    socket.on(routes.trading.addLiquidity, (response: HubResponse<null>) => {
      if (response) {
        Notify.create({
          message: response.message,
          icon: 'las la-check-square',
          color: 'dark-page',
          iconColor: 'positive',
          position: 'bottom-right',
          group: false
        });
      }
    });
    socket.on(routes.trading.getPools, (response: HubResponse<PoolList>) => {
      const tradingStore = useTradingStore();
      tradingStore.setPoolList(response.data.poolList);
      tradingStore.setSelectedPool(response.data.poolList[0]);
    });
    socket.on(routes.trading.buyOrder, (response: HubResponse<null>) => {
      console.log('buy order');
      console.log(response);
    });
    socket.on(routes.trading.sellOrder, (response: HubResponse<null>) => {
      console.log('sell order');
      console.log(response);
    });
    socket.on(routes.trading.getRecentTrades, (response: HubResponse<null>) => {
      const tradingStore = useTradingStore();
      tradingStore.setRecentTrades(response.data.recentTrades);
    });
    socket.on(routes.trading.getChartData, (response: HubResponse<null>) => {
      const tradingStore = useTradingStore();
      tradingStore.setChartData(response.data.chartData);
    });
    socket.on(routes.trading.getChart, (response: HubResponse<null>) => {
      console.log(response);
    });
  }

  ////////////////////////////////////////
  //     Hub Requests
  ////////////////////////////////////////
  async getPools() {
    await hub.safeInvoke('trade', routes.trading.getPools, null);
  }

  async addLiquidity(poolGuid: string, primaryQuantity: number, secondaryQuantity: number) {
    const req = {
      PoolGuid: poolGuid,
      PrimaryCoinQuantity: primaryQuantity,
      SecondaryCoinQuantity: secondaryQuantity
    };
    await hub.safeInvoke('trade', routes.trading.addLiquidity, req);
  }

  async placeBuyOrder(poolGuid: string, quantity: number) {
    const req = {
      PoolGuid: poolGuid,
      Quantity: quantity
    };
    await hub.safeInvoke('trade', routes.trading.buyOrder, req);
  }

  async placeSellOrder(poolGuid: string, quantity: number) {
    const req = {
      PoolGuid: poolGuid,
      Quantity: quantity
    };
    await hub.safeInvoke('trade', routes.trading.sellOrder, req);
  }

  async getRecentTrades(poolGuid: string) {
    const req = {
      PoolGuid: poolGuid
    };
    await hub.safeInvoke('trade', routes.trading.getRecentTrades, req);
  }
  async getChartData(poolGuid: string) {
    const req = {
      PoolGuid: poolGuid
    };
    await hub.safeInvoke('trade', routes.trading.getChartData, req);
  }
  async getChart(poolGuid: string) {
    const req = {
      PoolGuid: poolGuid
    };
    await hub.safeInvoke('trade', routes.trading.getChart, req);
  }
}
