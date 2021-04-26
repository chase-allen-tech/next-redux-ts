import { combineReducers } from 'redux';
import todo, { initialState as todoState } from './todo';
import channel, { initialState as channelState } from './channel';
import entity, { initialState as entityState } from './entity';
import contract, { initialState as contractState } from './contract';
import group, { initialState as groupState } from './group';

export const initialState = {
  todo: todoState,
  channel: channelState,
  entity: entityState,
  contract: contractState,
  group: groupState
};

export const rootReducer =  combineReducers({
  todo, channel, entity, contract, group
});

export type RootState = ReturnType<typeof rootReducer>;
