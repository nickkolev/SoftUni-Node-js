const events = {};

function subscribe(eventType, eventHandler) {
    if (!events[eventType]) {
        events[eventType] = [];
    }

    events[eventType].push(eventHandler);
}

function publish(eventType, data) {
    events[eventType]?.forEach(hanlder => hanlder(data))
}

module.exports = {
    subscribe,
    publish,
}