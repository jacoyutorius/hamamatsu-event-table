import {
  HamamatsuEvents,
} from "../API";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

const endpoint = import.meta.env.VITE_APPSYNC_GRAPHQLENDPOINT;
const apiKey = import.meta.env.VITE_APPSYNC_APIKEY;
const authenticationType = import.meta.env.VITE_APPSYNC_AUTHENTICATIONTYPE;
const eventDataSource = import.meta.env.VITE_EVENT_DATA_SOURCE;
const isTest = import.meta.env.MODE === "test";
const dataSource = (eventDataSource ?? "").toLowerCase();

const listHamamatsuEventsByMonth = /* GraphQL */ `
  query ListHamamatsuEventsByMonth($event_month: String!, $limit: Int, $nextToken: String) {
    listHamamatsuEventsByMonth(event_month: $event_month, limit: $limit, nextToken: $nextToken) {
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

export const isAppSyncConfigured = Boolean(endpoint && apiKey && !isTest && dataSource !== "mock");

const toAppSyncMonth = (month: string) => {
  if (/^\d{6}$/.test(month)) {
    return `${month.slice(0, 4)}-${month.slice(4, 6)}`;
  }

  return month;
};

const toDateOnly = (value?: string | null) => {
  return value?.slice(0, 10) ?? value;
};

const normalizeEvent = (event: HamamatsuEvents): HamamatsuEvents => ({
  ...event,
  StartedOn: toDateOnly(event.StartedOn),
  EndedOn: toDateOnly(event.EndedOn),
  ClosingOn: toDateOnly(event.ClosingOn),
  OpenedAt: toDateOnly(event.OpenedAt),
  UpdatedAt: toDateOnly(event.UpdatedAt),
  ImportedAt: toDateOnly(event.ImportedAt),
  StartMonth: event.StartMonth?.replace("-", "") ?? event.StartMonth,
});

const buildHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "content-type": "application/json",
  };

  const authType = (authenticationType ?? "").toLowerCase();

  if (!authType || authType === "apikey" || authType === "api_key") {
    headers["x-api-key"] = apiKey;
  }

  return headers;
};

const request = async <T>(query: string, variables: Record<string, unknown>): Promise<T> => {
  if (!isAppSyncConfigured) {
    throw new Error("AppSync is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`AppSync request failed: ${response.status}`);
  }

  const json = (await response.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join("\n"));
  }

  if (!json.data) {
    throw new Error("AppSync response did not include data.");
  }

  return json.data;
};

export const fetchEventsByMonth = async (month: string): Promise<HamamatsuEvents[]> => {
  const items: HamamatsuEvents[] = [];
  let nextToken: string | null | undefined;

  do {
    const data = await request<{
      listHamamatsuEventsByMonth: {
        items: HamamatsuEvents[];
        nextToken?: string | null;
      };
    }>(listHamamatsuEventsByMonth, {
      event_month: toAppSyncMonth(month),
      limit: 1000,
      nextToken,
    });

    items.push(...data.listHamamatsuEventsByMonth.items);
    nextToken = data.listHamamatsuEventsByMonth.nextToken;
  } while (nextToken);

  return items.map(normalizeEvent);
};
