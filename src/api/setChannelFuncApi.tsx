// setChannelFuncApi.tsx
import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { enqueueSnackbar, closeSnackbar } from 'notistack'
import IconButton from '@mui/material/IconButton';
import IconClose from '@mui/icons-material/Close';

interface ResponseData {
  success: boolean;
  message: string;
}

interface SwitchStates {
  [key: string]: boolean;
}

const setChannelFuncApi = async (
  func: string,
  channelId: string,
  value: boolean | string,
  callbackData: string,
  setSwitchStates: React.Dispatch<React.SetStateAction<SwitchStates>> | React.Dispatch<React.SetStateAction<string>>,
  prevState?: SwitchStates | string
): Promise<ResponseData | null> => {
  const nowSettingSnackbarId = enqueueSnackbar('설정 중...', { variant: 'info', autoHideDuration: 10000 });
  try {
    let data: ResponseData = await postData(
      '/api/channel/' + func,
      {
        channelId: channelId,
        enabled: value,
      }
    )
    console.log("API Response: success: " + (data?.success == true) + ", message: " + data.message);
    if ((data?.success != true)) {
      closeSnackbar(nowSettingSnackbarId);
      enqueueSnackbar('설정에 실패했어요: ' + data.message, {
        variant: 'error', autoHideDuration: 5000, action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)}>
            <IconClose />
          </IconButton>
        )
      });
      if (isSwitchStatesAction(setSwitchStates)) {
        setSwitchStates((prevState) => ({
          ...prevState,
          [func]: !prevState[func],
        }));

      }
      if (isStringAction(setSwitchStates) && prevState && typeof prevState === 'string') {
        setSwitchStates(prevState);
      }
      return null;
    }

    closeSnackbar(nowSettingSnackbarId);
    enqueueSnackbar(callbackData, { variant: 'success' });
    return data;
  } catch (error) {
    closeSnackbar(nowSettingSnackbarId);
    enqueueSnackbar('설정에 실패했어요: ' + error, { variant: 'error', autoHideDuration: 5000 });
    if (isSwitchStatesAction(setSwitchStates)) {
      setSwitchStates((prevState) => ({
        ...prevState,
        [func]: !prevState[func],
      }));
    }
    if (isStringAction(setSwitchStates) && prevState && typeof prevState === 'string') {
      setSwitchStates(prevState);
    }
    return null;
  }
};

function isSwitchStatesAction(
  func: any
): func is React.Dispatch<React.SetStateAction<SwitchStates>> {
  return typeof func === 'function';
}

function isStringAction(
  func: any
): func is React.Dispatch<React.SetStateAction<string>> {
  return typeof func === 'function';
}

export default setChannelFuncApi;

export async function postData(url: string, param: any): Promise<ResponseData> {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let jwt = urlParams.get('data');
    if (!jwt) {
      jwt = "default";
    }
    console.log("setChannelFuncApi: " + url, param);

    let requestParam = Object.assign({
      data: jwt
    }, param)

    // console.log("jwt: " + JSON.stringify(requestParam));
    const response: AxiosResponse<ResponseData> = await axios.post(url, requestParam, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    console.log("setChannelFuncApi Response: " + response.data);

    return response.data;

  } catch (error) {
    console.log("setChannelFuncApi Error: " + error);
    throw error;
  }
};