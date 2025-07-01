// setChannelFuncApi.tsx
import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack'
import IconButton from '@mui/material/IconButton';
import IconClose from '@mui/icons-material/Close';
import { postData } from './setChannelFuncApi';

interface ResponseData {
  success: boolean;
  message: string;
}

interface SwitchStates {
  [key: string]: boolean;
}




const setGuildFuncApi = async (
  guildId: string,
  func: string,
  param: any,
  onSuccess: (data: ResponseData) => void = (data) => {
  },
  onFailure: (error: any) => void = (error) => {
  },
  onSuccessMessage: (data: ResponseData) => void = (data) => {
    enqueueSnackbar(data.message, { variant: 'success' });
  },
  onFailureMessage: (error: any) => void = (error) => {
    enqueueSnackbar('문제가 있어요: ' + error, { variant: 'error', autoHideDuration: 5000 });

  }
): Promise<ResponseData | null> => {
  const nowSettingSnackbarId = enqueueSnackbar('설정 중...', { variant: 'info', autoHideDuration: 10000 });
  try {
    let data: ResponseData = await postData(
      `/api/guild/${guildId}/${func}`, param
    )
    console.log("API Response: success: " + (data?.success == true) + ", message: " + data.message);
    if ((data?.success != true)) {
      closeSnackbar(nowSettingSnackbarId);
      onFailureMessage(data.message);
      onFailure(data.message);
      return null;
    }
    closeSnackbar(nowSettingSnackbarId);
    onSuccessMessage(data);
    onSuccess(data);
    return data;
  } catch (error) {
    closeSnackbar(nowSettingSnackbarId);
    onFailureMessage(error);
    onFailure(error);
    return null;
  }
};

export default setGuildFuncApi;