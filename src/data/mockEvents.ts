import { HamamatsuEvents } from "../API";

export const mockEvents: HamamatsuEvents[] = [
  {
    __typename: "HamamatsuEvents",
    Key: "mock-202606-festival",
    EventName: "浜松あじさいフェス",
    EventNameKana: "ハママツアジサイフェス",
    StartedOn: "2026-06-14",
    EndedOn: "2026-06-14",
    StartedAt: "10:00",
    EndedAt: "16:00",
    Description: "地元団体によるマルシェと音楽演奏を楽しめる屋外イベント。",
    PriceDetail: "入場無料",
    HowToJoin: "事前申込不要",
    Place: "浜松城公園",
    PlaceAddress: "静岡県浜松市中央区元城町100-2",
    Url: "https://example.com/events/ajisai-fes",
    Tel: "053-000-1111",
    Organizer: "浜松イベント実行委員会",
    Category: "イベント",
    Latitude: "34.7108",
    Longitude: "137.7261",
    StartMonth: "202606",
  },
  {
    __typename: "HamamatsuEvents",
    Key: "mock-202606-kosodate",
    EventName: "親子でたのしむ絵本ひろば",
    EventNameKana: "オヤコデタノシムエホンヒロバ",
    StartedOn: "2026-06-21",
    EndedOn: "2026-06-21",
    StartedAt: "11:00",
    EndedAt: "12:30",
    Description: "未就学児向けの読み聞かせとミニ工作会。",
    PriceDetail: "参加無料",
    HowToJoin: "当日先着20組",
    Place: "浜松市立中央図書館",
    PlaceAddress: "静岡県浜松市中央区松城町214-21",
    Url: "https://example.com/events/ehon-hiroba",
    Tel: "053-000-2222",
    Organizer: "中央図書館",
    Category: "こそだて",
    Latitude: "34.7160",
    Longitude: "137.7314",
    StartMonth: "202606",
  },
  {
    __typename: "HamamatsuEvents",
    Key: "mock-202607-sports",
    EventName: "みんなの朝ラン教室",
    EventNameKana: "ミンナノアサランキョウシツ",
    StartedOn: "2026-07-05",
    EndedOn: "2026-07-05",
    StartedAt: "07:00",
    EndedAt: "08:30",
    Description: "初心者向けランニング講座。給水あり。",
    PriceDetail: "500円",
    HowToJoin: "Webフォームから申込",
    Place: "四ツ池公園陸上競技場",
    PlaceAddress: "静岡県浜松市中央区上島6-19-1",
    Url: "https://example.com/events/morning-run",
    Tel: "053-000-3333",
    Organizer: "浜松スポーツ協会",
    Category: "スポーツ",
    Latitude: "34.7481",
    Longitude: "137.7437",
    StartMonth: "202607",
  },
];

export const findEventByKey = (eventKey: string): HamamatsuEvents | null => {
  return mockEvents.find((event) => event.Key === eventKey) ?? null;
};

export const findEventsByMonth = (month: string): HamamatsuEvents[] => {
  return mockEvents.filter((event) => event.StartMonth === month);
};
