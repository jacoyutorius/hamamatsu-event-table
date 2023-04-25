import { Amplify } from 'aws-amplify';
import config from '../aws-exports';

export const useAmplify = () => {
  // NOTE: AmplifyにデプロイするとAppSync関連の設定情報が生成されない様子なので
  //  環境変数から読み込んでAmplify.configureに渡すようにしている。
  const GraphQlConfig: Object = {
    aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_GRAPHQLENDPOINT,
    aws_appsync_region: process.env.REACT_APP_APPSYNC_REGION,
    aws_appsync_authenticationType: process.env.REACT_APP_APPSYNC_AUTHENTICATIONTYPE,
    aws_appsync_apiKey: process.env.REACT_APP_APPSYNC_APIKEY
  }

  Amplify.configure(
    {
      ...config,
      ...GraphQlConfig
    }
  )
}