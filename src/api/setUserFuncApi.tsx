// setUserFuncApi.tsx
import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { enqueueSnackbar, closeSnackbar } from 'notistack'
import IconButton from '@mui/material/IconButton';
import IconClose from '@mui/icons-material/Close';

interface ResponseData {
  success: string;
  message: string;
}

// 기능(String) , 사용자 ID(String), 값(Boolean), 스낵바 메시지(String)
const setUserFuncApi = async (func: string, value: boolean, callbackData: string): Promise<ResponseData | null> => {
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
    console.log("API Response: success: " + (data?.success == 'true') + ", message: " + data.message);
    if ((data?.success != 'true')) {
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

async function postData(url: string, param: { value: boolean }): Promise<ResponseData> {
  try {
    // 사용자 브라우저의 GET 파라미터를 가져옵니다.
    const urlParams = new URLSearchParams(window.location.search);
    var userUrlParam = urlParams.get('data');
    //만약 data 파라미터가 없다면, "default"로 설정합니다.
    if (!userUrlParam) {
      userUrlParam = "default";
    }
    console.log("setChannelFuncApi: " + url, param);

    let requestParam = Object.assign({
      data: userUrlParam
    }, param)

    console.log("request: " + JSON.stringify(requestParam));
    // 서버에 data 헤더와 함께 POST 요청을 보냅니다.
    const response: AxiosResponse<ResponseData> = await axios.post(url, requestParam);

    console.log("setChannelFuncApi Response: " + response.data);

    return response.data;

  } catch (error) {
    console.log("setChannelFuncApi Error: " + error);
    throw error;
  }
};