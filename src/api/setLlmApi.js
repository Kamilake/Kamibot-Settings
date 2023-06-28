// fetchInfoApi.js
import usePost from "./usePost";
import axios from 'axios';
import { enqueueSnackbar, closeSnackbar } from 'notistack'

const setChannelFuncApi = async (func, channelId, enabled, callbackData,setSwitchStates) => {
  const nowSettingSnackbarId = enqueueSnackbar('설정 중...', { variant: 'info', autoHideDuration: 10000 });
  try {
    let data = await postData(
      'https://kamibot.kami.live/api/channel/' + func,
      {
        channelId: channelId,
        enabled: enabled
      }
    )
    // let { data, loading, error } = usePost(
    //   'https://kamibot.kami.live/api/channel/' + func, {
    //   enabled: enabled
    // }
    // );
    console.log("API Response: success: " + data.success + ", message: " + data.message);
    if (!data.success) {
      closeSnackbar(nowSettingSnackbarId);
      enqueueSnackbar('설정에 실패했어요: ' + data.message, { variant: 'error' });
      setSwitchStates((prevState) => ({
        ...prevState,
        [func]: !prevState[func],
      }));
      return null;
    }
    closeSnackbar(nowSettingSnackbarId);
    enqueueSnackbar(callbackData, { variant: 'success' });
    return data;
  } catch (error) {
    closeSnackbar(nowSettingSnackbarId);
    enqueueSnackbar('설정에 실패했어요: ' + error, { variant: 'error' });
    setSwitchStates((prevState) => ({
      ...prevState,
      [func]: !prevState[func],
    }));
    return null;
  }

};

export default setChannelFuncApi;


async function postData(url, param) {


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
    const response = await axios.post(url, requestParam);

    console.log("setChannelFuncApi Response: " + response.data);

    return response.data;

  } catch (error) {

    console.log("setChannelFuncApi Error: " + error);

    return error;

  }
};