import {
  shallowMount
} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import App from '@/App'
import Home from "@/views/Home.vue";
import EventViwer from "@/components/EventViwer.vue";

//Web3js ...
import { initWeb3 } from "@/services/web3Service.js";
import * as ENSContract from '@/contract/ENS-contract'

//Store ...
import store from '@/store/index.js'
import mutations from '@/store/mutations.js'


beforeAll(() => {
  Vue.use(Vuetify);
  Vue.use(VueRouter);
  Vue.use(Vuex);
});


describe('Testing App', () => {
  let wrapper = null;

  it('works', () => {
    wrapper = shallowMount(App)
  })

  it('has my name and my linkedIn URL ;) ', () => {
    const myNameSpan = wrapper.find('span.myname')
    expect(myNameSpan.text()).toEqual('Abdulrhman AL-Koptan (LinkedIn)')
  });

});

describe('Testing Web3js', () => {

  it('Connecting to Ethereum netwrok ', async () => {
    let web3js = await initWeb3();
    expect(web3js).not.toEqual(null);
  });

  it('Connecting to Ethereum netwrok by using Infura ', async () => {
    window.web3 = undefined;
    let web3js = await initWeb3();
    expect(web3js.currentProvider.host.indexOf('infura') !== -1).toBe(true);
  });

  it('Connecting to ENS contract ', async () => {

    let web3js = await initWeb3();
    let contractInstance = await new web3js.eth.Contract(ENSContract.ABI, ENSContract.address);

    expect(contractInstance).not.toBe(null);
    expect(contractInstance._address).toEqual(ENSContract.address);

  });

  it('Has NameRegistered event in ENS contract ', async () => {

    let web3js = await initWeb3();

    let contractInstance = await new web3js.eth.Contract(ENSContract.ABI, ENSContract.address);
    expect(contractInstance.events.NameRegistered).not.toBe(undefined);

  });

});

describe('Testing Vuejs Views', () => {
  it('has EventViewer component in Home View ', () => {
    const homeView = shallowMount(Home);
    expect(homeView.find(EventViwer).exists()).toBe(true)
  });
});

describe('Testing State', () => {

  describe('Testing Inital State', () => {

    it('Inital State it has correct value', () => {

      const initalState = {
        ui: {
          isError: false,
          errorMessage: ''
        },
        web3js: {
          isInjected: false,
          web3Instance: null,
          networkId: '1', //Fixed for main network  
        },
        ens: {
          eventData: [],
          contractInstance: null,
          eventName: 'NameRegistered',
        },
        avarageBlockTime: 13.9,
        secondsInDay: 86400
      };

      expect(store.state).toEqual(initalState);

    });

  });

  describe('Testing Mutation', () => {

    it('Setting Web3js instance to the state , by using SET_WEB3_INSTANCE mutation', async () => {

      let web3js = await initWeb3();

      const web3jsMockedState = {
        isInjected: true,
        web3Instance: web3js,
        networkId: '1',
      }

      mutations.SET_WEB3_INSTANCE(store.state, web3jsMockedState.web3Instance);

      expect(store.state.web3js.isInjected).toBe(true);
      expect(store.state.web3js.web3Instance).toEqual(web3jsMockedState.web3Instance);
      expect(store.state.web3js.networkId).toEqual('1');

    });

    it('Setting ENS contract instance to the state , by using SET_CONTRACT_INSTANCE mutation', async () => {

      let contractInstance = await new store.state.web3js.web3Instance.eth.Contract(ENSContract.ABI, ENSContract.address);

      mutations.SET_CONTRACT_INSTANCE(store.state, contractInstance);

      expect(store.state.ens.contractInstance).toEqual(contractInstance);

    });

  });


  describe('Testing Actions', () => {
     
    it('dispatches "registerWeb3" and "initENSContract" action when the Componet is created', async () => {
       
      const registerWeb3Spy =  jest.fn();
      const initENSContractSpy =  jest.fn();
    
     shallowMount(EventViwer, { 
        store, 
        Vue , 
        methods:{'registerWeb3':registerWeb3Spy,'initENSContract':initENSContractSpy} 
      });

      await expect(registerWeb3Spy).toHaveBeenCalled()
      await expect(initENSContractSpy).toHaveBeenCalled()
      
     });

  })

});