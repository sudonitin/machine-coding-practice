const questions = [
    {
        title: `How u doin?`,
        options: [
            { title: 'very bad', weightage: 1 },
            { title: 'bad', weightage: 2 },
            { title: 'good', weightage: 3 },
            { title: 'noice', weightage: 4 },
        ]
    },
    {
        title: `this diffiuclt?`,
        options: [
            { title: 'nah', weightage: 1 },
            { title: 'a bit', weightage: 2 },
            { title: 'hmm', weightage: 3 },
            { title: 'super', weightage: 4 },
        ]
    },
]

const responses = {
    'nitin': [
        { question: 'How u doin?', option: 'noice' },
        { question: 'this diffiuclt?', option: 'super' },
    ],
    'jatin': [
        { question: 'How u doin?', option: 'bad' },
        { question: 'this diffiuclt?', option: 'nah' },
    ]
}

module.exports = {
    questions,
    responses
}