import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

function initialState()
{
  return fromJS({
    objWeatherDetails: {
      celcius: 0,
      fahrenheit: 0,
    },
    blnLoading: false,
  })
}

export default function reducer(state = initialState(), action)
{
  if(typeof reducer.prototype[action.type] === "function")
  {
    return reducer.prototype[action.type](state, action)
  } else
  {
    return state
  }
}

reducer.prototype[actionType.ui.setWeatherDetails] = (state, action) => {
  return state.set("objWeatherDetails", action.payload)
}

reducer.prototype[actionType.ui.setLoading] = (state, action) => {
  return state.set("blnLoading", action.payload)
}