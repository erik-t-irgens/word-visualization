const realResultJson = {
    "statusCode": 200,
    "body": '{"ResponseMetadata":{"RequestId":"2d9b7433-0a6f-40b5-bc3f-b8b74356b4f2"},"MetricDataResults":[{"Id":"testQuery","Label":"This is a test query to understand what data can be obtained using getMetricData and how.","Timestamps":["2019-11-11T00:00:00.000Z","2019-11-10T00:00:00.000Z","2019-11-09T00:00:00.000Z","2019-11-08T00:00:00.000Z","2019-11-07T00:00:00.000Z","2019-11-06T00:00:00.000Z","2019-11-05T00:00:00.000Z","2019-11-04T00:00:00.000Z"],"Values":[1592,1304,1195,962,797,595,357,69],"StatusCode":"Complete","Messages":[]}],"Messages":[]}'
}

const dashboardAPIInvocations = {
    "statusCode": 200,
    "body": "{\"ResponseMetadata\":{\"RequestId\":\"38829c11-0854-404e-bf0d-03c9060da67b\"},\"MetricDataResults\":[{\"Id\":\"testQuery\",\"Label\":\"This is a test query to understand what data can be obtained using getMetricData and how.\",\"Timestamps\":[\"2019-11-12T00:00:00.000Z\",\"2019-11-11T00:00:00.000Z\"],\"Values\":[25,7],\"StatusCode\":\"Complete\",\"Messages\":[]}],\"Messages\":[]}"
}

const dashboardAPIDuration = {
    "statusCode": 200,
    "body": "{\"ResponseMetadata\":{\"RequestId\":\"113e6d05-ffa5-4444-a957-d24ed03a4dd6\"},\"MetricDataResults\":[{\"Id\":\"testQuery\",\"Label\":\"This is a test query to understand what data can be obtained using getMetricData and how.\",\"Timestamps\":[\"2019-11-12T19:32:00.000Z\",\"2019-11-12T19:30:00.000Z\",\"2019-11-12T19:29:00.000Z\",\"2019-11-12T19:28:00.000Z\",\"2019-11-12T19:19:00.000Z\",\"2019-11-12T19:14:00.000Z\",\"2019-11-12T19:04:00.000Z\",\"2019-11-12T19:03:00.000Z\",\"2019-11-12T18:59:00.000Z\",\"2019-11-12T18:58:00.000Z\",\"2019-11-12T18:57:00.000Z\",\"2019-11-12T18:50:00.000Z\",\"2019-11-12T18:49:00.000Z\",\"2019-11-12T18:46:00.000Z\",\"2019-11-12T18:41:00.000Z\",\"2019-11-12T18:39:00.000Z\",\"2019-11-12T18:35:00.000Z\",\"2019-11-11T18:35:00.000Z\",\"2019-11-11T18:32:00.000Z\",\"2019-11-11T18:30:00.000Z\",\"2019-11-11T18:28:00.000Z\",\"2019-11-11T18:27:00.000Z\"],\"Values\":[299.89250000000004,635.04,484.05,504.91,678.03,1198.25,5173.08,5082.943333333334,5112.52,3003.14,126,114.61,186.75,136.1,519.78,664.58,1200.93,13.81,1866.04,1892,1926.51,1963.685],\"StatusCode\":\"Complete\",\"Messages\":[]}],\"Messages\":[]}"
}


function handleParseJsonDataXY(JsonResponse) {
    const responseObject = JSON.parse(JsonResponse.body);
    let dataArray = [];
    for (let i = responseObject.MetricDataResults[0].Timestamps.length - 1; i >= 0; i--) {
        dataArray.push({ x: responseObject.MetricDataResults[0].Timestamps[i].substring(5, 10) + ', ' + responseObject.MetricDataResults[0].Timestamps[i].substring(11, 16), y: responseObject.MetricDataResults[0].Values[i] })
    }

    return dataArray;
}


function updateLittleData() {
    const portion = Math.random();
    return [
        {
            angle0: 0,
            angle: portion * Math.PI * 2,
            radius0: 0,
            radius: 10,

        },
        {
            angle0: portion * Math.PI * 2,
            angle: 2 * Math.PI,
            radius0: 0,
            radius: 10,

        }
    ];
}
const PI = Math.PI;
const myData = [
    { angle0: 0, angle: Math.PI / 4, opacity: 0.2, radius: 2, radius0: 1 },
    { angle0: PI / 4, angle: 2 * PI / 4, radius: 3, radius0: 0 },
    { angle0: 2 * PI / 4, angle: 3 * PI / 4, radius: 2, radius0: 0 },
    { angle0: 3 * PI / 4, angle: 4 * PI / 4, radius: 2, radius0: 0 },
    { angle0: 4 * PI / 4, angle: 5 * PI / 4, radius: 2, radius0: 0 },
    { angle0: 0, angle: 5 * PI / 4, radius: 1.1, radius0: 0.8 }
]


function createNewsData() {
    let newsArray = [];
    for (let i = 0; i < randomNumber(); i++) {
        newsArray.push({ imageIcon: 'http://lorempixel.com/50/50/people', title: 'Placeholder title', body: 'Placeholder body paragraph', time: '6 hours', media: createNewsMediaArray(), url: 'www.google.com' })
    }
    return newsArray;
}
function createNewsMediaArray() {
    let newsMediaArray = [];
    for (let i = 0; i < randomNumber(); i++) {
        newsMediaArray.push({ url: 'http://lorempixel.com/150/150/technics', alt: 'Some photo' })
    }
    return newsMediaArray;

}

function updateData() {
    const divider = Math.floor(Math.random() * 8 + 3);
    const newData = [...new Array(5)].map((row, index) => {
        return {
            color: index,
            radius0: Math.random() > 0.8 ? Math.random() + 1 : 0,
            radius: Math.random() * 3 + 1,
            angle: ((index + 1) * PI) / divider,
            angle0: (index * PI) / divider
        };
    });
    return newData.concat([
        { angle0: 0, angle: PI * 2 * Math.random(), radius: 1.1, radius0: 0.8 }
    ]);
}

function produceData() {
    let dataArray = [];
    for (let i = 0; i < randomNumber(); i++) {
        dataArray.push({ x: i, y: randomBigNumber() });
    }
    return dataArray;
}

const radialData = updateData();

let radialupdateddata = () => radialData.map(row => row)

const littleData = updateLittleData();

function randomNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

function randomBigNumber() {
    return Math.floor((Math.random() * 20000) + 1);
}

export const objectData = {
    mockData1: produceData(),

    mockData2: produceData(),

    mockData3: produceData(),

    mockDataRadial: radialupdateddata(),

    mockStatistic: { value: randomNumber(), label: 'Downloads' },
    mockStatistic2: { value: randomNumber(), label: 'Corn Kernels' },

    mockGroupStat: [
        { value: randomNumber(), label: 'Lorem' },
        { value: randomNumber(), label: 'Ipsum' },
        { value: randomNumber(), label: 'Dolor' },
        { value: randomNumber(), label: 'Sit' },
        { value: randomNumber(), label: 'Amet' },
        { value: randomNumber(), label: 'Consectetur' },
        { value: randomNumber(), label: 'Adipiscing' },
    ],

    mockGroupStat2: [
        { value: randomNumber(), label: 'Lorem' },
        { value: randomNumber(), label: 'Ipsum' },
        { value: randomNumber(), label: 'Dolor' },
    ],
    newsMockData: createNewsData(),

    bigMockData:
        handleParseJsonDataXY(realResultJson),

    dashboardDuration:
        handleParseJsonDataXY(dashboardAPIDuration),
    dashboardInvocations:
        handleParseJsonDataXY(dashboardAPIInvocations),


}