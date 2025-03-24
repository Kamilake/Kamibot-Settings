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

export async function postData(url: string, requestParam: any): Promise<ResponseData> {
  try {
    console.log("setChannelFuncApi Request: ", requestParam);
    const urlParams = new URLSearchParams(window.location.search);
    const requestOptions: any = {};
    let data = urlParams.get('data');
    if (data)
      requestOptions.params = { data };
    const response: AxiosResponse<ResponseData> = await axios.post(url, requestParam, requestOptions);
    console.log("setChannelFuncApi Response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("setChannelFuncApi Error: " + error);
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      // 400 에러인 경우 정상으로 처리
      return error.response.data as ResponseData;
    }
    throw error;
  }
};