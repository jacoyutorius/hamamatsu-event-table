/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const all = /* GraphQL */ `
  query All($limit: Int, $nextToken: String) {
    all(limit: $limit, nextToken: $nextToken) {
      items {
        Key
        Code
        No
        Prefecture
        City
        EventName
        EventNameKana
        EventNameEn
        StartedOn
        EndedOn
        StartedAt
        EndedAt
        StartedAtNote
        Description
        Price
        PriceDetail
        Contact
        Tel
        TelExtension
        Organizer
        Place
        PlaceAddress
        Formula
        Latitude
        Longitude
        Access
        Parking
        Capacity
        ClosingOn
        ClosingAt
        HowToJoin
        Url
        Note
        Category
        Distinct
        OpenedAt
        UpdatedAt
        ChildInformation
        FacilityNo
        ImportedAt
        StartMonth
      }
      nextToken
    }
  }
`;
export const queryByMonth = /* GraphQL */ `
  query QueryByMonth($month: String!, $limit: Int) {
    queryByMonth(month: $month, limit: $limit) {
      items {
        Key
        Code
        No
        Prefecture
        City
        EventName
        EventNameKana
        EventNameEn
        StartedOn
        EndedOn
        StartedAt
        EndedAt
        StartedAtNote
        Description
        Price
        PriceDetail
        Contact
        Tel
        TelExtension
        Organizer
        Place
        PlaceAddress
        Formula
        Latitude
        Longitude
        Access
        Parking
        Capacity
        ClosingOn
        ClosingAt
        HowToJoin
        Url
        Note
        Category
        Distinct
        OpenedAt
        UpdatedAt
        ChildInformation
        FacilityNo
        ImportedAt
        StartMonth
      }
      nextToken
    }
  }
`;
export const getOne = /* GraphQL */ `
  query GetOne($Key: ID!) {
    getOne(Key: $Key) {
      Key
      Code
      No
      Prefecture
      City
      EventName
      EventNameKana
      EventNameEn
      StartedOn
      EndedOn
      StartedAt
      EndedAt
      StartedAtNote
      Description
      Price
      PriceDetail
      Contact
      Tel
      TelExtension
      Organizer
      Place
      PlaceAddress
      Formula
      Latitude
      Longitude
      Access
      Parking
      Capacity
      ClosingOn
      ClosingAt
      HowToJoin
      Url
      Note
      Category
      Distinct
      OpenedAt
      UpdatedAt
      ChildInformation
      FacilityNo
      ImportedAt
      StartMonth
    }
  }
`;
