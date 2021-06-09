import { actionType } from "./actionType";

export function setWeatherDetails(weather_details)
{
  return {
    type: actionType.ui.setWeatherDetails,
    payload: weather_details,
  }
}

export function setLoading(blnLoading)
{
  return {
    type: actionType.ui.setLoading,
    payload: blnLoading,
  }
}