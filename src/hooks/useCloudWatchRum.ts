// cloudwatch RUM
import { AwsRum, AwsRumConfig } from 'aws-rum-web';

export const useCloudWatchRum = () => {
  try {
    const config: AwsRumConfig = {
      sessionSampleRate: 1,
      guestRoleArn: "arn:aws:iam::865422985541:role/RUM-Monitor-ap-northeast-1-865422985541-7532315671861-Unauth",
      identityPoolId: "ap-northeast-1:e2014572-68e5-48d5-be28-db1d5dc571e3",
      endpoint: "https://dataplane.rum.ap-northeast-1.amazonaws.com",
      telemetries: ["performance","errors","http"],
      allowCookies: true,
      enableXRay: false
    };

    const APPLICATION_ID: string = '8d9cac35-e51a-4bef-9f10-47f40a637565';
    const APPLICATION_VERSION: string = '1.0.0';
    const APPLICATION_REGION: string = 'ap-northeast-1';

    const awsRum: AwsRum = new AwsRum(
      APPLICATION_ID,
      APPLICATION_VERSION,
      APPLICATION_REGION,
      config
    );
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
  }
}