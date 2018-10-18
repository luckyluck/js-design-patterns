/* Mediator Design Pattern */

class Participant {
    constructor(name) {
        this.name = name;
        this.chatroom = null;
    }

    send(message, to) {
        this.chatroom.send(message, this, to);
    }

    receive(message, from) {
        console.log(from.name + " to " + this.name + ": " + message);
    }
}

class Chatroom {
    constructor() {
        this.participants = {};
    }

    register(participant) {
        this.participants[participant.name] = participant;
        participant.chatroom = this;
    }

    send(message, from, to) {
        if (to) {
            // single message
            to.receive(message, from);
        } else {
            // broadcast message
            for (const key of Object.keys(this.participants)) {
                if (this.participants[key] !== from) {
                    this.participants[key].receive(message, from);
                }
            }
        }
    }
}

let beau = new Participant("Beau");
let quincy = new Participant("Quincy");
let rafael = new Participant("Rafael");
let berkeley = new Participant("Berkeley");
let eletisto = new Participant("Eletisto");

let chatroom = new Chatroom();
chatroom.register(beau);
chatroom.register(quincy);
chatroom.register(rafael);
chatroom.register(berkeley);
chatroom.register(eletisto);

quincy.send("How's it going?");
beau.send("The YouTube channel is up to 1 million subscribers!", quincy);
rafael.send("The FCC wiki is more popular than Wikipedia!", quincy);
eletisto.send("98% of our graduates got their dream job!", quincy);
berkeley.send("The government forked our repo and is now using it to create world peace!", quincy);

