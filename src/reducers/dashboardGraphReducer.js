import { ADD_NODE, REMOVE_NODE, UPDATE_NODE } from "../actions/types";

import { objectData } from "../views/Dashboard/MockData"





// TODO: Generate these dynamically dependant on real data. 
const dashboardComponents = [
    {
        type: 'linemark',
        name: 'Name of the data',
        size: 20,
        apiUrl: 'db/getCWRedHunterParameterReducer',
        color1: '#8ac44f',
        color2: '#4caa1a',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,
    },

    {
        type: 'area',
        name: 'Name of the data',
        size: 8,
        apiUrl: 'db/getCWRedHunterReducer',
        color1: '#8ac44f',
        color2: '#4caa1a',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,
    },
    {
        type: 'bar',
        name: 'Name of the data',
        size: 8,
        apiUrl: 'db/getCWRedHunter',
        color1: '#c10f7c',
        color2: '#b43c7c',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,
    },
    {
        type: 'area',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },
    {
        type: 'line',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },
    {
        type: 'mark',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },
    {
        type: 'bar',
        name: 'S3 Bucket Size',
        size: 8,
        color1: '#f8b000',
        color2: '#e87721',
        apiUrl: 'db/getCWS3BucketSize',
        yAxis: true,
        xAxis: true,
        VGridLine: true,
        HGridLine: true,

    },


    {
        type: 'single-stat',
        name: 'Pages Scraped',
        apiUrl: 'db/getPagesScraped',
        size: 8,
        color: 'teal',
        color1: 'blue',
        color2: '',
    },

    {
        type: 'single-stat',
        name: 'Total Pages Scraped',
        apiUrl: 'db/getPagesScraped',
        size: 8,

    },



]

// For demonstration purposes only
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// The below intiialstate should be equal to a util, one that async fetches this list of nodes and edges. 

const initialState = {
    graphToDisplay: {
        "nodes":
            [
                {
                    "id": "customer",
                    "label": "You!",
                    "size": 8,
                    "color": "#999999",
                    "type": "square",
                    // "possibleChildren": [
                    //     {
                    //         "id": "firstparty",
                    //         "label": "First Party",
                    //         "size": 5,
                    //         "party": 1,
                    //         // "color": "#8ac44f",
                    //         "color": "#8ac44f",
                    //         "possibleChildren": [
                    //             {
                    //                 "id": "salesforce",
                    //                 "label": "Salesforce",
                    //                 "party": 1,
                    //                 // "color": "#8ac44f",
                    //                 "size": 3,
                    //                 "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                 "labelApiUrl": "placeholder"
                    //             },
                    //             {
                    //                 "id": "zapier",
                    //                 "label": "Zapier",
                    //                 "party": 1,
                    //                 // "color": "#8ac44f",
                    //                 "size": 3,
                    //                 "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                 "labelApiUrl": "placeholder"
                    //             }
                    //         ],
                    //         // 'x': 2,
                    //         // 'y': 3,
                    //         "type": "diamond",
                    //         "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //         "labelApiUrl": "placeholder"

                    //     },
                    //     {
                    //         "id": "secondparty",
                    //         "label": "Second Party",
                    //         "party": 2,
                    //         // "color": "#b43c7c",
                    //         "color": " #b43c7c",
                    //         "size": 5,
                    //         "possibleChildren": [{
                    //             "id": "scraper",
                    //             "label": "Municipal Websites",
                    //             "party": 2,
                    //             // "color": "#b43c7c",
                    //             "size": 3,
                    //             "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //             "labelApiUrl": "placeholder"
                    //         },],
                    //         // 'x': 6,
                    //         // 'y': 4,
                    //         "type": "diamond",
                    //         "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //         "labelApiUrl": "placeholder"

                    //     },
                    //     {
                    //         "id": "thirdparty",
                    //         "label": "Third Party",
                    //         "party": 3,
                    //         "color": "#2e9ab8",
                    //         // "color": "#2e9ab8",
                    //         "size": 5,
                    //         "possibleChildren": [
                    //             {
                    //                 "id": "us-epa",
                    //                 "label": "US Environmental Protection Agency",
                    //                 "party": 3,
                    //                 // "color": "#2e9ab8",
                    //                 "size": 3,
                    //                 "possibleChildren": [{
                    //                     "id": "srf",
                    //                     "label": "State Revolving Fund",
                    //                     "party": 3,
                    //                     // "color": "#2e9ab8",
                    //                     "size": 3,
                    //                     "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                     "labelApiUrl": "placeholder"
                    //                 },
                    //                 {
                    //                     "id": "sdwis",
                    //                     "label": "Safe Drinking Water Information System",
                    //                     "party": 3,
                    //                     // "color": "#2e9ab8",
                    //                     "size": 3,

                    //                     "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                     "labelApiUrl": "placeholder"
                    //                 },
                    //                 ],
                    //                 // NOTE: This label could be dynamically generated by either going in and creating its own API call by using the same dashboardComponents apiUrl to get the same information, or we can create our own API call that gets only necessary information (if we only want to display S3 bucket size or EC2 instance statistics)

                    //                 "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                 "labelApiUrl": "placeholder"
                    //             },
                    //             {
                    //                 "id": "us-census",
                    //                 "label": "US Census Department",
                    //                 "party": 3,
                    //                 // "color": "#2e9ab8",
                    //                 "size": 3,
                    //                 "possibleChildren": [{
                    //                     "id": "us-commerce",
                    //                     "label": "US Department of Commerce",
                    //                     "party": 3,
                    //                     // "color": "#2e9ab8",
                    //                     "size": 3,
                    //                     "possibleChildren": [{
                    //                         "id": "finest",
                    //                         "label": "State & Local Finances",
                    //                         "party": 3,
                    //                         // "color": "#2e9ab8",
                    //                         "size": 3,
                    //                         "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                         "labelApiUrl": "placeholder"
                    //                     },],
                    //                     "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                     "labelApiUrl": "placeholder"
                    //                 },],
                    //                 "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //                 "labelApiUrl": "placeholder"
                    //             },
                    //         ],
                    //         // 'x': 3,
                    //         // 'y': 1,
                    //         "type": "diamond",
                    //         "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9),
                    //         "labelApiUrl": "placeholder"
                    //     },


                    // ],
                    // 'x': 0,
                    // 'y': 0,
                    // This is an array
                    "dashboardComponents": dashboardComponents.slice(getRandomInt(8), 9)

                },

            ],
        "edges":
            [

            ]
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_NODE: {
            state = {
                ...state,
                graphToDisplay: {
                    nodes: [
                        ...state.graphToDisplay.nodes, action.payload.newNode.node
                    ],
                    edges: [
                        ...state.graphToDisplay.edges, action.payload.newNode.edge
                    ],
                }
            };
            break;
        }
        case REMOVE_NODE: {
            state = {
                ...state,
                graphToDisplay: {
                    nodes: [
                        ...state.graphToDisplay.nodes.filter(node => node.id != action.payload.nodeToRemove.id)
                    ],
                    edges: [
                        ...state.graphToDisplay.edges.filter(edge => edge.source != action.payload.nodeToRemove.id && edge.target != action.payload.nodeToRemove.id)
                    ],
                }
            };
            break;
        }
        case UPDATE_NODE: {
            state = {
                ...state,
                graphToDisplay: {
                    nodes: [
                        ...state.graphToDisplay.nodes.filter(node => !action.payload.updatedNodes.some(child => node.id === child.id)),
                        ...action.payload.updatedNodes
                    ],
                }
            };
            break;
        }
        default:
            return state;
    }

    return state;
}