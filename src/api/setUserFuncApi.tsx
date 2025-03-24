// setUserFuncApi.tsx
import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { enqueueSnackbar, closeSnackbar } from 'notistack'
import IconButton from '@mui/material/IconButton';
import IconClose from '@mui/icons-material/Close';
import { postData } from './setChannelFuncApi';

interface ResponseData {
  success: boolean;
  message: string;
}

// 기능(String) , 사용자 ID(String), 값(Boolean), 스낵바 메시지(String)
const setUserFuncApi = async (func: string, value: boolean | string | number, callbackData: string): Promise<ResponseData | null> => {
  const nowSettingSnackbarId = enqueueSnackbar('설정 중...', { variant: 'info', autoHideDuration: 10000 });
  try {
    let data: ResponseData = await postData(
      '/api/user/' + func,
      {
        value: value
      }
    )
    // let { data, loading, error } = usePost(
    //   'https://kamibot.kami.live/api/channel/' + func, {
    //   enabled: enabled
    // }
    // );
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
      return null;
    }
    closeSnackbar(nowSettingSnackbarId);
    enqueueSnackbar(callbackData, { variant: 'success' });
    return data;
  } catch (error) {
    closeSnackbar(nowSettingSnackbarId);
    enqueueSnackbar('설정에 실패했어요: ' + error, { variant: 'error', autoHideDuration: 5000 });
    return null;
  }

};

export default setUserFuncApi;