import { iAction, types } from "../actions";

type iState = {
  isLoading: boolean;
};

const initialState: iState = {
  isLoading: false,
};

export default function reducer(state = initialState, action: iAction): iState {
  switch (action.type) {
    case types.SET_NETWORK_LOADING:
      return { ...state, isLoading: action.payload as boolean };

    default:
      return state;
  }
}
