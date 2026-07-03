import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  HamamatsuEvents: a
    .model({
      Key: a.string().required(),
      Code: a.string(),
      No: a.string(),
      Prefecture: a.string(),
      City: a.string(),
      EventName: a.string(),
      EventNameKana: a.string(),
      EventNameEn: a.string(),
      StartedOn: a.string(),
      EndedOn: a.string(),
      StartedAt: a.string(),
      EndedAt: a.string(),
      StartedAtNote: a.string(),
      Description: a.string(),
      Price: a.string(),
      PriceDetail: a.string(),
      Contact: a.string(),
      Tel: a.string(),
      TelExtension: a.string(),
      Organizer: a.string(),
      Place: a.string(),
      PlaceAddress: a.string(),
      Formula: a.string(),
      Latitude: a.string(),
      Longitude: a.string(),
      Access: a.string(),
      Parking: a.string(),
      Capacity: a.string(),
      ClosingOn: a.string(),
      ClosingAt: a.string(),
      HowToJoin: a.string(),
      Url: a.string(),
      Note: a.string(),
      Category: a.string(),
      Distinct: a.string(),
      OpenedAt: a.string(),
      UpdatedAt: a.string(),
      ChildInformation: a.string(),
      FacilityNo: a.string(),
      ImportedAt: a.string(),
      StartMonth: a.string(),
    })
    .identifier(['Key'])
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
